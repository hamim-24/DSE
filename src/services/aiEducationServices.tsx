import { supabase } from '../utils/supabaseClient';
import type {
  Topic,
  Subtopic,
  AIConversation,
  AIMessage,
  EducationalResource,
  UserPreferences,
  AIUsageStats,
} from '../types/supabaseTypes';
import { v4 as uuidv4 } from 'uuid';

// Topics
export const getTopics = async (): Promise<Topic[]> => {
  const { data, error } = await supabase.from('topics').select('*');

  if (error) {
    console.error('Error fetching topics:', error);
    return [];
  }

  return data || [];
};

export const getTopicById = async (id: string): Promise<Topic | null> => {
  const { data, error } = await supabase
    .from('topics')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching topic ${id}:`, error);
    return null;
  }

  return data;
};

// Subtopics
export const getSubtopicsByTopicId = async (
  topicId: string
): Promise<Subtopic[]> => {
  const { data, error } = await supabase
    .from('subtopics')
    .select('*')
    .eq('topic_id', topicId);

  if (error) {
    console.error(`Error fetching subtopics for topic ${topicId}:`, error);
    return [];
  }

  return data || [];
};

// Conversations
export const createConversation = async (
  conversation: Omit<AIConversation, 'id' | 'created_at' | 'updated_at'>
): Promise<string | null> => {
  const { data, error } = await supabase
    .from('ai_conversations')
    .insert(conversation)
    .select();

  if (error) {
    console.error('Error creating conversation:', error);
    return null;
  }

  return data?.[0]?.id || null;
};

export const getUserConversations = async (
  userId: string
): Promise<AIConversation[]> => {
  const { data, error } = await supabase
    .from('ai_conversations')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });

  if (error) {
    console.error(`Error fetching conversations for user ${userId}:`, error);
    return [];
  }

  return data || [];
};

// Messages
export const saveMessage = async (
  message: Omit<AIMessage, 'id' | 'created_at'>
): Promise<string | null> => {
  const { data, error } = await supabase
    .from('ai_messages')
    .insert({
      ...message,
      id: uuidv4(),
    })
    .select();

  if (error) {
    console.error('Error saving message:', error);
    return null;
  }

  return data?.[0]?.id || null;
};

export const getMessagesByConversationId = async (
  conversationId: string
): Promise<AIMessage[]> => {
  const { data, error } = await supabase
    .from('ai_messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error(
      `Error fetching messages for conversation ${conversationId}:`,
      error
    );
    return [];
  }

  return data || [];
};

// Educational Resources
export const getResourcesByTopic = async (
  topicId: string
): Promise<EducationalResource[]> => {
  const { data, error } = await supabase
    .from('educational_resources')
    .select('*')
    .eq('topic_id', topicId);

  if (error) {
    console.error(`Error fetching resources for topic ${topicId}:`, error);
    return [];
  }

  return data || [];
};

export const getResourcesBySubtopic = async (
  subtopicId: string
): Promise<EducationalResource[]> => {
  const { data, error } = await supabase
    .from('educational_resources')
    .select('*')
    .eq('subtopic_id', subtopicId);

  if (error) {
    console.error(
      `Error fetching resources for subtopic ${subtopicId}:`,
      error
    );
    return [];
  }

  return data || [];
};

// User Preferences
export const getUserPreferences = async (
  userId: string
): Promise<UserPreferences | null> => {
  const { data, error } = await supabase
    .from('user_preferences')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    // PGRST116 is the error code for "no rows returned"
    console.error(`Error fetching preferences for user ${userId}:`, error);
    return null;
  }

  return data || null;
};

export const saveUserPreferences = async (
  preferences: Omit<UserPreferences, 'id' | 'created_at' | 'updated_at'>
): Promise<boolean> => {
  // Check if preferences already exist
  const { data: existingData } = await supabase
    .from('user_preferences')
    .select('id')
    .eq('user_id', preferences.user_id)
    .single();

  let error;

  if (existingData) {
    // Update existing preferences
    const { error: updateError } = await supabase
      .from('user_preferences')
      .update({
        preferred_assistant: preferences.preferred_assistant,
        preferred_ai_provider: preferences.preferred_ai_provider,
        preferred_topics: preferences.preferred_topics,
      })
      .eq('id', existingData.id);

    error = updateError;
  } else {
    // Insert new preferences
    const { error: insertError } = await supabase
      .from('user_preferences')
      .insert({
        ...preferences,
        id: uuidv4(),
      });

    error = insertError;
  }

  if (error) {
    console.error('Error saving user preferences:', error);
    return false;
  }

  return true;
};

// AI Usage Stats
export const trackAIUsage = async (
  stats: Omit<AIUsageStats, 'id' | 'created_at'>
): Promise<boolean> => {
  const { error } = await supabase.from('ai_usage_stats').insert({
    ...stats,
    id: uuidv4(),
  });

  if (error) {
    console.error('Error tracking AI usage:', error);
    return false;
  }

  return true;
};

export const getAIUsageStatsByUser = async (
  userId: string
): Promise<AIUsageStats[]> => {
  const { data, error } = await supabase
    .from('ai_usage_stats')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(`Error fetching AI usage stats for user ${userId}:`, error);
    return [];
  }

  return data || [];
};
