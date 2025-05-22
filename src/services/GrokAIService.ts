import { generateId } from "../utils/idUtils"

// Types for the AI service
export interface GrokMessage {
  role: "system" | "user" | "assistant"
  content: string
}

export interface ChatResponse {
  content: string
  resources?: Array<{ title: string; url: string; description?: string }>
  suggestedQuestions?: string[]
}

export interface GrokConversation {
  id: string
  messages: GrokMessage[]
  title?: string
  createdAt: number
  updatedAt: number
}

export interface GrokAIResponse {
  text: string
  resources?: Array<{
    id: string
    title: string
    url: string
    description?: string
    type: string
  }>
  suggestedQuestions?: string[]
  model?: string
  usage?: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
}

// Constants for API configuration
const API_CONFIG = {
  BASE_URL: "https://generativelanguage.googleapis.com/v1beta",
  DEFAULT_MODEL: "gemini-1.5-flash",
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // ms
  TIMEOUT: 30000, // ms
}

// Google Gemini API key
const GOOGLE_API_KEY = "AIzaSyCjv8K3zQJn_lvDoFc3V3P-N_RG-CD57BA"

// AI service class using Google Gemini
export class GrokAIService {
  private baseURL: string
  private apiKey: string
  private defaultModel: string
  private maxRetries: number
  private retryDelay: number
  private timeout: number

  constructor(config = API_CONFIG) {
    this.baseURL = config.BASE_URL
    this.defaultModel = config.DEFAULT_MODEL
    this.maxRetries = config.MAX_RETRIES
    this.retryDelay = config.RETRY_DELAY
    this.timeout = config.TIMEOUT

    // Use the provided Google API key
    this.apiKey = GOOGLE_API_KEY

    if (!this.apiKey) {
      console.warn("Google API key not found. API calls will not work.")
    } else {
      // Log a masked version of the API key for debugging
      const maskedKey = `${this.apiKey.substring(0, 4)}...${this.apiKey.substring(this.apiKey.length - 4)}`
      console.log(`Using Google Gemini API key: ${maskedKey}`)
    }
  }

  /**
   * Create a new conversation with an initial system prompt
   */
  createConversation(systemPrompt = ""): GrokConversation {
    const conversation: GrokConversation = {
      id: generateId(),
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }

    if (systemPrompt) {
      conversation.messages.push({
        role: "system",
        content: systemPrompt,
      })
    }

    return conversation
  }

  /**
   * Add a user message to a conversation
   */
  addUserMessage(conversation: GrokConversation, content: string): GrokConversation {
    const updatedConversation = {
      ...conversation,
      messages: [...conversation.messages, { role: "user", content }],
      updatedAt: Date.now(),
    }

    return updatedConversation
  }

  /**
   * Add an assistant message to a conversation
   */
  addAssistantMessage(conversation: GrokConversation, content: string): GrokConversation {
    const updatedConversation = {
      ...conversation,
      messages: [...conversation.messages, { role: "assistant", content }],
      updatedAt: Date.now(),
    }

    return updatedConversation
  }

  /**
   * Send a conversation to the API and get a response
   */
  async sendMessage(conversation: GrokConversation): Promise<GrokConversation> {
    try {
      const response = await this.createChatCompletion(conversation.messages)
      return this.addAssistantMessage(conversation, response.content)
    } catch (error) {
      console.error("Error sending message:", error)
      return this.addAssistantMessage(
        conversation,
        "I'm sorry, I encountered an error processing your request. Please try again later.",
      )
    }
  }

  async createChatCompletion(messages: GrokMessage[], retryCount = 0): Promise<ChatResponse> {
    try {
      if (!this.apiKey) {
        return this.getMockResponse(messages[messages.length - 1]?.content || "")
      }

      // Convert messages to Gemini format
      const geminiMessages = this.convertToGeminiFormat(messages)

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), this.timeout)

      const response = await fetch(`${this.baseURL}/models/${this.defaultModel}:generateContent?key=${this.apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: geminiMessages,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1000,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
          ],
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const errorMessage = errorData.error?.message || response.statusText

        // Handle rate limiting or temporary server issues
        if (
          response.status === 429 || // Too Many Requests
          response.status === 500 || // Internal Server Error
          response.status === 503 // Service Unavailable
        ) {
          if (retryCount < this.maxRetries) {
            const delay = this.retryDelay * Math.pow(2, retryCount)
            console.warn(`API request failed with ${response.status}. Retrying in ${delay}ms...`)
            await new Promise((resolve) => setTimeout(resolve, delay))
            return this.createChatCompletion(messages, retryCount + 1)
          }
        }

        throw new Error(`Google Gemini API error (${response.status}): ${errorMessage}`)
      }

      const data = await response.json()

      if (!data.candidates || data.candidates.length === 0) {
        throw new Error("No response generated from Gemini API")
      }

      const content = data.candidates[0].content.parts[0].text

      // Extract resources and suggested questions from the response
      const { cleanContent, resources, suggestedQuestions } = this.parseResponse(content)

      // Log usage statistics if available
      if (data.usageMetadata) {
        console.log("API usage:", {
          promptTokens: data.usageMetadata.promptTokenCount,
          completionTokens: data.usageMetadata.candidatesTokenCount,
          totalTokens: data.usageMetadata.totalTokenCount,
        })
      }

      return {
        content: cleanContent,
        resources,
        suggestedQuestions,
      }
    } catch (error) {
      if (error.name === "AbortError") {
        console.error("Request timed out after", this.timeout, "ms")
        throw new Error("Request timed out. Please try again.")
      }

      console.error("Error in createChatCompletion:", error)

      if (retryCount >= this.maxRetries) {
        throw error
      }

      return this.getMockResponse(messages[messages.length - 1]?.content || "")
    }
  }

  /**
   * Convert messages to Gemini API format
   */
  private convertToGeminiFormat(messages: GrokMessage[]) {
    const geminiMessages = []
    let systemPrompt = ""

    // Extract system prompt
    const systemMessage = messages.find((msg) => msg.role === "system")
    if (systemMessage) {
      systemPrompt = systemMessage.content
    }

    // Convert user and assistant messages
    const conversationMessages = messages.filter((msg) => msg.role !== "system")

    for (const message of conversationMessages) {
      geminiMessages.push({
        role: message.role === "assistant" ? "model" : "user",
        parts: [
          {
            text:
              message.role === "user" && systemPrompt ? `${systemPrompt}\n\nUser: ${message.content}` : message.content,
          },
        ],
      })
    }

    return geminiMessages
  }

  /**
   * Parse response to extract resources and suggested questions
   */
  private parseResponse(content: string) {
    // Extract resources
    const resourcesMatch = content.match(/(?:Resources?|Educational Resources?):\s*((?:[-•]\s*.*(?:\n|$))+)/i)
    let resources = []
    if (resourcesMatch) {
      const resourceLines = resourcesMatch[1].trim().split("\n")
      resources = resourceLines
        .map((line) => {
          const cleaned = line.replace(/^[-•]\s*/, "").trim()
          const urlMatch = cleaned.match(/\[(.*?)\]$$(.*?)$$/)
          if (urlMatch) {
            return { title: urlMatch[1], url: urlMatch[2] }
          }
          return { title: cleaned, url: `https://www.google.com/search?q=${encodeURIComponent(cleaned)}` }
        })
        .filter((r) => r.title)
    }

    // Extract suggested questions
    const questionsMatch = content.match(/(?:Suggested Questions?|Follow-up Questions?):\s*((?:[-•]\s*.*(?:\n|$))+)/i)
    let suggestedQuestions = []
    if (questionsMatch) {
      const questionLines = questionsMatch[1].trim().split("\n")
      suggestedQuestions = questionLines.map((line) => line.replace(/^[-•]\s*/, "").trim()).filter((q) => q.length > 0)
    }

    // Clean content by removing extracted sections
    const cleanContent = content
      .replace(/(?:Resources?|Educational Resources?):\s*(?:[-•]\s*.*(?:\n|$))+/gi, "")
      .replace(/(?:Suggested Questions?|Follow-up Questions?):\s*(?:[-•]\s*.*(?:\n|$))+/gi, "")
      .trim()

    return { cleanContent, resources, suggestedQuestions }
  }

  // For backward compatibility
  async getGrokResponse(prompt: string, systemPrompt = ""): Promise<GrokAIResponse> {
    const messages = [
      {
        role: "system",
        content: systemPrompt || "You are a helpful AI assistant specialized in education.",
      },
      { role: "user", content: prompt },
    ]

    try {
      const response = await this.createChatCompletion(messages)

      return {
        text: response.content,
        resources:
          response.resources?.map((r) => ({
            id: generateId(),
            title: r.title,
            type: "article",
            url: r.url,
            description: r.description || "",
          })) || [],
        suggestedQuestions: response.suggestedQuestions || [],
        model: this.defaultModel,
        usage: {
          promptTokens: 0,
          completionTokens: 0,
          totalTokens: 0,
        },
      }
    } catch (error) {
      console.error("Error in getGrokResponse:", error)

      return {
        text: `I'm sorry, I couldn't process your request: "${prompt}". Please try again later.`,
        resources: [
          {
            id: generateId(),
            title: "Khan Academy",
            url: "https://www.khanacademy.org/",
            description: "Free educational resources",
            type: "website",
          },
        ],
        suggestedQuestions: [
          "Can you explain this in simpler terms?",
          "What are the key concepts I should understand?",
          "Can you provide an example?",
        ],
        model: this.defaultModel,
        usage: {
          promptTokens: 0,
          completionTokens: 0,
          totalTokens: 0,
        },
      }
    }
  }

  // Helper method to generate mock responses when API key is not available
  private getMockResponse(prompt: string): ChatResponse {
    return {
      content: `This is a mock response to: "${prompt}". In a real implementation, this would come from the Google Gemini API.`,
      resources: [
        {
          title: "Khan Academy",
          url: "https://www.khanacademy.org/",
          description: "Free educational resources",
        },
        {
          title: "Wikipedia",
          url: "https://www.wikipedia.org/",
          description: "Free online encyclopedia",
        },
      ],
      suggestedQuestions: [
        "Can you explain this in simpler terms?",
        "What are the key concepts I should understand?",
        "Can you provide an example?",
      ],
    }
  }
}

// Export a singleton instance
export const grokAIService = new GrokAIService()

// Legacy function for backward compatibility
export async function getGrokResponse(prompt: string, context?: string): Promise<GrokAIResponse> {
  return grokAIService.getGrokResponse(prompt, context)
}
