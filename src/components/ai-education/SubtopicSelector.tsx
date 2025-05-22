'use client';

import type React from 'react';
import type { Topic } from '../../types/aiEducationTypes';

interface SubtopicSelectorProps {
  topic: Topic;
  onSelectSubtopic: (subtopicId: string) => void;
  onBack: () => void;
}

const SubtopicSelector: React.FC<SubtopicSelectorProps> = ({
  topic,
  onSelectSubtopic,
  onBack,
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <button
          onClick={onBack}
          className="mr-2 text-sm py-1 px-3 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          ← ফিরে যান
        </button>
        <h2 className="text-2xl font-bold text-gray-800">
          {topic.name} - উপবিষয় নির্বাচন করুন
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topic.subtopics.map((subtopic) => (
          <div
            key={subtopic.id}
            onClick={() => onSelectSubtopic(subtopic.id)}
            className="p-4 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              {subtopic.name}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{subtopic.description}</p>
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

export default SubtopicSelector;
