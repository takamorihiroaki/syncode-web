// scripts/cms-repair/index.js

import fs from "fs";
import path from "path";
import { safeString, toYamlValue } from "../shared/yaml-utils.js";

const CONTENT_DIR = "src/content/articles";

// --- YAML修復設定 ---
const FRONTMATTER_KEYS = ["title", "date", "excerpt", "image", "tags", "category", "draft"];

const KEY_MAPPING = {
    "pubDate": "date",
    "heroImage": "image",
    "description": "excerpt"
};

function fixFrontmatter(data) {
    const fixed = { ...data };

    fixed.title = safeString(data.title);
    fixed.excerpt = safeString(data.excerpt || data.description);
    
    const rawDate = data.date || data.pubDate;
    fixed.date = safeString(rawDate) || new Date().toISOString().split('T')[0];
    
    const rawImage = data.image || data.heroImage;
    fixed.image = safeString(rawImage);

    delete fixed.pubDate;
    delete fixed.heroImage;
    delete fixed.description;
    
    if (data.tags) {
        let tags = data.tags;
        if (typeof tags === "string") {
            let cleaned = tags.replace(/[\[\]'"]/g, "").trim();
            tags = cleaned.split(",").map(t => t.trim()).filter(t => t);
        }
        if (Array.isArray(tags)) {
            fixed.tags = tags.map(safeString).filter(t => t);
            if (fixed.tags.length === 0) fixed.tags = ["General"];
        } else {
            fixed.tags = ["General"];
        }
    } else {
        fixed.tags = ["General"];
    }

    fixed.category = safeString(data.category) || "Technology";
    fixed.draft = data.draft === "true" || data.draft === true || false;

    return fixed;
}

// --- 本文を保護しつつゴミを除去する解析器 ---
function cleanAndParse(content) {
    const lines = content.split("\n");
    const data = {};
    const bodyLines = [];
    
    // 1. メタデータの抽出（ファイル全体をスキャン）
    lines.forEach(line => {
        const trimmed = line.trim();
        const colonIndex = line.indexOf(":");
        if (colonIndex !== -1) {
            let key = line.substring(0, colonIndex).trim();
            const value = line.substring(colonIndex + 1).trim();
            
            if (KEY_MAPPING[key]) key = KEY_MAPPING[key];

            if (FRONTMATTER_KEYS.includes(key)) {
                const cleanValue = safeString(value);
                // 有益な情報を収集（長いタイトル、自動生成以外の説明など）
                if (!data[key] || 
                    (key === "title" && cleanValue.length > String(data[key]).length) ||
                    (key === "excerpt" && cleanValue.length > String(data[key]).length && !cleanValue.includes("Auto-generated")) ||
                    (key === "image" && cleanValue.length > 0 && !data[key])
                ) {
                    data[key] = value;
                }
            }
        }
    });

    // 2. 本文の抽出（ゴミ項目を具体的に狙い撃ちして除去）
    let isHeader = true; // ファイル冒頭のヘッダーをスキップ中
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        // ゴミ項目またはセパレーターをスキップ
        const isGarbage = 
            trimmed === "---" ||
            trimmed === "" ||
            FRONTMATTER_KEYS.some(key => trimmed.startsWith(key + ":")) ||
            Object.keys(KEY_MAPPING).some(key => trimmed.startsWith(key + ":"));

        if (isGarbage) {
            if (isHeader) continue;
            
            if (trimmed === "") {
                if (bodyLines.length > 0 && bodyLines[bodyLines.length - 1] !== "") {
                    bodyLines.push("");
                }
            }
            continue;
        }

        // ゴミでない行が現れたら、そこからが本文
        isHeader = false;
        bodyLines.push(line);
    }

    return { data, body: bodyLines.join("\n").trim() };
}

function buildFrontmatter(data) {
    const lines = ["---"];
    const buildOrder = ["title", "date", "excerpt", "image", "tags", "category", "draft"];
    buildOrder.forEach(key => {
        if (key in data) {
            lines.push(`${key}: ${toYamlValue(data[key])}`);
        }
    });
    lines.push("---");
    return lines.join("\n") + "\n";
}

function repairFile(filePath) {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, body } = cleanAndParse(raw);

    const fixed = fixFrontmatter(data);
    const newContent = buildFrontmatter(fixed) + "\n" + body;

    fs.writeFileSync(filePath, newContent, "utf-8");
    console.log("fixed:", filePath);
}

function run() {
    if (!fs.existsSync(CONTENT_DIR)) {
        console.error("Directory not found:", CONTENT_DIR);
        return;
    }
    const files = fs.readdirSync(CONTENT_DIR);

    files.forEach(file => {
        if (!file.endsWith(".md")) return;
        const filePath = path.join(CONTENT_DIR, file);
        repairFile(filePath);
    });

    console.log("🚀 CMS Repair Complete (Robust Body Protection)");
}

run();