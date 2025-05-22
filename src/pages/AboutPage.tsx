import React from 'react';
import { Users, Award, Book, Heart, Share2, Phone } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl text-white py-16 px-6 mb-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center"></div>
          </div>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">আমাদের সম্পর্কে</h1>
            <p className="text-xl text-indigo-100 mb-8">
              বিজ্ঞানশালা হল বাংলাদেশের প্রথম সার্বজনীন বিজ্ঞান শিক্ষা ও সচেতনতামূলক ডিজিটাল ইকোসিস্টেম। আমাদের লক্ষ্য হল প্রতিটি শ্রেণি-পেশার, বয়সের, এবং প্রযুক্তি-সুবিধার ভিত্তিতে বৈচিত্র্যময় মানুষের কাছে বিজ্ঞান, তথ্য এবং সচেতনতা সহজভাবে পৌঁছে দেওয়া।
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="text-2xl font-bold">৫০+</div>
                <div className="text-sm">বিশেষজ্ঞ শিক্ষক</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="text-2xl font-bold">১০০+</div>
                <div className="text-sm">বিজ্ঞান কোর্স</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="text-2xl font-bold">২০K+</div>
                <div className="text-sm">শিক্ষার্থী</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="text-2xl font-bold">৬৪</div>
                <div className="text-sm">জেলায় সেবা</div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-xl">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-6">
                <Book className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">আমাদের লক্ষ্য</h2>
              <p className="text-gray-700 mb-4">
                বাংলাদেশের প্রতিটি মানুষের কাছে সহজভাবে বিজ্ঞান শিক্ষা পৌঁছে দেওয়া এবং বিজ্ঞান-ভিত্তিক চিন্তাধারা ও সচেতনতা বৃদ্ধি করা।
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-indigo-600 text-white rounded-full p-1 mr-2 mt-0.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  বিজ্ঞানকে সহজ ও আকর্ষণীয় করে তোলা
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-600 text-white rounded-full p-1 mr-2 mt-0.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  সকল বয়সের জন্য উপযোগী কন্টেন্ট তৈরি করা
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-600 text-white rounded-full p-1 mr-2 mt-0.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  ডিজিটাল ডিভাইড দূর করে সবার জন্য শিক্ষা সুলভ করা
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">আমাদের দর্শন</h2>
              <p className="text-gray-700 mb-4">
                আমরা বিশ্বাস করি যে বিজ্ঞান শিক্ষা কেবল বইয়ের মধ্যে সীমাবদ্ধ থাকা উচিত নয়। এটি হওয়া উচিত আকর্ষণীয়, অভিজ্ঞতামূলক এবং সবার জন্য সুলভ।
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-purple-600 text-white rounded-full p-1 mr-2 mt-0.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  সবার জন্য বিজ্ঞান - বয়স, শিক্ষা ও অবস্থান নির্বিশেষে
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-600 text-white rounded-full p-1 mr-2 mt-0.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  সহজ ভাষায় জটিল বিজ্ঞান ধারণাগুলো ব্যাখ্যা করা
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-600 text-white rounded-full p-1 mr-2 mt-0.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  একটি জ্ঞান-ভিত্তিক, বিজ্ঞান-সচেতন জাতি গঠন
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">আমাদের টিম</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              বিজ্ঞানশালা একটি দক্ষ ও উদ্যমী টিমের দ্বারা পরিচালিত যারা বিজ্ঞান শিক্ষাকে সবার কাছে পৌঁছে দিতে প্রতিশ্রুতিবদ্ধ।
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Team Member */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden text-center group">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Team Member" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">ড. রাফিদ আহমেদ</h3>
                <p className="text-indigo-600 mb-3">প্রতিষ্ঠাতা ও সিইও</p>
                <p className="text-gray-600 text-sm mb-4">
                  বিজ্ঞান শিক্ষায় ১৫+ বছরের অভিজ্ঞতা। ঢাকা বিশ্ববিদ্যালয়ের পদার্থবিজ্ঞানের সাবেক অধ্যাপক।
                </p>
                <div className="flex justify-center space-x-3">
                  <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 5.79a8.36 8.36 0 0 1-2.33.64 4.07 4.07 0 0 0 1.8-2.27 8.19 8.19 0 0 1-2.57.98 4.1 4.1 0 0 0-7 3.74 11.64 11.64 0 0 1-8.45-4.29 4.16 4.16 0 0 0-.55 2.07 4.1 4.1 0 0 0 1.82 3.41 4.05 4.05 0 0 1-1.86-.51v.05a4.1 4.1 0 0 0 3.3 4.03 4.13 4.13 0 0 1-1.86.07 4.1 4.1 0 0 0 3.83 2.85A8.22 8.22 0 0 1 2 18.33a11.57 11.57 0 0 0 6.29 1.85c7.55 0 11.67-6.25 11.67-11.67 0-.18 0-.35-.01-.52A8.32 8.32 0 0 0 22 5.8z"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Team Member */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden text-center group">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Team Member" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">ড. নাজনীন আকতার</h3>
                <p className="text-indigo-600 mb-3">কন্টেন্ট ডিরেক্টর</p>
                <p className="text-gray-600 text-sm mb-4">
                  জীববিজ্ঞানে পিএইচডি, ১০+ বছরের শিক্ষকতা অভিজ্ঞতা। জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ডের সাবেক সদস্য।
                </p>
                <div className="flex justify-center space-x-3">
                  <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 5.79a8.36 8.36 0 0 1-2.33.64 4.07 4.07 0 0 0 1.8-2.27 8.19 8.19 0 0 1-2.57.98 4.1 4.1 0 0 0-7 3.74 11.64 11.64 0 0 1-8.45-4.29 4.16 4.16 0 0 0-.55 2.07 4.1 4.1 0 0 0 1.82 3.41 4.05 4.05 0 0 1-1.86-.51v.05a4.1 4.1 0 0 0 3.3 4.03 4.13 4.13 0 0 1-1.86.07 4.1 4.1 0 0 0 3.83 2.85A8.22 8.22 0 0 1 2 18.33a11.57 11.57 0 0 0 6.29 1.85c7.55 0 11.67-6.25 11.67-11.67 0-.18 0-.35-.01-.52A8.32 8.32 0 0 0 22 5.8z"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Team Member */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden text-center group">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Team Member" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">তানভীর আহমেদ</h3>
                <p className="text-indigo-600 mb-3">প্রযুক্তি পরিচালক</p>
                <p className="text-gray-600 text-sm mb-4">
                  সফটওয়্যার ইঞ্জিনিয়ারিংয়ে মাস্টার্স, ১২+ বছরের টেক পরিচালনার অভিজ্ঞতা। পূর্বে গুগল বাংলাদেশে কাজ করেছেন।
                </p>
                <div className="flex justify-center space-x-3">
                  <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 5.79a8.36 8.36 0 0 1-2.33.64 4.07 4.07 0 0 0 1.8-2.27 8.19 8.19 0 0 1-2.57.98 4.1 4.1 0 0 0-7 3.74 11.64 11.64 0 0 1-8.45-4.29 4.16 4.16 0 0 0-.55 2.07 4.1 4.1 0 0 0 1.82 3.41 4.05 4.05 0 0 1-1.86-.51v.05a4.1 4.1 0 0 0 3.3 4.03 4.13 4.13 0 0 1-1.86.07 4.1 4.1 0 0 0 3.83 2.85A8.22 8.22 0 0 1 2 18.33a11.57 11.57 0 0 0 6.29 1.85c7.55 0 11.67-6.25 11.67-11.67 0-.18 0-.35-.01-.52A8.32 8.32 0 0 0 22 5.8z"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Team Member */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden text-center group">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Team Member" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">ফারহানা ইসলাম</h3>
                <p className="text-indigo-600 mb-3">কমিউনিটি ম্যানেজার</p>
                <p className="text-gray-600 text-sm mb-4">
                  যোগাযোগ বিষয়ে মাস্টার্স, ৮+ বছর NGO এবং কমিউনিটি ডেভেলপমেন্টে অভিজ্ঞতা। বিভিন্ন জেলায় কমিউনিটি প্রোগ্রাম পরিচালনা করেছেন।
                </p>
                <div className="flex justify-center space-x-3">
                  <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 5.79a8.36 8.36 0 0 1-2.33.64 4.07 4.07 0 0 0 1.8-2.27 8.19 8.19 0 0 1-2.57.98 4.1 4.1 0 0 0-7 3.74 11.64 11.64 0 0 1-8.45-4.29 4.16 4.16 0 0 0-.55 2.07 4.1 4.1 0 0 0 1.82 3.41 4.05 4.05 0 0 1-1.86-.51v.05a4.1 4.1 0 0 0 3.3 4.03 4.13 4.13 0 0 1-1.86.07 4.1 4.1 0 0 0 3.83 2.85A8.22 8.22 0 0 1 2 18.33a11.57 11.57 0 0 0 6.29 1.85c7.55 0 11.67-6.25 11.67-11.67 0-.18 0-.35-.01-.52A8.32 8.32 0 0 0 22 5.8z"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partners & Collaborators */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">আমাদের পার্টনার</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              বিজ্ঞানশালা বিভিন্ন সরকারি, বেসরকারি ও আন্তর্জাতিক সংস্থার সাথে সহযোগিতায় কাজ করে।
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              <div className="flex justify-center grayscale hover:grayscale-0 transition-all">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Ministry_of_Education_Bangladesh_logo.svg/1200px-Ministry_of_Education_Bangladesh_logo.svg.png" 
                  alt="Ministry of Education" 
                  className="h-16 object-contain"
                />
              </div>
              <div className="flex justify-center grayscale hover:grayscale-0 transition-all">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/Bangladesh_University_of_Engineering_%26_Technology_Monogram.svg/1200px-Bangladesh_University_of_Engineering_%26_Technology_Monogram.svg.png" 
                  alt="BUET" 
                  className="h-16 object-contain"
                />
              </div>
              <div className="flex justify-center grayscale hover:grayscale-0 transition-all">
                <img 
                  src="https://seeklogo.com/images/U/unicef-logo-BFAE3FEEBA-seeklogo.com.png" 
                  alt="UNICEF" 
                  className="h-16 object-contain"
                />
              </div>
              <div className="flex justify-center grayscale hover:grayscale-0 transition-all">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/UNESCO_logo.svg/2560px-UNESCO_logo.svg.png" 
                  alt="UNESCO" 
                  className="h-16 object-contain"
                />
              </div>
              <div className="flex justify-center grayscale hover:grayscale-0 transition-all">
                <img 
                  src="https://e7.pngegg.com/pngimages/1012/958/png-clipart-grameenphone-logo-grameenphone-logo-icons-logos-emojis-tech-companies.png" 
                  alt="Grameenphone" 
                  className="h-16 object-contain"
                />
              </div>
              <div className="flex justify-center grayscale hover:grayscale-0 transition-all">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Brac_logo.svg/2560px-Brac_logo.svg.png" 
                  alt="BRAC" 
                  className="h-16 object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-xl">
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-6">
              <Share2 className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">যোগাযোগ করুন</h2>
            <p className="text-gray-700 mb-6">
              আমাদের সাথে যোগাযোগ করতে নিচের যেকোনো মাধ্যম ব্যবহার করুন। আমরা সর্বদা আপনার মতামত, প্রশ্ন ও পরামর্শ শুনতে আগ্রহী।
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-white p-2 rounded-full mr-4">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">ইমেইল</h3>
                  <p className="text-gray-600">contact@biggansala.bd</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white p-2 rounded-full mr-4">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">ফোন</h3>
                  <p className="text-gray-600">+880 1XXXXXXXXX</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white p-2 rounded-full mr-4">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">ঠিকানা</h3>
                  <p className="text-gray-600">বাড়ি #১২৩, রোড #১০, ধানমন্ডি, ঢাকা-১২০৫</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex space-x-4">
              <a href="#" className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 5.79a8.36 8.36 0 0 1-2.33.64 4.07 4.07 0 0 0 1.8-2.27 8.19 8.19 0 0 1-2.57.98 4.1 4.1 0 0 0-7 3.74 11.64 11.64 0 0 1-8.45-4.29 4.16 4.16 0 0 0-.55 2.07 4.1 4.1 0 0 0 1.82 3.41 4.05 4.05 0 0 1-1.86-.51v.05a4.1 4.1 0 0 0 3.3 4.03 4.13 4.13 0 0 1-1.86.07 4.1 4.1 0 0 0 3.83 2.85A8.22 8.22 0 0 1 2 18.33a11.57 11.57 0 0 0 6.29 1.85c7.55 0 11.67-6.25 11.67-11.67 0-.18 0-.35-.01-.52A8.32 8.32 0 0 0 22 5.8z"></path>
                </svg>
              </a>
              <a href="#" className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.9 2H3.1A1.1 1.1 0 0 0 2 3.1v17.8A1.1 1.1 0 0 0 3.1 22h9.58v-7.75h-2.6v-3h2.6V9a3.64 3.64 0 0 1 3.88-4 20.26 20.26 0 0 1 2.33.12v2.7H17.3c-1.26 0-1.5.6-1.5 1.47v1.93h3l-.39 3H15.8V22h5.1a1.1 1.1 0 0 0 1.1-1.1V3.1A1.1 1.1 0 0 0 20.9 2z"></path>
                </svg>
              </a>
              <a href="#" className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm5.86 8.12c.04.26.06.57.06.87 0 3.37-2.57 7.26-7.26 7.26a7.2 7.2 0 0 1-3.9-1.15 5.21 5.21 0 0 0 3.8-1.06 2.56 2.56 0 0 1-2.4-1.78 2.6 2.6 0 0 0 1.16-.04 2.58 2.58 0 0 1-2.06-2.54v-.03c.35.2.75.32 1.18.33a2.57 2.57 0 0 1-.8-3.45 7.29 7.29 0 0 0 5.3 2.68 2.56 2.56 0 0 1 4.37-2.33 5.13 5.13 0 0 0 1.63-.63 2.56 2.56 0 0 1-1.13 1.42 5.1 5.1 0 0 0 1.47-.4 5.22 5.22 0 0 1-1.28 1.32z"></path>
                </svg>
              </a>
              <a href="#" className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.5 5.66c-.26-.97-1.06-1.76-2.04-2.05C18.88 3 12 3 12 3s-6.88 0-8.46.61c-.98.29-1.78 1.08-2.04 2.05C1 7.45 1 11.5 1 11.5s0 4.05.5 5.84c.26.97 1.06 1.76 2.04 2.05C5.12 20 12 20 12 20s6.88 0 8.46-.61c.98-.29 1.78-1.08 2.04-2.05.5-1.79.5-5.84.5-5.84s0-4.05-.5-5.84zM9.75 15.25V7.75l5.63 3.75-5.63 3.75z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6">
              <Phone className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">মেসেজ পাঠান</h2>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">নাম</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="আপনার নাম"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">ইমেইল</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="আপনার ইমেইল"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">বিষয়</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="বিষয়"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">মেসেজ</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="আপনার মেসেজ লিখুন..."
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-medium transition-colors"
              >
                পাঠান
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
