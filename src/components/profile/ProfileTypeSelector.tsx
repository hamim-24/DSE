'use client';

import type React from 'react';
import { User, BookOpen, Building2 } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const ProfileTypeSelector: React.FC = () => {
  const { userRole, setUserRole } = useAppContext();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4">
        প্রোফাইল টাইপ নির্বাচন করুন
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => setUserRole('regular')}
          className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
            userRole === 'regular'
              ? 'border-indigo-600 bg-indigo-50'
              : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50'
          }`}
        >
          <User
            className={`h-10 w-10 mb-2 ${
              userRole === 'regular' ? 'text-indigo-600' : 'text-gray-500'
            }`}
          />
          <span
            className={`font-medium ${
              userRole === 'regular' ? 'text-indigo-700' : 'text-gray-700'
            }`}
          >
            ব্যক্তিগত
          </span>
          <span className="text-xs text-gray-500 mt-1 text-center">
            শিক্ষার্থী বা ব্যক্তিগত ব্যবহারকারী
          </span>
        </button>

        <button
          onClick={() => setUserRole('teacher')}
          className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
            userRole === 'teacher'
              ? 'border-indigo-600 bg-indigo-50'
              : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50'
          }`}
        >
          <BookOpen
            className={`h-10 w-10 mb-2 ${
              userRole === 'teacher' ? 'text-indigo-600' : 'text-gray-500'
            }`}
          />
          <span
            className={`font-medium ${
              userRole === 'teacher' ? 'text-indigo-700' : 'text-gray-700'
            }`}
          >
            শিক্ষক
          </span>
          <span className="text-xs text-gray-500 mt-1 text-center">
            শিক্ষক বা প্রশিক্ষক
          </span>
        </button>

        <button
          onClick={() => setUserRole('ngo')}
          className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
            userRole === 'ngo'
              ? 'border-indigo-600 bg-indigo-50'
              : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50'
          }`}
        >
          <Building2
            className={`h-10 w-10 mb-2 ${
              userRole === 'ngo' ? 'text-indigo-600' : 'text-gray-500'
            }`}
          />
          <span
            className={`font-medium ${
              userRole === 'ngo' ? 'text-indigo-700' : 'text-gray-700'
            }`}
          >
            এনজিও
          </span>
          <span className="text-xs text-gray-500 mt-1 text-center">
            অলাভজনক সংস্থা বা সংগঠন
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProfileTypeSelector;
