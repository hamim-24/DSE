'use client';

import type React from 'react';
import { useState } from 'react';
import {
  Filter,
  Search,
  BookOpen,
  Video,
  Headphones,
  BookText,
  Heart,
  Users,
  Baby,
  GraduationCap,
  Briefcase,
  School,
  Award,
  Lightbulb,
  FileText,
  Smartphone,
  GamepadIcon,
  Atom, // For science/physics/chemistry
  FlaskConical, // For chemistry/science
  Dna, // For biology
  Telescope, // For astronomy
  Sprout, // For agriculture/environment
  Calculator, // For Math
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ContentDetailModal from '../components/modals/ContentDetailModal'; // Assuming this path

const ContentPage: React.FC = () => {
  const { selectedUserGroup, selectedContentType } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeAudience, setActiveAudience] = useState<string | null>(null);
  const [activeFormat, setActiveFormat] = useState<string | null>(null);
  const [selectedContent, setSelectedContent] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    {
      id: 'health',
      name: 'স্বাস্থ্য ও চিকিৎসা',
      icon: <Heart className="h-4 w-4 mr-1" />,
    },
    {
      id: 'hygiene',
      name: 'পরিচ্ছন্নতা',
      icon: <Users className="h-4 w-4 mr-1" />,
    },
    {
      id: 'myth',
      name: 'কুসংস্কার ভাঙা',
      icon: <Lightbulb className="h-4 w-4 mr-1" />,
    },
    {
      id: 'science',
      name: 'বিজ্ঞান শিক্ষা',
      icon: <Atom className="h-4 w-4 mr-1" />,
    },
    {
      id: 'physics',
      name: 'পদার্থবিজ্ঞান',
      icon: <Atom className="h-4 w-4 mr-1" />,
    },
    {
      id: 'chemistry',
      name: 'রসায়ন',
      icon: <FlaskConical className="h-4 w-4 mr-1" />,
    },
    {
      id: 'biology',
      name: 'জীববিজ্ঞান',
      icon: <Dna className="h-4 w-4 mr-1" />,
    },
    {
      id: 'astronomy',
      name: 'জ্যোতির্বিজ্ঞান',
      icon: <Telescope className="h-4 w-4 mr-1" />,
    },
    {
      id: 'environment',
      name: 'পরিবেশ',
      icon: <Sprout className="h-4 w-4 mr-1" />,
    },
    {
      id: 'agriculture',
      name: 'কৃষি',
      icon: <FileText className="h-4 w-4 mr-1" />,
    },
    {
      id: 'technology',
      name: 'প্রযুক্তি',
      icon: <Smartphone className="h-4 w-4 mr-1" />,
    },
    { id: 'math', name: 'গণিত', icon: <Calculator className="h-4 w-4 mr-1" /> },
    {
      id: 'career',
      name: 'ক্যারিয়ার ও দক্ষতা',
      icon: <Award className="h-4 w-4 mr-1" />,
    },
    {
      id: 'civic',
      name: 'নাগরিক শিক্ষা',
      icon: <Users className="h-4 w-4 mr-1" />,
    },
    {
      id: 'elderly',
      name: 'প্রবীণদের জন্য',
      icon: <Users className="h-4 w-4 mr-1" />,
    },
    {
      id: 'women',
      name: 'নারীদের জন্য',
      icon: <Heart className="h-4 w-4 mr-1" />,
    },
    {
      id: 'disability',
      name: 'প্রতিবন্ধী ব্যক্তিদের জন্য',
      icon: <Users className="h-4 w-4 mr-1" />,
    },
    {
      id: 'education',
      name: 'শিক্ষক ও শিক্ষার্থী',
      icon: <School className="h-4 w-4 mr-1" />,
    },
    {
      id: 'practical',
      name: 'জীবনঘনিষ্ঠ বিজ্ঞান',
      icon: <Lightbulb className="h-4 w-4 mr-1" />,
    },
  ];

  const audiences = [
    { id: 'all', name: 'সবার জন্য' },
    { id: 'child', name: 'শিশু', icon: <Baby className="h-4 w-4 mr-1" /> },
    {
      id: 'student',
      name: 'শিক্ষার্থী',
      icon: <GraduationCap className="h-4 w-4 mr-1" />,
    },
    { id: 'youth', name: 'যুবক/তরুণ' },
    { id: 'women', name: 'নারী' },
    {
      id: 'professional',
      name: 'পেশাজীবী',
      icon: <Briefcase className="h-4 w-4 mr-1" />,
    },
    { id: 'elderly', name: 'প্রবীণ' },
    {
      id: 'teacher',
      name: 'শিক্ষক',
      icon: <School className="h-4 w-4 mr-1" />,
    },
    { id: 'farmer', name: 'কৃষক' },
    { id: 'parent', name: 'অভিভাবক' },
    { id: 'disabled', name: 'প্রতিবন্ধী ব্যক্তি' },
  ];

  const contentFormats = [
    { id: 'video', name: 'ভিডিও', icon: <Video className="h-4 w-4 mr-1" /> },
    {
      id: 'audio',
      name: 'অডিও',
      icon: <Headphones className="h-4 w-4 mr-1" />,
    },
    {
      id: 'article',
      name: 'আর্টিকেল',
      icon: <BookText className="h-4 w-4 mr-1" />,
    },
    { id: 'animation', name: 'এনিমেশন' },
    { id: 'comic', name: 'কমিক' },
    { id: 'podcast', name: 'পডকাস্ট' },
    {
      id: 'quiz',
      name: 'কুইজ',
      icon: <GamepadIcon className="h-4 w-4 mr-1" />,
    },
    { id: 'game', name: 'গেম' },
    { id: 'story', name: 'গল্প' },
    {
      id: 'interactive',
      name: 'ইন্টারেক্টিভ',
      icon: <GamepadIcon className="h-4 w-4 mr-1" />,
    },
    { id: 'guide', name: 'গাইড', icon: <BookOpen className="h-4 w-4 mr-1" /> },
    {
      id: 'poster',
      name: 'পোস্টার',
      icon: <FileText className="h-4 w-4 mr-1" />,
    },
    { id: 'drama', name: 'নাটিকা', icon: <Users className="h-4 w-4 mr-1" /> },
    {
      id: 'factsheet',
      name: 'ফ্যাক্টশিট',
      icon: <FileText className="h-4 w-4 mr-1" />,
    },
    {
      id: 'experiment',
      name: 'পরীক্ষা',
      icon: <FlaskConical className="h-4 w-4 mr-1" />,
    },
  ];

  // Enriched content data
  const contentItems = [
    // Health & Hygiene (Items 1-6)
    {
      id: 1,
      title: 'সঠিক হাত ধোয়ার বিজ্ঞান',
      type: 'video',
      typeIcon: <Video className="h-4 w-4" />,
      typeColor: 'bg-red-500',
      category: 'health',
      thumbnail:
        'https://images.pexels.com/photos/7045384/pexels-photo-7045384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['child', 'parent'],
      format: ['video', 'comic'],
      description: 'রোগ প্রতিরোধে সঠিক হাত ধোয়ার পদ্ধতি',
      duration: '5 মিনিট',
      difficulty: 'সহজ',
      points: 10,
      learningObjectives: [
        'সঠিক হাত ধোয়ার ধাপগুলো শিখবে',
        'জীবাণু ছড়ানো রোধ করতে পারবে',
        'পরিষ্কার পরিচ্ছন্নতার গুরুত্ব বুঝবে',
      ],
      resources: [
        {
          title: 'WHO: কিভাবে হাত ধুবেন?',
          url: 'https://www.who.int/gpsc/5may/How_To_HandWash_Poster.pdf',
          type: 'poster',
          source: 'WHO',
        },
        {
          title: 'শিশুদের জন্য হাত ধোয়া নিয়ে অ্যানিমেশন',
          url: 'https://www.youtube.com/watch?v=eBelle2M42A',
          type: 'video',
          source: 'YouTube - UNICEF',
        },
      ],
      author: {
        name: 'ডাঃ সানজিদা হক',
        title: 'শিশু বিশেষজ্ঞ',
        avatar:
          'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 2,
      title: 'হাঁচি/কাশির শিষ্টাচার',
      type: 'audio',
      typeIcon: <Headphones className="h-4 w-4" />,
      typeColor: 'bg-blue-500',
      category: 'health',
      thumbnail:
        'https://images.pexels.com/photos/4031716/pexels-photo-4031716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['all'],
      format: ['audio', 'poster'],
      description: 'সংক্রমণ নিয়ন্ত্রণে হাঁচি-কাশির সঠিক শিষ্টাচার',
      duration: '3 মিনিট',
      difficulty: 'সহজ',
      points: 8,
      learningObjectives: [
        'হাঁচি-কাশির সময় করণীয় শিখবে',
        'সংক্রমণ ছড়ানো রোধে সচেতন হবে',
        'সামাজিক শিষ্টাচার জানবে',
      ],
      resources: [
        {
          title: 'CDC: হাঁচি-কাশির শিষ্টাচার',
          url: 'https://www.cdc.gov/hygiene/personal-hygiene/coughing-sneezing.html',
          type: 'article',
          source: 'CDC',
        },
        {
          title: 'হাঁচি-কাশি নিয়ে সচেতনতামূলক ভিডিও',
          url: 'https://www.youtube.com/watch?v=kJwzV2E8p6M',
          type: 'video',
          source: 'YouTube - WHO',
        },
      ],
      author: {
        name: 'জনস্বাস্থ্য বিশেষজ্ঞ দল',
        title: 'স্বাস্থ্য অধিদপ্তর',
        avatar:
          'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 3,
      title: 'মাসিক স্বাস্থ্যবিধি',
      type: 'video',
      typeIcon: <Video className="h-4 w-4" />,
      typeColor: 'bg-red-500',
      category: 'health',
      thumbnail:
        'https://images.pexels.com/photos/6942769/pexels-photo-6942769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['women'],
      format: ['audio', 'drama'],
      description: 'কুসংস্কার ভাঙাতে মাসিক স্বাস্থ্যবিধি সম্পর্কে সঠিক তথ্য',
      duration: '12 মিনিট',
      difficulty: 'মাঝারি',
      points: 15,
      learningObjectives: [
        'মাসিক স্বাস্থ্যবিধি সম্পর্কে সঠিক জ্ঞান লাভ করবে',
        'কুসংস্কার থেকে বেরিয়ে আসবে',
        'স্যানিটারি ন্যাপকিন ব্যবহারের সঠিক নিয়ম জানবে',
      ],
      resources: [
        {
          title: 'UNICEF: মাসিক স্বাস্থ্যবিধি',
          url: 'https://www.unicef.org/wash/menstrual-hygiene',
          type: 'article',
          source: 'UNICEF',
        },
        {
          title: 'মাসিক স্বাস্থ্য নিয়ে অ্যানিমেটেড শিক্ষামূলক ভিডিও',
          url: 'https://www.youtube.com/watch?v=uuiS2G0Qptc',
          type: 'video',
          source: 'YouTube - WaterAid',
        },
      ],
      author: {
        name: 'ডাঃ ফারজানা করিম',
        title: 'স্ত্রীরোগ বিশেষজ্ঞ',
        avatar:
          'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 4,
      title: 'হাই প্রেশার ও ডায়াবেটিস',
      type: 'article',
      typeIcon: <BookText className="h-4 w-4" />,
      typeColor: 'bg-emerald-500',
      category: 'health',
      thumbnail:
        'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['elderly'],
      format: ['audio', 'factsheet'],
      description: 'সচেতনতা ও প্রাথমিক উপসর্গ চেনার উপায়',
      duration: '8 মিনিট পড়া',
      difficulty: 'মাঝারি',
      points: 12,
      learningObjectives: [
        'উচ্চ রক্তচাপ ও ডায়াবেটিসের লক্ষণ জানবে',
        'নিয়ন্ত্রণে রাখার উপায় শিখবে',
        'খাদ্যাভ্যাস ও জীবনযাত্রা সম্পর্কে জানবে',
      ],
      resources: [
        {
          title: 'আমেরিকান হার্ট এসোসিয়েশন: উচ্চ রক্তচাপ',
          url: 'https://www.heart.org/en/health-topics/high-blood-pressure',
          type: 'website',
          source: 'AHA',
        },
        {
          title: 'ডায়াবেটিস কী? (বাংলা)',
          url: 'https://www.diabetes.org.bd/what-is-diabetes',
          type: 'article',
          source: 'বাংলাদেশ ডায়াবেটিক সমিতি',
        },
      ],
      author: {
        name: 'ডাঃ রহমান চৌধুরী',
        title: 'মেডিসিন বিশেষজ্ঞ',
        avatar:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 5,
      title: 'ঠান্ডা/জ্বর হলে কী করবেন',
      type: 'audio',
      typeIcon: <Headphones className="h-4 w-4" />,
      typeColor: 'bg-blue-500',
      category: 'health',
      thumbnail:
        'https://images.pexels.com/photos/3873179/pexels-photo-3873179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['all'],
      format: ['audio', 'video'],
      description: 'অ্যান্টিবায়োটিক অপব্যবহার রোধে সঠিক চিকিৎসা পদ্ধতি',
      duration: '10 মিনিট',
      difficulty: 'সহজ',
      points: 10,
      learningObjectives: [
        'সাধারণ ঠান্ডা-জ্বরের প্রাথমিক চিকিৎসা জানবে',
        'অ্যান্টিবায়োটিকের সঠিক ব্যবহার বুঝবে',
        'কখন ডাক্তারের কাছে যেতে হবে তা জানবে',
      ],
      resources: [
        {
          title: 'WHO: অ্যান্টিবায়োটিক প্রতিরোধ',
          url: 'https://www.who.int/news-room/fact-sheets/detail/antibiotic-resistance',
          type: 'article',
          source: 'WHO',
        },
        {
          title: 'সাধারণ সর্দি-কাশি (বাংলা)',
          url: 'https://www.maya.com.bd/content/web/wp/19043/',
          type: 'article',
          source: 'Maya Apa',
        },
      ],
      author: {
        name: 'ডাঃ আয়েশা সিদ্দিকা',
        title: 'ফ্যামিলি ফিজিশিয়ান',
        avatar:
          'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 6,
      title: 'ঘুমের গুরুত্ব',
      type: 'audio',
      typeIcon: <Headphones className="h-4 w-4" />,
      typeColor: 'bg-blue-500',
      category: 'health',
      thumbnail:
        'https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['student', 'youth'],
      format: ['podcast', 'comic'],
      description: 'মানসিক ও শারীরিক স্বাস্থ্যে ঘুমের ভূমিকা',
      duration: '15 মিনিট',
      difficulty: 'সহজ',
      points: 12,
      learningObjectives: [
        'পর্যাপ্ত ঘুমের প্রয়োজনীয়তা বুঝবে',
        'ঘুমের অভাবের কুফল জানবে',
        'ভালো ঘুমের জন্য টিপস পাবে',
      ],
      resources: [
        {
          title: 'National Sleep Foundation: ঘুমের স্বাস্থ্য',
          url: 'https://www.thensg.org/',
          type: 'website',
          source: 'NSF',
        },
        {
          title: 'কেন ঘুম গুরুত্বপূর্ণ? (TED Talk)',
          url: 'https://www.ted.com/talks/matt_walker_sleep_is_your_superpower',
          type: 'video',
          source: 'TED',
        },
      ],
      author: {
        name: 'মনোবিদ আফরিন সুলতানা',
        title: 'মানসিক স্বাস্থ্য বিশেষজ্ঞ',
        avatar:
          'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    // Hygiene & Sanitation (Items 7-9)
    {
      id: 7,
      title: 'টয়লেট ব্যবহার পরিস্কার রাখা',
      type: 'video',
      typeIcon: <Video className="h-4 w-4" />,
      typeColor: 'bg-red-500',
      category: 'hygiene',
      thumbnail:
        'https://images.pexels.com/photos/6195136/pexels-photo-6195136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['child'],
      format: ['animation', 'comic'],
      description: 'পরিবেশ ও স্বাস্থ্য সুরক্ষায় টয়লেট পরিস্কার রাখার গুরুত্ব',
      duration: '6 মিনিট',
      difficulty: 'সহজ',
      points: 10,
      learningObjectives: [
        'টয়লেট ব্যবহারের পর পরিষ্কার করার নিয়ম শিখবে',
        'ব্যক্তিগত পরিচ্ছন্নতা বজায় রাখতে শিখবে',
        'রোগজীবাণু থেকে রক্ষা পাওয়ার উপায় জানবে',
      ],
      resources: [
        {
          title: 'শিশুদের জন্য টয়লেট পরিচ্ছন্নতা গেম',
          url: 'https://pbskids.org/games/daniel-tigers-neighborhood/stop-go-potty/',
          type: 'game',
          source: 'PBS Kids',
        },
        {
          title: 'টয়লেট পরিচ্ছন্নতা নিয়ে অ্যানিমেশন',
          url: 'https://www.youtube.com/watch?v=example_toilet_clean_kids',
          type: 'video',
          source: 'YouTube - Educational',
        },
      ],
      author: {
        name: 'ফারজানা আহমেদ',
        title: 'শিশুতোষ লেখক',
        avatar:
          'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 8,
      title: 'খোলা জায়গায় পায়খানা সমস্যার বিজ্ঞান',
      type: 'audio',
      typeIcon: <Headphones className="h-4 w-4" />,
      typeColor: 'bg-blue-500',
      category: 'hygiene',
      thumbnail:
        'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['elderly', 'farmer'],
      format: ['audio'],
      description: 'পানি/মাটি দূষণ রোধে সচেতনতা',
      duration: '8 মিনিট',
      difficulty: 'সহজ',
      points: 10,
      learningObjectives: [
        'খোলা জায়গায় মলত্যাগের কুফল জানবে',
        'স্যানিটারি ল্যাট্রিন ব্যবহারের গুরুত্ব বুঝবে',
        'পানি ও মাটি দূষণ রোধে সচেতন হবে',
      ],
      resources: [
        {
          title: 'WaterAid: স্যানিটেশন ও হাইজিন',
          url: 'https://www.wateraid.org/bd/sanitation-and-hygiene',
          type: 'website',
          source: 'WaterAid Bangladesh',
        },
        {
          title: 'খোলা জায়গায় মলত্যাগের স্বাস্থ্য ঝুঁকি (WHO)',
          url: 'https://www.who.int/news-room/fact-sheets/detail/sanitation',
          type: 'article',
          source: 'WHO',
        },
      ],
      author: {
        name: 'কামরুল ইসলাম',
        title: 'জনস্বাস্থ্য প্রকৌশলী',
        avatar:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 9,
      title: 'ডাস্টবিন ব্যবস্থাপনা',
      type: 'video',
      typeIcon: <Video className="h-4 w-4" />,
      typeColor: 'bg-red-500',
      category: 'hygiene',
      thumbnail:
        'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['all'],
      format: ['video', 'story'],
      description: 'শহর/গ্রামে বর্জ্য নিয়ন্ত্রণের সহজ উপায়',
      duration: '7 মিনিট',
      difficulty: 'সহজ',
      points: 10,
      learningObjectives: [
        'সঠিকভাবে ডাস্টবিন ব্যবহারের নিয়ম জানবে',
        'বর্জ্য পৃথকীকরণের গুরুত্ব বুঝবে',
        'পরিবেশ পরিচ্ছন্ন রাখতে ভূমিকা রাখবে',
      ],
      resources: [
        {
          title: 'বর্জ্য ব্যবস্থাপনা নিয়ে শিক্ষামূলক ভিডিও',
          url: 'https://www.youtube.com/watch?v=VdkHIFx3JA4',
          type: 'video',
          source: 'YouTube - NatGeo',
        },
        {
          title: 'EPA: বর্জ্য কমানোর উপায়',
          url: 'https://www.epa.gov/recycle/reducing-waste-what-you-can-do',
          type: 'article',
          source: 'EPA',
        },
      ],
      author: {
        name: 'পরিবেশ কর্মী দল',
        title: 'এনজিও',
        avatar:
          'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    // Myth Busting (Items 10-13)
    {
      id: 10,
      title: 'কাক ডাকলে দুর্ঘটনা হয়?',
      type: 'audio',
      typeIcon: <Headphones className="h-4 w-4" />,
      typeColor: 'bg-blue-500',
      category: 'myth',
      thumbnail:
        'https://images.pexels.com/photos/2002704/pexels-photo-2002704.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['elderly'],
      format: ['audio', 'story'],
      description: 'বিজ্ঞান দিয়ে কুসংস্কারের ব্যাখ্যা',
      duration: '10 মিনিট',
      difficulty: 'সহজ',
      points: 8,
      learningObjectives: [
        'বিভিন্ন কুসংস্কারের পেছনের কারণ জানবে',
        'বৈজ্ঞানিক দৃষ্টিকোণ থেকে বিষয়গুলো বিশ্লেষণ করতে শিখবে',
        'যুক্তিবাদী হতে উৎসাহিত হবে',
      ],
      resources: [
        {
          title: 'সাধারণ কুসংস্কার ও বৈজ্ঞানিক ব্যাখ্যা (বাংলা ব্লগ)',
          url: 'https://bigganjatra.org/category/myth-busters/',
          type: 'blog',
          source: 'বিজ্ঞানযাত্রা',
        },
        {
          title: 'কুসংস্কার নিয়ে আলোচনা (ভিডিও)',
          url: 'https://www.youtube.com/watch?v=example_myth_discussion',
          type: 'video',
          source: 'YouTube - Educational Channel',
        },
      ],
      author: {
        name: 'বিজ্ঞান লেখক',
        title: 'বিজ্ঞান পত্রিকা',
        avatar:
          'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 11,
      title: 'জ্যোতিষ ও ভাগ্য',
      type: 'audio',
      typeIcon: <Headphones className="h-4 w-4" />,
      typeColor: 'bg-blue-500',
      category: 'myth',
      thumbnail:
        'https://images.pexels.com/photos/1809644/pexels-photo-1809644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['youth', 'student'],
      format: ['podcast', 'quiz'],
      description: 'সিদ্ধান্তে যুক্তি প্রয়োগ শেখানো',
      duration: '20 মিনিট',
      difficulty: 'মাঝারি',
      points: 10,
      learningObjectives: [
        'জ্যোতিষশাস্ত্রের বৈজ্ঞানিক ভিত্তিহীনতা বুঝবে',
        'ভাগ্য ও কর্মের সম্পর্ক নিয়ে ভাবতে শিখবে',
        'সমালোচনামূলক চিন্তাভাবনা করতে পারবে',
      ],
      resources: [
        {
          title: 'জ্যোতিষশাস্ত্র: বিজ্ঞান নাকি কুসংস্কার? (আর্টিকেল)',
          url: 'https://www.scientificamerican.com/article/is-astrology-real/',
          type: 'article',
          source: 'Scientific American',
        },
        {
          title: 'Why Astrology is Not a Science (Video)',
          url: 'https://www.youtube.com/watch?v=69zP70jm1I0',
          type: 'video',
          source: 'YouTube - SciShow',
        },
      ],
      author: {
        name: 'ড. তারিক হাসান',
        title: 'জ্যোতির্বিজ্ঞানী',
        avatar:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 12,
      title: 'ডিম/পেঁয়াজ/গরম খাবার ঠান্ডা দিলে শরীর খারাপ?',
      type: 'video',
      typeIcon: <Video className="h-4 w-4" />,
      typeColor: 'bg-red-500',
      category: 'myth',
      thumbnail:
        'https://images.pexels.com/photos/5677794/pexels-photo-5677794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['women'],
      format: ['video'],
      description: 'খাদ্যভিত্তিক ভুল ধারণা দূর করা',
      duration: '8 মিনিট',
      difficulty: 'সহজ',
      points: 8,
      learningObjectives: [
        'খাবার সম্পর্কিত প্রচলিত ভুল ধারণা ভাঙবে',
        'সঠিক পুষ্টি জ্ঞান লাভ করবে',
        'স্বাস্থ্যকর খাদ্যাভ্যাস গড়ে তুলতে পারবে',
      ],
      resources: [
        {
          title: 'খাদ্য ও পুষ্টি বিষয়ক তথ্য (WHO)',
          url: 'https://www.who.int/health-topics/nutrition',
          type: 'website',
          source: 'WHO',
        },
        {
          title: 'খাদ্যের পুষ্টিগুণ নিয়ে ভিডিও',
          url: 'https://www.youtube.com/watch?v=example_food_myth_video',
          type: 'video',
          source: 'YouTube - Nutrition Channel',
        },
      ],
      author: {
        name: 'পুষ্টিবিদ আয়েশা খাতুন',
        title: 'খাদ্য ও পুষ্টি বিশেষজ্ঞ',
        avatar:
          'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 13,
      title: 'ছেলেমেয়ের জন্ম নির্ধারণ কাকে নিয়ে?',
      type: 'video',
      typeIcon: <Video className="h-4 w-4" />,
      typeColor: 'bg-red-500',
      category: 'myth',
      thumbnail:
        'https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['women'],
      format: ['audio', 'animation'],
      description: 'বায়োলজি শেখানো',
      duration: '12 মিনিট',
      difficulty: 'মাঝারি',
      points: 12,
      learningObjectives: [
        'সন্তানের লিঙ্গ নির্ধারণের বৈজ্ঞানিক প্রক্রিয়া জানবে',
        'এ সংক্রান্ত সামাজিক কুসংস্কার দূর হবে',
        'নারীর প্রতি সম্মান বাড়বে',
      ],
      resources: [
        {
          title: 'লিঙ্গ নির্ধারণের বিজ্ঞান (হেলথলাইন)',
          url: 'https://www.healthline.com/health/baby/sex-determination',
          type: 'article',
          source: 'Healthline',
        },
        {
          title: 'ক্রোমোজোম ও লিঙ্গ নির্ধারণ (অ্যানিমেশন)',
          url: 'https://www.youtube.com/watch?v=kX0k2E8jY4U',
          type: 'video',
          source: 'YouTube - Amoeba Sisters',
        },
      ],
      author: {
        name: 'ডাঃ নুসরাত জাহান',
        title: 'জিনতত্ত্ববিদ',
        avatar:
          'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    // Basic Science (Items 14-17)
    {
      id: 14,
      title: 'পানির চক্র',
      type: 'video',
      typeIcon: <Video className="h-4 w-4" />,
      typeColor: 'bg-red-500',
      category: 'science',
      thumbnail:
        'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['child'],
      format: ['animation', 'story'],
      description: 'পরিবেশ বোঝাতে পানির চক্রের সহজ ব্যাখ্যা',
      duration: '6 মিনিট',
      difficulty: 'সহজ',
      points: 10,
      learningObjectives: [
        'পানির চক্রের বিভিন্ন ধাপ সম্পর্কে জানবে',
        'বৃষ্টি কিভাবে হয় তা বুঝবে',
        'পানির গুরুত্ব অনুধাবন করবে',
      ],
      resources: [
        {
          title: 'USGS: পানির চক্র (শিশুদের জন্য)',
          url: 'https://www.usgs.gov/special-topics/water-science-school/science/water-cycle-kids-ages-9-13',
          type: 'website',
          source: 'USGS',
        },
        {
          title: 'পানির চক্র নিয়ে অ্যানিমেশন (National Geographic Kids)',
          url: 'https://www.youtube.com/watch?v=z2c4g5u1PVU',
          type: 'video',
          source: 'YouTube - Nat Geo Kids',
        },
      ],
      author: {
        name: 'বিজ্ঞান শিক্ষক দল',
        title: 'প্রাথমিক শিক্ষা',
        avatar:
          'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 15,
      title: 'বায়ুর চাপ',
      type: 'video',
      typeIcon: <Video className="h-4 w-4" />,
      typeColor: 'bg-red-500',
      category: 'science',
      thumbnail:
        'https://images.pexels.com/photos/1118874/pexels-photo-1118874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['student'],
      format: ['video', 'experiment'],
      description: 'বিজ্ঞানের কল্পনা ভাঙতে বায়ুর চাপের ব্যাখ্যা',
      duration: '10 মিনিট',
      difficulty: 'মাঝারি',
      points: 12,
      learningObjectives: [
        'বায়ুর চাপের ধারণা পাবে',
        'বায়ুর চাপ কিভাবে কাজ করে তা পরীক্ষার মাধ্যমে দেখবে',
        'দৈনন্দিন জীবনে বায়ুর চাপের উদাহরণ বুঝবে',
      ],
      resources: [
        {
          title: 'বায়ুর চাপ নিয়ে পরীক্ষা (PhET)',
          url: 'https://phet.colorado.edu/sims/html/gas-properties/latest/gas-properties_bn.html',
          type: 'interactive',
          source: 'PhET Interactive Simulations',
        },
        {
          title: 'বায়ুর চাপ নিয়ে সহজ পরীক্ষা (ভিডিও)',
          url: 'https://www.youtube.com/watch?v=BWh8L4r3p3c',
          type: 'video',
          source: 'YouTube - Science Experiments',
        },
      ],
      author: {
        name: 'পদার্থবিজ্ঞানী',
        title: 'গবেষক',
        avatar:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 16,
      title: 'শব্দ, আলো ও তাপ',
      type: 'video',
      typeIcon: <Video className="h-4 w-4" />,
      typeColor: 'bg-red-500',
      category: 'science',
      thumbnail:
        'https://images.pexels.com/photos/714699/pexels-photo-714699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['student'],
      format: ['game', 'interactive'],
      description: 'প্রাকৃতিক বিষয় বোঝাতে শব্দ, আলো ও তাপের ব্যাখ্যা',
      duration: '15 মিনিট',
      difficulty: 'মাঝারি',
      points: 15,
      learningObjectives: [
        'শব্দ, আলো ও তাপের মৌলিক ধারণা পাবে',
        'এদের বৈশিষ্ট্য ও উৎস সম্পর্কে জানবে',
        'এদের মিথস্ক্রিয়া সম্পর্কে বুঝবে',
      ],
      resources: [
        {
          title: 'আলো ও রং নিয়ে ইন্টারেক্টিভ সিমুলেশন (PhET)',
          url: 'https://phet.colorado.edu/en/simulations/filter?subjects=light-and-radiation&type=html&sort=alpha&view=grid',
          type: 'interactive',
          source: 'PhET',
        },
        {
          title: 'শব্দ, আলো ও তাপ (খান একাডেমি)',
          url: 'https://bn.khanacademy.org/science/physics',
          type: 'course',
          source: 'Khan Academy (Bangla)',
        },
      ],
      author: {
        name: 'মোঃ ইকবাল হোসেন',
        title: 'বিজ্ঞান শিক্ষক',
        avatar:
          'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 17,
      title: 'আগুন কিভাবে কাজ করে',
      type: 'video',
      typeIcon: <Video className="h-4 w-4" />,
      typeColor: 'bg-red-500',
      category: 'science',
      thumbnail:
        'https://images.pexels.com/photos/266487/pexels-photo-266487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['all'],
      format: ['video'],
      description: 'নিরাপত্তা ও বিজ্ঞান শেখানো',
      duration: '8 মিনিট',
      difficulty: 'সহজ',
      points: 10,
      learningObjectives: [
        'আগুন জ্বলার জন্য প্রয়োজনীয় উপাদান জানবে',
        'আগুন নেভানোর পদ্ধতি বুঝবে',
        'অগ্নি নিরাপত্তা সম্পর্কে সচেতন হবে',
      ],
      resources: [
        {
          title: 'আগুন কিভাবে কাজ করে (অ্যানিমেশন)',
          url: 'https://www.youtube.com/watch?v=7SoGCP0r8Yc',
          type: 'video',
          source: 'YouTube - TED-Ed',
        },
        {
          title: 'অগ্নি নিরাপত্তা টিপস (Red Cross)',
          url: 'https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/fire.html',
          type: 'article',
          source: 'American Red Cross',
        },
      ],
      author: {
        name: 'ফায়ার সেফটি এক্সপার্ট',
        title: 'ফায়ার সার্ভিস',
        avatar:
          'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    // Agriculture & Environment (Items 18-21)
    {
      id: 18,
      title: 'কম খরচে জৈব সার তৈরি',
      type: 'video',
      typeIcon: <Video className="h-4 w-4" />,
      typeColor: 'bg-red-500',
      category: 'agriculture',
      thumbnail:
        'https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['farmer'],
      format: ['audio', 'video'],
      description: 'কৃষকের আয়ের উন্নয়নে জৈব সার তৈরির পদ্ধতি',
      duration: '12 মিনিট',
      difficulty: 'মাঝারি',
      points: 15,
      learningObjectives: [
        'বাড়িতে জৈব সার তৈরির পদ্ধতি শিখবে',
        'রাসায়নিক সারের বিকল্প জানবে',
        'মাটির উর্বরতা বৃদ্ধিতে সাহায্য করবে',
      ],
      resources: [
        {
          title: 'কম্পোস্ট সার তৈরির পদ্ধতি (EPA)',
          url: 'https://www.epa.gov/recycle/composting-home',
          type: 'guide',
          source: 'EPA',
        },
        {
          title: 'জৈব সার তৈরির ভিডিও (বাংলা)',
          url: 'https://www.youtube.com/watch?v=example_jaibo_shar_video',
          type: 'video',
          source: 'YouTube - Krishi Channel',
        },
      ],
      author: {
        name: 'কৃষিবিদ আনোয়ার হোসেন',
        title: 'জৈব কৃষি বিশেষজ্ঞ',
        avatar:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 19,
      title: 'জলবায়ু পরিবর্তন',
      type: 'article',
      typeIcon: <BookText className="h-4 w-4" />,
      typeColor: 'bg-emerald-500',
      category: 'environment', // Changed from agriculture to environment
      thumbnail:
        'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['all'],
      format: ['story', 'comic'],
      description: 'ক্ষতিকর প্রভাব বোঝানো',
      duration: '10 মিনিট পড়া',
      difficulty: 'সহজ',
      points: 12,
      learningObjectives: [
        'জলবায়ু পরিবর্তনের কারণ ও প্রভাব জানবে',
        'এর ফলে সৃষ্ট সমস্যাগুলো বুঝবে',
        'ব্যক্তিগত পর্যায়ে করণীয় সম্পর্কে ধারণা পাবে',
      ],
      resources: [
        {
          title: 'NASA: জলবায়ু পরিবর্তন',
          url: 'https://climate.nasa.gov/',
          type: 'website',
          source: 'NASA',
        },
        {
          title: 'জলবায়ু পরিবর্তন নিয়ে অ্যানিমেটেড ব্যাখ্যা',
          url: 'https://www.youtube.com/watch?v=G4H1N_yXBiA',
          type: 'video',
          source: 'YouTube - Kurzgesagt',
        },
      ],
      author: {
        name: 'ড. সেলিনা রহমান',
        title: 'পরিবেশ বিজ্ঞানী',
        avatar:
          'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 20,
      title: 'কীটনাশকের সঠিক ব্যবহার',
      type: 'audio',
      typeIcon: <Headphones className="h-4 w-4" />,
      typeColor: 'bg-blue-500',
      category: 'agriculture',
      thumbnail:
        'https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['farmer'],
      format: ['audio', 'quiz'],
      description: 'স্বাস্থ্য রক্ষায় কীটনাশকের সঠিক ব্যবহার',
      duration: '15 মিনিট',
      difficulty: 'মাঝারি',
      points: 12,
      learningObjectives: [
        'নিরাপদভাবে কীটনাশক ব্যবহারের নিয়ম জানবে',
        'কীটনাশকের ক্ষতিকর দিক সম্পর্কে সচেতন হবে',
        'সমন্বিত বালাই দমন ব্যবস্থাপনা সম্পর্কে জানবে',
      ],
      resources: [
        {
          title: 'কীটনাশক ব্যবহারে নিরাপত্তা (WHO)',
          url: 'https://www.who.int/tools/pesticide-evaluation-scheme/technical-guide/safety-precautions',
          type: 'guide',
          source: 'WHO',
        },
        {
          title: 'সমন্বিত বালাই দমন (IPM) - ভিডিও (FAO)',
          url: 'https://www.youtube.com/watch?v=example_ipm_fao',
          type: 'video',
          source: 'YouTube - FAO',
        },
      ],
      author: {
        name: 'কৃষি সম্প্রসারণ কর্মকর্তা',
        title: 'DAE',
        avatar:
          'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 21,
      title: 'বৃক্ষরোপণের উপকারিতা',
      type: 'video',
      typeIcon: <Video className="h-4 w-4" />,
      typeColor: 'bg-red-500',
      category: 'environment', // Changed from agriculture to environment
      thumbnail:
        'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['student', 'all'],
      format: ['video', 'story'],
      description: 'পরিবেশ রক্ষায় বৃক্ষরোপণের গুরুত্ব',
      duration: '7 মিনিট',
      difficulty: 'সহজ',
      points: 10,
      learningObjectives: [
        'গাছ লাগানোর পরিবেশগত উপকারিতা জানবে',
        'বিভিন্ন প্রকার গাছের নাম ও বৈশিষ্ট্য শিখবে',
        'বৃক্ষরোপণে উৎসাহিত হবে',
      ],
      resources: [
        {
          title: 'Arbor Day Foundation',
          url: 'https://www.arborday.org/',
          type: 'website',
          source: 'Arbor Day Foundation',
        },
        {
          title: 'গাছ কেন গুরুত্বপূর্ণ? (ভিডিও)',
          url: 'https://www.youtube.com/watch?v=3B0u6MA2kXk',
          type: 'video',
          source: 'YouTube - SciShow Kids',
        },
      ],
      author: {
        name: 'বন অধিদপ্তর কর্মকর্তা',
        title: 'বন বিভাগ',
        avatar:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    // Digital Literacy (Items 22-25)
    {
      id: 22,
      title: 'ভুয়া তথ্য চিনবেন কিভাবে',
      type: 'audio',
      typeIcon: <Headphones className="h-4 w-4" />,
      typeColor: 'bg-blue-500',
      category: 'technology',
      thumbnail:
        'https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['all'],
      format: ['audio', 'quiz'],
      description: 'গুজব মোকাবেলায় ভুয়া তথ্য চেনার উপায়',
      duration: '10 মিনিট',
      difficulty: 'মাঝারি',
      points: 12,
      learningObjectives: [
        'ভুয়া খবর ও আসল খবরের পার্থক্য করতে শিখবে',
        'তথ্যের উৎস যাচাই করতে পারবে',
        'অনলাইনে দায়িত্বশীল আচরণ করবে',
      ],
      resources: [
        {
          title:
            'ভুয়া খবর সনাক্ত করার টিপস (International Federation of Library Associations)',
          url: 'https://www.ifla.org/wp-content/uploads/2019/05/assets/hq/topics/info-literacy/documents/how-to-spot-fake-news-bn.pdf',
          type: 'guide',
          source: 'IFLA',
        },
        {
          title: 'মিডিয়া লিটারেসি গেম (News Literacy Project)',
          url: 'https://checkology.org/',
          type: 'interactive',
          source: 'Checkology',
        },
      ],
      author: {
        name: 'সাইবার নিরাপত্তা বিশ্লেষক',
        title: 'ICT Division',
        avatar:
          'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 23,
      title: 'ইন্টারনেট ব্যবহারের সুরক্ষা',
      type: 'audio',
      typeIcon: <Headphones className="h-4 w-4" />,
      typeColor: 'bg-blue-500',
      category: 'technology',
      thumbnail:
        'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['parent'],
      format: ['podcast'],
      description: 'শিশুদের নিরাপত্তায় ইন্টারনেট ব্যবহারের নিয়ম',
      duration: '25 মিনিট',
      difficulty: 'মাঝারি',
      points: 15,
      learningObjectives: [
        'শিশুদের জন্য অনলাইন ঝুঁকি সম্পর্কে জানবে',
        'নিরাপদ ইন্টারনেট ব্যবহারের কৌশল শিখবে',
        'সাইবার বুলিং প্রতিরোধে করণীয় বুঝবে',
      ],
      resources: [
        {
          title: 'শিশুদের অনলাইন নিরাপত্তা (Netsmartz)',
          url: 'https://www.missingkids.org/netsmartz/home',
          type: 'website',
          source: 'Netsmartz',
        },
        {
          title: 'অভিভাবকদের জন্য অনলাইন নিরাপত্তা গাইড (ConnectSafely)',
          url: 'https://www.connectsafely.org/parentguides/',
          type: 'guide',
          source: 'ConnectSafely',
        },
      ],
      author: {
        name: 'সোশ্যাল মিডিয়া এক্সপার্ট',
        title: 'প্রযুক্তিবিদ',
        avatar:
          'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 24,
      title: 'AI ও রোবটিক্স কী',
      type: 'video',
      typeIcon: <Video className="h-4 w-4" />,
      typeColor: 'bg-red-500',
      category: 'technology',
      thumbnail:
        'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['student'],
      format: ['video', 'article'], // "blog" mapped to "article"
      description: 'ভবিষ্যতের জ্ঞান',
      duration: '15 মিনিট',
      difficulty: 'উন্নত',
      points: 18,
      learningObjectives: [
        'কৃত্রিম বুদ্ধিমত্তা (AI) ও রোবটিক্সের মৌলিক ধারণা পাবে',
        'এদের প্রয়োগক্ষেত্র সম্পর্কে জানবে',
        'ভবিষ্যতে এদের প্রভাব নিয়ে ভাবতে শিখবে',
      ],
      resources: [
        {
          title: 'AI কী? (ভিডিও - Kurzgesagt)',
          url: 'https://www.youtube.com/watch?v=2ePf9wI8k_w',
          type: 'video',
          source: 'YouTube - Kurzgesagt',
        },
        {
          title: 'রোবটিক্স পরিচিতি (MIT)',
          url: 'https://ocw.mit.edu/courses/mechanical-engineering/2-12-introduction-to-robotics-fall-2005/',
          type: 'course',
          source: 'MIT OpenCourseWare',
        },
      ],
      author: {
        name: 'প্রকৌশলী রুবিনা ইসলাম',
        title: 'AI গবেষক',
        avatar:
          'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 25,
      title: 'সোশ্যাল মিডিয়ার বিজ্ঞান',
      type: 'video',
      typeIcon: <Video className="h-4 w-4" />,
      typeColor: 'bg-red-500',
      category: 'technology',
      thumbnail:
        'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['youth'],
      format: ['animation'],
      description: 'সময় ব্যবস্থাপনায় সোশ্যাল মিডিয়া ব্যবহারের নিয়ম',
      duration: '8 মিনিট',
      difficulty: 'সহজ',
      points: 10,
      learningObjectives: [
        'সোশ্যাল মিডিয়ার ইতিবাচক ও নেতিবাচক দিক জানবে',
        'সচেতনভাবে সোশ্যাল মিডিয়া ব্যবহার করতে শিখবে',
        'ডিজিটাল ওয়েলবিইং সম্পর্কে জানবে',
      ],
      resources: [
        {
          title: 'সোশ্যাল মিডিয়ার প্রভাব (Common Sense Media)',
          url: 'https://www.commonsensemedia.org/social-media',
          type: 'website',
          source: 'Common Sense Media',
        },
        {
          title: 'How social media shapes identity (TED Talk)',
          url: 'https://www.youtube.com/watch?v=3zW2u30t59g',
          type: 'video',
          source: 'TED',
        },
      ],
      author: {
        name: 'ডিজিটাল মার্কেটিং কনসালটেন্ট',
        title: 'ফ্রিল্যান্সার',
        avatar:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    // Career & Skills (Items 26-29)
    {
      id: 26,
      title: 'বিজ্ঞানভিত্তিক পেশাগুলো',
      type: 'video',
      typeIcon: <Video className="h-4 w-4" />,
      typeColor: 'bg-red-500',
      category: 'career',
      thumbnail:
        'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['student'],
      format: ['video', 'quiz'],
      description: 'পথনির্দেশ',
      duration: '12 মিনিট',
      difficulty: 'মাঝারি',
      points: 15,
      learningObjectives: [
        'বিজ্ঞান সম্পর্কিত বিভিন্ন পেশা সম্পর্কে জানবে',
        'কোন পেশার জন্য কি যোগ্যতা প্রয়োজন তা বুঝবে',
        'নিজের আগ্রহ অনুযায়ী পেশা নির্বাচনে সাহায্য পাবে',
      ],
      resources: [
        {
          title: 'বিজ্ঞান ও প্রযুক্তি ক্ষেত্রে ক্যারিয়ার (STEM Careers)',
          url: 'https://www.bls.gov/ooh/architecture-and-engineering/home.htm',
          type: 'website',
          source: 'Bureau of Labor Statistics',
        },
        {
          title: 'বিভিন্ন বিজ্ঞানীর সাক্ষাৎকার (ভিডিও)',
          url: 'https://www.youtube.com/playlist?list=PLt5p_2fX_697G0w-E_uO7Y4n6fG_w',
          type: 'playlist',
          source: 'YouTube - Science Careers',
        },
      ],
      author: {
        name: 'ক্যারিয়ার কাউন্সিলর',
        title: 'শিক্ষা পরামর্শক',
        avatar:
          'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 27,
      title: 'কমিউনিকেশন স্কিল',
      type: 'audio',
      typeIcon: <Headphones className="h-4 w-4" />,
      typeColor: 'bg-blue-500',
      category: 'career',
      thumbnail:
        'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['youth'],
      format: ['audio'],
      description: 'সাক্ষাৎকারে সহায়তা',
      duration: '18 মিনিট',
      difficulty: 'মাঝারি',
      points: 12,
      learningObjectives: [
        'কার্যকর যোগাযোগের কৌশল শিখবে',
        'সাক্ষাৎকারে আত্মবিশ্বাসের সাথে কথা বলতে পারবে',
        'দলগত কাজে উন্নতি করবে',
      ],
      resources: [
        {
          title: 'যোগাযোগ দক্ষতা বাড়ানোর উপায় (MindTools)',
          url: 'https://www.mindtools.com/CommSkll/CommunicationIntro.htm',
          type: 'article',
          source: 'MindTools',
        },
        {
          title: 'ভালো শ্রোতা হওয়ার উপায় (TED Talk)',
          url: 'https://www.youtube.com/watch?v=saXfavo1OQo',
          type: 'video',
          source: 'TED',
        },
      ],
      author: {
        name: 'এইচআর প্রফেশনাল',
        title: 'মানবসম্পদ কর্মকর্তা',
        avatar:
          'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 28,
      title: 'ফিনান্সিয়াল লিটারেসি',
      type: 'audio',
      typeIcon: <Headphones className="h-4 w-4" />,
      typeColor: 'bg-blue-500',
      category: 'career',
      thumbnail:
        'https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['women', 'youth'],
      format: ['podcast'],
      description: 'টাকা-পয়সার হ্যান্ডলিং',
      duration: '22 মিনিট',
      difficulty: 'মাঝারি',
      points: 15,
      learningObjectives: [
        'আর্থিক সাক্ষরতার গুরুত্ব বুঝবে',
        'বাজেট তৈরি ও সঞ্চয়ের উপায় শিখবে',
        'বিনিয়োগের প্রাথমিক ধারণা পাবে',
      ],
      resources: [
        {
          title: 'ব্যক্তিগত অর্থব্যবস্থাপনা কোর্স (Coursera)',
          url: 'https://www.coursera.org/courses?query=personal%20finance',
          type: 'course',
          source: 'Coursera',
        },
        {
          title: 'টাকা জমানোর সহজ উপায় (ভিডিও)',
          url: 'https://www.youtube.com/watch?v=example_money_saving_video',
          type: 'video',
          source: 'YouTube - Finance Channel',
        },
      ],
      author: {
        name: 'আর্থিক পরিকল্পনাবিদ',
        title: 'ফিনান্সিয়াল অ্যাডভাইজর',
        avatar:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 29,
      title: 'সহজ ব্যবসায়িক বিজ্ঞান',
      type: 'video',
      typeIcon: <Video className="h-4 w-4" />,
      typeColor: 'bg-red-500',
      category: 'career',
      thumbnail:
        'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['women', 'youth'],
      format: ['story', 'video'],
      description: 'উদ্যোক্তা তৈরি',
      duration: '15 মিনিট',
      difficulty: 'মাঝারি',
      points: 18,
      learningObjectives: [
        'ব্যবসা শুরু করার প্রাথমিক ধাপগুলো জানবে',
        'মার্কেটিং ও বিক্রয়ের মৌলিক ধারণা পাবে',
        'উদ্যোক্তা হওয়ার জন্য প্রয়োজনীয় গুণাবলী সম্পর্কে জানবে',
      ],
      resources: [
        {
          title:
            'ক্ষুদ্র ও মাঝারি উদ্যোক্তাদের জন্য রিসোর্স (SME Foundation BD)',
          url: 'http://www.smef.org.bd/',
          type: 'website',
          source: 'SME Foundation Bangladesh',
        },
        {
          title: 'কিভাবে ব্যবসা শুরু করবেন (ভিডিও গাইড)',
          url: 'https://www.youtube.com/watch?v=example_business_startup_guide',
          type: 'video',
          source: 'YouTube - Business Channel',
        },
      ],
      author: {
        name: 'সফল উদ্যোক্তা',
        title: 'ব্যবসায়ী',
        avatar:
          'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    // Civic & Rights (Items 30-33)
    {
      id: 30,
      title: 'মৌলিক অধিকার কী',
      type: 'audio',
      typeIcon: <Headphones className="h-4 w-4" />,
      typeColor: 'bg-blue-500',
      category: 'civic',
      thumbnail:
        'https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['all'],
      format: ['audio', 'story'],
      description: 'সচেতনতা বৃদ্ধি',
      duration: '15 মিনিট',
      difficulty: 'মাঝারি',
      points: 12,
      learningObjectives: [
        'নাগরিক হিসেবে নিজের মৌলিক অধিকার সম্পর্কে জানবে',
        'অধিকার লঙ্ঘিত হলে করণীয় সম্পর্কে ধারণা পাবে',
        'সংবিধানের গুরুত্ব বুঝবে',
      ],
      resources: [
        {
          title: 'মানবাধিকারের সর্বজনীন ঘোষণা (UN)',
          url: 'https://www.un.org/en/about-us/universal-declaration-of-human-rights',
          type: 'article',
          source: 'United Nations',
        },
        {
          title: 'বাংলাদেশের সংবিধান (বাংলা)',
          url: 'http://bdlaws.minlaw.gov.bd/act-367.html',
          type: 'document',
          source: 'Legislative and Parliamentary Affairs Division',
        },
      ],
      author: {
        name: 'আইনজীবী',
        title: 'মানবাধিকার কর্মী',
        avatar:
          'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 31,
      title: 'ভোট কেন দেওয়া জরুরি',
      type: 'video',
      typeIcon: <Video className="h-4 w-4" />,
      typeColor: 'bg-red-500',
      category: 'civic',
      thumbnail:
        'https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['youth'],
      format: ['video'],
      description: 'গণতন্ত্র বুঝতে',
      duration: '10 মিনিট',
      difficulty: 'সহজ',
      points: 10,
      learningObjectives: [
        'ভোটের অধিকারের গুরুত্ব বুঝবে',
        'গণতান্ত্রিক প্রক্রিয়ায় অংশগ্রহণে উৎসাহিত হবে',
        'সঠিক প্রতিনিধি নির্বাচনের প্রয়োজনীয়তা জানবে',
      ],
      resources: [
        {
          title: 'নির্বাচন কমিশন বাংলাদেশ',
          url: 'http://www.ecs.gov.bd/',
          type: 'website',
          source: 'EC Bangladesh',
        },
        {
          title: 'ভোটদানের গুরুত্ব নিয়ে অ্যানিমেশন',
          url: 'https://www.youtube.com/watch?v=example_voting_importance_video',
          type: 'video',
          source: 'YouTube - Civic Education',
        },
      ],
      author: {
        name: 'রাষ্ট্রবিজ্ঞানী',
        title: 'অধ্যাপক',
        avatar:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 32,
      title: 'ডিজিটাল নাগরিকত্ব',
      type: 'article',
      typeIcon: <BookText className="h-4 w-4" />,
      typeColor: 'bg-emerald-500',
      category: 'civic',
      thumbnail:
        'https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['student', 'youth'],
      format: ['quiz'],
      description: 'সচেতন ব্যবহারকারী',
      duration: '8 মিনিট পড়া',
      difficulty: 'মাঝারি',
      points: 12,
      learningObjectives: [
        'ডিজিটাল নাগরিকের দায়িত্ব ও কর্তব্য জানবে',
        'অনলাইনে নিরাপদ থাকার উপায় শিখবে',
        'সাইবার আইন সম্পর্কে প্রাথমিক ধারণা পাবে',
      ],
      resources: [
        {
          title: 'ডিজিটাল নাগরিকত্ব (Google)',
          url: 'https://beinternetawesome.withgoogle.com/en_us/',
          type: 'interactive',
          source: 'Google - Be Internet Awesome',
        },
        {
          title: 'ডিজিটাল নিরাপত্তা আইন, বাংলাদেশ (বাংলা)',
          url: 'http://bdlaws.minlaw.gov.bd/act-details-1268.html',
          type: 'document',
          source: 'Legislative and Parliamentary Affairs Division',
        },
      ],
      author: {
        name: 'তথ্যপ্রযুক্তিবিদ',
        title: 'সাইবার আইন বিশেষজ্ঞ',
        avatar:
          'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 33,
      title: 'দুর্যোগে করণীয়',
      type: 'video',
      typeIcon: <Video className="h-4 w-4" />,
      typeColor: 'bg-red-500',
      category: 'civic',
      thumbnail:
        'https://images.pexels.com/photos/1446076/pexels-photo-1446076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['all'],
      format: ['audio', 'animation'],
      description: 'জীবন রক্ষা',
      duration: '8 মিনিট',
      difficulty: 'সহজ',
      points: 10,
      learningObjectives: [
        'বিভিন্ন প্রাকৃতিক দুর্যোগে প্রাথমিক করণীয় জানবে',
        'দুর্যোগকালীন সময়ে নিজেকে ও পরিবারকে সুরক্ষিত রাখতে পারবে',
        'জরুরী অবস্থার জন্য প্রস্তুতি নিতে শিখবে',
      ],
      resources: [
        {
          title: 'দুর্যোগ প্রস্তুতি গাইড (Ready.gov)',
          url: 'https://www.ready.gov/',
          type: 'website',
          source: 'Ready.gov (USA)',
        },
        {
          title: 'বন্যা মোকাবেলায় করণীয় (ভিডিও - বাংলাদেশ)',
          url: 'https://www.youtube.com/watch?v=example_flood_preparedness_bd',
          type: 'video',
          source: 'YouTube - DDM',
        },
      ],
      author: {
        name: 'দুর্যোগ ব্যবস্থাপনা বিশেষজ্ঞ',
        title: 'DDM',
        avatar:
          'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    // For Elderly (Items 34-37)
    {
      id: 34,
      title: 'উচ্চরক্তচাপ ও ওষুধ',
      type: 'audio',
      typeIcon: <Headphones className="h-4 w-4" />,
      typeColor: 'bg-blue-500',
      category: 'elderly',
      thumbnail:
        'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['elderly'],
      format: ['audio'],
      description: '৫০+ পুরুষদের জন্য উচ্চরক্তচাপ নিয়ন্ত্রণের উপায়',
      duration: '12 মিনিট',
      difficulty: 'সহজ',
      points: 10,
      learningObjectives: [
        'উচ্চ রক্তচাপের ওষুধ সেবনের নিয়ম জানবে',
        'পার্শ্বপ্রতিক্রিয়া সম্পর্কে সচেতন হবে',
        'জীবনযাত্রায় পরিবর্তন আনার গুরুত্ব বুঝবে',
      ],
      resources: [
        {
          title: 'প্রবীণদের স্বাস্থ্য (NIH)',
          url: 'https://www.nia.nih.gov/health',
          type: 'website',
          source: 'National Institute on Aging (USA)',
        },
        {
          title: 'উচ্চ রক্তচাপ নিয়ন্ত্রণে খাবার (ভিডিও)',
          url: 'https://www.youtube.com/watch?v=example_bp_diet_video',
          type: 'video',
          source: 'YouTube - Health Channel',
        },
      ],
      author: {
        name: 'ডাঃ আব্দুল্লাহ আল মামুন',
        title: 'জেরিয়াট্রিশিয়ান',
        avatar:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 35,
      title: 'খাদ্যাভ্যাস পরিবর্তন',
      type: 'audio',
      typeIcon: <Headphones className="h-4 w-4" />,
      typeColor: 'bg-blue-500',
      category: 'elderly',
      thumbnail:
        'https://images.pexels.com/photos/5638732/pexels-photo-5638732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['elderly'],
      format: ['podcast'],
      description: 'প্রবীণ নারীদের জন্য স্বাস্থ্যকর খাদ্যাভ্যাস',
      duration: '18 মিনিট',
      difficulty: 'সহজ',
      points: 12,
      learningObjectives: [
        'বয়স বাড়ার সাথে সাথে পুষ্টির চাহিদা জানবে',
        'প্রবীণদের জন্য উপযুক্ত খাবার তালিকা পাবে',
        'স্বাস্থ্যকর রান্নার পদ্ধতি শিখবে',
      ],
      resources: [
        {
          title: 'প্রবীণদের জন্য পুষ্টি নির্দেশিকা (WHO)',
          url: 'https://www.who.int/ageing/nutrition/en/',
          type: 'article',
          source: 'WHO',
        },
        {
          title: 'স্বাস্থ্যকর বার্ধক্য (হেলথলাইন)',
          url: 'https://www.healthline.com/health/healthy-aging',
          type: 'website',
          source: 'Healthline',
        },
      ],
      author: {
        name: 'পুষ্টিবিদ ফাতেমা আক্তার',
        title: 'জেরিয়াট্রিক নিউট্রিশনিস্ট',
        avatar:
          'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 36,
      title: 'শরীরচর্চার উপকারিতা',
      type: 'video',
      typeIcon: <Video className="h-4 w-4" />,
      typeColor: 'bg-red-500',
      category: 'elderly',
      thumbnail:
        'https://images.pexels.com/photos/7991662/pexels-photo-7991662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['elderly'],
      format: ['video'],
      description: '৫০+ সবার জন্য শরীরচর্চার উপায়',
      duration: '10 মিনিট',
      difficulty: 'সহজ',
      points: 10,
      learningObjectives: [
        'প্রবীণ বয়সে শরীরচর্চার গুরুত্ব বুঝবে',
        'সহজ ও নিরাপদ ব্যায়ামের নিয়ম শিখবে',
        'শারীরিকভাবে সক্রিয় থাকতে উৎসাহিত হবে',
      ],
      resources: [
        {
          title: 'প্রবীণদের জন্য ব্যায়াম (Go4Life - NIH)',
          url: 'https://go4life.nia.nih.gov/how-to-exercise-safely/',
          type: 'guide',
          source: 'Go4Life NIH',
        },
        {
          title: 'চেয়ারে বসে ব্যায়াম (ভিডিও)',
          url: 'https://www.youtube.com/watch?v=8CE4bO T9a4s',
          type: 'video',
          source: 'YouTube - Senior Fitness',
        },
      ],
      author: {
        name: 'ফিজিওথেরাপিস্ট',
        title: 'পুনর্বাসন বিশেষজ্ঞ',
        avatar:
          'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 37,
      title: 'মানসিক একাকীত্ব',
      type: 'audio',
      typeIcon: <Headphones className="h-4 w-4" />,
      typeColor: 'bg-blue-500',
      category: 'elderly',
      thumbnail:
        'https://images.pexels.com/photos/7876708/pexels-photo-7876708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['elderly'],
      format: ['story'],
      description: 'প্রবীণদের মানসিক স্বাস্থ্য',
      duration: '15 মিনিট',
      difficulty: 'সহজ',
      points: 12,
      learningObjectives: [
        'প্রবীণ বয়সে একাকীত্বের কারণ ও প্রভাব জানবে',
        'মানসিক চাপ কমানোর উপায় শিখবে',
        'সামাজিক কার্যকলাপে অংশগ্রহণে উৎসাহিত হবে',
      ],
      resources: [
        {
          title: 'একাকীত্ব ও সামাজিক বিচ্ছিন্নতা (CDC)',
          url: 'https://www.cdc.gov/aging/publications/features/lonely-older-adults.html',
          type: 'article',
          source: 'CDC',
        },
        {
          title: 'প্রবীণদের মানসিক স্বাস্থ্য সহায়তা (AARP)',
          url: 'https://www.aarp.org/health/mental-health/',
          type: 'website',
          source: 'AARP',
        },
      ],
      author: {
        name: 'মনোবিজ্ঞানী ড. আনিকা তাবাসসুম',
        title: 'জেরিয়াট্রিক সাইকোলজিস্ট',
        avatar:
          'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    // For Women (Items 38-41)
    {
      id: 38,
      title: 'মাতৃত্বকালীন স্বাস্থ্য',
      type: 'video',
      typeIcon: <Video className="h-4 w-4" />,
      typeColor: 'bg-red-500',
      category: 'women',
      thumbnail:
        'https://images.pexels.com/photos/6942769/pexels-photo-6942769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['women'],
      format: ['audio', 'comic'],
      description: 'গর্ভবতী নারীদের স্বাস্থ্য সতর্কতা',
      duration: '15 মিনিট',
      difficulty: 'মাঝারি',
      points: 15,
      learningObjectives: [
        'গর্ভাবস্থায় পুষ্টি ও যত্নের নিয়ম জানবে',
        'বিপদচিহ্নগুলো চিনতে পারবে',
        'নিরাপদ প্রসব সম্পর্কে ধারণা পাবে',
      ],
      resources: [
        {
          title: 'গর্ভাবস্থায় যত্ন (WHO)',
          url: 'https://www.who.int/news-room/fact-sheets/detail/maternal-mortality',
          type: 'article',
          source: 'WHO',
        },
        {
          title: 'গর্ভবতী মায়েদের জন্য গাইড (Maya Apa)',
          url: 'https://www.maya.com.bd/content/web/wp/category/pregnancy/',
          type: 'blog',
          source: 'Maya Apa',
        },
      ],
      author: {
        name: 'ডাঃ সালমা বেগম',
        title: 'প্রসূতি ও স্ত্রীরোগ বিশেষজ্ঞ',
        avatar:
          'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 39,
      title: 'নবজাতকের যত্ন',
      type: 'video',
      typeIcon: <Video className="h-4 w-4" />,
      typeColor: 'bg-red-500',
      category: 'women',
      thumbnail:
        'https://images.pexels.com/photos/3662842/pexels-photo-3662842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['women'],
      format: ['animation'],
      description: 'মায়েদের জন্য নবজাতকের যত্নের নিয়ম',
      duration: '12 মিনিট',
      difficulty: 'সহজ',
      points: 12,
      learningObjectives: [
        'নবজাতকের প্রাথমিক পরিচর্যা শিখবে',
        'বুকের দুধ খাওয়ানোর গুরুত্ব জানবে',
        'শিশুর টিকা সম্পর্কে সচেতন হবে',
      ],
      resources: [
        {
          title: 'নবজাতকের যত্ন (UNICEF)',
          url: 'https://www.unicef.org/parenting/newborn-care',
          type: 'guide',
          source: 'UNICEF',
        },
        {
          title: 'শিশুর টিকা গাইড (সম্প্রসারিত টিকাদান কর্মসূচি, বাংলাদেশ)',
          url: 'http://www.epibd.gov.bd/',
          type: 'website',
          source: 'EPI Bangladesh',
        },
      ],
      author: {
        name: 'শিশু বিশেষজ্ঞ দল',
        title: 'হাসপাতাল',
        avatar:
          'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 40,
      title: 'গার্হস্থ্য বিজ্ঞান',
      type: 'video',
      typeIcon: <Video className="h-4 w-4" />,
      typeColor: 'bg-red-500',
      category: 'women',
      thumbnail:
        'https://images.pexels.com/photos/4262010/pexels-photo-4262010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['women'],
      format: ['video'],
      description: 'গৃহিণীদের জন্য বিজ্ঞানভিত্তিক গার্হস্থ্য টিপস',
      duration: '10 মিনিট',
      difficulty: 'সহজ',
      points: 10,
      learningObjectives: [
        'রান্না ও পুষ্টির বিজ্ঞানসম্মত টিপস পাবে',
        'গৃহস্থালি পরিচ্ছন্নতার সহজ উপায় জানবে',
        'সময় ও অর্থ সাশ্রয়ের কৌশল শিখবে',
      ],
      resources: [
        {
          title: 'গৃহস্থালি টিপস ও ট্রিকস (ভিডিও)',
          url: 'https://www.youtube.com/watch?v=example_home_science_tips',
          type: 'video',
          source: 'YouTube - Home Economics Channel',
        },
        {
          title: 'স্বাস্থ্যকর রান্না (Good Housekeeping)',
          url: 'https://www.goodhousekeeping.com/food-recipes/healthy/',
          type: 'article',
          source: 'Good Housekeeping',
        },
      ],
      author: {
        name: 'শারমিন আক্তার',
        title: 'গার্হস্থ্য অর্থনীতিবিদ',
        avatar:
          'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 41,
      title: 'নারী অধিকার',
      type: 'audio',
      typeIcon: <Headphones className="h-4 w-4" />,
      typeColor: 'bg-blue-500',
      category: 'women',
      thumbnail:
        'https://images.pexels.com/photos/6192355/pexels-photo-6192355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['women'],
      format: ['story', 'audio'],
      description: 'নারীদের অধিকার সম্পর্কে সচেতনতা',
      duration: '20 মিনিট',
      difficulty: 'মাঝারি',
      points: 15,
      learningObjectives: [
        'নারী অধিকার সম্পর্কিত আইনকানুন জানবে',
        'লিঙ্গবৈষম্য ও সহিংসতা প্রতিরোধে সচেতন হবে',
        'নারীর ক্ষমতায়নে ভূমিকা রাখতে পারবে',
      ],
      resources: [
        {
          title: 'UN Women',
          url: 'https://www.unwomen.org/en',
          type: 'website',
          source: 'UN Women',
        },
        {
          title: 'নারী অধিকার নিয়ে আলোচনা (পডকাস্ট)',
          url: 'https://example.com/podcast/womens_rights_bd',
          type: 'podcast',
          source: 'Local NGO Podcast',
        },
      ],
      author: {
        name: 'আইনজীবী ও নারী অধিকার কর্মী',
        title: 'সংগঠক',
        avatar:
          'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    // For Disabled (Items 42-44)
    {
      id: 42,
      title: 'স্ক্রিন রিডার ব্যবহার',
      type: 'audio',
      typeIcon: <Headphones className="h-4 w-4" />,
      typeColor: 'bg-blue-500',
      category: 'disability',
      thumbnail:
        'https://images.pexels.com/photos/4126724/pexels-photo-4126724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['disabled'],
      format: ['audio'],
      description: 'দৃষ্টিপ্রতিবন্ধীদের জন্য স্ক্রিন রিডার ব্যবহারের নিয়ম',
      duration: '15 মিনিট',
      difficulty: 'মাঝারি',
      points: 12,
      learningObjectives: [
        'স্ক্রিন রিডার সফটওয়্যারের প্রাথমিক ব্যবহার শিখবে',
        'ওয়েবসাইট ও ডকুমেন্ট অ্যাক্সেস করতে পারবে',
        'ডিজিটাল জগতে স্বাবলম্বী হবে',
      ],
      resources: [
        {
          title: 'NVDA স্ক্রিন রিডার (ফ্রি)',
          url: 'https://www.nvaccess.org/',
          type: 'software',
          source: 'NV Access',
        },
        {
          title: 'স্ক্রিন রিডার ব্যবহারের টিউটোরিয়াল (WebAIM)',
          url: 'https://webaim.org/techniques/screenreader/',
          type: 'guide',
          source: 'WebAIM',
        },
      ],
      author: {
        name: 'অভিজ্ঞ স্ক্রিন রিডার ব্যবহারকারী',
        title: 'প্রশিক্ষক',
        avatar:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 43,
      title: 'অঙ্গসঞ্চালন ব্যায়াম',
      type: 'video',
      typeIcon: <Video className="h-4 w-4" />,
      typeColor: 'bg-red-500',
      category: 'disability',
      thumbnail:
        'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['disabled'],
      format: ['video'],
      description: 'চলাচল প্রতিবন্ধীদের জন্য ব্যায়াম',
      duration: '12 মিনিট',
      difficulty: 'সহজ',
      points: 10,
      learningObjectives: [
        'শারীরিক প্রতিবন্ধীদের জন্য উপযুক্ত ব্যায়াম শিখবে',
        'শরীরের সচলতা বজায় রাখতে পারবে',
        'শারীরিক ও মানসিক স্বাস্থ্যের উন্নতি হবে',
      ],
      resources: [
        {
          title: 'প্রতিবন্ধী ব্যক্তিদের জন্য ব্যায়াম (WHO)',
          url: 'https://www.who.int/news-room/fact-sheets/detail/physical-activity',
          type: 'article',
          source: 'WHO (Physical Activity section)',
        },
        {
          title: 'হুইলচেয়ার ব্যবহারকারীদের জন্য ব্যায়াম (ভিডিও)',
          url: 'https://www.youtube.com/watch?v=example_wheelchair_exercise_video',
          type: 'video',
          source: 'YouTube - Adaptive Fitness',
        },
      ],
      author: {
        name: 'ফিজিওথেরাপিস্ট ও পুনর্বাসন কর্মী',
        title: 'বিশেষজ্ঞ',
        avatar:
          'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 44,
      title: 'আত্মবিশ্বাস গড়ার গল্প',
      type: 'article',
      typeIcon: <BookText className="h-4 w-4" />,
      typeColor: 'bg-emerald-500',
      category: 'disability',
      thumbnail:
        'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['disabled'],
      format: ['story', 'comic'],
      description: 'প্রতিবন্ধী ব্যক্তিদের আত্মবিশ্বাস বাড়ানোর গল্প',
      duration: '10 মিনিট পড়া',
      difficulty: 'সহজ',
      points: 10,
      learningObjectives: [
        'অনুপ্রেরণামূলক গল্প থেকে আত্মবিশ্বাস পাবে',
        'নিজের সক্ষমতা চিনতে পারবে',
        'ইতিবাচক মনোভাব গড়ে তুলবে',
      ],
      resources: [
        {
          title: 'প্রতিবন্ধী ব্যক্তিদের সাফল্যের গল্প (ব্লগ)',
          url: 'https://www.scope.org.uk/stories/',
          type: 'blog',
          source: 'Scope UK',
        },
        {
          title: 'আত্মবিশ্বাস বাড়ানোর উপায় (Psychology Today)',
          url: 'https://www.psychologytoday.com/us/basics/confidence',
          type: 'article',
          source: 'Psychology Today',
        },
      ],
      author: {
        name: 'অনুপ্রেরণাদায়ী লেখক',
        title: 'অ্যাক্টিভিস্ট',
        avatar:
          'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    // For Teachers & Students (Items 45-48)
    {
      id: 45,
      title: 'সৃজনশীল প্রশ্ন তৈরির কৌশল',
      type: 'video',
      typeIcon: <Video className="h-4 w-4" />,
      typeColor: 'bg-red-500',
      category: 'education',
      thumbnail:
        'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['teacher'],
      format: ['video'],
      description: 'শিক্ষকদের জন্য সৃজনশীল প্রশ্ন তৈরির কৌশল',
      duration: '18 মিনিট',
      difficulty: 'উন্নত',
      points: 18,
      learningObjectives: [
        'সৃজনশীল প্রশ্নের বিভিন্ন ধরণ জানবে',
        'ব্লুমস ট্যাক্সোনমি অনুযায়ী প্রশ্ন তৈরি করতে পারবে',
        'শিক্ষার্থীদের চিন্তাশক্তি বাড়াতে সাহায্য করবে',
      ],
      resources: [
        {
          title: 'ব্লুমস ট্যাক্সোনমি (Vanderbilt University)',
          url: 'https://cft.vanderbilt.edu/guides-sub-pages/blooms-taxonomy/',
          type: 'guide',
          source: 'Vanderbilt University',
        },
        {
          title: 'প্রশ্ন তৈরির কৌশল (ভিডিও - Edutopia)',
          url: 'https://www.youtube.com/watch?v=example_questioning_techniques_video',
          type: 'video',
          source: 'YouTube - Edutopia',
        },
      ],
      author: {
        name: 'শিক্ষা বিশেষজ্ঞ',
        title: 'প্রশিক্ষক',
        avatar:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 46,
      title: 'পাঠদানের নতুন পদ্ধতি',
      type: 'article',
      typeIcon: <BookText className="h-4 w-4" />,
      typeColor: 'bg-emerald-500',
      category: 'education',
      thumbnail:
        'https://images.pexels.com/photos/8473244/pexels-photo-8473244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['teacher'],
      format: ['article'], // "blog" mapped to "article"
      description: 'শিক্ষকদের জন্য আধুনিক পাঠদান পদ্ধতি',
      duration: '15 মিনিট পড়া',
      difficulty: 'মাঝারি',
      points: 15,
      learningObjectives: [
        'শিক্ষার্থীকেন্দ্রিক পাঠদান পদ্ধতি জানবে',
        'প্রযুক্তি ব্যবহার করে পাঠদান আকর্ষণীয় করতে পারবে',
        'বিভিন্ন শিক্ষণ উপকরণ ব্যবহার শিখবে',
      ],
      resources: [
        {
          title: 'আধুনিক শিক্ষণ পদ্ধতি (TeachThought)',
          url: 'https://www.teachthought.com/pedagogy/20-innovative-teaching-strategies/',
          type: 'article',
          source: 'TeachThought',
        },
        {
          title: 'শিক্ষায় প্রযুক্তি (UNESCO)',
          url: 'https://en.unesco.org/themes/ict-education',
          type: 'website',
          source: 'UNESCO',
        },
      ],
      author: {
        name: 'শিক্ষাবিদ',
        title: 'গবেষক',
        avatar:
          'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 47,
      title: 'ভার্চুয়াল ক্লাস পরিচালনা',
      type: 'video',
      typeIcon: <Video className="h-4 w-4" />,
      typeColor: 'bg-red-500',
      category: 'education',
      thumbnail:
        'https://images.pexels.com/photos/5952651/pexels-photo-5952651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['teacher'],
      format: ['video'],
      description: 'শিক্ষকদের জন্য ভার্চুয়াল ক্লাস পরিচালনার নিয়ম',
      duration: '20 মিনিট',
      difficulty: 'মাঝারি',
      points: 15,
      learningObjectives: [
        'কার্যকরভাবে অনলাইন ক্লাস নিতে পারবে',
        'শিক্ষার্থীদের সম্পৃক্ত রাখার কৌশল শিখবে',
        'অনলাইন টুলস ব্যবহার করতে পারবে',
      ],
      resources: [
        {
          title: 'অনলাইন শিক্ষাদানের জন্য টিপস (Google for Education)',
          url: 'https://edu.google.com/intl/en_ALL/teacher-center/products/classroom/',
          type: 'guide',
          source: 'Google for Education',
        },
        {
          title: 'Zoom/Meet ব্যবহারের টিউটোরিয়াল',
          url: 'https://www.youtube.com/watch?v=example_zoom_tutorial',
          type: 'video',
          source: 'YouTube',
        },
      ],
      author: {
        name: 'অনলাইন শিক্ষা সমন্বয়ক',
        title: 'ভার্চুয়াল স্কুল',
        avatar:
          'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 48,
      title: 'পরীক্ষার প্রস্তুতির কৌশল',
      type: 'audio',
      typeIcon: <Headphones className="h-4 w-4" />,
      typeColor: 'bg-blue-500',
      category: 'education',
      thumbnail:
        'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['student'],
      format: ['quiz', 'audio'],
      description: 'ছাত্রদের জন্য পরীক্ষার প্রস্তুতির কৌশল',
      duration: '15 মিনিট',
      difficulty: 'সহজ',
      points: 12,
      learningObjectives: [
        'কার্যকর পড়াশোনার রুটিন তৈরি করতে পারবে',
        'স্মৃতিশক্তি বাড়ানোর কৌশল শিখবে',
        'পরীক্ষার চাপ মোকাবেলা করতে পারবে',
      ],
      resources: [
        {
          title: 'স্টাডি স্কিলস (Khan Academy)',
          url: 'https://www.khanacademy.org/test-prep/college-careers-more/college-admissions/applying-to-college/a/our-top-10-study-tips',
          type: 'article',
          source: 'Khan Academy',
        },
        {
          title: 'পরীক্ষার প্রস্তুতি নিয়ে পডকাস্ট',
          url: 'https://example.com/podcast/exam_prep_podcast',
          type: 'podcast',
          source: 'Student Success Podcast',
        },
      ],
      author: {
        name: 'শিক্ষা মনোবিজ্ঞানী',
        title: 'কাউন্সেলর',
        avatar:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    // Practical Science (Items 49-52)
    {
      id: 49,
      title: 'রান্নার বিজ্ঞান',
      type: 'video',
      typeIcon: <Video className="h-4 w-4" />,
      typeColor: 'bg-red-500',
      category: 'practical',
      thumbnail:
        'https://images.pexels.com/photos/5677794/pexels-photo-5677794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['women'],
      format: ['comic', 'audio'],
      description: 'নারীদের জীবনধারায় রান্নার বিজ্ঞান',
      duration: '10 মিনিট',
      difficulty: 'সহজ',
      points: 10,
      learningObjectives: [
        'রান্নার বিভিন্ন প্রক্রিয়ার পেছনের বিজ্ঞান বুঝবে',
        'খাবারের পুষ্টিগুণ বজায় রাখার কৌশল শিখবে',
        'রান্নাকে আরও আনন্দদায়ক করে তুলবে',
      ],
      resources: [
        {
          title: 'রান্নার বিজ্ঞান (Exploratorium)',
          url: 'https://www.exploratorium.edu/cooking',
          type: 'website',
          source: 'Exploratorium',
        },
        {
          title: 'খাবার ও রান্না নিয়ে মজার বিজ্ঞান (ভিডিও)',
          url: 'https://www.youtube.com/playlist?list=PL05427971806A586E',
          type: 'playlist',
          source: 'YouTube - Food Science',
        },
      ],
      author: {
        name: 'খাদ্য বিজ্ঞানী',
        title: 'শেফ',
        avatar:
          'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 50,
      title: 'গৃহদাহ প্রতিরোধ',
      type: 'video',
      typeIcon: <Video className="h-4 w-4" />,
      typeColor: 'bg-red-500',
      category: 'practical',
      thumbnail:
        'https://images.pexels.com/photos/266487/pexels-photo-266487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['all'],
      format: ['animation'],
      description: 'নিরাপত্তা সচেতনতা',
      duration: '8 মিনিট',
      difficulty: 'সহজ',
      points: 10,
      learningObjectives: [
        'বাড়িতে আগুন লাগার সাধারণ কারণ জানবে',
        'অগ্নিনির্বাপক যন্ত্র ব্যবহারের নিয়ম শিখবে',
        'জরুরী অবস্থায় করণীয় সম্পর্কে সচেতন হবে',
      ],
      resources: [
        {
          title: 'গৃহস্থালি অগ্নি নিরাপত্তা (NFPA)',
          url: 'https://www.nfpa.org/Public-Education/Fire-causes-and-risks/Top-fire-causes/Home-fires',
          type: 'article',
          source: 'NFPA',
        },
        {
          title: 'অগ্নি নিরাপত্তা অ্যানিমেশন (শিশুদের জন্য)',
          url: 'https://www.youtube.com/watch?v=LzY2nS2zQwY',
          type: 'video',
          source: 'YouTube - Sparky',
        },
      ],
      author: {
        name: 'ফায়ার ফাইটার',
        title: 'নিরাপত্তা প্রশিক্ষক',
        avatar:
          'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 51,
      title: 'পানির সংরক্ষণ',
      type: 'video',
      typeIcon: <Video className="h-4 w-4" />,
      typeColor: 'bg-red-500',
      category: 'practical',
      thumbnail:
        'https://images.pexels.com/photos/1209658/pexels-photo-1209658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['all'],
      format: ['video'],
      description: 'পরিবেশ সুরক্ষায় পানি সংরক্ষণের উপায়',
      duration: '7 মিনিট',
      difficulty: 'সহজ',
      points: 10,
      learningObjectives: [
        'দৈনন্দিন জীবনে পানি সাশ্রয়ের উপায় শিখবে',
        'পানির অপচয় রোধে সচেতন হবে',
        'পরিবেশ সুরক্ষায় ভূমিকা রাখবে',
      ],
      resources: [
        {
          title: 'পানি সাশ্রয়ের টিপস (WaterSense EPA)',
          url: 'https://www.epa.gov/watersense/start-saving',
          type: 'guide',
          source: 'WaterSense EPA',
        },
        {
          title: 'পানি সংরক্ষণ নিয়ে ভিডিও',
          url: 'https://www.youtube.com/watch?v=VIxYv0YV24I',
          type: 'video',
          source: 'YouTube - Environmental Awareness',
        },
      ],
      author: {
        name: 'পানি সম্পদ বিশেষজ্ঞ',
        title: 'গবেষক',
        avatar:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 52,
      title: 'ছোটখাটো বৈদ্যুতিক সমস্যার সমাধান',
      type: 'video',
      typeIcon: <Video className="h-4 w-4" />,
      typeColor: 'bg-red-500',
      category: 'practical',
      thumbnail:
        'https://images.pexels.com/photos/6195105/pexels-photo-6195105.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['all'],
      format: ['guide', 'video'],
      description: 'জীবনদক্ষতা বাড়ানোর জন্য বৈদ্যুতিক সমস্যার সমাধান',
      duration: '12 মিনিট',
      difficulty: 'মাঝারি',
      points: 12,
      learningObjectives: [
        'সাধারণ বৈদ্যুতিক সমস্যা চিহ্নিত করতে পারবে',
        'নিরাপদভাবে ছোটখাটো মেরামত করতে শিখবে',
        'বৈদ্যুতিক নিরাপত্তা সম্পর্কে জানবে',
      ],
      resources: [
        {
          title: 'বাড়ির বৈদ্যুতিক নিরাপত্তা (ESFI)',
          url: 'https://www.esfi.org/home-safety/',
          type: 'website',
          source: 'Electrical Safety Foundation International',
        },
        {
          title: 'সাধারণ বৈদ্যুতিক মেরামত (DIY ভিডিও)',
          url: 'https://www.youtube.com/watch?v=example_electrical_repair_video',
          type: 'video',
          source: 'YouTube - DIY Channel',
        },
      ],
      author: {
        name: 'ইলেকট্রিশিয়ান',
        title: 'কারিগরি প্রশিক্ষক',
        avatar:
          'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    // Merged content from popup.txt (IDs 53-58)
    {
      id: 53, // Originally 1 from popup.txt
      title: 'ছোটদের জন্য সূর্য ও গ্রহ-নক্ষত্রের গল্প',
      type: 'video',
      typeIcon: <Video className="h-4 w-4" />,
      typeColor: 'bg-red-500',
      category: 'astronomy',
      thumbnail:
        'https://images.pexels.com/photos/5439/earth-space.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['child'],
      format: ['video', 'animation', 'game'],
      description:
        'এই ভিডিওতে শিশুদের জন্য সহজ ভাষায় সূর্য, গ্রহ এবং নক্ষত্রদের সম্পর্কে মজার তথ্য দেওয়া হয়েছে। আমাদের সৌরজগতের গ্রহগুলো, তাদের বৈশিষ্ট্য এবং মহাকাশের বিস্ময়কর বিষয়গুলো নিয়ে আলোচনা করা হয়েছে।',
      duration: '8 মিনিট',
      difficulty: 'সহজ',
      points: 5,
      learningObjectives: [
        'সৌরজগতের গ্রহগুলোর নাম ও ক্রম শিখবে',
        'সূর্য কেন উজ্জ্বল তা জানবে',
        'দিন-রাত এবং ঋতু পরিবর্তনের কারণ বুঝবে',
      ],
      resources: [
        {
          title: 'নাসার শিশুদের জন্য মহাকাশ বিষয়ক ওয়েবসাইট',
          url: 'https://spaceplace.nasa.gov/',
          type: 'website',
          source: 'NASA Space Place',
        },
        {
          title: 'সৌরজগত সম্পর্কে বাংলা অ্যানিমেশন',
          url: 'https://www.youtube.com/watch?v=example1',
          type: 'video',
          source: 'YouTube',
        },
        {
          title: 'গ্রহ-নক্ষত্র সম্পর্কে জানার ইন্টারেক্টিভ গেম',
          url: 'https://www.nasa.gov/kidsclub/index.html',
          type: 'interactive',
          source: 'NASA Kids Club',
        },
        {
          title: 'সৌরজগত নিয়ে মজার তথ্য (National Geographic Kids)',
          url: 'https://kids.nationalgeographic.com/space/solar-system',
          type: 'article',
          source: 'Nat Geo Kids',
        },
      ],
      author: {
        name: 'ড. শামীম আহমেদ',
        title: 'জ্যোতির্বিজ্ঞানী, ঢাকা বিশ্ববিদ্যালয়',
        avatar:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 54, // Originally 2 from popup.txt
      title: 'কীভাবে গাছ খাদ্য তৈরি করে: সালোকসংশ্লেষণ ব্যাখ্যা',
      type: 'article',
      typeIcon: <BookText className="h-4 w-4" />,
      typeColor: 'bg-emerald-500',
      category: 'biology',
      thumbnail:
        'https://images.pexels.com/photos/2249959/pexels-photo-2249959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['student'],
      format: ['article', 'video'],
      description:
        'এই আর্টিকেলে সালোকসংশ্লেষণ প্রক্রিয়া সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে। কীভাবে গাছ সূর্যের আলো, পানি এবং কার্বন-ডাই-অক্সাইড ব্যবহার করে খাদ্য তৈরি করে এবং অক্সিজেন নির্গত করে তা সহজভাবে ব্যাখ্যা করা হয়েছে।',
      duration: '6 মিনিট পড়া',
      difficulty: 'মাঝারি',
      points: 8,
      learningObjectives: [
        'সালোকসংশ্লেষণের মূল উপাদানগুলো চিহ্নিত করতে পারবে',
        'সালোকসংশ্লেষণের রাসায়নিক সমীকরণ বুঝতে পারবে',
        'পাতার বিভিন্ন অংশের কাজ জানতে পারবে',
        'সালোকসংশ্লেষণের গুরুত্ব ব্যাখ্যা করতে পারবে',
      ],
      resources: [
        {
          title: 'সালোকসংশ্লেষণ প্রক্রিয়ার ভিডিও ব্যাখ্যা',
          url: 'https://www.youtube.com/watch?v=uixA8ZXx0KU',
          type: 'video',
          source: 'YouTube - TED-Ed',
        },
        {
          title: 'সালোকসংশ্লেষণ সম্পর্কে বিস্তারিত আর্টিকেল (খান একাডেমি)',
          url: 'https://bn.khanacademy.org/science/biology/photosynthesis-in-plants',
          type: 'article',
          source: 'Khan Academy (Bangla)',
        },
        {
          title: 'ইন্টারেক্টিভ সালোকসংশ্লেষণ সিমুলেশন (PhET)',
          url: 'https://phet.colorado.edu/sims/html/photosynthesis/latest/photosynthesis_bn.html',
          type: 'interactive',
          source: 'PhET Interactive Simulations',
        },
      ],
      author: {
        name: 'ড. নাজনীন আকতার',
        title: 'উদ্ভিদবিজ্ঞানী, জাহাঙ্গীরনগর বিশ্ববিদ্যালয়',
        avatar:
          'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 55, // Originally 3 from popup.txt
      title: 'ধান চাষের আধুনিক পদ্ধতি: বিশেষজ্ঞ কৃষক আলোচনা',
      type: 'audio',
      typeIcon: <Headphones className="h-4 w-4" />,
      typeColor: 'bg-blue-500',
      category: 'agriculture',
      thumbnail:
        'https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['elderly', 'farmer'],
      format: ['audio', 'article', 'video'],
      description:
        'এই অডিও পডকাস্টে অভিজ্ঞ কৃষক ও কৃষি বিশেষজ্ঞরা ধান চাষের আধুনিক পদ্ধতি নিয়ে আলোচনা করেছেন। কম খরচে, কম পানি ব্যবহার করে কীভাবে বেশি ফলন পাওয়া যায় সেই বিষয়ে বিস্তারিত তথ্য দেওয়া হয়েছে।',
      duration: '15 মিনিট',
      difficulty: 'সহজ',
      points: 10,
      learningObjectives: [
        'ধান চাষের আধুনিক পদ্ধতিগুলো জানতে পারবেন',
        'কম পানিতে ধান চাষের কৌশল শিখতে পারবেন',
        'উন্নত বীজ নির্বাচন ও ব্যবহার সম্পর্কে জানতে পারবেন',
        'জৈব সার ব্যবহারের সুবিধা বুঝতে পারবেন',
      ],
      resources: [
        {
          title: 'ধান চাষের আধুনিক পদ্ধতি সম্পর্কে কৃষি অধিদপ্তরের তথ্য',
          url: 'http://www.dae.gov.bd/site/page/c9f24612-b197-4240-968c-ac26134e1461/-',
          type: 'article',
          source: 'কৃষি অধিদপ্তর',
        },
        {
          title: 'ধান চাষে জৈব সার ব্যবহার (ইউটিউব)',
          url: 'https://www.youtube.com/watch?v=example3',
          type: 'video',
          source: 'YouTube - Krishi Dibanishi',
        },
        {
          title: 'বাংলাদেশে ধান চাষের ক্যালেন্ডার (BRRI)',
          url: 'https://brri.portal.gov.bd/',
          type: 'website',
          source: 'বাংলাদেশ ধান গবেষণা ইনস্টিটিউট',
        },
        {
          title: 'ধান চাষে পানি সাশ্রয়ী প্রযুক্তি (IRRI)',
          url: 'https://www.irri.org/water-saving-technology',
          type: 'article',
          source: 'IRRI',
        },
      ],
      author: {
        name: 'আবদুল করিম',
        title: 'সিনিয়র কৃষি বিশেষজ্ঞ, কৃষি সম্প্রসারণ অধিদপ্তর',
        avatar:
          'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 56, // Originally 4 from popup.txt
      title: 'মাধ্যাকর্ষণ শক্তি কী এবং কীভাবে কাজ করে',
      type: 'article', // Changed from "book"
      typeIcon: <BookText className="h-4 w-4" />, // Changed icon
      typeColor: 'bg-emerald-500', // Changed color
      category: 'physics', // Mapped from "physics" to existing "science" or keep as "physics" if added to categories
      thumbnail:
        'https://images.pexels.com/photos/2923156/pexels-photo-2923156.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['student'],
      format: ['article', 'video', 'interactive'],
      description:
        'এই ই-বুকে (আর্টিকেল হিসেবে উপস্থাপিত) মাধ্যাকর্ষণ শক্তি সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে। নিউটনের মাধ্যাকর্ষণ সূত্র থেকে শুরু করে আইনস্টাইনের সাধারণ আপেক্ষিকতাবাদ পর্যন্ত মাধ্যাকর্ষণের ধারণাগুলো সহজভাবে ব্যাখ্যা করা হয়েছে।',
      duration: 'অনেকক্ষণ পড়া', // Adjusted from "48 পৃষ্ঠা"
      difficulty: 'উন্নত',
      points: 15,
      learningObjectives: [
        'নিউটনের মাধ্যাকর্ষণ সূত্র বুঝতে পারবেন',
        'মাধ্যাকর্ষণ ক্ষেত্র ও শক্তির ধারণা আয়ত্ত করতে পারবেন',
        'আইনস্টাইনের সাধারণ আপেক্ষিকতাবাদের সাথে মাধ্যাকর্ষণের সম্পর্ক বুঝতে পারবেন',
        'মহাকর্ষীয় তরঙ্গ সম্পর্কে ধারণা পাবেন',
      ],
      resources: [
        {
          title:
            'মাধ্যাকর্ষণ সম্পর্কে ভিডিও লেকচার সিরিজ (Crash Course Physics)',
          url: 'https://www.youtube.com/watch?v=mezkHBPLZ4A',
          type: 'video',
          source: 'YouTube - CrashCourse',
        },
        {
          title: 'মাধ্যাকর্ষণ শক্তি সম্পর্কে ইন্টারেক্টিভ সিমুলেশন (PhET)',
          url: 'https://phet.colorado.edu/en/simulations/gravity-and-orbits',
          type: 'interactive',
          source: 'PhET Interactive Simulations',
        },
        {
          title: 'মাধ্যাকর্ষণ সম্পর্কে বিস্তারিত আর্টিকেল (খান একাডেমি)',
          url: 'https://bn.khanacademy.org/science/physics/centripetal-force-and-gravitation',
          type: 'article',
          source: 'Khan Academy (Bangla)',
        },
        {
          title: 'আইনস্টাইনের আপেক্ষিকতা তত্ত্ব (Space.com)',
          url: 'https://www.space.com/17661-theory-general-relativity.html',
          type: 'article',
          source: 'Space.com',
        },
      ],
      author: {
        name: 'প্রফেসর সাজ্জাদ হোসেন',
        title: 'পদার্থবিজ্ঞান বিভাগ, ঢাকা বিশ্ববিদ্যালয়',
        avatar:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 57, // Originally 5 from popup.txt
      title: 'শিক্ষকদের জন্য: কীভাবে বিজ্ঞান পড়ানোর আনন্দদায়ক করবেন',
      type: 'video',
      typeIcon: <Video className="h-4 w-4" />,
      typeColor: 'bg-red-500',
      category: 'education',
      thumbnail:
        'https://images.pexels.com/photos/8473244/pexels-photo-8473244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['teacher'],
      format: ['video', 'article', 'interactive'],
      description:
        'এই ভিডিওতে শিক্ষকদের জন্য বিজ্ঞান শিক্ষাদানকে আকর্ষণীয় ও আনন্দদায়ক করার বিভিন্ন কৌশল দেখানো হয়েছে। সহজলভ্য উপকরণ দিয়ে কীভাবে ছোট ছোট এক্সপেরিমেন্ট করিয়ে শিক্ষার্থীদের বিজ্ঞানের প্রতি আগ্রহী করে তোলা যায় তা বিস্তারিতভাবে আলোচনা করা হয়েছে।',
      duration: '32 মিনিট',
      difficulty: 'মাঝারি',
      points: 12,
      learningObjectives: [
        'বিজ্ঞান শিক্ষাদানের আধুনিক পদ্ধতিগুলো জানতে পারবেন',
        'সহজলভ্য উপকরণ দিয়ে বিজ্ঞান এক্সপেরিমেন্ট করানোর কৌশল শিখবেন',
        'শিক্ষার্থীদের সক্রিয় অংশগ্রহণ নিশ্চিত করার উপায় জানবেন',
        'বিজ্ঞান শিক্ষায় ডিজিটাল টুলস ব্যবহারের পদ্ধতি শিখবেন',
      ],
      resources: [
        {
          title: 'বিজ্ঞান শিক্ষাদানের জন্য ফ্রি রিসোর্স (TeachEngineering)',
          url: 'https://www.teachengineering.org/',
          type: 'website',
          source: 'TeachEngineering',
        },
        {
          title: 'বাংলাদেশের পাঠ্যক্রম অনুযায়ী বিজ্ঞান শিক্ষাদান গাইড (NCTB)',
          url: 'http://www.nctb.gov.bd/site/view/curriculum',
          type: 'article',
          source: 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড',
        },
        {
          title: 'বিজ্ঞান শিক্ষাদানে ইন্টারেক্টিভ সিমুলেশন ব্যবহার (PhET)',
          url: 'https://phet.colorado.edu/bn/',
          type: 'interactive',
          source: 'PhET Interactive Simulations',
        },
        {
          title: 'Edutopia - শিক্ষাবিষয়ক রিসোর্স',
          url: 'https://www.edutopia.org/',
          type: 'website',
          source: 'Edutopia',
        },
      ],
      author: {
        name: 'ড. শাহনাজ পারভীন',
        title: 'সিনিয়র শিক্ষা বিশেষজ্ঞ, শিক্ষা মন্ত্রণালয়',
        avatar:
          'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
    {
      id: 58, // Originally 6 from popup.txt
      title: 'প্লাস্টিক দূষণ: সমস্যা ও সমাধান',
      type: 'article',
      typeIcon: <BookText className="h-4 w-4" />,
      typeColor: 'bg-emerald-500',
      category: 'environment', // Mapped from "environment"
      thumbnail:
        'https://images.pexels.com/photos/2409022/pexels-photo-2409022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      audience: ['professional', 'all'], // Added "all" for broader reach
      format: ['article', 'video'],
      description:
        'এই আর্টিকেলে প্লাস্টিক দূষণের কারণ, প্রভাব এবং সমাধানের উপায় নিয়ে বিস্তারিত আলোচনা করা হয়েছে। বিশেষ করে বাংলাদেশের প্রেক্ষাপটে প্লাস্টিক দূষণ কমানোর জন্য যে পদক্ষেপগুলো নেওয়া যেতে পারে সেগুলো তুলে ধরা হয়েছে।',
      duration: '12 মিনিট পড়া',
      difficulty: 'মাঝারি',
      points: 8,
      learningObjectives: [
        'প্লাস্টিক দূষণের প্রধান উৎসগুলো চিহ্নিত করতে পারবেন',
        'প্লাস্টিক দূষণের পরিবেশগত প্রভাব বুঝতে পারবেন',
        'প্লাস্টিক দূষণ কমানোর ব্যক্তিগত ও সামাজিক উপায়গুলো জানতে পারবেন',
        'বাংলাদেশে প্লাস্টিক দূষণ নিয়ন্ত্রণের আইনি দিকগুলো জানতে পারবেন',
      ],
      resources: [
        {
          title: 'প্লাস্টিক দূষণ: বিশ্বব্যাপী সংকট (National Geographic)',
          url: 'https://www.nationalgeographic.com/environment/article/plastic-pollution',
          type: 'article',
          source: 'National Geographic',
        },
        {
          title: 'প্লাস্টিক দূষণ কমানোর উপায় (ইউটিউব - জাতিসংঘ)',
          url: 'https://www.youtube.com/watch?v=0uTiAzsdoIs',
          type: 'video',
          source: 'YouTube - UN Environment',
        },
        {
          title: 'বাংলাদেশে প্লাস্টিক দূষণ নিয়ন্ত্রণের উদ্যোগ (DoE)',
          url: 'http://www.doe.gov.bd/site/page/00c9a435-8867-4492-8d69-f2972092928a/-',
          type: 'website',
          source: 'পরিবেশ অধিদপ্তর',
        },
        {
          title: 'প্লাস্টিক রিসাইক্লিং গেম',
          url: 'https://kids.nationalgeographic.com/games/action-and-adventure/recycle-roundup-new',
          type: 'game',
          source: 'Nat Geo Kids',
        },
      ],
      author: {
        name: 'ড. মাহমুদা খাতুন',
        title: 'পরিবেশ বিজ্ঞানী, জাহাঙ্গীরনগর বিশ্ববিদ্যালয়',
        avatar:
          'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    },
  ];

  // Filter content by search, category, audience, and format
  const filteredContent = contentItems.filter((item) => {
    const matchesSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description &&
        item.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      activeCategory === null || item.category === activeCategory;

    const matchesAudience =
      activeAudience === null ||
      activeAudience === 'all' ||
      (Array.isArray(item.audience)
        ? item.audience.includes(activeAudience)
        : item.audience === activeAudience);

    const matchesFormat =
      activeFormat === null ||
      (Array.isArray(item.format)
        ? item.format.includes(activeFormat)
        : item.format === activeFormat);

    // Also consider the global context filters
    const matchesUserGroup =
      selectedUserGroup === null ||
      selectedUserGroup === 'all' || // Added "all" check for user group
      (Array.isArray(item.audience)
        ? item.audience.includes(selectedUserGroup)
        : item.audience === selectedUserGroup);

    const matchesContentType =
      selectedContentType === null || item.type === selectedContentType;

    return (
      matchesSearch &&
      matchesCategory &&
      (matchesAudience || matchesUserGroup) &&
      (matchesFormat || matchesContentType)
    );
  });

  const handleContentClick = (content: any) => {
    setSelectedContent(content);
    setIsModalOpen(true);
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">বিজ্ঞান কন্টেন্ট</h1>
            <p className="text-gray-600">
              {selectedUserGroup &&
                `${
                  categories.find((c) => c.id === activeCategory)?.name || 'সকল'
                } বিষয়ে ${
                  audiences.find((aud) => aud.id === selectedUserGroup)?.name ||
                  (selectedUserGroup === 'all' ? 'সবার' : 'সবার')
                } জন্য বিজ্ঞান শিক্ষা`}
            </p>
          </div>
          <div className="mt-4 md:mt-0 relative w-full md:w-72">
            <input
              type="text"
              placeholder="কী খুঁজছেন?"
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>

        {/* Filter section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center text-lg font-semibold mb-4">
            <Filter className="h-5 w-5 mr-2 text-indigo-600" />
            <span>ফিল্টার</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Categories */}
            <div>
              <h3 className="font-medium mb-3">বিষয়</h3>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-2">
                <button
                  className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                    activeCategory === null
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  } transition-colors`}
                  onClick={() => setActiveCategory(null)}
                >
                  সব বিষয়
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center ${
                      activeCategory === category.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    } transition-colors`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.icon}
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Audience */}
            <div>
              <h3 className="font-medium mb-3">টার্গেট অডিয়েন্স</h3>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-2">
                <button
                  className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                    activeAudience === null
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  } transition-colors`}
                  onClick={() => setActiveAudience(null)}
                >
                  সব অডিয়েন্স
                </button>
                {audiences.map((audience) => (
                  <button
                    key={audience.id}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center ${
                      activeAudience === audience.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    } transition-colors`}
                    onClick={() => setActiveAudience(audience.id)}
                  >
                    {audience.icon && audience.icon}
                    {audience.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Format */}
            <div>
              <h3 className="font-medium mb-3">কন্টেন্ট ফরম্যাট</h3>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-2">
                <button
                  className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                    activeFormat === null
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  } transition-colors`}
                  onClick={() => setActiveFormat(null)}
                >
                  সব ফরম্যাট
                </button>
                {contentFormats.map((format) => (
                  <button
                    key={format.id}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center ${
                      activeFormat === format.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    } transition-colors`}
                    onClick={() => setActiveFormat(format.id)}
                  >
                    {format.icon && format.icon}
                    {format.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Reset filters button */}
          {(activeCategory !== null ||
            activeAudience !== null ||
            activeFormat !== null ||
            searchQuery !== '') && (
            <div className="mt-6 flex justify-end">
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                onClick={() => {
                  setActiveCategory(null);
                  setActiveAudience(null);
                  setActiveFormat(null);
                  setSearchQuery('');
                }}
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                সব ফিল্টার রিসেট করুন
              </button>
            </div>
          )}
        </div>

        {/* Content grid */}
        {filteredContent.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
                onClick={() => handleContentClick(item)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.thumbnail || '/placeholder.svg'}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className={`absolute top-3 right-3 p-1.5 rounded-full text-white ${
                      item.typeColor || 'bg-gray-500'
                    }`}
                  >
                    {item.typeIcon}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-md">
                      {categories.find((c) => c.id === item.category)?.name ||
                        item.category}
                    </span>
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-md">
                      {item.difficulty}
                    </span>
                    <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-md">
                      {item.duration}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  <button className="mt-2 text-indigo-600 hover:text-indigo-800 font-medium text-sm inline-flex items-center">
                    বিস্তারিত দেখুন
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <div className="bg-gray-100 inline-block p-5 rounded-full mb-4">
              <Filter className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">
              কোন কন্টেন্ট পাওয়া যায়নি
            </h3>
            <p className="text-gray-600 mb-6">
              আপনার অনুসন্ধান মানদণ্ড পরিবর্তন করে আবার চেষ্টা করুন।
            </p>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              onClick={() => {
                setActiveCategory(null);
                setActiveAudience(null);
                setActiveFormat(null);
                setSearchQuery('');
              }}
            >
              সব ফিল্টার রিসেট করুন
            </button>
          </div>
        )}
      </div>
      {/* Content Detail Modal */}
      <ContentDetailModal
        content={selectedContent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ContentPage;
