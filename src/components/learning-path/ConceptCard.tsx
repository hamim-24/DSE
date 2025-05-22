import type React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Circle, Clock, ArrowRight } from 'lucide-react';
import type { Concept, UserProgress } from '../../types/learningPathTypes';

interface ConceptCardProps {
  concept: Concept;
  subjectId: string;
  topicId: string;
  progress?: UserProgress;
  index: number;
}

const ConceptCard: React.FC<ConceptCardProps> = ({
  concept,
  subjectId,
  topicId,
  progress,
  index,
}) => {
  const isCompleted = progress?.completed || false;

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border p-4 transition-all ${
        isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200'
      }`}
    >
      <div className="flex items-start">
        <div className="mr-3 mt-1">
          {isCompleted ? (
            <CheckCircle className="h-6 w-6 text-green-500" />
          ) : (
            <Circle className="h-6 w-6 text-gray-300" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-800">
                {index + 1}. {concept.name}
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                {concept.description}
              </p>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>{concept.estimatedMinutes} মিনিট</span>
            </div>
          </div>

          <div className="mt-4">
            <Link
              to={`/learning-path/${subjectId}/concept/${topicId}-${concept.orderIndex}`}
              className={`inline-flex items-center px-3 py-1.5 text-sm rounded-md ${
                isCompleted
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
              }`}
            >
              {isCompleted ? 'পুনরায় দেখুন' : 'শুরু করুন'}
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptCard;
