import type React from 'react';
import type { Course } from '../../types/Course';
import { Link } from 'react-router-dom';
import DownloadButton from '../offline/DownloadButton';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        className="w-full h-48 object-cover"
        src={course.thumbnail || '/placeholder.svg'}
        alt={course.title}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
        <p className="text-gray-600 text-sm">{course.description}</p>
      </div>
      <div className="flex items-center mt-4 justify-between px-4">
        <div className="flex items-center space-x-1">
          <DownloadButton content={course} iconOnly={true} />
          <Link
            to={`/courses/${course.id}`}
            className="text-blue-500 hover:text-blue-700"
          >
            Learn More
          </Link>
        </div>
        <span className="text-gray-500">{course.lessons.length} Lessons</span>
      </div>
    </div>
  );
};

export default CourseCard;
