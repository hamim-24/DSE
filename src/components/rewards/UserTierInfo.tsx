"use client"

import type React from "react"
import { useAppContext } from "../../context/AppContext"
import { Award, ChevronRight, Star } from "lucide-react"

const UserTierInfo: React.FC = () => {
  const { userTier, totalPointsEarned, getDiscountForTier } = useAppContext()

  // Calculate progress to next tier
  let nextTier: "silver" | "gold" | "platinum" | null = null
  let currentTierMinPoints = 0
  let nextTierMinPoints = 0

  switch (userTier) {
    case "bronze":
      nextTier = "silver"
      nextTierMinPoints = 2000
      break
    case "silver":
      currentTierMinPoints = 2000
      nextTier = "gold"
      nextTierMinPoints = 5000
      break
    case "gold":
      currentTierMinPoints = 5000
      nextTier = "platinum"
      nextTierMinPoints = 10000
      break
    case "platinum":
      currentTierMinPoints = 10000
      nextTier = null
      break
  }

  const progress = nextTier
    ? Math.min(100, ((totalPointsEarned - currentTierMinPoints) / (nextTierMinPoints - currentTierMinPoints)) * 100)
    : 100

  const pointsToNextTier = nextTier ? nextTierMinPoints - totalPointsEarned : 0

  // Tier benefits
  const tierBenefits = {
    bronze: ["সকল রিওয়ার্ডে ৫% ছাড়", "বেসিক সাপোর্ট", "সাধারণ রিওয়ার্ড অ্যাক্সেস"],
    silver: ["সকল রিওয়ার্ডে ১০% ছাড়", "প্রিমিয়াম সাপোর্ট", "সিলভার রিওয়ার্ড অ্যাক্সেস", "বিশেষ ইভেন্টের আমন্ত্রণ"],
    gold: ["সকল রিওয়ার্ডে ১৫% ছাড়", "প্রায়োরিটি সাপোর্ট", "গোল্ড রিওয়ার্ড অ্যাক্সেস", "বিশেষ ইভেন্টের আমন্ত্রণ", "মাসিক বোনাস পয়েন্ট"],
    platinum: [
      "সকল রিওয়ার্ডে ২০% ছাড়",
      "২৪/৭ ডেডিকেটেড সাপোর্ট",
      "সকল রিওয়ার্ড অ্যাক্সেস",
      "বিশেষ ইভেন্টের আমন্ত্রণ",
      "মাসিক বোনাস পয়েন্ট",
      "এক্সক্লুসিভ কন্টেন্ট অ্যাক্সেস",
    ],
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div
        className={`p-6 text-white ${
          userTier === "bronze"
            ? "bg-gradient-to-r from-amber-600 to-amber-800"
            : userTier === "silver"
              ? "bg-gradient-to-r from-gray-500 to-gray-700"
              : userTier === "gold"
                ? "bg-gradient-to-r from-amber-400 to-amber-600"
                : "bg-gradient-to-r from-purple-600 to-purple-800"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold flex items-center">
            <Award className="h-6 w-6 mr-2" />
            {userTier === "bronze"
              ? "ব্রোঞ্জ"
              : userTier === "silver"
                ? "সিলভার"
                : userTier === "gold"
                  ? "গোল্ড"
                  : "প্লাটিনাম"}{" "}
            টিয়ার
          </h3>
          <div className="flex">
            {[...Array(userTier === "bronze" ? 1 : userTier === "silver" ? 2 : userTier === "gold" ? 3 : 4)].map(
              (_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ),
            )}
          </div>
        </div>

        <p className="text-white text-opacity-90 mb-4">আপনি {getDiscountForTier(userTier)}% ছাড় পাচ্ছেন সকল রিওয়ার্ডে!</p>

        {nextTier && (
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>প্রগ্রেস</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-2.5">
              <div className="h-2.5 rounded-full bg-white" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-sm mt-2 text-white text-opacity-90">
              {nextTier === "silver" ? "সিলভার" : nextTier === "gold" ? "গোল্ড" : "প্লাটিনাম"} টিয়ারে উন্নীত হতে আরও{" "}
              {pointsToNextTier} পয়েন্ট অর্জন করুন
            </p>
          </div>
        )}
      </div>

      <div className="p-6">
        <h4 className="font-semibold mb-3">আপনার টিয়ার সুবিধাসমূহ</h4>
        <ul className="space-y-2">
          {tierBenefits[userTier].map((benefit, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <ChevronRight className="h-4 w-4 text-indigo-600 mr-2" />
              {benefit}
            </li>
          ))}
        </ul>

        {nextTier && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h4 className="font-semibold mb-3">পরবর্তী টিয়ার সুবিধাসমূহ</h4>
            <ul className="space-y-2">
              {tierBenefits[nextTier].map((benefit, index) => (
                <li key={index} className="flex items-center text-gray-500">
                  <ChevronRight className="h-4 w-4 text-gray-400 mr-2" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserTierInfo
