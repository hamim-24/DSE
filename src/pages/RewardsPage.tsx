"use client"

import type React from "react"
import { useState } from "react"
import { useAppContext } from "../context/AppContext"
import { rewardCategories, rewards, type RewardCategory } from "../data/rewardsData"
import { Award, Search, Filter, ChevronRight, Tag, Clock, Heart, Zap, History } from "lucide-react"
import RewardCard from "../components/rewards/RewardCard"
import RewardModal from "../components/rewards/RewardModal"
import UserTierInfo from "../components/rewards/UserTierInfo"
import PointsHistory from "../components/rewards/PointsHistory"

const RewardsPage: React.FC = () => {
  const { points, userTier, favoriteRewards } = useAppContext()
  const [selectedCategory, setSelectedCategory] = useState<RewardCategory | "all" | "favorites">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedReward, setSelectedReward] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState<"rewards" | "history" | "tier">("rewards")

  // Filter rewards based on category, favorites, and search query
  const filteredRewards = rewards.filter((reward) => {
    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "favorites" ? favoriteRewards.includes(reward.id) : reward.category === selectedCategory)

    const matchesSearch =
      reward.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reward.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  const handleRewardClick = (rewardId: number) => {
    setSelectedReward(rewardId)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedReward(null)
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">রিওয়ার্ড সেন্টার</h1>
          <p className="text-gray-600">আপনার পয়েন্ট ব্যবহার করে আকর্ষণীয় রিওয়ার্ড রিডিম করুন</p>
        </div>

        {/* Points Balance */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">আপনার পয়েন্ট ব্যালেন্স</h2>
              <p className="text-sm opacity-80">পয়েন্ট অর্জন করতে কোর্স সম্পন্ন করুন এবং কুইজে অংশগ্রহণ করুন</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-white bg-opacity-20 px-5 py-3 rounded-lg">
                <Award className="h-6 w-6 mr-2" />
                <span className="text-2xl font-bold">{points}</span>
              </div>
              <div
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  userTier === "bronze"
                    ? "bg-amber-500 bg-opacity-30"
                    : userTier === "silver"
                      ? "bg-gray-300 bg-opacity-30"
                      : userTier === "gold"
                        ? "bg-amber-400 bg-opacity-30"
                        : "bg-purple-400 bg-opacity-30"
                }`}
              >
                {userTier === "bronze"
                  ? "ব্রোঞ্জ"
                  : userTier === "silver"
                    ? "সিলভার"
                    : userTier === "gold"
                      ? "গোল্ড"
                      : "প্লাটিনাম"}{" "}
                টিয়ার
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex border-b border-gray-200">
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === "rewards"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("rewards")}
            >
              <span className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                রিওয়ার্ডস
              </span>
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === "history"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("history")}
            >
              <span className="flex items-center">
                <History className="h-5 w-5 mr-2" />
                পয়েন্ট হিস্টোরি
              </span>
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === "tier"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("tier")}
            >
              <span className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                আমার টিয়ার
              </span>
            </button>
          </div>
        </div>

        {activeTab === "rewards" && (
          <>
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="রিওয়ার্ড খুঁজুন..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as RewardCategory | "all" | "favorites")}
                >
                  <option value="all">সব ক্যাটাগরি</option>
                  <option value="favorites">পছন্দের রিওয়ার্ড</option>
                  {rewardCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 h-5 w-5" />
              </div>
            </div>

            {/* Categories */}
            <div className="flex overflow-x-auto pb-4 mb-8 gap-3 hide-scrollbar">
              <button
                className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedCategory === "all"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setSelectedCategory("all")}
              >
                সব ক্যাটাগরি
              </button>
              <button
                className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedCategory === "favorites"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setSelectedCategory("favorites")}
              >
                <Heart className="h-4 w-4 mr-2" />
                পছন্দের
              </button>
              {rewardCategories.map((category) => {
                const CategoryIcon = category.icon
                return (
                  <button
                    key={category.id}
                    className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap ${
                      selectedCategory === category.id
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setSelectedCategory(category.id as RewardCategory)}
                  >
                    <CategoryIcon className="h-4 w-4 mr-2" />
                    {category.name}
                  </button>
                )
              })}
            </div>

            {/* Featured Rewards */}
            {selectedCategory === "all" && searchQuery === "" && (
              <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold flex items-center">
                    <Tag className="h-5 w-5 mr-2 text-indigo-600" />
                    ফিচার্ড রিওয়ার্ড
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rewards
                    .filter((reward) => reward.featured)
                    .map((reward) => (
                      <RewardCard key={reward.id} reward={reward} onClick={() => handleRewardClick(reward.id)} />
                    ))}
                </div>
              </div>
            )}

            {/* Limited Time Offers */}
            {selectedCategory === "all" && searchQuery === "" && (
              <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-red-600" />
                    সীমিত সময়ের অফার
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rewards
                    .filter((reward) => reward.limitedTime)
                    .map((reward) => (
                      <RewardCard key={reward.id} reward={reward} onClick={() => handleRewardClick(reward.id)} />
                    ))}
                </div>
              </div>
            )}

            {/* All Rewards or Filtered Rewards */}
            <div>
              <h2 className="text-xl font-bold mb-4">
                {selectedCategory === "all"
                  ? "সকল রিওয়ার্ড"
                  : selectedCategory === "favorites"
                    ? "পছন্দের রিওয়ার্ড"
                    : rewardCategories.find((c) => c.id === selectedCategory)?.name}
              </h2>
              {filteredRewards.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRewards.map((reward) => (
                    <RewardCard key={reward.id} reward={reward} onClick={() => handleRewardClick(reward.id)} />
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <p className="text-gray-500">কোন রিওয়ার্ড পাওয়া যায়নি</p>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === "history" && <PointsHistory />}

        {activeTab === "tier" && <UserTierInfo />}
      </div>

      {/* Reward Detail Modal */}
      {showModal && selectedReward && <RewardModal rewardId={selectedReward} onClose={closeModal} />}
    </div>
  )
}

export default RewardsPage
