'use client';

import type React from 'react';
import { useState } from 'react';

interface AIConfigPanelProps {
  className?: string;
}

const AIConfigPanel: React.FC<AIConfigPanelProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [saveStatus, setSaveStatus] = useState<
    'idle' | 'saving' | 'success' | 'error'
  >('idle');

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      return;
    }

    setSaveStatus('saving');

    try {
      // In a real app, you would save this to a secure storage
      // For now, we'll just simulate saving
      console.log('API key would be saved securely:', apiKey);

      // Simulate API call
      setTimeout(() => {
        setSaveStatus('success');

        // Reset after 3 seconds
        setTimeout(() => {
          setSaveStatus('idle');
        }, 3000);
      }, 1000);
    } catch (error) {
      console.error('Error saving API key:', error);
      setSaveStatus('error');
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors ${className}`}
      >
        Configure AI
      </button>
    );
  }

  return (
    <div
      className={`bg-white border border-gray-300 rounded-md shadow-lg p-4 ${className}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">AI Configuration</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">
            The Grok AI API key has been configured. You can update it if
            needed.
          </p>

          <label className="block text-sm font-medium mb-1">API Key</label>
          <div className="flex space-x-2">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter new API key"
              className="flex-1 border border-gray-300 rounded-md p-2 text-sm"
            />
            <button
              onClick={handleSaveApiKey}
              disabled={saveStatus === 'saving' || !apiKey.trim()}
              className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm disabled:bg-blue-400"
            >
              {saveStatus === 'saving' ? 'Saving...' : 'Save'}
            </button>
          </div>

          {saveStatus === 'success' && (
            <p className="text-green-600 text-sm mt-1">
              API key updated successfully!
            </p>
          )}

          {saveStatus === 'error' && (
            <p className="text-red-600 text-sm mt-1">
              Failed to update API key. Please try again.
            </p>
          )}
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-medium text-sm mb-2">AI Settings</h4>

          <div className="flex items-center justify-between mb-2">
            <label className="text-sm">Temperature</label>
            <select className="border border-gray-300 rounded-md p-1 text-sm">
              <option value="0.3">0.3 - More focused</option>
              <option value="0.7" selected>
                0.7 - Balanced
              </option>
              <option value="1.0">1.0 - More creative</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm">Max response length</label>
            <select className="border border-gray-300 rounded-md p-1 text-sm">
              <option value="500">Short</option>
              <option value="1000" selected>
                Medium
              </option>
              <option value="2000">Long</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIConfigPanel;
