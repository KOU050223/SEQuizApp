'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/store/quiz-store';
import { useUserStore } from '@/store/user-store';
import { QuestionCard } from './QuestionCard';
import { ChoiceButton } from './ChoiceButton';
import { ExplanationPanel } from './ExplanationPanel';
import { ProgressBar } from './ProgressBar';
import type { Question } from '@/lib/types';

interface QuizControllerProps {
  questions: Question[];
}

export function QuizController({ questions }: QuizControllerProps) {
  const router = useRouter();
  const {
    currentIndex,
    selectedAnswer,
    isAnswered,
    showExplanation,
    setQuestions,
    selectAnswer,
    submitAnswer,
    nextQuestion,
    resetQuiz
  } = useQuizStore();

  const { addWrongAnswer, recordAnswer } = useUserStore();

  useEffect(() => {
    setQuestions(questions);
    resetQuiz();
  }, [questions, setQuestions, resetQuiz]);

  if (questions.length === 0) {
    return <div>問題がありません</div>;
  }

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    if (!isCorrect) {
      addWrongAnswer(currentQuestion.id);
    }

    recordAnswer(currentQuestion.id, isCorrect);
    submitAnswer();
  };

  const handleNext = () => {
    if (isLastQuestion) {
      router.push('/');
    } else {
      nextQuestion();
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-6">
        <ProgressBar current={currentIndex + 1} total={questions.length} />
      </div>

      <QuestionCard
        question={currentQuestion}
        questionNumber={currentIndex + 1}
        totalQuestions={questions.length}
      />

      <div className="mt-6 space-y-3">
        {currentQuestion.choices.map((choice, index) => (
          <ChoiceButton
            key={index}
            choice={choice}
            index={index}
            isSelected={selectedAnswer === index}
            isCorrect={index === currentQuestion.correctAnswer}
            isAnswered={isAnswered}
            onClick={() => !isAnswered && selectAnswer(index)}
          />
        ))}
      </div>

      {!isAnswered && (
        <button
          onClick={handleSubmit}
          disabled={selectedAnswer === null}
          className={`mt-6 w-full py-3 px-6 rounded-lg font-bold transition-colors ${
            selectedAnswer !== null
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          解答する
        </button>
      )}

      {showExplanation && (
        <ExplanationPanel
          correctAnswer={currentQuestion.correctAnswer}
          explanation={currentQuestion.explanation}
          isCorrect={selectedAnswer === currentQuestion.correctAnswer}
          onNext={handleNext}
          isLastQuestion={isLastQuestion}
        />
      )}
    </div>
  );
}
