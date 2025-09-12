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

    // Fetch article from database
    const supabase = await createServerSupabaseClient();
    const { data: article, error: articleError } = await supabase
      .from('articles')
      .select('*')
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

    // Increment view count
    const { error: updateError } = await supabase
      .from('articles')
      .update({ views: (article.views || 0) + 1 })
      .eq('id', article.id);

    if (updateError) {
      console.error('Failed to update view count:', updateError);
      // Don't fail the request if view count update fails
    }

    // Fetch related articles (same category or personality type, excluding current article)
    const { data: relatedArticles } = await supabase
      .from('articles')
      .select('id, title, excerpt, slug, category, personality_type, published_at, reading_time, featured_image')
      .eq('published', true)
      .neq('id', article.id)
      .or(`category.eq.${article.category},personality_type.eq.${article.personality_type}`)
      .order('published_at', { ascending: false })
      .limit(3);

    // Get personality type details if article is type-specific
    let personalityTypeDetails = null;
    if (article.personality_type) {
      const { data: typeData } = await supabase
        .from('personality_types')
        .select('type_number, title, description')
        .eq('type_number', article.personality_type)
        .single();
      
      personalityTypeDetails = typeData;
    }

    return NextResponse.json({
      success: true,
      article: {
        id: article.id,
        title: article.title,
        content: article.content,
        excerpt: article.excerpt,
        slug: article.slug,
        category: article.category,
        personalityType: article.personality_type,
        author: article.author,
        publishedAt: article.published_at,
        updatedAt: article.updated_at,
        readingTime: article.reading_time,
        views: (article.views || 0) + 1, // Return updated view count
        featuredImage: article.featured_image,
        tags: article.tags || [],
        seoTitle: article.seo_title,
        seoDescription: article.seo_description
      },
      personalityTypeDetails,
      relatedArticles: relatedArticles || []
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