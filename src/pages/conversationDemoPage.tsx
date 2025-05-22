'use client';

import type React from 'react';
import { useState } from 'react';
import ConversationComponent from '../components/ai-education/ConversationComponent';

const ConversationDemoPage: React.FC = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<string>('general');

  // Predefined system prompts
  const systemPrompts = {
    general: 'You are a helpful AI assistant focused on education.',
    math: 'You are a math tutor. Explain concepts clearly and provide step-by-step solutions.',
    science:
      'You are a science educator. Explain scientific concepts with examples and analogies.',
    history:
      'You are a history expert. Provide accurate historical information with context.',
    literature:
      'You are a literature professor. Analyze texts and explain literary concepts.',
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">AI Conversation Demo</h1>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Assistant Type:
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedPrompt('general')}
            className={`px-4 py-2 rounded-md ${
              selectedPrompt === 'general'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            General
          </button>
          <button
            onClick={() => setSelectedPrompt('math')}
            className={`px-4 py-2 rounded-md ${
              selectedPrompt === 'math'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            Math
          </button>
          <button
            onClick={() => setSelectedPrompt('science')}
            className={`px-4 py-2 rounded-md ${
              selectedPrompt === 'science'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            Science
          </button>
          <button
            onClick={() => setSelectedPrompt('history')}
            className={`px-4 py-2 rounded-md ${
              selectedPrompt === 'history'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            History
          </button>
          <button
            onClick={() => setSelectedPrompt('literature')}
            className={`px-4 py-2 rounded-md ${
              selectedPrompt === 'literature'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            Literature
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 h-[600px]">
        <ConversationComponent
          systemPrompt={
            systemPrompts[selectedPrompt as keyof typeof systemPrompts]
          }
          className="h-full"
        />
      </div>

      <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h2 className="text-lg font-medium mb-2">About this Demo</h2>
        <p className="text-gray-700">
          This demo showcases the AI conversation component using the X.AI
          (Grok) integration. You can select different assistant types to see
          how the AI responds with different personalities and expertise.
        </p>
        <p className="text-gray-700 mt-2">
          The conversation is powered by the GrokAIService which communicates
          with the X.AI API.
        </p>
      </div>
    </div>
  );
};

export default ConversationDemoPage;
