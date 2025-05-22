import { supabase } from '../utils/supabaseClient';
import type { Message, Conversation } from '../types/aiEducationTypes';
import { generateId } from '../utils/idUtils';

// Save a new conversation
export const createConversation = async (
  conversation: Omit<Conversation, 'id' | 'createdAt' | 'updatedAt'> & {
    userId?: string | null;
  }
): Promise<string> => {
  const id = generateId();
  const now = new Date().toISOString();

  const { error } = await supabase.from('ai_conversations').insert({
    id,
    user_id: conversation.userId || null,
    created_at: now,
    updated_at: now,
    title: conversation.title || 'New Conversation',
    assistant_type: conversation.assistantType || 'general',
    topic_id: conversation.topicId || null,
    subtopic_id: conversation.subtopicId || null,
  });

  if (error) {
    console.error('Error creating conversation:', error);
    throw new Error(`Failed to create conversation: ${error.message}`);
  }

  return id;
};

// Save a message to a conversation
export const saveMessage = async (
  message: Message,
  conversationId: string
): Promise<void> => {
  const { error } = await supabase.from('ai_messages').insert({
    id: message.id,
    conversation_id: conversationId,
    content: message.content,
    sender: message.sender,
    created_at: new Date(message.timestamp).toISOString(),
    resources: message.resources || null,
    suggested_questions: message.suggestedQuestions || null,
    assistant_type: message.assistantType || null,
  });

  if (error) {
    console.error('Error saving message:', error);
    throw new Error(`Failed to save message: ${error.message}`);
  }
};

// Get a conversation by ID
export const getConversation = async (
  conversationId: string
): Promise<Conversation | null> => {
  const { data: conversationData, error: conversationError } = await supabase
    .from('ai_conversations')
    .select('*')
    .eq('id', conversationId)
    .single();

  if (conversationError) {
    console.error('Error fetching conversation:', conversationError);
    return null;
  }

  const { data: messagesData, error: messagesError } = await supabase
    .from('ai_messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  if (messagesError) {
    console.error('Error fetching messages:', messagesError);
    return null;
  }

  // Convert Supabase data to our application types
  const messages: Message[] = messagesData.map((msg) => ({
    id: msg.id,
    content: msg.content,
    sender: msg.sender as 'user' | 'ai' | 'grok',
    timestamp: new Date(msg.created_at).getTime(),
    resources: (msg.resources as any[]) || [],
    suggestedQuestions: (msg.suggested_questions as string[]) || [],
    assistantType: msg.assistant_type || undefined,
  }));

  return {
    id: conversationData.id,
    title: conversationData.title || undefined,
    messages,
    createdAt: new Date(conversationData.created_at).getTime(),
    updatedAt: new Date(conversationData.updated_at).getTime(),
    topicId: conversationData.topic_id || undefined,
    subtopicId: conversationData.subtopic_id || undefined,
    assistantType: conversationData.assistant_type,
  };
};

// Get user's recent conversations
export const getUserConversations = async (
  userId: string
): Promise<Partial<Conversation>[]> => {
  const { data, error } = await supabase
    .from('ai_conversations')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Error fetching user conversations:', error);
    return [];
  }

  return data.map((conv) => ({
    id: conv.id,
    title: conv.title || undefined,
    createdAt: new Date(conv.created_at).getTime(),
    updatedAt: new Date(conv.updated_at).getTime(),
    topicId: conv.topic_id || undefined,
    subtopicId: conv.subtopic_id || undefined,
    assistantType: conv.assistant_type,
  }));
};

// Update conversation
export const updateConversation = async (
  conversationId: string,
  updates: Partial<Omit<Conversation, 'id' | 'messages'>>
): Promise<void> => {
  const updateData: any = {};

  if (updates.title) updateData.title = updates.title;
  if (updates.topicId) updateData.topic_id = updates.topicId;
  if (updates.subtopicId) updateData.subtopic_id = updates.subtopicId;
  if (updates.assistantType) updateData.assistant_type = updates.assistantType;
  updateData.updated_at = new Date().toISOString();

  const { error } = await supabase
    .from('ai_conversations')
    .update(updateData)
    .eq('id', conversationId);

  if (error) {
    console.error('Error updating conversation:', error);
    throw new Error(`Failed to update conversation: ${error.message}`);
  }
};

// Track AI usage
export const trackAIUsage = async (
  assistantType: string,
  aiProvider: string,
  userId?: string | null
): Promise<void> => {
  const id = generateId();
  const now = new Date().toISOString();

  try {
    const { error } = await supabase.from('ai_usage_stats').insert({
      id,
      user_id: userId || null,
      assistant_type: assistantType,
      ai_provider: aiProvider,
      message_count: 1,
      created_at: now,
      updated_at: now,
    });

    if (error) {
      console.error('Error tracking AI usage:', error);
    }
  } catch (err) {
    console.error('Failed to track AI usage:', err);
  }
};

// Save user preferences
export const saveUserPreferences = async (
  userId: string,
  preferences: {
    preferredAssistant?: string;
    preferredAIProvider?: string;
  }
): Promise<void> => {
  const id = generateId();
  const now = new Date().toISOString();

  // Check if preferences already exist
  const { data } = await supabase
    .from('user_preferences')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (data) {
    // Update existing preferences
    const { error } = await supabase
      .from('user_preferences')
      .update({
        preferred_assistant:
          preferences.preferredAssistant || data.preferred_assistant,
        preferred_ai_provider:
          preferences.preferredAIProvider || data.preferred_ai_provider,
        updated_at: now,
      })
      .eq('id', data.id);

    if (error) {
      console.error('Error updating user preferences:', error);
      throw new Error(`Failed to update user preferences: ${error.message}`);
    }
  } else {
    // Create new preferences
    const { error } = await supabase.from('user_preferences').insert({
      id,
      user_id: userId,
      preferred_assistant: preferences.preferredAssistant || null,
      preferred_ai_provider: preferences.preferredAIProvider || null,
      created_at: now,
      updated_at: now,
    });

    if (error) {
      console.error('Error creating user preferences:', error);
      throw new Error(`Failed to create user preferences: ${error.message}`);
    }
  }
};

// Get user preferences
export const getUserPreferences = async (
  userId: string
): Promise<{
  preferredAssistant?: string;
  preferredAIProvider?: string;
} | null> => {
  const { data, error } = await supabase
    .from('user_preferences')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching user preferences:', error);
    return null;
  }

  return {
    preferredAssistant: data.preferred_assistant || undefined,
    preferredAIProvider: data.preferred_ai_provider || undefined,
  };
};
