import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <BookOpen className="h-8 w-8 transform group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-2xl font-bold tracking-tight">বিজ্ঞান<span className="text-yellow-300">শালা</span></span>
            </Link>
            <p className="text-sm text-gray-400">
              বাংলাদেশের সকল মানুষের জন্য সহজ, আকর্ষণীয়, ও মজাদার উপায়ে বিজ্ঞান শেখার ডিজিটাল প্লাটফর্ম���
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">দ্রুত লিংক</h3>
            <ul className="space-y-2">
              <li><Link to="/content" className="text-gray-400 hover:text-white transition-colors">কনটেন্ট</Link></li>
              <li><Link to="/learn" className="text-gray-400 hover:text-white transition-colors">শেখা</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">আমাদের সম্পর্কে</Link></li>
              <li><Link to="/profile" className="text-gray-400 hover:text-white transition-colors">প্রোফাইল</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">আমাদের ব্যবহারকারী</h3>
            <ul className="space-y-2">
              <li><Link to="/content?group=child" className="text-gray-400 hover:text-white transition-colors">শিশু</Link></li>
              <li><Link to="/content?group=student" className="text-gray-400 hover:text-white transition-colors">শিক্ষার্থী</Link></li>
              <li><Link to="/content?group=woman" className="text-gray-400 hover:text-white transition-colors">নারী</Link></li>
              <li><Link to="/content?group=elderly" className="text-gray-400 hover:text-white transition-colors">প্রবীণ</Link></li>
              <li><Link to="/content?group=teacher" className="text-gray-400 hover:text-white transition-colors">শিক্ষক</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">যোগাযোগ</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 mt-0.5 text-gray-400" />
                <span>contact@biggansala.bd</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 mt-0.5 text-gray-400" />
                <span>+880 1XXXXXXXXX</span>
              </li>
              <li className="mt-4">
                <div className="bg-gray-800 p-3 rounded-md">
                  <p className="text-sm mb-2">কল করে জানুন বিজ্ঞান সম্পর্কে:</p>
                  <div className="bg-yellow-500 text-gray-900 font-bold text-center py-2 rounded-md">
                    16xxx
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} বিজ্ঞানশালা। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-white transition-colors">
              গোপনীয়তা নীতি
            </Link>
            <Link to="/terms" className="text-sm text-gray-500 hover:text-white transition-colors">
              ব্যবহারের শর্তাবলী
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
