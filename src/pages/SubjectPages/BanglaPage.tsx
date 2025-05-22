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

const BanglaPage: React.FC = () => {
  // Theme color for this subject
  const themeColor = "#dc2626" // red-600

  const [searchQuery, setSearchQuery] = useState("")
  const [activeLevel, setActiveLevel] = useState<string | null>(null)
  const [selectedContentFormat, setSelectedContentFormat] = useState<string | null>(null)
  const [durationFilter, setDurationFilter] = useState<string | null>(null)
  const [ratingFilter, setRatingFilter] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState<string>("relevance")

  const [selectedContent, setSelectedContent] = useState<any | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Get all bangla courses
  const banglaCourses = courses.filter((course) => course.category === "bangla")

  // Extract unique content formats from bangla courses
  const contentFormats = extractContentFormats(banglaCourses)

  // Apply filters and sorting
  const filteredCourses = filterAndSortCourses(
    banglaCourses,
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
          <h1 className="text-3xl font-bold">বাংলা</h1>
        </div>

        {/* Banner */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl shadow-md p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">বাংলা কোর্সসমূহ</h2>
            <p className="text-lg opacity-90 max-w-2xl">
              বাংলা ভাষা, সাহিত্য, ব্যাকরণ এবং রচনা সম্পর্কে জানুন। আমাদের ইন্টারেক্টিভ কোর্সগুলো আপনাকে বাংলা ভাষার দক্ষতা বাড়াতে সাহায্য করবে।
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

export default BanglaPage