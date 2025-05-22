'use client';

import type React from 'react';
import { useState } from 'react';
import { grokAIService } from '../../services/GrokAIService';
import { isValidApiKey } from '../../utils/aiUtils';

interface AIDebugPanelProps {
  className?: string;
}

const AIDebugPanel: React.FC<AIDebugPanelProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [testPrompt, setTestPrompt] = useState('What is 2+2?');
  const [testResponse, setTestResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [apiKeyStatus, setApiKeyStatus] = useState<
    'valid' | 'invalid' | 'checking' | 'none'
  >('none');

  const handleTestAPI = async () => {
    if (!testPrompt.trim()) return;

    setIsLoading(true);
    setTestResponse('');

    try {
      const response = await grokAIService.getGrokResponse(testPrompt);
      setTestResponse(response.text);
    } catch (error) {
      setTestResponse(
        `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckApiKey = () => {
    if (!apiKey.trim()) {
      setApiKeyStatus('none');
      return;
    }

    setApiKeyStatus('checking');

    if (isValidApiKey(apiKey)) {
      setApiKeyStatus('valid');
    } else {
      setApiKeyStatus('invalid');
    }
  };

  // Only show in development mode
  if (import.meta.env.PROD) {
    return null;
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-md z-50 ${className}`}
      >
        Debug AI
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-4 right-4 bg-white border border-gray-300 rounded-md shadow-lg p-4 z-50 w-96 ${className}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">AI Debug Panel</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            API Key Validation
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              onBlur={handleCheckApiKey}
              placeholder="Enter API key to validate"
              className="flex-1 border border-gray-300 rounded-md p-2 text-sm"
            />
            <button
              onClick={handleCheckApiKey}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md text-sm"
            >
              Check
            </button>
          </div>
          {apiKeyStatus !== 'none' && (
            <div className="mt-1 text-sm">
              {apiKeyStatus === 'checking' && (
                <span className="text-yellow-600">Checking...</span>
              )}
              {apiKeyStatus === 'valid' && (
                <span className="text-green-600">Valid API key format</span>
              )}
              {apiKeyStatus === 'invalid' && (
                <span className="text-red-600">Invalid API key format</span>
              )}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Test API</label>
          <textarea
            value={testPrompt}
            onChange={(e) => setTestPrompt(e.target.value)}
            placeholder="Enter test prompt"
            className="w-full border border-gray-300 rounded-md p-2 text-sm h-20"
          />
          <button
            onClick={handleTestAPI}
            disabled={isLoading}
            className="mt-2 bg-blue-600 text-white px-3 py-1 rounded-md text-sm disabled:bg-blue-400"
          >
            {isLoading ? 'Testing...' : 'Test API'}
          </button>
        </div>

        {testResponse && (
          <div>
            <label className="block text-sm font-medium mb-1">Response:</label>
            <div className="border border-gray-300 rounded-md p-2 text-sm bg-gray-50 max-h-40 overflow-y-auto">
              {testResponse}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIDebugPanel;
