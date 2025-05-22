import { Gift, ShoppingBag, Wifi, Phone, Gamepad2, BookOpen, Bus, Ticket, Music, Heart } from "lucide-react"

export type RewardCategory =
  | "food"
  | "shopping"
  | "internet"
  | "mobile"
  | "entertainment"
  | "education"
  | "travel"
  | "events"
  | "health"
  | "music"

export interface Reward {
  id: number
  title: string
  description: string
  pointsCost: number
  category: RewardCategory
  image: string
  expiryDays: number
  featured?: boolean
  popular?: boolean
  new?: boolean
  discount?: string
  code?: string
  instructions?: string[]
  tier?: "bronze" | "silver" | "gold" | "platinum" // New tier system
  limitedTime?: boolean // For limited-time offers
  partnerLogo?: string // For partner branding
}

export const rewardCategories = [
  {
    id: "food",
    name: "খাবার",
    icon: Gift,
    color: "bg-red-100 text-red-600",
  },
  {
    id: "shopping",
    name: "শপিং",
    icon: ShoppingBag,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "internet",
    name: "ইন্টারনেট",
    icon: Wifi,
    color: "bg-green-100 text-green-600",
  },
  {
    id: "mobile",
    name: "মোবাইল",
    icon: Phone,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    id: "entertainment",
    name: "বিনোদন",
    icon: Gamepad2,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "education",
    name: "শিক্ষা",
    icon: BookOpen,
    color: "bg-indigo-100 text-indigo-600",
  },
  // New categories
  {
    id: "travel",
    name: "ভ্রমণ",
    icon: Bus,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    id: "events",
    name: "ইভেন্ট",
    icon: Ticket,
    color: "bg-pink-100 text-pink-600",
  },
  {
    id: "health",
    name: "স্বাস্থ্য",
    icon: Heart,
    color: "bg-rose-100 text-rose-600",
  },
  {
    id: "music",
    name: "সঙ্গীত",
    icon: Music,
    color: "bg-amber-100 text-amber-600",
  },
]

// Add new rewards and update existing ones
export const rewards: Reward[] = [
  {
    id: 1,
    title: "ফুডপান্ডা ১৫০ টাকা ডিসকাউন্ট",
    description: "ফুডপান্ডা থেকে অর্ডার করার সময় ১৫০ টাকা ছাড় পাবেন",
    pointsCost: 500,
    category: "food",
    image:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    expiryDays: 30,
    featured: true,
    discount: "১৫০ টাকা",
    code: "BIJNAN150",
    tier: "bronze",
    partnerLogo: "https://foodpanda.com/logo.png",
    instructions: [
      "ফুডপান্ডা অ্যাপ ওপেন করুন",
      "খাবার অর্ডার করুন",
      'চেকআউট পেজে কুপন কোড "BIJNAN150" ব্যবহার করুন',
      "ন্যূনতম অর্ডার ৩০০ টাকা হতে হবে",
    ],
  },
  {
    id: 2,
    title: "রকমারি ২০০ টাকা ভাউচার",
    description: "রকমারি থেকে বই কেনার সময় ২০০ টাকা ছাড় পাবেন",
    pointsCost: 600,
    category: "shopping",
    image:
      "https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    expiryDays: 60,
    popular: true,
    discount: "২০০ টাকা",
    code: "BIJNAN200",
    tier: "silver",
    instructions: [
      "রকমারি ওয়েবসাইট বা অ্যাপ ওপেন করুন",
      "পছন্দের বই কার্টে যোগ করুন",
      'চেকআউট পেজে কুপন কোড "BIJNAN200" ব্যবহার করুন',
      "ন্যূনতম অর্ডার ৫০০ টাকা হতে হবে",
    ],
  },
  {
    id: 3,
    title: "১ জিবি ইন্টারনেট ডেটা",
    description: "গ্রামীণফোন সিমে ১ জিবি ইন্টারনেট ডেটা",
    pointsCost: 300,
    category: "internet",
    image:
      "https://images.pexels.com/photos/4144179/pexels-photo-4144179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    expiryDays: 7,
    new: true,
    tier: "bronze",
    instructions: [
      "রিডিম করার পর আপনার রেজিস্টার্ড মোবাইল নম্বরে একটি কোড পাঠানো হবে",
      "*121*code# ডায়াল করুন",
      "ডেটা ৭ দিনের জন্য বৈধ থাকবে",
    ],
  },
  {
    id: 4,
    title: "৫০ মিনিট টকটাইম",
    description: "যেকোনো অপারেটরে ৫০ মিনিট কথা বলার সুযোগ",
    pointsCost: 250,
    category: "mobile",
    image:
      "https://images.pexels.com/photos/5053740/pexels-photo-5053740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    expiryDays: 15,
    instructions: [
      "রিডিম করার পর আপনার রেজিস্টার্ড মোবাইল নম্বরে একটি কোড পাঠানো হবে",
      "*111*code# ডায়াল করুন",
      "মিনিট ১৫ দিনের জন্য বৈধ থাকবে",
    ],
  },
  {
    id: 5,
    title: "শিশুদের জন্য বিশেষ কার্টুন অ্যাক্সেস",
    description: "শিশুদের জন্য বিশেষ শিক্ষামূলক কার্টুন দেখার সুযোগ",
    pointsCost: 200,
    category: "entertainment",
    image:
      "https://images.pexels.com/photos/1816642/pexels-photo-1816642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    expiryDays: 30,
    featured: true,
    instructions: [
      "রিডিম করার পর আপনি একটি অ্যাক্সেস কোড পাবেন",
      'বিজ্ঞানশালা অ্যাপের "বিনোদন" সেকশনে যান',
      "প্রাপ্ত কোড দিয়ে লগইন করুন",
      "শিক্ষামূলক কার্টুন দেখতে পারবেন",
    ],
  },
  {
    id: 6,
    title: "দারাজ ৩০০ টাকা ডিসকাউন্ট",
    description: "দারাজ থেকে কেনাকাটায় ৩০০ টাকা ছাড়",
    pointsCost: 800,
    category: "shopping",
    image:
      "https://images.pexels.com/photos/5076516/pexels-photo-5076516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    expiryDays: 45,
    popular: true,
    discount: "৩০০ টাকা",
    code: "BIJNAN300",
    instructions: [
      "দারাজ অ্যাপ ওপেন করুন",
      "পছন্দের পণ্য কার্টে যোগ করুন",
      'চেকআউট পেজে কুপন কোড "BIJNAN300" ব্যবহার করুন',
      "ন্যূনতম অর্ডার ১০০০ টাকা হতে হবে",
    ],
  },
  {
    id: 7,
    title: "২ জিবি ইন্টারনেট ডেটা",
    description: "বাংলালিংক সিমে ২ জিবি ইন্টারনেট ডেটা",
    pointsCost: 550,
    category: "internet",
    image:
      "https://images.pexels.com/photos/7433822/pexels-photo-7433822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    expiryDays: 10,
    instructions: [
      "রিডিম করার পর আপনার রেজিস্টার্ড মোবাইল নম্বরে একটি কোড পাঠানো হবে",
      "*123*code# ডায়াল করুন",
      "ডেটা ১০ দিনের জন্য বৈধ থাকবে",
    ],
  },
  {
    id: 8,
    title: "শিক্ষামূলক গেম অ্যাক্সেস",
    description: "শিশুদের জন্য বিশেষ শিক্ষামূলক গেম খেলার সুযোগ",
    pointsCost: 350,
    category: "entertainment",
    image:
      "https://images.pexels.com/photos/159393/gamepad-video-game-controller-game-controller-controller-159393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    expiryDays: 30,
    new: true,
    instructions: [
      "রিডিম করার পর আপনি একটি অ্যাক্সেস কোড পাবেন",
      'বিজ্ঞানশালা অ্যাপের "গেম" সেকশনে যান',
      "প্রাপ্ত কোড দিয়ে লগইন করুন",
      "শিক্ষামূলক গেম খেলতে পারবেন",
    ],
  },
  {
    id: 9,
    title: "প্রিমিয়াম কোর্স অ্যাক্সেস",
    description: "বিজ্ঞানশালার প্রিমিয়াম কোর্স ১ মাসের জন্য ফ্রি অ্যাক্সেস",
    pointsCost: 1000,
    category: "education",
    image:
      "https://images.pexels.com/photos/4144294/pexels-photo-4144294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    expiryDays: 30,
    featured: true,
    instructions: [
      "রিডিম করার পর আপনি একটি অ্যাক্সেস কোড পাবেন",
      'বিজ্ঞানশালা অ্যাপের "প্রিমিয়াম কোর্স" সেকশনে যান',
      "প্রাপ্ত কোড দিয়ে অ্যাক্সেস অ্যাক্টিভেট করুন",
      "১ মাসের জন্য সকল প্রিমিয়াম কোর্স দেখতে পারবেন",
    ],
  },
  {
    id: 10,
    title: "পাঠশালা ৫০০ টাকা ভাউচার",
    description: "পাঠশালা থেকে বই কেনার সময় ৫০০ টাকা ছাড়",
    pointsCost: 1200,
    category: "education",
    image:
      "https://images.pexels.com/photos/256431/pexels-photo-256431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    expiryDays: 90,
    discount: "৫০০ টাকা",
    code: "BIJNAN500",
    instructions: [
      "পাঠশালা ওয়েবসাইট বা অ্যাপ ওপেন করুন",
      "পছন্দের বই কার্টে যোগ করুন",
      'চেকআউট পেজে কুপন কোড "BIJNAN500" ব্যবহার করুন',
      "ন্যূনতম অর্ডার ১০০০ টাকা হতে হবে",
    ],
  },
  {
    id: 11,
    title: "কফি ওয়ার্ল্ড ১০০ টাকা ভাউচার",
    description: "কফি ওয়ার্ল্ড থেকে কফি কেনার সময় ১০০ টাকা ছাড়",
    pointsCost: 350,
    category: "food",
    image:
      "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    expiryDays: 30,
    discount: "১০০ টাকা",
    code: "COFFEE100",
    tier: "bronze",
    limitedTime: true,
    instructions: ["কফি ওয়ার্ল্ড আউটলেটে যান", "অর্ডার দেওয়ার সময় কুপন কোড দেখান", "ন্যূনতম অর্ডার ২০০ টাকা হতে হবে"],
  },
  {
    id: 12,
    title: "ঢাকা-কক্সবাজার বাস টিকেট ১০% ছাড়",
    description: "হানিফ পরিবহন থেকে ঢাকা-কক্সবাজার বাস টিকেটে ১০% ছাড়",
    pointsCost: 800,
    category: "travel",
    image:
      "https://images.pexels.com/photos/68629/pexels-photo-68629.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    expiryDays: 90,
    discount: "১০%",
    tier: "silver",
    new: true,
    instructions: ["হানিফ পরিবহনের কাউন্টারে যান", "টিকেট কেনার সময় কুপন কোড দেখান", "সপ্তাহান্তে বা ছুটির দিনে প্রযোজ্য নয়"],
  },
  {
    id: 13,
    title: "কনসার্ট টিকেট ২০% ছাড়",
    description: "আগামী মাসের যেকোনো কনসার্টের টিকেটে ২০% ছাড়",
    pointsCost: 1000,
    category: "events",
    image:
      "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    expiryDays: 30,
    discount: "২০%",
    tier: "gold",
    limitedTime: true,
    instructions: ["টিকেট কাউন্টারে যান", "টিকেট কেনার সময় কুপন কোড দেখান", "একজন ব্যক্তি সর্বোচ্চ দুটি টিকেটে ছাড় পাবেন"],
  },
  {
    id: 14,
    title: "ফিটনেস সেন্টার ৭ দিনের ফ্রি ট্রায়াল",
    description: "ঢাকার যেকোনো ফিটনেস ফার্স্ট সেন্টারে ৭ দিনের ফ্রি ট্রায়াল",
    pointsCost: 700,
    category: "health",
    image:
      "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    expiryDays: 60,
    tier: "silver",
    featured: true,
    instructions: ["ফিটনেস ফার্স্ট সেন্টারে যান", "রিসেপশনে কুপন কোড দেখান", "আপনার আইডি কার্ড সাথে নিয়ে যান"],
  },
  {
    id: 15,
    title: "স্পটিফাই প্রিমিয়াম ১ মাস",
    description: "স্পটিফাই প্রিমিয়াম ১ মাসের সাবস্ক্রিপশন",
    pointsCost: 1200,
    category: "music",
    image:
      "https://images.pexels.com/photos/9069214/pexels-photo-9069214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    expiryDays: 30,
    tier: "gold",
    popular: true,
    instructions: ["স্পটিফাই অ্যাপ ওপেন করুন", "প্রিমিয়াম সাবস্ক্রিপশন পেজে যান", "কুপন কোড ব্যবহার করুন"],
  },
]

// Helper functions
export const getRewardsByCategory = (category: RewardCategory): Reward[] => {
  return rewards.filter((reward) => reward.category === category)
}

export const getFeaturedRewards = (): Reward[] => {
  return rewards.filter((reward) => reward.featured)
}

export const getPopularRewards = (): Reward[] => {
  return rewards.filter((reward) => reward.popular)
}

export const getNewRewards = (): Reward[] => {
  return rewards.filter((reward) => reward.new)
}

export const getLimitedTimeRewards = (): Reward[] => {
  return rewards.filter((reward) => reward.limitedTime)
}

export const getRewardsByTier = (tier: "bronze" | "silver" | "gold" | "platinum"): Reward[] => {
  return rewards.filter((reward) => reward.tier === tier)
}
