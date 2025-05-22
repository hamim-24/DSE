"use client"

import type React from "react"
import { useState, useEffect } from "react"
import CourseCard from "./CourseCard"
import AdvancedCourseFilters from "./AdvancedCourseFilters"
import { type Course, type FilterOptions, defaultFilterOptions } from "../../types/courseTypes"
import { filterCourses } from "../../utils/filterUtils"

interface CourseListProps {
  courses: Course[]
  title?: string
  description?: string
  showFilters?: boolean
}

const CourseList: React.FC<CourseListProps> = ({ courses, title = "All Courses", description, showFilters = true }) => {
  const [filters, setFilters] = useState<FilterOptions>(defaultFilterOptions)
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      setFilteredCourses(filterCourses(courses, filters))
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [courses, filters])

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters)
  }

  const handleResetFilters = () => {
    setFilters(defaultFilterOptions)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {title && (
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          {description && <p className="mt-2 text-lg text-gray-600">{description}</p>}
        </div>
      )}

      {showFilters && (
        <AdvancedCourseFilters
          courses={courses}
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
              <div className="w-full h-48 bg-gray-300"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="h-10 bg-gray-300 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">
              Showing <span className="font-medium">{filteredCourses.length}</span> of{" "}
              <span className="font-medium">{courses.length}</span> courses
            </p>
          </div>

          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No courses found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria.</p>
              <div className="mt-6">
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default CourseList
