import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase';

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

    // Execute the SQL query using Supabase's RPC or direct query
    // For security, we'll only allow specific pre-defined queries
    let result;

    if (sql.includes('profiles') && sql.includes('COUNT(*)')) {
      const { count, error } = await supabaseAdmin
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error('Supabase query error:', error);
        return NextResponse.json(
          { error: 'Database query failed' },
          { status: 500 }
        );
      }

      result = [{ profile_count: count || 0 }];
    } else if (sql.includes('players') && sql.includes('COUNT(*)')) {
      const { count, error } = await supabaseAdmin
        .from('players')
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error('Supabase query error:', error);
        return NextResponse.json(
          { error: 'Database query failed' },
          { status: 500 }
        );
      }

      result = [{ player_count: count || 0 }];
    } else {
      return NextResponse.json(
        { error: 'Query not supported. Only COUNT queries on profiles and players tables are allowed.' },
        { status: 400 }
      );
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error('Supabase query error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
