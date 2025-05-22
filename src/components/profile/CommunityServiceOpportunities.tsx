'use client';

import type React from 'react';
import { useState } from 'react';
import {
  MapPin,
  Calendar,
  Users,
  Clock,
  ExternalLink,
  Search,
} from 'lucide-react';

// Sample community service opportunities
const sampleOpportunities = [
  {
    id: 1,
    title: 'গ্রামীণ শিক্ষা কর্মসূচি',
    organization: 'শিক্ষা সেবা ফাউন্ডেশন',
    location: 'সিলেট, বাংলাদেশ',
    date: '২০২৫-০৬-১৫',
    duration: '৩ মাস',
    participants: 25,
    description:
      'গ্রামীণ এলাকায় প্রাথমিক শিক্ষা প্রদানের জন্য স্বেচ্ছাসেবক শিক্ষক নিয়োগ করা হচ্ছে। সপ্তাহে ৩ দিন, প্রতিদিন ২ ঘন্টা শিক্ষাদান করতে হবে।',
    requirements: [
      'শিক্ষাগত যোগ্যতা: কমপক্ষে স্নাতক',
      'শিশুদের সাথে কাজের অভিজ্ঞতা থাকলে ভালো',
      'ধৈর্য্য ও সহানুভূতিশীল মনোভাব',
    ],
    contact: 'education@example.org',
    type: 'teaching',
  },
  {
    id: 2,
    title: 'পরিবেশ সংরক্ষণ অভিযান',
    organization: 'সবুজ বাংলাদেশ',
    location: 'কক্সবাজার, বাংলাদেশ',
    date: '২০২৫-০৭-১০',
    duration: '১ সপ্তাহ',
    participants: 50,
    description:
      'সমুদ্র সৈকত পরিষ্কার এবং প্লাস্টিক বর্জ্য সংগ্রহের জন্য স্বেচ্ছাসেবক প্রয়োজন। এই কার্যক্রমে অংশগ্রহণকারীদের পরিবেশ সংরক্ষণ সম্পর্কে প্রশিক্ষণও দেওয়া হবে।',
    requirements: [
      'সকল বয়সের স্বেচ্ছাসেবক যোগদান করতে পারবেন',
      'শারীরিকভাবে সক্রিয় থাকতে হবে',
      'পরিবেশ সংরক্ষণে আগ্রহী',
    ],
    contact: 'green@example.org',
    type: 'environmental',
  },
  {
    id: 3,
    title: 'গ্রামে স্বাস্থ্যসেবা ক্যাম্প',
    organization: 'স্বাস্থ্য সেবা সংস্থা',
    location: 'রংপুর, বাংলাদেশ',
    date: '২০২৫-০৮-০৫',
    duration: '২ দিন',
    participants: 15,
    description:
      'দুর্গম গ্রামীণ এলাকায় বিনামূল্যে স্বাস্থ্য পরীক্ষা ও ওষুধ বিতরণের জন্য মেডিকেল ক্যাম্প আয়োজন করা হবে। চিকিৎসক, নার্স এবং স্বেচ্ছাসেবক প্রয়োজন।',
    requirements: [
      'মেডিকেল পেশাদার (ডাক্তার/নার্স) অথবা মেডিকেল শিক্ষার্থী',
      'প্রাথমিক চিকিৎসা সম্পর্কে জ্ঞান থাকতে হবে',
      'সহানুভূতিশীল আচরণ',
    ],
    contact: 'health@example.org',
    type: 'health',
  },
  {
    id: 4,
    title: 'বন্যা দুর্গতদের সাহায্য',
    organization: 'মানবতা ফাউন্ডেশন',
    location: 'কুড়িগ্রাম, বাংলাদেশ',
    date: '২০২৫-০৭-২০',
    duration: '১ সপ্তাহ',
    participants: 30,
    description:
      'বন্যা দুর্গত এলাকায় খাদ্য, পানীয় জল ও প্রাথমিক চিকিৎসা সামগ্রী বিতরণের জন্য স্বেচ্ছাসেবক প্রয়োজন। আশ্রয় কেন্দ্রে সহায়তা প্রদানের জন্যও স্বেচ্ছাসেবক নেওয়া হবে।',
    requirements: [
      '১৮ বছর বা তার বেশি বয়স',
      'শারীরিকভাবে সক্ষম',
      'দুর্যোগকালীন পরিস্থিতিতে কাজ করার মানসিকতা',
    ],
    contact: 'relief@example.org',
    type: 'community',
  },
  {
    id: 5,
    title: 'ডিজিটাল সাক্ষরতা প্রশিক্ষণ',
    organization: 'ডিজিটাল বাংলাদেশ ফাউন্ডেশন',
    location: 'ঢাকা, বাংলাদেশ',
    date: '২০২৫-০৯-০১',
    duration: '২ মাস',
    participants: 20,
    description:
      'প্রবীণ নাগরিক ও গ্রামীণ মহিলাদের জন্য ডিজিটাল সাক্ষরতা প্রশিক্ষণ প্রদান করা হবে। স্মার্টফোন ব্যবহার, ইন্টারনেট সুরক্ষা, ডিজিটাল সেবা ব্যবহার ইত্যাদি বিষয়ে প্রশিক্ষণ দেওয়া হবে।',
    requirements: [
      'কম্পিউটার ও ইন্টারনেট সম্পর্কে ভালো জ্ঞান',
      'শিক্ষাদান করার দক্ষতা',
      'ধৈর্য্য ও সহানুভূতিশীল মনোভাব',
    ],
    contact: 'digital@example.org',
    type: 'teaching',
  },
];

const CommunityServiceOpportunities: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredOpportunities = sampleOpportunities.filter((opportunity) => {
    const matchesSearch =
      opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      opportunity.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType ? opportunity.type === selectedType : true;

    return matchesSearch && matchesType;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold flex items-center">
          <Users className="h-5 w-5 mr-2 text-indigo-600" />
          সম্প্রদায় সেবার সুযোগ
        </h3>
      </div>

      <div className="mb-6 space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="সেবামূলক কাজ খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedType(null)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium ${
              selectedType === null
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            সব
          </button>
          <button
            onClick={() => setSelectedType('teaching')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium ${
              selectedType === 'teaching'
                ? 'bg-blue-600 text-white'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            শিক্ষাদান
          </button>
          <button
            onClick={() => setSelectedType('community')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium ${
              selectedType === 'community'
                ? 'bg-purple-600 text-white'
                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
            }`}
          >
            সম্প্রদায় সেবা
          </button>
          <button
            onClick={() => setSelectedType('environmental')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium ${
              selectedType === 'environmental'
                ? 'bg-green-600 text-white'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            পরিবেশ সংরক্ষণ
          </button>
          <button
            onClick={() => setSelectedType('health')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium ${
              selectedType === 'health'
                ? 'bg-red-600 text-white'
                : 'bg-red-100 text-red-700 hover:bg-red-200'
            }`}
          >
            স্বাস্থ্য সেবা
          </button>
        </div>
      </div>

      {filteredOpportunities.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <Users className="h-12 w-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500">
            আপনার অনুসন্ধান অনুযায়ী কোন সেবামূলক কাজ পাওয়া যায়নি
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOpportunities.map((opportunity) => (
            <div
              key={opportunity.id}
              className="bg-gray-50 rounded-lg p-5 border border-gray-100"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span
                      className={`text-xs font-medium px-2.5 py-0.5 rounded-full mr-2 ${
                        opportunity.type === 'teaching'
                          ? 'bg-blue-100 text-blue-800'
                          : opportunity.type === 'community'
                          ? 'bg-purple-100 text-purple-800'
                          : opportunity.type === 'environmental'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {opportunity.type === 'teaching'
                        ? 'শিক্ষাদান'
                        : opportunity.type === 'community'
                        ? 'সম্প্রদায় সেবা'
                        : opportunity.type === 'environmental'
                        ? 'পরিবেশ সংরক্ষণ'
                        : 'স্বাস্থ্য সেবা'}
                    </span>
                    <span className="text-sm text-gray-500">
                      {opportunity.organization}
                    </span>
                  </div>

                  <h4 className="font-semibold text-lg mb-2">
                    {opportunity.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">
                    {opportunity.description}
                  </p>

                  <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {opportunity.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {opportunity.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {opportunity.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {opportunity.participants} জন প্রয়োজন
                    </div>
                  </div>

                  {opportunity.requirements && (
                    <div className="mt-3">
                      <h5 className="text-sm font-medium text-gray-700 mb-1">
                        যোগ্যতা:
                      </h5>
                      <ul className="list-disc list-inside text-sm text-gray-600 pl-1">
                        {opportunity.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 min-w-[120px]">
                  <a
                    href={`mailto:${opportunity.contact}`}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md text-center text-sm font-medium hover:bg-indigo-700 transition-colors"
                  >
                    যোগাযোগ করুন
                  </a>
                  <button className="bg-white text-indigo-600 border border-indigo-600 px-4 py-2 rounded-md text-center text-sm font-medium hover:bg-indigo-50 transition-colors flex items-center justify-center">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    বিস্তারিত
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityServiceOpportunities;
