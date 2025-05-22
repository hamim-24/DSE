import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Eye, Video, Headphones, BookOpen } from 'lucide-react';

const FeaturedContent: React.FC = () => {
  const featuredContent = [
    {
      id: 1,
      title: "মহাকাশ থেকে পৃথিবী: কীভাবে গ্রহটি দেখায়",
      category: "astronomy",
      type: "video",
      duration: "8 মিনিট",
      views: "2.5K",
      thumbnail: "https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      typeIcon: <Video className="h-4 w-4" />,
      typeColor: "bg-red-500"
    },
    {
      id: 2,
      title: "জলবায়ু পরিবর্তন - আমরা সবাই কী করতে পারি?",
      category: "environment",
      type: "audio",
      duration: "22 মিনিট",
      views: "1.3K",
      thumbnail: "https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      typeIcon: <Headphones className="h-4 w-4" />,
      typeColor: "bg-blue-500"
    },
    {
      id: 3,
      title: "আমাদের শরীরে রোগ প্রতিরোধ ব্যবস্থা কীভাবে কাজ করে",
      category: "biology",
      type: "article",
      duration: "10 মিনিট পড়া",
      views: "3.2K",
      thumbnail: "https://images.pexels.com/photos/4226119/pexels-photo-4226119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      typeIcon: <BookOpen className="h-4 w-4" />,
      typeColor: "bg-emerald-500"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">জনপ্রিয় কন্টেন্ট</h2>
          <Link to="/content" className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
            সব দেখুন
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredContent.map((content) => (
            <div key={content.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={content.thumbnail} 
                  alt={content.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 px-2 py-1 rounded text-xs font-medium bg-white/80 backdrop-blur-sm">
                  {content.category}
                </div>
                <div className={`absolute top-3 right-3 p-1.5 rounded-full text-white ${content.typeColor}`}>
                  {content.typeIcon}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  {content.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500 mt-3">
                  <div className="flex items-center mr-4">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{content.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    <span>{content.views} বার দেখা হয়েছে</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedContent;