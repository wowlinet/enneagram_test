import { NextRequest, NextResponse } from 'next/server';
import { getArticleBySlug, getArticlesByCategory, getCategoryById } from '@/data/articles';

// Force the route to use Node.js runtime
export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const params = await context.params;
    console.log('API Route called with params:', params);
    const { slug } = params;
    
    if (!slug) {
      console.error('No slug provided in params');
      return NextResponse.json(
        { success: false, error: 'Slug is required' },
        { status: 400 }
      );
    }

    console.log('Looking for article with slug:', slug);
    
    // Get the article by slug from local data
    const article = getArticleBySlug(slug);

    if (!article) {
      console.error('Article not found for slug:', slug);
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      );
    }

    console.log('Article found:', article.title);

    // Get the category information
    const category = getCategoryById(article.category_id);

    // Get related articles from the same category
    const relatedArticles = getArticlesByCategory(article.category_id)
      .filter(ra => ra.id !== article.id)
      .slice(0, 3);

    // Get personality type details if article is type-specific
    let personalityTypeDetails = null;
    // Note: personality_type functionality will be added later when the field exists

    return NextResponse.json({
      success: true,
      article: {
        id: article.id,
        title: article.title,
        content: article.content,
        excerpt: article.excerpt,
        slug: article.slug,
        category: category?.name || 'General',
        personalityType: null, // Will be added when field exists
        author: 'Admin', // Default author until field is added
        publishedAt: article.created_at,
        updatedAt: article.updated_at,
        readingTime: 5, // Default reading time until field is added
        views: 999, // Default views until field is added
        featuredImage: article.featured_image,
        tags: [], // Default empty tags until field is added
        seoTitle: article.title,
        seoDescription: article.excerpt
      },
      personalityTypeDetails,
      relatedArticles: relatedArticles.map(ra => {
        const raCategory = getCategoryById(ra.category_id);
        return {
          id: ra.id,
          title: ra.title,
          excerpt: ra.excerpt,
          slug: ra.slug,
          category: raCategory?.name || 'General',
          personalityType: null,
          publishedAt: ra.created_at,
          readingTime: 5,
          featuredImage: ra.featured_image
        };
      })
    });

  } catch (error) {
    console.error('Article detail API error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}