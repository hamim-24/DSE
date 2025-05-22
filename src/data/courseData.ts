import type { Course } from "../types/courseTypes"

// Sample instructors
const instructors = [
  "Dr. Ahmed Khan",
  "Prof. Fatima Rahman",
  "Dr. Mohammad Ali",
  "Prof. Nusrat Jahan",
  "Dr. Kamal Hossain",
  "Prof. Tahmina Akter",
  "Dr. Rafiq Islam",
  "Prof. Sabina Yasmin",
  "Dr. Jahangir Alam",
  "Prof. Nasreen Begum",
]

// Sample tags for different subjects
const tagsBySubject = {
  Physics: [
    "mechanics",
    "thermodynamics",
    "electromagnetism",
    "optics",
    "quantum",
    "relativity",
    "nuclear",
    "waves",
    "energy",
    "motion",
  ],
  Chemistry: [
    "organic",
    "inorganic",
    "physical",
    "analytical",
    "biochemistry",
    "polymers",
    "reactions",
    "elements",
    "compounds",
    "solutions",
  ],
  Biology: [
    "genetics",
    "ecology",
    "anatomy",
    "physiology",
    "microbiology",
    "botany",
    "zoology",
    "evolution",
    "cells",
    "organisms",
  ],
  Mathematics: [
    "algebra",
    "geometry",
    "calculus",
    "statistics",
    "trigonometry",
    "probability",
    "number theory",
    "discrete math",
    "functions",
    "equations",
  ],
  Bangla: [
    "grammar",
    "literature",
    "poetry",
    "prose",
    "composition",
    "vocabulary",
    "reading",
    "writing",
    "speaking",
    "comprehension",
  ],
  English: [
    "grammar",
    "vocabulary",
    "reading",
    "writing",
    "speaking",
    "listening",
    "pronunciation",
    "literature",
    "composition",
    "comprehension",
  ],
  Religion: [
    "ethics",
    "philosophy",
    "history",
    "practices",
    "beliefs",
    "texts",
    "traditions",
    "rituals",
    "spirituality",
    "values",
  ],
  Arabic: [
    "grammar",
    "vocabulary",
    "reading",
    "writing",
    "speaking",
    "listening",
    "pronunciation",
    "literature",
    "composition",
    "comprehension",
  ],
  "General Science": [
    "physics",
    "chemistry",
    "biology",
    "earth science",
    "astronomy",
    "technology",
    "environment",
    "energy",
    "matter",
    "scientific method",
  ],
}

// Helper function to get random items from an array
const getRandomItems = (array: any[], count: number) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// Helper function to generate a random date within the last year
const getRandomDate = () => {
  const now = new Date()
  const pastDate = new Date(now.getFullYear() - 1, 0, 1)
  return new Date(pastDate.getTime() + Math.random() * (now.getTime() - pastDate.getTime()))
}

// Define course categories
export const categories = [
  "All",
  "Physics",
  "Chemistry",
  "Biology",
  "Mathematics",
  "Bangla",
  "English",
  "Religion",
  "Arabic",
  "General Science",
]

// Define course levels
export const levels = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "SSC", "HSC"]

// Generate courses for each subject
const generateCoursesForSubject = (subject: string, count: number): Course[] => {
  const courses: Course[] = []
  const subjectTags = tagsBySubject[subject as keyof typeof tagsBySubject] || []

  const formats = ["video", "animation", "quiz", "interactive", "text"] as const
  const difficulties = ["beginner", "intermediate", "advanced"] as const

  for (let i = 1; i <= count; i++) {
    const createdAt = getRandomDate()
    const updatedAt = new Date(createdAt.getTime() + Math.random() * (new Date().getTime() - createdAt.getTime()))

    courses.push({
      id: `${subject.toLowerCase().replace(/\s+/g, "-")}-${i}`,
      title: `${subject} Course ${i}: ${getRandomItems(subjectTags, 1)[0].charAt(0).toUpperCase() + getRandomItems(subjectTags, 1)[0].slice(1)}`,
      description: `Learn about ${getRandomItems(subjectTags, 3).join(", ")} in this comprehensive ${subject} course designed for students.`,
      subject,
      level: getRandomItems(levels, 1)[0],
      instructor: getRandomItems(instructors, 1)[0],
      duration: Math.floor(Math.random() * 180) + 20, // 20-200 minutes
      format: getRandomItems(formats, 1)[0],
      rating: Math.floor(Math.random() * 20 + 30) / 10, // 3.0-5.0
      ratingCount: Math.floor(Math.random() * 500) + 10,
      thumbnail: `/placeholder.svg?height=240&width=320&text=${encodeURIComponent(subject)}`,
      tags: getRandomItems(subjectTags, Math.floor(Math.random() * 3) + 2),
      createdAt,
      updatedAt,
      popularity: Math.floor(Math.random() * 1000) + 50,
      difficulty: getRandomItems(difficulties, 1)[0],
      language: Math.random() > 0.3 ? "Bengali" : "English",
      isNew: createdAt > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // New if less than 30 days old
      isFeatured: Math.random() > 0.8, // 20% chance of being featured
    })
  }

  return courses
}

// Generate courses for all subjects
export const allCourses: Course[] = [
  ...generateCoursesForSubject("Physics", 15),
  ...generateCoursesForSubject("Chemistry", 15),
  ...generateCoursesForSubject("Biology", 15),
  ...generateCoursesForSubject("Mathematics", 15),
  ...generateCoursesForSubject("Bangla", 10),
  ...generateCoursesForSubject("English", 10),
  ...generateCoursesForSubject("Religion", 10),
  ...generateCoursesForSubject("Arabic", 10),
  ...generateCoursesForSubject("General Science", 15),
]

// Export courses as a named export (required by components)
export const courses = allCourses

// Export courseData as a named export (required by components)
export const courseData = {
  courses: allCourses,
  categories,
  levels,
  instructors,
  tagsBySubject,
}

// Get courses by subject
export const getCoursesBySubject = (subject: string): Course[] => {
  return allCourses.filter((course) => course.subject === subject)
}

// Get course by ID
export const getCourseById = (id: string): Course | undefined => {
  return allCourses.find((course) => course.id === id)
}

// Get featured courses
export const getFeaturedCourses = (): Course[] => {
  return allCourses.filter((course) => course.isFeatured)
}

// Get new courses
export const getNewCourses = (): Course[] => {
  return allCourses.filter((course) => course.isNew)
}

// Get popular courses
export const getPopularCourses = (): Course[] => {
  return [...allCourses].sort((a, b) => b.popularity - a.popularity).slice(0, 10)
}

// Get recommended courses based on a course
export const getRecommendedCourses = (courseId: string): Course[] => {
  const course = getCourseById(courseId)
  if (!course) return []

  return allCourses
    .filter(
      (c) =>
        c.id !== courseId &&
        (c.subject === course.subject || c.level === course.level || c.tags.some((tag) => course.tags.includes(tag))),
    )
    .sort(() => 0.5 - Math.random())
    .slice(0, 6)
}

// Search courses
export const searchCourses = (query: string): Course[] => {
  const lowercaseQuery = query.toLowerCase()
  return allCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(lowercaseQuery) ||
      course.description.toLowerCase().includes(lowercaseQuery) ||
      course.instructor.toLowerCase().includes(lowercaseQuery) ||
      course.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
      course.subject.toLowerCase().includes(lowercaseQuery),
  )
}

// Helper function to get content format icon
export const getContentFormatIcon = (format: string): string => {
  switch (format.toLowerCase()) {
    case "video":
      return "video"
    case "animation":
      return "film"
    case "quiz":
      return "help-circle"
    case "interactive":
      return "mouse-pointer"
    case "text":
      return "file-text"
    default:
      return "book-open"
  }
}
