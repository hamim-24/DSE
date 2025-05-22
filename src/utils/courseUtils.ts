import type { Course } from "../data/courseData"

// Helper function to extract unique content formats from courses
export const extractContentFormats = (courses: Course[]): string[] => {
  const formatSet = new Set<string>()

  courses.forEach((course) => {
    course.contentFormat.forEach((format) => {
      formatSet.add(format)
    })
  })

  return Array.from(formatSet).sort()
}

// Helper function to parse duration string to hours
export const parseDurationToHours = (duration: string): number => {
  const match = duration.match(/(\d+)/)
  if (match && match[1]) {
    return Number.parseInt(match[1], 10)
  }
  return 0
}

// Helper function to filter and sort courses
export const filterAndSortCourses = (
  courses: Course[],
  searchQuery: string,
  activeLevel: string | null,
  selectedContentFormat: string | null,
  durationFilter: string | null,
  ratingFilter: number | null,
  sortBy: string,
): Course[] => {
  // First, filter the courses
  const filteredCourses = courses.filter((course) => {
    // Search query filter
    const matchesSearch =
      searchQuery === "" ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())

    // Level filter
    const matchesLevel = activeLevel === null || course.level === activeLevel

    // Content format filter
    const matchesContentFormat = selectedContentFormat === null || course.contentFormat.includes(selectedContentFormat)

    // Duration filter
    let matchesDuration = true
    if (durationFilter) {
      const hours = parseDurationToHours(course.duration)
      if (durationFilter === "short") {
        matchesDuration = hours < 8
      } else if (durationFilter === "medium") {
        matchesDuration = hours >= 8 && hours <= 12
      } else if (durationFilter === "long") {
        matchesDuration = hours > 12
      }
    }

    // Rating filter
    const matchesRating = ratingFilter === null || course.rating >= ratingFilter

    return matchesSearch && matchesLevel && matchesContentFormat && matchesDuration && matchesRating
  })

  // Then, sort the filtered courses
  if (sortBy === "popularity") {
    filteredCourses.sort((a, b) => b.students - a.students)
  } else if (sortBy === "rating") {
    filteredCourses.sort((a, b) => b.rating - a.rating)
  } else if (sortBy === "newest") {
    // Assuming newer courses have higher IDs
    filteredCourses.sort((a, b) => b.id - a.id)
  }
  // For 'relevance', we keep the original order or could implement a more complex relevance algorithm

  return filteredCourses
}
