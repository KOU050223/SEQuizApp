'use client';

import { QuizController } from '@/components/quiz/QuizController';
import type { Question } from '@/lib/types';
import questionsData from '@/data/questions.json';

export default function QuizPage() {
  // 問題をシャッフル
  const shuffledQuestions = [...questionsData.questions].sort(() => Math.random() - 0.5) as Question[];

  return <QuizController questions={shuffledQuestions} />;
}
