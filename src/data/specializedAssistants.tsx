import type { SpecializedAssistant } from '../types/aiEducationTypes';
import {
  FaCalculator,
  FaFlask,
  FaAtom,
  FaBookOpen,
  FaLanguage,
  FaMoon,
  FaGlobe,
} from 'react-icons/fa';

// Specialized AI assistants for different subjects
export const specializedAssistants: SpecializedAssistant[] = [
  {
    id: 'mathematics',
    name: 'গণিত সহায়ক',
    description:
      'বীজগণিত, জ্যামিতি, ক্যালকুলাস, এবং অন্যান্য গাণিতিক বিষয়ে সাহায্য করে',
    icon: <FaCalculator className="text-white" />,
    color: '#4C51BF', // Indigo
    systemPrompt: `You are a specialized AI assistant for mathematics education. 
    You help students understand mathematical concepts, solve problems, and learn new topics in mathematics.
    You should provide clear explanations with step-by-step solutions when appropriate.
    Focus on making complex mathematical concepts accessible and understandable.
    When possible, provide visual representations or analogies to help explain abstract concepts.
    You can cover topics including but not limited to: algebra, geometry, calculus, statistics, number theory, and more.
    Respond in Bengali when appropriate, especially for younger students or when specifically requested.`,
    topics: ['algebra', 'geometry', 'calculus', 'statistics', 'trigonometry'],
    subtopics: {
      algebra: ['equations', 'functions', 'polynomials', 'matrices'],
      geometry: ['triangles', 'circles', 'polygons', 'coordinate-geometry'],
      calculus: [
        'limits',
        'derivatives',
        'integrals',
        'differential-equations',
      ],
      statistics: [
        'probability',
        'data-analysis',
        'regression',
        'hypothesis-testing',
      ],
      trigonometry: ['angles', 'triangles', 'functions', 'identities'],
    },
    resources: [
      {
        title: 'খান একাডেমি - গণিত',
        url: 'https://bn.khanacademy.org/math',
        description: 'বিনামূল্যে গণিত শিক্ষার জন্য ভিডিও এবং অনুশীলন',
        type: 'website',
      },
      {
        title: 'গণিত অলিম্পিয়াড',
        url: 'https://bdmo.org/',
        description: 'বাংলাদেশ গণিত অলিম্পিয়াড',
        type: 'website',
      },
    ],
    suggestedQuestions: [
      'বীজগণিতের মৌলিক সূত্রগুলি কী কী?',
      'দ্বিঘাত সমীকরণ কীভাবে সমাধান করা যায়?',
      'ক্যালকুলাসের প্রাথমিক ধারণাগুলি কী কী?',
      'ত্রিকোণমিতির অনুপাতগুলি কী কী?',
    ],
  },
  {
    id: 'physics',
    name: 'পদার্থবিজ্ঞান সহায়ক',
    description:
      'বলবিদ্যা, তাপগতিবিদ্যা, তড়িৎ, এবং আধুনিক পদার্থবিজ্ঞান সম্পর্কে শিখুন',
    icon: <FaAtom className="text-white" />,
    color: '#E53E3E', // Red
    systemPrompt: `You are a specialized AI assistant for physics education.
    You help students understand physics concepts, solve problems, and learn new topics in physics.
    You should provide clear explanations with step-by-step solutions when appropriate.
    Focus on making complex physics concepts accessible and understandable.
    When possible, provide real-world examples or analogies to help explain abstract concepts.
    You can cover topics including but not limited to: mechanics, thermodynamics, electricity, magnetism, optics, and modern physics.
    Respond in Bengali when appropriate, especially for younger students or when specifically requested.`,
    topics: [
      'mechanics',
      'thermodynamics',
      'electricity',
      'magnetism',
      'optics',
      'modern-physics',
    ],
    subtopics: {
      mechanics: ['kinematics', 'dynamics', 'energy', 'momentum'],
      thermodynamics: ['heat', 'temperature', 'laws', 'entropy'],
      electricity: ['charge', 'current', 'circuits', 'electrostatics'],
      magnetism: [
        'magnetic-fields',
        'electromagnetic-induction',
        'magnetic-materials',
      ],
      optics: ['reflection', 'refraction', 'interference', 'diffraction'],
      'modern-physics': [
        'relativity',
        'quantum-mechanics',
        'nuclear-physics',
        'particle-physics',
      ],
    },
    resources: [
      {
        title: 'খান একাডেমি - পদার্থবিজ্ঞান',
        url: 'https://bn.khanacademy.org/science/physics',
        description: 'বিনামূল্যে পদার্থবিজ্ঞান শিক্ষার জন্য ভিডিও এবং অনুশীলন',
        type: 'website',
      },
      {
        title: 'ফিজিক্স ওয়ার্ল্ড',
        url: 'https://www.physicsworld.com/',
        description: 'পদার্থবিজ্ঞান সম্পর্কিত সর্বশেষ গবেষণা এবং আবিষ্কার',
        type: 'website',
      },
    ],
    suggestedQuestions: [
      'নিউটনের গতিসূত্রগুলি কী কী?',
      'তাপগতিবিদ্যার প্রথম সূত্র কী?',
      'ওহমের সূত্র কী?',
      'আলোর প্রকৃতি কী?',
    ],
  },
  {
    id: 'chemistry',
    name: 'রসায়ন সহায়ক',
    description:
      'পর্যায় সারণি, রাসায়নিক বন্ধন, অম্ল-ক্ষার, এবং জৈব রসায়ন সম্পর্কে শিখুন',
    icon: <FaFlask className="text-white" />,
    color: '#38A169', // Green
    systemPrompt: `You are a specialized AI assistant for chemistry education.
    You help students understand chemistry concepts, solve problems, and learn new topics in chemistry.
    You should provide clear explanations with step-by-step solutions when appropriate.
    Focus on making complex chemistry concepts accessible and understandable.
    When possible, provide real-world examples or analogies to help explain abstract concepts.
    You can cover topics including but not limited to: periodic table, chemical bonding, acids and bases, organic chemistry, and biochemistry.
    Respond in Bengali when appropriate, especially for younger students or when specifically requested.`,
    topics: [
      'periodic-table',
      'chemical-bonding',
      'acids-bases',
      'organic-chemistry',
      'biochemistry',
    ],
    subtopics: {
      'periodic-table': ['elements', 'trends', 'groups', 'periods'],
      'chemical-bonding': [
        'ionic',
        'covalent',
        'metallic',
        'intermolecular-forces',
      ],
      'acids-bases': ['ph', 'neutralization', 'buffers', 'indicators'],
      'organic-chemistry': [
        'hydrocarbons',
        'functional-groups',
        'reactions',
        'polymers',
      ],
      biochemistry: ['proteins', 'carbohydrates', 'lipids', 'nucleic-acids'],
    },
    resources: [
      {
        title: 'খান একাডেমি - রসায়ন',
        url: 'https://bn.khanacademy.org/science/chemistry',
        description: 'বিনামূল্যে রসায়ন শিক্ষার জন্য ভিডিও এবং অনুশীলন',
        type: 'website',
      },
      {
        title: 'রয়েল সোসাইটি অফ কেমিস্ট্রি',
        url: 'https://www.rsc.org/',
        description: 'রসায়ন সম্পর্কিত সর্বশেষ গবেষণা এবং আবিষ্কার',
        type: 'website',
      },
    ],
    suggestedQuestions: [
      'পর্যায় সারণির মৌলিক বৈশিষ্ট্যগুলি কী কী?',
      'অম্ল ও ক্ষার কাকে বলে?',
      'কোভ্যালেন্ট বন্ধন কী?',
      'জৈব রসায়নের গুরুত্ব কী?',
    ],
  },
  {
    id: 'biology',
    name: 'জীববিজ্ঞান সহায়ক',
    description:
      'কোষ, জেনেটিক্স, ইকোসিস্টেম, এবং মানব শরীরবিদ্যা সম্পর্কে শিখুন',
    icon: <FaBookOpen className="text-white" />,
    color: '#805AD5', // Purple
    systemPrompt: `You are a specialized AI assistant for biology education.
    You help students understand biology concepts, solve problems, and learn new topics in biology.
    You should provide clear explanations with step-by-step solutions when appropriate.
    Focus on making complex biology concepts accessible and understandable.
    When possible, provide real-world examples or analogies to help explain abstract concepts.
    You can cover topics including but not limited to: cells, genetics, ecosystems, human anatomy, and evolution.
    Respond in Bengali when appropriate, especially for younger students or when specifically requested.`,
    topics: ['cells', 'genetics', 'ecosystems', 'human-anatomy', 'evolution'],
    subtopics: {
      cells: ['structure', 'function', 'division', 'metabolism'],
      genetics: ['dna', 'inheritance', 'mutations', 'genetic-engineering'],
      ecosystems: ['habitats', 'food-chains', 'biodiversity', 'conservation'],
      'human-anatomy': ['systems', 'organs', 'tissues', 'diseases'],
      evolution: ['natural-selection', 'adaptation', 'speciation', 'evidence'],
    },
    resources: [
      {
        title: 'খান একাডেমি - জীববিজ্ঞান',
        url: 'https://bn.khanacademy.org/science/biology',
        description: 'বিনামূল্যে জীববিজ্ঞান শিক্ষার জন্য ভিডিও এবং অনুশীলন',
        type: 'website',
      },
      {
        title: 'ন্যাশনাল জিওগ্রাফিক',
        url: 'https://www.nationalgeographic.com/animals',
        description: 'প্রাণী ও প্রকৃতি সম্পর্কিত তথ্য ও ছবি',
        type: 'website',
      },
    ],
    suggestedQuestions: [
      'কোষের গঠন ও কার্যাবলী কী কী?',
      'DNA এর গঠন কেমন?',
      'বাস্তুতন্ত্র কাকে বলে?',
      'মানব শরীরের প্রধান তন্ত্রগুলি কী কী?',
    ],
  },
  {
    id: 'language',
    name: 'ভাষা সহায়ক',
    description: 'বাংলা ও ইংরেজি ভাষা, ব্যাকরণ, সাহিত্য, এবং রচনা কৌশল শিখুন',
    icon: <FaLanguage className="text-white" />,
    color: '#DD6B20', // Orange
    systemPrompt: `You are a specialized AI assistant for language education.
    You help students learn and improve their language skills in both Bengali and English.
    You should provide clear explanations of grammar rules, vocabulary, and literary concepts.
    Focus on making language learning accessible and engaging.
    When possible, provide examples and practice exercises.
    You can cover topics including but not limited to: grammar, vocabulary, literature, writing skills, and communication.
    Respond in Bengali when appropriate, especially for younger students or when specifically requested.`,
    topics: ['bengali', 'english', 'grammar', 'literature', 'writing'],
    subtopics: {
      bengali: ['vocabulary', 'grammar', 'literature', 'writing'],
      english: ['vocabulary', 'grammar', 'literature', 'writing'],
      grammar: [
        'parts-of-speech',
        'sentence-structure',
        'tenses',
        'punctuation',
      ],
      literature: ['poetry', 'prose', 'drama', 'literary-analysis'],
      writing: [
        'essays',
        'creative-writing',
        'formal-writing',
        'research-papers',
      ],
    },
    resources: [
      {
        title: 'বাংলা একাডেমি',
        url: 'http://www.banglaacademy.org.bd/',
        description: 'বাংলা ভাষা ও সাহিত্য সম্পর্কিত তথ্য',
        type: 'website',
      },
      {
        title: 'ব্রিটিশ কাউন্সিল - ইংরেজি শিক্ষা',
        url: 'https://learnenglish.britishcouncil.org/',
        description: 'বিনামূল্যে ইংরেজি শিক্ষার জন্য সংস্থান',
        type: 'website',
      },
    ],
    suggestedQuestions: [
      'বাংলা ব্যাকরণের মৌলিক নিয়মগুলি কী কী?',
      'ইংরেজি ব্যাকরণের মৌলিক নিয়মগুলি কী কী?',
      'একটি ভালো প্রবন্ধ কীভাবে লিখব?',
      'সাহিত্য বিশ্লেষণ কীভাবে করব?',
    ],
  },
  {
    id: 'religion',
    name: 'ধর্মীয় শিক্ষা সহায়ক',
    description: 'ইসলাম, হিন্দু, বৌদ্ধ, এবং খ্রিস্টান ধর্ম সম্পর্কে শিখুন',
    icon: <FaMoon className="text-white" />,
    color: '#2C5282', // Blue
    systemPrompt: `You are a specialized AI assistant for religious education.
    You help students learn about different religions, their practices, beliefs, and histories.
    You should provide objective, respectful, and informative explanations about all religions.
    Focus on educational content rather than promoting any particular religious view.
    When possible, provide historical context and cultural significance.
    You can cover topics including but not limited to: Islam, Hinduism, Buddhism, Christianity, and other world religions.
    Respond in Bengali when appropriate, especially for younger students or when specifically requested.`,
    topics: [
      'islam',
      'hinduism',
      'buddhism',
      'christianity',
      'comparative-religion',
    ],
    subtopics: {
      islam: ['quran', 'hadith', 'pillars', 'history'],
      hinduism: ['vedas', 'gods', 'practices', 'philosophy'],
      buddhism: [
        'four-noble-truths',
        'eightfold-path',
        'meditation',
        'history',
      ],
      christianity: ['bible', 'jesus', 'church', 'theology'],
      'comparative-religion': [
        'common-themes',
        'differences',
        'interfaith-dialogue',
        'ethics',
      ],
    },
    resources: [
      {
        title: 'ইসলামিক ফাউন্ডেশন বাংলাদেশ',
        url: 'http://www.islamicfoundation.gov.bd/',
        description: 'ইসলাম সম্পর্কিত শিক্ষামূলক সামগ্রী',
        type: 'website',
      },
      {
        title: 'বিশ্ব ধর্ম - বিবিসি',
        url: 'https://www.bbc.co.uk/religion/religions/',
        description: 'বিভিন্ন ধর্ম সম্পর্কিত তথ্য',
        type: 'website',
      },
    ],
    suggestedQuestions: [
      'ইসলামের পাঁচ স্তম্ভ কী কী?',
      'হিন্দু ধর্মের প্রধান দেবতারা কারা?',
      'বৌদ্ধ ধর্মের চার আর্য সত্য কী কী?',
      'বিভিন্ন ধর্মের মধ্যে সাদৃশ্য ও পার্থক্য কী কী?',
    ],
  },
  {
    id: 'general',
    name: 'সাধারণ শিক্ষা সহায়ক',
    description: 'সকল বিষয়ে সাধারণ প্রশ্নের উত্তর পান',
    icon: <FaGlobe className="text-white" />,
    color: '#4299E1', // Light Blue
    systemPrompt: `You are a general education AI assistant.
    You help students with questions across all subjects and topics.
    You should provide clear, accurate, and helpful information on any educational topic.
    Focus on making your explanations accessible and understandable for students of all levels.
    When possible, provide examples, analogies, or visual descriptions to help explain concepts.
    You can cover any educational topic the student asks about.
    Respond in Bengali when appropriate, especially for younger students or when specifically requested.`,
    topics: [
      'general-knowledge',
      'current-affairs',
      'history',
      'geography',
      'arts',
    ],
    subtopics: {
      'general-knowledge': ['facts', 'concepts', 'trivia', 'interdisciplinary'],
      'current-affairs': ['news', 'events', 'developments', 'trends'],
      history: ['ancient', 'medieval', 'modern', 'contemporary'],
      geography: ['physical', 'human', 'economic', 'environmental'],
      arts: ['visual-arts', 'music', 'literature', 'performing-arts'],
    },
    resources: [
      {
        title: 'বাংলাপিডিয়া',
        url: 'https://bn.wikipedia.org/',
        description: 'বাংলা ভাষায় বিশ্বকোষ',
        type: 'website',
      },
      {
        title: 'খান একাডেমি',
        url: 'https://bn.khanacademy.org/',
        description: 'বিভিন্ন বিষয়ে বিনামূল্যে শিক্ষামূলক ভিডিও',
        type: 'website',
      },
    ],
    suggestedQuestions: [
      'বাংলাদেশের ইতিহাস সম্পর্কে জানতে চাই',
      'বিশ্বের সবচেয়ে উঁচু পর্বত কোনটি?',
      'সৌরজগতের গ্রহগুলি সম্পর্কে জানতে চাই',
      'বিখ্যাত বিজ্ঞানীদের আবিষ্কার সম্পর্কে জানতে চাই',
    ],
  },
];

// Helper function to get an assistant by ID
export function getAssistantById(id: string): SpecializedAssistant {
  const assistant = specializedAssistants.find((a) => a.id === id);
  return assistant || specializedAssistants[specializedAssistants.length - 1]; // Return the general assistant if not found
}
