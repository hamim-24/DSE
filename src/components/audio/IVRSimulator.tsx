'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import IVRService from '../../services/IVRService';
import type { AudioContent } from '../../types/audioTypes';

interface IVRSimulatorProps {
  onSelectContent: (content: AudioContent, category: string) => void;
}

const IVRSimulator: React.FC<IVRSimulatorProps> = ({ onSelectContent }) => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);
  const [options, setOptions] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Initialize IVR
    IVRService.reset();
    const initialPrompt = IVRService.getCurrentPrompt();
    setMessages([initialPrompt]);
    setOptions(IVRService.getAvailableOptions());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user input to messages
    setMessages((prev) => [...prev, `আপনার নির্বাচন: ${input}`]);

    // Process input
    const result = IVRService.processInput(input);
    setMessages((prev) => [...prev, result.message]);

    // Update available options
    setOptions(IVRService.getAvailableOptions());

    // If content selected, notify parent
    if (result.success && result.content && result.category) {
      onSelectContent(result.content, result.category);
    } else {
      // Add next prompt if no content selected
      setMessages((prev) => [...prev, IVRService.getCurrentPrompt()]);
    }

    // Clear input
    setInput('');
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-4">IVR সিমুলেটর</h3>

      <div className="bg-white p-3 rounded-md h-64 overflow-y-auto mb-4 border border-gray-300">
        {messages.map((message, index) => (
          <p key={index} className="mb-2 text-gray-700">
            {message}
          </p>
        ))}
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">উপলব্ধ অপশন:</h4>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(options).map(([key, value]) => (
            <div key={key} className="bg-gray-200 px-2 py-1 rounded text-sm">
              {key}: {value === 'mainMenu' ? 'মূল মেনু' : value}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="অপশন নম্বর লিখুন..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          সেন্ড
        </button>
      </form>
    </div>
  );
};

export default IVRSimulator;
