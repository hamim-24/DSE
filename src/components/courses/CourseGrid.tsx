"use client"

import type React from "react"
import { BookOpen, Star, Clock, Users, Award, Filter } from "lucide-react"
import { type Course, levels, getContentFormatIcon } from "../../data/courseData"
import { useAppContext } from "../../context/AppContext"

interface CourseGridProps {
  courses: Course[]
  onCourseClick: (course: Course) => void
  themeColor: string
  resetFilters: () => void
}

const CourseGrid: React.FC<CourseGridProps> = ({ courses, onCourseClick, themeColor, resetFilters }) => {
  const { addPoints } = useAppContext()

  const handleStartCourse = (e: React.MouseEvent, courseId: number) => {
    e.stopPropagation()
    console.log(`Starting course ${courseId}`)
    addPoints(10)
  }

  if (courses.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="bg-gray-100 inline-block p-5 rounded-full mb-4">
          <Filter className="h-10 w-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-medium mb-2">কোন কোর্স পাওয়া যায়নি</h3>
        <p className="text-gray-600 mb-6">আপনার ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।</p>
        <button
          className="px-4 py-2 rounded-md font-medium transition-colors text-white"
          style={{ backgroundColor: themeColor }}
          onClick={resetFilters}
        >
          সব ফিল্টার রিসেট করুন
        </button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <div
          key={course.id}
          className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onCourseClick(course)}
        >
          <div className="relative h-48 overflow-hidden">
            <img
              src={course.image || "/placeholder.svg"}
              alt={course.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
            <div
              className="absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-medium text-white"
              style={{ backgroundColor: themeColor }}
            >
              {levels.find((l) => l.id === course.level)?.name}
            </div>
          </div>

          <div className="p-5">
            <h3 className="font-bold text-lg mb-3 line-clamp-2 transition-colors" style={{ hoverColor: themeColor }}>
              {course.title}
            </h3>

            <div className="flex flex-wrap gap-2 mb-3">
              {course.contentFormat.slice(0, 3).map((format, index) => (
                <div key={index} className="flex items-center bg-gray-100 px-2 py-1 rounded-md text-xs font-medium">
                  {getContentFormatIcon(format)}
                  <span className="ml-1">{format}</span>
                </div>
              ))}
              {course.contentFormat.length > 3 && (
                <div className="flex items-center bg-gray-100 px-2 py-1 rounded-md text-xs font-medium">
                  <span>+{course.contentFormat.length - 3}</span>
                </div>
              )}
            </div>

            <div className="flex items-center text-sm text-gray-500 mb-4">
              <div className="flex items-center mr-4">
                <Clock className="h-4 w-4 mr-1" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center mr-4">
                <BookOpen className="h-4 w-4 mr-1" />
                <span>{course.lessons} লেসন</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 text-yellow-500" />
                <span>{course.rating}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-500 flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{course.students.toLocaleString("bn-BD")} শিক্ষার্থী</span>
              </div>
              <div className="flex items-center text-sm">
                <Award className="h-4 w-4 mr-1" style={{ color: themeColor }} />
                <span className="font-medium">+১০ পয়েন্ট</span>
              </div>
            </div>

            {course.progress > 0 ? (
              <div>
                <div className="flex justify-between items-center mb-1 text-sm">
                  <span>প্রগতি</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{ width: `${course.progress}%`, backgroundColor: themeColor }}
                  ></div>
                </div>
                <button
                  className="mt-4 w-full py-2 rounded-md font-medium transition-colors"
                  style={{
                    backgroundColor: `${themeColor}20`,
                    color: themeColor,
                  }}
                  onClick={(e) => handleStartCourse(e, course.id)}
                >
                  অব্যাহত রাখুন
                </button>
              </div>
            ) : (
              <button
                className="w-full py-2 rounded-md font-medium transition-colors text-white"
                style={{ backgroundColor: themeColor }}
                onClick={(e) => handleStartCourse(e, course.id)}
              >
                শুরু করুন
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CourseGrid
