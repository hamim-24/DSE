'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { audioCategories } from '../data/audioLibraryData';
import IVRSimulator from '../components/audio/IVRSimulator';
import AudioPlayer from '../components/audio/AudioPlayer';
import CertificateView from '../components/audio/CertificateView';
import type { AudioContent, CompletedAudio } from '../types/audioTypes';

const AudioLibraryPage: React.FC = () => {
  const [selectedContent, setSelectedContent] = useState<AudioContent | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [completedAudios, setCompletedAudios] = useState<CompletedAudio[]>([]);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  // Load completed audios from localStorage
  useEffect(() => {
    const savedCompletedAudios = localStorage.getItem('completedAudios');
    if (savedCompletedAudios) {
      const parsedCompletedAudios = JSON.parse(savedCompletedAudios);
      setCompletedAudios(parsedCompletedAudios);

      // Calculate total points
      const points = parsedCompletedAudios.reduce(
        (sum: number, audio: CompletedAudio) => sum + audio.points,
        0
      );
      setTotalPoints(points);
    }
  }, []);

  // Save completed audios to localStorage
  useEffect(() => {
    if (completedAudios.length > 0) {
      localStorage.setItem('completedAudios', JSON.stringify(completedAudios));
    }
  }, [completedAudios]);

  const handleSelectContent = (content: AudioContent, category: string) => {
    setSelectedContent(content);
    setSelectedCategory(category);
  };

  const handleCompleteAudio = (content: AudioContent, category: string) => {
    // Check if already completed
    const isAlreadyCompleted = completedAudios.some(
      (audio) => audio.id === content.id
    );

    if (!isAlreadyCompleted) {
      const newCompletedAudio: CompletedAudio = {
        id: content.id,
        title: content.title,
        category: category,
        completedAt: new Date().toISOString(),
        points: content.points,
      };

      setCompletedAudios((prev) => [...prev, newCompletedAudio]);
      setTotalPoints((prev) => prev + content.points);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">অডিও লাইব্রেরি</h1>

      {showCertificate ? (
        <div>
          <CertificateView
            completedAudios={completedAudios}
            totalPoints={totalPoints}
          />
          <div className="text-center mt-6">
            <button
              onClick={() => setShowCertificate(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              লাইব্রেরিতে ফিরে যান
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <div className="bg-blue-50 p-4 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">আপনার অগ্রগতি</h2>
                <div className="flex justify-between items-center mb-3">
                  <span>মোট পয়েন্ট:</span>
                  <span className="font-bold text-blue-600">{totalPoints}</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span>সম্পন্ন অডিও:</span>
                  <span className="font-bold text-blue-600">
                    {completedAudios.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>বর্তমান স্তর:</span>
                  <span className="font-bold text-blue-600">
                    {totalPoints < 20
                      ? 'প্রাথমিক'
                      : totalPoints < 50
                      ? 'মধ্যম'
                      : 'উন্নত'}
                  </span>
                </div>

                <button
                  onClick={() => setShowCertificate(true)}
                  className="w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  সার্টিফিকেট দেখুন
                </button>
              </div>

              <IVRSimulator onSelectContent={handleSelectContent} />
            </div>

            <div className="w-full md:w-2/3">
              {selectedContent ? (
                <AudioPlayer
                  content={selectedContent}
                  category={selectedCategory || ''}
                  onComplete={handleCompleteAudio}
                />
              ) : (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">অডিও বিভাগসমূহ</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {audioCategories.map((category) => (
                      <div
                        key={category.id}
                        className="border border-gray-200 rounded-lg p-4 hover:bg-blue-50 cursor-pointer transition"
                      >
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{category.icon}</span>
                          <div>
                            <h3 className="font-medium">{category.name}</h3>
                            <p className="text-sm text-gray-600">
                              {category.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-gray-600 text-center">
                    অডিও শোনার জন্য বাম পাশের IVR সিমুলেটর ব্যবহার করুন
                  </p>
                </div>
              )}
            </div>
          </div>

          {completedAudios.length > 0 && (
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">সম্পন্ন করা অডিও</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 text-left">শিরোনাম</th>
                      <th className="py-2 px-4 text-left">বিভাগ</th>
                      <th className="py-2 px-4 text-left">তারিখ</th>
                      <th className="py-2 px-4 text-left">পয়েন্ট</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedAudios.map((audio) => (
                      <tr key={audio.id} className="border-b">
                        <td className="py-2 px-4">{audio.title}</td>
                        <td className="py-2 px-4">{audio.category}</td>
                        <td className="py-2 px-4">
                          {new Date(audio.completedAt).toLocaleDateString()}
                        </td>
                        <td className="py-2 px-4">{audio.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AudioLibraryPage;
