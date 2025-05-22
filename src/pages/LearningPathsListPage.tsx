'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Route, Clock, BarChart } from 'lucide-react';
import { getSubjects } from '../services/learningPathService';
import type { Subject } from '../types/learningPathTypes';
import { useAppContext } from '../context/AppContext';

const LearningPathsListPage: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { isLoggedIn } = useAppContext();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await getSubjects();
        setSubjects(data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4 text-indigo-700">
          <span className="flex items-center justify-center">
            <Route className="h-8 w-8 mr-2" />
            এআই লার্নিং পাথ
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          আপনার শেখার যাত্রা শুরু করুন! এআই লার্নিং পাথ আপনার শেখার ধরন অনুযায়ী
          বিষয়বস্তু উপস্থাপন করে এবং আপনার অগ্রগতি অনুসারে শেখার পথ সামঞ্জস্য
          করে।
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-white" />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2 text-gray-800">
                    {subject.name}
                  </h2>
                  <p className="text-gray-600 mb-4">{subject.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{subject.estimatedHours} ঘন্টা</span>
                    </div>
                    <div className="flex items-center">
                      <BarChart className="h-4 w-4 mr-1" />
                      <span>
                        {subject.level === 'beginner'
                          ? 'প্রাথমিক'
                          : subject.level === 'intermediate'
                          ? 'মধ্যবর্তী'
                          : 'উন্নত'}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/learning-path/${subject.id}`}
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    <span>শুরু করুন</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {!isLoggedIn && (
            <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
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
        </>
      )}
    </div>
  );
};

export default LearningPathsListPage;
