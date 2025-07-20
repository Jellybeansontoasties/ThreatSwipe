import { useState } from 'react';
import 'dotenv/config';

export function SwipeCard({
  statement,
  onSwipe
}: {
  statement: {
    text: string;
    is_true: boolean;
    explanation: string;
  };
  onSwipe: (isCorrect: boolean) => void;
}) {
  const [showExplanation, setShowExplanation] = useState(false);
  const [userGuess, setUserGuess] = useState<boolean | null>(null);

  const handleChoice = (guess: boolean) => {
    setUserGuess(guess);
    setShowExplanation(true);
    setTimeout(() => {
      onSwipe(guess === statement.is_true);
      setShowExplanation(false);
      setUserGuess(null);
    }, 2000);
  };

  return (
    <div className="relative h-64 w-full max-w-md bg-white rounded-xl shadow-lg p-6 flex flex-col">
      {!showExplanation ? (
        <>
          <h3 className="text-lg font-medium mb-4">True or False?</h3>
          <p className="flex-grow text-gray-800">{statement.text}</p>
          <div className="flex justify-between mt-4 gap-4">
            <button
              onClick={() => handleChoice(true)}
              className="flex-1 bg-green-100 text-green-800 py-2 rounded-lg hover:bg-green-200"
            >
              True
            </button>
            <button
              onClick={() => handleChoice(false)}
              className="flex-1 bg-red-100 text-red-800 py-2 rounded-lg hover:bg-red-200"
            >
              False
            </button>
          </div>
        </>
      ) : (
        <div className="flex-grow flex flex-col justify-center">
          <p className={`text-xl font-bold mb-2 ${
            userGuess === statement.is_true ? 'text-green-600' : 'text-red-600'
          }`}>
            {userGuess === statement.is_true ? 'Correct!' : 'Incorrect'}
          </p>
          <p className="text-gray-700">{statement.explanation}</p>
        </div>
      )}
    </div>
  );
} 