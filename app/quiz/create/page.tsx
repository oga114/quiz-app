'use client';

import { useState } from 'react';

const CreateQuiz = () => {
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState([{ text: '', isCorrect: false }]);

  // 選択肢を追加
  const addOption = () => {
    setOptions([...options, { text: '', isCorrect: false }]);
  };

  // 選択肢の変更処理
  const updateOption = (index: number, text: string) => {
    const newOptions = [...options];
    newOptions[index].text = text;
    setOptions(newOptions);
  };

  // 正解を選択
  const setCorrectOption = (index: number) => {
    const newOptions = options.map((opt, i) => ({
      ...opt,
      isCorrect: i === index,
    }));
    setOptions(newOptions);
  };

  // クイズ登録（APIにPOSTリクエスト）
  const submitQuiz = async () => {
    if (!questionText.trim() || options.length < 2) {
      alert('質問と最低2つの選択肢を入力してください');
      return;
    }

    const response = await fetch('/api/quiz/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionText, options }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(`エラー: ${data.error}`);
      return;
    }

    alert('クイズが登録されました！');
    setQuestionText('');
    setOptions([{ text: '', isCorrect: false }]);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">クイズを作成</h2>

      {/* 問題入力 */}
      <input
        type="text"
        placeholder="問題を入力"
        className="w-full p-2 border rounded-md"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
      />

      {/* 選択肢リスト */}
      <div className="mt-4">
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              placeholder={`選択肢 ${index + 1}`}
              className="w-full p-2 border rounded-md"
              value={option.text}
              onChange={(e) => updateOption(index, e.target.value)}
            />
            <input
              type="radio"
              name="correctOption"
              checked={option.isCorrect}
              onChange={() => setCorrectOption(index)}
            />
          </div>
        ))}
      </div>

      {/* 選択肢追加ボタン */}
      <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded" onClick={addOption}>
        選択肢を追加
      </button>

      {/* クイズ登録ボタン */}
      <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded w-full" onClick={submitQuiz}>
        クイズを登録
      </button>
    </div>
  );
};

export default CreateQuiz;
