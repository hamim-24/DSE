import type React from 'react';
import type { Resource } from '../../types/aiEducationTypes';

interface ResourceListProps {
  resources: Resource[];
}

const ResourceList: React.FC<ResourceListProps> = ({ resources }) => {
  if (resources.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">
        সম্পর্কিত সংস্থান
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {resources.map((resource) => (
          <a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex p-3 bg-white border border-gray-200 rounded-md hover:border-indigo-300 transition-colors"
          >
            <div>
              <h4 className="font-medium text-indigo-700 mb-1">
                {resource.title}
              </h4>
              <p className="text-sm text-gray-600">{resource.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ResourceList;
