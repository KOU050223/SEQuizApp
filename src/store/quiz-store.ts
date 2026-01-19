import { create } from 'zustand';
import type { Question } from '@/lib/types';

interface QuizStore {
  questions: Question[];
  currentIndex: number;
  selectedAnswer: number | null;
  isAnswered: boolean;
  showExplanation: boolean;

  setQuestions: (questions: Question[]) => void;
  selectAnswer: (index: number) => void;
  submitAnswer: () => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizStore>((set) => ({
  questions: [],
  currentIndex: 0,
  selectedAnswer: null,
  isAnswered: false,
  showExplanation: false,

  setQuestions: (questions) => set({ questions, currentIndex: 0 }),
  selectAnswer: (index) => set({ selectedAnswer: index }),
  submitAnswer: () => set({ isAnswered: true, showExplanation: true }),
  nextQuestion: () =>
    set((state) => ({
      currentIndex: state.currentIndex + 1,
      selectedAnswer: null,
      isAnswered: false,
      showExplanation: false
    })),
  resetQuiz: () =>
    set({
      currentIndex: 0,
      selectedAnswer: null,
      isAnswered: false,
      showExplanation: false
    })
}));
