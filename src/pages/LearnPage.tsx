"use client"

import { Link } from "react-router-dom"
import { Search, BookOpen, Beaker, Dna, Calculator, BookText, Languages, BookMarked, Globe, BookA } from "lucide-react"
import { useAppContext } from "../context/AppContext"
import { categories } from "../data/courseData.tsx"
import React from "react"
import type { FC } from "react"

const LearnPage: FC = () => {
  const { addPoints } = useAppContext()
  const [searchQuery, setSearchQuery] = React.useState("")

  // Subject tiles data with icons and colors
  const subjectTiles = [
    {
      id: "physics",
      name: "পদার্থবিজ্ঞান",
      icon: <BookOpen className="h-12 w-12 mb-4" />,
      color: "from-blue-500 to-blue-700",
      textColor: "text-blue-600",
      path: "/subjects/physics",
      description: "গতি, বল, শক্তি, তাপ, আলো, শব্দ, তড়িৎ ও চুম্বকত্ব সম্পর্কে জানুন",
    },
    {
      id: "chemistry",
      name: "রসায়ন",
      icon: <Beaker className="h-12 w-12 mb-4" />,
      color: "from-green-500 to-green-700",
      textColor: "text-green-600",
      path: "/subjects/chemistry",
      description: "পদার্থের গঠন, রাসায়নিক বিক্রিয়া, অ্যাসিড-বেস সম্পর্কে জানুন",
    },
    {
      id: "biology",
      name: "জীববিজ্ঞান",
      icon: <Dna className="h-12 w-12 mb-4" />,
      color: "from-emerald-500 to-emerald-700",
      textColor: "text-emerald-600",
      path: "/subjects/biology",
      description: "জীবের গঠন, শারীরবৃত্ত, জেনেটিক্স, পরিবেশ সম্পর্কে জানুন",
    },
    {
      id: "mathematics",
      name: "গণিত",
      icon: <Calculator className="h-12 w-12 mb-4" />,
      color: "from-purple-500 to-purple-700",
      textColor: "text-purple-600",
      path: "/subjects/mathematics",
      description: "বীজগণিত, জ্যামিতি, ক্যালকুলাস, পরিসংখ্যান সম্পর্কে জানুন",
    },
    {
      id: "bangla",
      name: "বাংলা",
      icon: <BookText className="h-12 w-12 mb-4" />,
      color: "from-red-500 to-red-700",
      textColor: "text-red-600",
      path: "/subjects/bangla",
      description: "বাংলা ভাষা, সাহিত্য, ব্যাকরণ, রচনা সম্পর্কে জানুন",
    },
    {
      id: "english",
      name: "ইংরেজি",
      icon: <Languages className="h-12 w-12 mb-4" />,
      color: "from-cyan-500 to-cyan-700",
      textColor: "text-cyan-600",
      path: "/subjects/english",
      description: "ইংরেজি ভাষা, গ্রামার, স্পিকিং, রাইটিং সম্পর্কে জানুন",
    },
    {
      id: "religion",
      name: "ধর্ম শিক্ষা",
      icon: <BookMarked className="h-12 w-12 mb-4" />,
      color: "from-amber-500 to-amber-700",
      textColor: "text-amber-600",
      path: "/subjects/religion",
      description: "ইসলাম, হিন্দু, বৌদ্ধ, খ্রিস্টান ধর্ম সম্পর্কে জানুন",
    },
    {
      id: "arabic",
      name: "আরবি",
      icon: <BookA className="h-12 w-12 mb-4" />,
      color: "from-lime-500 to-lime-700",
      textColor: "text-lime-600",
      path: "/subjects/arabic",
      description: "আরবি ভাষা, ব্যাকরণ, উচ্চারণ সম্পর্কে জানুন",
    },
    {
      id: "general_science",
      name: "সাধারণ বিজ্ঞান/জিকে",
      icon: <Globe className="h-12 w-12 mb-4" />,
      color: "from-teal-500 to-teal-700",
      textColor: "text-teal-600",
      path: "/subjects/general-science",
      description: "বিজ্ঞান ও প্রযুক্তি, সাধারণ জ্ঞান সম্পর্কে জানুন",
    },
  ]

  // Filter subjects based on search query
  const filteredSubjects = subjectTiles.filter(
    (subject) => searchQuery === "" || subject.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">বিষয় সমূহ</h1>
            <p className="text-gray-600">আপনার পছন্দের বিষয় নির্বাচন করুন এবং শেখা শুরু করুন</p>
          </div>
          <div className="mt-4 md:mt-0 relative w-full md:w-72">
            <input
              type="text"
              placeholder="বিষয় খুঁজুন..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>

        {/* Subject Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map((subject) => (
            <Link
              key={subject.id}
              to={subject.path}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all transform hover:-translate-y-1"
            >
              <div className={`bg-gradient-to-r ${subject.color} h-24 flex items-center justify-center text-white`}>
                {subject.icon}
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${subject.textColor}`}>{subject.name}</h3>
                <p className="text-gray-600 mb-4">{subject.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {categories.find((c) => c.id === subject.id)?.name || subject.name}
                  </span>
                  <button
                    className={`px-4 py-1.5 rounded-md text-sm font-medium bg-gray-100 ${subject.textColor} hover:bg-gray-200 transition-colors`}
                  >
                    দেখুন
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LearnPage