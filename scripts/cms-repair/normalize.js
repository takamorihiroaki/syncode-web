export function normalize(data) {
    return {
        title: data.title || "",
        pubDate: data.pubDate || "",
        description: data.description || "",
        heroImage: data.heroImage || "",
        tags: Array.isArray(data.tags)
            ? data.tags
            : typeof data.tags === "string"
                ? [data.tags]
                : [],
        category: data.category || "Uncategorized",
        draft: data.draft === "true" || data.draft === true,
    };
}