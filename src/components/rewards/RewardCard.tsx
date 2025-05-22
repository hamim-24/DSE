"use client"

import type React from "react"
import { Award, Clock, Heart } from "lucide-react"
import type { Reward } from "../../data/rewardsData"
import { useAppContext } from "../../context/AppContext"

interface RewardCardProps {
  reward: Reward
  onClick: () => void
}

const RewardCard: React.FC<RewardCardProps> = ({ reward, onClick }) => {
  const { points, favoriteRewards, toggleFavoriteReward, userTier, getDiscountForTier } = useAppContext()

  // Apply tier discount to the reward cost
  const tierDiscount = getDiscountForTier(userTier)
  const discountedCost = Math.floor(reward.pointsCost * (1 - tierDiscount / 100))

  const canAfford = points >= discountedCost
  const isFavorite = favoriteRewards.includes(reward.id)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click
    toggleFavoriteReward(reward.id)
  }

  return (
    <div
      className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all ${
        !canAfford ? "opacity-70" : ""
      } ${reward.tier === "gold" ? "ring-2 ring-amber-400" : reward.tier === "platinum" ? "ring-2 ring-purple-400" : ""}`}
      onClick={onClick}
    >
      <div className="relative h-40">
        <img src={reward.image || "/placeholder.svg"} alt={reward.title} className="w-full h-full object-cover" />

        {/* Favorite button */}
        <button
          className={`absolute top-2 right-2 p-1.5 rounded-full ${
            isFavorite ? "bg-red-500 text-white" : "bg-white bg-opacity-70 text-gray-600"
          }`}
          onClick={handleFavoriteClick}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
        </button>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {reward.featured && <div className="bg-indigo-600 text-white text-xs px-2 py-1 rounded">ফিচার্ড</div>}
          {reward.new && <div className="bg-green-600 text-white text-xs px-2 py-1 rounded">নতুন</div>}
          {reward.popular && <div className="bg-amber-600 text-white text-xs px-2 py-1 rounded">জনপ্রিয়</div>}
          {reward.limitedTime && (
            <div className="bg-red-600 text-white text-xs px-2 py-1 rounded animate-pulse">সীমিত সময়</div>
          )}
        </div>

        {/* Tier badge */}
        {reward.tier && (
          <div
            className={`absolute bottom-2 left-2 rounded-full px-2 py-0.5 text-xs font-medium ${
              reward.tier === "bronze"
                ? "bg-amber-100 text-amber-800"
                : reward.tier === "silver"
                  ? "bg-gray-200 text-gray-800"
                  : reward.tier === "gold"
                    ? "bg-amber-200 text-amber-800"
                    : "bg-purple-200 text-purple-800"
            }`}
          >
            {reward.tier === "bronze"
              ? "ব্রোঞ্জ"
              : reward.tier === "silver"
                ? "সিলভার"
                : reward.tier === "gold"
                  ? "গোল্ড"
                  : "প্লাটিনাম"}
          </div>
        )}

        {/* Discount badge */}
        {reward.discount && (
          <div className="absolute bottom-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
            {reward.discount} ছাড়
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{reward.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{reward.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-indigo-600">
            <Award className="h-4 w-4 mr-1" />
            <span className="font-semibold">
              {discountedCost < reward.pointsCost ? (
                <>
                  <span className="line-through text-gray-400 text-xs mr-1">{reward.pointsCost}</span>
                  {discountedCost}
                </>
              ) : (
                discountedCost
              )}{" "}
              পয়েন্ট
            </span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="h-3 w-3 mr-1" />
            <span>{reward.expiryDays} দিন</span>
          </div>
        </div>

        {tierDiscount > 0 && discountedCost < reward.pointsCost && (
          <div className="mt-1 text-xs text-green-600">
            আপনার {userTier} টিয়ারের জন্য {tierDiscount}% ছাড়!
          </div>
        )}

        <button
          className={`w-full mt-3 py-2 rounded-md font-medium transition-colors ${
            canAfford ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!canAfford}
        >
          {canAfford ? "রিডিম করুন" : "পয়েন্ট অপর্যাপ্ত"}
        </button>
      </div>
    </div>
  )
}

export default RewardCard
