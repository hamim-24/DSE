export type ContentFormat = 'video' | 'audio' | 'blog' | 'comic' | 'animation' | 'quiz' | 'podcast' | 'interactive';
export type AudienceType = 'child' | 'student' | 'adult' | 'elderly' | 'women' | 'teacher' | 'all';

export interface LearningTopic {
  id: string;
  title: string;
  description: string;
  targetAudience: AudienceType[];
  contentFormats: ContentFormat[];
  category: string;
  thumbnail?: string;
  duration?: string;
  difficulty?: 'সহজ' | 'মাঝারি' | 'উন্নত';
  views?: string;
}

export interface ContentCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  topics: LearningTopic[];
}

export const learningContent: ContentCategory[] = [
  {
    id: 'health',
    title: 'স্বাস্থ্য ও চিকিৎসা সচেতনতা',
    icon: 'Heart',
    description: 'স্বাস্থ্য, হাইজিন এবং মেডিকেল সচেতনতা বিষয়ক শিক্ষণীয় বিষয়সমূহ',
    topics: [
      {
        id: 'hand-washing',
        title: 'সঠিক হাত ধোয়ার বিজ্ঞান',
        description: 'রোগ প্রতিরোধে হাত ধোয়ার সঠিক পদ্ধতি ও তার বৈজ্ঞানিক ব্যাখ্যা',
        targetAudience: ['child', 'adult'],
        contentFormats: ['video', 'comic'],
        category: 'health',
        thumbnail: 'https://images.pexels.com/photos/7487439/pexels-photo-7487439.jpeg',
        duration: '8 মিনিট',
        difficulty: 'সহজ',
        views: '2.5K'
      },
      {
        id: 'cough-etiquette',
        title: 'হাঁচি/কাশির শিষ্টাচার',
        description: 'সংক্রমণ নিয়ন্ত্রণে হাঁচি-কাশির সঠিক নিয়ম ও তার গুরুত্ব',
        targetAudience: ['all'],
        contentFormats: ['audio', 'video'],
        category: 'health',
        thumbnail: 'https://images.pexels.com/photos/4047186/pexels-photo-4047186.jpeg',
        duration: '5 মিনিট',
        difficulty: 'সহজ',
        views: '1.8K'
      },
      {
        id: 'menstrual-hygiene',
        title: 'মাসিক স্বাস্থ্যবিধি',
        description: 'কুসংস্কার দূর করে মাসিক স্বাস্থ্যবিধি সম্পর্কে সঠিক তথ্য',
        targetAudience: ['women'],
        contentFormats: ['audio', 'video'],
        category: 'health',
        thumbnail: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg',
        duration: '15 মিনিট',
        difficulty: 'মাঝারি',
        views: '3.2K'
      },
      {
        id: 'blood-pressure-diabetes',
        title: 'হাই প্রেশার ও ডায়াবেটিস',
        description: 'সচেতনতা ও প্রাথমিক উপসর্গ সম্পর্কে জানুন',
        targetAudience: ['adult', 'elderly'],
        contentFormats: ['audio', 'blog'],
        category: 'health',
        thumbnail: 'https://images.pexels.com/photos/4226119/pexels-photo-4226119.jpeg',
        duration: '20 মিনিট',
        difficulty: 'মাঝারি',
        views: '4.1K'
      },
      {
        id: 'cold-fever-treatment',
        title: 'ঠান্ডা/জ্বর হলে কী করবেন',
        description: 'অ্যান্টিবায়োটিক অপব্যবহার রোধে সঠিক চিকিৎসা পদ্ধতি',
        targetAudience: ['all'],
        contentFormats: ['audio', 'video'],
        category: 'health',
        thumbnail: 'https://images.pexels.com/photos/3873193/pexels-photo-3873193.jpeg',
        duration: '12 মিনিট',
        difficulty: 'সহজ',
        views: '5.3K'
      },
      {
        id: 'importance-of-sleep',
        title: 'ঘুমের গুরুত্ব',
        description: 'মানসিক ও শারীরিক স্বাস্থ্যে ঘুমের ভূমিকা',
        targetAudience: ['student', 'adult'],
        contentFormats: ['podcast', 'comic'],
        category: 'health',
        thumbnail: 'https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg',
        duration: '25 মিনিট',
        difficulty: 'সহজ',
        views: '2.9K'
      }
    ]
  },
  {
    id: 'agriculture',
    title: 'কৃষি ও পরিবেশ',
    icon: 'Sprout',
    description: 'কৃষি, জলবায়ু এবং পরিবেশ সংরক্ষণ বিষয়ক শিক্ষণীয় বিষয়সমূহ',
    topics: [
      {
        id: 'organic-fertilizer',
        title: 'কম খরচে জৈব সার তৈরি',
        description: 'বাড়িতে সহজে জৈব সার তৈরির পদ্ধতি',
        targetAudience: ['adult'],
        contentFormats: ['video', 'audio'],
        category: 'agriculture',
        thumbnail: 'https://images.pexels.com/photos/4505714/pexels-photo-4505714.jpeg',
        duration: '12 মিনিট',
        difficulty: 'মাঝারি',
        views: '3.2K'
      }
    ]
  }
];

export const contentCategories = [
  { id: 'health', name: 'স্বাস্থ্য ও চিকিৎসা' },
  { id: 'hygiene', name: 'পরিচ্ছন্নতা' },
  { id: 'myths', name: 'কুসংস্কার' },
  { id: 'basic-science', name: 'মৌলিক বিজ্ঞান' },
  { id: 'agriculture', name: 'কৃষি ও পরিবেশ' },
  { id: 'technology', name: 'প্রযুক্তি' },
  { id: 'career', name: 'ক্যারিয়ার' },
  { id: 'civic', name: 'নাগরিক শিক্ষা' },
  { id: 'elderly', name: 'প্রবীণদের জন্য' },
  { id: 'women', name: 'নারীদের জন্য' },
  { id: 'disability', name: 'প্রতিবন্ধী ব্যক্তিদের জন্য' },
  { id: 'education', name: 'শিক্ষক-শিক্ষার্থী' },
  { id: 'daily-science', name: 'দৈনন্দিন বিজ্ঞান' }
];