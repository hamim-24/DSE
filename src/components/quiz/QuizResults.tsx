'use client';

import type React from 'react';
import { Award, CheckCircle, Share2, ArrowLeft } from 'lucide-react';
import type { Quiz, QuizResult } from '../../types/quizTypes';
import { useAppContext } from '../../context/AppContext';

interface QuizResultsProps {
  quiz: Quiz;
  result: QuizResult;
  onBack: () => void;
  onTakeAnother: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({
  quiz,
  result,
  onBack,
  onTakeAnother,
}) => {
  const { userTier } = useAppContext();
  const scorePercentage = Math.round((result.score / result.maxScore) * 100);
  const isPassing = scorePercentage >= 60;
  const minutes = Math.floor(result.timeTaken / 60);
  const seconds = result.timeTaken % 60;

  // For surveys, we don't show score
  const isSurvey = quiz.isSurvey;

  const getScoreMessage = () => {
    if (isSurvey) return 'ধন্যবাদ আপনার মতামত জানানোর জন্য!';

    if (scorePercentage >= 90) return 'অসাধারণ! আপনি একজন প্রকৃত বিশেষজ্ঞ!';
    if (scorePercentage >= 80) return 'চমৎকার! আপনার জ্ঞান অসাধারণ!';
    if (scorePercentage >= 70)
      return 'ভালো করেছেন! আপনি বেশিরভাগ প্রশ্নের উত্তর সঠিকভাবে দিয়েছেন।';
    if (scorePercentage >= 60) return 'ভালো! আপনি পাস করেছেন।';
    return 'আরেকটু চেষ্টা করুন! আপনি পরবর্তী বারে আরও ভালো করতে পারবেন।';
  };

  const getScoreColor = () => {
    if (isSurvey) return 'text-purple-600';

    if (scorePercentage >= 80) return 'text-green-600';
    if (scorePercentage >= 60) return 'text-blue-600';
    return 'text-red-600';
  };

  const handleShare = () => {
    // In a real app, this would open a share dialog
    alert(
      isSurvey
        ? `আমি সম্প্রতি "${quiz.title}" জরিপে অংশগ্রহণ করেছি এবং ${result.pointsEarned} পয়েন্ট অর্জন করেছি!`
        : `আমি সম্প্রতি "${quiz.title}" কুইজে ${scorePercentage}% স্কোর করেছি এবং ${result.pointsEarned} পয়েন্ট অর্জন করেছি!`
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-2xl mx-auto">
      {/* Header */}
      <div
        className={`p-6 text-white ${
          isSurvey
            ? 'bg-gradient-to-r from-purple-600 to-indigo-600'
            : isPassing
            ? 'bg-gradient-to-r from-green-600 to-teal-600'
            : 'bg-gradient-to-r from-orange-600 to-red-600'
        }`}
      >
        <h2 className="text-xl font-bold mb-2">
          {isSurvey ? 'জরিপ সম্পন্ন!' : 'কুইজ সম্পন্ন!'}
        </h2>
        <p className="opacity-90">{quiz.title}</p>
      </div>

      {/* Results */}
      <div className="p-6">
        {/* Score section */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold mb-2">{getScoreMessage()}</h3>

          {!isSurvey && (
            <div className="flex justify-center items-center mb-4">
              <div className="relative">
                <svg className="w-32 h-32" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#eee"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={isPassing ? '#10b981' : '#f97316'}
                    strokeWidth="3"
                    strokeDasharray={`${scorePercentage}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-2xl font-bold ${getScoreColor()}`}>
                    {scorePercentage}%
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-6">
            {!isSurvey && (
              <>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">সঠিক উত্তর</div>
                  <div className="text-xl font-semibold text-green-600">
                    {result.correctAnswers}/{result.totalQuestions}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">স্কোর</div>
                  <div className="text-xl font-semibold text-blue-600">
                    {result.score}/{result.maxScore}
                  </div>
                </div>
              </>
            )}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">সময় নিয়েছেন</div>
              <div className="text-xl font-semibold text-gray-700">
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">অর্জিত পয়েন্ট</div>
              <div className="text-xl font-semibold text-indigo-600">
                {result.pointsEarned}
              </div>
            </div>
          </div>

          {userTier !== 'bronze' && (
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <Award className="h-5 w-5 text-yellow-600 mr-2" />
                <span className="text-yellow-800">
                  {userTier === 'silver'
                    ? 'সিলভার'
                    : userTier === 'gold'
                    ? 'গোল্ড'
                    : 'প্লাটিনাম'}{' '}
                  টিয়ার বোনাস! আপনি অতিরিক্ত{' '}
                  {userTier === 'silver'
                    ? '১০%'
                    : userTier === 'gold'
                    ? '১৫%'
                    : '২০%'}{' '}
                  পয়েন্ট পেয়েছেন।
                </span>
              </div>
            </div>
          )}

          {/* Completion message */}
          {quiz.completionMessage && (
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 text-indigo-800 mb-6">
              {quiz.completionMessage}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4 mr-2" />
              শেয়ার করুন
            </button>
            <button
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              onClick={onTakeAnother}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              {isSurvey ? 'আরেকটি জরিপ' : 'আরেকটি কুইজ'}
            </button>
            <button
              className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              onClick={onBack}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              ফিরে যান
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
