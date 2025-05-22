// This file serves as a central export point for all data
// This helps resolve import ambiguities between similarly named files

// Export everything from courseData.ts
export * from "./courseData"

// If there are any exports from courseData.tsx that are needed, add them here
// with explicit names to avoid conflicts

import type { Course } from "../types/courseTypes"

// Sample courses data
const sampleCourses: Course[] = [
  {
    id: "physics-1",
    title: "Introduction to Physics",
    description: "Learn the fundamentals of physics in this comprehensive course.",
    subject: "Physics",
    level: "Class 9",
    instructor: "Dr. Ahmed Khan",
    duration: 120,
    format: "video",
    rating: 4.5,
    ratingCount: 120,
    thumbnail: "/placeholder.svg?height=240&width=320&text=Physics",
    tags: ["mechanics", "energy", "motion"],
    createdAt: new Date(),
    updatedAt: new Date(),
    popularity: 500,
    difficulty: "beginner",
    language: "Bengali",
    isNew: true,
    isFeatured: true,
  },
  {
    id: "chemistry-1",
    title: "Basic Chemistry",
    description: "Explore the world of chemistry with hands-on experiments and clear explanations.",
    subject: "Chemistry",
    level: "Class 8",
    instructor: "Prof. Fatima Rahman",
    duration: 90,
    format: "video",
    rating: 4.2,
    ratingCount: 85,
    thumbnail: "/placeholder.svg?height=240&width=320&text=Chemistry",
    tags: ["elements", "compounds", "reactions"],
    createdAt: new Date(),
    updatedAt: new Date(),
    popularity: 350,
    difficulty: "beginner",
    language: "Bengali",
    isNew: false,
    isFeatured: true,
  },
  // Add more sample courses as needed
]

// Export functions to access the data
export const getAllCourses = (): Course[] => {
  return sampleCourses
}

export const getCoursesBySubject = (subject: string): Course[] => {
  return sampleCourses.filter((course) => course.subject === subject)
}

export const getCourseById = (id: string): Course | undefined => {
  return sampleCourses.find((course) => course.id === id)
}

export const getFeaturedCourses = (): Course[] => {
  return sampleCourses.filter((course) => course.isFeatured)
}

export const getNewCourses = (): Course[] => {
  return sampleCourses.filter((course) => course.isNew)
}

// Export categories and levels
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

export const levels = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "SSC", "HSC"]

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

// Export everything for convenience
export const courseData = {
  courses: sampleCourses,
  categories,
  levels,
}
