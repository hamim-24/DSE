'use client';

import type React from 'react';
import { Clock, Award, BarChart, Users, FileText } from 'lucide-react';
import type { Quiz } from '../../types/quizTypes';

interface QuizCardProps {
  quiz: Quiz;
  onClick: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, onClick }) => {
  const {
    title,
    description,
    difficulty,
    pointsReward,
    timeLimit,
    estimatedTime,
    completionCount,
    averageScore,
    isSurvey,
  } = quiz;

  // Get difficulty color
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100"
      onClick={onClick}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{title}</h3>
          {quiz.isNew && (
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
              নতুন
            </span>
          )}
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {!isSurvey && (
            <span
              className={`text-xs px-2 py-1 rounded ${getDifficultyColor()}`}
            >
              {difficulty === 'beginner'
                ? 'সহজ'
                : difficulty === 'intermediate'
                ? 'মধ্যম'
                : 'কঠিন'}
            </span>
          )}
          {isSurvey ? (
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded flex items-center">
              <FileText className="h-3 w-3 mr-1" />
              জরিপ
            </span>
          ) : (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded flex items-center">
              <FileText className="h-3 w-3 mr-1" />
              কুইজ
            </span>
          )}
          {quiz.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-gray-500" />
            <span>{timeLimit ? `${timeLimit} মিনিট` : estimatedTime}</span>
          </div>

          {!isSurvey && (
            <div className="flex items-center">
              <Award className="h-4 w-4 mr-1 text-indigo-500" />
              <span>{pointsReward} পয়েন্ট</span>
            </div>
          )}

          {completionCount && (
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1 text-gray-500" />
              <span>{completionCount}+ জন</span>
            </div>
          )}

          {!isSurvey && averageScore !== undefined && (
            <div className="flex items-center">
              <BarChart className="h-4 w-4 mr-1 text-gray-500" />
              <span>গড় স্কোর: {averageScore}%</span>
            </div>
          )}
        </div>

        <button
          className={`w-full mt-4 py-2 rounded-md font-medium transition-colors ${
            isSurvey
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {isSurvey ? 'জরিপে অংশ নিন' : 'কুইজ শুরু করুন'}
        </button>
      </div>
    </div>
  );
};

export default QuizCard;
