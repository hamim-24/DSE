"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { BookOpen, Star, Clock, Users, Award, Filter, Search, ArrowLeft, SlidersHorizontal, X } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useAppContext } from "../../context/AppContext"
import ContentDetailModal from "../../components/modals/ContentDetailModal"
import { courses, levels, getContentFormatIcon } from "../../data/courseData.tsx"
import { motion, AnimatePresence } from "framer-motion"

// Define filter types
type FilterState = {
  level: string | null
  format: string[]
  duration: string | null
  rating: number | null
  searchQuery: string
  sortBy: "newest" | "popular" | "rating" | "title"
}

const GeneralSciencePage: React.FC = () => {
  const { addPoints } = useAppContext()
  const navigate = useNavigate()

  // State for filters
  const [filters, setFilters] = useState<FilterState>({
    level: null,
    format: [],
    duration: null,
    rating: null,
    searchQuery: "",
    sortBy: "popular",
  })

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [selectedContent, setSelectedContent] = useState<any | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  // Update active filters whenever filters change
  useEffect(() => {
    const newActiveFilters: string[] = []

    if (filters.level) {
      newActiveFilters.push(`শ্রেণি: ${levels.find((l) => l.id === filters.level)?.name || filters.level}`)
    }

    filters.format.forEach((format) => {
      newActiveFilters.push(`ফরম্যাট: ${format}`)
    })

    if (filters.duration) {
      newActiveFilters.push(`সময়কাল: ${filters.duration}`)
    }

    if (filters.rating) {
      newActiveFilters.push(`রেটিং: ${filters.rating}+`)
    }

    if (filters.sortBy) {
      const sortLabels: Record<string, string> = {
        newest: "নতুন",
        popular: "জনপ্রিয়",
        rating: "সেরা রেটিং",
        title: "শিরোনাম",
      }
      newActiveFilters.push(`সাজানো: ${sortLabels[filters.sortBy]}`)
    }

    setActiveFilters(newActiveFilters)
  }, [filters])

  // Filter courses for general_science category
  const generalScienceCourses = courses
    .filter((course) => {
      // Base category filter
      if (course.category !== "general_science") return false

      // Level filter
      if (filters.level && course.level !== filters.level) return false

      // Format filter
      if (filters.format.length > 0 && !filters.format.some((format) => course.contentFormat.includes(format)))
        return false

      // Duration filter
      if (filters.duration) {
        const duration = Number.parseInt(course.duration.split(" ")[0])
        if (filters.duration === "short" && duration >= 3) return false
        if (filters.duration === "medium" && (duration < 3 || duration > 6)) return false
        if (filters.duration === "long" && duration <= 6) return false
      }

      // Rating filter
      if (filters.rating && course.rating < filters.rating) return false

      // Search query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase()
        const matchesTitle = course.title.toLowerCase().includes(query)
        const matchesDescription = course.description?.toLowerCase().includes(query)
        const matchesLevel = levels
          .find((l) => l.id === course.level)
          ?.name.toLowerCase()
          .includes(query)

        if (!matchesTitle && !matchesDescription && !matchesLevel) return false
      }

      return true
    })
    .sort((a, b) => {
      // Sort based on selected sort option
      switch (filters.sortBy) {
        case "newest":
          return (b.createdAt || 0) - (a.createdAt || 0)
        case "popular":
          return b.students - a.students
        case "rating":
          return b.rating - a.rating
        case "title":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

  const handleStartCourse = (courseId: number) => {
    console.log(`Starting course ${courseId}`)
    addPoints(10)
    navigate(`/course/${courseId}`)
  }

  const handleCourseClick = (course: any) => {
    navigate(`/course/${course.id}`)
  }

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleRemoveFilter = (filter: string) => {
    const [type, value] = filter.split(": ")

    setFilters((prev) => {
      const newFilters = { ...prev }

      if (type === "শ্রেণি") {
        newFilters.level = null
      } else if (type === "ফরম্যাট") {
        newFilters.format = prev.format.filter((f) => f !== value)
      } else if (type === "সময়কাল") {
        newFilters.duration = null
      } else if (type === "রেটিং") {
        newFilters.rating = null
      } else if (type === "সাজানো") {
        newFilters.sortBy = "popular"
      }

      return newFilters
    })
  }

  const clearAllFilters = () => {
    setFilters({
      level: null,
      format: [],
      duration: null,
      rating: null,
      searchQuery: "",
      sortBy: "popular",
    })
  }

  // Available content formats
  const contentFormats = ["ভিডিও", "অ্যানিমেশন", "কুইজ", "পিডিএফ", "অডিও", "ইন্টারেক্টিভ"]

  // Duration options
  const durationOptions = [
    { id: "short", name: "ছোট (< ৩ ঘন্টা)" },
    { id: "medium", name: "মাঝারি (৩-৬ ঘন্টা)" },
    { id: "long", name: "দীর্ঘ (> ৬ ঘন্টা)" },
  ]

  // Rating options
  const ratingOptions = [
    { value: 4.5, label: "৪.৫+" },
    { value: 4, label: "৪.০+" },
    { value: 3.5, label: "৩.৫+" },
    { value: 3, label: "৩.০+" },
  ]

  // Sort options
  const sortOptions = [
    { value: "popular", label: "জনপ্রিয়" },
    { value: "newest", label: "নতুন" },
    { value: "rating", label: "সেরা রেটিং" },
    { value: "title", label: "শিরোনাম (A-Z)" },
  ]

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Header with back button */}
        <div className="flex items-center mb-6">
          <Link to="/learn" className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold">সাধারণ বিজ্ঞান/জিকে</h1>
        </div>

        {/* Banner */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl shadow-md p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5439/earth-space.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">সাধারণ বিজ্ঞান/জিকে কোর্সসমূহ</h2>
            <p className="text-lg opacity-90 max-w-2xl">
              বিজ্ঞান ও প্রযুক্তি, সাধারণ জ্ঞান সম্পর্কে জানুন। আমাদের ইন্টারেক্টিভ কোর্সগুলো আপনাকে বিজ্ঞান ও সাধারণ জ্ঞান সম্পর্কে সঠিক ধারণা পেতে
              সাহায্য করবে।
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <p className="text-gray-600">মোট {generalScienceCourses.length} টি কোর্স পাওয়া গেছে</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="কোর্স খুঁজুন..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={filters.searchQuery}
                onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">ফিল্টার</span>
            </button>
          </div>
        </div>

        {/* Active filters */}
        {activeFilters.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-500">সক্রিয় ফিল্টার:</span>
              {activeFilters.map((filter, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1 px-2 py-1 bg-teal-50 border border-teal-200 rounded-md text-sm"
                >
                  <span>{filter}</span>
                  <button onClick={() => handleRemoveFilter(filter)} className="text-gray-500 hover:text-gray-700">
                    <X className="h-3 w-3" />
                  </button>
                </motion.div>
              ))}
              <button onClick={clearAllFilters} className="text-sm text-teal-600 hover:text-teal-800">
                সব মুছুন
              </button>
            </div>
          </div>
        )}

        {/* Advanced filters */}
        <AnimatePresence>
          {showAdvancedFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-xl shadow-sm p-6 mb-8 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Level filter */}
                <div>
                  <h3 className="text-sm font-medium mb-3 flex items-center">
                    <Filter className="h-4 w-4 mr-2 text-teal-600" />
                    শ্রেণি
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                        filters.level === null
                          ? "bg-teal-600 text-white"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      } transition-colors`}
                      onClick={() => handleFilterChange("level", null)}
                    >
                      সব শ্রেণি
                    </button>
                    {levels.map((level) => (
                      <button
                        key={level.id}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                          filters.level === level.id
                            ? "bg-teal-600 text-white"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        } transition-colors`}
                        onClick={() => handleFilterChange("level", level.id)}
                      >
                        {level.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Format filter */}
                <div>
                  <h3 className="text-sm font-medium mb-3">কন্টেন্ট ফরম্যাট</h3>
                  <div className="flex flex-wrap gap-2">
                    {contentFormats.map((format) => (
                      <button
                        key={format}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                          filters.format.includes(format)
                            ? "bg-teal-600 text-white"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        } transition-colors`}
                        onClick={() => {
                          if (filters.format.includes(format)) {
                            handleFilterChange(
                              "format",
                              filters.format.filter((f) => f !== format),
                            )
                          } else {
                            handleFilterChange("format", [...filters.format, format])
                          }
                        }}
                      >
                        {format}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration filter */}
                <div>
                  <h3 className="text-sm font-medium mb-3">সময়কাল</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                        filters.duration === null
                          ? "bg-teal-600 text-white"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      } transition-colors`}
                      onClick={() => handleFilterChange("duration", null)}
                    >
                      সব সময়কাল
                    </button>
                    {durationOptions.map((option) => (
                      <button
                        key={option.id}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                          filters.duration === option.id
                            ? "bg-teal-600 text-white"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        } transition-colors`}
                        onClick={() => handleFilterChange("duration", option.id)}
                      >
                        {option.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating and Sort */}
                <div>
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-3">রেটিং</h3>
                    <div className="flex flex-wrap gap-2">
                      <button
                        className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                          filters.rating === null
                            ? "bg-teal-600 text-white"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        } transition-colors`}
                        onClick={() => handleFilterChange("rating", null)}
                      >
                        সব রেটিং
                      </button>
                      {ratingOptions.map((option) => (
                        <button
                          key={option.value}
                          className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                            filters.rating === option.value
                              ? "bg-teal-600 text-white"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                          } transition-colors`}
                          onClick={() => handleFilterChange("rating", option.value)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-3">সাজানো</h3>
                    <div className="flex flex-wrap gap-2">
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                            filters.sortBy === option.value
                              ? "bg-teal-600 text-white"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                          } transition-colors`}
                          onClick={() => handleFilterChange("sortBy", option.value)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Course Grid */}
        {generalScienceCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generalScienceCourses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleCourseClick(course)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-medium bg-teal-600 text-white">
                    {levels.find((l) => l.id === course.level)?.name}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg mb-3 line-clamp-2 hover:text-teal-600 transition-colors">
                    {course.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {course.contentFormat.map((format, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-gray-100 px-2 py-1 rounded-md text-xs font-medium"
                      >
                        {getContentFormatIcon(format)}
                        <span className="ml-1">{format}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <div className="flex items-center mr-4">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center mr-4">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span>{course.lessons} লেসন</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-500 flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{course.students} শিক্ষার্থী</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Award className="h-4 w-4 mr-1 text-teal-600" />
                      <span className="font-medium">+১০ পয়েন্ট</span>
                    </div>
                  </div>

                  {course.progress > 0 ? (
                    <div>
                      <div className="flex justify-between items-center mb-1 text-sm">
                        <span>প্রগতি</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="h-2 rounded-full bg-teal-600" style={{ width: `${course.progress}%` }}></div>
                      </div>
                      <button
                        className="mt-4 w-full bg-teal-100 hover:bg-teal-200 text-teal-800 py-2 rounded-md font-medium transition-colors"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleStartCourse(course.id)
                        }}
                      >
                        অব্যাহত রাখুন
                      </button>
                    </div>
                  ) : (
                    <button
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md font-medium transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleStartCourse(course.id)
                      }}
                    >
                      শুরু করুন
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-16 text-center">
            <div className="bg-gray-100 inline-block p-5 rounded-full mb-4">
              <Filter className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">কোন কোর্স পাওয়া যায়নি</h3>
            <p className="text-gray-600 mb-6">আপনার ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।</p>
            <button
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              onClick={clearAllFilters}
            >
              সব ফিল্টার রিসেট করুন
            </button>
          </motion.div>
        )}

        {/* Content Detail Modal */}
        <ContentDetailModal content={selectedContent} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  )
}

export default GeneralSciencePage