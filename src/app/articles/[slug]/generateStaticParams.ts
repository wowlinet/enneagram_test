import { getAllPublishedArticles } from '@/data/articles';

// Generate static params for all articles to enable static generation
export async function generateStaticParams() {
  const articles = getAllPublishedArticles();
  
  return articles.map((article) => ({
    slug: article.slug,
  }));
}