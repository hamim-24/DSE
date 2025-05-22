'use client';

import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import type { Resource } from '../../types/aiEducationTypes';
import LoadingSpinner from '../ui/LoadingSpinner';
import { getGrokResponse } from '../../services';
import AIStatusIndicator from './AIStatusIndicator';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant' | 'system' | 'grok';
  timestamp: number;
  resources?: Resource[];
  suggestedQuestions?: string[];
}

interface GrokConversationProps {
  initialSystemPrompt?: string;
  initialMessages?: Message[];
  onConversationUpdate?: (messages: Message[]) => void;
  topic?: string;
  subtopic?: string;
}

const GrokConversation: React.FC<GrokConversationProps> = ({
  initialSystemPrompt = 'You are Grok, an AI assistant specialized in education. Provide helpful, accurate, and educational responses.',
  initialMessages = [],
  onConversationUpdate,
  topic,
  subtopic,
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Simulate typing effect for AI responses
  const simulateTypingEffect = (message: Message, callback: () => void) => {
    setIsTyping(true);

    // Add the message with empty content first
    const emptyMessage = { ...message, content: '' };
    setMessages((prev) => [...prev, emptyMessage]);

    // Get the full content
    const fullContent = message.content;
    let currentIndex = 0;

    // Function to add one character at a time
    const typeNextChar = () => {
      if (currentIndex < fullContent.length) {
        currentIndex++;
        const partialContent = fullContent.substring(0, currentIndex);

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === message.id ? { ...msg, content: partialContent } : msg
          )
        );

        // Random typing speed between 10-30ms per character
        const typingSpeed = Math.floor(Math.random() * 20) + 10;
        setTimeout(typeNextChar, typingSpeed);
      } else {
        setIsTyping(false);
        callback();
      }
    };

    // Start typing with a small initial delay
    setTimeout(typeNextChar, 300);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: 'user',
      timestamp: Date.now(),
    };

    // Update messages with user input
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // Get response from Grok
      const response = await getGrokResponse(
        input,
        topic || 'general',
        subtopic
      );

      // Create AI message
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: response.text || "Sorry, I couldn't generate a response.",
        sender: 'grok',
        timestamp: Date.now(),
        resources: response.resources || [],
        suggestedQuestions: response.suggestedQuestions || [],
      };

      // Use typing effect for AI response
      setIsLoading(false);
      simulateTypingEffect(aiMessage, () => {
        // Notify parent component if callback exists
        if (onConversationUpdate) {
          onConversationUpdate([...updatedMessages, aiMessage]);
        }
      });
    } catch (err) {
      console.error('Error getting response from Grok:', err);
      setError('Failed to get a response. Please try again.');
      setIsLoading(false);
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md">
      {/* Conversation header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-t-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">
            {topic
              ? `${topic}${subtopic ? ` - ${subtopic}` : ''}`
              : 'Grok AI Conversation'}
          </h2>
          <AIStatusIndicator className="text-white" />
        </div>
      </div>

      {/* Messages container */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Start a conversation with Grok AI</p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-3/4 rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-purple-100 text-gray-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className="text-sm font-medium mb-1">
                {message.sender === 'user' ? 'You' : 'Grok AI'}
                <span className="text-xs text-gray-500 ml-2">
                  {formatTimestamp(message.timestamp)}
                </span>
              </div>
              <div className="whitespace-pre-wrap">{message.content}</div>

              {/* Suggested questions */}
              {message.suggestedQuestions &&
                message.suggestedQuestions.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-sm font-medium text-gray-700">
                      Suggested questions:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {message.suggestedQuestions.map((question, index) => (
                        <button
                          key={index}
                          className="text-xs bg-white border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-100 transition-colors"
                          onClick={() => setInput(question)}
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              {/* Resources */}
              {message.resources && message.resources.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-700">
                    Resources:
                  </p>
                  <ul className="list-disc list-inside text-sm text-blue-600">
                    {message.resources.map((resource, index) => (
                      <li key={index}>
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {resource.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-4">
              <LoadingSpinner />
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-center">
            <div className="bg-red-100 text-red-800 rounded-lg p-3">
              {error}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-end space-x-2">
          <div className="flex-grow">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none min-h-[60px] max-h-[200px]"
              rows={1}
              disabled={isLoading || isTyping}
            />
            <p className="text-xs text-gray-500 mt-1">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading || isTyping}
            className="bg-purple-600 text-white rounded-lg px-4 py-3 hover:bg-purple-700 transition-colors disabled:bg-purple-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default GrokConversation;
