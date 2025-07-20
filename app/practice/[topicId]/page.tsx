import { supabase } from '@/lib/supabase';
import { SwipeCard } from '@/components/SwipeCard';
import { useState } from 'react';

export default async function PracticePage({ params }: { params: { topicId: string } }) {
  const { data: statements } = await supabase
    .from('statements')
    .select('id, text, is_true, explanation')
    .eq('topic_id', params.topicId)
    .order('id');

  if (!statements || statements.length === 0) {
    return <div className="p-8">No practice statements found for this topic.</div>;
  }

  // This part is for SSR/SSG, but swipe state must be managed client-side
  // We'll render a client component for the swipe deck
  return <PracticeDeck statements={statements} topicId={params.topicId} />;
}

'use client';

function PracticeDeck({ statements, topicId }: { statements: any[]; topicId: string }) {
  const [current, setCurrent] = useState(0);
  const [results, setResults] = useState<{ id: string; correct: boolean }[]>([]);
  const [finished, setFinished] = useState(false);

  const handleSwipe = async (isCorrect: boolean) => {
    setResults(prev => [...prev, { id: statements[current].id, correct: isCorrect }]);
    // Optionally: call an API to record progress here
    if (current + 1 < statements.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    const correctCount = results.filter(r => r.correct).length;
    return (
      <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Practice Complete!</h2>
        <p className="mb-2">You got {correctCount} out of {statements.length} correct.</p>
        <a href={`/category/${topicId}`} className="text-blue-600 hover:underline">Back to Category</a>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <SwipeCard
        key={statements[current].id}
        statement={statements[current]}
        onSwipe={handleSwipe}
      />
      <div className="mt-4 text-gray-500">
        Card {current + 1} of {statements.length}
      </div>
    </div>
  );
} 