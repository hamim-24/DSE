export interface Course {
  id: string
  title: string
  description: string
  subject: string
  level: string
  instructor: string
  duration: number // in minutes
  format: "video" | "animation" | "quiz" | "interactive" | "text"
  rating: number
  ratingCount: number
  thumbnail: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
  popularity: number // number of enrollments
  difficulty: "beginner" | "intermediate" | "advanced"
  language: string
  isNew?: boolean
  isFeatured?: boolean
}

export interface FilterOptions {
  search: string
  levels: string[]
  formats: string[]
  duration: {
    min: number
    max: number
  } | null
  rating: number | null
  difficulty: string[]
  sortBy: "newest" | "popular" | "rating" | "title"
  sortOrder: "asc" | "desc"
  tags: string[]
  instructors: string[]
}

export interface FilterOption {
  label: string
  value: string
}

export const defaultFilterOptions: FilterOptions = {
  search: "",
  levels: [],
  formats: [],
  duration: null,
  rating: null,
  difficulty: [],
  sortBy: "popular",
  sortOrder: "desc",
  tags: [],
  instructors: [],
}

// Adding the missing exports
export const formatOptions: FilterOption[] = [
  { label: "Video", value: "video" },
  { label: "Animation", value: "animation" },
  { label: "Quiz", value: "quiz" },
  { label: "Interactive", value: "interactive" },
  { label: "Text", value: "text" },
]

export const difficultyOptions: FilterOption[] = [
  { label: "Beginner", value: "beginner" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Advanced", value: "advanced" },
]

export const sortOptions: FilterOption[] = [
  { label: "Most Popular", value: "popular-desc" },
  { label: "Newest", value: "newest-desc" },
  { label: "Highest Rated", value: "rating-desc" },
  { label: "Title (A-Z)", value: "title-asc" },
  { label: "Title (Z-A)", value: "title-desc" },
]

export const durationOptions: FilterOption[] = [
  { label: "Under 30 minutes", value: "0-30" },
  { label: "30-60 minutes", value: "30-60" },
  { label: "1-2 hours", value: "60-120" },
  { label: "2+ hours", value: "120-999" },
]
