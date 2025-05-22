'use client';

import React from 'react';
import { grokAIService } from '../../services/GrokAIService';

interface AIStatusIndicatorProps {
  className?: string;
}

const AIStatusIndicator: React.FC<AIStatusIndicatorProps> = ({
  className = '',
}) => {
  const [status, setStatus] = React.useState<
    'available' | 'unavailable' | 'checking'
  >('checking');

  React.useEffect(() => {
    const checkAIStatus = async () => {
      try {
        // Simple test query to check if the API is working
        const response = await grokAIService.getGrokResponse(
          'test',
          'You are a test assistant. Respond with "OK" only.'
        );

        if (response && response.text) {
          setStatus('available');
        } else {
          setStatus('unavailable');
        }
      } catch (error) {
        console.error('Error checking AI status:', error);
        setStatus('unavailable');
      }
    };

    checkAIStatus();
  }, []);

  return (
    <div className={`flex items-center ${className}`}>
      <div
        className={`w-2 h-2 rounded-full mr-2 ${
          status === 'checking'
            ? 'bg-yellow-500'
            : status === 'available'
            ? 'bg-green-500'
            : 'bg-red-500'
        }`}
      />
      <span className="text-xs text-gray-600">
        {status === 'checking'
          ? 'Checking AI...'
          : status === 'available'
          ? 'AI Available'
          : 'AI Unavailable'}
      </span>
    </div>
  );
};

export default AIStatusIndicator;
