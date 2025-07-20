import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topicId = searchParams.get('topicId');
  const difficulty = searchParams.get('difficulty'); // optional
  const limit = searchParams.get('limit'); // optional, for pagination
  const offset = searchParams.get('offset'); // optional, for pagination

  if (!topicId) {
    return NextResponse.json(
      { error: 'topicId is required' },
      { status: 400 }
    );
  }

  let query = supabase
    .from('statements')
    .select('*')
    .eq('topic_id', topicId)
    .order('difficulty');

  if (difficulty) {
    query = query.eq('difficulty', difficulty);
  }
  if (limit) {
    query = query.limit(Number(limit));
  }
  if (offset) {
    query = query.range(Number(offset), Number(offset) + (limit ? Number(limit) - 1 : 9));
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