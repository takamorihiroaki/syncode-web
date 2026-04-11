export function safeString(v) {
    if (typeof v !== "string") return v;

    // 前後の余分な引用符と空白を除去
    let str = v.trim();
    while ((str.startsWith('"') && str.endsWith('"')) || (str.startsWith("'") && str.endsWith("'"))) {
        str = str.slice(1, -1).trim();
    }
    return str;
}

export function toYamlValue(v) {
    if (v === null || v === undefined) return '""';

    // 配列の処理
    if (Array.isArray(v)) {
        return `[${v.map(x => `"${safeString(x)}"`).join(", ")}]`;
    }

    // 真偽値と数値の処理
    if (typeof v === "boolean" || typeof v === "number") {
        return v;
    }

    // 文字列の処理
    const cleaned = safeString(String(v));
    
    // 特殊な文字が含まれる場合は引用符で囲む（現状は常に囲む設定）
    return `"${cleaned.replace(/"/g, '\\"')}"`;
}