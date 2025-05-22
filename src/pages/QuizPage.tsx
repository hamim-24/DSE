'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import {
  Search,
  Filter,
  FileText,
  Award,
  BarChart,
  HelpCircle,
} from 'lucide-react';
import { quizCategories, getQuizzes, getSurveys } from '../data/quizData';
import type { Quiz, QuizResult } from '../types/quizTypes';
import QuizCard from '../components/quiz/QuizCard';
import QuizTaker from '../components/quiz/QuizTaker';
import QuizResults from '../components/quiz/QuizResults';

const QuizPage: React.FC = () => {
  const { points } = useAppContext();
  const [activeTab, setActiveTab] = useState<'quizzes' | 'surveys'>('quizzes');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);

  // Load completed quizzes from localStorage
  useEffect(() => {
    const savedCompletedQuizzes = localStorage.getItem('completedQuizzes');
    if (savedCompletedQuizzes) {
      setCompletedQuizzes(JSON.parse(savedCompletedQuizzes));
    }
  }, []);

  // Save completed quizzes to localStorage
  useEffect(() => {
    if (completedQuizzes.length > 0) {
      localStorage.setItem(
        'completedQuizzes',
        JSON.stringify(completedQuizzes)
      );
    }
  }, [completedQuizzes]);

  const quizzes = activeTab === 'quizzes' ? getQuizzes(false) : getSurveys();

  // Filter quizzes based on category and search query
  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesCategory =
      selectedCategory === 'all' || quiz.category === selectedCategory;
    const matchesSearch =
      quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleQuizClick = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setQuizResult(null);
  };

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result);
    setCompletedQuizzes([...completedQuizzes, result.quizId]);
  };

  const handleBack = () => {
    setSelectedQuiz(null);
    setQuizResult(null);
  };

  const handleTakeAnother = () => {
    setSelectedQuiz(null);
    setQuizResult(null);
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {activeTab === 'quizzes' ? 'কুইজ সেন্টার' : 'জরিপ সেন্টার'}
          </h1>
          <p className="text-gray-600">
            {activeTab === 'quizzes'
              ? 'আপনার জ্ঞান যাচাই করুন এবং পয়েন্ট অর্জন করুন'
              : 'আপনার মতামত দিন এবং পয়েন্ট অর্জন করুন'}
          </p>
        </div>

        {/* Points Balance */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">
                আপনার পয়েন্ট ব্যালেন্স
              </h2>
              <p className="text-sm opacity-80">
                {activeTab === 'quizzes'
                  ? 'কুইজ সম্পন্ন করে আরও পয়েন্ট অর্জন করুন'
                  : 'জরিপে অংশগ্রহণ করে আরও পয়েন্ট অর্জন করুন'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-white bg-opacity-20 px-5 py-3 rounded-lg">
                <Award className="h-6 w-6 mr-2" />
                <span className="text-2xl font-bold">{points}</span>
              </div>
              <div className="px-4 py-2 rounded-lg text-sm font-medium bg-white bg-opacity-20">
                {completedQuizzes.length}{' '}
                {activeTab === 'quizzes' ? 'কুইজ' : 'জরিপ'} সম্পন্ন করেছেন
              </div>
            </div>
          </div>
        </div>

        {selectedQuiz ? (
          // Quiz taking or results view
          <div>
            {quizResult ? (
              <QuizResults
                quiz={selectedQuiz}
                result={quizResult}
                onBack={handleBack}
                onTakeAnother={handleTakeAnother}
              />
            ) : (
              <QuizTaker
                quiz={selectedQuiz}
                onComplete={handleQuizComplete}
                onCancel={handleBack}
              />
            )}
          </div>
        ) : (
          // Quiz list view
          <>
            {/* Tabs */}
            <div className="mb-8">
              <div className="flex border-b border-gray-200">
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'quizzes'
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('quizzes')}
                >
                  <span className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    কুইজ
                  </span>
                </button>
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'surveys'
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('surveys')}
                >
                  <span className="flex items-center">
                    <BarChart className="h-5 w-5 mr-2" />
                    জরিপ
                  </span>
                </button>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder={
                    activeTab === 'quizzes'
                      ? 'কুইজ খুঁজুন...'
                      : 'জরিপ খুঁজুন...'
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">সব ক্যাটাগরি</option>
                  {quizCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Categories */}
            <div className="flex overflow-x-auto pb-4 mb-8 gap-3 hide-scrollbar">
              <button
                className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedCategory === 'all'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedCategory('all')}
              >
                সব ক্যাটাগরি
              </button>
              {quizCategories.map((category) => (
                <button
                  key={category.id}
                  className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-indigo-600 text-white'
                      : `${category.color.split(' ')[0]} hover:bg-gray-200`
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Quiz List */}
            {filteredQuizzes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredQuizzes.map((quiz) => (
                  <QuizCard
                    key={quiz.id}
                    quiz={quiz}
                    onClick={() => handleQuizClick(quiz)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-500">
                  {activeTab === 'quizzes'
                    ? 'কোন কুইজ পাওয়া যায়নি'
                    : 'কোন জরিপ পাওয়া যায়নি'}
                </p>
              </div>
            )}

            {/* Help Section */}
            <div className="mt-12 bg-indigo-50 rounded-xl p-6 border border-indigo-100">
              <div className="flex items-start">
                <HelpCircle className="h-6 w-6 text-indigo-600 mr-3 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-indigo-800 mb-2">
                    {activeTab === 'quizzes'
                      ? 'কুইজ সম্পর্কে'
                      : 'জরিপ সম্পর্কে'}
                  </h3>
                  <p className="text-indigo-700">
                    {activeTab === 'quizzes'
                      ? 'কুইজ সম্পন্ন করে আপনি পয়েন্ট অর্জন করতে পারেন। আপনার স্কোর যত বেশি হবে, আপনি তত বেশি পয়েন্ট পাবেন। এই পয়েন্ট ব্যবহার করে আপনি রিওয়ার্ড সেন্টার থেকে বিভিন্ন রিওয়ার্ড রিডিম করতে পারেন।'
                      : 'জরিপে অংশগ্রহণ করে আপনি পয়েন্ট অর্জন করতে পারেন। আপনার মতামত আমাদের সেবা উন্নত করতে সাহায্য করবে। জরিপ সম্পন্ন করার জন্য আপনি নির্দিষ্ট পরিমাণ পয়েন্ট পাবেন।'}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
