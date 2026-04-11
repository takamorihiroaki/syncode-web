export function parseFrontmatter(content) {
    const blocks = content.split("---").filter(Boolean);

    if (blocks.length < 2) {
        throw new Error("Invalid frontmatter");
    }

    const yamlBlocks = [];
    const bodyParts = [];

    for (let i = 0; i < blocks.length; i++) {
        if (i % 2 === 1) {
            yamlBlocks.push(blocks[i]);
        } else {
            bodyParts.push(blocks[i]);
        }
    }

    const rawYaml = yamlBlocks.join("\n");

    const data = {};
    const issues = [];

    for (const line of rawYaml.split("\n")) {
        const [k, ...rest] = line.split(":");
        if (!k || !rest) continue;

        const key = k.trim();
        const value = rest.join(":").trim();

        if (data[key]) {
            issues.push(`DUPLICATE_KEY: ${key}`);
        }

        data[key] = value;
    }

    return {
        data,
        body: bodyParts.join("\n").trim(),
        issues,
    };
}