"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useLocation, Link } from "react-router-dom"
import { allCourses } from "../data"
import type { Course } from "../types/courseTypes"
import LoadingSpinner from "../components/ui/LoadingSpinner"

const SearchResultsPage: React.FC = () => {
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search)
      const query = params.get("q") || ""
      setSearchQuery(query)

      setIsLoading(true)
      setError(null)

      // Simulate loading delay
      const timer = setTimeout(() => {
        if (query.trim() === "") {
          setSearchResults([])
        } else {
          const lowercaseQuery = query.toLowerCase()
          const results = allCourses.filter(
            (course) =>
              course.title.toLowerCase().includes(lowercaseQuery) ||
              course.description.toLowerCase().includes(lowercaseQuery) ||
              course.instructor.toLowerCase().includes(lowercaseQuery) ||
              course.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
              course.subject.toLowerCase().includes(lowercaseQuery),
          )
          setSearchResults(results)
        }
        setIsLoading(false)
      }, 500)

      return () => clearTimeout(timer)
    } catch (err) {
      console.error("Error in search:", err)
      setError("An error occurred while searching. Please try again.")
      setIsLoading(false)
    }
  }, [location.search])

  // Group results by subject
  const resultsBySubject = searchResults.reduce(
    (acc, course) => {
      if (!acc[course.subject]) {
        acc[course.subject] = []
      }
      acc[course.subject].push(course)
      return acc
    },
    {} as Record<string, Course[]>,
  )

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-red-700 mb-2">Search Error</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <Link to="/learn" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Browse All Courses
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {searchQuery ? `Search Results for "${searchQuery}"` : "Search Results"}
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          {isLoading
            ? "Searching courses..."
            : searchResults.length > 0
              ? `Found ${searchResults.length} courses matching your search`
              : "No courses found matching your search"}
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : searchResults.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No courses found</h3>
          <p className="mt-1 text-gray-500">Try searching with different keywords or browse our subjects.</p>
          <div className="mt-6">
            <Link
              to="/learn"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Browse All Subjects
            </Link>
          </div>
        </div>
      ) : (
        <div>
          {/* Show all results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {searchResults.map((course) => (
              <Link
                key={course.id}
                to={`/course/${course.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={
                      course.thumbnail ||
                      `/placeholder.svg?height=192&width=192&text=${encodeURIComponent(course.title)}`
                    }
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-medium bg-blue-600 text-white">
                    {course.level}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="text-sm">{course.rating}</span>
                    </div>
                    <span className="text-sm text-gray-600">{course.duration} mins</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Show results by subject */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Results by Subject</h2>

            <div className="space-y-8">
              {Object.entries(resultsBySubject).map(([subject, courses]) => (
                <div key={subject}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{subject}</h3>
                    <Link
                      to={`/subjects/${subject.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View all {subject} courses
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {courses.slice(0, 4).map((course) => (
                      <Link
                        key={course.id}
                        to={`/course/${course.id}`}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="relative">
                          <img
                            src={
                              course.thumbnail ||
                              `/placeholder.svg?height=120&width=240&text=${encodeURIComponent(course.title) || "/placeholder.svg"}`
                            }
                            alt={course.title}
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                            <h4 className="text-white font-medium line-clamp-1">{course.title}</h4>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchResultsPage
