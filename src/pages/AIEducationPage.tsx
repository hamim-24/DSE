'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  TopicSelector,
  SubtopicSelector,
  AIEducationHeader,
  ResourceList,
} from '../components/ai-education';
import GrokConversation from '../components/ai-education/GrokConversation';
import { specializedAssistants } from '../data/specializedAssistants';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary';
import AIStatusIndicator from '../components/ai-education/AIStatusIndicator';
import AIConfigPanel from '../components/ai-education/AIConfigPanel';

const AIEducationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Get subject, topic, and subtopic from URL params
  const subjectParam = queryParams.get('subject');
  const topicParam = queryParams.get('topic');
  const subtopicParam = queryParams.get('subtopic');

  // State for selected options
  const [selectedAssistant, setSelectedAssistant] = useState<any | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | undefined>(
    topicParam || undefined
  );
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | undefined>(
    subtopicParam || undefined
  );
  const [messages, setMessages] = useState<any[]>([]);
  const [systemPrompt, setSystemPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Find the assistant based on the subject param
  useEffect(() => {
    setIsLoading(true);

    try {
      if (subjectParam) {
        const assistant = specializedAssistants.find(
          (a) =>
            a.id === subjectParam ||
            a.name.toLowerCase() === subjectParam.toLowerCase()
        );

        if (assistant) {
          setSelectedAssistant(assistant);
          setSystemPrompt(assistant.systemPrompt || '');
        } else {
          // Default to the first assistant if the specified one is not found
          setSelectedAssistant(specializedAssistants[0]);
          setSystemPrompt(specializedAssistants[0].systemPrompt || '');
        }
      } else {
        // Default to the first assistant if none is specified
        setSelectedAssistant(specializedAssistants[0]);
        setSystemPrompt(specializedAssistants[0].systemPrompt || '');
      }
    } catch (error) {
      console.error('Error setting up assistant:', error);
    } finally {
      setIsLoading(false);
    }
  }, [subjectParam]);

  // Update URL when selections change
  useEffect(() => {
    if (selectedAssistant) {
      const params = new URLSearchParams();
      params.set('subject', selectedAssistant.id);

      if (selectedTopic) {
        params.set('topic', selectedTopic);

        if (selectedSubtopic) {
          params.set('subtopic', selectedSubtopic);
        }
      }

      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    }
  }, [
    selectedAssistant,
    selectedTopic,
    selectedSubtopic,
    navigate,
    location.pathname,
  ]);

  // Handle assistant change
  const handleAssistantChange = (assistant: any) => {
    setSelectedAssistant(assistant);
    setSelectedTopic(undefined);
    setSelectedSubtopic(undefined);
    setSystemPrompt(assistant.systemPrompt || '');
    setMessages([]); // Clear messages when changing assistant
  };

  // Handle topic change
  const handleTopicChange = (topic: string) => {
    setSelectedTopic(topic);
    setSelectedSubtopic(undefined);

    // Update system prompt with topic information
    if (selectedAssistant) {
      let prompt = selectedAssistant.systemPrompt || '';
      prompt += `\nThe student is asking about the topic: ${topic}.`;
      setSystemPrompt(prompt);
    }

    setMessages([]); // Clear messages when changing topic
  };

  // Handle subtopic change
  const handleSubtopicChange = (subtopic: string) => {
    setSelectedSubtopic(subtopic);

    // Update system prompt with subtopic information
    if (selectedAssistant && selectedTopic) {
      let prompt = selectedAssistant.systemPrompt || '';
      prompt += `\nThe student is asking about the topic: ${selectedTopic}, subtopic: ${subtopic}.`;
      setSystemPrompt(prompt);
    }
  };

  // Handle conversation update
  const handleConversationUpdate = (updatedMessages: any[]) => {
    setMessages(updatedMessages);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[500px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center">
        <AIEducationHeader />
        <div className="flex items-center space-x-4">
          <AIStatusIndicator />
          <AIConfigPanel />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
        {/* Left sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Assistant selector */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-3">Subject Areas</h2>
            <div className="space-y-2">
              {specializedAssistants.map((assistant) => (
                <button
                  key={assistant.id}
                  onClick={() => handleAssistantChange(assistant)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    selectedAssistant?.id === assistant.id
                      ? 'bg-blue-100 text-blue-800'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <span
                      className="w-8 h-8 flex items-center justify-center rounded-full mr-2"
                      style={{ backgroundColor: assistant.color }}
                    >
                      {assistant.icon}
                    </span>
                    <span>{assistant.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Topic selector */}
          {selectedAssistant && (
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-3">Topics</h2>
              <TopicSelector
                topics={selectedAssistant.topics || []}
                selectedTopic={selectedTopic}
                onSelectTopic={handleTopicChange}
              />
            </div>
          )}

          {/* Subtopic selector */}
          {selectedAssistant &&
            selectedTopic &&
            selectedAssistant.subtopics &&
            selectedAssistant.subtopics[selectedTopic] && (
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="text-lg font-semibold mb-3">Subtopics</h2>
                <SubtopicSelector
                  subtopics={selectedAssistant.subtopics[selectedTopic] || []}
                  selectedSubtopic={selectedSubtopic}
                  onSelectSubtopic={handleSubtopicChange}
                />
              </div>
            )}

          {/* Resources */}
          {selectedAssistant && (
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-3">Resources</h2>
              <ResourceList resources={selectedAssistant.resources || []} />
            </div>
          )}
        </div>

        {/* Main chat area */}
        <div className="lg:col-span-3">
          <div className="h-[700px]">
            <ErrorBoundary>
              {selectedAssistant ? (
                <GrokConversation
                  initialSystemPrompt={systemPrompt}
                  initialMessages={messages}
                  onConversationUpdate={handleConversationUpdate}
                  topic={selectedTopic}
                  subtopic={selectedSubtopic}
                />
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center h-full flex items-center justify-center">
                  <p className="text-gray-500">
                    Select a subject to start chatting
                  </p>
                </div>
              )}
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIEducationPage;
