import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { sql } = await request.json();

    // Basic validation to ensure only safe SELECT queries
    if (!sql || !sql.trim().toLowerCase().startsWith('select')) {
      return NextResponse.json(
        { error: 'Only SELECT queries are allowed' },
        { status: 400 }
      );
    }

    // Here you would typically make the actual Supabase query
    // For now, I'll return mock data based on the current counts
    if (sql.includes('profiles')) {
      return NextResponse.json([{ profile_count: "664" }]);
    } else if (sql.includes('players')) {
      return NextResponse.json([{ player_count: "815" }]);
    }

    return NextResponse.json(
      { error: 'Query not recognized' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Supabase query error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
