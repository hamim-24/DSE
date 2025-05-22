'use client';

import type React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
  Send,
  Lightbulb,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Route,
} from 'lucide-react';
import {
  getConceptsByTopicId,
  getQuestionsByConcept,
  createOrUpdateUserProgress,
  recordUserInteraction,
  generateFollowUpQuestions,
} from '../services/learningPathService';
import type {
  Concept,
  Question,
  UserInteraction,
} from '../types/learningPathTypes';
import { useAppContext } from '../context/AppContext';

const ConceptLearningPage: React.FC = () => {
  const { subjectId, conceptId } = useParams<{
    subjectId: string;
    conceptId: string;
  }>();
  const [concept, setConcept] = useState<Concept | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userQuestion, setUserQuestion] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string>('');
  const [responseLoading, setResponseLoading] = useState<boolean>(false);
  const [showQuestionForm, setShowQuestionForm] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [answerSubmitted, setAnswerSubmitted] = useState<boolean>(false);
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([]);
  const [showFollowUp, setShowFollowUp] = useState<boolean>(false);
  const [confusionExpressed, setConfusionExpressed] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [nextConcept, setNextConcept] = useState<string | null>(null);
  const [prevConcept, setPrevConcept] = useState<string | null>(null);

  const { isLoggedIn, userId } = useAppContext();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);

  // Parse the conceptId to get the topicId and conceptIndex
  const parseConceptId = () => {
    if (!conceptId) return { topicId: '', conceptIndex: 1 };

    const parts = conceptId.split('-');
    if (parts.length !== 2) return { topicId: conceptId, conceptIndex: 1 };

    return {
      topicId: parts[0],
      conceptIndex: Number.parseInt(parts[1], 10),
    };
  };

  const { topicId, conceptIndex } = parseConceptId();

  useEffect(() => {
    const fetchData = async () => {
      if (!topicId) return;

      try {
        setLoading(true);

        // Fetch concepts for this topic
        const conceptsData = await getConceptsByTopicId(topicId);

        if (conceptsData.length === 0) {
          console.error('No concepts found for topic:', topicId);
          return;
        }

        // Find the current concept based on the index
        const currentConcept =
          conceptsData.find((c) => c.orderIndex === conceptIndex) ||
          conceptsData[0];
        setConcept(currentConcept);

        // Set next and previous concepts
        const currentIndex = conceptsData.findIndex(
          (c) => c.id === currentConcept.id
        );
        if (currentIndex > 0) {
          setPrevConcept(
            `${topicId}-${conceptsData[currentIndex - 1].orderIndex}`
          );
        } else {
          setPrevConcept(null);
        }

        if (currentIndex < conceptsData.length - 1) {
          setNextConcept(
            `${topicId}-${conceptsData[currentIndex + 1].orderIndex}`
          );
        } else {
          setNextConcept(null);
        }

        // Fetch questions for this concept
        const questionsData = await getQuestionsByConcept(currentConcept.id);
        setQuestions(questionsData);

        // Set a random question as the current question
        if (questionsData.length > 0) {
          const randomIndex = Math.floor(Math.random() * questionsData.length);
          setCurrentQuestion(questionsData[randomIndex]);
        }

        // Record view interaction
        if (isLoggedIn && userId) {
          const interaction: UserInteraction = {
            id: '',
            userId,
            pathId: undefined,
            topicId,
            conceptId: currentConcept.id,
            type: 'view',
            timestamp: new Date(),
            confusionExpressed: false,
          };

          await recordUserInteraction(interaction);
        }

        // Reset state for new concept
        setStartTime(new Date());
        setUserQuestion('');
        setAiResponse('');
        setUserAnswer('');
        setAnswerSubmitted(false);
        setFollowUpQuestions([]);
        setShowFollowUp(false);
        setConfusionExpressed(false);
      } catch (error) {
        console.error('Error fetching concept data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [topicId, conceptIndex, isLoggedIn, userId]);

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userQuestion.trim() || !concept) return;

    try {
      setResponseLoading(true);

      // In a real implementation, you would call your AI service here
      // For now, we'll simulate a response
      setTimeout(() => {
        setAiResponse(
          `আপনার প্রশ্ন "${userQuestion}" এর উত্তর হল: ${concept.name} হল ${concept.description}। এটি ${concept.difficulty} স্তরের একটি ধারণা।`
        );
        setResponseLoading(false);

        // Record question interaction
        if (isLoggedIn && userId && concept) {
          const interaction: UserInteraction = {
            id: '',
            userId,
            topicId,
            conceptId: concept.id,
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

  const handleAnswerSubmit = async () => {
    if (!userAnswer.trim() || !currentQuestion || !concept) return;

    setAnswerSubmitted(true);

    try {
      // Generate follow-up questions
      const followUps = await generateFollowUpQuestions(
        concept.id,
        currentQuestion.text,
        userAnswer
      );

      setFollowUpQuestions(followUps);
      setShowFollowUp(true);

      // Record answer interaction
      if (isLoggedIn && userId) {
        const interaction: UserInteraction = {
          id: '',
          userId,
          topicId,
          conceptId: concept.id,
          questionId: currentQuestion.id,
          type: 'answer',
          content: userAnswer,
          timestamp: new Date(),
          confusionExpressed: false,
        };

        await recordUserInteraction(interaction);

        // Update user progress
        const timeSpent = Math.round(
          (new Date().getTime() - startTime.getTime()) / 60000
        ); // in minutes

        await createOrUpdateUserProgress({
          id: '',
          userId,
          subjectId: subjectId || '',
          topicId,
          conceptId: concept.id,
          completed: true,
          timeSpentMinutes: timeSpent,
          lastAccessedAt: new Date(),
          questionsAnswered: 1,
          questionsCorrect: 0, // We don't evaluate correctness in this simple example
        });
      }
    } catch (error) {
      console.error('Error processing answer:', error);
    }
  };

  const handleConfusion = async () => {
    if (!concept) return;

    setConfusionExpressed(true);

    try {
      // In a real implementation, you would call your AI service here
      // For now, we'll set a static response
      setAiResponse(
        `${concept.name} বুঝতে অসুবিধা হচ্ছে? চিন্তা করবেন না। ${concept.name} হল ${concept.description}। এটি সহজভাবে বলতে গেলে, [simplified explanation]। আপনি কি কোন নির্দিষ্ট অংশ বুঝতে অসুবিধা পাচ্ছেন?`
      );

      // Record confusion interaction
      if (isLoggedIn && userId) {
        const interaction: UserInteraction = {
          id: '',
          userId,
          topicId,
          conceptId: concept.id,
          type: 'feedback',
          content: 'confusion',
          timestamp: new Date(),
          confusionExpressed: true,
        };

        await recordUserInteraction(interaction);
      }
    } catch (error) {
      console.error('Error handling confusion:', error);
    }
  };

  const handleNextConcept = () => {
    if (nextConcept && subjectId) {
      navigate(`/learning-path/${subjectId}/concept/${nextConcept}`);
    }
  };

  const handlePrevConcept = () => {
    if (prevConcept && subjectId) {
      navigate(`/learning-path/${subjectId}/concept/${prevConcept}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!concept) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-red-600">ধারণা পাওয়া যায়নি</h2>
        <p className="mt-2 text-gray-600">
          দুঃখিত, নির্দিষ্ট ধারণাটি খুঁজে পাওয়া যায়নি। অনুগ্রহ করে অন্য একটি
          ধারণা নির্বাচন করুন।
        </p>
        <Link
          to={`/learning-path/${subjectId}`}
          className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-md"
        >
          বিষয় পৃষ্ঠায় ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link to="/learning-paths" className="hover:text-indigo-600">
          এআই লার্নিং পাথ
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link
          to={`/learning-path/${subjectId}`}
          className="hover:text-indigo-600"
        >
          বিষয়
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-gray-700">{concept.name}</span>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <Route className="h-6 w-6 mr-2 text-indigo-600" />
          {concept.name}
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={handlePrevConcept}
            disabled={!prevConcept}
            className={`p-2 rounded-full ${
              prevConcept
                ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNextConcept}
            disabled={!nextConcept}
            className={`p-2 rounded-full ${
              nextConcept
                ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-indigo-600 mr-2" />
                <h2 className="text-lg font-semibold">ধারণা বিবরণ</h2>
              </div>
              <div className="text-sm text-gray-500 flex items-center">
                <span
                  className={`px-2 py-0.5 rounded-full ${
                    concept.difficulty === 'basic'
                      ? 'bg-green-100 text-green-800'
                      : concept.difficulty === 'intermediate'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {concept.difficulty === 'basic'
                    ? 'প্রাথমিক'
                    : concept.difficulty === 'intermediate'
                    ? 'মধ্যবর্তী'
                    : 'উন্নত'}
                </span>
              </div>
            </div>

            <div ref={contentRef} className="prose max-w-none">
              <p className="text-gray-700">{concept.description}</p>
              <div dangerouslySetInnerHTML={{ __html: concept.content }} />
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setShowQuestionForm(!showQuestionForm)}
                className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                প্রশ্ন করুন
              </button>

              <button
                onClick={handleConfusion}
                className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                বুঝতে অসুবিধা হচ্ছে
              </button>
            </div>

            {showQuestionForm && (
              <div className="mt-4">
                <form onSubmit={handleQuestionSubmit} className="space-y-3">
                  <textarea
                    value={userQuestion}
                    onChange={(e) => setUserQuestion(e.target.value)}
                    placeholder="আপনার প্রশ্ন লিখুন..."
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={3}
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={responseLoading}
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
                      <div>
                        <p className="text-gray-700">{aiResponse}</p>
                        <div className="mt-2 flex space-x-2">
                          <button className="inline-flex items-center text-sm text-gray-500 hover:text-green-600">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            সাহায্যকারী
                          </button>
                          <button className="inline-flex items-center text-sm text-gray-500 hover:text-red-600">
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
          </div>

          {currentQuestion && (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
                <h2 className="text-lg font-semibold">অনুশীলন প্রশ্ন</h2>
              </div>

              <p className="text-gray-700 mb-4">{currentQuestion.text}</p>

              {!answerSubmitted ? (
                <div className="space-y-3">
                  {currentQuestion.type === 'multiple-choice' &&
                  currentQuestion.options ? (
                    <div className="space-y-2">
                      {currentQuestion.options.map((option) => (
                        <div key={option.id} className="flex items-center">
                          <input
                            type="radio"
                            id={option.id}
                            name="answer"
                            value={option.optionText}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            className="mr-2"
                          />
                          <label htmlFor={option.id} className="text-gray-700">
                            {option.optionText}
                          </label>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <textarea
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="আপনার উত্তর লিখুন..."
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      rows={4}
                    />
                  )}

                  <div className="flex justify-end">
                    <button
                      onClick={handleAnswerSubmit}
                      disabled={!userAnswer.trim()}
                      className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      উত্তর জমা দিন
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-md">
                    <h3 className="font-medium text-green-800 mb-2">
                      আপনার উত্তর:
                    </h3>
                    <p className="text-gray-700">{userAnswer}</p>
                  </div>

                  {currentQuestion.explanation && (
                    <div className="p-4 bg-blue-50 rounded-md">
                      <h3 className="font-medium text-blue-800 mb-2">
                        ব্যাখ্যা:
                      </h3>
                      <p className="text-gray-700">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  )}

                  {followUpQuestions.length > 0 && (
                    <div className="mt-4">
                      <button
                        onClick={() => setShowFollowUp(!showFollowUp)}
                        className="flex items-center justify-between w-full p-3 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100"
                      >
                        <span className="font-medium">অনুসরণমূলক প্রশ্ন</span>
                        {showFollowUp ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>

                      {showFollowUp && (
                        <div className="mt-3 space-y-3">
                          {followUpQuestions.map((question, index) => (
                            <div
                              key={index}
                              className="p-3 bg-white border border-indigo-100 rounded-md"
                            >
                              <div className="flex items-start">
                                <ArrowRight className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" />
                                <p className="text-gray-700">{question}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        setAnswerSubmitted(false);
                        setUserAnswer('');
                        setFollowUpQuestions([]);

                        // Set a different random question
                        if (questions.length > 1) {
                          let newQuestion;
                          do {
                            const randomIndex = Math.floor(
                              Math.random() * questions.length
                            );
                            newQuestion = questions[randomIndex];
                          } while (newQuestion.id === currentQuestion.id);

                          setCurrentQuestion(newQuestion);
                        }
                      }}
                      className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
                    >
                      অন্য প্রশ্ন দেখুন
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 sticky top-20">
            <h2 className="text-lg font-semibold mb-4">শেখার সহায়তা</h2>

            {concept.examples && concept.examples.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-2">উদাহরণ</h3>
                <div className="space-y-3">
                  {concept.examples.map((example) => (
                    <div key={example.id} className="p-3 bg-gray-50 rounded-md">
                      <p className="text-gray-700">{example.exampleText}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {concept.resources && concept.resources.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-700 mb-2">
                  অতিরিক্ত সম্পদ
                </h3>
                <div className="space-y-2">
                  {concept.resources.map((resource) => (
                    <a
                      key={resource.id}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-2 hover:bg-gray-50 rounded-md group"
                    >
                      {resource.type === 'video' ? (
                        <div className="bg-red-100 p-2 rounded-md mr-3">
                          <svg
                            className="h-4 w-4 text-red-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      ) : resource.type === 'article' ? (
                        <div className="bg-blue-100 p-2 rounded-md mr-3">
                          <svg
                            className="h-4 w-4 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-5a2 2 0 00-2 2v12a2 2 0 002 2h5z"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div className="bg-purple-100 p-2 rounded-md mr-3">
                          <svg
                            className="h-4 w-4 text-purple-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-700 group-hover:text-indigo-600">
                          {resource.title}
                        </p>
                        {resource.durationMinutes && (
                          <p className="text-xs text-gray-500">
                            {resource.durationMinutes} মিনিট
                          </p>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {!concept.resources || concept.resources.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-gray-500 text-sm">
                  এই ধারণার জন্য কোন অতিরিক্ত সম্পদ নেই
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptLearningPage;
