'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  Award,
} from 'lucide-react';
import type {
  Quiz,
  QuizQuestion,
  QuizResponse,
  QuizResult,
} from '../../types/quizTypes';

interface QuizTakerProps {
  quiz: Quiz;
  onComplete: (result: QuizResult) => void;
  onCancel: () => void;
}

const QuizTaker: React.FC<QuizTakerProps> = ({
  quiz,
  onComplete,
  onCancel,
}) => {
  const { addPoints } = useAppContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<QuizResponse[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(
    quiz.timeLimit ? quiz.timeLimit * 60 : 0
  );
  const [timeTaken, setTimeTaken] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;

  // Initialize responses
  useEffect(() => {
    const initialResponses = quiz.questions.map((question) => ({
      questionId: question.id,
      answer: question.type === 'multiple-select' ? [] : '',
    }));
    setResponses(initialResponses);
  }, [quiz]);

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      if (quiz.timeLimit) {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }
      setTimeTaken((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [quiz.timeLimit]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleResponseChange = (answer: string | string[] | number) => {
    const updatedResponses = [...responses];
    updatedResponses[currentQuestionIndex] = {
      questionId: currentQuestion.id,
      answer,
    };
    setResponses(updatedResponses);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowExplanation(false);
    }
  };

  const isQuestionAnswered = () => {
    const response = responses[currentQuestionIndex];
    if (!response) return false;

    if (Array.isArray(response.answer)) {
      return response.answer.length > 0;
    }

    return response.answer !== '';
  };

  const calculateScore = () => {
    if (quiz.isSurvey) return { score: 0, maxScore: 0, correctAnswers: 0 };

    let score = 0;
    let maxScore = 0;
    let correctAnswers = 0;

    quiz.questions.forEach((question, index) => {
      const response = responses[index];
      maxScore += question.points;

      if (!response) return;

      if (question.correctAnswer) {
        let isCorrect = false;

        if (
          Array.isArray(question.correctAnswer) &&
          Array.isArray(response.answer)
        ) {
          // For multiple-select questions
          isCorrect =
            question.correctAnswer.length === response.answer.length &&
            question.correctAnswer.every((ans) =>
              response.answer.includes(ans)
            );
        } else {
          // For other question types
          isCorrect = response.answer === question.correctAnswer;
        }

        if (isCorrect) {
          score += question.points;
          correctAnswers++;
        }
      }
    });

    return { score, maxScore, correctAnswers };
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    // Calculate score
    const { score, maxScore, correctAnswers } = calculateScore();

    // Create result object
    const result: QuizResult = {
      quizId: quiz.id,
      responses,
      score,
      maxScore,
      timeTaken,
      completedAt: new Date(),
      pointsEarned: quiz.isSurvey
        ? quiz.pointsReward
        : Math.round((score / maxScore) * quiz.pointsReward),
      correctAnswers,
      totalQuestions,
    };

    // Add points to user account
    if (result.pointsEarned > 0) {
      addPoints(
        result.pointsEarned,
        quiz.isSurvey
          ? `জরিপ সম্পন্ন করার জন্য: ${quiz.title}`
          : `কুইজ সম্পন্ন করার জন্য: ${quiz.title} (${correctAnswers}/${totalQuestions})`,
        Number.parseInt(quiz.id.split('-').pop() || '0')
      );
    }

    // Complete the quiz
    setTimeout(() => {
      setIsSubmitting(false);
      onComplete(result);
    }, 1000);
  };

  const renderQuestion = (question: QuizQuestion) => {
    const response = responses[currentQuestionIndex];
    if (!response) return null;

    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <label
                key={index}
                className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                  response.answer === option
                    ? 'bg-indigo-50 border-indigo-300'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    checked={response.answer === option}
                    onChange={() => handleResponseChange(option)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-3">{option}</span>
                </div>
              </label>
            ))}
          </div>
        );

      case 'multiple-select':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <label
                key={index}
                className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                  Array.isArray(response.answer) &&
                  response.answer.includes(option)
                    ? 'bg-indigo-50 border-indigo-300'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name={`question-${question.id}-${index}`}
                    value={option}
                    checked={
                      Array.isArray(response.answer) &&
                      response.answer.includes(option)
                    }
                    onChange={(e) => {
                      if (Array.isArray(response.answer)) {
                        const newAnswer = e.target.checked
                          ? [...response.answer, option]
                          : response.answer.filter((a) => a !== option);
                        handleResponseChange(newAnswer);
                      }
                    }}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded"
                  />
                  <span className="ml-3">{option}</span>
                </div>
              </label>
            ))}
          </div>
        );

      case 'true-false':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <label
                key={index}
                className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                  response.answer === option
                    ? 'bg-indigo-50 border-indigo-300'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    checked={response.answer === option}
                    onChange={() => handleResponseChange(option)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-3">{option}</span>
                </div>
              </label>
            ))}
          </div>
        );

      case 'rating':
        return (
          <div className="flex justify-center space-x-2 py-4">
            {question.options?.map((option, index) => (
              <button
                key={index}
                className={`h-12 w-12 rounded-full font-medium ${
                  response.answer === index + 1
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => handleResponseChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        );

      case 'text':
        return (
          <div className="py-2">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[120px]"
              placeholder="আপনার উত্তর এখানে লিখুন..."
              value={response.answer as string}
              onChange={(e) => handleResponseChange(e.target.value)}
            ></textarea>
          </div>
        );

      default:
        return null;
    }
  };

  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const isRequired = currentQuestion.required;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-3xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{quiz.title}</h2>
          {quiz.timeLimit && (
            <div className="flex items-center bg-white bg-opacity-20 px-3 py-1 rounded">
              <Clock className="h-4 w-4 mr-1" />
              <span>{formatTime(timeRemaining)}</span>
            </div>
          )}
        </div>
        <div className="mt-2 flex justify-between items-center text-sm">
          <span>
            প্রশ্ন {currentQuestionIndex + 1}/{totalQuestions}
          </span>
          {!quiz.isSurvey && (
            <span className="flex items-center">
              <Award className="h-4 w-4 mr-1" />
              সম্ভাব্য পয়েন্ট: {quiz.pointsReward}
            </span>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 h-1">
        <div
          className="bg-indigo-600 h-1 transition-all"
          style={{
            width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
          }}
        ></div>
      </div>

      {/* Question */}
      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-start">
            <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded-full mr-2">
              {currentQuestionIndex + 1}
            </span>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {currentQuestion.question}
              </h3>
              {isRequired && (
                <span className="text-red-500 text-sm flex items-center mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  এই প্রশ্নের উত্তর দেওয়া বাধ্যতামূলক
                </span>
              )}
            </div>
          </div>

          {currentQuestion.image && (
            <div className="mt-4">
              <img
                src={currentQuestion.image || '/placeholder.svg'}
                alt="Question illustration"
                className="max-w-full h-auto rounded-lg mx-auto"
              />
            </div>
          )}
        </div>

        {/* Answer options */}
        {renderQuestion(currentQuestion)}

        {/* Explanation (for quizzes) */}
        {!quiz.isSurvey && showExplanation && currentQuestion.explanation && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <div className="flex items-start">
              <HelpCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800 mb-1">ব্যাখ্যা:</h4>
                <p className="text-blue-700 text-sm">
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="mt-8 flex justify-between">
          <button
            className="px-4 py-2 border border-gray-300 rounded-md flex items-center text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            আগের প্রশ্ন
          </button>

          <div className="flex space-x-2">
            {!quiz.isSurvey && !isLastQuestion && (
              <button
                className="px-4 py-2 border border-indigo-300 text-indigo-600 rounded-md flex items-center hover:bg-indigo-50"
                onClick={() => setShowExplanation(!showExplanation)}
                disabled={!currentQuestion.explanation}
              >
                <HelpCircle className="h-5 w-5 mr-1" />
                {showExplanation ? 'ব্যাখ্যা লুকান' : 'ব্যাখ্যা দেখুন'}
              </button>
            )}

            {isLastQuestion ? (
              <button
                className="px-6 py-2 bg-green-600 text-white rounded-md flex items-center hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSubmit}
                disabled={isSubmitting || (isRequired && !isQuestionAnswered())}
              >
                {isSubmitting ? (
                  'সাবমিট হচ্ছে...'
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5 mr-1" />
                    সম্পন্ন করুন
                  </>
                )}
              </button>
            ) : (
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleNext}
                disabled={isRequired && !isQuestionAnswered()}
              >
                পরের প্রশ্ন
                <ChevronRight className="h-5 w-5 ml-1" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 p-4 border-t border-gray-200">
        <button
          className="text-gray-600 hover:text-gray-800 text-sm flex items-center"
          onClick={onCancel}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          বাতিল করুন
        </button>
      </div>
    </div>
  );
};

export default QuizTaker;
