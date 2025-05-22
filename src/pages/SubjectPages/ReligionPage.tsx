"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { useAppContext } from "../../context/AppContext"
import ContentDetailModal from "../../components/modals/ContentDetailModal"
import { courses } from "../../data/courseData.tsx"
import CourseFilters from "../../components/courses/CourseFilters"
import CourseGrid from "../../components/courses/CourseGrid"
import { extractContentFormats, filterAndSortCourses } from "../../utils/courseUtils"

const ReligionPage: React.FC = () => {
  // Theme color for this subject
  const themeColor = "#d97706" // amber-600

  const [searchQuery, setSearchQuery] = useState("")
  const [activeLevel, setActiveLevel] = useState<string | null>(null)
  const [selectedContent, setSelectedContent] = useState<any | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { addPoints } = useAppContext()

  // Extract all available content formats from the courses
  const contentFormats = extractContentFormats(courses)

  // State for active content formats
  const [activeFormats, setActiveFormats] = useState<string[]>([])

  // Handle the selection of content formats
  const handleFormatSelect = (format: string) => {
    setActiveFormats((prevFormats) =>
      prevFormats.includes(format) ? prevFormats.filter((f) => f !== format) : [...prevFormats, format],
    )
  }

  // Filter and sort courses based on search query, active level, and active formats
  const filteredCourses = filterAndSortCourses(courses, "religion", searchQuery, activeLevel, activeFormats)

  const handleStartCourse = (courseId: number) => {
    console.log(`Starting course ${courseId}`)
    addPoints(10)
  }

  const handleCourseClick = (course: any) => {
    setSelectedContent(course)
    setIsModalOpen(true)
  }

  const resetFilters = () => {
    setActiveLevel(null)
    setSearchQuery("")
    setActiveFormats([]) // Also clear the active formats
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Header with back button */}
        <div className="flex items-center mb-6">
          <Link to="/learn" className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold">ধর্ম শিক্ষা</h1>
        </div>

        {/* Banner */}
        <div className="bg-gradient-to-r from-amber-600 to-yellow-600 rounded-xl shadow-md p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5589648/pexels-photo-5589648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">ধর্ম শিক্ষা কোর্সসমূহ</h2>
            <p className="text-lg opacity-90 max-w-2xl">
              ইসলাম, হিন্দু, বৌদ্ধ, খ্রিস্টান ধর্ম সম্পর্কে জানুন। আমাদের ইন্টারেক্টিভ কোর্সগুলো আপনাকে ধর্মীয় শিক্ষা সম্পর্কে সঠিক ধারণা পেতে
              সাহায্য করবে।
            </p>
          </div>
        </div>

        {/* Course Filters */}
        <CourseFilters
          totalCourses={filteredCourses.length}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeLevel={activeLevel}
          setActiveLevel={setActiveLevel}
          contentFormats={contentFormats}
          activeFormats={activeFormats}
          onFormatSelect={handleFormatSelect}
          resetFilters={resetFilters}
          themeColor={themeColor}
        />

        {/* Course Grid */}
        <CourseGrid
          courses={filteredCourses}
          onCourseClick={handleCourseClick}
          onStartCourse={handleStartCourse}
          themeColor={themeColor}
        />

        {/* Content Detail Modal */}
        <ContentDetailModal content={selectedContent} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  )
}

export default ReligionPage