'use client';

import type React from 'react';
import { useState } from 'react';
import { Send, MessageSquare, ThumbsUp, ThumbsDown, Route } from 'lucide-react';
import { recordUserInteraction } from '../../services/learningPathService';
import type { UserInteraction } from '../../types/learningPathTypes';

interface QuestionGeneratorProps {
  conceptId: string;
  topicId: string;
  userId?: string;
  isLoggedIn: boolean;
}

const QuestionGenerator: React.FC<QuestionGeneratorProps> = ({
  conceptId,
  topicId,
  userId,
  isLoggedIn,
}) => {
  const [userQuestion, setUserQuestion] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string>('');
  const [responseLoading, setResponseLoading] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userQuestion.trim()) return;

    try {
      setResponseLoading(true);

      // In a real implementation, you would call your AI service here
      // For now, we'll simulate a response
      setTimeout(() => {
        setAiResponse(
          `আপনার প্রশ্ন "${userQuestion}" এর উত্তর হল: এই ধারণাটি সম্পর্কে আরও জানতে, আপনি [detailed explanation] বিবেচনা করতে পারেন।`
        );
        setResponseLoading(false);

        // Record question interaction
        if (isLoggedIn && userId) {
          const interaction: UserInteraction = {
            id: '',
            userId,
            topicId,
            conceptId,
            type: 'question',
            content: userQuestion,
            timestamp: new Date(),
            confusionExpressed:
              userQuestion.toLowerCase().includes('বুঝতে পারছি না') ||
              userQuestion.toLowerCase().includes('confused'),
          };

          recordUserInteraction(interaction);
        }
      }, 1500);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setResponseLoading(false);
    }
  };

  const handleFeedback = (helpful: boolean) => {
    // Record feedback interaction
    if (isLoggedIn && userId) {
      const interaction: UserInteraction = {
        id: '',
        userId,
        topicId,
        conceptId,
        type: 'feedback',
        content: helpful ? 'helpful' : 'not-helpful',
        timestamp: new Date(),
        confusionExpressed: false,
      };

      recordUserInteraction(interaction);
    }

    // Show feedback message
    alert(
      helpful
        ? 'ধন্যবাদ আপনার প্রতিক্রিয়ার জন্য!'
        : 'দুঃখিত যে এটি সাহায্যকারী ছিল না। আমরা উন্নতি করার চেষ্টা করব।'
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center">
          <MessageSquare className="h-5 w-5 text-indigo-600 mr-2" />
          প্রশ্ন জিজ্ঞাসা করুন
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`text-sm px-3 py-1 rounded-md ${
            showForm
              ? 'bg-gray-200 text-gray-700'
              : 'bg-indigo-100 text-indigo-700'
          }`}
        >
          {showForm ? 'বন্ধ করুন' : 'প্রশ্ন করুন'}
        </button>
      </div>

      {showForm && (
        <div className="space-y-3">
          <form onSubmit={handleQuestionSubmit}>
            <textarea
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              placeholder="আপনার প্রশ্ন লিখুন..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={3}
            />
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                disabled={responseLoading || !userQuestion.trim()}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                {responseLoading ? (
                  <>
                    <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                    প্রক্রিয়াকরণ হচ্ছে...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    প্রশ্ন পাঠান
                  </>
                )}
              </button>
            </div>
          </form>

          {aiResponse && (
            <div className="mt-4 p-4 bg-indigo-50 rounded-md">
              <div className="flex items-start">
                <div className="bg-indigo-100 p-2 rounded-full mr-3">
                  <Route className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-700">{aiResponse}</p>
                  <div className="mt-2 flex space-x-2">
                    <button
                      onClick={() => handleFeedback(true)}
                      className="inline-flex items-center text-sm text-gray-500 hover:text-green-600"
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      সাহায্যকারী
                    </button>
                    <button
                      onClick={() => handleFeedback(false)}
                      className="inline-flex items-center text-sm text-gray-500 hover:text-red-600"
                    >
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      সাহায্যকারী নয়
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {!showForm && (
        <p className="text-gray-600 text-sm">
          এই ধারণা সম্পর্কে আপনার কোন প্রশ্ন থাকলে জিজ্ঞাসা করুন। আমাদের এআই
          আপনাকে সাহায্য করবে।
        </p>
      )}
    </div>
  );
};

export default QuestionGenerator;
