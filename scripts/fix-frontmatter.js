import fs from "fs";
import path from "path";

const ARTICLES_DIR = "src/content/articles";

// YAMLキー（Astro用）
const ALLOWED_KEYS = [
    "title",
    "pubDate",
    "description",
    "heroImage",
    "tags",
    "category",
    "draft",
];

function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return { data: {}, body: content };

    const raw = match[1];
    const body = content.slice(match[0].length).trim();

    const data = {};
    const lines = raw.split("\n");

    for (const line of lines) {
        const [key, ...rest] = line.split(":");
        if (!key || !rest) continue;

        const value = rest.join(":").trim();

        // 重複キーは上書き（最後を優先）
        data[key.trim()] = value;
    }

    return { data, body };
}

function normalizeValue(key, value) {
    if (value === undefined) return "";

    if (key === "tags") {
        try {
            return JSON.parse(value.replace(/'/g, '"'));
        } catch {
            return [];
        }
    }

    if (key === "draft") {
        return value === "true";
    }

    return value.replace(/^"|"$/g, "");
}

function buildFrontmatter(data) {
    const cleaned = {};

    for (const key of ALLOWED_KEYS) {
        if (data[key] !== undefined) {
            cleaned[key] = normalizeValue(key, data[key]);
        }
    }

    const yaml = Object.entries(cleaned)
        .map(([k, v]) => {
            if (Array.isArray(v)) {
                return `${k}: [${v.map((x) => `"${x}"`).join(", ")}]`;
            }
            return `${k}: "${v}"`;
        })
        .join("\n");

    return `---\n${yaml}\n---\n`;
}

function fixFile(filePath) {
    const raw = fs.readFileSync(filePath, "utf-8");

    const { data, body } = parseFrontmatter(raw);
    const fixed = buildFrontmatter(data);

    const newContent = fixed + "\n" + body;

    fs.writeFileSync(filePath, newContent, "utf-8");

    console.log("fixed:", filePath);
}

function walk(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const full = path.join(dir, file);

        if (fs.statSync(full).isDirectory()) {
            walk(full);
        } else if (file.endsWith(".md")) {
            fixFile(full);
        }
    }
}

walk(ARTICLES_DIR);

console.log("✅ All articles fixed");