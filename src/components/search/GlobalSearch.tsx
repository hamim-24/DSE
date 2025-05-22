"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import type { Course } from "../../types/courseTypes"

interface GlobalSearchProps {
  allCourses: Course[]
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ allCourses }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Course[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Load recent searches from localStorage
    const savedSearches = localStorage.getItem("recentSearches")
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches))
    }

    // Handle clicks outside the search component
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([])
      return
    }

    const query = searchQuery.toLowerCase()
    const results = allCourses
      .filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.instructor.toLowerCase().includes(query) ||
          course.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
      .slice(0, 5) // Limit to 5 results for dropdown

    setSearchResults(results)
  }, [searchQuery, allCourses])

  const handleSearch = () => {
    if (searchQuery.trim() === "") return

    // Save to recent searches
    const updatedSearches = [searchQuery, ...recentSearches.filter((s) => s !== searchQuery)].slice(0, 5) // Keep only 5 most recent searches

    setRecentSearches(updatedSearches)
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches))

    // Navigate to search results page
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    setIsOpen(false)
    setSearchQuery("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleResultClick = (courseId: string) => {
    navigate(`/course/${courseId}`)
    setIsOpen(false)
    setSearchQuery("")
  }

  const handleRecentSearchClick = (search: string) => {
    setSearchQuery(search)
    navigate(`/search?q=${encodeURIComponent(search)}`)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search courses..."
          className="w-full md:w-64 lg:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {searchQuery && (
          <button
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            onClick={() => setSearchQuery("")}
          >
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          {searchResults.length > 0 ? (
            <div>
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
                Search Results
              </div>
              <ul>
                {searchResults.map((course) => (
                  <li
                    key={course.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleResultClick(course.id)}
                  >
                    <div className="flex items-start">
                      <img
                        src={
                          course.thumbnail ||
                          `/placeholder.svg?height=40&width=40&text=${encodeURIComponent(course.title.charAt(0))}`
                        }
                        alt={course.title}
                        className="w-10 h-10 object-cover rounded mr-3"
                      />
                      <div>
                        <div className="font-medium">{course.title}</div>
                        <div className="text-sm text-gray-500">
                          {course.subject} • {course.level}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="px-4 py-2 bg-gray-50 text-center">
                <button className="text-sm text-blue-600 hover:text-blue-800" onClick={handleSearch}>
                  View all results for "{searchQuery}"
                </button>
              </div>
            </div>
          ) : searchQuery ? (
            <div className="px-4 py-6 text-center">
              <p className="text-gray-500">No results found for "{searchQuery}"</p>
              <button className="mt-2 text-sm text-blue-600 hover:text-blue-800" onClick={handleSearch}>
                Search all courses
              </button>
            </div>
          ) : recentSearches.length > 0 ? (
            <div>
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
                Recent Searches
              </div>
              <ul>
                {recentSearches.map((search, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                    onClick={() => handleRecentSearchClick(search)}
                  >
                    <svg
                      className="h-4 w-4 text-gray-400 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {search}
                  </li>
                ))}
              </ul>
              <div className="px-4 py-2 bg-gray-50 text-center">
                <button
                  className="text-sm text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setRecentSearches([])
                    localStorage.removeItem("recentSearches")
                  }}
                >
                  Clear recent searches
                </button>
              </div>
            </div>
          ) : (
            <div className="px-4 py-6 text-center text-gray-500">Start typing to search for courses</div>
          )}
        </div>
      )}
    </div>
  )
}

export default GlobalSearch
