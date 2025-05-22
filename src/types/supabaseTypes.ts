// Database types for Supabase

// Topic type
export interface Topic {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  created_at?: string;
  updated_at?: string;
}

// Subtopic type
export interface Subtopic {
  id: string;
  topic_id: string;
  name: string;
  description?: string;
  difficulty_level?: string;
  created_at?: string;
  updated_at?: string;
}

// AI Conversation type
export interface AIConversation {
  id: string;
  user_id?: string;
  title?: string;
  topic_id?: string;
  subtopic_id?: string;
  assistant_type: string;
  created_at?: string;
  updated_at?: string;
}

// AI Message type
export interface AIMessage {
  id: string;
  conversation_id: string;
  content: string;
  sender: 'user' | 'ai' | 'grok';
  resources?: any;
  suggested_questions?: any;
  assistant_type?: string;
  created_at?: string;
}

// Educational Resource type
export interface EducationalResource {
  id: string;
  title: string;
  description?: string;
  url?: string;
  resource_type?: 'article' | 'video' | 'book' | 'exercise' | 'quiz' | 'other';
  topic_id?: string;
  subtopic_id?: string;
  difficulty_level?: string;
  created_at?: string;
  updated_at?: string;
}

// User Preferences type
export interface UserPreferences {
  id: string;
  user_id: string;
  preferred_assistant?: string;
  preferred_ai_provider?: string;
  preferred_topics?: any;
  created_at?: string;
  updated_at?: string;
}

// AI Usage Stats type
export interface AIUsageStats {
  id: string;
  user_id?: string;
  assistant_type: string;
  ai_provider: string;
  topic_id?: string;
  subtopic_id?: string;
  message_count?: number;
  created_at?: string;
}

// Database definition
export interface Database {
  public: {
    Tables: {
      topics: {
        Row: Topic;
        Insert: Omit<Topic, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Topic, 'id' | 'created_at' | 'updated_at'>>;
      };
      subtopics: {
        Row: Subtopic;
        Insert: Omit<Subtopic, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Subtopic, 'id' | 'created_at' | 'updated_at'>>;
      };
      ai_conversations: {
        Row: AIConversation;
        Insert: Omit<AIConversation, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<
          Omit<AIConversation, 'id' | 'created_at' | 'updated_at'>
        >;
      };
      ai_messages: {
        Row: AIMessage;
        Insert: Omit<AIMessage, 'id' | 'created_at'>;
        Update: Partial<Omit<AIMessage, 'id' | 'created_at'>>;
      };
      educational_resources: {
        Row: EducationalResource;
        Insert: Omit<EducationalResource, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<
          Omit<EducationalResource, 'id' | 'created_at' | 'updated_at'>
        >;
      };
      user_preferences: {
        Row: UserPreferences;
        Insert: Omit<UserPreferences, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<
          Omit<UserPreferences, 'id' | 'created_at' | 'updated_at'>
        >;
      };
      ai_usage_stats: {
        Row: AIUsageStats;
        Insert: Omit<AIUsageStats, 'id' | 'created_at'>;
        Update: Partial<Omit<AIUsageStats, 'id' | 'created_at'>>;
      };
    };
  };
}
