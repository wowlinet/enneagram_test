import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

// Force Node.js runtime to avoid Edge Runtime issues with Supabase
export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Validate ID format (should be UUID)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return NextResponse.json(
        { error: 'Invalid result ID format' },
        { status: 400 }
      );
    }

    // Fetch test result from database
    const supabase = await createServerSupabaseClient();
    const { data: testResult, error: resultError } = await supabase
      .from('test_results')
      .select('*')
      .eq('id', id)
      .single();

    if (resultError) {
      if (resultError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Test result not found' },
          { status: 404 }
        );
      }
      console.error('Database query error:', resultError);
      return NextResponse.json(
        { error: 'Failed to fetch test result' },
        { status: 500 }
      );
    }

    // Fetch personality type details
    const { data: personalityType, error: typeError } = await supabase
      .from('personality_types')
      .select('*')
      .eq('type_number', testResult.personality_type)
      .single();

    if (typeError) {
      console.error('Personality type query error:', typeError);
      return NextResponse.json(
        { error: 'Failed to fetch personality type details' },
        { status: 500 }
      );
    }

    // Return combined result
    return NextResponse.json({
      success: true,
      testResult: {
        id: testResult.id,
        personalityType: testResult.personality_type,
        scores: testResult.scores,
        confidence: testResult.confidence_score,
        createdAt: testResult.created_at,
        userId: testResult.user_id
      },
      personalityTypeDetails: {
        typeNumber: personalityType.type_number,
        title: personalityType.title,
        description: personalityType.description,
        strengths: personalityType.strengths,
        growthAreas: personalityType.growth_areas,
        characteristics: personalityType.characteristics
      }
    });

  } catch (error) {
    console.error('Results API error:', error);
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