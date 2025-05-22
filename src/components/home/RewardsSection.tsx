import React from 'react';
import { Award, Gift, CreditCard, MessageSquare } from 'lucide-react';

const RewardsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-yellow-50 to-amber-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">শেখার পুরস্কার</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            শিখে যান, পয়েন্ট অর্জন করুন, এবং আকর্ষণীয় পুরস্কার পেয়ে যান। যত বেশি শিখবেন, তত বেশি পাবেন।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">পয়েন্ট</h3>
            <p className="text-gray-600 text-center">
              প্রতিটি কোর্স সম্পূর্ণ, কুইজ সমাধান, ও কন্টেন্ট শেয়ার করলে পয়েন্ট অর্জন করবেন।
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">কুপন</h3>
            <p className="text-gray-600 text-center">
              আপনার অর্জিত পয়েন্ট বিনিময় করে পান Daraz, Foodpanda, Rokomari ইত্যাদিতে ব্যবহারযোগ্য কুপন।
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">মোবাইল ডেটা</h3>
            <p className="text-gray-600 text-center">
              আপনার পয়েন্ট বিনিময় করে বিনামূল্যে মোবাইল রিচার্জ এবং ডেটা প্যাকেজ পান।
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">স্পেশাল অ্যাক্সেস</h3>
            <p className="text-gray-600 text-center">
              উচ্চ পয়েন্ট অর্জনকারীরা পাবেন বিশেষজ্ঞদের সাথে লাইভ অ্যাডভাইস সেশন এবং নির্দিষ্ট কোর্সে এক্সেস।
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-3 rounded-md font-semibold transition-colors">
            রিওয়ার্ড সম্পর্কে বিস্তারিত জানুন
          </button>
        </div>
      </div>
    </section>
  );
};

export default RewardsSection;