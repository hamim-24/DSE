import { generateId } from '../utils/idUtils';

// Types for the Grok AI service
export interface GrokMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  content: string;
  resources?: Array<{ title: string; url: string; description?: string }>;
  suggestedQuestions?: string[];
}

export interface GrokConversation {
  id: string;
  messages: GrokMessage[];
  title?: string;
  createdAt: number;
  updatedAt: number;
}

export interface GrokAIResponse {
  text: string;
  resources?: Array<{
    id: string;
    title: string;
    url: string;
    description?: string;
    type: string;
  }>;
  suggestedQuestions?: string[];
  model?: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

// Constants for API configuration
const API_CONFIG = {
  BASE_URL: 'https://api.x.ai/v1',
  DEFAULT_MODEL: 'grok-2-latest',
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // ms
  TIMEOUT: 30000, // ms
};

// Hardcoded API key - in a real production app, this should be stored securely
// and accessed through environment variables or a secure backend
const GROK_API_KEY =
  'xai-4PASwC4J2yjby7h2m9MhQDoBPessyhiiMb3AoesRb2A8V0lrh8otmiVaP64ETPSJxJhEclNh9dPpVggS';

// Grok AI service class
export class GrokAIService {
  private baseURL: string;
  private apiKey: string;
  private defaultModel: string;
  private maxRetries: number;
  private retryDelay: number;
  private timeout: number;

  constructor(config = API_CONFIG) {
    this.baseURL = config.BASE_URL;
    this.defaultModel = config.DEFAULT_MODEL;
    this.maxRetries = config.MAX_RETRIES;
    this.retryDelay = config.RETRY_DELAY;
    this.timeout = config.TIMEOUT;

    // Use the hardcoded API key
    this.apiKey = GROK_API_KEY;

    if (!this.apiKey) {
      console.warn('X.AI API key not found. API calls will not work.');
    } else {
      // Log a masked version of the API key for debugging
      const maskedKey = `${this.apiKey.substring(
        0,
        4
      )}...${this.apiKey.substring(this.apiKey.length - 4)}`;
      console.log(`Using Grok API key: ${maskedKey}`);
    }
  }

  /**
   * Create a new conversation with an initial system prompt
   */
  createConversation(systemPrompt = ''): GrokConversation {
    const conversation: GrokConversation = {
      id: generateId(),
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    if (systemPrompt) {
      conversation.messages.push({
        role: 'system',
        content: systemPrompt,
      });
    }

    return conversation;
  }

  /**
   * Add a user message to a conversation
   */
  addUserMessage(
    conversation: GrokConversation,
    content: string
  ): GrokConversation {
    const updatedConversation = {
      ...conversation,
      messages: [...conversation.messages, { role: 'user', content }],
      updatedAt: Date.now(),
    };

    return updatedConversation;
  }

  /**
   * Add an assistant message to a conversation
   */
  addAssistantMessage(
    conversation: GrokConversation,
    content: string
  ): GrokConversation {
    const updatedConversation = {
      ...conversation,
      messages: [...conversation.messages, { role: 'assistant', content }],
      updatedAt: Date.now(),
    };

    return updatedConversation;
  }

  /**
   * Send a conversation to the API and get a response
   */
  async sendMessage(conversation: GrokConversation): Promise<GrokConversation> {
    try {
      const response = await this.createChatCompletion(conversation.messages);

      return this.addAssistantMessage(conversation, response.content);
    } catch (error) {
      console.error('Error sending message:', error);

      // Add error message to conversation
      return this.addAssistantMessage(
        conversation,
        "I'm sorry, I encountered an error processing your request. Please try again later."
      );
    }
  }

  async createChatCompletion(
    messages: GrokMessage[],
    retryCount = 0
  ): Promise<ChatResponse> {
    try {
      if (!this.apiKey) {
        // Return mock response if API key is not available
        return this.getMockResponse(
          messages[messages.length - 1]?.content || ''
        );
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.defaultModel,
          messages: [
            ...messages,
            {
              role: 'system',
              content:
                'After your main response, please provide: 1) A list of 3-5 relevant educational resources with titles and URLs in JSON format. 2) A list of 3-5 suggested follow-up questions the user might want to ask.',
            },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error?.message || response.statusText;

        // Handle rate limiting or temporary server issues
        if (
          response.status === 429 || // Too Many Requests
          response.status === 500 || // Internal Server Error
          response.status === 503 // Service Unavailable
        ) {
          if (retryCount < this.maxRetries) {
            // Exponential backoff
            const delay = this.retryDelay * Math.pow(2, retryCount);
            console.warn(
              `API request failed with ${response.status}. Retrying in ${delay}ms...`
            );

            await new Promise((resolve) => setTimeout(resolve, delay));
            return this.createChatCompletion(messages, retryCount + 1);
          }
        }

        throw new Error(`X.AI API error (${response.status}): ${errorMessage}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;

      // Extract resources and suggested questions from the response
      const resourcesMatch = content.match(/Resources:\s*(\[.*?\])/s);
      const questionsMatch = content.match(/Suggested questions:\s*(\[.*?\])/s);

      let resources = [];
      let suggestedQuestions = [];
      let cleanContent = content;

      // Parse resources if found
      if (resourcesMatch && resourcesMatch[1]) {
        try {
          resources = JSON.parse(resourcesMatch[1]);
          cleanContent = cleanContent.replace(/Resources:\s*(\[.*?\])/s, '');
        } catch (e) {
          console.error('Failed to parse resources:', e);
        }
      }

      // Parse suggested questions if found
      if (questionsMatch && questionsMatch[1]) {
        try {
          suggestedQuestions = JSON.parse(questionsMatch[1]);
          cleanContent = cleanContent.replace(
            /Suggested questions:\s*(\[.*?\])/s,
            ''
          );
        } catch (e) {
          console.error('Failed to parse suggested questions:', e);
        }
      }

      // Clean up the content
      cleanContent = cleanContent.trim();

      // Log usage statistics if available
      if (data.usage) {
        console.log('API usage:', {
          promptTokens: data.usage.prompt_tokens,
          completionTokens: data.usage.completion_tokens,
          totalTokens: data.usage.total_tokens,
        });
      }

      return {
        content: cleanContent,
        resources,
        suggestedQuestions,
      };
    } catch (error) {
      // Handle abort errors separately
      if (error.name === 'AbortError') {
        console.error('Request timed out after', this.timeout, 'ms');
        throw new Error('Request timed out. Please try again.');
      }

      console.error('Error in createChatCompletion:', error);

      // If we've reached max retries or it's not a retryable error, throw
      if (retryCount >= this.maxRetries) {
        throw error;
      }

      // Return mock response if there's an error
      return this.getMockResponse(messages[messages.length - 1]?.content || '');
    }
  }

  // For backward compatibility
  async getGrokResponse(
    prompt: string,
    systemPrompt = ''
  ): Promise<GrokAIResponse> {
    const messages = [
      {
        role: 'system',
        content: systemPrompt || 'You are a helpful AI assistant.',
      },
      { role: 'user', content: prompt },
    ];

    try {
      const response = await this.createChatCompletion(messages);

      return {
        text: response.content,
        resources:
          response.resources?.map((r) => ({
            id: generateId(),
            title: r.title,
            type: 'article',
            url: r.url,
            description: r.description || '',
          })) || [],
        suggestedQuestions: response.suggestedQuestions || [],
        model: this.defaultModel,
        usage: {
          promptTokens: 0,
          completionTokens: 0,
          totalTokens: 0,
        },
      };
    } catch (error) {
      console.error('Error in getGrokResponse:', error);

      // Return mock response if there's an error
      return {
        text: `I'm sorry, I couldn't process your request: "${prompt}". Please try again later.`,
        resources: [
          {
            id: generateId(),
            title: 'Khan Academy',
            url: 'https://www.khanacademy.org/',
            description: 'Free educational resources',
            type: 'website',
          },
        ],
        suggestedQuestions: [
          'Can you explain this in simpler terms?',
          'What are the key concepts I should understand?',
          'Can you provide an example?',
        ],
        model: this.defaultModel,
        usage: {
          promptTokens: 0,
          completionTokens: 0,
          totalTokens: 0,
        },
      };
    }
  }

  // Helper method to generate mock responses when API key is not available
  private getMockResponse(prompt: string): ChatResponse {
    return {
      content: `This is a mock response to: "${prompt}". In a real implementation, this would come from the Grok AI API.`,
      resources: [
        {
          title: 'Khan Academy',
          url: 'https://www.khanacademy.org/',
          description: 'Free educational resources',
        },
        {
          title: 'Wikipedia',
          url: 'https://www.wikipedia.org/',
          description: 'Free online encyclopedia',
        },
      ],
      suggestedQuestions: [
        'Can you explain this in simpler terms?',
        'What are the key concepts I should understand?',
        'Can you provide an example?',
      ],
    };
  }
}

// Export a singleton instance
export const grokAIService = new GrokAIService();

// Legacy function for backward compatibility
export async function getGrokResponse(
  prompt: string,
  context?: string
): Promise<GrokAIResponse> {
  return grokAIService.getGrokResponse(prompt, context);
}
