import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

// Force Node.js runtime to avoid Edge Runtime issues with Supabase
export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Validate slug format
    if (!slug || typeof slug !== 'string' || slug.length < 1) {
      return NextResponse.json(
        { error: 'Invalid article slug' },
        { status: 400 }
      );
    }

    // Fetch article from database with category join
    const supabase = await createServerSupabaseClient();
    const { data: article, error: articleError } = await supabase
      .from('articles')
      .select(`
        *,
        categories(name)
      `)
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (articleError) {
      if (articleError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Article not found' },
          { status: 404 }
        );
      }
      console.error('Article query error:', articleError);
      return NextResponse.json(
        { error: 'Failed to fetch article' },
        { status: 500 }
      );
    }

    // Note: View count increment will be added when views field exists in database

    // Fetch related articles (same category, excluding current article)
    const { data: relatedArticles } = await supabase
      .from('articles')
      .select(`
        id, title, excerpt, slug, featured_image, created_at,
        categories(name)
      `)
      .eq('published', true)
      .neq('id', article.id)
      .eq('category_id', article.category_id)
      .order('created_at', { ascending: false })
      .limit(3);

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
        category: article.categories?.name || 'General',
        personalityType: null, // Will be added when field exists
        author: 'Admin', // Default author until field is added
        publishedAt: article.created_at,
        updatedAt: article.updated_at,
        readingTime: 5, // Default reading time until field is added
        views: 0, // Default views until field is added
        featuredImage: article.featured_image,
        tags: [], // Default empty tags until field is added
        seoTitle: article.title,
        seoDescription: article.excerpt
      },
      personalityTypeDetails,
      relatedArticles: (relatedArticles || []).map(ra => ({
        id: ra.id,
        title: ra.title,
        excerpt: ra.excerpt,
        slug: ra.slug,
        category: ra.categories?.name || 'General',
        personalityType: null,
        publishedAt: ra.created_at,
        readingTime: 5,
        featuredImage: ra.featured_image
      }))
    });

  } catch (error) {
    console.error('Article detail API error:', error);
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