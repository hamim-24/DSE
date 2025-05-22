'use client';

import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import {
  grokAIService,
  type GrokConversation,
  type GrokMessage,
} from '../../services/GrokAIService';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface ConversationComponentProps {
  systemPrompt?: string;
  initialMessages?: string[];
  className?: string;
}

const ConversationComponent: React.FC<ConversationComponentProps> = ({
  systemPrompt = 'You are a helpful AI assistant focused on education.',
  initialMessages = [],
  className = '',
}) => {
  const [conversation, setConversation] = useState<GrokConversation | null>(
    null
  );
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize conversation
  useEffect(() => {
    try {
      const newConversation = grokAIService.createConversation(systemPrompt);

      // Add initial messages if provided
      let updatedConversation = newConversation;
      for (const message of initialMessages) {
        updatedConversation = grokAIService.addUserMessage(
          updatedConversation,
          message
        );
      }

      setConversation(updatedConversation);

      // If there are initial messages, send them to get responses
      if (initialMessages.length > 0) {
        handleInitialMessages(updatedConversation);
      }
    } catch (err) {
      setError('Failed to initialize conversation');
      console.error('Error initializing conversation:', err);
    }
  }, [systemPrompt, initialMessages.join(',')]);

  // Handle initial messages
  const handleInitialMessages = async (conv: GrokConversation) => {
    setIsLoading(true);
    try {
      const responseConversation = await grokAIService.sendMessage(conv);
      setConversation(responseConversation);
    } catch (err) {
      setError('Failed to process initial messages');
      console.error('Error processing initial messages:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Send a message
  const handleSendMessage = async () => {
    if (!inputValue.trim() || !conversation || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      // Add user message
      const updatedConversation = grokAIService.addUserMessage(
        conversation,
        inputValue
      );
      setConversation(updatedConversation);
      setInputValue('');

      // Get AI response
      const responseConversation = await grokAIService.sendMessage(
        updatedConversation
      );
      setConversation(responseConversation);
    } catch (err) {
      setError('Failed to send message');
      console.error('Error sending message:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format message content
  const formatMessageContent = (content: string) => {
    // Convert line breaks to <br> tags
    return content.replace(/\n/g, '<br>');
  };

  // Get message style based on role
  const getMessageStyle = (role: string) => {
    switch (role) {
      case 'user':
        return 'bg-blue-100 text-blue-900';
      case 'assistant':
        return 'bg-gray-100 text-gray-900';
      case 'system':
        return 'bg-yellow-50 text-yellow-900 text-xs italic';
      default:
        return 'bg-gray-100 text-gray-900';
    }
  };

  if (!conversation) {
    return (
      <div className={`flex justify-center items-center p-4 ${className}`}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col h-full border border-gray-200 rounded-lg overflow-hidden bg-white ${className}`}
    >
      {/* Header */}
      <div className="p-3 border-b border-gray-200 bg-gray-50">
        <h3 className="font-medium text-gray-800">AI Conversation</h3>
        {conversation.title && (
          <p className="text-sm text-gray-500">{conversation.title}</p>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-white">
        {conversation.messages.filter((msg) => msg.role !== 'system').length ===
        0 ? (
          <div className="text-center text-gray-500 p-4">
            <p>Start a conversation by sending a message</p>
          </div>
        ) : (
          <div className="space-y-4">
            {conversation.messages.map(
              (message: GrokMessage) =>
                message.role !== 'system' && (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[75%] p-3 rounded-lg ${getMessageStyle(
                        message.role
                      )}`}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: formatMessageContent(message.content),
                        }}
                        className="whitespace-pre-wrap"
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                )
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[75%] p-3 rounded-lg bg-gray-100">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                      style={{ animationDelay: '0.4s' }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Error message */}
      {error && (
        <div className="p-2 bg-red-50 border-t border-red-200">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-gray-200 bg-gray-50">
        <div className="flex">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={2}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            Send
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Press Enter to send. Shift+Enter for new line.
        </p>
      </div>
    </div>
  );
};

export default ConversationComponent;
