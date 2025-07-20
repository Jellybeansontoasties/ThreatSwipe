import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const statementId = searchParams.get('statementId');
  const isCorrect = searchParams.get('isCorrect') === 'true';

  // Get user ID from Supabase auth
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
  }

  const { error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: user.id,
      statement_id: statementId,
      is_correct: isCorrect,
      last_attempted: new Date().toISOString()
    });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

// GET: fetch user progress for a topic or statement
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topicId = searchParams.get('topicId');
  const statementId = searchParams.get('statementId');

  // Get user ID from Supabase auth
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
  }

  let query = supabase.from('user_progress').select('*').eq('user_id', user.id);
  if (topicId) {
    // Fetch statement IDs for the topic
    const { data: statementIds, error: statementError } = await supabase
      .from('statements')
      .select('id')
      .eq('topic_id', topicId);
    if (statementError) {
      return NextResponse.json(
        { error: statementError.message },
        { status: 500 }
      );
    }
    const ids = statementIds?.map((s: { id: string }) => s.id) || [];
    if (ids.length > 0) {
      query = query.in('statement_id', ids);
    } else {
      // No statements for this topic, return empty
      return NextResponse.json([]);
    }
  }
  if (statementId) {
    query = query.eq('statement_id', statementId);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
} 