'use client';

import { useUserStore } from '@/store/user-store';
import { QuizController } from '@/components/quiz/QuizController';
import questionsData from '@/data/questions.json';
import Link from 'next/link';

export default function ReviewPage() {
  const { wrongAnswerIds } = useUserStore();

  const reviewQuestions = questionsData.questions.filter(q =>
    wrongAnswerIds.includes(q.id)
  );

  if (reviewQuestions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="bg-white rounded-lg shadow-md p-12">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-4">間違えた問題はありません!</h2>
          <p className="text-gray-600 mb-6">素晴らしいです。全ての問題に正解しています。</p>
          <Link
            href="/"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    );
  }

  return <QuizController questions={reviewQuestions} />;
}
