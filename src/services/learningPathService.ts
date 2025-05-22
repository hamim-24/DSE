import { supabase, getCurrentUserId } from '../utils/supabaseClient';
import { generateId } from '../utils/idUtils';
import { subjects } from '../data/subjectsData';
import type {
  Subject,
  Topic,
  Concept,
  Question,
  LearningPath,
  UserProgress,
  LearningStyle,
  AIResponse,
  UserInteraction,
} from '../types/learningPathTypes';
import { grokAIService } from './GrokAIService';

// Get all available subjects
export const getSubjects = async (): Promise<Subject[]> => {
  try {
    const { data, error } = await supabase.from('subjects').select('*');

    if (error) {
      console.error('Error fetching subjects:', error);
      return subjects; // Fallback to local data
    }

    return data.length > 0 ? (data as Subject[]) : subjects;
  } catch (error) {
    console.error('Error fetching subjects:', error);
    return subjects; // Fallback to local data
  }
};

// Get a specific subject by ID
export const getSubjectById = async (
  subjectId: string
): Promise<Subject | undefined> => {
  try {
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .eq('id', subjectId)
      .single();

    if (error) {
      console.error(`Error fetching subject ${subjectId}:`, error);
      // Fallback to local data
      return subjects.find((subject) => subject.id === subjectId);
    }

    return data as Subject;
  } catch (error) {
    console.error(`Error fetching subject ${subjectId}:`, error);
    // Fallback to local data
    return subjects.find((subject) => subject.id === subjectId);
  }
};

// Get topics for a subject
export const getTopicsForSubject = async (
  subjectId: string
): Promise<Topic[]> => {
  try {
    const { data, error } = await supabase
      .from('topics')
      .select('*')
      .eq('subject_id', subjectId)
      .order('order_index');

    if (error) {
      console.error(`Error fetching topics for subject ${subjectId}:`, error);
      // Fallback to local data
      const subject = subjects.find((s) => s.id === subjectId);
      return subject?.topics || [];
    }

    return data as Topic[];
  } catch (error) {
    console.error(`Error fetching topics for subject ${subjectId}:`, error);
    // Fallback to local data
    const subject = subjects.find((s) => s.id === subjectId);
    return subject?.topics || [];
  }
};

// Get a specific topic by ID
export const getTopicById = async (
  topicId: string
): Promise<Topic | undefined> => {
  try {
    const { data, error } = await supabase
      .from('topics')
      .select('*')
      .eq('id', topicId)
      .single();

    if (error) {
      console.error(`Error fetching topic ${topicId}:`, error);
      // Fallback to local data
      for (const subject of subjects) {
        const topic = subject.topics.find((t) => t.id === topicId);
        if (topic) return topic;
      }
      return undefined;
    }

    return data as Topic;
  } catch (error) {
    console.error(`Error fetching topic ${topicId}:`, error);
    // Fallback to local data
    for (const subject of subjects) {
      const topic = subject.topics.find((t) => t.id === topicId);
      if (topic) return topic;
    }
    return undefined;
  }
};

// Get concepts for a topic
export const getConceptsForTopic = async (
  topicId: string
): Promise<Concept[]> => {
  try {
    const { data, error } = await supabase
      .from('concepts')
      .select('*')
      .eq('topic_id', topicId)
      .order('order_index');

    if (error) {
      console.error(`Error fetching concepts for topic ${topicId}:`, error);
      // Fallback to local data
      for (const subject of subjects) {
        const topic = subject.topics.find((t) => t.id === topicId);
        if (topic) return topic.concepts;
      }
      return [];
    }

    return data as Concept[];
  } catch (error) {
    console.error(`Error fetching concepts for topic ${topicId}:`, error);
    // Fallback to local data
    for (const subject of subjects) {
      const topic = subject.topics.find((t) => t.id === topicId);
      if (topic) return topic.concepts;
    }
    return [];
  }
};

// Get a specific concept by ID
export const getConceptById = async (
  conceptId: string
): Promise<Concept | undefined> => {
  try {
    const { data, error } = await supabase
      .from('concepts')
      .select('*')
      .eq('id', conceptId)
      .single();

    if (error) {
      console.error(`Error fetching concept ${conceptId}:`, error);
      // Fallback to local data
      for (const subject of subjects) {
        for (const topic of subject.topics) {
          const concept = topic.concepts.find((c) => c.id === conceptId);
          if (concept) return concept;
        }
      }
      return undefined;
    }

    return data as Concept;
  } catch (error) {
    console.error(`Error fetching concept ${conceptId}:`, error);
    // Fallback to local data
    for (const subject of subjects) {
      for (const topic of subject.topics) {
        const concept = topic.concepts.find((c) => c.id === conceptId);
        if (concept) return concept;
      }
    }
    return undefined;
  }
};

// Create a new learning path for a user
export const createLearningPath = async (
  subjectId: string,
  name?: string
): Promise<LearningPath> => {
  try {
    const userId = await getCurrentUserId();
    const subject = await getSubjectById(subjectId);

    if (!subject) {
      throw new Error(`Subject with ID ${subjectId} not found`);
    }

    const topics = await getTopicsForSubject(subjectId);

    const pathTopics = topics.map((topic, index) => ({
      topicId: topic.id,
      orderIndex: topic.orderIndex || index + 1,
      status: 'not-started' as const,
    }));

    // Sort topics by their order
    pathTopics.sort((a, b) => a.orderIndex - b.orderIndex);

    const firstTopicId =
      pathTopics.length > 0 ? pathTopics[0].topicId : undefined;
    const firstTopic = topics.find((t) => t.id === firstTopicId);

    let firstConceptId: string | undefined = undefined;

    if (firstTopic) {
      const concepts = await getConceptsForTopic(firstTopic.id);
      firstConceptId = concepts.length > 0 ? concepts[0].id : undefined;
    }

    const learningPath: LearningPath = {
      id: generateId(),
      userId,
      subjectId,
      name: name || `${subject.name} Learning Path`,
      description: `Personalized learning path for ${subject.name}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      topics: pathTopics,
      currentTopicId: firstTopicId,
      currentConceptId: firstConceptId,
      completionPercentage: 0,
      estimatedRemainingHours: subject.estimatedHours,
    };

    // Save to Supabase
    const { data, error } = await supabase
      .from('learning_paths')
      .insert({
        id: learningPath.id,
        user_id: learningPath.userId,
        subject_id: learningPath.subjectId,
        name: learningPath.name,
        description: learningPath.description,
        current_topic_id: learningPath.currentTopicId,
        current_concept_id: learningPath.currentConceptId,
        completion_percentage: learningPath.completionPercentage,
        estimated_remaining_hours: learningPath.estimatedRemainingHours,
        created_at: learningPath.createdAt.toISOString(),
        updated_at: learningPath.updatedAt.toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating learning path:', error);
      // Continue with the local object if database save fails
    } else {
      console.log('Learning path created successfully:', data);
    }

    return learningPath;
  } catch (error) {
    console.error('Error in createLearningPath:', error);
    throw error;
  }
};

// Get user's learning style
export const getUserLearningStyle = async (
  userId: string
): Promise<LearningStyle> => {
  try {
    const { data, error } = await supabase
      .from('user_learning_styles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error(`Error fetching learning style for user ${userId}:`, error);
      // Return default learning style
      return {
        userId,
        visualScore: 7,
        auditoryScore: 5,
        readingScore: 8,
        kinestheticScore: 6,
        preferredPace: 'moderate',
        preferredExampleTypes: ['real-world', 'practical'],
        preferredQuestionTypes: ['open-ended', 'multiple-choice'],
      };
    }

    return {
      userId: data.user_id,
      visualScore: data.visual_score,
      auditoryScore: data.auditory_score,
      readingScore: data.reading_score,
      kinestheticScore: data.kinesthetic_score,
      preferredPace: data.preferred_pace,
      preferredExampleTypes: ['real-world', 'practical'], // This would come from a junction table in a real implementation
      preferredQuestionTypes: ['open-ended', 'multiple-choice'], // This would come from a junction table in a real implementation
    };
  } catch (error) {
    console.error(`Error in getUserLearningStyle for user ${userId}:`, error);
    // Return default learning style
    return {
      userId,
      visualScore: 7,
      auditoryScore: 5,
      readingScore: 8,
      kinestheticScore: 6,
      preferredPace: 'moderate',
      preferredExampleTypes: ['real-world', 'practical'],
      preferredQuestionTypes: ['open-ended', 'multiple-choice'],
    };
  }
};

// Update user's learning style based on interactions
export const updateLearningStyle = async (
  userId: string,
  interactions: UserInteraction[]
): Promise<LearningStyle> => {
  try {
    const currentStyle = await getUserLearningStyle(userId);

    // Analyze interactions to update learning style
    // This is a simplified implementation
    let visualScore = currentStyle.visualScore;
    const auditoryScore = currentStyle.auditoryScore;
    const readingScore = currentStyle.readingScore;
    const kinestheticScore = currentStyle.kinestheticScore;

    interactions.forEach((interaction) => {
      // Example: If user spends more time on visual content, increase visual score
      if (
        interaction.content.includes('diagram') ||
        interaction.content.includes('image')
      ) {
        visualScore = Math.min(10, visualScore + 0.1);
      }

      // More sophisticated analysis would be implemented here
    });

    const updatedStyle: LearningStyle = {
      ...currentStyle,
      visualScore,
      auditoryScore,
      readingScore,
      kinestheticScore,
    };

    // Update in Supabase
    const { error } = await supabase.from('user_learning_styles').upsert({
      user_id: updatedStyle.userId,
      visual_score: updatedStyle.visualScore,
      auditory_score: updatedStyle.auditoryScore,
      reading_score: updatedStyle.readingScore,
      kinesthetic_score: updatedStyle.kinestheticScore,
      preferred_pace: updatedStyle.preferredPace,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Error updating learning style:', error);
    }

    return updatedStyle;
  } catch (error) {
    console.error(`Error in updateLearningStyle for user ${userId}:`, error);
    throw error;
  }
};

// Get personalized AI response for a concept
export const getPersonalizedExplanation = async (
  conceptId: string,
  userQuestion?: string
): Promise<AIResponse> => {
  try {
    const userId = await getCurrentUserId();
    const concept = await getConceptById(conceptId);
    const learningStyle = await getUserLearningStyle(userId);

    if (!concept) {
      throw new Error(`Concept with ID ${conceptId} not found`);
    }

    // Create a prompt for the AI based on the concept and learning style
    let prompt = `Explain the concept of ${concept.name} in ${concept.description}. `;

    // Personalize based on learning style
    if (learningStyle.visualScore > 7) {
      prompt += 'Include visual descriptions and imagery in your explanation. ';
    }

    if (learningStyle.auditoryScore > 7) {
      prompt +=
        'Use analogies and explanations that would work well in spoken form. ';
    }

    if (learningStyle.readingScore > 7) {
      prompt += 'Provide detailed textual explanations with clear structure. ';
    }

    if (learningStyle.kinestheticScore > 7) {
      prompt += 'Include practical, hands-on examples and activities. ';
    }

    // Add pace preference
    prompt += `Explain at a ${learningStyle.preferredPace} pace. `;

    // Add example type preferences
    if (learningStyle.preferredExampleTypes.includes('real-world')) {
      prompt += 'Use real-world examples. ';
    }

    if (learningStyle.preferredExampleTypes.includes('practical')) {
      prompt += 'Focus on practical applications. ';
    }

    // Add the user's question if provided
    if (userQuestion) {
      prompt += `The student has asked: "${userQuestion}". `;
    }

    // Add instructions for the AI response format
    prompt += `
    
    Please structure your response as follows:
    1. A clear explanation of the concept
    2. ${learningStyle.preferredExampleTypes.join(' and ')} examples
    3. A check for understanding
    4. 3-5 follow-up questions to deepen understanding
    
    Also suggest 2-3 related concepts that might be interesting to explore next.`;

    try {
      // Use the Grok AI service to get a response
      const grokResponse = await grokAIService.getGrokResponse(
        prompt,
        `${concept.name} explanation`
      );

      // Parse the response to extract follow-up questions and resources
      const followUpQuestions = grokResponse.suggestedQuestions || [];

      // Check if the response indicates confusion
      const confusionDetected =
        grokResponse.text.toLowerCase().includes('confused') ||
        grokResponse.text.toLowerCase().includes('difficult to understand');

      // Determine recommended approach based on content
      let recommendedApproach:
        | 'visual'
        | 'auditory'
        | 'reading'
        | 'kinesthetic'
        | undefined;

      if (
        grokResponse.text.includes('diagram') ||
        grokResponse.text.includes('visualize')
      ) {
        recommendedApproach = 'visual';
      } else if (
        grokResponse.text.includes('listen') ||
        grokResponse.text.includes('hear')
      ) {
        recommendedApproach = 'auditory';
      } else if (
        grokResponse.text.includes('read') ||
        grokResponse.text.includes('article')
      ) {
        recommendedApproach = 'reading';
      } else if (
        grokResponse.text.includes('practice') ||
        grokResponse.text.includes('try')
      ) {
        recommendedApproach = 'kinesthetic';
      }

      // Record this interaction
      await recordUserInteraction({
        id: generateId(),
        userId,
        conceptId,
        type: userQuestion ? 'question' : 'view',
        content: userQuestion || `Viewed concept: ${concept.name}`,
        timestamp: new Date(),
        durationSeconds: 0,
        confusionExpressed: false,
        aiResponse: grokResponse.text,
      });

      return {
        text: grokResponse.text,
        followUpQuestions,
        resources: grokResponse.resources || [],
        confusionDetected,
        recommendedApproach,
      };
    } catch (error) {
      console.error('Error getting AI response:', error);

      // Fallback response if AI fails
      return {
        text: `Here's an explanation of ${concept.name}: ${concept.content}`,
        followUpQuestions: concept.questions?.map((q) => q.text) || [
          `What is the main idea behind ${concept.name}?`,
          `How does ${concept.name} relate to other concepts?`,
          `Can you provide an example of ${concept.name}?`,
        ],
        resources: [],
        confusionDetected: false,
      };
    }
  } catch (error) {
    console.error(
      `Error in getPersonalizedExplanation for concept ${conceptId}:`,
      error
    );
    throw error;
  }
};

// Get user progress for a learning path
export const getUserProgress = async (
  subjectId: string
): Promise<UserProgress[]> => {
  try {
    const userId = await getCurrentUserId();

    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('subject_id', subjectId);

    if (error) {
      console.error(
        `Error fetching user progress for subject ${subjectId}:`,
        error
      );
      return []; // Return empty array if there's an error
    }

    return data.map((item) => ({
      userId: item.user_id,
      subjectId: item.subject_id,
      topicId: item.topic_id,
      conceptId: item.concept_id,
      completed: item.completed,
      score: item.score,
      timeSpentMinutes: item.time_spent_minutes,
      lastAccessedAt: new Date(item.last_accessed_at),
      questionsAnswered: item.questions_answered,
      questionsCorrect: item.questions_correct,
    }));
  } catch (error) {
    console.error(`Error in getUserProgress for subject ${subjectId}:`, error);
    return []; // Return empty array if there's an error
  }
};

// Update user progress after completing a concept
export const updateUserProgress = async (
  topicId: string,
  conceptId: string,
  completed: boolean,
  score?: number
): Promise<UserProgress> => {
  try {
    const userId = await getCurrentUserId();
    const topic = await getTopicById(topicId);

    if (!topic) {
      throw new Error(`Topic with ID ${topicId} not found`);
    }

    const subjectId = topic.subjectId;

    const progress: UserProgress = {
      userId,
      subjectId,
      topicId,
      conceptId,
      completed,
      score: score || 0,
      timeSpentMinutes: 30, // Example value
      lastAccessedAt: new Date(),
      questionsAnswered: 5, // Example value
      questionsCorrect: score ? Math.floor((score / 100) * 5) : 0, // Example calculation
    };

    // Update in Supabase
    const { error } = await supabase.from('user_progress').upsert({
      user_id: progress.userId,
      subject_id: progress.subjectId,
      topic_id: progress.topicId,
      concept_id: progress.conceptId,
      completed: progress.completed,
      score: progress.score,
      time_spent_minutes: progress.timeSpentMinutes,
      last_accessed_at: progress.lastAccessedAt.toISOString(),
      questions_answered: progress.questionsAnswered,
      questions_correct: progress.questionsCorrect,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Error updating user progress:', error);
    }

    return progress;
  } catch (error) {
    console.error(
      `Error in updateUserProgress for concept ${conceptId}:`,
      error
    );
    throw error;
  }
};

// Record a user interaction with the learning path
export const recordUserInteraction = async (interaction: {
  id: string;
  userId: string;
  pathId?: string;
  topicId?: string;
  conceptId?: string;
  questionId?: string;
  type: 'view' | 'question' | 'answer' | 'feedback' | 'resource-access';
  content: string;
  timestamp: Date;
  durationSeconds: number;
  confusionExpressed?: boolean;
  aiResponse?: string;
}): Promise<void> => {
  try {
    // Insert into Supabase
    const { error } = await supabase.from('user_interactions').insert({
      id: interaction.id,
      user_id: interaction.userId,
      path_id: interaction.pathId,
      topic_id: interaction.topicId,
      concept_id: interaction.conceptId,
      question_id: interaction.questionId,
      type: interaction.type,
      content: interaction.content,
      timestamp: interaction.timestamp.toISOString(),
      duration_seconds: interaction.durationSeconds,
      confusion_expressed: interaction.confusionExpressed || false,
      ai_response: interaction.aiResponse,
    });

    if (error) {
      console.error('Error recording user interaction:', error);
    }
  } catch (error) {
    console.error('Error in recordUserInteraction:', error);
  }
};

// Generate a question about a concept
export const generateQuestionForConcept = async (
  conceptId: string,
  difficulty: 'easy' | 'medium' | 'hard' = 'medium'
): Promise<Question> => {
  try {
    const concept = await getConceptById(conceptId);

    if (!concept) {
      throw new Error(`Concept with ID ${conceptId} not found`);
    }

    // Create a prompt for the AI to generate a question
    const prompt = `Generate a ${difficulty} level question about ${concept.name} in ${concept.description}. 
    The question should test understanding of the concept and encourage critical thinking.
    
    Please format your response as follows:
    1. The question text
    2. A detailed explanation of the answer
    3. 3 follow-up questions that build on this question`;

    try {
      // Use the Grok AI service to generate a question
      const grokResponse = await grokAIService.getGrokResponse(
        prompt,
        `${concept.name} question`
      );

      // Extract the question, explanation, and follow-up questions
      const lines = grokResponse.text.split('\n').filter((line) => line.trim());

      let questionText = '';
      let explanation = '';
      let followUpQuestions: string[] = [];

      // Simple parsing of the response
      if (lines.length > 0) {
        questionText = lines[0].replace(/^\d+\.\s*/, '');

        // Find explanation section
        const explanationStart = lines.findIndex(
          (line) =>
            line.toLowerCase().includes('explanation') ||
            line.toLowerCase().includes('answer')
        );

        if (explanationStart > 0 && explanationStart < lines.length - 1) {
          explanation = lines[explanationStart + 1];
        }

        // Find follow-up questions
        const followUpStart = lines.findIndex(
          (line) =>
            line.toLowerCase().includes('follow-up') ||
            line.toLowerCase().includes('follow up')
        );

        if (followUpStart > 0 && followUpStart < lines.length - 1) {
          for (let i = followUpStart + 1; i < lines.length; i++) {
            if (lines[i].trim() && !lines[i].toLowerCase().includes('follow')) {
              followUpQuestions.push(lines[i].replace(/^\d+\.\s*/, ''));
            }
          }
        }
      }

      // Use suggested questions if we couldn't parse them from the text
      if (followUpQuestions.length === 0 && grokResponse.suggestedQuestions) {
        followUpQuestions = grokResponse.suggestedQuestions;
      }

      const questionId = generateId();

      // Save the generated question to Supabase
      const { error } = await supabase.from('questions').insert({
        id: questionId,
        concept_id: conceptId,
        text:
          questionText ||
          `Explain the concept of ${concept.name} in your own words.`,
        type: 'open-ended',
        explanation:
          explanation ||
          'This is an open-ended question to test your understanding.',
        difficulty,
      });

      if (error) {
        console.error('Error saving generated question:', error);
      } else {
        // Save follow-up questions
        for (let i = 0; i < followUpQuestions.length; i++) {
          await supabase.from('follow_up_questions').insert({
            question_id: questionId,
            text: followUpQuestions[i],
            order_index: i + 1,
          });
        }
      }

      return {
        id: questionId,
        text:
          questionText ||
          `Explain the concept of ${concept.name} in your own words.`,
        type: 'open-ended',
        explanation:
          explanation ||
          'This is an open-ended question to test your understanding.',
        followUpQuestions:
          followUpQuestions.length > 0
            ? followUpQuestions
            : [
                `How does ${concept.name} relate to other concepts in this topic?`,
                `Can you provide a real-world example of ${concept.name}?`,
                `What would happen if we changed a key aspect of ${concept.name}?`,
              ],
        difficulty,
      };
    } catch (error) {
      console.error('Error generating question:', error);

      // Fallback question if AI fails
      return {
        id: generateId(),
        text: `Explain the concept of ${concept.name} in your own words.`,
        type: 'open-ended',
        explanation:
          'This is an open-ended question to test your understanding.',
        followUpQuestions: [
          `How does ${concept.name} relate to other concepts in this topic?`,
          `Can you provide a real-world example of ${concept.name}?`,
          `What would happen if we changed a key aspect of ${concept.name}?`,
        ],
        difficulty,
      };
    }
  } catch (error) {
    console.error(
      `Error in generateQuestionForConcept for concept ${conceptId}:`,
      error
    );
    throw error;
  }
};

// Test function to verify Supabase connection
export const testSupabaseConnection = async (): Promise<{
  success: boolean;
  message: string;
  data?: any;
}> => {
  try {
    // Try to query the subjects table
    const { data, error } = await supabase
      .from('subjects')
      .select('id, name')
      .limit(5);

    if (error) {
      return {
        success: false,
        message: `Connection failed: ${error.message}`,
      };
    }

    return {
      success: true,
      message: 'Successfully connected to Supabase',
      data,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      message: `Connection test failed: ${errorMessage}`,
    };
  }
};
