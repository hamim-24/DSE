'use client';

import type React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  X,
  BookOpen,
  Award,
  User,
  WifiOff,
  Gift,
  Headphones,
  FileText,
  Brain,
  Building2,
  BookOpenText,
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Use try-catch to handle potential context errors
  const contextValues = useAppContext();

  const { isLoggedIn, points, learningStreak, login, userTier, userRole } =
    contextValues;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 group">
          <BookOpen className="h-8 w-8 transform group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-2xl font-bold tracking-tight">
            বিজ্ঞান<span className="text-yellow-300">শালা</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/content"
            className="hover:text-yellow-300 transition-colors"
          >
            কনটেন্ট
          </Link>
          <Link to="/learn" className="hover:text-yellow-300 transition-colors">
            শেখা
          </Link>
          <Link
            to="/articleslist"
            className="hover:text-yellow-300 transition-colors flex items-center"
          >
            <BookOpenText className="h-4 w-4 mr-1" />
            প্রবন্ধ
          </Link>
          <Link
            to="/rewards"
            className="hover:text-yellow-300 transition-colors flex items-center"
          >
            <Gift className="h-4 w-4 mr-1" />
            রিওয়ার্ড
          </Link>
          <Link
            to="/quiz"
            className="hover:text-yellow-300 transition-colors flex items-center"
          >
            <FileText className="h-4 w-4 mr-1" />
            কুইজ/জরিপ
          </Link>
          <Link
            to="/ai-learning"
            className="hover:text-yellow-300 transition-colors flex items-center"
          >
            <Brain className="h-4 w-4 mr-1" />
            এআই লার্নিং পাথ
          </Link>
          <Link
            to="/audio-library"
            className="hover:text-yellow-300 transition-colors flex items-center"
          >
            <Headphones className="h-4 w-4 mr-1" />
            অডিও লাইব্রেরি
          </Link>
          <Link to="/about" className="hover:text-yellow-300 transition-colors">
            আমাদের সম্পর্কে
          </Link>
          <Link
            to="/offline"
            className="hover:text-yellow-300 transition-colors flex items-center"
          >
            <WifiOff className="h-4 w-4 mr-1" />
            অফলাইন
          </Link>

          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-700 rounded-full px-3 py-1 text-sm flex items-center">
                <Award className="h-4 w-4 mr-1" />
                <span>{points} পয়েন্ট</span>
              </div>
              <div className="bg-purple-700 rounded-full px-3 py-1 text-sm flex items-center">
                <span className="mr-1">🔥</span>
                <span>{learningStreak} দিন</span>
              </div>
              {isLoggedIn && userRole !== 'regular' && (
                <div className="bg-yellow-600 rounded-full px-3 py-1 text-sm flex items-center">
                  {userRole === 'teacher' ? (
                    <>
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span>শিক্ষক</span>
                    </>
                  ) : userRole === 'ngo' ? (
                    <>
                      <Building2 className="h-4 w-4 mr-1" />
                      <span>এনজিও</span>
                    </>
                  ) : null}
                </div>
              )}
              <Link
                to="/profile"
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-full p-2 transition-colors"
              >
                <User className="h-5 w-5" />
              </Link>
            </div>
          ) : (
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-2 rounded-md font-medium transition-colors"
              onClick={() => login()}
            >
              লগইন করুন
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-700 px-4 py-2">
          <nav className="flex flex-col space-y-3 text-white">
            <Link
              to="/content"
              className="py-2 hover:text-yellow-300 transition-colors"
              onClick={toggleMenu}
            >
              কনটেন্ট
            </Link>
            <Link
              to="/learn"
              className="py-2 hover:text-yellow-300 transition-colors"
              onClick={toggleMenu}
            >
              শেখা
            </Link>
            <Link
              to="/articleslist"
              className="py-2 hover:text-yellow-300 transition-colors flex items-center"
              onClick={toggleMenu}
            >
              <BookOpenText className="h-4 w-4 mr-1" />
              প্রবন্ধ
            </Link>
            <Link
              to="/rewards"
              className="py-2 hover:text-yellow-300 transition-colors flex items-center"
              onClick={toggleMenu}
            >
              <Gift className="h-4 w-4 mr-1" />
              রিওয়ার্ড
            </Link>
            <Link
              to="/quiz"
              className="py-2 hover:text-yellow-300 transition-colors flex items-center"
              onClick={toggleMenu}
            >
              <FileText className="h-4 w-4 mr-1" />
              কুইজ/জরিপ
            </Link>
            <Link
              to="/ai-learning"
              className="py-2 hover:text-yellow-300 transition-colors flex items-center"
              onClick={toggleMenu}
            >
              <Brain className="h-4 w-4 mr-1" />
              এআই লার্নিং পাথ
            </Link>
            <Link
              to="/audio-library"
              className="py-2 hover:text-yellow-300 transition-colors flex items-center"
              onClick={toggleMenu}
            >
              <Headphones className="h-4 w-4 mr-1" />
              অডিও লাইব্রেরি
            </Link>
            <Link
              to="/about"
              className="py-2 hover:text-yellow-300 transition-colors"
              onClick={toggleMenu}
            >
              আমাদের সম্পর্কে
            </Link>
            <Link
              to="/offline"
              className="py-2 hover:text-yellow-300 transition-colors flex items-center"
              onClick={toggleMenu}
            >
              <WifiOff className="h-4 w-4 mr-1" />
              অফলাইন
            </Link>

            {isLoggedIn ? (
              <div className="flex items-center justify-between py-2">
                <div className="flex space-x-2">
                  <div className="bg-indigo-800 rounded-full px-3 py-1 text-sm flex items-center">
                    <Award className="h-4 w-4 mr-1" />
                    <span>{points}</span>
                  </div>
                  <div className="bg-purple-800 rounded-full px-3 py-1 text-sm flex items-center">
                    <span className="mr-1">🔥</span>
                    <span>{learningStreak}</span>
                  </div>
                  {isLoggedIn && userRole !== 'regular' && (
                    <div className="bg-yellow-600 rounded-full px-3 py-1 text-sm flex items-center">
                      {userRole === 'teacher' ? (
                        <>
                          <BookOpen className="h-4 w-4 mr-1" />
                          <span>শিক্ষক</span>
                        </>
                      ) : userRole === 'ngo' ? (
                        <>
                          <Building2 className="h-4 w-4 mr-1" />
                          <span>এনজিও</span>
                        </>
                      ) : null}
                    </div>
                  )}
                </div>
                <Link
                  to="/profile"
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-full p-2 transition-colors"
                  onClick={toggleMenu}
                >
                  <User className="h-5 w-5" />
                </Link>
              </div>
            ) : (
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-2 rounded-md font-medium transition-colors"
                onClick={() => {
                  login();
                  toggleMenu();
                }}
              >
                লগইন করুন
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
