import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { calculateEnneagramType } from '@/data/questions';

export async function POST(request: NextRequest) {
  try {
    const { answers, userId } = await request.json();

    // Validate input
    if (!answers || !Array.isArray(answers) || answers.length !== 45) {
      return NextResponse.json(
        { error: 'Invalid answers format. Expected array of 45 answers.' },
        { status: 400 }
      );
    }

    // Validate answer values (should be 1-5)
    const invalidAnswers = answers.some(answer => 
      typeof answer !== 'number' || answer < 1 || answer > 5
    );

    if (invalidAnswers) {
      return NextResponse.json(
        { error: 'Invalid answer values. Each answer should be between 1 and 5.' },
        { status: 400 }
      );
    }

    // Calculate personality type and scores
    const result = calculateEnneagramType(answers);

    // Save test result to database
    const supabase = await createServerSupabaseClient();
    const { data: testResult, error: insertError } = await supabase
      .from('test_results')
      .insert({
        user_id: userId || null,
        answers: answers,
        personality_type: result.primaryType,
        scores: result.scores,
        confidence_score: result.confidence
      })
      .select()
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      return NextResponse.json(
        { error: 'Failed to save test results' },
        { status: 500 }
      );
    }

    // Return the test result with ID for redirect
    return NextResponse.json({
      success: true,
      resultId: testResult.id,
      personalityType: result.primaryType,
      scores: result.scores,
      confidence: result.confidence
    });

  } catch (error) {
    console.error('Test submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}