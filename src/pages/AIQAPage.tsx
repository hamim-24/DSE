'use client';

import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { grokAIService } from '../services/GrokAIService';
import {
  Brain,
  BookOpen,
  Lightbulb,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bookmark,
} from 'lucide-react';
import LoadingSpinner from '../components/ui/LoadingSpinner';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface Topic {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const AIQAPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const aiTopics: Topic[] = [
    {
      id: 'ai-basics',
      title: 'এআই এর মৌলিক ধারণা',
      description: 'কৃত্রিম বুদ্ধিমত্তা কী এবং এটি কীভাবে কাজ করে',
      icon: <Brain className="h-6 w-6" />,
    },
    {
      id: 'machine-learning',
      title: 'মেশিন লার্নিং',
      description: 'মেশিন লার্নিং এর মূলনীতি এবং প্রয়োগ',
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      id: 'neural-networks',
      title: 'নিউরাল নেটওয়ার্ক',
      description: 'নিউরাল নেটওয়ার্ক কীভাবে কাজ করে',
      icon: <Lightbulb className="h-6 w-6" />,
    },
    {
      id: 'ai-ethics',
      title: 'এআই নীতিশাস্ত্র',
      description: 'এআই এর নৈতিক দিক এবং সামাজিক প্রভাব',
      icon: <MessageSquare className="h-6 w-6" />,
    },
  ];

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with a welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome',
      role: 'assistant',
      content:
        'স্বাগতম এআই প্রশ্নোত্তর সেকশনে! আমি আপনাকে কৃত্রিম বুদ্ধিমত্তা সম্পর্কে শিখতে সাহায্য করতে এখানে আছি। আপনি কোন বিষয়ে জানতে চান?',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  // Handle topic selection
  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
    const topic = aiTopics.find((t) => t.id === topicId);

    if (topic) {
      const topicMessage: Message = {
        id: `topic-${Date.now()}`,
        role: 'assistant',
        content: `আপনি "${topic.title}" বিষয়টি নির্বাচন করেছেন। ${topic.description}। আপনার কোন প্রশ্ন আছে?`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, topicMessage]);
    }
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Create user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    // Add user message to state
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Create system prompt based on selected topic
      let systemPrompt =
        'You are an AI education assistant. Provide helpful, educational responses about AI concepts.';

      if (selectedTopic) {
        const topic = aiTopics.find((t) => t.id === selectedTopic);
        if (topic) {
          systemPrompt += ` The user is asking about ${topic.title}: ${topic.description}.`;
        }
      }

      // Create conversation with system prompt
      const conversation = grokAIService.createConversation(systemPrompt);

      // Add user message to conversation
      const updatedConversation = grokAIService.addUserMessage(
        conversation,
        userMessage.content
      );

      // Get AI response
      const responseConversation = await grokAIService.sendMessage(
        updatedConversation
      );

      // Extract assistant message
      const assistantMessage = responseConversation.messages.find(
        (m) => m.role === 'assistant'
      );

      if (assistantMessage) {
        // Add assistant message to state
        const newAssistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: assistantMessage.content,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newAssistantMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);

      // Add error message
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'দুঃখিত, একটি ত্রুটি হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle pressing Enter to send message
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Extract and render suggested questions from assistant messages
  const renderSuggestedQuestions = (message: string) => {
    // Simple regex to find questions in the message
    const questionRegex =
      /(?:প্রশ্ন:|আপনি জিজ্ঞাসা করতে পারেন:|আরও জানতে চাইলে:)(?:\s*-?\s*([^?]+\?))+/g;
    const match = message.match(questionRegex);

    if (!match) return null;

    // Extract individual questions
    const questions: string[] = [];
    match.forEach((m) => {
      const lines = m.split(/\n|-/);
      lines.forEach((line) => {
        const trimmed = line
          .replace(/^প্রশ্ন:|^আপনি জিজ্ঞাসা করতে পারেন:|^আরও জানতে চাইলে:/, '')
          .trim();
        if (trimmed && trimmed.endsWith('?')) {
          questions.push(trimmed);
        }
      });
    });

    if (questions.length === 0) return null;

    return (
      <div className="mt-3 space-y-2">
        <p className="text-sm font-medium text-gray-700">প্রস্তাবিত প্রশ্ন:</p>
        <div className="flex flex-wrap gap-2">
          {questions.map((question, index) => (
            <button
              key={index}
              className="px-3 py-1 text-sm bg-indigo-50 text-indigo-700 rounded-full hover:bg-indigo-100 transition-colors"
              onClick={() => {
                setInputValue(question);
              }}
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Topics sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              এআই বিষয়সমূহ
            </h2>
            <div className="space-y-2">
              {aiTopics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => handleTopicSelect(topic.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedTopic === topic.id
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`p-2 rounded-full ${
                        selectedTopic === topic.id
                          ? 'bg-indigo-200'
                          : 'bg-gray-200'
                      }`}
                    >
                      {topic.icon}
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium">{topic.title}</h3>
                      <p className="text-sm text-gray-500">
                        {topic.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              শিক্ষার টিপস
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span>
                  নির্দিষ্ট প্রশ্ন জিজ্ঞাসা করুন যাতে আরও সুনির্দিষ্ট উত্তর পান
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span>
                  একটি বিষয় নির্বাচন করুন এবং সেই বিষয়ে গভীরভাবে শিখুন
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span>
                  প্রস্তাবিত প্রশ্নগুলি ব্যবহার করে আরও জ্ঞান অর্জন করুন
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span>
                  আপনার বোঝা যাচাই করতে "এটি আমাকে ব্যাখ্যা করুন" বলুন
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Chat area */}
        <div className="lg:w-3/4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-[600px]">
            {/* Chat header */}
            <div className="bg-indigo-600 text-white p-4">
              <h1 className="text-xl font-bold flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                এআই প্রশ্নোত্তর শিক্ষা
              </h1>
              <p className="text-indigo-100 text-sm">
                এআই সম্পর্কে যেকোনো প্রশ্ন জিজ্ঞাসা করুন এবং শিখুন
              </p>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-3xl rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-indigo-100 text-indigo-900'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>

                    {message.role === 'assistant' && (
                      <>
                        {renderSuggestedQuestions(message.content)}
                        <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between items-center">
                          <div className="flex space-x-2">
                            <button className="text-gray-500 hover:text-green-500">
                              <ThumbsUp className="h-4 w-4" />
                            </button>
                            <button className="text-gray-500 hover:text-red-500">
                              <ThumbsDown className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-gray-500 hover:text-indigo-500">
                              <Bookmark className="h-4 w-4" />
                            </button>
                            <button className="text-gray-500 hover:text-indigo-500">
                              <Share2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-3xl rounded-lg p-3 bg-gray-100">
                    <LoadingSpinner size="small" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="border-t p-4">
              <div className="flex items-end gap-2">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="আপনার প্রশ্ন লিখুন..."
                  className="flex-1 p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={2}
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  পাঠান
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Enter চাপুন পাঠাতে। নতুন লাইনের জন্য Shift+Enter চাপুন।
              </p>
            </div>
          </div>

          {/* Learning progress */}
          <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
            <h2 className="text-lg font-bold mb-2 text-gray-800">
              আপনার শিক্ষার অগ্রগতি
            </h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>এআই এর মৌলিক ধারণা</span>
                  <span>60%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: '60%' }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>মেশিন লার্নিং</span>
                  <span>25%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: '25%' }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>নিউরাল নেটওয়ার্ক</span>
                  <span>10%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: '10%' }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>এআই নীতিশাস্ত্র</span>
                  <span>5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: '5%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIQAPage;
