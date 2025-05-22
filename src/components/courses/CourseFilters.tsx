"use client"

import type React from "react"
import { formatOptions, difficultyOptions, sortOptions, durationOptions } from "../../types/courseTypes"

interface CourseFiltersProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  activeLevel: string | null
  setActiveLevel: (level: string | null) => void
  contentFormats: string[]
  selectedContentFormat: string | null
  setSelectedContentFormat: (format: string | null) => void
  durationFilter: string | null
  setDurationFilter: (duration: string | null) => void
  ratingFilter: number | null
  setRatingFilter: (rating: number | null) => void
  sortBy: string
  setSortBy: (sortBy: string) => void
  resetFilters: () => void
  totalCourses: number
  themeColor?: string
}

const CourseFilters: React.FC<CourseFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  activeLevel,
  setActiveLevel,
  contentFormats,
  selectedContentFormat,
  setSelectedContentFormat,
  durationFilter,
  setDurationFilter,
  ratingFilter,
  setRatingFilter,
  sortBy,
  setSortBy,
  resetFilters,
  totalCourses,
  themeColor = "#4f46e5",
}) => {
  // Verify the component correctly uses the filter options
  console.log("Format options available:", formatOptions)
  console.log("Difficulty options available:", difficultyOptions)
  console.log("Sort options available:", sortOptions)
  console.log("Duration options available:", durationOptions)

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-semibold">
            {totalCourses} {totalCourses === 1 ? "Course" : "Courses"} Available
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Search input */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <select
              className="appearance-none w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="relevance">Sort by: Relevance</option>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  Sort by: {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Level filters */}
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeLevel === null
              ? `bg-${themeColor.replace("#", "")} text-white`
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
          onClick={() => setActiveLevel(null)}
          style={{ backgroundColor: activeLevel === null ? themeColor : "" }}
        >
          All Levels
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeLevel === "Beginner"
              ? `bg-${themeColor.replace("#", "")} text-white`
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
          onClick={() => setActiveLevel("Beginner")}
          style={{ backgroundColor: activeLevel === "Beginner" ? themeColor : "" }}
        >
          Beginner
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeLevel === "Intermediate"
              ? `bg-${themeColor.replace("#", "")} text-white`
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
          onClick={() => setActiveLevel("Intermediate")}
          style={{ backgroundColor: activeLevel === "Intermediate" ? themeColor : "" }}
        >
          Intermediate
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeLevel === "Advanced"
              ? `bg-${themeColor.replace("#", "")} text-white`
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
          onClick={() => setActiveLevel("Advanced")}
          style={{ backgroundColor: activeLevel === "Advanced" ? themeColor : "" }}
        >
          Advanced
        </button>

        {/* Content format filters */}
        {contentFormats.map((format) => (
          <button
            key={format}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedContentFormat === format
                ? `bg-${themeColor.replace("#", "")} text-white`
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => setSelectedContentFormat(selectedContentFormat === format ? null : format)}
            style={{ backgroundColor: selectedContentFormat === format ? themeColor : "" }}
          >
            {format}
          </button>
        ))}

        {/* Duration filters */}
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            durationFilter === "0-30"
              ? `bg-${themeColor.replace("#", "")} text-white`
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
          onClick={() => setDurationFilter(durationFilter === "0-30" ? null : "0-30")}
          style={{ backgroundColor: durationFilter === "0-30" ? themeColor : "" }}
        >
          {durationOptions[0].label}
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            durationFilter === "30-60"
              ? `bg-${themeColor.replace("#", "")} text-white`
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
          onClick={() => setDurationFilter(durationFilter === "30-60" ? null : "30-60")}
          style={{ backgroundColor: durationFilter === "30-60" ? themeColor : "" }}
        >
          {durationOptions[1].label}
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            durationFilter === "60-120"
              ? `bg-${themeColor.replace("#", "")} text-white`
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
          onClick={() => setDurationFilter(durationFilter === "60-120" ? null : "60-120")}
          style={{ backgroundColor: durationFilter === "60-120" ? themeColor : "" }}
        >
          {durationOptions[2].label}
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            durationFilter === "120-999"
              ? `bg-${themeColor.replace("#", "")} text-white`
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
          onClick={() => setDurationFilter(durationFilter === "120-999" ? null : "120-999")}
          style={{ backgroundColor: durationFilter === "120-999" ? themeColor : "" }}
        >
          {durationOptions[3].label}
        </button>

        {/* Rating filters */}
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            ratingFilter === 4
              ? `bg-${themeColor.replace("#", "")} text-white`
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
          onClick={() => setRatingFilter(ratingFilter === 4 ? null : 4)}
          style={{ backgroundColor: ratingFilter === 4 ? themeColor : "" }}
        >
          4+ Stars
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            ratingFilter === 3
              ? `bg-${themeColor.replace("#", "")} text-white`
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
          onClick={() => setRatingFilter(ratingFilter === 3 ? null : 3)}
          style={{ backgroundColor: ratingFilter === 3 ? themeColor : "" }}
        >
          3+ Stars
        </button>

        {/* Reset filters button - only show if any filter is active */}
        {(searchQuery ||
          activeLevel ||
          selectedContentFormat ||
          durationFilter ||
          ratingFilter ||
          sortBy !== "relevance") && (
          <button
            className="px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-800 hover:bg-red-200 transition-colors"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  )
}

export default CourseFilters
