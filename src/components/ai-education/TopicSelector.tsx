'use client';

import type React from 'react';
import type { Topic } from '../../types/aiEducationTypes';

interface TopicSelectorProps {
  topics: Topic[];
  onSelectTopic: (topicId: string) => void;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({
  topics,
  onSelectTopic,
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        বিষয় নির্বাচন করুন
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((topic) => (
          <div
            key={topic.id}
            onClick={() => onSelectTopic(topic.id)}
            className="p-4 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              {topic.name}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{topic.description}</p>
            <div className="flex justify-end">
              <button className="text-xs px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition-colors">
                নির্বাচন করুন
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicSelector;
