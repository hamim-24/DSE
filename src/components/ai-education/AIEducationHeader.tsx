'use client';

import type React from 'react';
import type { Topic, Subtopic } from '../../types/aiEducationTypes';

interface AIEducationHeaderProps {
  currentTopic?: Topic;
  currentSubtopic?: Subtopic;
  onReset: () => void;
}

const AIEducationHeader: React.FC<AIEducationHeaderProps> = ({
  currentTopic,
  currentSubtopic,
  onReset,
}) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        এআই শিক্ষা সহায়ক
      </h1>
      <p className="text-gray-600 mb-4">
        আমাদের এআই শিক্ষা সহায়ক আপনাকে বিভিন্ন বিষয়ে শিখতে সাহায্য করবে। আপনি
        যে কোনো প্রশ্ন জিজ্ঞাসা করতে পারেন অথবা একটি বিষয় নির্বাচন করতে পারেন।
      </p>

      {(currentTopic || currentSubtopic) && (
        <div className="flex items-center space-x-2 text-sm">
          <button
            onClick={onReset}
            className="text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            সকল বিষয়
          </button>
          {currentTopic && (
            <>
              <span className="text-gray-500">›</span>
              <span className="text-gray-700">{currentTopic.name}</span>
            </>
          )}
          {currentSubtopic && (
            <>
              <span className="text-gray-500">›</span>
              <span className="text-gray-700">{currentSubtopic.name}</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AIEducationHeader;
