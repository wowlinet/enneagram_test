import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleDetailPageClient from './ArticleDetailPageClient';

interface Props {
  params: Promise<{ slug: string }>;
}

// 获取文章数据的函数
async function getArticle(slug: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3002'}/api/articles/${slug}`, {
      cache: 'no-store' // 确保获取最新数据
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return data.article;
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