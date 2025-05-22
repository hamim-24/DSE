import type { Course, FilterOptions } from "../types/courseTypes"

export const filterCourses = (courses: Course[], filters: FilterOptions): Course[] => {
  let filteredCourses = [...courses]

  // Search filter
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    filteredCourses = filteredCourses.filter(
      (course) =>
        course.title.toLowerCase().includes(searchTerm) ||
        course.description.toLowerCase().includes(searchTerm) ||
        course.instructor.toLowerCase().includes(searchTerm) ||
        course.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
    )
  }

  // Level filter
  if (filters.levels.length > 0) {
    filteredCourses = filteredCourses.filter((course) => filters.levels.includes(course.level))
  }

  // Format filter
  if (filters.formats.length > 0) {
    filteredCourses = filteredCourses.filter((course) => filters.formats.includes(course.format))
  }

  // Duration filter
  if (filters.duration) {
    filteredCourses = filteredCourses.filter(
      (course) => course.duration >= filters.duration!.min && course.duration <= filters.duration!.max,
    )
  }

  // Rating filter
  if (filters.rating) {
    filteredCourses = filteredCourses.filter((course) => course.rating >= filters.rating!)
  }

  // Difficulty filter
  if (filters.difficulty.length > 0) {
    filteredCourses = filteredCourses.filter((course) => filters.difficulty.includes(course.difficulty))
  }

  // Instructor filter
  if (filters.instructors.length > 0) {
    filteredCourses = filteredCourses.filter((course) => filters.instructors.includes(course.instructor))
  }

  // Tags filter
  if (filters.tags.length > 0) {
    filteredCourses = filteredCourses.filter((course) => filters.tags.some((tag) => course.tags.includes(tag)))
  }

  // Sort
  const [sortBy, sortOrder] = filters.sortBy.includes("-")
    ? filters.sortBy.split("-")
    : [filters.sortBy, filters.sortOrder]

  filteredCourses.sort((a, b) => {
    let comparison = 0

    switch (sortBy) {
      case "newest":
        comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        break
      case "popular":
        comparison = b.popularity - a.popularity
        break
      case "rating":
        comparison = b.rating - a.rating
        break
      case "title":
        comparison = a.title.localeCompare(b.title)
        break
      default:
        comparison = 0
    }

    return sortOrder === "asc" ? comparison * -1 : comparison
  })

  return filteredCourses
}

export const getUniqueValues = (courses: Course[], field: keyof Course): string[] => {
  const values = courses.map((course) => course[field])
  return [...new Set(values)] as string[]
}

export const getUniqueTags = (courses: Course[]): string[] => {
  const allTags = courses.flatMap((course) => course.tags)
  return [...new Set(allTags)]
}

export const parseDurationOption = (option: string): { min: number; max: number } => {
  const [min, max] = option.split("-").map(Number)
  return { min, max }
}
