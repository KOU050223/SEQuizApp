export interface Question {
  id: number;
  category: string;
  title: string;
  source: ExamSource;
  question: string;
  choices: string[];
  correctAnswer: number;  // 0-indexed
  explanation?: string;
  page: number;
}

export interface ExamSource {
  examType: string;
  year: string;
  season: string;
  section: string;
  number: string;
}

export interface AnswerRecord {
  attempts: number;
  correctCount: number;
  lastAnsweredAt: string;
}

export type QuizMode = 'normal' | 'review';

export interface UserData {
  wrongAnswerIds: number[];
  answeredQuestions: Record<number, AnswerRecord>;
  stats: {
    totalAnswered: number;
    totalCorrect: number;
  };
}
