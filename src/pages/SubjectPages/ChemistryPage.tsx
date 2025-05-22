"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import ContentDetailModal from "../../components/modals/ContentDetailModal"
import { courses } from "../../data/courseData.tsx"
import CourseFilters from "../../components/courses/CourseFilters"
import CourseGrid from "../../components/courses/CourseGrid"
import { extractContentFormats, filterAndSortCourses } from "../../utils/courseUtils"

const ChemistryPage: React.FC = () => {
  // Theme color for this subject
  const themeColor = "#16a34a" // green-600

  const [searchQuery, setSearchQuery] = useState("")
  const [activeLevel, setActiveLevel] = useState<string | null>(null)
  const [selectedContentFormat, setSelectedContentFormat] = useState<string | null>(null)
  const [durationFilter, setDurationFilter] = useState<string | null>(null)
  const [ratingFilter, setRatingFilter] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState<string>("relevance")

  const [selectedContent, setSelectedContent] = useState<any | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Get all chemistry courses
  const chemistryCourses = courses.filter((course) => course.category === "chemistry")

  // Extract unique content formats from chemistry courses
  const contentFormats = extractContentFormats(chemistryCourses)

  // Apply filters and sorting
  const filteredCourses = filterAndSortCourses(
    chemistryCourses,
    searchQuery,
    activeLevel,
    selectedContentFormat,
    durationFilter,
    ratingFilter,
    sortBy,
  )

  const handleCourseClick = (course: any) => {
    setSelectedContent(course)
    setIsModalOpen(true)
  }

  const resetFilters = () => {
    setSearchQuery("")
    setActiveLevel(null)
    setSelectedContentFormat(null)
    setDurationFilter(null)
    setRatingFilter(null)
    setSortBy("relevance")
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Header with back button */}
        <div className="flex items-center mb-6">
          <Link to="/learn" className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold">রসায়ন</h1>
        </div>

        {/* Banner */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl shadow-md p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">রসায়ন কোর্সসমূহ</h2>
            <p className="text-lg opacity-90 max-w-2xl">
              রসায়নের মৌলিক ধারণা থেকে শুরু করে উন্নত বিষয়গুলো সম্পর্কে জানুন। আমাদের ইন্টারেক্টিভ কোর্সগুলো আপনাকে রসায়নের জটিল ধারণাগুলো
              সহজে বুঝতে সাহায্য করবে।
            </p>
          </div>
        </div>

        {/* Filters */}
        <CourseFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeLevel={activeLevel}
          setActiveLevel={setActiveLevel}
          contentFormats={contentFormats}
          selectedContentFormat={selectedContentFormat}
          setSelectedContentFormat={setSelectedContentFormat}
          durationFilter={durationFilter}
          setDurationFilter={setDurationFilter}
          ratingFilter={ratingFilter}
          setRatingFilter={setRatingFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          resetFilters={resetFilters}
          totalCourses={filteredCourses.length}
          themeColor={themeColor}
        />

        {/* Course Grid */}
        <CourseGrid
          courses={filteredCourses}
          onCourseClick={handleCourseClick}
          themeColor={themeColor}
          resetFilters={resetFilters}
        />

        {/* Content Detail Modal */}
        <ContentDetailModal content={selectedContent} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  )
}

export default ChemistryPage