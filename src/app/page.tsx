'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUserStore } from '@/store/user-store';
import questionsData from '@/data/questions.json';

export default function Home() {
  const { wrongAnswerIds, stats } = useUserStore();
  const [isClient, setIsClient] = useState(false);
  const totalQuestions = questionsData.questions.length;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const accuracy = isClient && stats.totalAnswered > 0
    ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100)
    : 0;

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">統計</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>総問題数</span>
              <span className="font-bold">{totalQuestions}問</span>
            </div>
            <div className="flex justify-between">
              <span>解答数</span>
              <span className="font-bold">{isClient ? stats.totalAnswered : 0}問</span>
            </div>
            <div className="flex justify-between">
              <span>正答率</span>
              <span className="font-bold">{accuracy}%</span>
            </div>
            <div className="flex justify-between">
              <span>間違えた問題</span>
              <span className="font-bold text-red-500">{isClient ? wrongAnswerIds.length : 0}問</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Link
            href="/quiz"
            className="block bg-blue-500 hover:bg-blue-600 text-white font-bold py-6 px-6 rounded-lg text-center transition-colors"
          >
            <div className="text-2xl mb-2">📝 クイズを始める</div>
            <div className="text-sm opacity-90">全{totalQuestions}問からランダム出題</div>
          </Link>

          <Link
            href="/review"
            className={`block font-bold py-6 px-6 rounded-lg text-center transition-colors ${
              isClient && wrongAnswerIds.length > 0
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none'
            }`}
          >
            <div className="text-2xl mb-2">🔄 復習モード</div>
            <div className="text-sm opacity-90">
              {isClient && wrongAnswerIds.length > 0
                ? `間違えた${wrongAnswerIds.length}問を復習`
                : '間違えた問題はありません'}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
