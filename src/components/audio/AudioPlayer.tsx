'use client';

import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import type { AudioContent } from '../../types/audioTypes';

interface AudioPlayerProps {
  content: AudioContent;
  category: string;
  onComplete: (content: AudioContent, category: string) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  content,
  category,
  onComplete,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Reset state when content changes
    setIsPlaying(false);
    setCurrentTime(0);
    setCompleted(false);

    // Set duration from content
    setDuration(content.duration);

    // Reset audio element
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
    }
  }, [content]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);

      // Mark as completed when 90% of audio is played
      if (
        audioRef.current.currentTime >= audioRef.current.duration * 0.9 &&
        !completed
      ) {
        setCompleted(true);
        onComplete(content, category);
      }
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number.parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="mb-4">
        <h3 className="text-xl font-medium text-gray-800">{content.title}</h3>
        <p className="text-gray-600 text-sm mt-1">{content.description}</p>
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <span className="mr-4">সময়: {formatTime(content.duration)}</span>
          <span>পয়েন্ট: {content.points}</span>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={content.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={(e) =>
          setDuration((e.target as HTMLAudioElement).duration)
        }
        className="hidden"
      />

      <div className="flex items-center mb-4">
        <button
          onClick={togglePlayPause}
          className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
            isPlaying
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-green-500 hover:bg-green-600'
          } text-white focus:outline-none`}
        >
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
            </svg>
          )}
        </button>

        <div className="flex-1">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {completed && (
        <div className="bg-green-100 text-green-800 p-3 rounded-md text-sm">
          অভিনন্দন! আপনি এই অডিও সম্পন্ন করেছেন এবং {content.points} পয়েন্ট
          অর্জন করেছেন।
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
