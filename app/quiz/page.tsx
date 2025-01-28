'use client';

import { useEffect, useState } from 'react';

type Option = { id: string; option_text: string; is_correct: boolean };
type Question = { id: string; question_text: string; options: Option[] };

// 配列をシャッフルする関数
const shuffleArray = <T,>(array: T[]): T[] => {
  return array.sort(() => Math.random() - 0.5);
};

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch('/api/quiz');
      if (!response.ok) {
        console.error('Failed to fetch questions');
        return;
      }
      let data: Question[] = await response.json();

      // 問題の順番をシャッフル
      data = shuffleArray(data);

      // 各問題の選択肢をシャッフル
      data = data.map((q) => ({
        ...q,
        options: shuffleArray(q.options),
      }));

      setQuestions(data);
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (optionId: string, isCorrect: boolean) => {
    if (!answered) {
      setSelectedOption(optionId);
      if (isCorrect) {
        setScore((prev) => prev + 1);
      }
      setAnswered(true);
      setTimeout(() => {
        setAnswered(false);
        setSelectedOption(null);
        setCurrentIndex((prev) => prev + 1);
      }, 2000);
    }
  };

  if (!questions.length) return <p>Loading...</p>;
  if (currentIndex >= questions.length) return <p>Game Over! Score: {score}</p>;

  const question = questions[currentIndex];
  const correctAnswer = question.options.find((option) => option.is_correct)?.option_text;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{question.question_text}</h2>
      <ul className="mt-4 space-y-2">
        {question.options.map((option) => (
          <li key={option.id}>
            <button
              className={`w-full p-2 border rounded-md ${answered && option.is_correct
                ? 'bg-green-500' // 正解の選択肢
                : answered && selectedOption === option.id
                  ? 'bg-red-500' // ユーザーが選んだ間違いの選択肢
                  : 'bg-gray-200'
                }`}
              onClick={() => handleAnswer(option.id, option.is_correct)}
              disabled={answered}
            >
              {option.option_text}
            </button>
          </li>
        ))}
      </ul>

      {answered && (
        <div className="mt-4 p-2 bg-blue-100 border border-blue-500 rounded-md">
          <p className="text-blue-800">正解: <strong>{correctAnswer}</strong></p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
