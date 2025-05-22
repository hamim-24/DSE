/**
 * Utility functions for AI-related operations
 */

// Function to sanitize user input before sending to AI
export const sanitizeInput = (input: string): string => {
  // Remove any potentially harmful characters or patterns
  return input.trim();
};

// Function to extract structured data from AI responses
export const extractStructuredData = (
  text: string
): {
  mainContent: string;
  resources: Array<{ title: string; url: string; description?: string }>;
  suggestedQuestions: string[];
} => {
  let mainContent = text;
  let resources: Array<{ title: string; url: string; description?: string }> =
    [];
  let suggestedQuestions: string[] = [];

  // Extract resources section
  const resourcesMatch = text.match(
    /Resources:([\s\S]*?)(?=Suggested Questions:|$)/i
  );
  if (resourcesMatch && resourcesMatch[1]) {
    const resourcesText = resourcesMatch[1].trim();

    // Remove resources section from main content
    mainContent = mainContent.replace(resourcesMatch[0], '').trim();

    // Parse resources
    const resourceLines = resourcesText
      .split('\n')
      .filter((line) => line.trim());

    resources = resourceLines.map((line) => {
      // Try to extract title, URL, and description
      const titleMatch = line.match(/\*\*(.*?)\*\*|-(.*?):/i);
      const urlMatch =
        line.match(/\[(.*?)\]$$(https?:\/\/.*?)$$/i) ||
        line.match(/(https?:\/\/.*?)(\s|$)/i);

      return {
        title: titleMatch
          ? (titleMatch[1] || titleMatch[2]).trim()
          : 'Resource',
        url: urlMatch ? urlMatch[2] || urlMatch[1] : 'https://example.com',
        description: line
          .replace(titleMatch?.[0] || '', '')
          .replace(urlMatch?.[0] || '', '')
          .trim(),
      };
    });
  }

  // Extract suggested questions section
  const questionsMatch = text.match(/Suggested Questions:([\s\S]*?)$/i);
  if (questionsMatch && questionsMatch[1]) {
    const questionsText = questionsMatch[1].trim();

    // Remove questions section from main content
    mainContent = mainContent.replace(questionsMatch[0], '').trim();

    // Parse questions
    suggestedQuestions = questionsText
      .split('\n')
      .filter((line) => line.trim())
      .map((line) => line.replace(/^\d+\.\s*|\*\s*|-\s*/, '').trim());
  }

  return {
    mainContent,
    resources,
    suggestedQuestions,
  };
};

// Function to estimate token count for API usage tracking
export const estimateTokenCount = (text: string): number => {
  // A very rough estimate: ~4 chars per token on average
  return Math.ceil(text.length / 4);
};

// Function to check if the API key is valid
export const isValidApiKey = (key: string): boolean => {
  // Check if the key matches the expected format for Grok API keys
  return /^xai-[a-zA-Z0-9]{48,}$/.test(key);
};
