
import { BookOpen, BookText, Video, Headphones, Gamepad } from 'lucide-react'

// Course data type
export interface Course {
  id: number
  title: string
  category: string
  level: string
  duration: string
  lessons: number
  students: number
  rating: number
  instructor: string
  image: string
  progress: number
  contentFormat: string[]
  description: string
  points: number
  learningObjectives: string[]
  resources: {
    title: string
    url: string
    type: string
    source: string
  }[]
  author: {
    name: string
    title: string
    avatar: string
  }
}

// Categories and levels
export const categories = [
  { id: "physics", name: "পদার্থবিজ্ঞান" },
  { id: "chemistry", name: "রসায়ন" },
  { id: "biology", name: "জীববিজ্ঞান" },
  { id: "mathematics", name: "গণিত" },
  { id: "general_science", name: "সাধারণ বিজ্ঞান" },
  { id: "bangla", name: "বাংলা" },
  { id: "english", name: "ইংরেজি" },
  { id: "religion", name: "ধর্ম" },
  { id: "arabic", name: "আরবি" },
]

export const levels = [
  { id: "primary", name: "প্রাথমিক" },
  { id: "class_5", name: "৫ম শ্রেণি" },
  { id: "class_6", name: "৬ষ্ঠ শ্রেণি" },
  { id: "class_7", name: "৭ম শ্রেণি" },
  { id: "class_8", name: "৮ম শ্রেণি" },
  { id: "class_6_8", name: "৬ষ্ঠ-৮ম শ্রেণি" }, // Added for Class 6-8 range
  { id: "class_9_10", name: "৯ম-১০ম শ্রেণি" },
  { id: "hsc", name: "এইচএসসি" },
  { id: "all", name: "সকল স্তর" },
]

// Helper function to get content format icon
export const getContentFormatIcon = (format: string) => {
  switch (format.toLowerCase()) {
    case "ভিডিও":
    case "এনিমেশন":
    case "ভিডিও লেকচার":
    case "গল্প ভিডিও":
      return <Video className="h-4 w-4 text-red-500" />
    case "অডিও গল্প":
    case "অডিও":
    case "পডকাস্ট":
    case "অডিও কুইজ":
      return <Headphones className="h-4 w-4 text-blue-500" />
    case "গেম":
    case "পাজল":
    case "পাজল গেম":
    case "ভার্চুয়াল এক্সপেরিমেন্ট":
    case "ভার্চুয়াল ল্যাব":
    case "ভার্চুয়াল মডেল":
    case "ভার্চুয়াল টুল":
    case "অনলাইন সিমুলেশন":
    case "ইন্টার‍্যাকটিভ সমাধান":
    case "কুইজ":
    case "অডিও গেম": // Added to map to Gamepad
    case "ইনটার‍্যাকটিভ লেসন": // Added to map to Gamepad
      return <Gamepad className="h-4 w-4 text-green-500" />
    case "কমিক":
    case "গল্প":
    case "ব্লগ":
    case "আর্টিকেল":
    case "ইনফোগ্রাফিক":
    case "এক্সপেরিমেন্ট":
    case "চিত্র":
    case "কমিক সিরিজ":
      return <BookText className="h-4 w-4 text-purple-500" />
    default:
      return <BookOpen className="h-4 w-4 text-indigo-500" />
  }
}

// Sample courses
export const courses: Course[] = [
  // Courses from learn.txt (IDs 1-57)
  // Physics
  {
    id: 1,
    title: "পদার্থ ও শক্তি",
    category: "physics",
    level: "class_6",
    duration: "৮ ঘন্টা",
    lessons: 12,
    students: 2354,
    rating: 4.8,
    instructor: "ড. আনিসুর রহমান",
    image:
      "https://images.pexels.com/photos/714699/pexels-photo-714699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["এনিমেশন", "কমিক"],
    description:
      "এই কোর্সে ৬ষ্ঠ শ্রেণির শিক্ষার্থীরা পদার্থ ও শক্তির মৌলিক ধারণাগুলো সম্পর্কে শিখবে। এনিমেশন এবং কমিকের মাধ্যমে শক্তির বিভিন্ন রূপ, শক্তির রূপান্তর, এবং পদার্থের বৈশিষ্ট্য সম্পর্কে সহজভাবে ব্যাখ্যা করা হয়েছে।",
    points: 15,
    learningObjectives: [
      "পদার্থের বৈশিষ্ট্য ও প্রকারভেদ সম্পর্কে জানতে পারবে",
      "শক্তির বিভিন্ন রূপ চিহ্নিত করতে পারবে",
      "শক্তির রূপান্তর প্রক্রিয়া বুঝতে পারবে",
      "দৈনন্দিন জীবনে শক্তির ব্যবহার সম্পর্কে জানতে পারবে",
    ],
    resources: [
      {
        title: "পদার্থ ও শক্তি - এনিমেটেড ভিডিও সিরিজ",
        url: "https://www.youtube.com/watch?v=example1",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "শক্তির রূপান্তর - ইন্টারেক্টিভ সিমুলেশন",
        url: "https://phet.colorado.edu/bn/simulation/energy-forms-and-changes",
        type: "interactive",
        source: "PhET Interactive Simulations",
      },
      {
        title: "পদার্থের অবস্থা - অনলাইন কমিক",
        url: "https://www.biggansala.org/comics/matter-states",
        type: "article",
        source: "বিজ্ঞানশালা ডিজিটাল লাইব্রেরি",
      },
    ],
    author: {
      name: "ড. আনিসুর রহমান",
      title: "সিনিয়র লেকচারার, পদার্থবিজ্ঞান বিভাগ, ঢাকা বিশ্ববিদ্যালয়",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 2,
    title: "গতি ও বল",
    category: "physics",
    level: "class_7",
    duration: "১০ ঘন্টা",
    lessons: 15,
    students: 1876,
    rating: 4.6,
    instructor: "ড. তাসনিম আহমেদ",
    image:
      "https://images.pexels.com/photos/60582/newton-s-cradle-balls-sphere-60582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["ভার্চুয়াল এক্সপেরিমেন্ট", "গেম"],
    description:
      "এই কোর্সে ৭ম শ্রেণির শিক্ষার্থীরা গতি ও বলের মৌলিক ধারণাগুলো সম্পর্কে শিখবে। ভার্চুয়াল এক্সপেরিমেন্ট এবং গেমের মাধ্যমে গতি, বেগ, ত্বরণ, এবং বলের প্রভাব সম্পর্কে আকর্ষণীয়ভাবে ব্যাখ্যা করা হয়েছে।",
    points: 20,
    learningObjectives: [
      "গতি, বেগ ও ত্বরণের মধ্যে পার্থক্য বুঝতে পারবে",
      "নিউটনের গতিসূত্রগুলো ব্যাখ্যা করতে পারবে",
      "বিভিন্ন ধরনের বল চিহ্নিত করতে পারবে",
      "দৈনন্দিন জীবনে গতি ও বলের প্রয়োগ দেখতে পারবে",
    ],
    resources: [
      {
        title: "গতি ও বল - ভার্চুয়াল এক্সপেরিমেন্ট",
        url: "https://phet.colorado.edu/bn/simulation/forces-and-motion-basics",
        type: "interactive",
        source: "PhET Interactive Simulations",
      },
      {
        title: "নিউটনের গতিসূত্র - এনিমেটেড ভিডিও",
        url: "https://www.youtube.com/watch?v=example2",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "গতি ও বল - অনলাইন গেম",
        url: "https://www.biggansala.org/games/motion-forces",
        type: "interactive",
        source: "বিজ্ঞানশালা গেম পোর্টাল",
      },
    ],
    author: {
      name: "ড. তাসনিম আহমেদ",
      title: "সহকারী অধ্যাপক, পদার্থবিজ্ঞান বিভাগ, বুয়েট",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 3,
    title: "ঘর্ষণ ও সরল যন্ত্র",
    category: "physics",
    level: "class_8",
    duration: "৯ ঘন্টা",
    lessons: 14,
    students: 1632,
    rating: 4.7,
    instructor: "ড. নুসরাত জাহান",
    image:
      "https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["ভিডিও", "কুইজ"],
    description:
      "এই কোর্সে ৮ম শ্রেণির শিক্ষার্থীরা ঘর্ষণ ও সরল যন্ত্র সম্পর্কে শিখবে। ভিডিও এবং কুইজের মাধ্যমে ঘর্ষণের প্রকারভেদ, ঘর্ষণের সুবিধা-অসুবিধা, এবং লিভার, পুলি, ইনক্লাইন প্লেন ইত্যাদি সরল যন্ত্র সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।",
    points: 18,
    learningObjectives: [
      "ঘর্ষণের প্রকারভেদ ও প্রভাব বুঝতে পারবে",
      "ঘর্ষণের সুবিধা ও অসুবিধা ব্যাখ্যা করতে পারবে",
      "বিভিন্ন ধরনের সরল যন্ত্র চিহ্নিত করতে পারবে",
      "দৈনন্দিন জীবনে সরল যন্ত্রের ব্যবহার দেখতে পারবে",
    ],
    resources: [
      {
        title: "ঘর্ষণ - ভিডিও লেকচার",
        url: "https://www.youtube.com/watch?v=example3",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "সরল যন্ত্র - ইন্টারেক্টিভ সিমুলেশন",
        url: "https://phet.colorado.edu/bn/simulation/balancing-act",
        type: "interactive",
        source: "PhET Interactive Simulations",
      },
      {
        title: "ঘর্ষণ ও সরল যন্ত্র - অনলাইন কুইজ",
        url: "https://www.biggansala.org/quiz/friction-simple-machines",
        type: "interactive",
        source: "বিজ্ঞানশালা কুইজ পোর্টাল",
      },
    ],
    author: {
      name: "ড. নুসরাত জাহান",
      title: "সহকারী অধ্যাপক, পদার্থবিজ্ঞান বিভাগ, জাহাঙ্গীরনগর বিশ্ববিদ্যালয়",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 4,
    title: "তাপ ও তাপগতিবিদ্যা",
    category: "physics",
    level: "class_9_10",
    duration: "১২ ঘন্টা",
    lessons: 16,
    students: 2145,
    rating: 4.8,
    instructor: "ড. মাহমুদুল হাসান",
    image:
      "https://images.pexels.com/photos/1098365/pexels-photo-1098365.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["ভিডিও", "ভার্চুয়াল এক্সপেরিমেন্ট"],
    description:
      "এই কোর্সে ৯ম-১০ম শ্রেণির শিক্ষার্থীরা তাপ ও তাপগতিবিদ্যা সম্পর্কে শিখবে। ভিডিও এবং ভার্চুয়াল এক্সপেরিমেন্টের মাধ্যমে তাপমাত্রা, তাপ পরিবহন, তাপগতিবিদ্যার সূত্রাবলী, এবং এন্ট্রপি সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।",
    points: 22,
    learningObjectives: [
      "তাপমাত্রা ও তাপের মধ্যে পার্থক্য বুঝতে পারবে",
      "তাপ পরিবহনের বিভিন্ন পদ্ধতি ব্যাখ্যা করতে পারবে",
      "তাপগতিবিদ্যার প্রথম ও দ্বিতীয় সূত্র বুঝতে পারবে",
      "এন্ট্রপি ও এর প্রয়োগ সম্পর্কে জানতে পারবে",
      "তাপীয় ইঞ্জিনের কার্যপ্রণালী বুঝতে পারবে",
    ],
    resources: [
      {
        title: "তাপগতিবিদ্যা - ভিডিও লেকচার সিরিজ",
        url: "https://www.youtube.com/watch?v=example19",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "তাপ পরিবহন - ইন্টারেক্টিভ সিমুলেশন",
        url: "https://phet.colorado.edu/bn/simulation/energy-forms-and-changes",
        type: "interactive",
        source: "PhET Interactive Simulations",
      },
      {
        title: "তাপগতিবিদ্যার সূত্রাবলী - অনলাইন কুইজ",
        url: "https://www.biggansala.org/quiz/thermodynamics",
        type: "interactive",
        source: "বিজ্ঞানশালা কুইজ পোর্টাল",
      },
    ],
    author: {
      name: "ড. মাহমুদুল হাসান",
      title: "সহযোগী অধ্যাপক, পদার্থবিজ্ঞান বিভাগ, ঢাকা বিশ্ববিদ্যালয়",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 5,
    title: "আলো ও আলোর প্রকৃতি",
    category: "physics",
    level: "class_8",
    duration: "১০ ঘন্টা",
    lessons: 14,
    students: 1875,
    rating: 4.7,
    instructor: "ড. শাহনাজ পারভীন",
    image:
      "https://images.pexels.com/photos/5767577/pexels-photo-5767577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["এনিমেশন", "ভার্চুয়াল এক্সপেরিমেন্ট"],
    description:
      "এই কোর্সে ৮ম শ্রেণির শিক্ষার্থীরা আলো ও আলোর প্রকৃতি সম্পর্কে শিখবে। এনিমেশন এবং ভার্চুয়াল এক্সপেরিমেন্টের মাধ্যমে আলোর প্রতিফলন, প্রতিসরণ, বিচ্ছুরণ, আলোর তরঙ্গ ও কণিকা তত্ত্ব সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।",
    points: 18,
    learningObjectives: [
      "আলোর প্রতিফলন ও প্রতিসরণের সূত্র ব্যাখ্যা করতে পারবে",
      "আলোর বিচ্ছুরণ ও বর্ণালী সম্পর্কে জানতে পারবে",
      "আলোর তরঙ্গ ও কণিকা তত্ত্ব বুঝতে পারবে",
      "লেন্স ও আয়নার ব্যবহার সম্পর্কে জানতে পারবে",
      "দৈনন্দিন জীবনে আলোর প্রয়োগ চিহ্নিত করতে পারবে",
    ],
    resources: [
      {
        title: "আলোর প্রতিফলন ও প্রতিসরণ - এনিমেটেড ভিডিও",
        url: "https://www.youtube.com/watch?v=example20",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "লেন্স ও আয়না - ইন্টারেক্টিভ সিমুলেশন",
        url: "https://phet.colorado.edu/bn/simulation/geometric-optics",
        type: "interactive",
        source: "PhET Interactive Simulations",
      },
      {
        title: "আলোর প্রকৃতি - অনলাইন কুইজ",
        url: "https://www.biggansala.org/quiz/nature-of-light",
        type: "interactive",
        source: "বিজ্ঞানশালা কুইজ পোর্টাল",
      },
    ],
    author: {
      name: "ড. শাহনাজ পারভীন",
      title: "সহকারী অধ্যাপক, পদার্থবিজ্ঞান বিভাগ, জাহাঙ্গীরনগর বিশ্ববিদ্যালয়",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 6,
    title: "তড়িৎ ও চুম্বকত্ব",
    category: "physics",
    level: "class_9_10",
    duration: "১৪ ঘন্টা",
    lessons: 18,
    students: 2250,
    rating: 4.9,
    instructor: "ড. আবদুল্লাহ আল মামুন",
    image:
      "https://images.pexels.com/photos/414781/pexels-photo-414781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["ভিডিও", "ভার্চুয়াল ল্যাব"],
    description:
      "এই কোর্সে ৯ম-১০ম শ্রেণির শিক্ষার্থীরা তড়িৎ ও চুম্বকত্ব সম্পর্কে শিখবে। ভিডিও এবং ভার্চুয়াল ল্যাবের মাধ্যমে তড়িৎ প্রবাহ, ওহমের সূত্র, তড়িৎ চৌম্বক আবেশ, চুম্বকীয় ক্ষেত্র, এবং তড়িৎ চুম্বকীয় তরঙ্গ সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।",
    points: 24,
    learningObjectives: [
      "তড়িৎ প্রবাহ ও ওহমের সূত্র ব্যাখ্যা করতে পারবে",
      "তড়িৎ চৌম্বক আবেশ সম্পর্কে জানতে পারবে",
      "চুম্বকীয় ক্ষেত্র ও এর বৈশিষ্ট্য বুঝতে পারবে",
      "তড়িৎ চুম্বকীয় তরঙ্গ সম্পর্কে ধারণা পাবে",
      "দৈনন্দিন জীবনে তড়িৎ ও চুম্বকত্বের প্রয়োগ চিহ্নিত করতে পারবে",
    ],
    resources: [
      {
        title: "তড়িৎ প্রবাহ ও ওহমের সূত্র - ভিডিও লেকচার",
        url: "https://www.youtube.com/watch?v=example21",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "চুম্বকীয় ক্ষেত্র - ইন্টারেক্টিভ সিমুলেশন",
        url: "https://phet.colorado.edu/bn/simulation/faradays-law",
        type: "interactive",
        source: "PhET Interactive Simulations",
      },
      {
        title: "তড়িৎ ও চুম্বকত্ব - অনলাইন কুইজ",
        url: "https://www.biggansala.org/quiz/electricity-magnetism",
        type: "interactive",
        source: "বিজ্ঞানশালা কুইজ পোর্টাল",
      },
    ],
    author: {
      name: "ড. আবদুল্লাহ আল মামুন",
      title: "অধ্যাপক, পদার্থবিজ্ঞান বিভাগ, বুয়েট",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  // Chemistry
  {
    id: 7,
    title: "পদার্থের অবস্থা",
    category: "chemistry",
    level: "class_7",
    duration: "৭ ঘন্টা",
    lessons: 11,
    students: 1243,
    rating: 4.9,
    instructor: "ড. শাহাদাত হোসেন",
    image:
      "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["এনিমেশন", "ভিডিও"],
    description:
      "এই কোর্সে ৭ম শ্রেণির শিক্ষার্থীরা পদার্থের তিন অবস্থা (কঠিন, তরল, গ্যাসীয়) সম্পর্কে শিখবে। এনিমেশন এবং ভিডিওর মাধ্যমে পদার্থের অবস্থা পরিবর্তন, গলনাঙ্ক, স্ফুটনাঙ্ক, এবং অণুর গতি সম্পর্কে সহজভাবে ব্যাখ্যা করা হয়েছে।",
    points: 15,
    learningObjectives: [
      "পদার্থের তিন অবস্থার বৈশিষ্ট্য বর্ণনা করতে পারবে",
      "পদার্থের অবস্থা পরিবর্তনের প্রক্রিয়া ব্যাখ্যা করতে পারবে",
      "গলনাঙ্ক ও স্ফুটনাঙ্ক সম্পর্কে ধারণা পাবে",
      "অণুর গতি ও পদার্থের অবস্থার সম্পর্ক বুঝতে পারবে",
    ],
    resources: [
      {
        title: "পদার্থের অবস্থা - এনিমেটেড ভিডিও",
        url: "https://www.youtube.com/watch?v=example4",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "অণুর গতি - ইন্টারেক্টিভ সিমুলেশন",
        url: "https://phet.colorado.edu/bn/simulation/states-of-matter-basics",
        type: "interactive",
        source: "PhET Interactive Simulations",
      },
      {
        title: "পদার্থের অবস্থা পরিবর্তন - অনলাইন কুইজ",
        url: "https://www.biggansala.org/quiz/states-of-matter",
        type: "interactive",
        source: "বিজ্ঞানশালা কুইজ পোর্টাল",
      },
    ],
    author: {
      name: "ড. শাহাদাত হোসেন",
      title: "সহকারী অধ্যাপক, রসায়ন বিভাগ, ঢাকা বিশ্ববিদ্যালয়",
      avatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 8,
    title: "পরমাণু ও অণু",
    category: "chemistry",
    level: "class_8",
    duration: "১২ ঘন্টা",
    lessons: 18,
    students: 876,
    rating: 4.5,
    instructor: "প্রফেসর সাজ্জাদ হোসেন",
    image:
      "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["কমিক", "গল্প"],
    description:
      "এই কোর্সে ৮ম শ্রেণির শিক্ষার্থীরা পরমাণু ও অণুর গঠন সম্পর্কে শিখবে। কমিক এবং গল্পের মাধ্যমে পরমাণুর গঠন, ইলেকট্রন, প্রোটন, নিউট্রন, এবং মৌলের পর্যায় সারণি সম্পর্কে আকর্ষণীয়ভাবে ব্যাখ্যা করা হয়েছে।",
    points: 20,
    learningObjectives: [
      "পরমাণুর গঠন ব্যাখ্যা করতে পারবে",
      "ইলেকট্রন, প্রোটন, নিউট্রনের বৈশিষ্ট্য বর্ণনা করতে পারবে",
      "পরমাণু ও অণুর মধ্যে পার্থক্য বুঝতে পারবে",
      "মৌলের পর্যায় সারণি সম্পর্কে ধারণা পাবে",
    ],
    resources: [
      {
        title: "পরমাণুর গল্প - কমিক সিরিজ",
        url: "https://www.biggansala.org/comics/atom-story",
        type: "article",
        source: "বিজ্ঞানশালা ডিজিটাল লাইব্রেরি",
      },
      {
        title: "পরমাণু গঠন - এনিমেটেড ভিডিও",
        url: "https://www.youtube.com/watch?v=example5",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "পরমাণু মডেল - ইন্টারেক্টিভ সিমুলেশন",
        url: "https://phet.colorado.edu/bn/simulation/build-an-atom",
        type: "interactive",
        source: "PhET Interactive Simulations",
      },
    ],
    author: {
      name: "প্রফেসর সাজ্জাদ হোসেন",
      title: "অধ্যাপক, রসায়ন বিভাগ, জাহাঙ্গীরনগর বিশ্ববিদ্যালয়",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 9,
    title: "রাসায়নিক বন্ধন ও মলিকুলার জ্যামিতি",
    category: "chemistry",
    level: "class_9_10",
    duration: "১১ ঘন্টা",
    lessons: 15,
    students: 1950,
    rating: 4.7,
    instructor: "ড. নাজমুল হক",
    image:
      "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["এনিমেশন", "ভার্চুয়াল মডেল"],
    description:
      "এই কোর্সে ৯ম-১০ম শ্রেণির শিক্ষার্থীরা রাসায়নিক বন্ধন ও মলিকুলার জ্যামিতি সম্পর্কে শিখবে। এনিমেশন এবং ভার্চুয়াল মডেলের মাধ্যমে আয়নিক বন্ধন, সমযোজী বন্ধন, ধাতব বন্ধন, হাইড্রোজেন বন্ধন, এবং মলিকুলার জ্যামিতি সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।",
    points: 20,
    learningObjectives: [
      "বিভিন্ন ধরনের রাসায়নিক বন্ধন চিহ্নিত করতে পারবে",
      "আয়নিক ও সমযোজী বন্ধনের মধ্যে পার্থক্য বুঝতে পারবে",
      "হাইড্রোজেন বন্ধন ও এর গুরুত্ব ব্যাখ্যা করতে পারবে",
      "মলিকুলার জ্যামিতি নির্ধারণ করতে পারবে",
      "VSEPR তত্ত্ব ব্যবহার করে মলিকুলের আকৃতি অনুমান করতে পারবে",
    ],
    resources: [
      {
        title: "রাসায়নিক বন্ধন - এনিমেটেড ভিডিও",
        url: "https://www.youtube.com/watch?v=example22",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "মলিকুলার জ্যামিতি - ইন্টারেক্টিভ সিমুলেশন",
        url: "https://phet.colorado.edu/bn/simulation/molecule-shapes",
        type: "interactive",
        source: "PhET Interactive Simulations",
      },
      {
        title: "রাসায়নিক বন্ধন - অনলাইন কুইজ",
        url: "https://www.biggansala.org/quiz/chemical-bonding",
        type: "interactive",
        source: "বিজ্ঞানশালা কুইজ পোর্টাল",
      },
    ],
    author: {
      name: "ড. নাজমুল হক",
      title: "সহযোগী অধ্যাপক, রসায়ন বিভাগ, ঢাকা বিশ্ববিদ্যালয়",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 10,
    title: "জৈব রসায়ন: হাইড্রোকার্বন ও ফাংশনাল গ্রুপ",
    category: "chemistry",
    level: "hsc",
    duration: "১৫ ঘন্টা",
    lessons: 20,
    students: 1650,
    rating: 4.8,
    instructor: "ড. ফারহানা হক",
    image:
      "https://images.pexels.com/photos/954585/pexels-photo-954585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["ভিডিও", "ভার্চুয়াল ল্যাব"],
    description:
      "এই কোর্সে এইচএসসি শিক্ষার্থীরা জৈব রসায়নের মৌলিক ধারণাগুলো সম্পর্কে শিখবে। ভিডিও এবং ভার্চুয়াল ল্যাবের মাধ্যমে হাইড্রোকার্বন, অ্যালকেন, অ্যালকিন, অ্যারোমেটিক যৌগ, এবং বিভিন্ন ফাংশনাল গ্রুপ সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।",
    points: 25,
    learningObjectives: [
      "হাইড্রোকার্বনের প্রকারভেদ ও বৈশিষ্ট্য বর্ণনা করতে পারবে",
      "অ্যালকেন, অ্যালকিন, অ্যারোমেটিক যৌগের মধ্যে পার্থক্য বুঝতে পারবে",
      "বিভিন্ন ফাংশনাল গ্রুপ চিহ্নিত করতে পারবে",
      "জৈব যৌগের নামকরণ করতে পারবে",
      "জৈব বিক্রিয়ার প্রকারভেদ ও মেকানিজম বুঝতে পারবে",
    ],
    resources: [
      {
        title: "হাইড্রোকার্বন - ভিডিও লেকচার সিরিজ",
        url: "https://www.youtube.com/watch?v=example23",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "জৈব যৌগের নামকরণ - ইন্টারেক্টিভ টুল",
        url: "https://www.biggansala.org/interactive/organic-nomenclature",
        type: "interactive",
        source: "বিজ্ঞানশালা ইন্টারেক্টিভ পোর্টাল",
      },
      {
        title: "ফাংশনাল গ্রুপ - অনলাইন কুইজ",
        url: "https://www.biggansala.org/quiz/functional-groups",
        type: "interactive",
        source: "বিজ্ঞানশালা কুইজ পোর্টাল",
      },
    ],
    author: {
      name: "ড. ফারহানা হক",
      title: "সহযোগী অধ্যাপক, রসায়ন বিভাগ, বুয়েট",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 11,
    title: "রাসায়নিক সাম্যাবস্থা ও অম্ল-ক্ষার সাম্য",
    category: "chemistry",
    level: "hsc",
    duration: "১৩ ঘন্টা",
    lessons: 18,
    students: 1420,
    rating: 4.6,
    instructor: "ড. সাবরিনা হক",
    image:
      "https://images.pexels.com/photos/5726837/pexels-photo-5726837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["ভিডিও", "ভার্চুয়াল এক্সপেরিমেন্ট"],
    description:
      "এই কোর্সে এইচএসসি শিক্ষার্থীরা রাসায়নিক সাম্যাবস্থা ও অম্ল-ক্ষার সাম্য সম্পর্কে শিখবে। ভিডিও এবং ভার্চুয়াল এক্সপেরিমেন্টের মাধ্যমে সাম্যাবস্থার নীতি, সাম্য ধ্রুবক, লে শাতেলিয়ের নীতি, অম্ল-ক্ষার সাম্য, pH স্কেল, বাফার সলিউশন সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।",
    points: 22,
    learningObjectives: [
      "রাসায়নিক সাম্যাবস্থার ধারণা ব্যাখ্যা করতে পারবে",
      "সাম্য ধ্রুবক ও এর প্রভাবক বুঝতে পারবে",
      "লে শাতেলিয়ের নীতি প্রয়োগ করতে পারবে",
      "অম্ল-ক্ষার সাম্য ও pH স্কেল ব্যাখ্যা করতে পারবে",
      "বাফার সলিউশনের কার্যপ্রণালী ও প্রয়োগ বুঝতে পারবে",
    ],
    resources: [
      {
        title: "রাসায়নিক সাম্যাবস্থা - ভিডিও লেকচার",
        url: "https://www.youtube.com/watch?v=example24",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "অম্ল-ক্ষার টাইট্রেশন - ইন্টারেক্টিভ সিমুলেশন",
        url: "https://phet.colorado.edu/bn/simulation/acid-base-solutions",
        type: "interactive",
        source: "PhET Interactive Simulations",
      },
      {
        title: "pH ও বাফার সলিউশন - অনলাইন কুইজ",
        url: "https://www.biggansala.org/quiz/ph-buffer",
        type: "interactive",
        source: "বিজ্ঞানশালা কুইজ পোর্টাল",
      },
    ],
    author: {
      name: "ড. সাবরিনা হক",
      title: "সহকারী অধ্যাপক, রসায়ন বিভাগ, জাহাঙ্গীরনগর বিশ্ববিদ্যালয়",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  // Biology
  {
    id: 12,
    title: "উদ্ভিদ ও প্রাণীর পার্থক্য",
    category: "biology",
    level: "class_6",
    duration: "৬ ঘন্টা",
    lessons: 9,
    students: 2156,
    rating: 4.7,
    instructor: "প্রফেসর আবু সাঈদ",
    image:
      "https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["এনিমেশন", "অডিও গল্প"],
    description:
      "এই কোর্সে ৬ষ্ঠ শ্রেণির শিক্ষার্থীরা উদ্ভিদ ও প্রাণীর মধ্যে পার্থক্য সম্পর্কে শিখবে। এনিমেশন এবং অডিও গল্পের মাধ্যমে উদ্ভিদ ও প্রাণীর বৈশিষ্ট্য, তাদের খাদ্য গ্রহণ পদ্ধতি, চলাচল, এবং বংশবিস্তার সম্পর্কে সহজভাবে ব্যাখ্যা করা হয়েছে।",
    points: 12,
    learningObjectives: [
      "উদ্ভিদ ও প্রাণীর বৈশিষ্ট্য চিহ্নিত করতে পারবে",
      "উদ্ভিদ ও প্রাণীর খাদ্য গ্রহণ পদ্ধতির পার্থক্য বুঝতে পারবে",
      "উদ্ভিদ ও প্রাণীর চলাচল সম্পর্কে জানতে পারবে",
      "উদ্ভিদ ও প্রাণীর বংশবিস্তার পদ্ধতি সম্পর্কে ধারণা পাবে",
    ],
    resources: [
      {
        title: "উদ্ভিদ ও প্রাণীর পার্থক্য - এনিমেটেড ভিডিও",
        url: "https://www.youtube.com/watch?v=example6",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "জীবজগতের গল্প - অডিও সিরিজ",
        url: "https://www.biggansala.org/audio/living-world-stories",
        type: "audio",
        source: "বিজ্ঞানশালা অডিও লাইব্রেরি",
      },
      {
        title: "উদ্ভিদ ও প্রাণী - অনলাইন কুইজ",
        url: "https://www.biggansala.org/quiz/plants-animals",
        type: "interactive",
        source: "বিজ্ঞানশালা কুইজ পোর্টাল",
      },
    ],
    author: {
      name: "প্রফেসর আবু সাঈদ",
      title: "অধ্যাপক, উদ্ভিদবিজ্ঞান বিভাগ, ঢাকা বিশ্ববিদ্যালয়",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 13,
    title: "কোষ ও কোষ বিভাজন",
    category: "biology",
    level: "class_9_10",
    duration: "১২ ঘন্টা",
    lessons: 16,
    students: 2350,
    rating: 4.8,
    instructor: "ড. নাজনীন আকতার",
    image:
      "https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["এনিমেশন", "ভার্চুয়াল মাইক্রোস্কোপ"],
    description:
      "এই কোর্সে ৯ম-১০ম শ্রেণির শিক্ষার্থীরা কোষ ও কোষ বিভাজন সম্পর্কে শিখবে। এনিমেশন এবং ভার্চুয়াল মাইক্রোস্কোপের মাধ্যমে কোষের গঠন, উদ্ভিদ ও প্রাণী কোষের পার্থক্য, কোষ বিভাজন (মাইটোসিস ও মিয়োসিস), এবং কোষীয় অঙ্গাণুর কার্যাবলী সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।",
    points: 20,
    learningObjectives: [
      "কোষের গঠন ও কোষীয় অঙ্গাণুর কার্যাবলী বর্ণনা করতে পারবে",
      "উদ্ভিদ ও প্রাণী কোষের মধ্যে পার্থক্য চিহ্নিত করতে পারবে",
      "মাইটোসিস ও মিয়োসিস বিভাজনের ধাপগুলো ব্যাখ্যা করতে পারবে",
      "কোষ বিভাজনের গুরুত্ব বুঝতে পারবে",
      "কোষীয় পর্যায়ে বিভিন্ন রোগের কারণ বুঝতে পারবে",
    ],
    resources: [
      {
        title: "কোষের গঠন - এনিমেটেড ভিডিও",
        url: "https://www.youtube.com/watch?v=example25",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "কোষ বিভাজন - ইন্টারেক্টিভ সিমুলেশন",
        url: "https://www.biggansala.org/interactive/cell-division",
        type: "interactive",
        source: "বিজ্ঞানশালা ইন্টারেক্টিভ পোর্টাল",
      },
      {
        title: "কোষীয় অঙ্গাণু - অনলাইন কুইজ",
        url: "https://www.biggansala.org/quiz/cell-organelles",
        type: "interactive",
        source: "বিজ্ঞানশালা কুইজ পোর্টাল",
      },
    ],
    author: {
      name: "ড. নাজনীন আকতার",
      title: "সহযোগী অধ্যাপক, প্রাণিবিদ্যা বিভাগ, ঢাকা বিশ্ববিদ্যালয়",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 14,
    title: "মানব শারীরবৃত্ত: পরিপাক ও শ্বসন তন্ত্র",
    category: "biology",
    level: "class_9_10",
    duration: "১৪ ঘন্টা",
    lessons: 18,
    students: 2150,
    rating: 4.7,
    instructor: "ড. মাহমুদা খাতুন",
    image:
      "https://images.pexels.com/photos/4226119/pexels-photo-4226119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["এনিমেশন", "ভার্চুয়াল মডেল"],
    description:
      "এই কোর্সে ৯ম-১০ম শ্রেণির শিক্ষার্থীরা মানব শারীরবৃত্তের অন্তর্গত পরিপাক ও শ্বসন তন্ত্র সম্পর্কে শিখবে। এনিমেশন এবং ভার্চুয়াল মডেলের মাধ্যমে পরিপাক তন্ত্রের গঠন ও কার্যাবলী, খাদ্য হজম প্রক্রিয়া, শ্বসন তন্ত্রের গঠন, গ্যাস বিনিময় প্রক্রিয়া, এবং সংশ্লিষ্ট রোগ ও প্রতিকার সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।",
    points: 22,
    learningObjectives: [
      "পরিপাক তন্ত্রের গঠন ও কার্যাবলী বর্ণনা করতে পারবে",
      "খাদ্য হজম প্রক্রিয়া ব্যাখ্যা করতে পারবে",
      "শ্বসন তন্ত্রের গঠন ও কার্যাবলী বর্ণনা করতে পারবে",
      "গ্যাস বিনিময় প্রক্রিয়া বুঝতে পারবে",
      "পরিপাক ও শ্বসন তন্ত্রের রোগ ও প্রতিকার সম্পর্কে জানতে পারবে",
    ],
    resources: [
      {
        title: "পরিপাক তন্ত্র - এনিমেটেড ভিডিও",
        url: "https://www.youtube.com/watch?v=example26",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "শ্বসন তন্ত্র - ইন্টারেক্টিভ মডেল",
        url: "https://www.biggansala.org/interactive/respiratory-system",
        type: "interactive",
        source: "বিজ্ঞানশালা ইন্টারেকটিভ পোর্টাল",
      },
      {
        title: "পরিপাক ও শ্বসন তন্ত্র - অনলাইন কুইজ",
        url: "https://www.biggansala.org/quiz/digestive-respiratory",
        type: "interactive",
        source: "বিজ্ঞানশালা কুইজ পোর্টাল",
      },
    ],
    author: {
      name: "ড. মাহমুদা খাতুন",
      title: "অধ্যাপক, প্রাণিবিদ্যা বিভাগ, জাহাঙ্গীরনগর বিশ্ববিদ্যালয়",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 15,
    title: "জেনেটিক্স ও বংশগতি",
    category: "biology",
    level: "hsc",
    duration: "১৬ ঘন্টা",
    lessons: 22,
    students: 1850,
    rating: 4.9,
    instructor: "ড. আবদুল্লাহ আল মামুন",
    image:
      "https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["ভিডিও", "ভার্চুয়াল ল্যাব"],
    description:
      "এই কোর্সে এইচএসসি শিক্ষার্থীরা জেনেটিক্স ও বংশগতি সম্পর্কে শিখবে। ভিডিও এবং ভার্চুয়াল ল্যাবের মাধ্যমে মেন্ডেলের সূত্র, ক্রোমোজোম ও জিন, DNA ও RNA, জিন এক্সপ্রেশন, মিউটেশন, এবং জেনেটিক ডিসঅর্ডার সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।",
    points: 25,
    learningObjectives: [
      "মেন্ডেলের সূত্র ও বংশগতির নিয়ম ব্যাখ্যা করতে পারবে",
      "ক্রোমোজোম ও জিনের গঠন ও কার্যাবলী বর্ণনা করতে পারবে",
      "DNA ও RNA এর গঠন ও কার্যাবলী বুঝতে পারবে",
      "জিন এক্সপ্রেশন ও প্রোটিন সিন্থেসিস প্রক্রিয়া ব্যাখ্যা করতে পারবে",
      "মিউটেশন ও জেনেটিক ডিসঅর্ডার সম্পর্কে জানতে পারবে",
    ],
    resources: [
      {
        title: "মেন্ডেলের সূত্র - ভিডিও লেকচার",
        url: "https://www.youtube.com/watch?v=example27",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "DNA ও প্রোটিন সিন্থেসিস - এনিমেশন",
        url: "https://www.biggansala.org/animation/dna-protein-synthesis",
        type: "video",
        source: "বিজ্ঞানশালা এনিমেশন লাইব্রেরি",
      },
      {
        title: "জেনেটিক্স - অনলাইন কুইজ",
        url: "https://www.biggansala.org/quiz/genetics",
        type: "interactive",
        source: "বিজ্ঞানশালা কুইজ পোর্টাল",
      },
    ],
    author: {
      name: "ড. আবদুল্লাহ আল মামুন",
      title: "অধ্যাপক, জেনেটিক ইঞ্জিনিয়ারিং এন্ড বায়োটেকনোলজি, ঢাকা বিশ্ববিদ্যালয়",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  // Mathematics
  {
    id: 16,
    title: "জ্যামিতি ও পরিমাপ",
    category: "mathematics",
    level: "class_6",
    duration: "১০ ঘন্টা",
    lessons: 15,
    students: 1876,
    rating: 4.6,
    instructor: "ড. তাসনিম আহমেদ",
    image:
      "https://images.pexels.com/photos/2090658/pexels-photo-2090658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["ভার্চুয়াল টুল", "চিত্র"],
    description:
      "এই কোর্সে ৬ষ্ঠ শ্রেণির শিক্ষার্থীরা জ্যামিতি ও পরিমাপের মৌলিক ধারণাগুলো সম্পর্কে শিখবে। ভার্চুয়াল টুল এবং চিত্রের মাধ্যমে কোণ, ত্রিভুজ, চতুর্ভুজ, বৃত্ত, এবং বিভিন্ন আকৃতির পরিমাপ সম্পর্কে সহজভাবে ব্যাখ্যা করা হয়েছে।",
    points: 15,
    learningObjectives: [
      "বিভিন্ন ধরনের কোণ চিহ্নিত করতে পারবে",
      "ত্রিভুজ, চতুর্ভুজ, বৃত্তের বৈশিষ্ট্য বর্ণনা করতে পারবে",
      "বিভিন্ন আকৃতির পরিমাপ নির্ণয় করতে পারবে",
      "জ্যামিতিক সমস্যা সমাধান করতে পারবে",
    ],
    resources: [
      {
        title: "জ্যামিতি - ইন্টারেক্টিভ টুল",
        url: "https://www.geogebra.org/geometry",
        type: "interactive",
        source: "GeoGebra",
      },
      {
        title: "জ্যামিতি ও পরিমাপ - ভিডিও লেকচার",
        url: "https://www.youtube.com/watch?v=example7",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "জ্যামিতি - অনলাইন কুইজ",
        url: "https://www.biggansala.org/quiz/geometry",
        type: "interactive",
        source: "বিজ্ঞানশালা কুইজ পোর্টাল",
      },
    ],
    author: {
      name: "ড. তাসনিম আহমেদ",
      title: "সহকারী অধ্যাপক, গণিত বিভাগ, ঢাকা বিশ্ববিদ্যালয়",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 17,
    title: "বীজগণিত: সমীকরণ ও অসমতা",
    category: "mathematics",
    level: "class_8",
    duration: "১২ ঘন্টা",
    lessons: 16,
    students: 2150,
    rating: 4.7,
    instructor: "ড. আবদুল্লাহ আল মামুন",
    image:
      "https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["ভিডিও", "ইন্টারেক্টিভ প্রবলেম"],
    description:
      "এই কোর্সে ৮ম শ্রেণির শিক্ষার্থীরা বীজগণিতের অন্তর্গত সমীকরণ ও অসমতা সম্পর্কে শিখবে। ভিডিও এবং ইন্টারেক্টিভ প্রবলেমের মাধ্যমে একঘাত সমীকরণ, দ্বিঘাত সমীকরণ, সমীকরণ সিস্টেম, একঘাত অসমতা, এবং সমীকরণ ও অসমতার প্রায়োগিক সমস্যা সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।",
    points: 18,
    learningObjectives: [
      "একঘাত ও দ্বিঘাত সমীকরণ সমাধান করতে পারবে",
      "সমীকরণ সিস্টেম সমাধান করতে পারবে",
      "একঘাত অসমতা সমাধান করতে পারবে",
      "সমীকরণ ও অসমতার প্রায়োগিক সমস্যা সমাধান করতে পারবে",
      "গ্রাফের মাধ্যমে সমীকরণ ও অসমতা উপস্থাপন করতে পারবে",
    ],
    resources: [
      {
        title: "সমীকরণ ও অসমতা - ভিডিও লেকচার সিরিজ",
        url: "https://www.youtube.com/watch?v=example28",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "সমীকরণ সমাধান - ইন্টারেক্টিভ টুল",
        url: "https://www.biggansala.org/interactive/equation-solver",
        type: "interactive",
        source: "বিজ্ঞানশালা ইন্টারেক্টিভ পোর্টাল",
      },
      {
        title: "সমীকরণ ও অসমতা - অনলাইন কুইজ",
        url: "https://www.biggansala.org/quiz/equations-inequalities",
        type: "interactive",
        source: "বিজ্ঞানশালা কুইজ পোর্টাল",
      },
    ],
    author: {
      name: "ড. আবদুল্লাহ আল মামুন",
      title: "সহযোগী অধ্যাপক, গণিত বিভাগ, ঢাকা বিশ্ববিদ্যালয়",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 18,
    title: "ত্রিকোণমিতি ও পিথাগোরাস",
    category: "mathematics",
    level: "class_9_10",
    duration: "১৪ ঘন্টা",
    lessons: 18,
    students: 1950,
    rating: 4.8,
    instructor: "ড. নাজমুল হক",
    image:
      "https://images.pexels.com/photos/8471835/pexels-photo-8471835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["ভিডিও", "ভার্চুয়াল টুল"],
    description:
      "এই কোর্সে ৯ম-১০ম শ্রেণির শিক্ষার্থীরা ত্রিকোণমিতি ও পিথাগোরাস সম্পর্কে শিখবে। ভিডিও এবং ভার্চুয়াল টুলের মাধ্যমে ত্রিকোণমিতিক অনুপাত, ত্রিকোণমিতিক সমীকরণ, পিথাগোরাসের উপপাদ্য, এবং ত্রিকোণমিতির প্রায়োগিক সমস্যা সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।",
    points: 22,
    learningObjectives: [
      "ত্রিকোণমিতিক অনুপাত (sin, cos, tan) ব্যাখ্যা করতে পারবে",
      "পিথাগোরাসের উপপাদ্য প্রয়োগ করতে পারবে",
      "ত্রিকোণমিতিক সমীকরণ সমাধান করতে পারবে",
      "ত্রিকোণমিতির প্রায়োগিক সমস্যা সমাধান করতে পারবে",
      "উচ্চতা ও দূরত্ব নির্ণয়ে ত্রিকোণমিতি প্রয়োগ করতে পারবে",
    ],
    resources: [
      {
        title: "ত্রিকোণমিতি - ভিডিও লেকচার সিরিজ",
        url: "https://www.youtube.com/watch?v=example29",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "ত্রিকোণমিতিক অনুপাত - ইন্টারেক্টিভ টুল",
        url: "https://www.biggansala.org/interactive/trigonometry",
        type: "interactive",
        source: "বিজ্ঞানশালা ইন্টারেক্টিভ পোর্টাল",
      },
      {
        title: "পিথাগোরাসের উপপাদ্য - অনলাইন কুইজ",
        url: "https://www.biggansala.org/quiz/pythagoras",
        type: "interactive",
        source: "বিজ্ঞানশালা কুইজ পোর্টাল",
      },
    ],
    author: {
      name: "ড. নাজমুল হক",
      title: "অধ্যাপক, গণিত বিভাগ, বুয়েট",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 19,
    title: "ক্যালকুলাস: ডিফারেনশিয়াল ও ইন্টিগ্রাল",
    category: "mathematics",
    level: "hsc",
    duration: "১৮ ঘন্টা",
    lessons: 24,
    students: 1650,
    rating: 4.9,
    instructor: "ড. মাহমুদুল হাসান",
    image:
      "https://images.pexels.com/photos/6238118/pexels-photo-6238118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["ভিডিও", "ইন্টারেক্টিভ প্রবলেম"],
    description:
      "এই কোর্সে এইচএসসি শিক্ষার্থীরা ক্যালকুলাসের মৌলিক ধারণাগুলো সম্পর্কে শিখবে। ভিডিও এবং ইন্টারেক্টিভ প্রবলেমের মাধ্যমে লিমিট, কন্টিনিউটি, ডিফারেনশিয়েশন, ইন্টিগ্রেশন, এবং ক্যালকুলাসের প্রায়োগিক সমস্যা সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।",
    points: 25,
    learningObjectives: [
      "লিমিট ও কন্টিনিউটি ব্যাখ্যা করতে পারবে",
      "ডিফারেনশিয়েশনের নিয়মাবলী প্রয়োগ করতে পারবে",
      "ইন্টিগ্রেশনের নিয়মাবলী প্রয়োগ করতে পারবে",
      "ক্যালকুলাসের প্রায়োগিক সমস্যা সমাধান করতে পারবে",
      "ডিফারেনশিয়াল ইকুয়েশন সমাধান করতে পারবে",
    ],
    resources: [
      {
        title: "ক্যালকুলাস - ভিডিও লেকচার সিরিজ",
        url: "https://www.youtube.com/watch?v=example30",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "ডিফারেনশিয়েশন ও ইন্টিগ্রেশন - ইন্টারেক্টিভ টুল",
        url: "https://www.biggansala.org/interactive/calculus",
        type: "interactive",
        source: "বিজ্ঞানশালা ইন্টারেক্টিভ পোর্টাল",
      },
      {
        title: "ক্যালকুলাস - অনলাইন কুইজ",
        url: "https://www.biggansala.org/quiz/calculus",
        type: "interactive",
        source: "বিজ্ঞানশালা কুইজ পোর্টাল",
      },
    ],
    author: {
      name: "ড. মাহমুদুল হাসান",
      title: "অধ্যাপক, গণিত বিভাগ, ঢাকা বিশ্ববিদ্যালয়",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  // General Science
  {
    id: 20,
    title: "আমাদের পৃথিবী, সৌরজগৎ",
    category: "general_science",
    level: "primary",
    duration: "৫ ঘন্টা",
    lessons: 8,
    students: 3245,
    rating: 4.9,
    instructor: "ড. নাজনীন আকতার",
    image: "https://images.pexels.com/photos/5439/earth-space.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["এনিমেশন", "গেম"],
    description:
      "এই কোর্সে প্রাথমিক শ্রেণির শিক্ষার্থীরা আমাদের পৃথিবী ও সৌরজগৎ সম্পর্কে শিখবে। এনিমেশন এবং গেমের মাধ্যমে পৃথিবীর গঠন, সৌরজগতের গ্রহগুলো, দিন-রাত হওয়ার কারণ, এবং ঋতু পরিবর্তন সম্পর্কে সহজভাবে ব্যাখ্যা করা হয়েছে।",
    points: 10,
    learningObjectives: [
      "পৃথিবীর গঠন সম্পর্কে জানতে পারবে",
      "সৌরজগতের গ্রহগুলো চিহ্নিত করতে পারবে",
      "দিন-রাত হওয়ার কারণ বুঝতে পারবে",
      "ঋতু পরিবর্তনের কারণ ব্যাখ্যা করতে পারবে",
    ],
    resources: [
      {
        title: "সৌরজগৎ - এনিমেটেড ভিডিও",
        url: "https://www.youtube.com/watch?v=example8",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "গ্রহ খোঁজা - অনলাইন গেম",
        url: "https://www.biggansala.org/games/planet-explorer",
        type: "interactive",
        source: "বিজ্ঞানশালা গেম পোর্টাল",
      },
      {
        title: "সৌরজগৎ - ইন্টারেক্টিভ মডেল",
        url: "https://phet.colorado.edu/bn/simulation/my-solar-system",
        type: "interactive",
        source: "PhET Interactive Simulations",
      },
    ],
    author: {
      name: "ড. নাজনীন আকতার",
      title: "জ্যোতির্বিজ্ঞানী, বাংলাদেশ স্পেস রিসার্চ অ্যান্ড রিমোট সেন্সিং অর্গানাইজেশন (স্পারসো)",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 21,
    title: "জলবায়ু ও প্রাকৃতিক দুর্যোগ",
    category: "general_science",
    level: "class_6",
    duration: "৮ ঘন্টা",
    lessons: 12,
    students: 2450,
    rating: 4.7,
    instructor: "ড. মাহমুদা খাতুন",
    image:
      "https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["ভিডিও", "ইনফোগ্রাফিক"],
    description:
      "এই কোর্সে ৬ষ্ঠ শ্রেণির শিক্ষার্থীরা জলবায়ু ও প্রাকৃতিক দুর্যোগ সম্পর্কে শিখবে। ভিডিও এবং ইনফোগ্রাফিকের মাধ্যমে জলবায়ুর উপাদান, জলবায়ু পরিবর্তন, বিভিন্ন প্রাকৃতিক দুর্যোগ (বন্যা, ঘূর্ণিঝড়, ভূমিকম্প), এবং দুর্যোগ মোকাবেলার উপায় সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।",
    points: 15,
    learningObjectives: [
      "জলবায়ুর উপাদান ও জলবায়ু পরিবর্তনের কারণ ব্যাখ্যা করতে পারবে",
      "বিভিন্ন প্রাকৃতিক দুর্যোগের কারণ ও প্রভাব বুঝতে পারবে",
      "বাংলাদেশে প্রাকৃতিক দুর্যোগের প্রভাব সম্পর্কে জানতে পারবে",
      "প্রাকৃতিক দুর্যোগ মোকাবেলার উপায় শিখতে পারবে",
      "জলবায়ু পরিবর্তন রোধে করণীয় সম্পর্কে জানতে পারবে",
    ],
    resources: [
      {
        title: "জলবায়ু পরিবর্তন - ভিডিও লেকচার",
        url: "https://www.youtube.com/watch?v=example31",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "প্রাকৃতিক দুর্যোগ - ইন্টারেক্টিভ ম্যাপ",
        url: "https://www.biggansala.org/interactive/natural-disasters",
        type: "interactive",
        source: "বিজ্ঞানশালা ইন্টারেক্টিভ পোর্টাল",
      },
      {
        title: "জলবায়ু ও প্রাকৃতিক দুর্যোগ - অনলাইন কুইজ",
        url: "https://www.biggansala.org/quiz/climate-disasters",
        type: "interactive",
        source: "বিজ্ঞানশালা কুইজ পোর্টাল",
      },
    ],
    author: {
      name: "ড. মাহমুদা খাতুন",
      title: "পরিবেশ বিজ্ঞানী, জাহাঙ্গীরনগর বিশ্ববিদ্যালয়",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 22,
    title: "বিজ্ঞানী ও আবিষ্কার",
    category: "general_science",
    level: "all",
    duration: "১০ ঘন্টা",
    lessons: 15,
    students: 3150,
    rating: 4.9,
    instructor: "ড. আনিসুর রহমান",
    image:
      "https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["গল্প", "ভিডিও"],
    description:
      "এই কোর্সে সকল বয়সের শিক্ষার্থীরা বিখ্যাত বিজ্ঞানী ও তাদের আবিষ্কার সম্পর্কে শিখবে। গল্প এবং ভিডিওর মাধ্যমে আইজাক নিউটন, আলবার্ট আইনস্টাইন, মেরি কুরি, চার্লস ডারউইন, জগদীশচন্দ্র বসু সহ বিখ্যাত বিজ্ঞানীদের জীবনী ও আবিষ্কার সম্পর্কে আকর্ষণীয়ভাবে আলোচনা করা হয়েছে।",
    points: 18,
    learningObjectives: [
      "বিখ্যাত বিজ্ঞানীদের জীবনী ও অবদান সম্পর্কে জানতে পারবে",
      "বিজ্ঞানের বিভিন্ন শাখায় গুরুত্বপূর্ণ আবিষ্কার সম্পর্কে জানতে পারবে",
      "বাংলাদেশি বিজ্ঞানীদের অবদান সম্পর্কে জানতে পারবে",
      "বিজ্ঞানীদের জীবন থেকে অনুপ্রেরণা নিতে পারবে",
      "বিজ্ঞানের ইতিহাস ও ক্রমবিকাশ সম্পর্কে ধারণা পাবে",
    ],
    resources: [
      {
        title: "বিখ্যাত বিজ্ঞানীদের গল্প - ভিডিও সিরিজ",
        url: "https://www.youtube.com/watch?v=example32",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "বিজ্ঞানীদের আবিষ্কার - ইন্টারেক্টিভ টাইমলাইন",
        url: "https://www.biggansala.org/interactive/scientists-timeline",
        type: "interactive",
        source: "বিজ্ঞানশালা ইন্টারেক্টিভ পোর্টাল",
      },
      {
        title: "বিজ্ঞানী ও আবিষ্কার - অনলাইন কুইজ",
        url: "https://www.biggansala.org/quiz/scientists-inventions",
        type: "interactive",
        source: "বিজ্ঞানশালা কুইজ পোর্টাল",
      },
    ],
    author: {
      name: "ড. আনিসুর রহমান",
      title: "বিজ্ঞান ইতিহাসবিদ, ঢাকা বিশ্ববিদ্যালয়",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 23,
    title: "বিজ্ঞান ও প্রযুক্তি আবিষ্কার",
    category: "general_science",
    level: "class_9_10",
    duration: "১২ ঘন্টা",
    lessons: 16,
    students: 1950,
    rating: 4.8,
    instructor: "ড. তানভীর আহমেদ",
    image:
      "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["ভিডিও", "ইনফোগ্রাফিক"],
    description:
      "এই কোর্সে ৯ম-১০ম শ্রেণির শিক্ষার্থীরা বিজ্ঞান ও প্রযুক্তির আধুনিক আবিষ্কার সম্পর্কে শিখবে। ভিডিও এবং ইনফোগ্রাফিকের মাধ্যমে কম্পিউটার, ইন্টারনেট, মোবাইল ফোন, কৃত্রিম বুদ্ধিমত্তা, রোবোটিক্স, নানো টেকনোলজি, জেনেটিক ইঞ্জিনিয়ারিং সহ আধুনিক প্রযুক্তির আবিষ্কার ও প্রভাব সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।",
    points: 20,
    learningObjectives: [
      "আধুনিক প্রযুক্তির আবিষ্কার ও বিকাশ সম্পর্কে জানতে পারবে",
      "কম্পিউটার ও ইন্টারনেটের বিকাশ ও প্রভাব বুঝতে পারবে",
      "কৃত্রিম বুদ্ধিমত্তা, রোবোটিক্স, নানো টেকনোলজি সম্পর্কে ধারণা পাবে",
      "জেনেটিক ইঞ্জিনিয়ারিং ও জীব প্রযুক্তির প্রয়োগ সম্পর্কে জানতে পারবে",
      "প্রযুক্তির সামাজিক ও নৈতিক প্রভাব সম্পর্কে সচেতন হবে",
    ],
    resources: [
      {
        title: "আধুনিক প্রযুক্তি - ভিডিও লেকচার সিরিজ",
        url: "https://www.youtube.com/watch?v=example33",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "প্রযুক্তির বিকাশ - ইন্টারেক্টিভ টাইমলাইন",
        url: "https://www.biggansala.org/interactive/technology-timeline",
        type: "interactive",
        source: "বিজ্ঞানশালা ইন্টারেক্টিভ পোর্টাল",
      },
      {
        title: "বিজ্ঞান ও প্রযুক্তি - অনলাইন কুইজ",
        url: "https://www.biggansala.org/quiz/science-technology",
        type: "interactive",
        source: "বিজ্ঞানশালা কুইজ পোর্টাল",
      },
    ],
    author: {
      name: "ড. তানভীর আহমেদ",
      title: "প্রযুক্তি বিশেষজ্ঞ, বাংলাদেশ কম্পিউটার কাউন্সিল",
      avatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  // Unique Courses from learn.txt (originally marked as from learn2.txt but part of learn.txt)
  {
    id: 24,
    title: "ছড়া, গল্প, শব্দ গঠন",
    category: "bangla",
    level: "primary",
    duration: "৪ ঘন্টা",
    lessons: 10,
    students: 4532,
    rating: 4.8,
    instructor: "ফারহানা ইসলাম",
    image:
      "https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["অডিও গল্প", "গেম"],
    description:
      "এই কোর্সে প্রাথমিক শ্রেণির শিক্ষার্থীরা বাংলা ভাষার মৌলিক দিকগুলো সম্পর্কে শিখবে। অডিও গল্প এবং গেমের মাধ্যমে ছড়া, গল্প, এবং শব্দ গঠন সম্পর্কে আকর্ষণীয়ভাবে ব্যাখ্যা করা হয়েছে।",
    points: 8,
    learningObjectives: [
      "বাংলা ছড়া ও গল্প শুনে বুঝতে পারবে",
      "নতুন শব্দ শিখতে পারবে",
      "শব্দ গঠনের নিয়ম জানতে পারবে",
      "সহজ বাক্য গঠন করতে পারবে",
    ],
    resources: [
      {
        title: "বাংলা ছড়া - অডিও সংকলন",
        url: "https://www.biggansala.org/audio/bangla-rhymes",
        type: "audio",
        source: "বিজ্ঞানশালা অডিও লাইব্রেরি",
      },
      {
        title: "শব্দ শেখা - অনলাইন গেম",
        url: "https://www.biggansala.org/games/word-learning",
        type: "interactive",
        source: "বিজ্ঞানশালা গেম পোর্টাল",
      },
      {
        title: "ছোটদের গল্প - ভিডিও সিরিজ",
        url: "https://www.youtube.com/watch?v=example9",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
    ],
    author: {
      name: "ফারহানা ইসলাম",
      title: "সিনিয়র শিক্ষক, বাংলা বিভাগ, ঢাকা এডুকেশন বোর্ড",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 25,
    title: "রাসায়নিক বিক্রিয়া ও পর্যায় সারণি",
    category: "chemistry",
    level: "class_9_10",
    duration: "১২ ঘন্টা",
    lessons: 18,
    students: 2340,
    rating: 4.9,
    instructor: "ড. ফারহানা হক",
    image:
      "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["ভার্চুয়াল ল্যাব", "কুইজ"],
    description:
      "এই কোর্সে ৯ম-১০ম শ্রেণির শিক্ষার্থীরা রাসায়নিক বিক্রিয়া ও পর্যায় সারণি সম্পর্কে শিখবে। ভার্চুয়াল ল্যাব এবং কুইজের মাধ্যমে রাসায়নিক বিক্রিয়ার প্রকারভেদ, সমীকরণ, পর্যায় সারণির গঠন, এবং মৌলের বৈশিষ্ট্য সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।",
    points: 22,
    learningObjectives: [
      "রাসায়নিক বিক্রিয়ার প্রকারভেদ চিহ্নিত করতে পারবে",
      "রাসায়নিক সমীকরণ লিখতে ও সমতা বিধান করতে পারবে",
      "পর্যায় সারণির গঠন ব্যাখ্যা করতে পারবে",
      "পর্যায় সারণিতে মৌলের অবস্থান থেকে তার বৈশিষ্ট্য অনুমান করতে পারবে",
      "বিভিন্ন রাসায়নিক বিক্রিয়ার প্রয়োগ সম্পর্কে জানতে পারবে",
    ],
    resources: [
      {
        title: "রাসায়নিক বিক্রিয়া - ভার্চুয়াল ল্যাব",
        url: "https://phet.colorado.edu/bn/simulation/reactants-products-and-leftovers",
        type: "interactive",
        source: "PhET Interactive Simulations",
      },
      {
        title: "পর্যায় সারণি - ইন্টারেক্টিভ মডেল",
        url: "https://www.biggansala.org/interactive/periodic-table",
        type: "interactive",
        source: "বিজ্ঞানশালা ইন্টারেক্টিভ পোর্টাল",
      },
      {
        title: "রাসায়নিক বিক্রিয়া ও পর্যায় সারণি - অনলাইন কুইজ",
        url: "https://www.biggansala.org/quiz/chemical-reactions-periodic-table",
        type: "interactive",
        source: "বিজ্ঞানশালা কুইজ পোর্টাল",
      },
    ],
    author: {
      name: "ড. ফারহানা হক",
      title: "সহযোগী অধ্যাপক, রসায়ন বিভাগ, বুয়েট",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 26,
    title: "অ্যাসিড-বেস ও স্টোকিওমেট্রি",
    category: "chemistry",
    level: "hsc",
    duration: "১৫ ঘন্টা",
    lessons: 20,
    students: 1560,
    rating: 4.6,
    instructor: "ড. আবদুল্লাহ আল মামুন",
    image:
      "https://images.pexels.com/photos/5726837/pexels-photo-5726837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["ব্লগ", "এক্সপেরিমেন্ট"],
    description:
      "এই কোর্সে এইচএসসি শিক্ষার্থীরা অ্যাসিড-বেস ও স্টোকিওমেট্রি সম্পর্কে শিখবে। ব্লগ এবং এক্সপেরিমেন্টের মাধ্যমে অ্যাসিড-বেসের ধারণা, pH স্কেল, নিউট্রালাইজেশন, স্টোকিওমেট্রিক ক্যালকুলেশন, এবং মোল কনসেপ্ট সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।",
    points: 25,
    learningObjectives: [
      "অ্যাসিড-বেসের বিভিন্ন তত্ত্ব ব্যাখ্যা করতে পারবে",
      "pH স্কেল ব্যবহার করে অ্যাসিড-বেসের তীব্রতা নির্ণয় করতে পারবে",
      "নিউট্রালাইজেশন বিক্রিয়া ব্যাখ্যা করতে পারবে",
      "স্টোকিওমেট্রিক ক্যালকুলেশন করতে পারবে",
      "মোল কনসেপ্ট ব্যবহার করে রাসায়নিক সমস্যা সমাধান করতে পারবে",
    ],
    resources: [
      {
        title: "অ্যাসিড-বেস - ব্লগ সিরিজ",
        url: "https://www.biggansala.org/blog/acid-base",
        type: "article",
        source: "বিজ্ঞানশালা ব্লগ",
      },
      {
        title: "অ্যাসিড-বেস টাইট্রেশন - ভার্চুয়াল ল্যাব",
        url: "https://phet.colorado.edu/bn/simulation/acid-base-solutions",
        type: "interactive",
        source: "PhET Interactive Simulations",
      },
      {
        title: "স্টোকিওমেট্রি - ভিডিও লেকচার সিরিজ",
        url: "https://www.youtube.com/watch?v=example13",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
    ],
    author: {
      name: "ড. আবদুল্লাহ আল মামুন",
      title: "অধ্যাপক, রসায়ন বিভাগ, জাহাঙ্গীরনগর বিশ্ববিদ্যালয়",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 27,
    title: "মানবদেহের অঙ্গপ্রত্যঙ্গ",
    category: "biology",
    level: "class_7",
    duration: "৯ ঘন্টা",
    lessons: 14,
    students: 1950,
    rating: 4.8,
    instructor: "ড. নাজমুল হক",
    image:
      "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["পাজল গেম", "ইনফোগ্রাফিক"],
    description:
      "এই কোর্সে ৭ম শ্রেণির শিক্ষার্থীরা মানবদেহের বিভিন্ন অঙ্গপ্রত্যঙ্গ সম্পর্কে শিখবে। পাজল গেম এবং ইনফোগ্রাফিকের মাধ্যমে হৃৎপিণ্ড, ফুসফুস, যকৃত, কিডনি, পাকস্থলী, মস্তিষ্ক ইত্যাদি অঙ্গের গঠন ও কার্যাবলী সম্পর্কে আকর্ষণীয়ভাবে ব্যাখ্যা করা হয়েছে।",
    points: 18,
    learningObjectives: [
      "মানবদেহের প্রধান অঙ্গপ্রত্যঙ্গ চিহ্নিত করতে পারবে",
      "বিভিন্ন অঙ্গের গঠন ও কার্যাবলী ব্যাখ্যা করতে পারবে",
      "অঙ্গপ্রত্যঙ্গের মধ্যে সম্পর্ক বুঝতে পারবে",
      "স্বাস্থ্যকর জীবনযাপনের জন্য অঙ্গপ্রত্যঙ্গের যত্ন নেওয়ার উপায় জানতে পারবে",
    ],
    resources: [
      {
        title: "মানবদেহের অঙ্গপ্রত্যঙ্গ - ইন্টারেক্টিভ পাজল",
        url: "https://www.biggansala.org/games/human-body-puzzle",
        type: "interactive",
        source: "বিজ্ঞানশালা গেম পোর্টাল",
      },
      {
        title: "মানবদেহের অঙ্গপ্রত্যঙ্গ - ইনফোগ্রাফিক সিরিজ",
        url: "https://www.biggansala.org/infographics/human-body-organs",
        type: "article",
        source: "বিজ্ঞানশালা ডিজিটাল লাইব্রেরি",
      },
      {
        title: "মানবদেহের অঙ্গপ্রত্যঙ্গ - ভিডিও লেকচার",
        url: "https://www.youtube.com/watch?v=example14",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
    ],
    author: {
      name: "ড. নাজমুল হক",
      title: "সহযোগী অধ্যাপক, প্রাণিবিদ্যা বিভাগ, ঢাকা বিশ্ববিদ্যালয়",
      avatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 28,
    title: "রক্ত সঞ্চালন ও শ্বাসক্রিয়া",
    category: "biology",
    level: "class_9_10",
    duration: "১১ ঘন্টা",
    lessons: 16,
    students: 2250,
    rating: 4.7,
    instructor: "ড. শাহনাজ পারভীন",
    image:
      "https://images.pexels.com/photos/4226119/pexels-photo-4226119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["ভিডিও", "কুইজ"],
    description:
      "এই কোর্সে ৯ম-১০ম শ্রেণির শিক্ষার্থীরা রক্ত সঞ্চালন ও শ্বাসক্রিয়া সম্পর্কে শিখবে। ভিডিও এবং কুইজের মাধ্যমে হৃৎপিণ্ডের গঠন ও কার্যপ্রণালী, রক্তের উপাদান, রক্ত সঞ্চালন পথ, ফুসফুসের গঠন, শ্বাসক্রিয়ার ধাপসমূহ, এবং গ্যাস বিনিময় সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।",
    points: 20,
    learningObjectives: [
      "হৃৎপিণ্ডের গঠন ও কার্যপ্রণালী ব্যাখ্যা করতে পারবে",
      "রক্তের উপাদান ও কাজ সম্পর্কে জানতে পারবে",
      "রক্ত সঞ্চালন পথ বর্ণনা করতে পারবে",
      "ফুসফুসের গঠন ও কার্যপ্রণালী ব্যাখ্যা করতে পারবে",
      "শ্বাসক্রিয়ার ধাপসমূহ বর্ণনা করতে পারবে",
    ],
    resources: [
      {
        title: "রক্ত সঞ্চালন ও শ্বাসক্রিয়া - ভিডিও সিরিজ",
        url: "https://www.youtube.com/watch?v=example15",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "হৃৎপিণ্ড ও ফুসফুস - ইন্টারেক্টিভ মডেল",
        url: "https://www.biggansala.org/interactive/heart-lungs",
        type: "interactive",
        source: "বিজ্ঞানশালা ইন্টারেক্টিভ পোর্টাল",
      },
      {
        title: "রক্ত সঞ্চালন ও শ্বাসক্রিয়া - অনলাইন কুইজ",
        url: "https://www.biggansala.org/quiz/circulation-respiration",
        type: "interactive",
        source: "বিজ্ঞানশালা কুইজ পোর্টাল",
      },
    ],
    author: {
      name: "ড. শাহনাজ পারভীন",
      title: "অধ্যাপক, প্রাণিবিদ্যা বিভাগ, জাহাঙ্গীরনগর বিশ্ববিদ্যালয়",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 29,
    title: "জেনেটিক্স ও কোষ বিভাজন",
    category: "biology",
    level: "hsc",
    duration: "১৪ ঘন্টা",
    lessons: 18,
    students: 1680,
    rating: 4.9,
    instructor: "ড. মাহমুদা বেগম",
    image:
      "https://images.pexels.com/photos/3825567/pexels-photo-3825567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["ভার্চুয়াল মডেল", "ভিডিও লেকচার"],
    description:
      "এই কোর্সে এইচএসসি শিক্ষার্থীরা জেনেটিক্স ও কোষ বিভাজন সম্পর্কে শিখবে। ভার্চুয়াল মডেল এবং ভিডিও লেকচারের মাধ্যমে DNA ও RNA এর গঠন, জিন, ক্রোমোজোম, মিওসিস, মাইটোসিস, মেন্ডেলের সূত্র, বংশগতি, জেনেটিক ডিসঅর্ডার ইত্যাদি সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।",
    points: 25,
    learningObjectives: [
      "DNA ও RNA এর গঠন ও কাজ ব্যাখ্যা করতে পারবে",
      "মিওসিস ও মাইটোসিস কোষ বিভাজনের পার্থক্য বুঝতে পারবে",
      "মেন্ডেলের সূত্র ব্যাখ্যা করতে পারবে",
      "বংশগতির নিয়ম ও প্যাটার্ন বুঝতে পারবে",
      "জেনেটিক ডিসঅর্ডার সম্পর্কে জানতে পারবে",
    ],
    resources: [
      {
        title: "DNA ও RNA - ভার্চুয়াল মডেল",
        url: "https://www.biggansala.org/interactive/dna-rna",
        type: "interactive",
        source: "বিজ্ঞানশালা ইন্টারেক্টিভ পোর্টাল",
      },
      {
        title: "কোষ বিভাজন - এনিমেটেড ভিডিও",
        url: "https://www.youtube.com/watch?v=example16",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "মেন্ডেলের সূত্র - ভিডিও লেকচার",
        url: "https://www.youtube.com/watch?v=example17",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "জেনেটিক্স - অনলাইন কুইজ",
        url: "https://www.biggansala.org/quiz/genetics",
        type: "interactive",
        source: "বিজ্ঞানশালা কুইজ পোর্টাল",
      },
    ],
    author: {
      name: "ড. মাহমুদা বেগম",
      title: "অধ্যাপক, জেনেটিক ইঞ্জিনিয়ারিং এন্ড বায়োটেকনোলজি, ঢাকা বিশ্ববিদ্যালয়",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 30,
    title: "গুন, ভাগ, ভগ্নাংশ",
    category: "mathematics",
    level: "class_5",
    duration: "৮ ঘন্টা",
    lessons: 12,
    students: 3250,
    rating: 4.8,
    instructor: "ড. সাবিনা ইয়াসমিন",
    image:
      "https://images.pexels.com/photos/3808159/pexels-photo-3808159.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["গেম", "অডিও কুইজ"],
    description:
      "এই কোর্সে ৫ম শ্রেণির শিক্ষার্থীরা গুন, ভাগ, ও ভগ্নাংশের মৌলিক ধারণাগুলো সম্পর্কে শিখবে। গেম এবং অডিও কুইজের মাধ্যমে গুন ও ভাগের নিয়ম, ভগ্নাংশের যোগ-বিয়োগ-গুন-ভাগ, দশমিক সংখ্যা, এবং শতকরা সম্পর্কে সহজভাবে ব্যাখ্যা করা হয়েছে।",
    points: 12,
    learningObjectives: [
      "গুন ও ভাগের নিয়ম ব্যবহার করে সমস্যা সমাধান করতে পারবে",
      "ভগ্নাংশের যোগ-বিয়োগ-গুন-ভাগ করতে পারবে",
      "ভগ্নাংশ ও দশমিক সংখ্যার মধ্যে রূপান্তর করতে পারবে",
      "শতকরা সম্পর্কিত সমস্যা সমাধান করতে পারবে",
    ],
    resources: [
      {
        title: "গুন-ভাগ - ইন্টারেক্টিভ গেম",
        url: "https://www.biggansala.org/games/multiplication-division",
        type: "interactive",
        source: "বিজ্ঞানশালা গেম পোর্টাল",
      },
      {
        title: "ভগ্নাংশ - অডিও কুইজ সিরিজ",
        url: "https://www.biggansala.org/audio/fraction-quiz",
        type: "audio",
        source: "বিজ্ঞানশালা অডিও লাইব্রেরি",
      },
      {
        title: "ভগ্নাংশ ও দশমিক - ভিডিও লেকচার",
        url: "https://www.youtube.com/watch?v=example18",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
    ],
    author: {
      name: "ড. সাবিনা ইয়াসমিন",
      title: "সিনিয়র শিক্ষক, গণিত বিভাগ, ঢাকা এডুকেশন বোর্ড",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 31,
    title: "ক্যালকুলাস ও গাণিতিক যুক্তি",
    category: "mathematics",
    level: "hsc",
    duration: "১৬ ঘন্টা",
    lessons: 24,
    students: 1450,
    rating: 4.9,
    instructor: "ড. শাহনাজ পারভীন",
    image:
      "https://images.pexels.com/photos/6238118/pexels-photo-6238118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["ইন্টার‍্যাকটিভ সমাধান", "ব্লগ"],
    description:
      "এই কোর্সে এইচএসসি শিক্ষার্থীরা ক্যালকুলাস ও গাণিতিক যুক্তি সম্পর্কে শিখবে। ইন্টার‍্যাকটিভ সমাধান এবং ব্লগের মাধ্যমে ডিফারেনশিয়াল ক্যালকুলাস, ইন্টিগ্রাল ক্যালকুলাস, লিমিট, ডেরিভেটিভ, ইন্টিগ্রেশন, গাণিতিক যুক্তি, ইনডাকশন, এবং প্রুফ টেকনিক সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।",
    points: 25,
    learningObjectives: [
      "লিমিট ও কন্টিনিউটি সম্পর্কে ধারণা পাবে",
      "ডেরিভেটিভ নির্ণয় ও প্রয়োগ করতে পারবে",
      "ইন্টিগ্রেশন টেকনিক ব্যবহার করতে পারবে",
      "গাণিতিক যুক্তি ও ইনডাকশন প্রুফ করতে পারবে",
      "ক্যালকুলাসের প্রায়োগিক সমস্যা সমাধান করতে পারবে",
    ],
    resources: [
      {
        title: "ক্যালকুলাস - ইন্টার‍্যাকটিভ সমাধান",
        url: "https://www.biggansala.org/interactive/calculus-solutions",
        type: "interactive",
        source: "বিজ্ঞানশালা ইন্টারেক্টিভ পোর্টাল",
      },
      {
        title: "ক্যালকুলাস ও গাণিতিক যুক্তি - ব্লগ সিরিজ",
        url: "https://www.biggansala.org/blog/calculus-mathematical-logic",
        type: "article",
        source: "বিজ্ঞানশালা ব্লগ",
      },
      {
        title: "ক্যালকুলাস - ভিডিও লেকচার সিরিজ",
        url: "https://www.youtube.com/watch?v=example21",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "গাণিতিক যুক্তি - অনলাইন কুইজ",
        url: "https://www.biggansala.org/quiz/mathematical-logic",
        type: "interactive",
        source: "বিজ্ঞানশালা কুইজ পোর্টাল",
      },
    ],
    author: {
      name: "ড. শাহনাজ পারভীন",
      title: "অধ্যাপক, গণিত বিভাগ, জাহাঙ্গীরনগর বিশ্ববিদ্যালয়",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 32,
    title: "জলবায়ু ও প্রাকৃতিক দুর্যোগ", // Note: This is a general science course
    category: "general_science", // Keeping category from learn.txt which is general_science
    level: "class_6_8",
    duration: "৮ ঘন্টা",
    lessons: 12,
    students: 2350,
    rating: 4.7,
    instructor: "ড. নাজমুল হক",
    image:
      "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["ইনফোগ্রাফিক", "গল্প"],
    description:
      "এই কোর্সে ৬ষ্ঠ-৮ম শ্রেণির শিক্ষার্থীরা জলবায়ু ও প্রাকৃতিক দুর্যোগ সম্পর্কে শিখবে। ইনফোগ্রাফিক এবং গল্পের মাধ্যমে জলবায়ু পরিবর্তন, বৈশ্বিক উষ্ণায়ন, বন্যা, ঘূর্ণিঝড়, ভূমিকম্প, সুনামি, খরা, এবং প্রাকৃতিক দুর্যোগ মোকাবেলার উপায় সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।",
    points: 15,
    learningObjectives: [
      "জলবায়ু পরিবর্তন ও বৈশ্বিক উষ্ণায়নের কারণ ও প্রভাব বুঝতে পারবে",
      "বিভিন্ন প্রাকৃতিক দুর্যোগের কারণ ও প্রভাব ব্যাখ্যা করতে পারবে",
      "প্রাকৃতিক দুর্যোগ মোকাবেলার উপায় জানতে পারবে",
      "জলবায়ু পরিবর্তন রোধে করণীয় সম্পর্কে ধারণা পাবে",
    ],
    resources: [
      {
        title: "জলবায়ু পরিবর্তন - ইনফোগ্রাফিক সিরিজ",
        url: "https://www.biggansala.org/infographics/climate-change",
        type: "article",
        source: "বিজ্ঞানশালা ডিজিটাল লাইব্রেরি",
      },
      {
        title: "প্রাকৃতিক দুর্যোগ - গল্প সংকলন",
        url: "https://www.biggansala.org/stories/natural-disasters",
        type: "article",
        source: "বিজ্ঞানশালা ডিজিটাল লাইব্রেরি",
      },
      {
        title: "জলবায়ু ও প্রাকৃতিক দুর্যোগ - ভিডিও সিরিজ",
        url: "https://www.youtube.com/watch?v=example22",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
    ],
    author: {
      name: "ড. নাজমুল হক",
      title: "পরিবেশ বিজ্ঞানী, বাংলাদেশ পরিবেশ অধিদপ্তর",
      avatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  // New courses from learn.txt (IDs 43-57 in original learn.txt file)
  // Bangla
  {
    id: 33,
    title: "বাংলা ছড়া, গল্প ও শব্দগঠন",
    category: "bangla",
    level: "primary", // For Class 3-5
    duration: "৬ ঘন্টা",
    lessons: 12,
    students: 3200,
    rating: 4.7,
    instructor: "তাসলিমা খাতুন",
    image: "https://images.pexels.com/photos/1741230/pexels-photo-1741230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["অডিও গল্প", "গেম"],
    description: "প্রাথমিক স্তরের (৩য়-৫ম শ্রেণি) শিক্ষার্থীদের জন্য এই কোর্সে মজাদার অডিও গল্প ও গেমের মাধ্যমে ছড়া, গল্প এবং নতুন শব্দ গঠন শেখানো হবে।",
    points: 10,
    learningObjectives: [
      "বিভিন্ন বাংলা ছড়া আবৃত্তি করতে ও বুঝতে পারবে",
      "ছোট গল্প শুনে মূলভাব অনুধাবন করতে পারবে",
      "নতুন নতুন বাংলা শব্দ শিখবে ও বাক্যে প্রয়োগ করতে পারবে",
      "ভাষার প্রতি আকর্ষণ বৃদ্ধি পাবে",
    ],
    resources: [
      { title: "ছোটদের ছড়ার আসর - অডিও", url: "https://example.com/bangla/rhymes-audio", type: "audio", source: "শিক্ষা কলরব" },
      { title: "শব্দ মেলানোর খেলা - গেম", url: "https://example.com/bangla/word-game", type: "interactive", source: "শিক্ষা কলরব" },
      { title: "ঈশপের গল্প - অডিও সিরিজ", url: "https://example.com/bangla/aesop-audio", type: "audio", source: "শিক্ষা কলরব" },
    ],
    author: {
      name: "তাসলিমা খাতুন",
      title: "শিশুতোষ সাহিত্যিক",
      avatar: "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 34,
    title: "বাংলা ব্যাকরণ ও রচনা শিক্ষা",
    category: "bangla",
    level: "class_6_8", // For Class 6-8
    duration: "১০ ঘন্টা",
    lessons: 18,
    students: 2800,
    rating: 4.6,
    instructor: "কামরুল হাসান",
    image: "https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["কুইজ", "ব্লগ"],
    description: "৬ষ্ঠ থেকে ৮ম শ্রেণির শিক্ষার্থীদের জন্য এই কোর্সে বাংলা ব্যাকরণের বিভিন্ন গুরুত্বপূর্ণ বিষয় এবং রচনা লেখার কৌশল কুইজ ও ব্লগের মাধ্যমে আলোচনা করা হয়েছে।",
    points: 18,
    learningObjectives: [
      "বাংলা ব্যাকরণের মৌলিক নিয়মাবলী আয়ত্ত করতে পারবে",
      "পদ, বাক্য, সন্ধি, সমাস ইত্যাদি সম্পর্কে স্পষ্ট ধারণা পাবে",
      "বিভিন্ন ধরণের রচনা (যেমন: চিঠি, দরখাস্ত, অনুচ্ছেদ) লিখতে শিখবে",
      "ভাষার ব্যবহারে শুদ্ধতা ও প্রাঞ্জলতা আনতে পারবে",
    ],
    resources: [
      { title: "ব্যাকরণ চর্চা - কুইজ", url: "https://example.com/bangla/grammar-quiz", type: "interactive", source: "বাংলা একাডেমি অনলাইন" },
      { title: "সৃজনশীল লেখার টিপস - ব্লগ", url: "https://example.com/bangla/writing-blog", type: "article", source: "বাংলা একাডেমি অনলাইন" },
    ],
    author: {
      name: "কামরুল হাসান",
      title: "বাংলা ভাষার অধ্যাপক",
      avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 35,
    title: "বাংলা সাহিত্য পাঠ ও কবিতা বিশ্লেষণ",
    category: "bangla",
    level: "class_9_10",
    duration: "১২ ঘন্টা",
    lessons: 20,
    students: 2500,
    rating: 4.8,
    instructor: "ড. আফসানা বেগম",
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["পডকাস্ট", "ইনফোগ্রাফিক"],
    description: "৯ম-১০ম শ্রেণির শিক্ষার্থীদের জন্য বাংলা সাহিত্যের নির্বাচিত পাঠ এবং বিখ্যাত কবিদের কবিতা পডকাস্ট ও ইনফোগ্রাফিকের মাধ্যমে গভীরভাবে বিশ্লেষণ করা হয়েছে।",
    points: 22,
    learningObjectives: [
      "বাংলা সাহিত্যের বিভিন্ন ধারা ও যুগের বৈশিষ্ট্য জানতে পারবে",
      "নির্বাচিত গল্প, প্রবন্ধ ও কবিতার মূলভাব ও অন্তর্নিহিত তাৎপর্য বুঝতে পারবে",
      "কবি ও সাহিত্যিকদের জীবন ও কর্ম সম্পর্কে ধারণা পাবে",
      "কবিতার ছন্দ, অলঙ্কার ও শিল্পরূপ বিশ্লেষণ করতে শিখবে",
    ],
    resources: [
      { title: "সাহিত্য আলাপ - পডকাস্ট", url: "https://example.com/bangla/literature-podcast", type: "audio", source: "সাহিত্য জগৎ" },
      { title: "কবিতা বিশ্লেষণের সহজ পাঠ - ইনফোগ্রাফিক", url: "https://example.com/bangla/poetry-infographic", type: "article", source: "সাহিত্য জগৎ" },
    ],
    author: {
      name: "ড. আফসানা বেগম",
      title: "সাহিত্য গবেষক",
      avatar: "https://images.pexels.com/photos/3771089/pexels-photo-3771089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 36,
    title: "বাংলা প্রবন্ধ ও উপন্যাস গভীর বিশ্লেষণ",
    category: "bangla",
    level: "hsc",
    duration: "১৪ ঘন্টা",
    lessons: 22,
    students: 2100,
    rating: 4.9,
    instructor: "অধ্যাপক মনোয়ার হোসেন",
    image: "https://images.pexels.com/photos/4626350/pexels-photo-4626350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["ভিডিও", "কুইজ"],
    description: "এইচএসসি শিক্ষার্থীদের জন্য এই কোর্সে বাংলা সাহিত্যের গুরুত্বপূর্ণ প্রবন্ধ ও উপন্যাসগুলোর গঠন, বিষয়বস্তু, চরিত্র এবং সাহিত্যিক মূল্য ভিডিও লেকচার ও কুইজের মাধ্যমে পুঙ্খানুপুঙ্খভাবে বিশ্লেষণ করা হয়েছে।",
    points: 25,
    learningObjectives: [
      "প্রবন্ধের মূল বক্তব্য ও লেখকের দৃষ্টিভঙ্গি বুঝতে পারবে",
      "উপন্যাসের কাহিনী, চরিত্রায়ণ ও সামাজিক প্রেক্ষাপট বিশ্লেষণ করতে পারবে",
      "সাহিত্যিকদের লিখনশৈলী ও ভাষার ব্যবহার অনুধাবন করতে পারবে",
      "সৃজনশীল ও বিশ্লেষণমূলক প্রশ্নের উত্তর দিতে পারদর্শী হবে",
    ],
    resources: [
      { title: "উপন্যাস পাঠ ও পর্যালোচনা - ভিডিও", url: "https://example.com/bangla/novel-analysis-video", type: "video", source: "উচ্চতর বাংলা" },
      { title: "প্রবন্ধের উপর আলোচনা - কুইজ", url: "https://example.com/bangla/essay-quiz-hsc", type: "interactive", source: "উচ্চতর বাংলা" },
    ],
    author: {
      name: "অধ্যাপক মনোয়ার হোসেন",
      title: "বাংলা இலக்கிய অধ্যাপক",
      avatar: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  // English
  {
    id: 37,
    title: "English Fun: Vocabulary & Rhymes",
    category: "english",
    level: "primary", // For Class 3-5
    duration: "৫ ঘন্টা",
    lessons: 10,
    students: 3500,
    rating: 4.8,
    instructor: "Sarah Ahmed",
    image: "https://images.pexels.com/photos/733767/pexels-photo-733767.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["অডিও গেম"],
    description: "This course for primary students (Class 3-5) makes learning English vocabulary and rhymes exciting through interactive audio games.",
    points: 10,
    learningObjectives: [
      "Build a strong foundation of English vocabulary",
      "Learn and recite popular English rhymes",
      "Improve listening and pronunciation skills",
      "Develop a love for the English language",
    ],
    resources: [
      { title: "Word Quest - Audio Game", url: "https://example.com/english/vocab-audio-game", type: "interactive", source: "Kids English Portal" },
      { title: "Rhyme Time Challenge - Audio Game", url: "https://example.com/english/rhyme-audio-game", type: "interactive", source: "Kids English Portal" },
    ],
    author: {
      name: "Sarah Ahmed",
      title: "Early Childhood English Educator",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 38,
    title: "Mastering English Grammar: Tense & Voice",
    category: "english",
    level: "class_6_8", // For Class 6-8
    duration: "৮ ঘন্টা",
    lessons: 15,
    students: 2900,
    rating: 4.7,
    instructor: "David Miller",
    image: "https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["কুইজ", "এনিমেশন"],
    description: "Students in Class 6-8 will solidify their understanding of English tenses and voice through engaging quizzes and clear animations.",
    points: 18,
    learningObjectives: [
      "Understand the structure and usage of all English tenses",
      "Master active and passive voice transformations",
      "Improve accuracy in sentence construction",
      "Build confidence in using English grammar correctly",
    ],
    resources: [
      { title: "Grammar Galaxy Quiz - Tense & Voice", url: "https://example.com/english/tense-voice-quiz", type: "interactive", source: "Grammar Hub" },
      { title: "Animated Grammar Lessons", url: "https://example.com/english/grammar-animations", type: "video", source: "Grammar Hub" },
    ],
    author: {
      name: "David Miller",
      title: "English Grammar Specialist",
      avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 39,
    title: "Advanced English: Writing & Reading Skills",
    category: "english",
    level: "class_9_10",
    duration: "১০ ঘন্টা",
    lessons: 18,
    students: 2600,
    rating: 4.8,
    instructor: "Dr. Emily Carter",
    image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["ব্লগ", "পডকাস্ট"],
    description: "This course for Class 9-10 students focuses on honing advanced English writing and reading comprehension skills through insightful blogs and podcasts.",
    points: 20,
    learningObjectives: [
      "Develop sophisticated writing styles for various formats",
      "Enhance critical reading and analytical skills",
      "Expand academic vocabulary and idiomatic expressions",
      "Prepare for higher-level English assessments",
    ],
    resources: [
      { title: "The Writer's Craft - Blog", url: "https://example.com/english/writing-skills-blog", type: "article", source: "English Mastery" },
      { title: "Literary Insights - Podcast", url: "https://example.com/english/reading-podcast", type: "audio", source: "English Mastery" },
    ],
    author: {
      name: "Dr. Emily Carter",
      title: "English Language Professor",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 40,
    title: "HSC English: Summary & Translation Workshop",
    category: "english",
    level: "hsc",
    duration: "১২ ঘন্টা",
    lessons: 20,
    students: 2300,
    rating: 4.9,
    instructor: "Prof. Michael Hughes",
    image: "https://images.pexels.com/photos/265076/pexels-photo-265076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["ইনটার‍্যাকটিভ লেসন"],
    description: "HSC students will master the art of summary writing and precise translation (Bangla-English & English-Bangla) through comprehensive interactive lessons.",
    points: 25,
    learningObjectives: [
      "Write effective and concise summaries of complex texts",
      "Translate various types of texts accurately and fluently",
      "Understand common pitfalls in summary and translation",
      "Excel in HSC English examinations",
    ],
    resources: [
      { title: "Interactive Summary Practice", url: "https://example.com/english/hsc-summary-interactive", type: "interactive", source: "HSC English Prep" },
      { title: "Translation Techniques - Interactive Module", url: "https://example.com/english/hsc-translation-interactive", type: "interactive", source: "HSC English Prep" },
    ],
    author: {
      name: "Prof. Michael Hughes",
      title: "Senior English Examiner",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  // Religion
  {
    id: 41,
    title: "ইসলাম শিক্ষা: নামাজের নিয়ম ও হাদিস",
    category: "religion",
    level: "primary", // For Class 1-5
    duration: "৭ ঘন্টা",
    lessons: 14,
    students: 3000,
    rating: 4.9,
    instructor: "মাওলানা আব্দুল্লাহ",
    image: "https://images.pexels.com/photos/7528300/pexels-photo-7528300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["অডিও", "কমিক"],
    description: "প্রাথমিক শ্রেণির (১ম-৫ম) শিশুদের জন্য এই কোর্সে নামাজের সঠিক নিয়মাবলী এবং শিশুদের উপযোগী হাদিস সহজবোধ্য অডিও এবং আকর্ষণীয় কমিকের মাধ্যমে শেখানো হবে।",
    points: 12,
    learningObjectives: [
      "নামাজের প্রতিটি ধাপ সঠিকভাবে শিখতে পারবে",
      "দৈনন্দিন জীবনের জন্য প্রয়োজনীয় ছোট ছোট হাদিস মুখস্থ করতে ও বুঝতে পারবে",
      "ইসলামের প্রাথমিক শিষ্টাচার ও মূল্যবোধ সম্পর্কে জানবে",
      "ধর্মীয় অনুশাসন পালনে আগ্রহী হবে",
    ],
    resources: [
      { title: "নামাজ শিক্ষা - অডিও পাঠ", url: "https://example.com/religion/namaz-audio", type: "audio", source: "ইসলামিক শিক্ষা কেন্দ্র" },
      { title: "হাদিসের আলো - ছোটদের কমিক", url: "https://example.com/religion/hadith-comics", type: "article", source: "ইসলামিক শিক্ষা কেন্দ্র" },
    ],
    author: {
      name: "মাওলানা আব্দুল্লাহ",
      title: "ইসলামিক স্কলার ও শিক্ষক",
      avatar: "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 42,
    title: "ইসলামের গৌরবময় ইতিহাস",
    category: "religion",
    level: "class_6_8", // For Class 6-8
    duration: "৯ ঘন্টা",
    lessons: 16,
    students: 2700,
    rating: 4.7,
    instructor: "উস্তাদ बশির আহমেদ",
    image: "https://images.pexels.com/photos/4247766/pexels-photo-4247766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["গল্প ভিডিও"],
    description: "৬ষ্ঠ থেকে ৮ম শ্রেণির শিক্ষার্থীদের জন্য এই কোর্সে ইসলামের ইতিহাসের গুরুত্বপূর্ণ ঘটনাবলী এবং নবী-রাসূল ও সাহাবীদের জীবনকাহিনী আকর্ষণীয় গল্প ও ভিডিওর মাধ্যমে উপস্থাপন করা হয়েছে।",
    points: 18,
    learningObjectives: [
      "ইসলামের উত্থান ও বিকাশের ইতিহাস জানতে পারবে",
      "মহানবী (সাঃ) ও খুলাফায়ে রাশেদীনের জীবনী সম্পর্কে ধারণা পাবে",
      "ইসলামী সভ্যতা ও সংস্কৃতির অবদান সম্পর্কে জানবে",
      "ঐতিহাসিক ঘটনা থেকে নৈতিক শিক্ষা গ্রহণ করতে পারবে",
    ],
    resources: [
      { title: "নবীজীর জীবনের গল্প - ভিডিও সিরিজ", url: "https://example.com/religion/prophet-story-video", type: "video", source: "ঐতিহ্যের আলো" },
      { title: "সাহাবীদের ঈমানদীপ্ত কাহিনী - গল্প ভিডিও", url: "https://example.com/religion/sahaba-stories-video", type: "video", source: "ঐতিহ্যের আলো" },
    ],
    author: {
      name: "উস্তাদ बশির আহমেদ",
      title: "ইসলামিক ইতিহাসবিদ",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 43,
    title: "ইসলামী আখলাক ও কুরআন পরিচিতি",
    category: "religion",
    level: "class_9_10",
    duration: "১১ ঘন্টা",
    lessons: 19,
    students: 2400,
    rating: 4.8,
    instructor: "আলহাজ্জা ফাতিমা রহমান",
    image: "https://images.pexels.com/photos/4194853/pexels-photo-4194853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["অডিও", "কুইজ"],
    description: "৯ম-১০ম শ্রেণির শিক্ষার্থীদের জন্য এই কোর্সে উন্নত চরিত্র গঠনের জন্য ইসলামী আখলাক এবং পবিত্র কুরআনের মৌলিক শিক্ষা ও তাৎপর্য অডিও লেকচার ও কুইজের মাধ্যমে বিশদভাবে আলোচনা করা হবে।",
    points: 20,
    learningObjectives: [
      "ইসলামী দৃষ্টিতে উত্তম চরিত্র ও নৈতিক গুণাবলী সম্পর্কে জানবে",
      "কুরআন তিলাওয়াতের প্রাথমিক নিয়ম ও আদব শিখবে",
      "কুরআনের কতিপয় গুরুত্বপূর্ণ সূরা ও আয়াতের অর্থ ও ব্যাখ্যা বুঝতে পারবে",
      "ব্যক্তি ও সমাজ জীবনে ইসলামের নির্দেশনা পালনে উদ্বুদ্ধ হবে",
    ],
    resources: [
      { title: "আখলাকে হাসানাহ - অডিও সিরিজ", url: "https://example.com/religion/akhlaq-audio", type: "audio", source: "নূরুল কুরআন" },
      { title: "কুরআন জ্ঞান পরীক্ষা - কুইজ", url: "https://example.com/religion/quran-quiz", type: "interactive", source: "নূরুল কুরআন" },
    ],
    author: {
      name: "আলহাজ্জা ফাতিমা রহমান",
      title: "কুরআন ও সুন্নাহ বিশেষজ্ঞ",
      avatar: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 44,
    title: "কুরআনের তাফসির ও ইসলামী দর্শন",
    category: "religion",
    level: "hsc",
    duration: "১৩ ঘন্টা",
    lessons: 21,
    students: 2000,
    rating: 4.9,
    instructor: "মুফতি ইব্রাহিম খলিল",
    image: "https://images.pexels.com/photos/735987/pexels-photo-735987.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["পডকাস্ট", "ব্লগ"],
    description: "এইচএসসি শিক্ষার্থীদের জন্য এই কোর্সে পবিত্র কুরআনের নির্বাচিত আয়াতসমূহের গভীর তাফসির এবং ইসলামী দর্শনের মৌলিক বিষয়াবলী পডকাস্ট ও তথ্যবহুল ব্লগের মাধ্যমে আলোচনা করা হয়েছে।",
    points: 25,
    learningObjectives: [
      "কুরআনের আয়াতের শাব্দিক ও অন্তর্নিহিত অর্থ ও ব্যাখ্যা বুঝতে পারবে",
      "ইসলামী আকিদা ও দর্শনের মূলনীতিসমূহ সম্পর্কে জ্ঞান লাভ করবে",
      "সমসাময়িক বিভিন্ন জিজ্ঞাসার ইসলামিক সমাধান খুঁজে পাবে",
      "ইসলামের সার্বজনীন আবেদন ও যৌক্তিকতা অনুধাবন করতে পারবে",
    ],
    resources: [
      { title: "তাফসিরুল কুরআন - পডকাস্ট সিরিজ", url: "https://example.com/religion/tafsir-podcast", type: "audio", source: "জ্ঞান সাগর" },
      { title: "ইসলামী দর্শন ও চিন্তাধারা - ব্লগ", url: "https://example.com/religion/islamic-philosophy-blog", type: "article", source: "জ্ঞান সাগর" },
    ],
    author: {
      name: "মুফতি ইব্রাহিম খলিল",
      title: "ইসলামিক চিন্তাবিদ ও গবেষক",
      avatar: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  // Arabic
  {
    id: 45,
    title: "সহজ আরবি বর্ণমালা ও শব্দজ্ঞান",
    category: "arabic",
    level: "class_6_8", // For Class 6-8
    duration: "৮ ঘন্টা",
    lessons: 16,
    students: 1800,
    rating: 4.6,
    instructor: "সাইফুল্লাহ্ আল-আজহারী",
    image: "https://images.pexels.com/photos/6957084/pexels-photo-6957084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["অডিও", "গেম"],
    description: "৬ষ্ঠ থেকে ৮ম শ্রেণির শিক্ষার্থীদের আরবি ভাষার প্রাথমিক জ্ঞান অর্জনের জন্য এই কোর্সে আরবি বর্ণমালা, উচ্চারণ এবং দৈনন্দিন ব্যবহারিক শব্দসমূহ অডিও ও গেমের মাধ্যমে সহজ ও আনন্দদায়কভাবে শেখানো হবে।",
    points: 15,
    learningObjectives: [
      "শুদ্ধভাবে আরবি বর্ণমালা চিনতে ও উচ্চারণ করতে পারবে",
      "আরবিতে নিজের ও পারিপার্শ্বিক বস্তুর নাম বলতে পারবে",
      "প্রাথমিক আরবি শব্দভাণ্ডার গড়ে উঠবে",
      "আরবি ভাষা শেখার প্রতি আগ্রহ ও আত্মবিশ্বাস জন্মাবে",
    ],
    resources: [
      { title: "আরবি হরফ শিক্ষা - অডিও", url: "https://example.com/arabic/alphabet-audio", type: "audio", source: "আরবি পাঠশালা" },
      { title: "আরবি শব্দ মেলানো - গেম", url: "https://example.com/arabic/word-match-game", type: "interactive", source: "আরবি পাঠশালা" },
    ],
    author: {
      name: "সাইফুল্লাহ্ আল-আজহারী",
      title: "আরবি ভাষা প্রশিক্ষক",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 46,
    title: "আরবি ব্যাকরণ ও বাক্য গঠন",
    category: "arabic",
    level: "class_9_10",
    duration: "১০ ঘন্টা",
    lessons: 18,
    students: 1500,
    rating: 4.7,
    instructor: "ড. ফাতিমা বিনতে জামাল",
    image: "https://images.pexels.com/photos/716281/pexels-photo-716281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["কুইজ", "ইনফোগ্রাফিক"],
    description: "৯ম-১০ম শ্রেণির শিক্ষার্থীদের জন্য এই কোর্সে আরবি ব্যাকরণের মৌলিক নিয়মাবলী (নাহু ও সরফ) এবং সঠিক বাক্য গঠন পদ্ধতি ইন্টারেক্টিভ কুইজ ও আকর্ষণীয় ইনফোগ্রাফিকের মাধ্যমে বিশদভাবে আলোচনা করা হয়েছে।",
    points: 20,
    learningObjectives: [
      "আরবি ব্যাকরণের মৌলিক পরিভাষা ও নিয়মাবলী বুঝতে পারবে",
      "বিভিন্ন প্রকার শব্দের (ইসম, ফেল, হরফ) ব্যবহার শিখবে",
      "সঠিকভাবে আরবি বাক্য তৈরি করতে ও বিশ্লেষণ করতে পারবে",
      "আরবি ভাষায় পঠন ও লিখন দক্ষতা বৃদ্ধি পাবে",
    ],
    resources: [
      { title: "আরবি ব্যাকরণ অনুশীলন - কুইজ", url: "https://example.com/arabic/grammar-quiz", type: "interactive", source: "আল-লুগাতুল আরাবিয়্যাহ" },
      { title: "আরবি বাক্য গঠন - ইনফোগ্রাফিক", url: "https://example.com/arabic/sentence-infographic", type: "article", source: "আল-লুগাতুল আরাবিয়্যাহ" },
    ],
    author: {
      name: "ড. ফাতিমা বিনতে জামাল",
      title: "আরবি ভাষা ও সাহিত্য বিশেষজ্ঞ",
      avatar: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 47,
    title: "আরবি থেকে বাংলা অনুবাদ ও ব্যাখ্যা",
    category: "arabic",
    level: "hsc",
    duration: "১২ ঘন্টা",
    lessons: 20,
    students: 1200,
    rating: 4.8,
    instructor: "অধ্যাপক ইউসুফ আলী",
    image: "https://images.pexels.com/photos/1036808/pexels-photo-1036808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["ভিডিও", "পডকাস্ট"],
    description: "এইচএসসি শিক্ষার্থীদের জন্য এই কোর্সে আরবি পাঠ্যবইয়ের গুরুত্বপূর্ণ অংশ এবং অন্যান্য আরবি সাহিত্য থেকে নির্বাচিত অংশের বাংলা অনুবাদ, ব্যাখ্যা এবং সাহিত্যিক বিশ্লেষণ ভিডিও লেকচার ও পডকাস্টের মাধ্যমে বিস্তারিতভাবে আলোচনা করা হয়েছে।",
    points: 22,
    learningObjectives: [
      "আরবি পাঠ্যাংশ সাবলীলভাবে বাংলাতে অনুবাদ করতে পারবে",
      "আরবি সাহিত্যের বিভিন্ন রূপ ও রীতির সাথে পরিচিত হবে",
      "অনুবাদকৃত অংশের ভাব ও মর্মার্থ সঠিকভাবে ব্যাখ্যা করতে পারবে",
      "আরবি ভাষায় উচ্চতর দক্ষতা অর্জনে সক্ষম হবে",
    ],
    resources: [
      { title: "আরবি অনুবাদ কর্মশালা - ভিডিও", url: "https://example.com/arabic/translation-video-hsc", type: "video", source: "আরবি বিভাগ" },
      { title: "আরবি সাহিত্য আলোচনা - পডকাস্ট", url: "https://example.com/arabic/literature-podcast-hsc", type: "audio", source: "আরবি বিভাগ" },
    ],
    author: {
      name: "অধ্যাপক ইউসুফ আলী",
      title: "আরবি সাহিত্য ও অনুবাদ বিশেষজ্ঞ",
      avatar: "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  // Unique courses from learn2.txt (IDs L2_43 to L2_53)
  {
    id: 48,
    title: "বাংলা ব্যাকরণ: বাক্য গঠন ও বিশ্লেষণ",
    category: "bangla",
    level: "class_8",
    duration: "১০ ঘন্টা",
    lessons: 15,
    students: 2450,
    rating: 4.7,
    instructor: "ড. নাজমুল হক",
    image:
      "https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["ভিডিও", "কুইজ"],
    description:
      "এই কোর্সে ৮ম শ্রেণির শিক্ষার্থীরা বাংলা ব্যাকরণের অন্তর্গত বাক্য গঠন ও বিশ্লেষণ সম্পর্কে শিখবে। ভিডিও এবং কুইজের মাধ্যমে বাক্যের প্রকারভেদ, বাক্য গঠনের নিয়ম, বাক্য পরিবর্তন, এবং বাক্য বিশ্লেষণ সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।",
    points: 15,
    learningObjectives: [
      "বাক্যের প্রকারভেদ চিহ্নিত করতে পারবে",
      "বাক্য গঠনের নিয়ম ব্যাখ্যা করতে পারবে",
      "বাক্য পরিবর্তন করতে পারবে",
      "বাক্য বিশ্লেষণ করতে পারবে",
      "সঠিক বাক্য গঠন করতে পারবে",
    ],
    resources: [
      {
        title: "বাক্য গঠন - ভিডিও লেকচার",
        url: "https://www.youtube.com/watch?v=example43",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "বাক্য বিশ্লেষণ - অনলাইন কুইজ",
        url: "https://www.biggansala.org/quiz/sentence-analysis",
        type: "interactive",
        source: "বিজ্ঞানশালা কুইজ পোর্টাল",
      },
    ],
    author: {
      name: "ড. নাজমুল হক",
      title: "সহযোগী অধ্যাপক, বাংলা বিভাগ, ঢাকা বিশ্ববিদ্যালয়",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 49,
    title: "বাংলা সাহিত্যের ইতিহাস",
    category: "bangla",
    level: "class_9_10",
    duration: "১২ ঘন্টা",
    lessons: 18,
    students: 1850,
    rating: 4.8,
    instructor: "ড. শাহনাজ পারভীন",
    image:
      "https://images.pexels.com/photos/3747468/pexels-photo-3747468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["ভিডিও", "ব্লগ"],
    description:
      "এই কোর্সে ৯ম-১০ম শ্রেণির শিক্ষার্থীরা বাংলা সাহিত্যের ইতিহাস সম্পর্কে শিখবে। ভিডিও এবং ব্লগের মাধ্যমে প্রাচীন, মধ্যযুগীয় ও আধুনিক বাংলা সাহিত্যের বিকাশ, প্রধান সাহিত্যিক ও তাদের রচনাবলী, এবং বাংলা সাহিত্যের বিভিন্ন ধারা সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।",
    points: 18,
    learningObjectives: [
      "বাংলা সাহিত্যের যুগবিভাগ ব্যাখ্যা করতে পারবে",
      "প্রাচীন, মধ্যযুগীয় ও আধুনিক বাংলা সাহিত্যের বৈশিষ্ট্য চিহ্নিত করতে পারবে",
      "প্রধান সাহিত্যিকদের পরিচয় ও অবদান সম্পর্কে জানতে পারবে",
      "বাংলা সাহিত্যের বিভিন্ন ধারা সম্পর্কে ধারণা পাবে",
      "বাংলা সাহিত্যের ইতিহাসের সাথে সামাজিক-রাজনৈতিক প্রেক্ষাপটের সম্পর্ক বুঝতে পারবে",
    ],
    resources: [
      {
        title: "বাংলা সাহিত্যের ইতিহাস - ভিডিও লেকচার সিরিজ",
        url: "https://www.youtube.com/watch?v=example44",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "বাংলা সাহিত্যের যুগবিভাগ - ব্লগ সিরিজ",
        url: "https://www.biggansala.org/blog/bangla-literature-history",
        type: "article",
        source: "বিজ্ঞানশালা ব্লগ",
      },
      {
        title: "বাংলা সাহিত্যের ইতিহাস - অনলাইন কুইজ",
        url: "https://www.biggansala.org/quiz/bangla-literature-history",
        type: "interactive",
        source: "বিজ্ঞানশালা কুইজ পোর্টাল",
      },
    ],
    author: {
      name: "ড. শাহনাজ পারভীন",
      title: "অধ্যাপক, বাংলা বিভাগ, জাহাঙ্গীরনগর বিশ্ববিদ্যালয়",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 50,
    title: "ইংরেজি গ্রামার: টেনস ও ভার্ব",
    category: "english",
    level: "class_7",
    duration: "৮ ঘন্টা",
    lessons: 12,
    students: 3250,
    rating: 4.7,
    instructor: "ড. সাবিনা ইয়াসমিন",
    image:
      "https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["ভিডিও", "কুইজ"],
    description:
      "এই কোর্সে ৭ম শ্রেণির শিক্ষার্থীরা ইংরেজি গ্রামারের অন্তর্গত টেনস ও ভার্ব সম্পর্কে শিখবে। ভিডিও এবং কুইজের মাধ্যমে ইংরেজি টেনসের প্রকারভেদ, ব্যবহার, ভার্বের প্রকারভেদ, এবং বাক্যে ভার্বের সঠিক ব্যবহার সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।",
    points: 15,
    learningObjectives: [
      "ইংরেজি টেনসের প্রকারভেদ চিহ্নিত করতে পারবে",
      "বিভিন্ন টেনসের ব্যবহার ব্যাখ্যা করতে পারবে",
      "ভার্বের প্রকারভেদ জানতে পারবে",
      "বাক্যে ভার্বের সঠিক ব্যবহার করতে পারবে",
      "ইংরেজি বাক্য গঠনে টেনস ও ভার্বের ভূমিকা বুঝতে পারবে",
    ],
    resources: [
      {
        title: "ইংরেজি টেনস - ভিডিও লেকচার",
        url: "https://www.youtube.com/watch?v=example45",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "ভার্ব ও টেনস - অনলাইন কুইজ",
        url: "https://www.biggansala.org/quiz/verbs-tenses",
        type: "interactive",
        source: "বিজ্ঞানশালা কুইজ পোর্টাল",
      },
    ],
    author: {
      name: "ড. সাবিনা ইয়াসমিন",
      title: "সিনিয়র শিক্ষক, ইংরেজি বিভাগ, ঢাকা এডুকেশন বোর্ড",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 51,
    title: "ইংরেজি স্পিকিং: দৈনন্দিন কথোপকথন",
    category: "english",
    level: "class_8",
    duration: "১০ ঘন্টা",
    lessons: 15,
    students: 2850,
    rating: 4.8,
    instructor: "ড. তানভীর আহমেদ",
    image:
      "https://images.pexels.com/photos/7516347/pexels-photo-7516347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["ভিডিও", "অডিও"],
    description:
      "এই কোর্সে ৮ম শ্রেণির শিক্ষার্থীরা ইংরেজি স্পিকিং এর অন্তর্গত দৈনন্দিন কথোপকথন সম্পর্কে শিখবে। ভিডিও এবং অডিওর মাধ্যমে পরিচয়, অভিবাদন, দিক নির্দেশনা, শপিং, রেস্টুরেন্ট, হোটেল, ট্রাভেল ইত্যাদি বিষয়ে ইংরেজিতে কথোপকথন সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।",
    points: 18,
    learningObjectives: [
      "ইংরেজিতে নিজের পরিচয় দিতে পারবে",
      "দৈনন্দিন বিভিন্ন পরিস্থিতিতে ইংরেজিতে কথোপকথন করতে পারবে",
      "ইংরেজি উচ্চারণ উন্নত করতে পারবে",
      "ইংরেজিতে দিক নির্দেশনা, সময়, তারিখ ইত্যাদি বলতে পারবে",
      "ইংরেজিতে শপিং, রেস্টুরেন্ট, হোটেল, ট্রাভেল সংক্রান্ত কথোপকথন করতে পারবে",
    ],
    resources: [
      {
        title: "ইংরেজি কথোপকথন - ভিডিও সিরিজ",
        url: "https://www.youtube.com/watch?v=example46",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "ইংরেজি উচ্চারণ - অডিও গাইড",
        url: "https://www.biggansala.org/audio/english-pronunciation",
        type: "audio",
        source: "বিজ্ঞানশালা অডিও লাইব্রেরি",
      },
      {
        title: "ইংরেজি কথোপকথন - অনলাইন কুইজ",
        url: "https://www.biggansala.org/quiz/english-conversation",
        type: "interactive",
        source: "বিজ্ঞানশালা কুইজ পোর্টাল",
      },
    ],
    author: {
      name: "ড. তানভীর আহমেদ",
      title: "সহযোগী অধ্যাপক, ইংরেজি বিভাগ, ঢাকা বিশ্ববিদ্যালয়",
      avatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 52,
    title: "ইংরেজি রাইটিং: এসে ও লেটার",
    category: "english",
    level: "class_9_10",
    duration: "১২ ঘন্টা",
    lessons: 16,
    students: 2150,
    rating: 4.6,
    instructor: "ড. ফারহানা হক",
    image:
      "https://images.pexels.com/photos/6684255/pexels-photo-6684255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["ভিডিও", "ব্লগ"],
    description:
      "এই কোর্সে ৯ম-১০ম শ্রেণির শিক্ষার্থীরা ইংরেজি রাইটিং এর অন্তর্গত এসে ও লেটার লেখা সম্পর্কে শিখবে। ভিডিও এবং ব্লগের মাধ্যমে বিভিন্ন ধরনের এসে, ফরমাল ও ইনফরমাল লেটার, আবেদনপত্র, ইমেইল ইত্যাদি লেখার নিয়ম সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।",
    points: 20,
    learningObjectives: [
      "বিভিন্ন ধরনের এসে লিখতে পারবে",
      "ফরমাল ও ইনফরমাল লেটার লিখতে পারবে",
      "আবেদনপত্র লিখতে পারবে",
      "ইমেইল লিখতে পারবে",
      "ইংরেজি রাইটিং এর বিভিন্ন টেকনিক শিখতে পারবে",
    ],
    resources: [
      {
        title: "ইংরেজি এসে রাইটিং - ভিডিও লেকচার",
        url: "https://www.youtube.com/watch?v=example47",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "ইংরেজি লেটার রাইটিং - ব্লগ সিরিজ",
        url: "https://www.biggansala.org/blog/english-letter-writing",
        type: "article",
        source: "বিজ্ঞানশালা ব্লগ",
      },
      {
        title: "ইংরেজি রাইটিং - অনলাইন কুইজ",
        url: "https://www.biggansala.org/quiz/english-writing",
        type: "interactive",
        source: "বিজ্ঞানশালা কুইজ পোর্টাল",
      },
    ],
    author: {
      name: "ড. ফারহানা হক",
      title: "অধ্যাপক, ইংরেজি বিভাগ, জাহাঙ্গীরনগর বিশ্ববিদ্যালয়",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 53,
    title: "ইসলাম ধর্ম: নামাজ ও রোজা",
    category: "religion",
    level: "class_6",
    duration: "৮ ঘন্টা",
    lessons: 12,
    students: 3450,
    rating: 4.9,
    instructor: "মাওলানা আবদুল্লাহ",
    image:
      "https://images.pexels.com/photos/2526935/pexels-photo-2526935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["ভিডিও", "অডিও"],
    description:
      "এই কোর্সে ৬ষ্ঠ শ্রেণির শিক্ষার্থীরা ইসলাম ধর্মের অন্তর্গত নামাজ ও রোজা সম্পর্কে শিখবে। ভিডিও এবং অডিওর মাধ্যমে নামাজের গুরুত্ব, নামাজ আদায়ের নিয়ম, রোজার গুরুত্ব, রোজা পালনের নিয়ম ইত্যাদি সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।",
    points: 15,
    learningObjectives: [
      "নামাজের গুরুত্ব ও ফজিলত সম্পর্কে জানতে পারবে",
      "নামাজ আদায়ের সঠিক নিয়ম শিখতে পারবে",
      "রোজার গুরুত্ব ও ফজিলত সম্পর্কে জানতে পারবে",
      "রোজা পালনের সঠিক নিয়ম শিখতে পারবে",
      "নামাজ ও রোজার সামাজিক ও ব্যক্তিগত উপকারিতা বুঝতে পারবে",
    ],
    resources: [
      {
        title: "নামাজ শিক্ষা - ভিডিও টিউটোরিয়াল",
        url: "https://www.youtube.com/watch?v=example48",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "রোজা সম্পর্কিত প্রশ্নোত্তর - অডিও",
        url: "https://www.biggansala.org/audio/fasting-qa",
        type: "audio",
        source: "বিজ্ঞানশালা অডিও লাইব্রেরি",
      },
      {
        title: "নামাজ ও রোজা - অনলাইন কুইজ",
        url: "https://www.biggansala.org/quiz/prayer-fasting",
        type: "interactive",
        source: "বিজ্ঞানশালা কুইজ পোর্টাল",
      },
    ],
    author: {
      name: "মাওলানা আবদুল্লাহ",
      title: "ইসলামিক স্কলার, ইসলামিক ফাউন্ডেশন বাংলাদেশ",
      avatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 54,
    title: "হিন্দু ধর্ম: পূজা-অর্চনা ও ধর্মীয় উৎসব",
    category: "religion",
    level: "class_7",
    duration: "৯ ঘন্টা",
    lessons: 14,
    students: 1850,
    rating: 4.7,
    instructor: "অধ্যাপক দেবাশিস চক্রবর্তী",
    image:
      "https://images.pexels.com/photos/6044788/pexels-photo-6044788.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["ভিডিও", "ব্লগ"],
    description:
      "এই কোর্সে ৭ম শ্রেণির শিক্ষার্থীরা হিন্দু ধর্মের অন্তর্গত পূজা-অর্চনা ও ধর্মীয় উৎসব সম্পর্কে শিখবে। ভিডিও এবং ব্লগের মাধ্যমে বিভিন্ন দেবদেবীর পূজা-অর্চনার নিয়ম, ধর্মীয় উৎসব যেমন দুর্গাপূজা, কালীপূজা, সরস্বতী পূজা ইত্যাদি সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।",
    points: 15,
    learningObjectives: [
      "বিভিন্ন দেবদেবীর পূজা-অর্চনার নিয়ম জানতে পারবে",
      "হিন্দু ধর্মের প্রধান উৎসবগুলো সম্পর্কে জানতে পারবে",
      "পূজা-অর্চনার সামাজিক ও ব্যক্তিগত গুরুত্ব বুঝতে পারবে",
      "হিন্দু ধর্মের মূল্যবোধ ও নীতি সম্পর্কে জানতে পারবে",
      "ধর্মীয় উৎসবের সামাজিক ও সাংস্কৃতিক গুরুত্ব বুঝতে পারবে",
    ],
    resources: [
      {
        title: "হিন্দু ধর্মীয় উৎসব - ভিডিও সিরিজ",
        url: "https://www.youtube.com/watch?v=example49",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "পূজা-অর্চনার নিয়ম - ব্লগ সিরিজ",
        url: "https://www.biggansala.org/blog/hindu-worship",
        type: "article",
        source: "বিজ্ঞানশালা ব্লগ",
      },
      {
        title: "হিন্দু ধর্ম - অনলাইন কুইজ",
        url: "https://www.biggansala.org/quiz/hinduism",
        type: "interactive",
        source: "বিজ্ঞানশালা কুইজ পোর্টাল",
      },
    ],
    author: {
      name: "অধ্যাপক দেবাশিস চক্রবর্তী",
      title: "হিন্দু ধর্মীয় শিক্ষক, ধর্ম মন্ত্রণালয়",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 55,
    title: "বৌদ্ধ ধর্ম: বুদ্ধের জীবনী ও শিক্ষা",
    category: "religion",
    level: "class_8",
    duration: "১০ ঘন্টা",
    lessons: 15,
    students: 1250,
    rating: 4.6,
    instructor: "ড. সুমন বড়ুয়া",
    image:
      "https://images.pexels.com/photos/6045028/pexels-photo-6045028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["ভিডিও", "ব্লগ"],
    description:
      "এই কোর্সে ৮ম শ্রেণির শিক্ষার্থীরা বৌদ্ধ ধর্মের অন্তর্গত বুদ্ধের জীবনী ও শিক্ষা সম্পর্কে শিখবে। ভিডিও এবং ব্লগের মাধ্যমে গৌতম বুদ্ধের জীবনী, চার আর্য সত্য, অষ্টাঙ্গিক মার্গ, নির্বাণ, বৌদ্ধ ধর্মের মূল্যবোধ ইত্যাদি সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।",
    points: 15,
    learningObjectives: [
      "গৌতম বুদ্ধের জীবনী সম্পর্কে জানতে পারবে",
      "বৌদ্ধ ধর্মের মূল শিক্ষা চার আর্য সত্য ও অষ্টাঙ্গিক মার্গ বুঝতে পারবে",
      "নির্বাণের ধারণা সম্পর্কে জানতে পারবে",
      "বৌদ্ধ ধর্মের মূল্যবোধ ও নীতি সম্পর্কে জানতে পারবে",
      "বৌদ্ধ ধর্মের সামাজিক ও ব্যক্তিগত গুরুত্ব বুঝতে পারবে",
    ],
    resources: [
      {
        title: "বুদ্ধের জীবনী - ভিডিও ডকুমেন্টারি",
        url: "https://www.youtube.com/watch?v=example50",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "বৌদ্ধ ধর্মের মূল শিক্ষা - ব্লগ সিরিজ",
        url: "https://www.biggansala.org/blog/buddhism-teachings",
        type: "article",
        source: "বিজ্ঞানশালা ব্লগ",
      },
      {
        title: "বৌদ্ধ ধর্ম - অনলাইন কুইজ",
        url: "https://www.biggansala.org/quiz/buddhism",
        type: "interactive",
        source: "বিজ্ঞানশালা কুইজ পোর্টাল",
      },
    ],
    author: {
      name: "ড. সুমন বড়ুয়া",
      title: "বৌদ্ধ ধর্মীয় শিক্ষক, ধর্ম মন্ত্রণালয়",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 56,
    title: "আরবি ভাষার মৌলিক নিয়ম",
    category: "arabic",
    level: "class_6",
    duration: "৮ ঘন্টা",
    lessons: 12,
    students: 2150,
    rating: 4.7,
    instructor: "মাওলানা আবদুর রহমান",
    image:
      "https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["ভিডিও", "অডিও"],
    description:
      "এই কোর্সে ৬ষ্ঠ শ্রেণির শিক্ষার্থীরা আরবি ভাষার মৌলিক নিয়ম সম্পর্কে শিখবে। ভিডিও এবং অডিওর মাধ্যমে আরবি বর্ণমালা, উচ্চারণ, শব্দ গঠন, বাক্য গঠন, লিঙ্গ, বচন ইত্যাদি সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।",
    points: 15,
    learningObjectives: [
      "আরবি বর্ণমালা চিনতে ও লিখতে পারবে",
      "আরবি বর্ণের সঠিক উচ্চারণ করতে পারবে",
      "আরবি শব্দ গঠন করতে পারবে",
      "আরবি বাক্য গঠন করতে পারবে",
      "আরবি ভাষার লিঙ্গ ও বচন সম্পর্কে জানতে পারবে",
    ],
    resources: [
      {
        title: "আরবি বর্ণমালা - ভিডিও টিউটোরিয়াল",
        url: "https://www.youtube.com/watch?v=example51",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "আরবি উচ্চারণ - অডিও গাইড",
        url: "https://www.biggansala.org/audio/arabic-pronunciation",
        type: "audio",
        source: "বিজ্ঞানশালা অডিও লাইব্রেরি",
      },
      {
        title: "আরবি ভাষার মৌলিক নিয়ম - অনলাইন কুইজ",
        url: "https://www.biggansala.org/quiz/arabic-basics",
        type: "interactive",
        source: "বিজ্ঞানশালা কুইজ পোর্টাল",
      },
    ],
    author: {
      name: "মাওলানা আবদুর রহমান",
      title: "আরবি ভাষা বিশেষজ্ঞ, ইসলামিক ফাউন্ডেশন বাংলাদেশ",
      avatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 57,
    title: "আরবি ব্যাকরণ: ইসিম, ফেল, হারফ",
    category: "arabic",
    level: "class_7",
    duration: "১০ ঘন্টা",
    lessons: 15,
    students: 1850,
    rating: 4.8,
    instructor: "মাওলানা আবদুল কাদের",
    image:
      "https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["ভিডিও", "কুইজ"],
    description:
      "এই কোর্সে ৭ম শ্রেণির শিক্ষার্থীরা আরবি ব্যাকরণের অন্তর্গত ইসিম, ফেল, হারফ সম্পর্কে শিখবে। ভিডিও এবং কুইজের মাধ্যমে ইসিমের প্রকারভেদ, ফেলের প্রকারভেদ, হারফের প্রকারভেদ, এবং বাক্যে এদের ব্যবহার সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।",
    points: 18,
    learningObjectives: [
      "ইসিম, ফেল, হারফের মধ্যে পার্থক্য বুঝতে পারবে",
      "ইসিমের প্রকারভেদ ও ব্যবহার জানতে পারবে",
      "ফেলের প্রকারভেদ ও ব্যবহার জানতে পারবে",
      "হারফের প্রকারভেদ ও ব্যবহার জানতে পারবে",
      "আরবি বাক্য গঠনে ইসিম, ফেল, হারফের ভূমিকা বুঝতে পারবে",
    ],
    resources: [
      {
        title: "আরবি ব্যাকরণ - ভিডিও লেকচার সিরিজ",
        url: "https://www.youtube.com/watch?v=example52",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "ইসিম, ফেল, হারফ - অনলাইন কুইজ",
        url: "https://www.biggansala.org/quiz/arabic-grammar",
        type: "interactive",
        source: "বিজ্ঞানশালা কুইজ পোর্টাল",
      },
    ],
    author: {
      name: "মাওলানা আবদুল কাদের",
      title: "আরবি ভাষা বিশেষজ্ঞ, ইসলামিক আরবি বিশ্ববিদ্যালয়",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  {
    id: 58,
    title: "আরবি কথোপকথন: দৈনন্দিন ব্যবহার",
    category: "arabic",
    level: "class_8",
    duration: "১২ ঘন্টা",
    lessons: 18,
    students: 1450,
    rating: 4.6,
    instructor: "ড. আবদুল্লাহ আল মামুন",
    image:
      "https://images.pexels.com/photos/7516347/pexels-photo-7516347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    progress: 0,
    contentFormat: ["ভিডিও", "অডিও"],
    description:
      "এই কোর্সে ৮ম শ্রেণির শিক্ষার্থীরা আরবি কথোপকথনের অন্তর্গত দৈনন্দিন ব্যবহার সম্পর্কে শিখবে। ভিডিও এবং অডিওর মাধ্যমে পরিচয়, অভিবাদন, দিক নির্দেশনা, শপিং, রেস্টুরেন্ট, হোটেল, ট্রাভেল ইত্যাদি বিষয়ে আরবিতে কথোপকথন সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।",
    points: 20,
    learningObjectives: [
      "আরবিতে নিজের পরিচয় দিতে পারবে",
      "দৈনন্দিন বিভিন্ন পরিস্থিতিতে আরবিতে কথোপকথন করতে পারবে",
      "আরবি উচ্চারণ উন্নত করতে পারবে",
      "আরবিতে দিক নির্দেশনা, সময়, তারিখ ইত্যাদি বলতে পারবে",
      "আরবিতে শপিং, রেস্টুরेंट, হোটেল, ট্রাভেল সংক্রান্ত কথোপকথন করতে পারবে",
    ],
    resources: [
      {
        title: "আরবি কথোপকথন - ভিডিও সিরিজ",
        url: "https://www.youtube.com/watch?v=example53",
        type: "video",
        source: "বিজ্ঞানশালা ইউটিউব চ্যানেল",
      },
      {
        title: "আরবি উচ্চারণ - অডিও গাইড",
        url: "https://www.biggansala.org/audio/arabic-conversation",
        type: "audio",
        source: "বিজ্ঞানশালা অডিও লাইব্রেরি",
      },
      {
        title: "আরবি কথোপকথন - অনলাইন কুইজ",
        url: "https://www.biggansala.org/quiz/arabic-conversation",
        type: "interactive",
        source: "বিজ্ঞানশালা কুইজ পোর্টাল",
      },
    ],
    author: {
      name: "ড. আবদুল্লাহ আল মামুন",
      title: "আরবি ভাষা বিশেষজ্ঞ, ঢাকা বিশ্ববিদ্যালয়",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
]
