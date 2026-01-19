import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserData, AnswerRecord } from '@/lib/types';

interface UserStore extends UserData {
  addWrongAnswer: (questionId: number) => void;
  removeWrongAnswer: (questionId: number) => void;
  recordAnswer: (questionId: number, isCorrect: boolean) => void;
  resetWrongAnswers: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      wrongAnswerIds: [],
      answeredQuestions: {},
      stats: { totalAnswered: 0, totalCorrect: 0 },

      addWrongAnswer: (questionId) =>
        set((state) => ({
          wrongAnswerIds: Array.from(new Set([...state.wrongAnswerIds, questionId]))
        })),

      removeWrongAnswer: (questionId) =>
        set((state) => ({
          wrongAnswerIds: state.wrongAnswerIds.filter(id => id !== questionId)
        })),

      recordAnswer: (questionId, isCorrect) =>
        set((state) => {
          const record = state.answeredQuestions[questionId] || {
            attempts: 0,
            correctCount: 0,
            lastAnsweredAt: ''
          };

          return {
            answeredQuestions: {
              ...state.answeredQuestions,
              [questionId]: {
                attempts: record.attempts + 1,
                correctCount: record.correctCount + (isCorrect ? 1 : 0),
                lastAnsweredAt: new Date().toISOString()
              }
            },
            stats: {
              totalAnswered: state.stats.totalAnswered + 1,
              totalCorrect: state.stats.totalCorrect + (isCorrect ? 1 : 0)
            }
          };
        }),

      resetWrongAnswers: () =>
        set({ wrongAnswerIds: [] })
    }),
    { name: 'se-quiz-user-data' }
  )
);
