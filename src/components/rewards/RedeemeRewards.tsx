"use client"

import type React from "react"
import { useAppContext } from "../../context/AppContext"
import { rewards } from "../../data/rewardsData"
import { Clock, CheckCircle } from "lucide-react"

const RedeemedRewards: React.FC = () => {
  const { redeemedRewards, markRewardAsUsed } = useAppContext()

  if (redeemedRewards.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-500">আপনি এখনও কোন রিওয়ার্ড রিডিম করেননি</p>
      </div>
    )
  }

  // Sort by redemption date (newest first)
  const sortedRewards = [...redeemedRewards].sort(
    (a, b) => new Date(b.redeemedAt).getTime() - new Date(a.redeemedAt).getTime(),
  )

  return (
    <div className="space-y-4">
      {sortedRewards.map((redeemedReward) => {
        const reward = rewards.find((r) => r.id === redeemedReward.rewardId)
        if (!reward) return null

        const isExpired = new Date() > new Date(redeemedReward.expiresAt)

        return (
          <div
            key={redeemedReward.id}
            className={`bg-white rounded-lg border overflow-hidden ${
              redeemedReward.used ? "border-gray-200" : isExpired ? "border-red-200" : "border-green-200"
            }`}
          >
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-1/4 h-24 sm:h-auto">
                <img
                  src={reward.image || "/placeholder.svg"}
                  alt={reward.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{reward.title}</h3>
                  <div
                    className={`px-2 py-1 rounded text-xs ${
                      redeemedReward.used
                        ? "bg-gray-100 text-gray-600"
                        : isExpired
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                    }`}
                  >
                    {redeemedReward.used ? "ব্যবহৃত" : isExpired ? "মেয়াদ শেষ" : "সক্রিয়"}
                  </div>
                </div>

                <div className="mt-2 text-sm text-gray-500 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>
                    {isExpired
                      ? `মেয়াদ শেষ হয়েছে ${new Date(redeemedReward.expiresAt).toLocaleDateString("bn-BD")}`
                      : `মেয়াদ শেষ হবে ${new Date(redeemedReward.expiresAt).toLocaleDateString("bn-BD")}`}
                  </span>
                </div>

                <div className="mt-3">
                  <div className="text-sm text-gray-600 mb-1">কুপন কোড:</div>
                  <div className="bg-gray-100 p-2 rounded text-center font-mono font-semibold tracking-wider">
                    {redeemedReward.code}
                  </div>
                </div>

                {!redeemedReward.used && !isExpired && (
                  <button
                    className="mt-3 text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
                    onClick={() => markRewardAsUsed(redeemedReward.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    ব্যবহৃত হিসেবে চিহ্নিত করুন
                  </button>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default RedeemedRewards
