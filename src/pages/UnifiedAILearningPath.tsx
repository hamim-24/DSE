'use client';

import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { grokAIService } from '../services/GrokAIService'; // Assuming GrokAIService is correctly set up
import {
  specializedAssistants,
  getAssistantById,
} from '../data/specializedAssistants';
import type { SpecializedAssistant } from '../types/aiEducationTypes'; // Make sure this path is correct

import {
  Brain,
  BookOpen,
  Lightbulb,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bookmark,
  ArrowRight,
  ChevronRight,
  Layers,
  Award,
  CheckCircle,
  Clock,
  Search,
  Atom,
  Beaker,
  Calculator,
  AlertTriangle,
  Info,
  Heart,
  Droplet,
  Globe,
  BookMarked,
  GraduationCap,
  Menu,
  X,
  ShieldCheck, // For Misinformation
  Sparkles, // For Hygiene
} from 'lucide-react';
import LoadingSpinner from '../components/ui/LoadingSpinner';

// Define types
interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface Topic {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  subjectId: string;
}

interface Resource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'tutorial' | 'course' | 'quiz' | 'interactive';
  url: string;
  description: string;
  subjectId: string;
}

interface Concept {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  topicId: string;
}

interface Subject {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string; // e.g., 'indigo', 'blue'. Used as key for colorClassMap
  topics?: Topic[];
}

// Tailwind CSS Color Class Mapping
// This object helps ensure Tailwind's JIT compiler recognizes all necessary classes.
const colorClassMap: Record<string, Record<string, string>> = {
  indigo: {
    bgGradientFrom: 'from-indigo-600',
    bgGradientTo: 'to-indigo-700',
    bg600: 'bg-indigo-600',
    bg200: 'bg-indigo-200',
    bg100: 'bg-indigo-100',
    bg50: 'bg-indigo-50',
    text600: 'text-indigo-600',
    text700: 'text-indigo-700',
    text800: 'text-indigo-800',
    text900: 'text-indigo-900',
    textWhite: 'text-white',
    border600: 'border-indigo-600',
    border300: 'border-indigo-300',
    hoverBg700: 'hover:bg-indigo-700',
    hoverBg100: 'hover:bg-indigo-100',
    hoverBg50: 'hover:bg-indigo-50',
  },
  blue: {
    bgGradientFrom: 'from-blue-600',
    bgGradientTo: 'to-blue-700',
    bg600: 'bg-blue-600',
    bg200: 'bg-blue-200',
    bg100: 'bg-blue-100',
    bg50: 'bg-blue-50',
    text600: 'text-blue-600',
    text700: 'text-blue-700',
    text800: 'text-blue-800',
    text900: 'text-blue-900',
    textWhite: 'text-white',
    border600: 'border-blue-600',
    border300: 'border-blue-300',
    hoverBg700: 'hover:bg-blue-700',
    hoverBg100: 'hover:bg-blue-100',
    hoverBg50: 'hover:bg-blue-50',
  },
  green: {
    bgGradientFrom: 'from-green-600',
    bgGradientTo: 'to-green-700',
    bg600: 'bg-green-600',
    bg200: 'bg-green-200',
    bg100: 'bg-green-100',
    bg50: 'bg-green-50',
    text600: 'text-green-600',
    text700: 'text-green-700',
    text800: 'text-green-800',
    text900: 'text-green-900',
    textWhite: 'text-white',
    border600: 'border-green-600',
    border300: 'border-green-300',
    hoverBg700: 'hover:bg-green-700',
    hoverBg100: 'hover:bg-green-100',
    hoverBg50: 'hover:bg-green-50',
  },
  red: {
    bgGradientFrom: 'from-red-600',
    bgGradientTo: 'to-red-700',
    bg600: 'bg-red-600',
    bg200: 'bg-red-200',
    bg100: 'bg-red-100',
    bg50: 'bg-red-50',
    text600: 'text-red-600',
    text700: 'text-red-700',
    text800: 'text-red-800',
    text900: 'text-red-900',
    textWhite: 'text-white',
    border600: 'border-red-600',
    border300: 'border-red-300',
    hoverBg700: 'hover:bg-red-700',
    hoverBg100: 'hover:bg-red-100',
    hoverBg50: 'hover:bg-red-50',
  },
  orange: {
    bgGradientFrom: 'from-orange-600',
    bgGradientTo: 'to-orange-700',
    bg600: 'bg-orange-600',
    bg200: 'bg-orange-200',
    bg100: 'bg-orange-100',
    bg50: 'bg-orange-50',
    text600: 'text-orange-600',
    text700: 'text-orange-700',
    text800: 'text-orange-800',
    text900: 'text-orange-900',
    textWhite: 'text-white',
    border600: 'border-orange-600',
    border300: 'border-orange-300',
    hoverBg700: 'hover:bg-orange-700',
    hoverBg100: 'hover:bg-orange-100',
    hoverBg50: 'hover:bg-orange-50',
  },
  yellow: {
    bgGradientFrom: 'from-yellow-500',
    bgGradientTo: 'to-yellow-600',
    bg600: 'bg-yellow-500',
    bg200: 'bg-yellow-200',
    bg100: 'bg-yellow-100',
    bg50: 'bg-yellow-50',
    text600: 'text-yellow-600',
    text700: 'text-yellow-700',
    text800: 'text-yellow-800',
    text900: 'text-yellow-900',
    textWhite: 'text-gray-800', // Yellow often needs darker text for readability
    border600: 'border-yellow-500',
    border300: 'border-yellow-300',
    hoverBg700: 'hover:bg-yellow-600',
    hoverBg100: 'hover:bg-yellow-100',
    hoverBg50: 'hover:bg-yellow-50',
  },
  pink: {
    bgGradientFrom: 'from-pink-600',
    bgGradientTo: 'to-pink-700',
    bg600: 'bg-pink-600',
    bg200: 'bg-pink-200',
    bg100: 'bg-pink-100',
    bg50: 'bg-pink-50',
    text600: 'text-pink-600',
    text700: 'text-pink-700',
    text800: 'text-pink-800',
    text900: 'text-pink-900',
    textWhite: 'text-white',
    border600: 'border-pink-600',
    border300: 'border-pink-300',
    hoverBg700: 'hover:bg-pink-700',
    hoverBg100: 'hover:bg-pink-100',
    hoverBg50: 'hover:bg-pink-50',
  },
  cyan: {
    bgGradientFrom: 'from-cyan-600',
    bgGradientTo: 'to-cyan-700',
    bg600: 'bg-cyan-600',
    bg200: 'bg-cyan-200',
    bg100: 'bg-cyan-100',
    bg50: 'bg-cyan-50',
    text600: 'text-cyan-600',
    text700: 'text-cyan-700',
    text800: 'text-cyan-800',
    text900: 'text-cyan-900',
    textWhite: 'text-white',
    border600: 'border-cyan-600',
    border300: 'border-cyan-300',
    hoverBg700: 'hover:bg-cyan-700',
    hoverBg100: 'hover:bg-cyan-100',
    hoverBg50: 'hover:bg-cyan-50',
  },
  purple: {
    bgGradientFrom: 'from-purple-600',
    bgGradientTo: 'to-purple-700',
    bg600: 'bg-purple-600',
    bg200: 'bg-purple-200',
    bg100: 'bg-purple-100',
    bg50: 'bg-purple-50',
    text600: 'text-purple-600',
    text700: 'text-purple-700',
    text800: 'text-purple-800',
    text900: 'text-purple-900',
    textWhite: 'text-white',
    border600: 'border-purple-600',
    border300: 'border-purple-300',
    hoverBg700: 'hover:bg-purple-700',
    hoverBg100: 'hover:bg-purple-100',
    hoverBg50: 'hover:bg-purple-50',
  },
  teal: {
    bgGradientFrom: 'from-teal-600',
    bgGradientTo: 'to-teal-700',
    bg600: 'bg-teal-600',
    bg200: 'bg-teal-200',
    bg100: 'bg-teal-100',
    bg50: 'bg-teal-50',
    text600: 'text-teal-600',
    text700: 'text-teal-700',
    text800: 'text-teal-800',
    text900: 'text-teal-900',
    textWhite: 'text-white',
    border600: 'border-teal-600',
    border300: 'border-teal-300',
    hoverBg700: 'hover:bg-teal-700',
    hoverBg100: 'hover:bg-teal-100',
    hoverBg50: 'hover:bg-teal-50',
  },
  gray: {
    bgGradientFrom: 'from-gray-600',
    bgGradientTo: 'to-gray-700',
    bg600: 'bg-gray-600',
    bg200: 'bg-gray-200',
    bg100: 'bg-gray-100',
    bg50: 'bg-gray-50',
    text600: 'text-gray-600',
    text700: 'text-gray-700',
    text800: 'text-gray-800',
    text900: 'text-gray-900',
    textWhite: 'text-white',
    border600: 'border-gray-600',
    border300: 'border-gray-300',
    hoverBg700: 'hover:bg-gray-700',
    hoverBg100: 'hover:bg-gray-200',
    hoverBg50: 'hover:bg-gray-100',
  },
  default: {
    // Fallback color
    bgGradientFrom: 'from-gray-600',
    bgGradientTo: 'to-gray-700',
    bg600: 'bg-gray-600',
    bg200: 'bg-gray-200',
    bg100: 'bg-gray-100',
    bg50: 'bg-gray-50',
    text600: 'text-gray-600',
    text700: 'text-gray-700',
    text800: 'text-gray-800',
    text900: 'text-gray-900',
    textWhite: 'text-white',
    border600: 'border-gray-600',
    border300: 'border-gray-300',
    hoverBg700: 'hover:bg-gray-700',
    hoverBg100: 'hover:bg-gray-200',
    hoverBg50: 'hover:bg-gray-100',
  },
};

// Helper to get specific color classes
const getColorClasses = (colorNameKey: string | undefined) => {
  const key = colorNameKey || 'default';
  return colorClassMap[key] || colorClassMap.default;
};

// Main component
const UnifiedAILearningPath: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const activeTab = queryParams.get('tab') || 'overview';
  const activeSubjectParam = queryParams.get('subject') || 'ai'; // Default subject 'ai'
  const activeTopicParam = queryParams.get('topic') || null;

  // State
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(
    activeTopicParam
  );
  const [selectedAssistant, setSelectedAssistant] =
    useState<SpecializedAssistant | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubject, setActiveSubject] =
    useState<string>(activeSubjectParam);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Subjects
  const subjects: Subject[] = [
    {
      id: 'ai',
      title: 'কৃত্রিম বুদ্ধিমত্তা',
      description: 'এআই এর মৌলিক ধারণা থেকে উন্নত বিষয়গুলি পর্যন্ত শিখুন',
      icon: <Brain className="h-6 w-6" />,
      color: 'indigo',
    },
    {
      id: 'physics',
      title: 'পদার্থবিজ্ঞান',
      description: 'পদার্থবিজ্ঞানের মৌলিক নীতি এবং প্রয়োগ',
      icon: <Atom className="h-6 w-6" />,
      color: 'blue',
    },
    {
      id: 'chemistry',
      title: 'রসায়ন',
      description: 'রাসায়নিক বিক্রিয়া এবং পদার্থের গঠন',
      icon: <Beaker className="h-6 w-6" />,
      color: 'green',
    },
    {
      id: 'mathematics',
      title: 'গণিত',
      description: 'বীজগণিত, জ্যামিতি, ক্যালকুলাস এবং আরও অনেক কিছু',
      icon: <Calculator className="h-6 w-6" />,
      color: 'red',
    },
    {
      id: 'myths',
      title: 'কুসংস্কার নিরসন',
      description: 'বিজ্ঞান-ভিত্তিক দৃষ্টিকোণ থেকে কুসংস্কার নিরসন',
      icon: <AlertTriangle className="h-6 w-6" />,
      color: 'orange',
    },
    {
      id: 'misinformation',
      title: 'ভুল তথ্য সচেতনতা',
      description: 'ভুল তথ্য চিহ্নিত করা এবং সত্য যাচাই করা',
      icon: <ShieldCheck className="h-6 w-6" />, // Changed icon
      color: 'yellow',
    },
    {
      id: 'health',
      title: 'স্বাস্থ্য',
      description: 'সুস্থ জীবনযাপন এবং রোগ প্রতিরোধ',
      icon: <Heart className="h-6 w-6" />,
      color: 'pink',
    },
    {
      id: 'hygiene',
      title: 'স্বাস্থ্যবিধি',
      description: 'ব্যক্তিগত পরিচ্ছন্নতা এবং স্বাস্থ্যকর অভ্যাস',
      icon: <Sparkles className="h-6 w-6" />, // Changed icon
      color: 'cyan',
    },
    {
      id: 'english',
      title: 'ইংরেজি',
      description: 'ইংরেজি ভাষা শেখা এবং অনুশীলন',
      icon: <Globe className="h-6 w-6" />,
      color: 'purple',
    },
    {
      id: 'bangla',
      title: 'বাংলা',
      description: 'বাংলা ভাষা, সাহিত্য এবং ব্যাকরণ',
      icon: <BookMarked className="h-6 w-6" />,
      color: 'teal',
    },
    {
      id: 'gk',
      title: 'সাধারণ জ্ঞান',
      description: 'বিভিন্ন বিষয়ে সাধারণ জ্ঞান',
      icon: <GraduationCap className="h-6 w-6" />,
      color: 'gray',
    },
  ];

  // Helper to get current subject's color classes
  const currentSubjectColors = getColorClasses(
    subjects.find((s) => s.id === activeSubject)?.color
  );

  // AI Topics (Example)
  const aiTopics: Topic[] = [
    {
      id: 'ai-basics',
      title: 'এআই এর মৌলিক ধারণা',
      description: 'কৃত্রিম বুদ্ধিমত্তা কী এবং এটি কীভাবে কাজ করে',
      icon: <Brain className="h-5 w-5" />,
      progress: 60,
      subjectId: 'ai',
    },
    {
      id: 'machine-learning',
      title: 'মেশিন লার্নিং',
      description: 'মেশিন লার্নিং এর মূলনীতি এবং প্রয়োগ',
      icon: <BookOpen className="h-5 w-5" />,
      progress: 25,
      subjectId: 'ai',
    },
    {
      id: 'neural-networks',
      title: 'নিউরাল নেটওয়ার্ক',
      description: 'নিউরাল নেটওয়ার্ক কীভাবে কাজ করে',
      icon: <Lightbulb className="h-5 w-5" />,
      progress: 10,
      subjectId: 'ai',
    },
    {
      id: 'ai-ethics',
      title: 'এআই নীতিশাস্ত্র',
      description: 'এআই এর নৈতিক দিক এবং সামাজিক প্রভাব',
      icon: <MessageSquare className="h-5 w-5" />,
      progress: 5,
      subjectId: 'ai',
    },
  ];
  const physicsTopics: Topic[] = [
    {
      id: 'mechanics',
      title: 'বলবিদ্যা',
      description: 'নিউটনের সূত্র, বল, গতি এবং শক্তি',
      icon: <Atom className="h-5 w-5" />,
      progress: 45,
      subjectId: 'physics',
    },
    {
      id: 'thermodynamics',
      title: 'তাপগতিবিদ্যা',
      description: 'তাপ, কাজ এবং তাপগতিবিদ্যার সূত্র',
      icon: <Atom className="h-5 w-5" />,
      progress: 30,
      subjectId: 'physics',
    },
    {
      id: 'electromagnetism',
      title: 'তড়িৎচুম্বকত্ব',
      description: 'বিদ্যুৎ, চুম্বকত্ব এবং ম্যাক্সওয়েলের সমীকরণ',
      icon: <Atom className="h-5 w-5" />,
      progress: 20,
      subjectId: 'physics',
    },
    {
      id: 'modern-physics',
      title: 'আধুনিক পদার্থবিজ্ঞান',
      description:
        'আপেক্ষিকতা, কোয়ান্টাম মেকানিক্স এবং পারমাণবিক পদার্থবিজ্ঞান',
      icon: <Atom className="h-5 w-5" />,
      progress: 15,
      subjectId: 'physics',
    },
  ];
  const chemistryTopics: Topic[] = [
    {
      id: 'organic-chemistry',
      title: 'জৈব রসায়ন',
      description: 'কার্বন যৌগ এবং তাদের বিক্রিয়া',
      icon: <Beaker className="h-5 w-5" />,
      progress: 40,
      subjectId: 'chemistry',
    },
    {
      id: 'inorganic-chemistry',
      title: 'অজৈব রসায়ন',
      description: 'মৌল এবং তাদের যৌগ',
      icon: <Beaker className="h-5 w-5" />,
      progress: 35,
      subjectId: 'chemistry',
    },
    {
      id: 'physical-chemistry',
      title: 'ভৌত রসায়ন',
      description: 'রাসায়নিক বিক্রিয়ার ভৌত বৈশিষ্ট্য',
      icon: <Beaker className="h-5 w-5" />,
      progress: 25,
      subjectId: 'chemistry',
    },
    {
      id: 'biochemistry',
      title: 'প্রাণরসায়ন',
      description: 'জীবন্ত সিস্টেমের রাসায়নিক প্রক্রিয়া',
      icon: <Beaker className="h-5 w-5" />,
      progress: 20,
      subjectId: 'chemistry',
    },
  ];
  const mathTopics: Topic[] = [
    {
      id: 'algebra',
      title: 'বীজগণিত',
      description: 'সমীকরণ, ফাংশন এবং বীজগাণিতিক কাঠামো',
      icon: <Calculator className="h-5 w-5" />,
      progress: 50,
      subjectId: 'mathematics',
    },
    {
      id: 'geometry',
      title: 'জ্যামিতি',
      description: 'আকার, আকৃতি এবং স্থান সম্পর্কিত বিষয়',
      icon: <Calculator className="h-5 w-5" />,
      progress: 40,
      subjectId: 'mathematics',
    },
    {
      id: 'calculus',
      title: 'ক্যালকুলাস',
      description: 'ডেরিভেটিভ, ইন্টিগ্রাল এবং সীমা',
      icon: <Calculator className="h-5 w-5" />,
      progress: 30,
      subjectId: 'mathematics',
    },
    {
      id: 'statistics',
      title: 'পরিসংখ্যান',
      description: 'ডেটা বিশ্লেষণ, সম্ভাবনা এবং পরিসংখ্যানগত পরীক্ষা',
      icon: <Calculator className="h-5 w-5" />,
      progress: 35,
      subjectId: 'mathematics',
    },
  ];
  const healthTopics: Topic[] = [
    {
      id: 'nutrition',
      title: 'পুষ্টি',
      description: 'সুষম খাদ্য এবং পুষ্টির গুরুত্ব',
      icon: <Heart className="h-5 w-5" />,
      progress: 55,
      subjectId: 'health',
    },
    {
      id: 'exercise',
      title: 'ব্যায়াম',
      description: 'শারীরিক সুস্থতা এবং ব্যায়ামের উপকারিতা',
      icon: <Heart className="h-5 w-5" />,
      progress: 45,
      subjectId: 'health',
    },
    {
      id: 'mental-health',
      title: 'মানসিক স্বাস্থ্য',
      description: 'মানসিক সুস্থতা এবং চাপ নিয়ন্ত্রণ',
      icon: <Heart className="h-5 w-5" />,
      progress: 30,
      subjectId: 'health',
    },
    {
      id: 'disease-prevention',
      title: 'রোগ প্রতিরোধ',
      description: 'সাধারণ রোগ এবং তাদের প্রতিরোধ',
      icon: <Heart className="h-5 w-5" />,
      progress: 40,
      subjectId: 'health',
    },
  ];
  const englishTopics: Topic[] = [
    {
      id: 'grammar',
      title: 'Grammar',
      description: 'Rules of English grammar',
      icon: <Globe className="h-5 w-5" />,
      progress: 60,
      subjectId: 'english',
    },
    {
      id: 'vocabulary',
      title: 'Vocabulary',
      description: 'English words and their usage',
      icon: <Globe className="h-5 w-5" />,
      progress: 50,
      subjectId: 'english',
    },
    {
      id: 'speaking',
      title: 'Speaking',
      description: 'English speaking skills',
      icon: <Globe className="h-5 w-5" />,
      progress: 40,
      subjectId: 'english',
    },
    {
      id: 'writing',
      title: 'Writing',
      description: 'English writing skills',
      icon: <Globe className="h-5 w-5" />,
      progress: 45,
      subjectId: 'english',
    },
  ];
  const banglaTopics: Topic[] = [
    {
      id: 'bangla-grammar',
      title: 'বাংলা ব্যাকরণ',
      description: 'বাংলা ভাষার ব্যাকরণ নিয়ম',
      icon: <BookMarked className="h-5 w-5" />,
      progress: 65,
      subjectId: 'bangla',
    },
    {
      id: 'bangla-literature',
      title: 'বাংলা সাহিত্য',
      description: 'বাংলা সাহিত্যের ইতিহাস এবং বিখ্যাত লেখক',
      icon: <BookMarked className="h-5 w-5" />,
      progress: 55,
      subjectId: 'bangla',
    },
    {
      id: 'bangla-poetry',
      title: 'বাংলা কবিতা',
      description: 'বাংলা কবিতা এবং কবি',
      icon: <BookMarked className="h-5 w-5" />,
      progress: 45,
      subjectId: 'bangla',
    },
    {
      id: 'bangla-essay',
      title: 'বাংলা রচনা',
      description: 'বাংলা রচনা লেখার কৌশল',
      icon: <BookMarked className="h-5 w-5" />,
      progress: 50,
      subjectId: 'bangla',
    },
  ];
  const mythsTopics: Topic[] = [
    {
      id: 'health-myths',
      title: 'স্বাস্থ্য সম্পর্কিত কুসংস্কার',
      description: 'স্বাস্থ্য সম্পর্কিত ভুল ধারণা এবং সত্য',
      icon: <AlertTriangle className="h-5 w-5" />,
      progress: 70,
      subjectId: 'myths',
    },
    {
      id: 'science-myths',
      title: 'বিজ্ঞান সম্পর্কিত কুসংস্কার',
      description: 'বিজ্ঞান সম্পর্কিত ভুল ধারণা এবং সত্য',
      icon: <AlertTriangle className="h-5 w-5" />,
      progress: 60,
      subjectId: 'myths',
    },
    {
      id: 'food-myths',
      title: 'খাদ্য সম্পর্কিত কুসংস্কার',
      description: 'খাদ্য সম্পর্কিত ভুল ধারণা এবং সত্য',
      icon: <AlertTriangle className="h-5 w-5" />,
      progress: 55,
      subjectId: 'myths',
    },
    {
      id: 'technology-myths',
      title: 'প্রযুক্তি সম্পর্কিত কুসংস্কার',
      description: 'প্রযুক্তি সম্পর্কিত ভুল ধারণা এবং সত্য',
      icon: <AlertTriangle className="h-5 w-5" />,
      progress: 50,
      subjectId: 'myths',
    },
  ];
  const gkTopics: Topic[] = [
    {
      id: 'history',
      title: 'ইতিহাস',
      description: 'বিশ্ব ইতিহাস এবং বাংলাদেশের ইতিহাস',
      icon: <GraduationCap className="h-5 w-5" />,
      progress: 55,
      subjectId: 'gk',
    },
    {
      id: 'geography',
      title: 'ভূগোল',
      description: 'বিশ্ব ভূগোল এবং বাংলাদেশের ভূগোল',
      icon: <GraduationCap className="h-5 w-5" />,
      progress: 50,
      subjectId: 'gk',
    },
    {
      id: 'current-affairs',
      title: 'সাম্প্রতিক ঘটনাবলী',
      description: 'সাম্প্রতিক বিশ্ব ঘটনা এবং বাংলাদেশের ঘটনা',
      icon: <GraduationCap className="h-5 w-5" />,
      progress: 45,
      subjectId: 'gk',
    },
    {
      id: 'science-gk',
      title: 'বিজ্ঞান সাধারণ জ্ঞান',
      description: 'বিজ্ঞান সম্পর্কিত সাধারণ জ্ঞান',
      icon: <GraduationCap className="h-5 w-5" />,
      progress: 40,
      subjectId: 'gk',
    },
  ];

  // ADDED: Hygiene Topics
  const hygieneTopics: Topic[] = [
    {
      id: 'personal-hygiene',
      title: 'ব্যক্তিগত স্বাস্থ্যবিধি',
      description: 'দৈনন্দিন পরিষ্কার পরিচ্ছন্নতার অভ্যাস',
      icon: <Sparkles className="h-5 w-5" />,
      progress: 60,
      subjectId: 'hygiene',
    },
    {
      id: 'food-hygiene',
      title: 'খাদ্য স্বাস্থ্যবিধি',
      description: 'নিরাপদ খাদ্য প্রস্তুতি এবং সংরক্ষণ',
      icon: <Sparkles className="h-5 w-5" />,
      progress: 40,
      subjectId: 'hygiene',
    },
    {
      id: 'environmental-hygiene',
      title: 'পরিবেশগত স্বাস্থ্যবিধি',
      description: 'পরিষ্কার পরিবেশের গুরুত্ব',
      icon: <Sparkles className="h-5 w-5" />,
      progress: 30,
      subjectId: 'hygiene',
    },
    {
      id: 'hygiene-diseases',
      title: 'স্বাস্থ্যবিধি ও রোগ',
      description: 'অস্বাস্থ্যকর অভ্যাসের কারণে রোগ',
      icon: <Sparkles className="h-5 w-5" />,
      progress: 50,
      subjectId: 'hygiene',
    },
  ];

  // ADDED: Misinformation Topics
  const misinformationTopics: Topic[] = [
    {
      id: 'what-is-misinformation',
      title: 'ভুল তথ্য কী?',
      description: 'ভুল তথ্য, গুজব এবং অপপ্রচারের মধ্যে পার্থক্য',
      icon: <ShieldCheck className="h-5 w-5" />,
      progress: 65,
      subjectId: 'misinformation',
    },
    {
      id: 'identifying-misinformation',
      title: 'ভুল তথ্য চিহ্নিতকরণ',
      description: 'কীভাবে ভুল তথ্য সনাক্ত করা যায়',
      icon: <ShieldCheck className="h-5 w-5" />,
      progress: 50,
      subjectId: 'misinformation',
    },
    {
      id: 'fact-checking',
      title: 'সত্যতা যাচাই',
      description: 'তথ্য যাচাই করার পদ্ধতি ও টুলস',
      icon: <ShieldCheck className="h-5 w-5" />,
      progress: 45,
      subjectId: 'misinformation',
    },
    {
      id: 'impact-of-misinformation',
      title: 'ভুল তথ্যের প্রভাব',
      description: 'সমাজ ও ব্যক্তির উপর ভুল তথ্যের প্রভাব',
      icon: <ShieldCheck className="h-5 w-5" />,
      progress: 30,
      subjectId: 'misinformation',
    },
  ];

  const allTopics: Topic[] = [
    ...aiTopics,
    ...physicsTopics,
    ...chemistryTopics,
    ...mathTopics,
    ...healthTopics,
    ...englishTopics,
    ...banglaTopics,
    ...mythsTopics,
    ...gkTopics,
    ...hygieneTopics,
    ...misinformationTopics, // Added new topics
  ];

  // Resources for all subjects (ensure URLs are valid or placeholders if demonstrative)
  const allResources: Resource[] = [
    // AI Resources
    {
      id: 'ai-res-1',
      title: 'এআই এর ইতিহাস',
      type: 'article',
      url: '#',
      description: 'কৃত্রিম বুদ্ধিমত্তার উদ্ভব এবং বিকাশ',
      subjectId: 'ai',
    },
    {
      id: 'ai-res-2',
      title: 'মেশিন লার্নিং অ্যালগরিদম',
      type: 'video',
      url: '#',
      description: 'বিভিন্ন মেশিন লার্নিং অ্যালগরিদম সম্পর্কে বিস্তারিত',
      subjectId: 'ai',
    },
    // ... (keep existing resources and add more if needed) ...

    // ADDED: Hygiene Resources
    {
      id: 'hygiene-res-1',
      title: 'হাত ধোয়ার সঠিক নিয়ম',
      type: 'video',
      url: '#',
      description: 'ভিডিও টিউটোরিয়াল: সঠিকভাবে হাত ধোয়া',
      subjectId: 'hygiene',
    },
    {
      id: 'hygiene-res-2',
      title: 'খাবার নিরাপদ রাখার উপায়',
      type: 'article',
      url: '#',
      description: 'খাবার জীবাণুমুক্ত রাখার জন্য টিপস',
      subjectId: 'hygiene',
    },

    // ADDED: Misinformation Resources
    {
      id: 'misinfo-res-1',
      title: 'ফ্যাক্ট-চেকিং ওয়েবসাইটসমূহ',
      type: 'interactive',
      url: '#',
      description: 'জনপ্রিয় ফ্যাক্ট-চেকিং সাইটের তালিকা',
      subjectId: 'misinformation',
    },
    {
      id: 'misinfo-res-2',
      title: 'ডিজিটাল লিটারেসি কোর্স',
      type: 'course',
      url: '#',
      description: 'অনলাইন তথ্যের সঠিক ব্যবহার শিখুন',
      subjectId: 'misinformation',
    },
  ];
  // (Ensure `allResources` contains comprehensive examples for other subjects too)

  // AI Concepts (Example - expand for other subjects as needed)
  const aiConcepts: Concept[] = [
    {
      id: 'concept-1',
      title: 'সুপারভাইজড লার্নিং',
      description: 'লেবেল করা ডেটা ব্যবহার করে মেশিন লার্নিং',
      completed: true,
      topicId: 'machine-learning',
    },
    {
      id: 'concept-2',
      title: 'আনসুপারভাইজড লার্নিং',
      description: 'লেবেল না করা ডেটা থেকে প্যাটার্ন শেখা',
      completed: false,
      topicId: 'machine-learning',
    },
    {
      id: 'concept-3',
      title: 'রিইনফোর্সমেন্ট লার্নিং',
      description: 'পুরস্কার এবং শাস্তির মাধ্যমে শেখা',
      completed: false,
      topicId: 'machine-learning',
    },
    {
      id: 'concept-4',
      title: 'কনভলিউশনাল নিউরাল নেটওয়ার্ক',
      description: 'ইমেজ প্রসেসিং এর জন্য বিশেষ নিউরাল নেটওয়ার্ক',
      completed: false,
      topicId: 'neural-networks',
    },
  ];
  // Consider creating concept arrays for other subjects if the 'Concepts' tab is meant to be generic.
  // For now, it primarily uses aiConcepts.

  // Initialize with a welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const initialAssistant = getAssistantById(activeSubjectParam);
      const initialSubject = subjects.find((s) => s.id === activeSubjectParam);
      const welcomeMessage: Message = {
        id: 'welcome',
        role: 'assistant',
        content: `স্বাগতম! আমি ${initialAssistant.name}. ${
          initialSubject
            ? `আপনি বর্তমানে '${initialSubject.title}' বিষয়টি দেখছেন।`
            : ''
        } জিজ্ঞাসা করুন, আমি সাহায্য করতে প্রস্তুত।`,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSubjectParam]); // Runs once on mount based on initial URL param

  // Update selected assistant and welcome message if subject changes
  useEffect(() => {
    const assistant = getAssistantById(activeSubject);
    setSelectedAssistant(assistant);

    setMessages((prevMessages) => {
      if (prevMessages.length === 1 && prevMessages[0].id === 'welcome') {
        const currentSubject = subjects.find((s) => s.id === activeSubject);
        const welcomeText = `স্বাগতম! আমি ${assistant.name}. ${
          currentSubject
            ? `আপনি বর্তমানে '${currentSubject.title}' বিষয়টি দেখছেন।`
            : ''
        } জিজ্ঞাসা করুন, আমি সাহায্য করতে প্রস্তুত।`;
        // Update the existing welcome message content
        return [
          { ...prevMessages[0], content: welcomeText, timestamp: new Date() },
        ];
      }
      return prevMessages; // Otherwise, return messages as they are
    });
  }, [activeSubject]);

  // Update URL when subject or tab changes
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('subject', activeSubject);
    params.set('tab', activeTab);
    if (selectedTopic) {
      params.set('topic', selectedTopic);
    }
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [activeSubject, activeTab, selectedTopic, location.pathname, navigate]);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleTabChange = (tab: string) => {
    // setActiveTab(tab) // URL effect will handle navigation
    const params = new URLSearchParams(location.search);
    params.set('tab', tab);
    // Preserve subject and topic if relevant
    params.set('subject', activeSubject);
    if (selectedTopic) params.set('topic', selectedTopic);
    navigate(`${location.pathname}?${params.toString()}`);
    // The activeTab state will be updated by the effect listening to URL changes if needed,
    // or rely on queryParams.get('tab') directly. For simplicity, direct usage is fine.
  };

  const handleSubjectChange = (subjectId: string) => {
    setActiveSubject(subjectId);
    setSelectedTopic(null); // Reset topic when subject changes
    setMobileMenuOpen(false);
    // URL will be updated by the useEffect for activeSubject
  };

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
    // URL will be updated by useEffect for selectedTopic

    const topic = allTopics.find((t) => t.id === topicId);
    if (topic) {
      const topicMessage: Message = {
        id: `topic-${Date.now()}`,
        role: 'assistant',
        content: `আপনি "${topic.title}" বিষয়টি নির্বাচন করেছেন। ${topic.description}. আপনার কোন প্রশ্ন আছে এই বিষয়ে?`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, topicMessage]);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue; // Capture before clearing
    setInputValue('');
    setIsLoading(true);

    try {
      let systemPromptContent =
        selectedAssistant?.systemPrompt ||
        'You are a helpful educational assistant. Respond in Bengali when appropriate, unless the query is in English.';

      const currentTopic = allTopics.find((t) => t.id === selectedTopic);
      const currentSubjectInfo = subjects.find((s) => s.id === activeSubject);

      if (currentTopic) {
        systemPromptContent += ` The user is focused on the topic: "${currentTopic.title}" (${currentTopic.description}) within the subject "${currentSubjectInfo?.title}".`;
      } else if (currentSubjectInfo && selectedAssistant?.id === 'general') {
        // Only add broad subject if assistant is general
        systemPromptContent += ` The user is broadly interested in the subject: "${currentSubjectInfo.title}" (${currentSubjectInfo.description}).`;
      }
      // Instruct to use Bengali if appropriate, but respect English input
      systemPromptContent +=
        ' If the user asks a question in English, please respond in English. If the user asks in Bengali, respond in Bengali. Prioritize clarity and educational value.';

      const conversation =
        grokAIService.createConversation(systemPromptContent);
      const updatedConversation = grokAIService.addUserMessage(
        conversation,
        currentInput
      ); // Use captured input
      const responseConversation = await grokAIService.sendMessage(
        updatedConversation
      );
      const assistantMessageContent = responseConversation.messages.find(
        (m) => m.role === 'assistant'
      )?.content;

      if (assistantMessageContent) {
        const newAssistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: assistantMessageContent,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, newAssistantMessage]);
      } else {
        throw new Error('No assistant message received.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content:
          'দুঃখিত, একটি ত্রুটি হয়েছে। বার্তা পাঠাতে পারিনি। অনুগ্রহ করে আবার চেষ্টা করুন।',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderSuggestedQuestions = (messageContent: string) => {
    const questionRegex =
      /(?:প্রশ্ন:|আপনি জিজ্ঞাসা করতে পারেন:|আরও জানতে চাইলে:|Try asking:)(?:\s*-?\s*([^?]+\?))+/gi; // Added "Try asking:" and case-insensitive
    const matches = [...messageContent.matchAll(questionRegex)];
    if (!matches.length) return null;

    const questions: string[] = [];
    matches.forEach((matchGroup) => {
      // Assuming each match group can have multiple questions if structured with newlines/dashes
      // For simplicity, let's split by known delimiters after the intro phrase
      const fullMatchText = matchGroup[0];
      const questionsText = fullMatchText
        .replace(
          /(?:প্রশ্ন:|আপনি জিজ্ঞাসা করতে পারেন:|আরও জানতে চাইলে:|Try asking:)/i,
          ''
        )
        .trim();

      // Split by newline or typical list markers like '-' or '*'
      questionsText.split(/\n\s*[-*]?\s*|\s*-\s*|\s*\*\s*/).forEach((q) => {
        const trimmed = q.trim();
        if (trimmed && trimmed.endsWith('?')) {
          questions.push(trimmed);
        }
      });
    });

    if (questions.length === 0) return null;

    return (
      <div className="mt-3 space-y-2">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          প্রস্তাবিত প্রশ্ন:
        </p>
        <div className="flex flex-wrap gap-2">
          {questions.map((question, index) => (
            <button
              key={index}
              className={`px-3 py-1 text-sm ${currentSubjectColors.bg50} ${currentSubjectColors.text700} rounded-full ${currentSubjectColors.hoverBg100} transition-colors`}
              onClick={() => {
                setInputValue(question);
                // Optionally, focus the input field here
              }}
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const getTopicsForActiveSubject = () =>
    allTopics.filter((topic) => topic.subjectId === activeSubject);

  const filteredConcepts = selectedTopic
    ? aiConcepts.filter((concept) => concept.topicId === selectedTopic) // Assuming only AI has concepts for now
    : []; // Or show all concepts for the subject if available

  const filteredResources = searchQuery
    ? allResources.filter(
        (resource) =>
          resource.subjectId === activeSubject &&
          (resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()))
      )
    : allResources.filter((resource) => resource.subjectId === activeSubject);

  const getSubjectIcon = (subjectId: string) => {
    const subject = subjects.find((s) => s.id === subjectId);
    return subject ? subject.icon : <Brain className="h-6 w-6" />; // Default icon
  };

  // Render Overview Tab
  const renderOverviewTab = () => {
    const activeSubjectObj = subjects.find((s) => s.id === activeSubject);
    const subjectTopics = getTopicsForActiveSubject();
    const subjectResources = allResources
      .filter((r) => r.subjectId === activeSubject)
      .slice(0, 3);
    const colors = getColorClasses(activeSubjectObj?.color);

    return (
      <div className="space-y-8">
        <div
          className={`bg-gradient-to-r ${colors.bgGradientFrom} ${colors.bgGradientTo} ${colors.textWhite} rounded-lg p-6`}
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3">
              <h1 className="text-2xl md:text-3xl font-bold mb-4">
                {activeSubjectObj?.title || 'শিক্ষা পাথ'}
              </h1>
              <p className="text-lg mb-6">
                {activeSubjectObj?.description || 'বিভিন্ন বিষয়ে শিখুন'}
              </p>
              <button
                onClick={() => handleTabChange('qa')}
                className={`bg-white ${colors.text700} px-6 py-3 rounded-lg font-semibold ${colors.hoverBg100} transition-colors inline-flex items-center`}
              >
                প্রশ্নোত্তর শুরু করুন <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
            <div className="md:w-1/3 flex justify-center mt-6 md:mt-0">
              <div className="bg-white/20 p-8 rounded-full">
                {getSubjectIcon(activeSubject)}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            আপনার অগ্রগতি
          </h2>
          {subjectTopics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {subjectTopics.slice(0, 4).map((topic) => (
                <div
                  key={topic.id}
                  className="bg-white rounded-lg shadow-sm p-4"
                >
                  <div className="flex items-center mb-2">
                    <div className={`${colors.bg100} p-2 rounded-full mr-3`}>
                      {topic.icon}
                    </div>
                    <h3 className="font-medium">{topic.title}</h3>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>অগ্রগতি</span>
                      <span>{topic.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${colors.bg600} h-2 rounded-full`}
                        style={{ width: `${topic.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedTopic(topic.id);
                      handleTabChange('concepts');
                    }}
                    className={`mt-3 ${colors.text600} text-sm font-medium flex items-center`}
                  >
                    বিস্তারিত দেখুন <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              এই বিষয়ের জন্য এখনও কোনো টপিক যোগ করা হয়নি।
            </p>
          )}
        </div>

        {/* ... (rest of the renderOverviewTab, applying 'colors' object for dynamic classes) ... */}
        {/* Example for one more section in OverviewTab: */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            জনপ্রিয় টপিকসমূহ
          </h2>
          {subjectTopics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subjectTopics.slice(0, 3).map((topic) => (
                <div
                  key={topic.id}
                  className="bg-white rounded-lg shadow-sm p-6"
                >
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {topic.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{topic.description}</p>
                  <button
                    onClick={() => {
                      setSelectedTopic(topic.id);
                      handleTabChange('qa');
                    }}
                    className={`${colors.text600} font-medium flex items-center`}
                  >
                    আরও জানুন <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              এই বিষয়ের জন্য জনপ্রিয় টপিক শীঘ্রই আসছে!
            </p>
          )}
        </div>

        <div className={`${colors.bg50} rounded-lg p-6`}>
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            আপনার শিক্ষা যাত্রা শুরু করুন
          </h2>
          <p className="text-gray-700 mb-4">
            আমাদের বিভিন্ন শিক্ষা প্ল্যাটফর্ম ব্যবহার করে আপনার জ্ঞান বাড়ান।
            প্রশ্নোত্তর সেশন, স্ট্রাকচার্ড কোর্স, বা নিজের গতিতে শেখার পাথ বেছে
            নিন।
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleTabChange('qa')}
              className={`${colors.bg600} text-white px-4 py-2 rounded-md font-medium ${colors.hoverBg700} transition-colors`}
            >
              প্রশ্নোত্তর শুরু করুন
            </button>
            <button
              onClick={() => handleTabChange('topics')}
              className={`bg-white ${colors.text600} ${colors.border600} border px-4 py-2 rounded-md font-medium ${colors.hoverBg50} transition-colors`}
            >
              টপিক দেখুন
            </button>
          </div>
        </div>

        {subjectResources.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                জনপ্রিয় রিসোর্স
              </h2>
              <button
                onClick={() => handleTabChange('resources')}
                className={`${colors.text600} text-sm font-medium flex items-center`}
              >
                সব দেখুন <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="space-y-4">
              {subjectResources.map((resource) => (
                <div
                  key={resource.id}
                  className="border-b pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-start">
                    {/* Resource type icons - can be made dynamic too */}
                    <div
                      className={`p-2 rounded-full mr-3 ${
                        resource.type === 'article'
                          ? 'bg-blue-100 text-blue-600'
                          : resource.type === 'video'
                          ? 'bg-red-100 text-red-600'
                          : resource.type === 'tutorial'
                          ? 'bg-green-100 text-green-600'
                          : resource.type === 'interactive'
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-purple-100 text-purple-600'
                      }`}
                    >
                      {resource.type === 'article' ? (
                        <BookOpen className="h-5 w-5" />
                      ) : resource.type === 'video' ? (
                        <Layers className="h-5 w-5" />
                      ) : resource.type === 'tutorial' ? (
                        <Lightbulb className="h-5 w-5" />
                      ) : resource.type === 'interactive' ? (
                        <Brain className="h-5 w-5" />
                      ) : (
                        <Award className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {resource.description}
                      </p>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${colors.text600} text-sm font-medium inline-flex items-center mt-1`}
                      >
                        দেখুন <ArrowRight className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render Topics Tab
  const renderTopicsTab = () => {
    const subjectTopics = getTopicsForActiveSubject();
    const colors = getColorClasses(
      subjects.find((s) => s.id === activeSubject)?.color
    );

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">টপিকসমূহ</h2>
          {subjectTopics.length > 0 ? (
            <div className="space-y-4">
              {subjectTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="border-b pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-start">
                    <div
                      className={`${colors.bg100} p-2 rounded-full mr-4 mt-1`}
                    >
                      {topic.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {topic.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{topic.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex-1 mr-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>অগ্রগতি</span>
                            <span>{topic.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`${colors.bg600} h-2 rounded-full`}
                              style={{ width: `${topic.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedTopic(topic.id);
                            handleTabChange('concepts');
                          }}
                          className={`px-4 py-2 ${colors.bg600} text-white rounded-md text-sm ${colors.hoverBg700} transition-colors`}
                        >
                          শিখতে শুরু করুন
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 py-4">
              এই বিষয়ের জন্য এখনও কোনো টপিক যোগ করা হয়নি। শীঘ্রই আসছে!
            </p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            আপনার অর্জন (উদাহরণ)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`${colors.bg50} rounded-lg p-4 flex items-center`}>
              <div className={`${colors.bg100} p-3 rounded-full mr-4`}>
                <Layers className={`h-6 w-6 ${colors.text600}`} />
              </div>
              <div>
                <p className="text-sm text-gray-600">মোট টপিক</p>
                <p className="text-2xl font-bold text-gray-800">
                  {subjectTopics.length}
                </p>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">সম্পন্ন কনসেপ্ট</p>
                <p className="text-2xl font-bold text-gray-800">
                  {activeSubject === 'ai'
                    ? aiConcepts.filter((c) => c.completed).length
                    : 0}
                </p>
              </div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">শিক্ষার সময়</p>
                <p className="text-2xl font-bold text-gray-800">৪.৫ ঘন্টা</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Concepts Tab
  const renderConceptsTab = () => {
    const topic = allTopics.find((t) => t.id === selectedTopic);
    const colors = getColorClasses(
      subjects.find((s) => s.id === activeSubject)?.color
    );
    // Note: filteredConcepts currently only uses aiConcepts. This needs to be generalized if concepts exist for other subjects.
    const conceptsToShow =
      selectedTopic && topic?.subjectId === 'ai' ? filteredConcepts : []; // Example: only show AI concepts

    return (
      <div className="space-y-6">
        {topic && (
          <div className={`${colors.bg600} ${colors.textWhite} rounded-lg p-6`}>
            <div className="flex items-center mb-2">
              <div className="bg-white/20 p-2 rounded-full mr-3">
                {topic.icon}
              </div>
              <h2 className="text-xl font-bold">{topic.title}</h2>
            </div>
            <p className="mb-4">{topic.description}</p>
            <div className="flex items-center">
              <div className="flex-1 mr-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>অগ্রগতি</span>
                  <span>{topic.progress}%</span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-2">
                  <div
                    className="bg-white h-2 rounded-full"
                    style={{ width: `${topic.progress}%` }}
                  ></div>
                </div>
              </div>
              <button
                onClick={() => handleTabChange('qa')}
                className={`px-4 py-2 bg-white ${colors.text700} rounded-md text-sm ${colors.hoverBg100} transition-colors`}
              >
                প্রশ্ন জিজ্ঞাসা করুন
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">কনসেপ্টসমূহ</h2>
          {conceptsToShow.length > 0 ? (
            <div className="space-y-4">
              {conceptsToShow.map((concept) => (
                <div key={concept.id} className="border rounded-lg p-4">
                  <div className="flex items-start">
                    <div
                      className={`p-2 rounded-full mr-4 ${
                        concept.completed
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {concept.completed ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        <Brain className="h-6 w-6" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {concept.title}
                        </h3>
                        {concept.completed && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" /> সম্পন্ন
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-3">
                        {concept.description}
                      </p>
                      <button
                        onClick={() => {
                          setInputValue(
                            `${concept.title} সম্পর্কে আমাকে বিস্তারিত বলুন।`
                          );
                          handleTabChange('qa');
                        }}
                        className={`px-4 py-2 rounded-md text-sm ${
                          concept.completed
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : `${colors.bg600} text-white ${colors.hoverBg700}`
                        } transition-colors`}
                      >
                        {concept.completed ? 'পুনরায় দেখুন' : 'শিখুন'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>
                এই টপিকের জন্য কোন কনসেপ্ট পাওয়া যায়নি বা এই বিষয়ের জন্য
                কনসেপ্ট এখনও যোগ করা হয়নি।
              </p>
              <button
                onClick={() => handleTabChange('topics')}
                className={`mt-4 px-4 py-2 ${colors.bg600} text-white rounded-md text-sm ${colors.hoverBg700} transition-colors`}
              >
                অন্য টপিক দেখুন
              </button>
            </div>
          )}
        </div>
        {/* ... (Related resources section - ensure colors are applied) ... */}
      </div>
    );
  };

  // Render Resources Tab
  const renderResourcesTab = () => {
    const colors = getColorClasses(
      subjects.find((s) => s.id === activeSubject)?.color
    );
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
            <h2 className="text-xl font-bold text-gray-800">রিসোর্সসমূহ</h2>
            <div className="relative w-full md:w-auto">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="রিসোর্স খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
              />
            </div>
          </div>

          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredResources.map((resource) => (
                <div key={resource.id} className="border rounded-lg p-4">
                  {/* ... (resource item rendering, apply 'colors' for links/buttons) ... */}
                  <div className="flex items-start">
                    <div
                      className={`p-2 rounded-full mr-3 ${
                        resource.type === 'article'
                          ? 'bg-blue-100 text-blue-600'
                          : resource.type === 'video'
                          ? 'bg-red-100 text-red-600'
                          : resource.type === 'tutorial'
                          ? 'bg-green-100 text-green-600'
                          : resource.type === 'interactive'
                          ? 'bg-yellow-100 text-yellow-600'
                          : resource.type === 'quiz'
                          ? 'bg-orange-100 text-orange-600'
                          : 'bg-purple-100 text-purple-600'
                      }`}
                    >
                      {resource.type === 'article' ? (
                        <BookOpen className="h-5 w-5" />
                      ) : resource.type === 'video' ? (
                        <Layers className="h-5 w-5" />
                      ) : resource.type === 'tutorial' ? (
                        <Lightbulb className="h-5 w-5" />
                      ) : resource.type === 'interactive' ? (
                        <Brain className="h-5 w-5" />
                      ) : resource.type === 'quiz' ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <Award className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium text-gray-800">
                          {resource.title}
                        </h3>
                        <span
                          className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                            resource.type === 'article'
                              ? 'bg-blue-100 text-blue-800'
                              : resource.type === 'video'
                              ? 'bg-red-100 text-red-800'
                              : resource.type === 'tutorial'
                              ? 'bg-green-100 text-green-800'
                              : resource.type === 'interactive'
                              ? 'bg-yellow-100 text-yellow-800'
                              : resource.type === 'quiz'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {resource.type.charAt(0).toUpperCase() +
                            resource.type.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {resource.description}
                      </p>
                      <div className="mt-2 flex justify-between">
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${colors.text600} text-sm font-medium inline-flex items-center`}
                        >
                          দেখুন <ArrowRight className="h-3 w-3 ml-1" />
                        </a>
                        <button className="text-gray-500 hover:text-indigo-600">
                          <Bookmark className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>
                "{searchQuery}" এর জন্য কোনো রিসোর্স পাওয়া যায়নি অথবা এই
                বিষয়ের জন্য কোনো রিসোর্স এখনো যোগ করা হয়নি।
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render Q&A Tab
  const renderQATab = () => {
    const subjectTopics = getTopicsForActiveSubject();
    const colors = getColorClasses(
      subjects.find((s) => s.id === activeSubject)?.color
    );
    const activeSubjectObj = subjects.find((s) => s.id === activeSubject);

    return (
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Topics sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              বিষয়বস্তু নির্বাচন করুন
            </h2>
            {subjectTopics.length > 0 ? (
              <div className="space-y-2">
                {subjectTopics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => handleTopicSelect(topic.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedTopic === topic.id
                        ? `${colors.bg100} ${colors.text800}`
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`p-2 rounded-full ${
                          selectedTopic === topic.id
                            ? colors.bg200
                            : 'bg-gray-200'
                        }`}
                      >
                        {topic.icon}
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium">{topic.title}</h3>
                        <p className="text-xs text-gray-500 truncate">
                          {topic.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                এই বিষয়ের জন্য কোনো নির্দিষ্ট বিষয়বস্তু নেই। সাধারণ প্রশ্ন
                করতে পারেন।
              </p>
            )}
          </div>
          {/* ... (Learning tips section - apply 'colors' for bullet points) ... */}
        </div>

        {/* Chat area */}
        <div className="lg:w-3/4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-[calc(100vh-250px)] min-h-[500px]">
            {' '}
            {/* Adjusted height */}
            <div className={`${colors.bg600} ${colors.textWhite} p-4`}>
              <h1 className="text-xl font-bold flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" /> প্রশ্নোত্তর শিক্ষা
              </h1>
              <p className={`${colors.text100 || 'text-indigo-100'} text-sm`}>
                {selectedTopic
                  ? allTopics.find((t) => t.id === selectedTopic)?.title +
                    ' বিষয়ে'
                  : activeSubjectObj?.title + ' বিষয়ে'}{' '}
                প্রশ্ন জিজ্ঞাসা করুন এবং শিখুন
              </p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xl lg:max-w-2xl rounded-lg p-3 shadow ${
                      message.role === 'user'
                        ? `${colors.bg100} ${colors.text900}`
                        : 'bg-white text-gray-800'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    {message.role === 'assistant' &&
                      renderSuggestedQuestions(message.content)}
                    {message.role === 'assistant' &&
                      message.id !== 'welcome' && (
                        <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between items-center">
                          <div className="flex space-x-2">
                            <button className="text-gray-400 hover:text-green-500 transition-colors">
                              <ThumbsUp className="h-4 w-4" />
                            </button>
                            <button className="text-gray-400 hover:text-red-500 transition-colors">
                              <ThumbsDown className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-gray-400 hover:text-indigo-500 transition-colors">
                              <Bookmark className="h-4 w-4" />
                            </button>
                            <button className="text-gray-400 hover:text-indigo-500 transition-colors">
                              <Share2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-md rounded-lg p-3 bg-white shadow">
                    <LoadingSpinner size="small" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="border-t p-4 bg-white">
              <div className="flex items-end gap-2">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="আপনার প্রশ্ন লিখুন..."
                  className="flex-1 p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={Math.min(3, inputValue.split('\n').length)} // Dynamic rows
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className={`px-4 py-2 ${colors.bg600} text-white rounded-lg ${colors.hoverBg700} transition-colors disabled:opacity-50 disabled:cursor-not-allowed self-end`}
                >
                  পাঠান
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Enter চাপুন পাঠাতে। নতুন লাইনের জন্য Shift+Enter চাপুন।
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-8">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 hidden md:block">
            শিক্ষা পাথ
          </h1>
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md bg-gray-100 text-gray-700"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
          <div className="hidden md:flex flex-wrap gap-2 pb-2">
            {' '}
            {/* Changed to flex-wrap and gap */}
            {subjects.map((subject) => {
              const subjColors = getColorClasses(subject.color);
              return (
                <button
                  key={subject.id}
                  onClick={() => handleSubjectChange(subject.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap flex items-center transition-colors ${
                    activeSubject === subject.id
                      ? `${subjColors.bg100} ${subjColors.text800} ${subjColors.border300} border`
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="mr-2">{subject.icon}</div>
                  <span>{subject.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-2 bg-white rounded-lg shadow-md p-2 absolute z-20 left-4 right-4">
            <div className="grid grid-cols-2 gap-2">
              {subjects.map((subject) => {
                const subjColors = getColorClasses(subject.color);
                return (
                  <button
                    key={subject.id}
                    onClick={() => handleSubjectChange(subject.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors w-full ${
                      activeSubject === subject.id
                        ? `${subjColors.bg100} ${subjColors.text800} ${subjColors.border300} border`
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="mr-2">{subject.icon}</div>
                    <span>{subject.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="mb-6 border-b">
        <div className="flex flex-wrap -mb-px">
          {[
            { id: 'overview', label: 'ওভারভিউ', icon: Brain },
            { id: 'topics', label: 'টপিকসমূহ', icon: BookOpen },
            { id: 'concepts', label: 'কনসেপ্টসমূহ', icon: Lightbulb },
            { id: 'resources', label: 'রিসোর্সসমূহ', icon: Layers },
            { id: 'qa', label: 'প্রশ্নোত্তর', icon: MessageSquare },
          ].map((tabItem) => {
            const IconComponent = tabItem.icon;
            const isActive = activeTab === tabItem.id;
            const colors = getColorClasses(
              subjects.find((s) => s.id === activeSubject)?.color
            );
            return (
              <button
                key={tabItem.id}
                onClick={() => handleTabChange(tabItem.id)}
                className={`inline-flex items-center py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-center border-b-2 transition-colors ${
                  isActive
                    ? `${colors.text600} ${colors.border600}`
                    : 'text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300'
                }`}
              >
                <IconComponent
                  className={`mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 ${
                    isActive ? colors.text600 : 'text-gray-400'
                  }`}
                />
                {tabItem.label}
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === 'overview' && renderOverviewTab()}
      {activeTab === 'topics' && renderTopicsTab()}
      {activeTab === 'concepts' && renderConceptsTab()}
      {activeTab === 'resources' && renderResourcesTab()}
      {activeTab === 'qa' && renderQATab()}
    </div>
  );
};

export default UnifiedAILearningPath;
