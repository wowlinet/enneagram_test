import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

// Force Node.js runtime to avoid Edge Runtime issues with Supabase
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
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

    // Build query with category join
    let query = supabase
      .from('articles')
      .select(`
        id, title, excerpt, slug, featured_image, created_at, updated_at,
        categories(name)
      `, { count: 'exact' })
      .eq('published', true)
      .order('created_at', { ascending: false });

    // Apply filters
    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%,content.ilike.%${search}%`);
    }

    if (category) {
      // Filter by category name through join
      query = query.eq('categories.name', category);
    }

    // Note: personality_type filtering will be added when field exists

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data: articles, error, count } = await query;

    if (error) {
      console.error('Articles query error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch articles' },
        { status: 500 }
      );
    }

    // Calculate pagination info
    const totalPages = Math.ceil((count || 0) / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      success: true,
      articles: (articles || []).map(article => ({
        id: article.id,
        title: article.title,
        excerpt: article.excerpt,
        slug: article.slug,
        category: article.categories?.name || 'General',
        personalityType: null, // Will be added when field exists
        author: 'Admin', // Default author
        publishedAt: article.created_at,
        readingTime: 5, // Default reading time
        featuredImage: article.featured_image
      })),
      pagination: {
        currentPage: page,
        totalPages,
        totalCount: count || 0,
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