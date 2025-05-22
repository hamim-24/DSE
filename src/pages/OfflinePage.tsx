import type React from "react"
import { WifiOff, Download, HardDrive, Settings } from "lucide-react"
import OfflineContentManager from "../components/offline/OfflineContentManager"

const OfflinePage: React.FC = () => {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <WifiOff className="h-6 w-6 mr-2" />
              অফলাইন অ্যাকসেস
            </h1>
            <p className="text-gray-600">ইন্টারনেট ছাড়াও আপনার ডাউনলোড করা কন্টেন্ট দেখুন</p>
          </div>
          <button className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
            <Settings className="h-4 w-4 mr-2" />
            <span>অফলাইন সেটিংস</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <OfflineContentManager />
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Download className="h-5 w-5 mr-2 text-indigo-600" />
                অফলাইন ব্যবহার
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>অফলাইন ব্যবহারের জন্য আপনার পছন্দের কন্টেন্ট ডাউনলোড করুন। ইন্টারনেট সংযোগ ছাড়াও এই কন্টেন্ট দেখতে পারবেন।</p>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">কীভাবে ব্যবহার করবেন:</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>যে কোন কন্টেন্টের বিস্তারিত পেজে গিয়ে "ডাউনলোড" বাটনে ক্লিক করুন</li>
                    <li>ডাউনলোড সম্পন্ন হলে, কন্টেন্ট এই পেজে দেখা যাবে</li>
                    <li>অফলাইন থাকা অবস্থায় এই পেজ থেকে আপনার ডাউনলোড করা কন্টেন্ট অ্যাকসেস করুন</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <HardDrive className="h-5 w-5 mr-2 text-indigo-600" />
                স্টোরেজ টিপস
              </h2>
              <div className="space-y-3 text-gray-700 text-sm">
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-1.5 rounded-full mr-3 mt-0.5">
                    <svg
                      className="w-3 h-3 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p>অপ্রয়োজনীয় কন্টেন্ট মুছে ফেলুন স্টোরেজ খালি করতে</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-1.5 rounded-full mr-3 mt-0.5">
                    <svg
                      className="w-3 h-3 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p>ভিডিও কন্টেন্ট বেশি স্টোরেজ নেয়, প্রয়োজন না হলে অডিও বা টেক্সট কন্টেন্ট ডাউনলোড করুন</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-1.5 rounded-full mr-3 mt-0.5">
                    <svg
                      className="w-3 h-3 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p>ডাউনলোড করার আগে WiFi নেটওয়ার্কে থাকুন মোবাইল ডাটা সাশ্রয় করতে</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OfflinePage
