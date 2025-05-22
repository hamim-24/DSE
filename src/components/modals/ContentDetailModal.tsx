"use client"

import type React from "react"
import { useState } from "react"
import {
  X,
  ExternalLink,
  Clock,
  BookOpen,
  Video,
  Headphones,
  BookText,
  Award,
  Download,
  Check,
  Loader2,
} from "lucide-react"

interface ContentDetailModalProps {
  content: any
  isOpen: boolean
  onClose: () => void
}

const ContentDetailModal: React.FC<ContentDetailModalProps> = ({ content, isOpen, onClose }) => {
  if (!isOpen) return null

  // Get the appropriate icon based on content type
  const getTypeIcon = () => {
    switch (content.type) {
      case "video":
        return <Video className="h-5 w-5" />
      case "audio":
        return <Headphones className="h-5 w-5" />
      case "article":
      case "book":
        return <BookText className="h-5 w-5" />
      default:
        return <BookOpen className="h-5 w-5" />
    }
  }

  // Get the appropriate color based on content type
  const getTypeColor = () => {
    switch (content.type) {
      case "video":
        return "bg-red-500"
      case "audio":
        return "bg-blue-500"
      case "article":
        return "bg-emerald-500"
      case "book":
        return "bg-purple-500"
      default:
        return "bg-indigo-500"
    }
  }

  // Download button component with download functionality
  const DownloadButton = ({ content }: { content: any }) => {
    const [downloadState, setDownloadState] = useState<"idle" | "downloading" | "completed" | "error">("idle")

    const getDownloadType = () => {
      switch (content.type) {
        case "video":
          return "ভিডিও"
        case "audio":
          return "অডিও"
        case "article":
          return "আর্টিকেল"
        case "book":
          return "বই"
        default:
          return "কন্টেন্ট"
      }
    }

    const getFileExtension = () => {
      switch (content.type) {
        case "video":
          return ".mp4"
        case "audio":
          return ".mp3"
        case "article":
        case "book":
          return ".pdf"
        default:
          return ".zip"
      }
    }

    const handleDownload = async () => {
      try {
        setDownloadState("downloading")

        // Simulate download process
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // In a real app, this would be an actual download API call
        // For example:
        // const response = await fetch(`/api/download/${content.id}`)
        // const blob = await response.blob()
        // const url = window.URL.createObjectURL(blob)
        // const a = document.createElement('a')
        // a.href = url
        // a.download = `${content.title}${getFileExtension()}`
        // document.body.appendChild(a)
        // a.click()
        // window.URL.revokeObjectURL(url)
        // document.body.removeChild(a)

        setDownloadState("completed")

        // Reset state after showing completion for a moment
        setTimeout(() => {
          setDownloadState("idle")
        }, 2000)
      } catch (error) {
        console.error("Download failed:", error)
        setDownloadState("error")

        // Reset state after showing error for a moment
        setTimeout(() => {
          setDownloadState("idle")
        }, 2000)
      }
    }

    return (
      <button
        onClick={handleDownload}
        disabled={downloadState === "downloading"}
        className={`px-4 py-2 rounded-md flex items-center justify-center min-w-[140px] ${
          downloadState === "completed"
            ? "bg-green-600 text-white"
            : downloadState === "error"
              ? "bg-red-600 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
        } transition-colors`}
      >
        {downloadState === "idle" && (
          <>
            <Download className="h-4 w-4 mr-2" />
            <span>{getDownloadType()} ডাউনলোড</span>
          </>
        )}
        {downloadState === "downloading" && (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            <span>ডাউনলোড হচ্ছে...</span>
          </>
        )}
        {downloadState === "completed" && (
          <>
            <Check className="h-4 w-4 mr-2" />
            <span>ডাউনলোড সম্পন্ন</span>
          </>
        )}
        {downloadState === "error" && (
          <>
            <X className="h-4 w-4 mr-2" />
            <span>ত্রুটি হয়েছে</span>
          </>
        )}
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header with close button */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">কন্টেন্ট বিস্তারিত</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-grow">
          {/* Hero image */}
          <div className="relative h-56 md:h-72">
            <img
              src={content.thumbnail || "/placeholder.svg"}
              alt={content.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute top-4 right-4 p-2 rounded-full text-white ${getTypeColor()}`}>
              {getTypeIcon()}
            </div>
          </div>

          {/* Content details */}
          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-md">{content.category}</span>
              <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-md">{content.difficulty}</span>
              <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-md">{content.duration}</span>
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-md">
                {content.forGroup === "child"
                  ? "শিশুদের জন্য"
                  : content.forGroup === "student"
                    ? "শিক্ষার্থীদের জন্য"
                    : content.forGroup === "professional"
                      ? "পেশাজীবীদের জন্য"
                      : content.forGroup === "woman"
                        ? "নারীদের জন্য"
                        : content.forGroup === "elderly"
                          ? "প্রবীণদের জন্য"
                          : content.forGroup === "teacher"
                            ? "শিক্ষকদের জন্য"
                            : "সবার জন্য"}
              </span>
            </div>

            <h1 className="text-2xl font-bold mb-4">{content.title}</h1>

            <p className="text-gray-700 mb-6">{content.description}</p>

            {/* Learning objectives */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">শেখার উদ্দেশ্য</h3>
              <ul className="space-y-2">
                {content.learningObjectives?.map((objective: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-indigo-600 text-white rounded-full p-1 mr-2 mt-0.5">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {objective}
                  </li>
                ))}
              </ul>
            </div>

            {/* External resources */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">অতিরিক্ত রিসোর্স</h3>
              <div className="space-y-3">
                {content.resources?.map((resource: any, index: number) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div
                      className={`p-2 rounded-full mr-3 ${
                        resource.type === "video"
                          ? "bg-red-100 text-red-600"
                          : resource.type === "article"
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {resource.type === "video" ? (
                        <Video className="h-5 w-5" />
                      ) : resource.type === "article" ? (
                        <BookText className="h-5 w-5" />
                      ) : (
                        <ExternalLink className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-grow">
                      <div className="font-medium">{resource.title}</div>
                      <div className="text-sm text-gray-500">{resource.source}</div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </a>
                ))}
              </div>
            </div>

            {/* Author/Creator info */}
            {content.author && (
              <div className="mb-6 flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src={
                      content.author.avatar ||
                      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ||
                      "/placeholder.svg"
                    }
                    alt={content.author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{content.author.name}</div>
                  <div className="text-sm text-gray-500">{content.author.title}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer with action buttons */}
        <div className="border-t p-4 flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>{content.duration}</span>
            {content.points && (
              <div className="ml-4 flex items-center text-indigo-600">
                <Award className="h-4 w-4 mr-1" />
                <span>+{content.points} পয়েন্ট</span>
              </div>
            )}
          </div>

          <div className="flex space-x-3">
            <DownloadButton content={content} />
            <button className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors">
              সংরক্ষণ করুন
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
              {content.type === "video"
                ? "ভিডিও দেখুন"
                : content.type === "audio"
                  ? "অডিও শুনুন"
                  : content.type === "article"
                    ? "পড়ুন"
                    : content.type === "book"
                      ? "বই পড়ুন"
                      : "শুরু করুন"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentDetailModal
