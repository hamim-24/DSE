"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  type FilterOptions,
  formatOptions,
  difficultyOptions,
  sortOptions,
  durationOptions,
  defaultFilterOptions,
} from "../../types/courseTypes"
import { getUniqueValues, getUniqueTags, parseDurationOption } from "../../utils/filterUtils"

interface AdvancedCourseFiltersProps {
  courses: any[]
  filters: FilterOptions
  onFilterChange: (filters: FilterOptions) => void
  onReset: () => void
}

const AdvancedCourseFilters: React.FC<AdvancedCourseFiltersProps> = ({ courses, filters, onFilterChange, onReset }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeFiltersCount, setActiveFiltersCount] = useState(0)

  // Get unique values for filters
  const levels = getUniqueValues(courses, "level")
  const instructors = getUniqueValues(courses, "instructor")
  const tags = getUniqueTags(courses)

  // Count active filters
  useEffect(() => {
    let count = 0
    if (filters.search) count++
    if (filters.levels.length) count++
    if (filters.formats.length) count++
    if (filters.duration) count++
    if (filters.rating) count++
    if (filters.difficulty.length) count++
    if (filters.instructors.length) count++
    if (filters.tags.length) count++
    if (filters.sortBy !== defaultFilterOptions.sortBy) count++

    setActiveFiltersCount(count)
  }, [filters])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value })
  }

  const handleCheckboxChange = (field: keyof FilterOptions, value: string) => {
    const currentValues = filters[field] as string[]
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value]

    onFilterChange({ ...filters, [field]: newValues })
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, sortOrder] = e.target.value.split("-")
    onFilterChange({ ...filters, sortBy: sortBy as any, sortOrder: sortOrder as "asc" | "desc" })
  }

  const handleDurationChange = (value: string) => {
    if (value === "") {
      onFilterChange({ ...filters, duration: null })
    } else {
      onFilterChange({ ...filters, duration: parseDurationOption(value) })
    }
  }

  const handleRatingChange = (value: string) => {
    onFilterChange({ ...filters, rating: value ? Number(value) : null })
  }

  const handleClearFilters = () => {
    onReset()
  }

  const getSortValue = () => {
    return `${filters.sortBy}-${filters.sortOrder}`
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h3 className="text-lg font-semibold">Filters</h3>
          {activeFiltersCount > 0 && (
            <span className="ml-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        <div className="flex items-center">
          {activeFiltersCount > 0 && (
            <button onClick={handleClearFilters} className="text-sm text-gray-600 hover:text-red-500 mr-4">
              Clear All
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 hover:text-blue-700 flex items-center"
          >
            {isExpanded ? (
              <>
                <span>Less Filters</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </>
            ) : (
              <>
                <span>More Filters</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Search and Sort - Always visible */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search courses..."
              value={filters.search}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            id="sort"
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={getSortValue()}
            onChange={handleSortChange}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Level filters - Always visible */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Level</h4>
        <div className="flex flex-wrap gap-2">
          {levels.map((level) => (
            <label key={level} className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                checked={filters.levels.includes(level)}
                onChange={() => handleCheckboxChange("levels", level)}
              />
              <span className="ml-2 text-sm text-gray-700">{level}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Advanced filters - Expandable */}
      {isExpanded && (
        <div className="border-t pt-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Format */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Format</h4>
              <div className="space-y-2">
                {formatOptions.map((format) => (
                  <label key={format.value} className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                      checked={filters.formats.includes(format.value)}
                      onChange={() => handleCheckboxChange("formats", format.value)}
                    />
                    <span className="ml-2 text-sm text-gray-700">{format.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Duration</h4>
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={filters.duration ? `${filters.duration.min}-${filters.duration.max}` : ""}
                onChange={(e) => handleDurationChange(e.target.value)}
              >
                <option value="">Any duration</option>
                {durationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Rating</h4>
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={filters.rating || ""}
                onChange={(e) => handleRatingChange(e.target.value)}
              >
                <option value="">Any rating</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="2">2+ Stars</option>
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Difficulty</h4>
              <div className="space-y-2">
                {difficultyOptions.map((difficulty) => (
                  <label key={difficulty.value} className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                      checked={filters.difficulty.includes(difficulty.value)}
                      onChange={() => handleCheckboxChange("difficulty", difficulty.value)}
                    />
                    <span className="ml-2 text-sm text-gray-700">{difficulty.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Instructors */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Instructors</h4>
              <div className="max-h-40 overflow-y-auto space-y-2">
                {instructors.map((instructor) => (
                  <label key={instructor} className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                      checked={filters.instructors.includes(instructor)}
                      onChange={() => handleCheckboxChange("instructors", instructor)}
                    />
                    <span className="ml-2 text-sm text-gray-700">{instructor}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Tags</h4>
              <div className="max-h-40 overflow-y-auto">
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <label
                      key={tag}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        filters.tags.includes(tag)
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      } cursor-pointer transition-colors`}
                      onClick={() => handleCheckboxChange("tags", tag)}
                    >
                      {tag}
                      {filters.tags.includes(tag) && (
                        <svg className="ml-1.5 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active filters */}
      {activeFiltersCount > 0 && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Search: {filters.search}
                <button
                  className="ml-1 text-blue-500 hover:text-blue-700"
                  onClick={() => onFilterChange({ ...filters, search: "" })}
                >
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </span>
            )}
            {filters.levels.map((level) => (
              <span
                key={level}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                Level: {level}
                <button
                  className="ml-1 text-blue-500 hover:text-blue-700"
                  onClick={() => handleCheckboxChange("levels", level)}
                >
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </span>
            ))}
            {/* Add more active filter tags for other filter types */}
          </div>
        </div>
      )}
    </div>
  )
}

export default AdvancedCourseFilters
