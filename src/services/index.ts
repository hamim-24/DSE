import type { Resource } from '../types/aiEducationTypes';
import { getAssistantById } from '../data/specializedAssistants';
import { generateId } from '../utils/idUtils';
import { GrokAIService, grokAIService } from './GrokAIService';

// Re-export everything from GrokAIService
export { GrokAIService, grokAIService };

// Mock function for tracking AI usage (replace with actual implementation)
export const trackAIUsage = async (
  assistantType: string,
  aiProvider: string,
  userId?: string | null
): Promise<void> => {
  console.log(
    `Tracking AI usage: ${assistantType}, ${aiProvider}, ${
      userId || 'anonymous'
    }`
  );
  // In a real implementation, this would save to Supabase
};

// Process the response from Grok API
const processGrokResponse = (
  text: string,
  assistantType: string
): {
  text: string;
  resources: Resource[];
  suggestedQuestions: string[];
} => {
  // Try to extract resources and suggested questions from the response
  let resources: Resource[] = [];
  let suggestedQuestions: string[] = [];

  try {
    // Look for resources section in the response
    const resourcesMatch = text.match(
      /Resources:([\s\S]*?)(?=Suggested Questions:|$)/i
    );
    if (resourcesMatch && resourcesMatch[1]) {
      const resourcesText = resourcesMatch[1].trim();
      const resourceLines = resourcesText
        .split('\n')
        .filter((line) => line.trim().length > 0);

      resources = resourceLines.map((line) => {
        const titleMatch = line.match(/\*\*(.*?)\*\*|-(.*?):/i);
        const urlMatch =
          line.match(/\[(.*?)\]$$(https?:\/\/.*?)$$/i) ||
          line.match(/(https?:\/\/.*?)(\s|$)/i);

        return {
          id: generateId(),
          title: titleMatch
            ? (titleMatch[1] || titleMatch[2]).trim()
            : 'Educational Resource',
          url: urlMatch ? urlMatch[2] || urlMatch[1] : 'https://example.com',
          description: line
            .replace(titleMatch?.[0] || '', '')
            .replace(urlMatch?.[0] || '', '')
            .trim(),
        };
      });
    }

    // Look for suggested questions section in the response
    const questionsMatch = text.match(/Suggested Questions:([\s\S]*?)(?=$)/i);
    if (questionsMatch && questionsMatch[1]) {
      const questionsText = questionsMatch[1].trim();
      suggestedQuestions = questionsText
        .split('\n')
        .filter((line) => line.trim().length > 0)
        .map((line) => line.replace(/^\d+\.\s*|\*\s*|-\s*/, '').trim());
    }

    // Clean up the text by removing the resources and suggested questions sections
    let cleanedText = text;
    if (resourcesMatch) {
      cleanedText = cleanedText.replace(resourcesMatch[0], '');
    }
    if (questionsMatch) {
      cleanedText = cleanedText.replace(questionsMatch[0], '');
    }

    // If we successfully extracted resources or questions, use the cleaned text
    if (resources.length > 0 || suggestedQuestions.length > 0) {
      text = cleanedText.trim();
    }
  } catch (error) {
    console.error('Error processing Grok response:', error);
    // If there's an error in processing, just use the original text
  }

  // If we couldn't extract resources or questions, provide some defaults
  if (resources.length === 0) {
    resources = getDefaultResources(assistantType);
  }

  if (suggestedQuestions.length === 0) {
    suggestedQuestions = getDefaultQuestions(assistantType);
  }

  return {
    text,
    resources,
    suggestedQuestions,
  };
};

// Get default resources based on assistant type
const getDefaultResources = (assistantType: string): Resource[] => {
  const commonResources = [
    {
      id: generateId(),
      title: 'বাংলাপিডিয়া',
      url: 'https://bn.wikipedia.org/',
      description: 'বাংলা ভাষায় বিশ্বকোষ',
    },
  ];

  // Add specialized resources based on assistant type
  switch (assistantType) {
    case 'physics':
      return [
        ...commonResources,
        {
          id: generateId(),
          title: 'পদার্থবিজ্ঞান শিক্ষা',
          url: 'https://www.khanacademy.org/science/physics',
          description: 'পদার্থবিজ্ঞান সম্পর্কিত ভিডিও ও অনুশীলন',
        },
      ];
    case 'chemistry':
      return [
        ...commonResources,
        {
          id: generateId(),
          title: 'রসায়ন শিক্ষা',
          url: 'https://www.khanacademy.org/science/chemistry',
          description: 'রসায়ন সম্পর্কিত ভিডিও ও অনুশীলন',
        },
      ];
    // Add cases for other assistant types
    default:
      return commonResources;
  }
};

// Get default questions based on assistant type
const getDefaultQuestions = (assistantType: string): string[] => {
  const commonQuestions = [
    'এই বিষয়ে আরও বিস্তারিত জানতে চাই',
    'এটি সম্পর্কে একটি উদাহরণ দিন',
  ];

  // Add specialized questions based on assistant type
  switch (assistantType) {
    case 'physics':
      return [
        ...commonQuestions,
        'নিউটনের গতিসূত্রগুলি কী কী?',
        'আলোর প্রকৃতি কী?',
      ];
    case 'chemistry':
      return [
        ...commonQuestions,
        'পর্যায় সারণি কী?',
        'অম্ল ও ক্ষার কাকে বলে?',
      ];
    // Add cases for other assistant types
    default:
      return commonQuestions;
  }
};

// Get a response from Grok AI with specialized assistant
export const getGrokResponse = async (
  prompt: string,
  assistantType = 'general',
  context?: string,
  userId?: string | null
): Promise<{
  text: string;
  resources: Resource[];
  suggestedQuestions: string[];
}> => {
  try {
    console.log('Getting Grok response for:', prompt);
    console.log('Assistant type:', assistantType);
    console.log('Context:', context || 'None');

    // Get the specialized assistant
    const assistant = getAssistantById(assistantType);

    // Track usage in Supabase
    await trackAIUsage(assistantType, 'grok', userId);

    // Enhance the system prompt with instructions to include resources and suggested questions
    const enhancedSystemPrompt = `${assistant.systemPrompt}
    
After providing your answer, please include:

1. Resources: List 2-3 relevant educational resources with titles and brief descriptions.
2. Suggested Questions: Suggest 3-4 follow-up questions the user might want to ask next.

Format your response like this:
[Your detailed answer to the user's question]

Resources:
- **Resource Title 1**: Brief description (URL if available)
- **Resource Title 2**: Brief description (URL if available)

Suggested Questions:
1. First suggested follow-up question?
2. Second suggested follow-up question?
3. Third suggested follow-up question?`;

    // Use the GrokAIService to get a response
    const messages = [
      { role: 'system', content: enhancedSystemPrompt },
      { role: 'user', content: context ? `${context}\n\n${prompt}` : prompt },
    ];

    try {
      // Try to use the GrokAIService
      const response = await grokAIService.createChatCompletion(messages);
      return {
        text: response.content,
        resources:
          response.resources?.map((r: any) => ({
            id: generateId(),
            title: r.title,
            url: r.url,
            description: r.description || '',
          })) || getDefaultResources(assistantType),
        suggestedQuestions:
          response.suggestedQuestions || getDefaultQuestions(assistantType),
      };
    } catch (error) {
      console.error('Error using GrokAIService:', error);
      throw error; // Let the outer catch block handle it
    }
  } catch (error) {
    console.error('Error in getGrokResponse:', error);

    // Return a fallback response
    return {
      text: `Sorry, I encountered an error: ${
        error instanceof Error ? error.message : 'Unknown error'
      }. Please try again later.`,
      resources: getDefaultResources(assistantType),
      suggestedQuestions: ['Can you try asking a different question?'],
    };
  }
};

// Get a default AI response (not using Grok)
export const getDefaultAIResponse = async (
  prompt: string,
  assistantType = 'general',
  context?: string,
  userId?: string | null
): Promise<{
  text: string;
  resources: Resource[];
  suggestedQuestions: string[];
}> => {
  console.log('Getting default AI response for:', prompt);
  console.log('Assistant type:', assistantType);
  console.log('Context:', context || 'None');

  // Track usage in Supabase
  await trackAIUsage(assistantType, 'default', userId);

  // Get the specialized assistant
  const assistant = getAssistantById(assistantType);

  let response = `[${assistant.name}] This is a default AI response to: "${prompt}".`;

  if (context) {
    response += ` Context: ${context}`;
  }

  return {
    text: response,
    resources: getDefaultResources(assistantType),
    suggestedQuestions: getDefaultQuestions(assistantType),
  };
};
