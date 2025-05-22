import type React from 'react';
import { BarChart2, CheckCircle, Clock } from 'lucide-react';
import type { UserProgress } from '../../types/learningPathTypes';

interface LearningPathProgressProps {
  progress: UserProgress[];
  totalConcepts: number;
}

const LearningPathProgress: React.FC<LearningPathProgressProps> = ({
  progress,
  totalConcepts,
}) => {
  const completedConcepts = progress.filter((p) => p.completed).length;
  const completionPercentage =
    Math.round((completedConcepts / totalConcepts) * 100) || 0;

  const totalTimeSpent = progress.reduce(
    (total, p) => total + p.timeSpentMinutes,
    0
  );
  const hours = Math.floor(totalTimeSpent / 60);
  const minutes = totalTimeSpent % 60;

  const questionsAnswered = progress.reduce(
    (total, p) => total + p.questionsAnswered,
    0
  );
  const questionsCorrect = progress.reduce(
    (total, p) => total + p.questionsCorrect,
    0
  );
  const accuracy =
    questionsAnswered > 0
      ? Math.round((questionsCorrect / questionsAnswered) * 100)
      : 0;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">আপনার অগ্রগতি</h2>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            সম্পূর্ণ করা হয়েছে
          </span>
          <span className="text-sm font-medium text-indigo-600">
            {completionPercentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-indigo-600 h-2.5 rounded-full"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          {completedConcepts} / {totalConcepts} ধারণা সম্পূর্ণ করা হয়েছে
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-indigo-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <CheckCircle className="h-5 w-5 text-indigo-600 mr-2" />
            <h3 className="font-medium text-gray-700">সম্পূর্ণ করা</h3>
          </div>
          <p className="text-2xl font-bold text-indigo-700">
            {completedConcepts}
          </p>
          <p className="text-sm text-gray-500">ধারণা</p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Clock className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="font-medium text-gray-700">সময় ব্যয়</h3>
          </div>
          <p className="text-2xl font-bold text-green-700">
            {hours > 0 ? `${hours}ঘ ${minutes}মি` : `${minutes}মি`}
          </p>
          <p className="text-sm text-gray-500">মোট</p>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <BarChart2 className="h-5 w-5 text-purple-600 mr-2" />
            <h3 className="font-medium text-gray-700">সঠিকতা</h3>
          </div>
          <p className="text-2xl font-bold text-purple-700">{accuracy}%</p>
          <p className="text-sm text-gray-500">
            {questionsAnswered} প্রশ্নের মধ্যে
          </p>
        </div>
      </div>
    </div>
  );
};

export default LearningPathProgress;
