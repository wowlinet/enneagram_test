import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug } from '@/data/articles';
import ArticleDetailPageClient from './ArticleDetailPageClient';

interface Props {
  params: Promise<{ slug: string }>;
}

// 获取文章数据的函数
async function getArticle(slug: string) {
  try {
    // 直接使用本地数据源，避免在构建时的网络请求问题
    const article = getArticleBySlug(slug);
    
    if (!article) {
      return null;
    }
    
    // 转换为与 API 响应相同的格式
    return {
      id: article.id,
      title: article.title,
      content: article.content,
      excerpt: article.excerpt,
      slug: article.slug,
      category: 'General', // 默认分类，可以后续优化
      personalityType: null,
      author: 'Admin',
      publishedAt: article.created_at,
      updatedAt: article.updated_at,
      readingTime: 5,
      views: 999,
      featuredImage: article.featured_image,
      tags: [],
      seoTitle: article.title,
      seoDescription: article.excerpt
    };
  } catch (error) {
    console.error('Error fetching article for metadata:', error);
    return null;
  }
}

// 动态生成metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const article = await getArticle(resolvedParams.slug);
    
    if (!article) {
      return {
      metadataBase: new URL('https://enneagram-test.com'),
      title: 'Article Not Found | Enneagram Test',
      description: 'The requested article could not be found.',
    };
    }

    const title = `${article.title} | Enneagram Test`;
    const description = article.excerpt || article.title;
    const keywords = [
      article.category,
      ...(article.tags || []),
      ...(article.personalityType ? [`Type ${article.personalityType}`] : [])
    ].join(', ');

    return {
      metadataBase: new URL('https://enneagram-test.com'),
      title,
      description,
      keywords,
      authors: [{ name: article.author }],
      openGraph: {
        title,
        description,
        type: 'article',
        url: `https://enneagram-test.com/articles/${resolvedParams.slug}`,
        siteName: 'Enneagram Test',
        images: [
          {
            url: article.featuredImage || '/og-image.jpg',
            width: 1200,
            height: 630,
            alt: article.title,
          },
        ],
        publishedTime: article.publishedAt,
        authors: [article.author],
        tags: article.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [article.featuredImage || '/og-image.jpg'],
        creator: '@enneagram_test',
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      alternates: {
        canonical: `https://enneagram-test.com/articles/${resolvedParams.slug}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      metadataBase: new URL('https://enneagram-test.com'),
      title: 'Article | Enneagram Test',
      description: 'Explore personality insights through the Enneagram system.',
    };
  }
}

export default async function ArticleDetailPage({ params }: Props) {
  const resolvedParams = await params;
  return <ArticleDetailPageClient />;
}