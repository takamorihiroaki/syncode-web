import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro:schema';

const articles = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    image: z.string().optional(),
    excerpt: z.string().optional(), // index.astro では description ではなく excerpt を使用
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
    draft: z.boolean().default(false),
    ctaTitle: z.string().optional(),
    ctaDesc: z.string().optional(),
    series: z.string().optional(), // 例: "AI Collaboration Story"
    seriesOrder: z.number().optional(), // 1, 2, 3...
  }),
});

export const collections = {
  articles,
};