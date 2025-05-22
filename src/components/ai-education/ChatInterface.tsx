'use client';

import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import { grokAIService, type GrokConversation } from '../../services';
import type { SpecializedAssistant } from '../../types/aiEducationTypes';
//import { LoadingSpinner } from '../ui/LoadingSpinner';

interface ChatInterfaceProps {
  assistant: SpecializedAssistant;
  topic?: string;
  subtopic?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  assistant,
  topic,
  subtopic,
}) => {
  const [conversation, setConversation] = useState<GrokConversation | null>(
    null
  );
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize conversation with system prompt
  useEffect(() => {
    const systemPrompt = generateSystemPrompt(assistant, topic, subtopic);
    const newConversation = grokAIService.createConversation(systemPrompt);
    setConversation(newConversation);
  }, [assistant, topic, subtopic]);

  // Generate system prompt based on assistant, topic, and subtopic
  const generateSystemPrompt = (
    assistant: SpecializedAssistant,
    topic?: string,
    subtopic?: string
  ): string => {
    let prompt = assistant.systemPrompt;

    if (topic) {
      prompt += `\n\nThe student is asking about ${topic}.`;

      if (subtopic) {
        prompt += ` Specifically, they are interested in ${subtopic}.`;
      }
    }

    prompt += `\n\nPlease provide educational responses that are:
1. Accurate and factual
2. Age-appropriate for secondary school students
3. Clear and easy to understand
4. Include examples where helpful
5. End with 2-3 suggested follow-up questions the student might want to ask

If you reference any educational resources, please format them as:
RESOURCES:
- [Resource Title](URL or description)
- [Resource Title](URL or description)`;

    return prompt;
  };

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!inputValue.trim() || !conversation || isLoading) return;

    setIsLoading(true);

    try {
      // Add user message to conversation
      const updatedConversation = grokAIService.addUserMessage(
        conversation,
        inputValue
      );
      setConversation(updatedConversation);
      setInputValue('');

      // Get response from AI
      const responseConversation = await grokAIService.sendMessage(
        updatedConversation
      );
      setConversation(responseConversation);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle pressing Enter to send message
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Render suggested questions as clickable buttons
  const renderSuggestedQuestions = (message: string) => {
    // Extract suggested questions from the message
    const match = message.match(
      /(?:Here are some follow-up questions you might consider:|Some questions you might want to ask next:|You might want to ask:)([\s\S]*?)(?=$|RESOURCES:)/i
    );

    if (!match || !match[1]) return null;

    const questionsText = match[1].trim();
    const questions = questionsText
      .split(/\n+/)
      .map((q) => q.replace(/^-\s*|\d+\.\s*/, '').trim())
      .filter((q) => q.length > 0 && q.endsWith('?'));

    if (questions.length === 0) return null;

    return (
      <div className="mt-3 space-y-2">
        <p className="text-sm font-medium text-gray-700">
          Suggested questions:
        </p>
        <div className="flex flex-wrap gap-2">
          {questions.map((question, index) => (
            <button
              key={index}
              className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
              onClick={() => {
                setInputValue(question);
              }}
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Extract and render resources from the message
  const renderResources = (message: string) => {
    const resourcesMatch = message.match(
      /RESOURCES:([\s\S]*?)(?=$|Some questions you might want to ask next:|You might want to ask:|Here are some follow-up questions)/i
    );

    if (!resourcesMatch || !resourcesMatch[1]) return null;

    const resourcesText = resourcesMatch[1].trim();
    const resources = resourcesText
      .split(/\n+/)
      .map((r) => r.replace(/^-\s*/, '').trim())
      .filter((r) => r.length > 0);

    if (resources.length === 0) return null;

    return (
      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm font-medium text-gray-700 mb-2">Resources:</p>
        <ul className="space-y-1 text-sm">
          {resources.map((resource, index) => {
            // Try to extract title and URL if in markdown format
            const linkMatch = resource.match(/\[(.*?)\]$$(.*?)$$/);

            if (linkMatch) {
              const [, title, url] = linkMatch;
              return (
                <li key={index}>
                  <a
                    href={
                      url.startsWith('http')
                        ? url
                        : `https://www.google.com/search?q=${encodeURIComponent(
                            title
                          )}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {title}
                  </a>
                </li>
              );
            }

            return <li key={index}>{resource}</li>;
          })}
        </ul>
      </div>
    );
  };

  // Format message content to handle markdown-like syntax
  const formatMessageContent = (content: string) => {
    // Remove resource and suggested questions sections for main content
    let formattedContent = content
      .replace(
        /RESOURCES:[\s\S]*?(?=$|Some questions you might want to ask next:|You might want to ask:|Here are some follow-up questions)/i,
        ''
      )
      .replace(
        /(?:Here are some follow-up questions you might consider:|Some questions you might want to ask next:|You might want to ask:)[\s\S]*?$/i,
        ''
      )
      .trim();

    // Simple formatting for bold text
    formattedContent = formattedContent.replace(
      /\*\*(.*?)\*\*/g,
      '<strong>$1</strong>'
    );

    // Simple formatting for italic text
    formattedContent = formattedContent.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Convert line breaks to <br> tags
    formattedContent = formattedContent.replace(/\n/g, '<br>');

    return formattedContent;
  };

  if (!conversation) {
    return (
      <div className="flex justify-center p-8">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.messages
          .filter((msg) => msg.role !== 'system') // Don't show system messages
          .map((message, index) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-3xl rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-blue-100 text-blue-900'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatMessageContent(message.content),
                  }}
                  className="whitespace-pre-wrap"
                />

                {message.role === 'assistant' && (
                  <>
                    {renderResources(message.content)}
                    {renderSuggestedQuestions(message.content)}
                  </>
                )}
              </div>
            </div>
          ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-3xl rounded-lg p-3 bg-gray-100">
              <LoadingSpinner size="small" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t p-4">
        <div className="flex items-end gap-2">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question..."
            className="flex-1 p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            Send
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Press Enter to send. Shift+Enter for new line.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
