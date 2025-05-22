import type { AudioCategory, AudioContent } from '../types/audioTypes';

// Audio Categories
export const audioCategories: AudioCategory[] = [
  {
    id: 'agriculture',
    name: 'কৃষি',
    icon: '🌾',
    description: 'কৃষি বিষয়ক শিক্ষামূলক অডিও কন্টেন্ট',
  },
  {
    id: 'health',
    name: 'স্বাস্থ্য',
    icon: '🏥',
    description: 'স্বাস্থ্য বিষয়ক শিক্ষামূলক অডিও কন্টেন্ট',
  },
  {
    id: 'education',
    name: 'শিক্ষা',
    icon: '📚',
    description: 'সাধারণ শিক্ষা বিষয়ক অডিও কন্টেন্ট',
  },
  {
    id: 'finance',
    name: 'অর্থ ব্যবস্থাপনা',
    icon: '💰',
    description: 'অর্থ ব্যবস্থাপনা বিষয়ক অডিও কন্টেন্ট',
  },
];

// Audio Contents - Adding this missing data
export const audioContents: Record<string, AudioContent[]> = {
  agriculture: [
    {
      id: 'agr-001',
      title: 'ধান চাষের আধুনিক পদ্ধতি',
      duration: 360, // 6 minutes
      points: 10,
      description: 'ধান চাষের আধুনিক পদ্ধতি সম্পর্কে বিস্তারিত আলোচনা',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
      id: 'agr-002',
      title: 'সবজি চাষের কৌশল',
      duration: 420, // 7 minutes
      points: 15,
      description: 'বাড়ির আঙিনায় সবজি চাষের সহজ কৌশল',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
  ],
  health: [
    {
      id: 'hlt-001',
      title: 'প্রাথমিক চিকিৎসা',
      duration: 300, // 5 minutes
      points: 10,
      description: 'জরুরি অবস্থায় প্রাথমিক চিকিৎসা প্রদানের পদ্ধতি',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    },
    {
      id: 'hlt-002',
      title: 'শিশুর টিকাদান',
      duration: 240, // 4 minutes
      points: 8,
      description: 'শিশুদের জন্য প্রয়োজনীয় টিকা সম্পর্কে জানুন',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    },
  ],
  education: [
    {
      id: 'edu-001',
      title: 'শিশুর প্রাথমিক শিক্ষা',
      duration: 480, // 8 minutes
      points: 20,
      description: 'শিশুদের প্রাথমিক শিক্ষা প্রদানের কৌশল',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    },
  ],
  finance: [
    {
      id: 'fin-001',
      title: 'সঞ্চয়ের গুরুত্ব',
      duration: 360, // 6 minutes
      points: 12,
      description: 'অর্থনৈতিক স্বাধীনতার জন্য সঞ্চয়ের গুরুত্ব',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    },
  ],
};

// IVR menu structure
export const ivrMenuStructure = {
  mainMenu: {
    prompt:
      'স্বাগতম। অডিও শিক্ষা সিস্টেমে আপনাকে স্বাগতম। অনুগ্রহ করে একটি বিষয় নির্বাচন করুন।',
    options: {
      '1': 'agriculture',
      '2': 'health',
      '3': 'education',
      '4': 'finance',
    },
  },
  subMenus: {
    agriculture: {
      prompt: 'কৃষি বিষয়ক অডিও শুনতে অপশন নির্বাচন করুন।',
      options: {
        '1': 'agr-001',
        '2': 'agr-002',
        '0': 'mainMenu',
      },
    },
    health: {
      prompt: 'স্বাস্থ্য বিষয়ক অডিও শুনতে অপশন নির্বাচন করুন।',
      options: {
        '1': 'hlt-001',
        '2': 'hlt-002',
        '0': 'mainMenu',
      },
    },
    education: {
      prompt: 'শিক্ষা বিষয়ক অডিও শুনতে অপশন নির্বাচন করুন।',
      options: {
        '1': 'edu-001',
        '0': 'mainMenu',
      },
    },
    finance: {
      prompt: 'অর্থ ব্যবস্থাপনা বিষয়ক অডিও শুনতে অপশন নির্বাচন করুন।',
      options: {
        '1': 'fin-001',
        '0': 'mainMenu',
      },
    },
  },
};
