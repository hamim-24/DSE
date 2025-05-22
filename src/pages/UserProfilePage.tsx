'use client';

import type React from 'react';
import { useState } from 'react';
import {
  Award,
  BookOpen,
  Clock,
  BookText,
  Video,
  Headphones,
  Bookmark,
  UserCheck,
  Users,
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ProfileTypeSelector from '../components/profile/ProfileTypeSelector';
import SocialWorksSection from '../components/profile/SocialWorksSection';
import TeacherProfileSection from '../components/profile/TeacherProfileSection';
import NGOProfileSection from '../components/profile/NGOProfileSection';
import CommunityServiceOpportunities from '../components/profile/CommunityServiceOpportunities';

const UserProfilePage: React.FC = () => {
  const { points, learningStreak, userRole, communityServiceHours } =
    useAppContext();
  const [showOpportunities, setShowOpportunities] = useState(false);

  // Sample user data
  const user = {
    name: 'আব্দুল করিম',
    location: 'কুমিল্লা, বাংলাদেশ',
    joinDate: '২০২৩',
    avatar:
      'https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    badges: [
      {
        id: 1,
        name: 'নিয়মিত শিক্ষার্থী',
        icon: <Clock className="h-5 w-5" />,
        color: 'bg-blue-100 text-blue-800',
      },
      {
        id: 2,
        name: 'বিজ্ঞান এক্সপ্লোরার',
        icon: <BookOpen className="h-5 w-5" />,
        color: 'bg-purple-100 text-purple-800',
      },
      {
        id: 3,
        name: 'পড়ুয়া',
        icon: <BookText className="h-5 w-5" />,
        color: 'bg-emerald-100 text-emerald-800',
      },
      {
        id: 4,
        name: 'সমাজসেবী',
        icon: <Users className="h-5 w-5" />,
        color: 'bg-amber-100 text-amber-800',
      },
    ],
    contentProgress: [
      { id: 1, title: 'মহাকাশ বিজ্ঞান: সৌরজগত', progress: 85, type: 'course' },
      {
        id: 2,
        title: 'আমাদের দেহের রোগ প্রতিরোধ ব্যবস্থা',
        progress: 42,
        type: 'course',
      },
      {
        id: 3,
        title: 'প্রাকৃতিক দুর্যোগ: কারণ ও প্রতিকার',
        progress: 100,
        type: 'course',
      },
    ],
    savedContent: [
      {
        id: 1,
        title: 'কীভাবে গাছপালা পানি টেনে নেয়?',
        type: 'video',
        typeIcon: <Video className="h-4 w-4" />,
        typeColor: 'bg-red-500',
        thumbnail:
          'https://images.pexels.com/photos/406919/pexels-photo-406919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      {
        id: 2,
        title: 'তেজস্ক্রিয়তা ও এর ব্যবহার',
        type: 'audio',
        typeIcon: <Headphones className="h-4 w-4" />,
        typeColor: 'bg-blue-500',
        thumbnail:
          'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    ],
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Profile Type Selector */}
        <ProfileTypeSelector />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-24">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-32 relative">
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                  <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden">
                    <img
                      src={user.avatar || '/placeholder.svg'}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-20 px-6 pb-6 text-center">
                <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
                <p className="text-gray-600 mb-4">{user.location}</p>

                <div className="flex justify-center space-x-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">
                      {points}
                    </div>
                    <div className="text-sm text-gray-500">পয়েন্ট</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-600">
                      {learningStreak}
                    </div>
                    <div className="text-sm text-gray-500">স্ট্রিক</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">
                      {communityServiceHours}
                    </div>
                    <div className="text-sm text-gray-500">সেবা ঘন্টা</div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <h3 className="font-semibold mb-3 flex items-center justify-center">
                    <Award className="h-5 w-5 mr-2 text-indigo-600" />
                    অর্জিত ব্যাজ
                  </h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {user.badges.map((badge) => (
                      <div
                        key={badge.id}
                        className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full ${badge.color}`}
                      >
                        {badge.icon}
                        <span className="text-sm font-medium">
                          {badge.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-medium transition-colors">
                    প্রোফাইল এডিট করুন
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* User Content & Progress */}
          <div className="lg:col-span-2 space-y-8">
            {/* Conditional rendering based on user role */}
            {userRole === 'teacher' && <TeacherProfileSection />}
            {userRole === 'ngo' && <NGOProfileSection />}

            {/* Social Works Section */}
            <SocialWorksSection />

            {/* Community Service Opportunities */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold flex items-center">
                  <Users className="h-5 w-5 mr-2 text-indigo-600" />
                  সম্প্রদায় সেবা
                </h3>
                <button
                  onClick={() => setShowOpportunities(!showOpportunities)}
                  className="text-indigo-600 text-sm font-medium hover:text-indigo-800"
                >
                  {showOpportunities ? 'সুযোগ লুকান' : 'সেবার সুযোগ দেখুন'}
                </button>
              </div>

              {showOpportunities ? (
                <CommunityServiceOpportunities />
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <Users className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-500 mb-3">
                    সম্প্রদায় সেবার সুযোগ খুঁজছেন?
                  </p>
                  <button
                    onClick={() => setShowOpportunities(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    সেবার সুযোগ দেখুন
                  </button>
                </div>
              )}
            </div>

            {/* Learning Progress */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
                  আপনার প্রগতি
                </h3>
                <button className="text-indigo-600 text-sm font-medium">
                  সব দেখুন
                </button>
              </div>

              <div className="space-y-4">
                {user.contentProgress.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between items-center mb-1">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-gray-500">
                        {item.progress}%
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${
                          item.progress === 100
                            ? 'bg-emerald-500'
                            : 'bg-indigo-600'
                        }`}
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <button className="w-full border border-indigo-600 text-indigo-600 hover:bg-indigo-50 py-2 rounded-md font-medium transition-colors">
                  অসম্পূর্ণ কোর্স অব্যাহত রাখুন
                </button>
              </div>
            </div>

            {/* Saved Content */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold flex items-center">
                  <Bookmark className="h-5 w-5 mr-2 text-indigo-600" />
                  সংরক্ষিত কনটেন্ট
                </h3>
                <button className="text-indigo-600 text-sm font-medium">
                  সব দেখুন
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user.savedContent.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-50 rounded-lg overflow-hidden group"
                  >
                    <div className="relative h-32">
                      <img
                        src={item.thumbnail || '/placeholder.svg'}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div
                        className={`absolute top-2 right-2 p-1.5 rounded-full text-white ${item.typeColor}`}
                      >
                        {item.typeIcon}
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="font-semibold line-clamp-2 group-hover:text-indigo-600 transition-colors">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity & Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold flex items-center mb-4">
                  <Clock className="h-5 w-5 mr-2 text-indigo-600" />
                  সাম্প্রতিক অ্যাকটিভিটি
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <UserCheck className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">কোর্স সম্পন্ন করেছেন</div>
                      <div className="text-sm text-gray-500">
                        প্রাকৃতিক দুর্যোগ: কারণ ও প্রতিকার
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        ২ দিন আগে
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Award className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">নতুন ব্যাজ অর্জন করেছেন</div>
                      <div className="text-sm text-gray-500">পড়ুয়া</div>
                      <div className="text-xs text-gray-400 mt-1">
                        ৫ দিন আগে
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Video className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium">ভিডিও দেখেছেন</div>
                      <div className="text-sm text-gray-500">
                        মহাকাশ বিজ্ঞান: সৌরজগত
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        ১ সপ্তাহ আগে
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold flex items-center mb-6">
                  <Award className="h-5 w-5 mr-2 text-indigo-600" />
                  আপনার পরিসংখ্যান
                </h3>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-indigo-600">১২</div>
                    <div className="text-sm text-gray-600">সম্পূর্ণ কোর্স</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">৩৫</div>
                    <div className="text-sm text-gray-600">সম্পূর্ণ কুইজ</div>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-amber-600">৮৫</div>
                    <div className="text-sm text-gray-600">ঘন্টা শিখেছেন</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600">
                      {communityServiceHours}
                    </div>
                    <div className="text-sm text-gray-600">সেবা ঘন্টা</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
