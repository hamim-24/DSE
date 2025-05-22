'use client';

import type React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Users,
  Brain,
  Sparkles,
  Lightbulb,
  MessageCircle,
  Atom,
  FlaskRoundIcon as Flask,
  Dna,
  Calculator,
  Globe,
  Rocket,
  ArrowRight,
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import UserGroupSection from '../components/home/UserGroupSection';
import ContentTypeSection from '../components/home/ContentTypeSection';
import FeaturedContent from '../components/home/FeaturedContent';
import RewardsSection from '../components/home/RewardsSection';

const HomePage: React.FC = () => {
  const { isLoggedIn, login } = useAppContext();

  // AI Education topic cards data
  const aiTopics = [
    {
      id: 'physics',
      title: 'পদার্থবিজ্ঞান',
      icon: <Atom className="h-8 w-8 text-blue-500" />,
      color: 'bg-blue-50 hover:bg-blue-100',
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-100',
      description:
        'গতি, বল, শক্তি, তাপ, আলো, শব্দ, তড়িৎ ও চুম্বকত্ব সম্পর্কে জানুন',
      questions: ['নিউটনের গতিসূত্র কী?', 'আলো কীভাবে প্রতিসরিত হয়?'],
    },
    {
      id: 'chemistry',
      title: 'রসায়ন',
      icon: <Flask className="h-8 w-8 text-purple-500" />,
      color: 'bg-purple-50 hover:bg-purple-100',
      borderColor: 'border-purple-200',
      iconBg: 'bg-purple-100',
      description: 'পদার্থের গঠন, ধর্ম, পরিবর্তন ও বিক্রিয়া সম্পর্কে জানুন',
      questions: ['পিএইচ স্কেল কী?', 'অম্ল ও ক্ষারের পার্থক্য কী?'],
    },
    {
      id: 'biology',
      title: 'জীববিজ্ঞান',
      icon: <Dna className="h-8 w-8 text-green-500" />,
      color: 'bg-green-50 hover:bg-green-100',
      borderColor: 'border-green-200',
      iconBg: 'bg-green-100',
      description: 'জীবের গঠন, বৈশিষ্ট্য, বিকাশ ও পরিবেশ সম্পর্কে জানুন',
      questions: ['ফটোসিনথেসিস কীভাবে কাজ করে?', 'DNA এর গঠন কেমন?'],
    },
    {
      id: 'math',
      title: 'গণিত',
      icon: <Calculator className="h-8 w-8 text-red-500" />,
      color: 'bg-red-50 hover:bg-red-100',
      borderColor: 'border-red-200',
      iconBg: 'bg-red-100',
      description: 'সংখ্যা, বীজগণিত, জ্যামিতি, ক্যালকুলাস সম্পর্কে জানুন',
      questions: ['পাইথাগোরাস উপপাদ্য কী?', 'ক্যালকুলাস কী?'],
    },
    {
      id: 'geography',
      title: 'ভূগোল',
      icon: <Globe className="h-8 w-8 text-teal-500" />,
      color: 'bg-teal-50 hover:bg-teal-100',
      borderColor: 'border-teal-200',
      iconBg: 'bg-teal-100',
      description: 'পৃথিবীর ভূপ্রকৃতি, জলবায়ু, জনসংখ্যা সম্পর্কে জানুন',
      questions: ['মৌসুমি বায়ু কী?', 'ভূমিকম্প কেন হয়?'],
    },
    {
      id: 'astronomy',
      title: 'জ্যোতির্বিজ্ঞান',
      icon: <Rocket className="h-8 w-8 text-indigo-500" />,
      color: 'bg-indigo-50 hover:bg-indigo-100',
      borderColor: 'border-indigo-200',
      iconBg: 'bg-indigo-100',
      description: 'মহাকাশ, গ্রহ, নক্ষত্র, গ্যালাক্সি সম্পর্কে জানুন',
      questions: ['ব্ল্যাক হোল কী?', 'সৌরজগৎ কীভাবে সৃষ্টি হয়েছিল?'],
    },
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="block">বাংলাদেশের সর্বজনীন</span>
              <span className="text-yellow-300">বিজ্ঞান শিক্ষা</span> প্লাটফর্ম
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100">
              আপনার বয়স, শিক্ষাগত যোগ্যতা, অবস্থান যাই হোক না কেন - বিজ্ঞান
              জানা এবং শেখা সবার অধিকার। আপনার পছন্দমত উপায়ে বিজ্ঞান শিখুন।
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/content"
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-3 rounded-md font-semibold transition-transform transform hover:scale-105"
              >
                শুরু করুন
              </Link>
              <Link
                to="/about"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-md font-semibold transition-colors"
              >
                আরও জানুন
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI Education Feature Section */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-indigo-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full -mr-32 -mt-32 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-200 rounded-full -ml-32 -mb-32 opacity-50"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2 space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full font-medium text-sm mb-2">
                <Sparkles className="h-4 w-4 mr-2" />
                নতুন ফিচার
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                এআই-এর সাহায্যে{' '}
                <span className="text-purple-600">বিজ্ঞান শিখুন</span> সহজে
              </h2>

              <p className="text-lg text-gray-700">
                আমাদের এআই শিক্ষা ফিচার ব্যবহার করে যেকোনো বিজ্ঞান বিষয়ক প্রশ্ন
                করুন এবং সহজ ভাষায় উত্তর পান। আপনার নিজের ভাষায় প্রশ্ন করুন,
                এআই আপনাকে সাহায্য করবে।
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/ai-education"
                  className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-semibold transition-all hover:shadow-lg transform hover:-translate-y-1"
                >
                  <Brain className="h-5 w-5 mr-2" />
                  এআই শিক্ষা ব্যবহার করুন
                </Link>

                <Link
                  to="/about"
                  className="inline-flex items-center border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-6 py-3 rounded-md font-semibold transition-colors"
                >
                  আরও জানুন
                </Link>
              </div>
            </div>

            <div className="lg:w-1/2 bg-white rounded-xl shadow-xl p-6 border border-purple-100">
              <div className="bg-purple-600 text-white p-4 rounded-t-lg flex items-center">
                <Brain className="h-6 w-6 mr-2" />
                <h3 className="font-semibold">এআই শিক্ষা সহায়ক</h3>
              </div>

              <div className="bg-gray-50 p-4 rounded-b-lg space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <MessageCircle className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="bg-purple-100 text-purple-800 p-3 rounded-lg max-w-xs">
                    পদার্থবিজ্ঞানের নিউটনের গতিসূত্র সম্পর্কে সহজভাবে বুঝিয়ে
                    দিন।
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <Brain className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="bg-white border border-gray-200 p-3 rounded-lg max-w-md">
                    <p className="text-gray-800">
                      নিউটনের গতিসূত্র হল পদার্থবিজ্ঞানের মৌলিক নীতি যা বস্তুর
                      গতি বর্ণনা করে। প্রথম সূত্র বলে যে, কোনো বাহ্যিক বল না
                      থাকলে, একটি বস্তু স্থির থাকবে অথবা সরলরেখায় সমবেগে চলতে
                      থাকবে...
                    </p>
                    <div className="mt-2 flex gap-2">
                      <span className="inline-flex items-center text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                        <Lightbulb className="h-3 w-3 mr-1" />
                        আরও জানুন
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center">
                <input
                  type="text"
                  placeholder="আপনার প্রশ্ন লিখুন..."
                  className="flex-grow p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  disabled
                />
                <Link
                  to="/ai-education"
                  className="bg-purple-600 text-white p-3 rounded-r-md hover:bg-purple-700"
                >
                  <MessageCircle className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Education Topics Section - NEW */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              জনপ্রিয় বিজ্ঞান বিষয়সমূহ
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              আমাদের এআই শিক্ষা সহায়ক ব্যবহার করে এই বিষয়গুলো সম্পর্কে জানুন।
              যেকোনো প্রশ্ন করুন, সহজ ভাষায় উত্তর পান।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiTopics.map((topic) => (
              <div
                key={topic.id}
                className={`rounded-xl border ${topic.borderColor} ${topic.color} p-6 transition-all duration-300 hover:shadow-md group`}
              >
                <div className="flex items-center mb-4">
                  <div className={`${topic.iconBg} p-3 rounded-lg mr-4`}>
                    {topic.icon}
                  </div>
                  <h3 className="text-xl font-bold">{topic.title}</h3>
                </div>

                <p className="text-gray-700 mb-4">{topic.description}</p>

                <div className="space-y-2 mb-4">
                  {topic.questions.map((question, idx) => (
                    <Link
                      key={idx}
                      to={`/ai-education?topic=${
                        topic.id
                      }&question=${encodeURIComponent(question)}`}
                      className="flex items-center text-sm text-gray-700 hover:text-purple-700 hover:underline"
                    >
                      <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
                      {question}
                    </Link>
                  ))}
                </div>

                <Link
                  to={`/ai-education?topic=${topic.id}`}
                  className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium group-hover:underline"
                >
                  <span>এই বিষয়ে প্রশ্ন করুন</span>
                  <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/ai-education"
              className="inline-flex items-center bg-purple-100 text-purple-800 hover:bg-purple-200 px-6 py-3 rounded-md font-semibold transition-colors"
            >
              <Brain className="h-5 w-5 mr-2" />
              সব বিষয় দেখুন
            </Link>
          </div>
        </div>
      </section>

      {/* User Groups Section */}
      <UserGroupSection />

      {/* Content Types Section */}
      <ContentTypeSection />

      {/* Featured Content Section */}
      <FeaturedContent />

      {/* Rewards Section */}
      <RewardsSection />

      {/* Stats Section */}
      <section className="bg-indigo-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">আমাদের অর্জন</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-indigo-800/50 rounded-lg transform hover:scale-105 transition-transform">
              <div className="text-3xl md:text-4xl font-bold mb-2">১০০+</div>
              <div className="text-indigo-200">বিজ্ঞান কোর্স</div>
            </div>
            <div className="p-6 bg-indigo-800/50 rounded-lg transform hover:scale-105 transition-transform">
              <div className="text-3xl md:text-4xl font-bold mb-2">৫০০+</div>
              <div className="text-indigo-200">ভিডিও টিউটোরিয়াল</div>
            </div>
            <div className="p-6 bg-indigo-800/50 rounded-lg transform hover:scale-105 transition-transform">
              <div className="text-3xl md:text-4xl font-bold mb-2">২০K+</div>
              <div className="text-indigo-200">সক্রিয় শিক্ষার্থী</div>
            </div>
            <div className="p-6 bg-indigo-800/50 rounded-lg transform hover:scale-105 transition-transform">
              <div className="text-3xl md:text-4xl font-bold mb-2">৬৪</div>
              <div className="text-indigo-200">জেলায় সেবা</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              আজই যোগ দিন বিজ্ঞানশালায়
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              বিজ্ঞান শিখুন, পয়েন্ট অর্জন করুন, এবং পুরস্কার জিতুন। আপনার শেখার
              যাত্রা শুরু করুন আজই।
            </p>
            {!isLoggedIn && (
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-md font-semibold text-lg transition-colors inline-flex items-center space-x-2"
                onClick={() => login()}
              >
                <Users className="h-5 w-5" />
                <span>একাউন্ট খুলুন</span>
              </button>
            )}
            {isLoggedIn && (
              <Link
                to="/learn"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-md font-semibold text-lg transition-colors inline-flex items-center space-x-2"
              >
                <BookOpen className="h-5 w-5" />
                <span>শেখা শুরু করুন</span>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
