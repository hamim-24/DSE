'use client';

import type React from 'react';
import {
  Lightbulb,
  ArrowRight,
  Brain,
  MessageSquare,
  Route,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AIShikhaPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">এআই শিখা</h1>
            <p className="text-lg mb-6">
              কৃত্রিম বুদ্ধিমত্তা সম্পর্কে জানুন এবং এর মাধ্যমে আপনার শিক্ষা
              যাত্রা শুরু করুন। আমাদের ইন্টারেক্টিভ কোর্স এবং টিউটোরিয়ালগুলি
              আপনাকে এআই এর মৌলিক ধারণা থেকে উন্নত বিষয়গুলি পর্যন্ত শিখতে
              সাহায্য করবে।
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/ai-qa"
                className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-100 transition-colors inline-flex items-center"
              >
                শুরু করুন
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/learning-paths"
                className="bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-800 transition-colors inline-flex items-center"
              >
                লার্নিং পাথ দেখুন
                <Route className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="md:w-1/3 flex justify-center mt-6 md:mt-0">
            <div className="bg-white/20 p-8 rounded-full">
              <Lightbulb className="h-24 w-24 text-yellow-300" />
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        এআই শিক্ষার বিভাগসমূহ
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Link
          to="/ai-education"
          className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="bg-indigo-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
            <Brain className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            এআই শিক্ষা পাতা
          </h3>
          <p className="text-gray-600 mb-4">
            এআই সম্পর্কে মৌলিক ধারণা এবং শিক্ষামূলক সামগ্রী
          </p>
          <div className="flex items-center text-indigo-600 font-medium">
            <span>দেখুন</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </Link>

        <Link
          to="/ai-shikha"
          className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="bg-yellow-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
            <Lightbulb className="h-8 w-8 text-yellow-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">এআই শিখা</h3>
          <p className="text-gray-600 mb-4">
            ইন্টারেক্টিভ কোর্স এবং টিউটোরিয়াল
          </p>
          <div className="flex items-center text-indigo-600 font-medium">
            <span>দেখুন</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </Link>

        <Link
          to="/learning-paths"
          className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
            <Route className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            এআই লার্নিং পাথ
          </h3>
          <p className="text-gray-600 mb-4">
            স্ট্রাকচার্ড লার্নিং পাথ এবং কোর্স
          </p>
          <div className="flex items-center text-indigo-600 font-medium">
            <span>দেখুন</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </Link>

        <Link
          to="/ai-qa"
          className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="bg-purple-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
            <MessageSquare className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            এআই প্রশ্নোত্তর
          </h3>
          <p className="text-gray-600 mb-4">
            এআই এর সাথে প্রশ্নোত্তর মাধ্যমে শিখুন
          </p>
          <div className="flex items-center text-indigo-600 font-medium">
            <span>দেখুন</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </Link>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        জনপ্রিয় এআই টপিকসমূহ
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            মেশিন লার্নিং কী?
          </h3>
          <p className="text-gray-600 mb-4">
            মেশিন লার্নিং হল কৃত্রিম বুদ্ধিমত্তার একটি শাখা যা কম্পিউটারকে
            স্পষ্টভাবে প্রোগ্রাম না করেই শিখতে সক্ষম করে।
          </p>
          <Link
            to="/ai-qa?topic=machine-learning"
            className="text-indigo-600 font-medium flex items-center"
          >
            আরও জানুন
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            ডিপ লার্নিং
          </h3>
          <p className="text-gray-600 mb-4">
            ডিপ লার্নিং হল মেশিন লার্নিং এর একটি উপশাখা যা মানুষের মস্তিষ্কের
            কার্যপ্রণালী অনুকরণ করে নিউরাল নেটওয়ার্ক ব্যবহার করে।
          </p>
          <Link
            to="/ai-qa?topic=neural-networks"
            className="text-indigo-600 font-medium flex items-center"
          >
            আরও জানুন
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            এআই এর নৈতিক দিক
          </h3>
          <p className="text-gray-600 mb-4">
            এআই এর নৈতিক দিক বিবেচনা করা গুরুত্বপূর্ণ, যেমন গোপনীয়তা,
            পক্ষপাতিত্ব, এবং সামাজিক প্রভাব।
          </p>
          <Link
            to="/ai-qa?topic=ai-ethics"
            className="text-indigo-600 font-medium flex items-center"
          >
            আরও জানুন
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="bg-indigo-50 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          আপনার এআই শিক্ষা যাত্রা শুরু করুন
        </h2>
        <p className="text-gray-700 mb-4">
          আমাদের বিভিন্ন এআই শিক্ষা প্ল্যাটফর্ম ব্যবহার করে আপনার জ্ঞান বাড়ান।
          প্রশ্নোত্তর সেশন, স্ট্রাকচার্ড কোর্স, বা নিজের গতিতে শেখার পাথ বেছে
          নিন।
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/ai-qa"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors"
          >
            প্রশ্নোত্তর শুরু করুন
          </Link>
          <Link
            to="/learning-paths"
            className="bg-white text-indigo-600 border border-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-indigo-50 transition-colors"
          >
            লার্নিং পাথ দেখুন
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AIShikhaPage;
