'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle,
  Circle,
  Clock,
  ArrowRight,
  ChevronRight,
  BarChart2,
  Route,
} from 'lucide-react';
import {
  getSubjectById,
  getTopicsBySubjectId,
  getUserProgress,
} from '../services/learningPathService';
import type { Subject, Topic, UserProgress } from '../types/learningPathTypes';
import { useAppContext } from '../context/AppContext';

const LearningPathPage: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { isLoggedIn, userId } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      if (!subjectId) return;

      try {
        setLoading(true);

        // Fetch subject details
        const subjectData = await getSubjectById(subjectId);
        setSubject(subjectData);

        // Fetch topics for this subject
        const topicsData = await getTopicsBySubjectId(subjectId);
        setTopics(topicsData);

        // Fetch user progress if logged in
        if (isLoggedIn && userId) {
          const progressData = await getUserProgress(userId, subjectId);
          setUserProgress(progressData);
        }
      } catch (error) {
        console.error('Error fetching learning path data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subjectId, isLoggedIn, userId]);

  // Calculate overall progress
  const calculateProgress = () => {
    if (!isLoggedIn || userProgress.length === 0) return 0;

    const completedConcepts = userProgress.filter((p) => p.completed).length;
    // This is a simplification - in a real app, you'd need to know the total number of concepts
    const totalConcepts = topics.length * 5; // Assuming 5 concepts per topic on average

    return Math.round((completedConcepts / totalConcepts) * 100);
  };

  const getTopicStatus = (topicId: string) => {
    if (!isLoggedIn || userProgress.length === 0) return 'not-started';

    const topicProgress = userProgress.filter((p) => p.topicId === topicId);

    if (topicProgress.length === 0) return 'not-started';
    if (topicProgress.every((p) => p.completed)) return 'completed';
    return 'in-progress';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-red-600">বিষয় পাওয়া যায়নি</h2>
        <p className="mt-2 text-gray-600">
          দুঃখিত, নির্দিষ্ট বিষয়টি খুঁজে পাওয়া যায়নি। অনুগ্রহ করে অন্য একটি
          বিষয় নির্বাচন করুন।
        </p>
        <Link
          to="/learning-paths"
          className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-md"
        >
          বিষয় তালিকায় ফিরে যান
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
        <span className="text-gray-700">{subject.name}</span>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 mb-8">
        <div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
          <Route className="h-16 w-16 text-white" />
        </div>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2 text-gray-800">
            {subject.name}
          </h1>
          <p className="text-gray-600 mb-4">{subject.description}</p>

          <div className="flex flex-wrap items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center mr-4 mb-2">
              <Clock className="h-4 w-4 mr-1" />
              <span>{subject.estimatedHours} ঘন্টা</span>
            </div>
            <div className="flex items-center mr-4 mb-2">
              <BookOpen className="h-4 w-4 mr-1" />
              <span>{topics.length} টপিক</span>
            </div>
            <div className="flex items-center mb-2">
              <BarChart2 className="h-4 w-4 mr-1" />
              <span>
                {subject.level === 'beginner'
                  ? 'প্রাথমিক'
                  : subject.level === 'intermediate'
                  ? 'মধ্যবর্তী'
                  : 'উন্নত'}
              </span>
            </div>
          </div>

          {isLoggedIn && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  অগ্রগতি
                </span>
                <span className="text-sm font-medium text-indigo-600">
                  {calculateProgress()}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full"
                  style={{ width: `${calculateProgress()}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4 text-gray-800">শেখার পথ</h2>

      <div className="space-y-4">
        {topics.map((topic, index) => {
          const topicStatus = getTopicStatus(topic.id);

          return (
            <div
              key={topic.id}
              className={`bg-white rounded-lg shadow-sm border p-4 transition-all ${
                topicStatus === 'completed'
                  ? 'border-green-200 bg-green-50'
                  : topicStatus === 'in-progress'
                  ? 'border-indigo-200 bg-indigo-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  {topicStatus === 'completed' ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : topicStatus === 'in-progress' ? (
                    <div className="h-6 w-6 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin"></div>
                  ) : (
                    <Circle className="h-6 w-6 text-gray-300" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        {index + 1}. {topic.name}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {topic.description}
                      </p>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{topic.estimatedMinutes} মিনিট</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Link
                      to={`/learning-path/${subjectId}/concept/${topic.id}-1`}
                      className={`inline-flex items-center px-3 py-1.5 text-sm rounded-md ${
                        topicStatus === 'completed'
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                      }`}
                    >
                      {topicStatus === 'completed'
                        ? 'পুনরায় দেখুন'
                        : topicStatus === 'in-progress'
                        ? 'চালিয়ে যান'
                        : 'শুরু করুন'}
                      <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {!isLoggedIn && (
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-yellow-800 mb-2">
            আপনার অগ্রগতি সংরক্ষণ করুন
          </h3>
          <p className="text-yellow-700 mb-4">
            আপনার শেখার অগ্রগতি সংরক্ষণ করতে এবং ব্যক্তিগতকৃত শেখার অভিজ্ঞতা
            পেতে লগইন করুন।
          </p>
          <button
            onClick={() => {
              /* Login function */
            }}
            className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
          >
            লগইন করুন
          </button>
        </div>
      )}
    </div>
  );
};

export default LearningPathPage;
