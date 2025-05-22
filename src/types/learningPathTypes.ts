export type LearningStyle = 'visual' | 'auditory' | 'reading' | 'kinesthetic';
export type QuestionType = 'multiple-choice' | 'open-ended' | 'true-false';
export type Difficulty = 'basic' | 'intermediate' | 'advanced';
export type TopicStatus = 'not-started' | 'in-progress' | 'completed';
export type InteractionType =
  | 'view'
  | 'question'
  | 'answer'
  | 'feedback'
  | 'resource-access';
export type ResourceType = 'video' | 'article' | 'book' | 'interactive';
export type ExampleType =
  | 'real-world'
  | 'abstract'
  | 'historical'
  | 'practical';
export type PreferredPace = 'slow' | 'moderate' | 'fast';

export interface Subject {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  topics?: Topic[];
}

export interface Topic {
  id: string;
  subjectId: string;
  name: string;
  description: string;
  orderIndex: number;
  estimatedMinutes: number;
  concepts?: Concept[];
  resources?: Resource[];
  status?: TopicStatus;
}

export interface Concept {
  id: string;
  topicId: string;
  name: string;
  description: string;
  orderIndex: number;
  content: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
  examples?: ConceptExample[];
  prerequisites?: string[]; // IDs of prerequisite concepts
  resources?: Resource[];
}

export interface ConceptExample {
  id: string;
  conceptId: string;
  exampleText: string;
  orderIndex: number;
}

export interface Question {
  id: string;
  conceptId: string;
  text: string;
  type: QuestionType;
  correctAnswer?: string;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  options?: QuestionOption[];
  followUpQuestions?: FollowUpQuestion[];
}

export interface QuestionOption {
  id: string;
  questionId: string;
  optionText: string;
  isCorrect: boolean;
  orderIndex: number;
}

export interface FollowUpQuestion {
  id: string;
  questionId: string;
  text: string;
  orderIndex: number;
}

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  url: string;
  description?: string;
  durationMinutes?: number;
}

export interface UserLearningStyle {
  userId: string;
  visualScore: number; // 1-10
  auditoryScore: number; // 1-10
  readingScore: number; // 1-10
  kinestheticScore: number; // 1-10
  preferredPace: PreferredPace;
  preferredExampleTypes: ExampleType[];
  preferredQuestionTypes: QuestionType[];
}

export interface LearningPath {
  id: string;
  userId: string;
  subjectId: string;
  name: string;
  description?: string;
  currentTopicId?: string;
  currentConceptId?: string;
  completionPercentage: number;
  estimatedRemainingHours: number;
  topics: LearningPathTopic[];
}

export interface LearningPathTopic {
  id: string;
  learningPathId: string;
  topicId: string;
  orderIndex: number;
  status: TopicStatus;
}

export interface UserProgress {
  id: string;
  userId: string;
  subjectId: string;
  topicId: string;
  conceptId: string;
  completed: boolean;
  score?: number;
  timeSpentMinutes: number;
  lastAccessedAt: Date;
  questionsAnswered: number;
  questionsCorrect: number;
}

export interface UserInteraction {
  id: string;
  userId: string;
  pathId?: string;
  topicId?: string;
  conceptId?: string;
  questionId?: string;
  type: InteractionType;
  content?: string;
  timestamp: Date;
  durationSeconds?: number;
  confusionExpressed: boolean;
  aiResponse?: string;
}
