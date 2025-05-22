import type { ReactNode } from 'react';

// Type for specialized AI assistants
export interface SpecializedAssistant {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  color: string;
  systemPrompt: string;
  topics: string[];
  subtopics: Record<string, string[]>;
  resources: Resource[];
  suggestedQuestions: string[];
}

// Type for educational resources
export interface Resource {
  id?: string;
  title: string;
  url: string;
  description?: string;
  type?: 'article' | 'video' | 'interactive' | 'book' | 'website';
}

// Type for AI message
export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

// Type for message in conversation
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant' | 'system' | 'grok';
  timestamp: number;
  resources?: Resource[];
  suggestedQuestions?: string[];
  assistantType?: string;
}

// Type for AI conversation
export interface AIConversation {
  id: string;
  messages: AIMessage[];
  title?: string;
  createdAt: number;
  updatedAt: number;
  subject?: string;
  topic?: string;
  subtopic?: string;
}

// Type for AI response with structured data
export interface AIResponse {
  text: string;
  resources?: Resource[];
  suggestedQuestions?: string[];
}

// Type for topic
export interface Topic {
  id: string;
  name: string;
  description: string;
  assistantType: string;
  subtopics: Subtopic[];
}

// Type for subtopic
export interface Subtopic {
  id: string;
  name: string;
  description: string;
  sampleQuestions: string[];
}

// Type for Grok AI response
export interface GrokAIResponse {
  text: string;
  resources?: Resource[];
  suggestedQuestions?: string[];
  model?: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}
