import type { Question } from '@/lib/types';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
}

export function QuestionCard({ question, questionNumber, totalQuestions }: QuestionCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <div className="text-sm text-gray-500 mb-2">
          問題 {questionNumber} / {totalQuestions}
        </div>
        <h2 className="text-xl font-bold mb-2">
          【問{question.id}】{question.title}
        </h2>
        <div className="text-sm text-gray-600">
          {question.source.examType} {question.source.year} {question.source.season} {question.source.section}・{question.source.number}
        </div>
      </div>
      <p className="text-lg leading-relaxed whitespace-pre-wrap">
        {question.question}
      </p>
    </div>
  );
}
