import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

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

    // Build query
    let query = supabase
      .from('articles')
      .select('id, title, excerpt, category, personality_type, author, published_at, reading_time, featured_image', { count: 'exact' })
      .eq('published', true)
      .order('published_at', { ascending: false });

    // Apply filters
    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%,content.ilike.%${search}%`);
    }

    if (category) {
      query = query.eq('category', category);
    }

    if (personalityType) {
      const typeNumber = parseInt(personalityType);
      if (typeNumber >= 1 && typeNumber <= 9) {
        query = query.eq('personality_type', typeNumber);
      }
    }

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
      articles: articles || [],
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