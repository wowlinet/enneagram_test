import { NextRequest, NextResponse } from 'next/server';
import { getAllPublishedArticles, getCategoryById, getCategoryBySlug } from '@/data/articles';

// Force Node.js runtime
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const personalityType = searchParams.get('personality_type') || '';

    // Validate pagination parameters
    if (page < 1 || limit < 1 || limit > 50) {
      return NextResponse.json(
        { error: 'Invalid pagination parameters' },
        { status: 400 }
      );
    }

    const offset = (page - 1) * limit;

    // Get all published articles from local data
    let articles = getAllPublishedArticles();

    // Apply filters
    if (search) {
      const searchLower = search.toLowerCase();
      articles = articles.filter(article => 
        article.title.toLowerCase().includes(searchLower) ||
        article.excerpt.toLowerCase().includes(searchLower) ||
        article.content.toLowerCase().includes(searchLower)
      );
    }

    if (category) {
      // Filter by category name
      const categoryData = getCategoryBySlug(category);
      if (categoryData) {
        articles = articles.filter(article => article.category_id === categoryData.id);
      }
    }

    // Note: personality_type filtering will be added when field exists

    // Calculate pagination info
    const totalCount = articles.length;
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    // Apply pagination
    const paginatedArticles = articles.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      articles: paginatedArticles.map(article => {
        const categoryData = getCategoryById(article.category_id);
        return {
          id: article.id,
          title: article.title,
          excerpt: article.excerpt,
          slug: article.slug,
          category: categoryData?.name || 'General',
          personality_type: null, // Will be added when field exists
          author: 'Admin', // Default author
          published_at: article.created_at,
          reading_time: 5, // Default reading time
          featured_image: article.featured_image
        };
      }),
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage,
        hasPrevPage,
        limit
      },
      filters: {
        search,
        category,
        personalityType
      }
    });

  } catch (error) {
    console.error('Articles API error:', error);
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