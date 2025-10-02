import { NextRequest, NextResponse } from 'next/server';
import { calculateEnneagramType } from '@/data/questions';
import { saveTestResult } from '@/data/personality-types';

// Force Node.js runtime
export const runtime = 'nodejs';

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

    // Convert scores from Record<string, number> to number[] (ordered by type 1-9)
    const scoresArray: number[] = [
      result.scores.perfectionist,    // Type 1
      result.scores.helper,          // Type 2
      result.scores.achiever,        // Type 3
      result.scores.individualist,   // Type 4
      result.scores.investigator,    // Type 5
      result.scores.loyalist,        // Type 6
      result.scores.enthusiast,      // Type 7
      result.scores.challenger,      // Type 8
      result.scores.peacemaker       // Type 9
    ];

    // Save test result to local data
    const testResult = saveTestResult({
      user_id: userId || undefined,
      answers: answers,
      personality_type: result.type,
      scores: scoresArray,
      confidence_score: 0.85 // Default confidence score
    });

    // Return the test result with ID for redirect
    return NextResponse.json({
      success: true,
      resultId: testResult.id,
      personalityType: result.type,
      scores: result.scores,
      confidence: 0.85
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