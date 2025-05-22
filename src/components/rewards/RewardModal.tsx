"use client"

import type React from "react"
import { useState } from "react"
import { X, Award, Clock, AlertCircle, CheckCircle, Share2, Heart } from "lucide-react"
import { rewards } from "../../data/rewardsData"
import { useAppContext } from "../../context/AppContext"

interface RewardModalProps {
  rewardId: number
  onClose: () => void
}

const RewardModal: React.FC<RewardModalProps> = ({ rewardId, onClose }) => {
  const reward = rewards.find((r) => r.id === rewardId)
  const { points, redeemReward, favoriteRewards, toggleFavoriteReward, userTier, getDiscountForTier } = useAppContext()

  const [isRedeeming, setIsRedeeming] = useState(false)
  const [redeemResult, setRedeemResult] = useState<{
    success: boolean
    message: string
    code?: string
    redeemedRewardId?: number
  } | null>(null)

  const [isSharing, setIsSharing] = useState(false)

  if (!reward) {
    return null
  }

  // Apply tier discount to the reward cost
  const tierDiscount = getDiscountForTier(userTier)
  const discountedCost = Math.floor(reward.pointsCost * (1 - tierDiscount / 100))

  const canAfford = points >= discountedCost
  const isFavorite = favoriteRewards.includes(reward.id)

  const handleRedeem = async () => {
    if (!canAfford || isRedeeming) return

    setIsRedeeming(true)

    try {
      const result = await redeemReward(reward)

      if (result.success) {
        setRedeemResult({
          success: true,
          message: result.message,
          code: result.redeemedReward?.code,
          redeemedRewardId: result.redeemedReward?.id,
        })
      } else {
        setRedeemResult({
          success: false,
          message: result.message,
        })
      }
    } catch (error) {
      setRedeemResult({
        success: false,
        message: "একটি ত্রুটি ঘটেছে। আবার চেষ্টা করুন।",
      })
    } finally {
      setIsRedeeming(false)
    }
  }

  const handleShare = () => {
    if (!redeemResult?.redeemedRewardId) return

    setIsSharing(true)

    // Simulate sharing process
    setTimeout(() => {
      // In a real app, this would open a share dialog
      alert("রিওয়ার্ড শেয়ার করার জন্য আপনাকে ধন্যবাদ! আপনি ৫০ বোনাস পয়েন্ট পেয়েছেন।")
      setIsSharing(false)
    }, 1000)
  }

  const handleFavoriteToggle = () => {
    toggleFavoriteReward(reward.id)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="relative h-48">
          <img src={reward.image || "/placeholder.svg"} alt={reward.title} className="w-full h-full object-cover" />
          <button
            className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>

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

          {reward.discount && (
            <div className="absolute bottom-2 right-2 bg-red-600 text-white px-3 py-1 rounded-md">
              {reward.discount} ছাড়
            </div>
          )}

          {reward.limitedTime && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded animate-pulse">
              সীমিত সময়
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-bold">{reward.title}</h2>
            <button
              className={`p-2 rounded-full ${isFavorite ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"}`}
              onClick={handleFavoriteToggle}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
            </button>
          </div>

          <p className="text-gray-600 mb-4">{reward.description}</p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-indigo-600">
              <Award className="h-5 w-5 mr-2" />
              <span className="font-semibold text-lg">
                {discountedCost < reward.pointsCost ? (
                  <>
                    <span className="line-through text-gray-400 text-sm mr-1">{reward.pointsCost}</span>
                    {discountedCost}
                  </>
                ) : (
                  discountedCost
                )}{" "}
                পয়েন্ট
              </span>
            </div>
            <div className="flex items-center text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>মেয়াদ: {reward.expiryDays} দিন</span>
            </div>
          </div>

          {tierDiscount > 0 && discountedCost < reward.pointsCost && (
            <div className="mb-4 p-2 bg-green-50 border border-green-100 rounded-md text-sm text-green-700">
              আপনার {userTier} টিয়ারের জন্য {tierDiscount}% ছাড় প্রযোজ্য হয়েছে!
            </div>
          )}

          {reward.instructions && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">ব্যবহার নির্দেশিকা:</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                {reward.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block h-5 w-5 rounded-full bg-indigo-100 text-indigo-800 text-xs flex items-center justify-center mr-2 mt-0.5">
                      {index + 1}
                    </span>
                    {instruction}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {redeemResult ? (
            <div
              className={`p-4 rounded-lg mb-4 ${
                redeemResult.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
              }`}
            >
              <div className="flex items-center mb-2">
                {redeemResult.success ? (
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                )}
                <span className={redeemResult.success ? "text-green-800" : "text-red-800"}>{redeemResult.message}</span>
              </div>

              {redeemResult.success && redeemResult.code && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-1">আপনার কুপন কোড:</p>
                  <div className="bg-gray-100 p-3 rounded text-center font-mono font-semibold tracking-wider">
                    {redeemResult.code}
                  </div>

                  <button
                    className="mt-3 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition-colors disabled:bg-blue-300"
                    onClick={handleShare}
                    disabled={isSharing}
                  >
                    <Share2 className="h-4 w-4" />
                    {isSharing ? "শেয়ার করা হচ্ছে..." : "শেয়ার করুন এবং ৫০ পয়েন্ট পান"}
                  </button>
                </div>
              )}
            </div>
          ) : null}

          <div className="flex gap-3">
            <button
              className="flex-1 py-2 border border-gray-300 rounded-md font-medium hover:bg-gray-50"
              onClick={onClose}
            >
              বাতিল করুন
            </button>

            <button
              className={`flex-1 py-2 rounded-md font-medium transition-colors ${
                canAfford && !isRedeeming && !redeemResult
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!canAfford || isRedeeming || redeemResult !== null}
              onClick={handleRedeem}
            >
              {isRedeeming ? "অপেক্ষা করুন..." : redeemResult ? "রিডিম করা হয়েছে" : "রিডিম করুন"}
            </button>
          </div>

          {!canAfford && !redeemResult && (
            <p className="text-sm text-red-600 mt-2 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              আপনার পয়েন্ট পর্যাপ্ত নয়। আরও {discountedCost - points} পয়েন্ট প্রয়োজন।
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default RewardModal
