-- Create tables for AI Education feature

-- Table for AI conversations
CREATE TABLE IF NOT EXISTS ai_conversations (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT,
  assistant_type TEXT NOT NULL,
  topic_id TEXT,
  subtopic_id TEXT
);

-- Table for AI messages
CREATE TABLE IF NOT EXISTS ai_messages (
  id TEXT PRIMARY KEY,
  conversation_id TEXT REFERENCES ai_conversations(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  sender TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resources JSONB,
  suggested_questions JSONB,
  assistant_type TEXT
);

-- Table for user preferences
CREATE TABLE IF NOT EXISTS user_preferences (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  preferred_assistant TEXT,
  preferred_ai_provider TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for AI usage statistics
CREATE TABLE IF NOT EXISTS ai_usage_stats (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES auth.users(id),
  assistant_type TEXT NOT NULL,
  ai_provider TEXT NOT NULL,
  message_count INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON ai_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON ai_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_usage_stats_user_id ON ai_usage_stats(user_id);

-- Set up row-level security policies
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_usage_stats ENABLE ROW LEVEL SECURITY;

-- Policies for ai_conversations
CREATE POLICY "Users can view their own conversations" 
  ON ai_conversations FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own conversations" 
  ON ai_conversations FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own conversations" 
  ON ai_conversations FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own conversations" 
  ON ai_conversations FOR DELETE 
  USING (auth.uid() = user_id);

-- Policies for ai_messages
CREATE POLICY "Users can view messages in their conversations" 
  ON ai_messages FOR SELECT 
  USING (auth.uid() = (SELECT user_id FROM ai_conversations WHERE id = conversation_id));

CREATE POLICY "Users can insert messages in their conversations" 
  ON ai_messages FOR INSERT 
  WITH CHECK (auth.uid() = (SELECT user_id FROM ai_conversations WHERE id = conversation_id));

CREATE POLICY "Users can update messages in their conversations" 
  ON ai_messages FOR UPDATE 
  USING (auth.uid() = (SELECT user_id FROM ai_conversations WHERE id = conversation_id));

CREATE POLICY "Users can delete messages in their conversations" 
  ON ai_messages FOR DELETE 
  USING (auth.uid() = (SELECT user_id FROM ai_conversations WHERE id = conversation_id));

-- Policies for user_preferences
CREATE POLICY "Users can view their own preferences" 
  ON user_preferences FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences" 
  ON user_preferences FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences" 
  ON user_preferences FOR UPDATE 
  USING (auth.uid() = user_id);

-- Policies for ai_usage_stats
CREATE POLICY "Users can view their own usage stats" 
  ON ai_usage_stats FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own usage stats" 
  ON ai_usage_stats FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own usage stats" 
  ON ai_usage_stats FOR UPDATE 
  USING (auth.uid() = user_id);
