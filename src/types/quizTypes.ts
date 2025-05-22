export type QuestionType =
  | 'multiple-choice'
  | 'multiple-select'
  | 'true-false'
  | 'text'
  | 'rating';

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer?: string | string[];
  points: number;
  explanation?: string;
  required?: boolean;
}

export interface QuizResponse {
  questionId: string;
  answer: string | string[];
  isCorrect?: boolean;
}

export interface QuizResult {
  quizId: string;
  score: number;
  totalPoints: number;
  percentageScore: number;
  responses: QuizResponse[];
  completedAt: Date;
  timeSpent?: number; // in seconds
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  timeLimit?: number; // in minutes
  questions: Question[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  pointsReward: number;
  completionMessage: string;
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  estimatedTime: string;
  completionCount: number;
  averageScore?: number;
  isSurvey?: boolean;
  surveyPurpose?: string;
}

export interface UserQuizProgress {
  userId: string;
  completedQuizzes: {
    [quizId: string]: QuizResult;
  };
  totalPoints: number;
  quizzesStarted: {
    [quizId: string]: {
      startedAt: Date;
      currentQuestionIndex: number;
      responses: QuizResponse[];
    };
  };
}
