'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, BookOpen } from 'lucide-react';

// Define the Article type
interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  slug: string;
  imageUrl: string;
}

// Sample article data
const sampleArticles: Article[] = [
  {
    id: '1',
    title: 'পদার্থবিজ্ঞানের মৌলিক ধারণা',
    excerpt: 'পদার্থবিজ্ঞানের মৌলিক ধারণাগুলি সম্পর্কে একটি সংক্ষিপ্ত আলোচনা।',
    category: 'পদার্থবিজ্ঞান',
    author: 'ড. আহমেদ হোসেন',
    date: '২০২৩-০৫-১৫',
    readTime: '৮ মিনিট',
    slug: 'basic-physics-concepts',
    imageUrl: '/placeholder.svg?height=200&width=300',
  },
  {
    id: '2',
    title: 'রসায়নের আধুনিক প্রয়োগ',
    excerpt: 'আধুনিক জীবনে রসায়নের বিভিন্ন প্রয়োগ নিয়ে বিস্তারিত আলোচনা।',
    category: 'রসায়ন',
    author: 'ড. ফারহানা বেগম',
    date: '২০২৩-০৬-২২',
    readTime: '১২ মিনিট',
    slug: 'modern-chemistry-applications',
    imageUrl: '/placeholder.svg?height=200&width=300',
  },
  {
    id: '3',
    title: 'জীববিজ্ঞানের আশ্চর্য জগৎ',
    excerpt: 'জীববিজ্ঞানের কিছু আশ্চর্যজনক তথ্য যা আপনি জানেন না।',
    category: 'জীববিজ্ঞান',
    author: 'ড. কামরুল হাসান',
    date: '২০২৩-০৭-০৫',
    readTime: '১০ মিনিট',
    slug: 'amazing-biology-world',
    imageUrl: '/placeholder.svg?height=200&width=300',
  },
  {
    id: '4',
    title: 'গণিতের ইতিহাস',
    excerpt: 'গণিতের উদ্ভব থেকে আধুনিক গণিত পর্যন্ত একটি ঐতিহাসিক যাত্রা।',
    category: 'গণিত',
    author: 'ড. রফিকুল ইসলাম',
    date: '২০২৩-০৮-১০',
    readTime: '১৫ মিনিট',
    slug: 'history-of-mathematics',
    imageUrl: '/placeholder.svg?height=200&width=300',
  },
  {
    id: '5',
    title: 'আধুনিক প্রযুক্তি ও বিজ্ঞান',
    excerpt: 'আধুনিক প্রযুক্তির পিছনে বিজ্ঞানের ভূমিকা।',
    category: 'প্রযুক্তি',
    author: 'ড. সালমা আক্তার',
    date: '২০২৩-০৯-০১',
    readTime: '৯ মিনিট',
    slug: 'modern-technology-and-science',
    imageUrl: '/placeholder.svg?height=200&width=300',
  },
];

const ArticlesListPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>(sampleArticles);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Get unique categories
  const categories = Array.from(
    new Set(sampleArticles.map((article) => article.category))
  );

  // Filter articles based on search term and category
  useEffect(() => {
    let filteredArticles = sampleArticles;

    if (searchTerm) {
      filteredArticles = filteredArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filteredArticles = filteredArticles.filter(
        (article) => article.category === selectedCategory
      );
    }

    setArticles(filteredArticles);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          বিজ্ঞান <span className="text-indigo-600">প্রবন্ধ সমূহ</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          বিজ্ঞানের বিভিন্ন বিষয়ে আকর্ষণীয় প্রবন্ধ পড়ুন এবং আপনার জ্ঞান
          বাড়ান।
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="প্রবন্ধ খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
          <select
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">সকল বিভাগ</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Articles Grid */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={article.imageUrl || '/placeholder.svg'}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500">{article.date}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {article.author}
                  </span>
                  <span className="text-sm text-gray-500 flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    {article.readTime}
                  </span>
                </div>
                <Link
                  to={`/article/${article.slug}`}
                  className="mt-4 inline-block w-full text-center py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  পড়ুন
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center">
            <Search className="h-8 w-8 text-indigo-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            কোন প্রবন্ধ পাওয়া যায়নি
          </h3>
          <p className="text-gray-600">
            আপনার অনুসন্ধান মানদণ্ড পরিবর্তন করে আবার চেষ্টা করুন।
          </p>
        </div>
      )}
    </div>
  );
};

export default ArticlesListPage;
