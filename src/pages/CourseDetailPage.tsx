"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getCourseById } from "../data"
import LoadingSpinner from "../components/ui/LoadingSpinner"

type CourseDetailProps = {}

const CourseDetailPage: React.FC<CourseDetailProps> = () => {
  const { courseId } = useParams<{ courseId: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [course, setCourse] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate loading data
    setLoading(true)
    setError(null)

    try {
      setTimeout(() => {
        if (!courseId) {
          setError("Course ID is missing")
          setLoading(false)
          return
        }

        const foundCourse = getCourseById(courseId)

        if (foundCourse) {
          setCourse(foundCourse)
        } else {
          setError("Course not found")
        }

        setLoading(false)
      }, 500)
    } catch (err) {
      console.error("Error loading course:", err)
      setError("Failed to load course data")
      setLoading(false)
    }
  }, [courseId])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingSpinner />
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-red-700 mb-2">{error || "Course Not Found"}</h2>
          <p className="text-red-600 mb-4">
            {error === "Course not found"
              ? "The course you're looking for doesn't exist or has been removed."
              : "There was an error loading this course."}
          </p>
          <button
            onClick={() => navigate("/learn")}
            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Browse All Courses
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Course Header */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src={course.thumbnail || `/placeholder.svg?height=192&width=192&text=${encodeURIComponent(course.title)}`}
              alt={course.title}
            />
          </div>
          <div className="p-8">
            <div className="flex items-center">
              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full uppercase font-medium tracking-wide">
                {course.subject}
              </span>
              <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase font-medium tracking-wide">
                {course.level}
              </span>
              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full uppercase font-medium tracking-wide">
                {course.format || "Video"}
              </span>
            </div>
            <div className="mt-4 block text-3xl leading-tight font-bold text-gray-900">{course.title}</div>
            <p className="mt-2 text-gray-600">{course.instructor}</p>
            <div className="mt-4 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < (course.rating || 4) ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-gray-600 text-sm">
                  {course.rating || 4.0} ({course.ratingCount || 24} reviews)
                </span>
              </div>
              <span className="mx-2 text-gray-500">•</span>
              <span className="text-gray-600 text-sm">{course.popularity || 120} students enrolled</span>
              <span className="mx-2 text-gray-500">•</span>
              <span className="text-gray-600 text-sm">{course.duration || "2 hours"} total</span>
            </div>
          </div>
        </div>
      </div>

      {/* Course Navigation */}
      <div className="bg-white rounded-xl shadow-md mb-8">
        <nav className="flex border-b overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
              activeTab === "overview"
                ? "border-b-2 border-purple-500 text-purple-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("curriculum")}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
              activeTab === "curriculum"
                ? "border-b-2 border-purple-500 text-purple-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Curriculum
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
              activeTab === "reviews"
                ? "border-b-2 border-purple-500 text-purple-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Reviews
          </button>
          <button
            onClick={() => setActiveTab("instructor")}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
              activeTab === "instructor"
                ? "border-b-2 border-purple-500 text-purple-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Instructor
          </button>
        </nav>

        <div className="p-6">
          {activeTab === "overview" && (
            <div>
              <h3 className="text-xl font-bold mb-4">About This Course</h3>
              <p className="text-gray-700 mb-6">
                {course.description ||
                  "This comprehensive course covers all the essential topics you need to master this subject. Through a combination of video lectures, interactive quizzes, and hands-on exercises, you will gain both theoretical knowledge and practical skills."}
              </p>

              <h4 className="text-lg font-semibold mb-3">What You'll Learn</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                {(
                  course.learningOutcomes || [
                    "Understand core concepts and principles",
                    "Apply theoretical knowledge to practical problems",
                    "Develop critical thinking and analytical skills",
                    "Master key techniques and methodologies",
                    "Complete real-world projects and assignments",
                    "Prepare for advanced studies in this field",
                  ]
                ).map((outcome: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>

              <h4 className="text-lg font-semibold mb-3">Requirements</h4>
              <ul className="list-disc pl-5 mb-6 text-gray-700">
                {(
                  course.requirements || [
                    "Basic understanding of the subject",
                    "Access to a computer with internet connection",
                    "Willingness to practice and complete assignments",
                  ]
                ).map((req: string, index: number) => (
                  <li key={index} className="mb-1">
                    {req}
                  </li>
                ))}
              </ul>

              <div className="bg-purple-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-3 text-purple-800">Ready to start learning?</h4>
                <button className="px-8 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium">
                  Enroll in Course
                </button>
              </div>
            </div>
          )}

          {activeTab === "curriculum" && (
            <div>
              <h3 className="text-xl font-bold mb-4">Course Curriculum</h3>
              <p className="text-gray-700 mb-6">
                This course includes {course.lectureCount || 12} lectures and {course.quizCount || 5} quizzes with a
                total duration of {course.duration || "2 hours"}.
              </p>

              {(
                course.sections || [
                  {
                    title: "Introduction",
                    lectures: [
                      { title: "Welcome to the Course", duration: "5:20", type: "video" },
                      { title: "Course Overview", duration: "8:15", type: "video" },
                      { title: "How to Get the Most from This Course", duration: "6:40", type: "video" },
                    ],
                  },
                  {
                    title: "Core Concepts",
                    lectures: [
                      { title: "Fundamental Principles", duration: "12:30", type: "video" },
                      { title: "Key Terminology", duration: "9:45", type: "video" },
                      { title: "Knowledge Check", duration: "10:00", type: "quiz" },
                    ],
                  },
                  {
                    title: "Advanced Topics",
                    lectures: [
                      { title: "Advanced Techniques", duration: "15:20", type: "video" },
                      { title: "Problem Solving Strategies", duration: "14:10", type: "video" },
                      { title: "Practical Application", duration: "18:30", type: "video" },
                      { title: "Final Assessment", duration: "20:00", type: "quiz" },
                    ],
                  },
                ]
              ).map((section: any, sectionIndex: number) => (
                <div key={sectionIndex} className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h4 className="font-semibold text-gray-800">
                      Section {sectionIndex + 1}: {section.title}
                    </h4>
                  </div>
                  <div>
                    {section.lectures.map((lecture: any, lectureIndex: number) => (
                      <div
                        key={lectureIndex}
                        className="px-6 py-4 border-b border-gray-200 last:border-b-0 flex justify-between items-center"
                      >
                        <div className="flex items-center">
                          {lecture.type === "video" ? (
                            <svg
                              className="h-5 w-5 text-blue-500 mr-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="h-5 w-5 text-green-500 mr-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          )}
                          <span>{lecture.title}</span>
                        </div>
                        <span className="text-gray-500 text-sm">{lecture.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <h3 className="text-xl font-bold mb-4">Student Reviews</h3>
              <div className="flex items-center mb-6">
                <div className="mr-4">
                  <div className="text-5xl font-bold text-gray-900">{course.rating || 4.8}</div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < (course.rating || 4) ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">{course.ratingCount || 24} reviews</div>
                </div>
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center mb-1">
                      <div className="w-10 text-sm text-gray-600">{star} stars</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mx-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{
                            width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 5 : star === 2 ? 3 : 2}%`,
                          }}
                        ></div>
                      </div>
                      <div className="w-10 text-xs text-gray-600">
                        {star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 5 : star === 2 ? 3 : 2}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {(
                  course.reviews || [
                    {
                      name: "Sarah Johnson",
                      date: "2 weeks ago",
                      rating: 5,
                      comment:
                        "This course exceeded my expectations. The instructor explains complex concepts in a way that's easy to understand, and the practical exercises really helped solidify my understanding.",
                    },
                    {
                      name: "Michael Chen",
                      date: "1 month ago",
                      rating: 4,
                      comment:
                        "Very informative course with great examples. I would have liked more practice problems, but overall it was excellent and I learned a lot.",
                    },
                    {
                      name: "Priya Patel",
                      date: "2 months ago",
                      rating: 5,
                      comment:
                        "The instructor is clearly an expert in the field and presents the material in an engaging way. I particularly appreciated the real-world applications that were discussed.",
                    },
                  ]
                ).map((review: any, index: number) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-medium mr-3">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{review.name}</div>
                        <div className="text-sm text-gray-500">{review.date}</div>
                      </div>
                    </div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "instructor" && (
            <div>
              <h3 className="text-xl font-bold mb-4">About the Instructor</h3>
              <div className="flex items-start mb-6">
                <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-2xl font-medium mr-6">
                  {course.instructor ? course.instructor.charAt(0) : "I"}
                </div>
                <div>
                  <h4 className="text-lg font-semibold">{course.instructor || "Dr. John Smith"}</h4>
                  <p className="text-gray-600 mb-2">{course.instructorTitle || "Professor of Science"}</p>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < 4.8 ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-gray-600 text-sm">4.8 Instructor Rating</span>
                    </div>
                    <span className="mx-2 text-gray-500">•</span>
                    <span className="text-gray-600 text-sm">{course.instructorReviews || 142} Reviews</span>
                    <span className="mx-2 text-gray-500">•</span>
                    <span className="text-gray-600 text-sm">{course.instructorStudents || 3240} Students</span>
                    <span className="mx-2 text-gray-500">•</span>
                    <span className="text-gray-600 text-sm">{course.instructorCourses || 12} Courses</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-6">
                {course.instructorBio ||
                  "With over 15 years of experience in teaching and research, I am passionate about making complex subjects accessible to students of all backgrounds. My teaching philosophy centers on practical application and deep understanding rather than rote memorization. I have published numerous papers in leading academic journals and have received awards for both my research and teaching excellence."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CourseDetailPage
