
import { getCollection } from 'astro:content';

const articles = await getCollection('articles');
console.log(JSON.stringify(articles.map(a => ({ id: a.id, slug: (a as any).slug })), null, 2));
