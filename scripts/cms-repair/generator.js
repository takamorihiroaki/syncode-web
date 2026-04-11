import fs from "fs";

export function generateFallbacks(filePath, body, data) {
    const filename = filePath.split("/").pop().replace(".md", "");

    const description =
        body.slice(0, 120).replace(/\n/g, " ") + "...";

    const stats = fs.statSync(filePath);

    return {
        title: data.title || filename,
        pubDate: data.pubDate || stats.mtime.toISOString(),
        description: data.description || description,
        tags: data.tags || ["auto"],
        category: data.category || "General",
        draft: data.draft ?? false,
    };
}