import type { Topic, Resource } from '../types/aiEducationTypes';

// Sample topics for AI Education
export const topics: Topic[] = [
  {
    id: 'physics',
    name: 'পদার্থবিজ্ঞান',
    icon: 'atom',
    description: 'পদার্থবিজ্ঞানের মৌলিক ধারণা এবং সূত্র সম্পর্কে জানুন',
    subtopics: [
      {
        id: 'mechanics',
        name: 'বলবিদ্যা',
        description: 'নিউটনের সূত্র, বল, ত্বরণ এবং গতি সম্পর্কে জানুন',
        sampleQuestions: [
          'নিউটনের তৃতীয় সূত্র কী?',
          'ত্বরণ কাকে বলে?',
          'বল কীভাবে পরিমাপ করা হয়?',
        ],
      },
      {
        id: 'thermodynamics',
        name: 'তাপগতিবিদ্যা',
        description: 'তাপ, তাপমাত্রা এবং তাপগতির সূত্র সম্পর্কে জানুন',
        sampleQuestions: [
          'তাপগতির প্রথম সূত্র কী?',
          'এন্ট্রপি কী?',
          'তাপমাত্রা কীভাবে পরিমাপ করা হয়?',
        ],
      },
    ],
  },
  {
    id: 'math',
    name: 'গণিত',
    icon: 'calculator',
    description: 'গণিতের বিভিন্ন শাখা এবং সমস্যা সমাধান কৌশল শিখুন',
    subtopics: [
      {
        id: 'algebra',
        name: 'বীজগণিত',
        description: 'সমীকরণ, ফাংশন এবং বীজগাণিতিক গঠন সম্পর্কে জানুন',
        sampleQuestions: [
          'দ্বিঘাত সমীকরণ কীভাবে সমাধান করা হয়?',
          'ফাংশন কী?',
          'বীজগণিতের প্রয়োগ কী কী?',
        ],
      },
      {
        id: 'calculus',
        name: 'ক্যালকুলাস',
        description: 'অন্তরীকরণ, সমাকলন এবং সীমা সম্পর্কে জানুন',
        sampleQuestions: [
          'অন্তরীকরণ কী?',
          'সমাকলন কীভাবে করা হয়?',
          'সীমা কাকে বলে?',
        ],
      },
    ],
  },
];

// Helper function to generate AI response
export function generateAIResponse(
  prompt: string,
  topicId?: string,
  subtopicId?: string
): string {
  console.log(`Generating response for: ${prompt}`);
  console.log(`Topic ID: ${topicId || 'None'}`);
  console.log(`Subtopic ID: ${subtopicId || 'None'}`);

  return `এই হল আপনার প্রশ্নের ("${prompt}") একটি নমুনা উত্তর। আসল অ্যাপ্লিকেশনে, এখানে একটি বিস্তারিত উত্তর থাকবে।`;
}

// Helper function to get relevant resources
export function getRelevantResources(
  prompt: string,
  topicId?: string,
  subtopicId?: string
): Resource[] {
  // Return some sample resources based on the topic
  if (topicId === 'physics') {
    return [
      {
        id: 'physics-video-1',
        title: 'নিউটনের সূত্র',
        type: 'video',
        url: 'https://example.com/physics-video',
        description: 'নিউটনের তিনটি সূত্র সম্পর্কে একটি ভিডিও',
      },
    ];
  }

  if (topicId === 'math') {
    return [
      {
        id: 'math-article-1',
        title: 'বীজগণিতের মৌলিক ধারণা',
        type: 'article',
        url: 'https://example.com/math-article',
        description: 'বীজগণিতের মৌলিক ধারণা সম্পর্কে একটি নিবন্ধ',
      },
    ];
  }

  return [];
}

// Helper function to get suggested questions
export function getSuggestedQuestions(
  prompt: string,
  topicId?: string,
  subtopicId?: string
): string[] {
  // Return some sample suggested questions based on the topic
  if (topicId === 'physics') {
    return ['নিউটনের দ্বিতীয় সূত্র কী?', 'আলোর বেগ কত?', 'অভিকর্ষ কী?'];
  }

  if (topicId === 'math') {
    return [
      'ত্রিভুজের ক্ষেত্রফল কীভাবে নির্ণয় করা হয়?',
      'পাইথাগোরাসের উপপাদ্য কী?',
      'সমান্তরাল সরলরেখা কাকে বলে?',
    ];
  }

  return [
    'আরও বিস্তারিত জানতে চাই',
    'এর প্রয়োগ কী কী?',
    'এটি কীভাবে কাজ করে?',
  ];
}
