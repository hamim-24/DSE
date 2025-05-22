'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  User,
  Calendar,
  Share2,
  ThumbsUp,
  MessageSquare,
  Bookmark,
} from 'lucide-react';

// Define the Article type
interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  authorTitle: string;
  date: string;
  readTime: string;
  slug: string;
  imageUrl: string;
  relatedArticles: RelatedArticle[];
}

interface RelatedArticle {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
}

// Sample article data
const sampleArticles: Record<string, Article> = {
  'basic-physics-concepts': {
    id: '1',
    title: 'পদার্থবিজ্ঞানের মৌলিক ধারণা',
    content: `
      <p>পদার্থবিজ্ঞান হল প্রকৃতির মৌলিক নিয়মগুলি সম্পর্কে অধ্যয়ন। এটি পদার্থ, শক্তি, বল এবং তাদের মধ্যে মিথস্ক্রিয়া নিয়ে আলোচনা করে।</p>
      
      <h2>নিউটনের গতিসূত্র</h2>
      <p>আইজাক নিউটনের তিনটি গতিসূত্র পদার্থবিজ্ঞানের ভিত্তি হিসেবে বিবেচিত হয়:</p>
      <ul>
        <li><strong>প্রথম সূত্র (জড়তার সূত্র):</strong> কোনো বস্তু যদি স্থির থাকে বা সরলরেখায় সমবেগে চলতে থাকে, তবে তার উপর কোনো বাহ্যিক বল প্রয়োগ না করা পর্যন্ত সে অবস্থায় থাকবে।</li>
        <li><strong>দ্বিতীয় সূত্র (F = ma):</strong> কোনো বস্তুর উপর প্রযুক্ত বল সেই বস্তুর ভর এবং ত্বরণের গুণফলের সমান।</li>
        <li><strong>তৃতীয় সূত্র (ক্রিয়া-প্রতিক্রিয়া):</strong> প্রতিটি ক্রিয়ার জন্য সমান এবং বিপরীত প্রতিক্রিয়া থাকে।</li>
      </ul>
      
      <h2>শক্তির সংরক্ষণ সূত্র</h2>
      <p>শক্তি সৃষ্টি বা ধ্বংস করা যায় না, কেবল এক রূপ থেকে অন্য রূপে রূপান্তরিত করা যায়। এটি পদার্থবিজ্ঞানের অন্যতম গুরুত্বপূর্ণ নীতি।</p>
      
      <h2>আপেক্ষিকতার তত্ত্ব</h2>
      <p>আলবার্ট আইনস্টাইনের আপেক্ষিকতার তত্ত্ব আধুনিক পদার্থবিজ্ঞানের ভিত্তি। এটি দুটি প্রধান অংশে বিভক্ত:</p>
      <ul>
        <li><strong>বিশেষ আপেক্ষিকতা:</strong> এটি সময় এবং স্থানের সম্পর্ক নিয়ে আলোচনা করে এবং E = mc² সূত্রটি প্রদান করে।</li>
        <li><strong>সাধারণ আপেক্ষিকতা:</strong> এটি মহাকর্ষ বলকে স্থান-কালের বক্রতা হিসেবে ব্যাখ্যা করে।</li>
      </ul>
      
      <h2>কোয়ান্টাম বলবিদ্যা</h2>
      <p>কোয়ান্টাম বলবিদ্যা পরমাণু এবং উপ-পরমাণু কণাগুলির আচরণ বর্ণনা করে। এটি নিম্নলিখিত মূলনীতিগুলির উপর ভিত্তি করে:</p>
      <ul>
        <li><strong>অনিশ্চয়তার নীতি:</strong> হাইজেনবার্গের অনিশ্চয়তার নীতি অনুসারে, একটি কণার অবস্থান এবং গতিবেগ একই সাথে সঠিকভাবে পরিমাপ করা যায় না।</li>
        <li><strong>তরঙ্গ-কণা দ্বৈততা:</strong> কণাগুলি কখনও কখনও তরঙ্গের মতো আচরণ করে এবং কখনও কখনও কণার মতো আচরণ করে।</li>
      </ul>
    `,
    category: 'পদার্থবিজ্ঞান',
    author: 'ড. আহমেদ হোসেন',
    authorTitle: 'অধ্যাপক, পদার্থবিজ্ঞান বিভাগ',
    date: '২০২৩-০৫-১৫',
    readTime: '৮ মিনিট',
    slug: 'basic-physics-concepts',
    imageUrl: '/placeholder.svg?height=400&width=800',
    relatedArticles: [
      {
        id: '2',
        title: 'রসায়নের আধুনিক প্রয়োগ',
        slug: 'modern-chemistry-applications',
        imageUrl: '/placeholder.svg?height=100&width=150',
      },
      {
        id: '4',
        title: 'গণিতের ইতিহাস',
        slug: 'history-of-mathematics',
        imageUrl: '/placeholder.svg?height=100&width=150',
      },
    ],
  },
  'modern-chemistry-applications': {
    id: '2',
    title: 'রসায়নের আধুনিক প্রয়োগ',
    content: `
      <p>আধুনিক জীবনে রসায়নের প্রয়োগ অত্যন্ত ব্যাপক। আমাদের দৈনন্দিন জীবনের প্রায় সব ক্ষেত্রেই রসায়নের প্রভাব রয়েছে।</p>
      
      <h2>ঔষধ শিল্প</h2>
      <p>রসায়ন ঔষধ শিল্পের মূল ভিত্তি। নতুন ঔষধ আবিষ্কার থেকে শুরু করে উৎপাদন পর্যন্ত সব ধাপেই রসায়নের ব্যবহার রয়েছে।</p>
      
      <h2>কৃষি ক্ষেত্রে</h2>
      <p>সার, কীটনাশক এবং হরমোন ইত্যাদি কৃষি উৎপাদন বাড়াতে সাহায্য করে। এগুলি সবই রসায়নের প্রয়োগের ফল।</p>
      
      <h2>খাদ্য শিল্প</h2>
      <p>খাদ্য সংরক্ষণ, স্বাদ বাড়ানো এবং পুষ্টিমান বাড়ানোর জন্য বিভিন্ন রাসায়নিক পদার্থ ব্যবহার করা হয়।</p>
      
      <h2>প্লাস্টিক শিল্প</h2>
      <p>প্লাস্টিক আমাদের দৈনন্দিন জীবনের অপরিহার্য অংশ। এটি পলিমার রসায়নের একটি উল্লেখযোগ্য প্রয়োগ।</p>
      
      <h2>জ্বালানি</h2>
      <p>পেট্রোলিয়াম রসায়ন আমাদের যানবাহন চালানোর জন্য জ্বালানি সরবরাহ করে। এছাড়া বিভিন্ন শিল্পে শক্তির উৎস হিসেবেও এর ব্যবহার রয়েছে।</p>
      
      <h2>নতুন উপকরণ</h2>
      <p>নতুন ধরনের ধাতব মিশ্রণ, সুপারকন্ডাক্টর, নানো উপকরণ ইত্যাদি রসায়নের গবেষণার ফল।</p>
    `,
    category: 'রসায়ন',
    author: 'ড. ফারহানা বেগম',
    authorTitle: 'গবেষক, রসায়ন বিভাগ',
    date: '২০২৩-০৬-২২',
    readTime: '১২ মিনিট',
    slug: 'modern-chemistry-applications',
    imageUrl: '/placeholder.svg?height=400&width=800',
    relatedArticles: [
      {
        id: '1',
        title: 'পদার্থবিজ্ঞানের মৌলিক ধারণা',
        slug: 'basic-physics-concepts',
        imageUrl: '/placeholder.svg?height=100&width=150',
      },
      {
        id: '3',
        title: 'জীববিজ্ঞানের আশ্চর্য জগৎ',
        slug: 'amazing-biology-world',
        imageUrl: '/placeholder.svg?height=100&width=150',
      },
    ],
  },
};

const ArticlePage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call to fetch article
    setLoading(true);
    setTimeout(() => {
      if (name && sampleArticles[name]) {
        setArticle(sampleArticles[name]);
        setError(null);
      } else {
        setError('প্রবন্ধটি খুঁজে পাওয়া যায়নি।');
      }
      setLoading(false);
    }, 500);
  }, [name]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg inline-block">
          <h2 className="text-xl font-semibold mb-2">ত্রুটি</h2>
          <p>{error || 'অজানা ত্রুটি'}</p>
        </div>
        <div className="mt-6">
          <Link
            to="/articleslist"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            সকল প্রবন্ধে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          to="/articleslist"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          সকল প্রবন্ধে ফিরে যান
        </Link>
      </div>

      {/* Article Header */}
      <div className="mb-8">
        <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mb-4">
          {article.category}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center text-gray-600 gap-4 mb-6">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{article.readTime}</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="mb-8">
        <img
          src={article.imageUrl || '/placeholder.svg'}
          alt={article.title}
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div>

      {/* Article Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          {/* Social Sharing */}
          <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-4">
              <button className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
                <ThumbsUp className="h-5 w-5 mr-1" />
                <span>পছন্দ</span>
              </button>
              <button className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
                <MessageSquare className="h-5 w-5 mr-1" />
                <span>মন্তব্য</span>
              </button>
              <button className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
                <Bookmark className="h-5 w-5 mr-1" />
                <span>সংরক্ষণ</span>
              </button>
            </div>
            <button className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
              <Share2 className="h-5 w-5 mr-1" />
              <span>শেয়ার</span>
            </button>
          </div>

          {/* Article Body */}
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              ট্যাগ সমূহ
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                বিজ্ঞান
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                {article.category}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                শিক্ষা
              </span>
            </div>
          </div>

          {/* Author Info */}
          <div className="mt-8 p-6 bg-indigo-50 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-full bg-indigo-200 flex items-center justify-center mr-4">
                <User className="h-8 w-8 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {article.author}
                </h3>
                <p className="text-gray-600">{article.authorTitle}</p>
              </div>
            </div>
            <p className="text-gray-700">
              লেখক সম্পর্কে আরও তথ্য এখানে থাকবে। লেখকের অভিজ্ঞতা, গবেষণা এবং
              প্রকাশিত বইগুলি সম্পর্কে সংক্ষিপ্ত বিবরণ।
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3">
          {/* Related Articles */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              সম্পর্কিত প্রবন্ধ
            </h3>
            <div className="space-y-4">
              {article.relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  to={`/article/${related.slug}`}
                  className="flex items-center gap-3 group"
                >
                  <img
                    src={related.imageUrl || '/placeholder.svg'}
                    alt={related.title}
                    className="w-20 h-16 object-cover rounded"
                  />
                  <h4 className="text-gray-800 group-hover:text-indigo-600 transition-colors">
                    {related.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              বিভাগ সমূহ
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/articleslist?category=পদার্থবিজ্ঞান"
                  className="flex items-center justify-between text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  <span>পদার্থবিজ্ঞান</span>
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                    ১২
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/articleslist?category=রসায়ন"
                  className="flex items-center justify-between text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  <span>রসায়ন</span>
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                    ৮
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/articleslist?category=জীববিজ্ঞান"
                  className="flex items-center justify-between text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  <span>জীববিজ্ঞান</span>
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                    ১৫
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/articleslist?category=গণিত"
                  className="flex items-center justify-between text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  <span>গণিত</span>
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                    ১০
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/articleslist?category=প্রযুক্তি"
                  className="flex items-center justify-between text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  <span>প্রযুক্তি</span>
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                    ১৪
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
