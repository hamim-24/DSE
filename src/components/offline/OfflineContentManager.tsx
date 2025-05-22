"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Trash2, Download, Wifi, WifiOff, HardDrive } from "lucide-react"

interface OfflineContent {
  id: number
  title: string
  type: string
  category: string
  thumbnail: string
  size: string
  downloadDate: string
}

const OfflineContentManager: React.FC = () => {
  const [offlineContents, setOfflineContents] = useState<OfflineContent[]>([])
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine)
  const [storageUsed, setStorageUsed] = useState<string>("0 MB")
  const [storageAvailable, setStorageAvailable] = useState<string>("0 MB")

  // Sample offline content data
  useEffect(() => {
    // In a real app, this would come from IndexedDB or other storage
    const sampleOfflineContents: OfflineContent[] = [
      {
        id: 1,
        title: "ছোটদের জন্য সূর্য ও গ্রহ-নক্ষত্রের গল্প",
        type: "video",
        category: "astronomy",
        thumbnail: "https://images.pexels.com/photos/5439/earth-space.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        size: "45 MB",
        downloadDate: "১০ মে, ২০২৩",
      },
      {
        id: 3,
        title: "ধান চাষের আধুনিক পদ্ধতি: বিশেষজ্ঞ কৃষক আলোচনা",
        type: "audio",
        category: "agriculture",
        thumbnail:
          "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        size: "12 MB",
        downloadDate: "১৫ মে, ২০২৩",
      },
      {
        id: 2,
        title: "কীভাবে গাছ খাদ্য তৈরি করে: সালোকসংশ্লেষণ ব্যাখ্যা",
        type: "article",
        category: "biology",
        thumbnail:
          "https://images.pexels.com/photos/2249959/pexels-photo-2249959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        size: "2.5 MB",
        downloadDate: "১২ মে, ২০২৩",
      },
    ]

    setOfflineContents(sampleOfflineContents)

    // Calculate storage stats
    const totalSize = sampleOfflineContents.reduce((acc, content) => {
      const sizeInMB = Number.parseFloat(content.size.replace(" MB", ""))
      return acc + sizeInMB
    }, 0)

    setStorageUsed(`${totalSize.toFixed(1)} MB`)
    setStorageAvailable("1000 MB") // 1GB example limit
  }, [])

  // Monitor online/offline status
  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine)
    }

    window.addEventListener("online", handleOnlineStatus)
    window.addEventListener("offline", handleOnlineStatus)

    return () => {
      window.removeEventListener("online", handleOnlineStatus)
      window.removeEventListener("offline", handleOnlineStatus)
    }
  }, [])

  const handleDeleteContent = (id: number) => {
    // In a real app, this would delete from IndexedDB or other storage
    setOfflineContents((prevContents) => {
      const newContents = prevContents.filter((content) => content.id !== id)

      // Recalculate storage
      const totalSize = newContents.reduce((acc, content) => {
        const sizeInMB = Number.parseFloat(content.size.replace(" MB", ""))
        return acc + sizeInMB
      }, 0)

      setStorageUsed(`${totalSize.toFixed(1)} MB`)

      return newContents
    })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return (
          <div className="bg-red-500 p-1.5 rounded-full text-white">
            <Download className="h-4 w-4" />
          </div>
        )
      case "audio":
        return (
          <div className="bg-blue-500 p-1.5 rounded-full text-white">
            <Download className="h-4 w-4" />
          </div>
        )
      case "article":
        return (
          <div className="bg-emerald-500 p-1.5 rounded-full text-white">
            <Download className="h-4 w-4" />
          </div>
        )
      case "book":
        return (
          <div className="bg-purple-500 p-1.5 rounded-full text-white">
            <Download className="h-4 w-4" />
          </div>
        )
      default:
        return (
          <div className="bg-gray-500 p-1.5 rounded-full text-white">
            <Download className="h-4 w-4" />
          </div>
        )
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold flex items-center">
          <HardDrive className="h-5 w-5 mr-2 text-indigo-600" />
          অফলাইন কন্টেন্ট
        </h2>
        <div className="flex items-center">
          {isOnline ? (
            <div className="flex items-center text-green-600">
              <Wifi className="h-4 w-4 mr-1" />
              <span className="text-sm">অনলাইন</span>
            </div>
          ) : (
            <div className="flex items-center text-orange-600">
              <WifiOff className="h-4 w-4 mr-1" />
              <span className="text-sm">অফলাইন</span>
            </div>
          )}
        </div>
      </div>

      {/* Storage info */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">স্টোরেজ ব্যবহার</span>
          <span className="text-sm font-medium">
            {storageUsed} / {storageAvailable}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="h-2.5 rounded-full bg-indigo-600"
            style={{ width: `${(Number.parseFloat(storageUsed) / Number.parseFloat(storageAvailable)) * 100}%` }}
          ></div>
        </div>
      </div>

      {offlineContents.length > 0 ? (
        <div className="space-y-4">
          {offlineContents.map((content) => (
            <div
              key={content.id}
              className="flex items-center border border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition-colors"
            >
              <div className="w-16 h-16 rounded-md overflow-hidden mr-4 flex-shrink-0">
                <img
                  src={content.thumbnail || "/placeholder.svg"}
                  alt={content.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="font-medium text-sm mb-1 truncate">{content.title}</h3>
                <div className="flex items-center text-xs text-gray-500 space-x-3">
                  <span>
                    {content.type === "video"
                      ? "ভিডিও"
                      : content.type === "audio"
                        ? "অডিও"
                        : content.type === "article"
                          ? "আর্টিকেল"
                          : "বই"}
                  </span>
                  <span>•</span>
                  <span>{content.size}</span>
                  <span>•</span>
                  <span>ডাউনলোড: {content.downloadDate}</span>
                </div>
              </div>
              <div className="flex items-center ml-4">
                <button
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  onClick={() => handleDeleteContent(content.id)}
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="bg-gray-100 inline-block p-4 rounded-full mb-4">
            <Download className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">কোন অফলাইন কন্টেন্ট নেই</h3>
          <p className="text-gray-600 mb-4">অফলাইনে ব্যবহারের জন্য কন্টেন্ট ডাউনলোড করুন</p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
            কন্টেন্ট ব্রাউজ করুন
          </button>
        </div>
      )}
    </div>
  )
}

export default OfflineContentManager
