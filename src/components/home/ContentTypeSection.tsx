import React from 'react';
import { Link } from 'react-router-dom';
import { Video, Headphones, BookText, Lightbulb, Smartphone, GamepadIcon } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const ContentTypeSection: React.FC = () => {
  const { setSelectedContentType } = useAppContext();

  const contentTypes = [
    {
      id: 'video',
      name: 'ভিডিও',
      icon: <Video className="h-8 w-8 mb-3 text-red-500" />,
      color: 'bg-red-100 border-red-200',
      hoverColor: 'hover:border-red-500',
      textColor: 'text-red-800',
      description: 'সহজ ভাষায় বিজ্ঞান ভিডিও টিউটোরিয়াল'
    },
    {
      id: 'audio',
      name: 'অডিও',
      icon: <Headphones className="h-8 w-8 mb-3 text-blue-500" />,
      color: 'bg-blue-100 border-blue-200',
      hoverColor: 'hover:border-blue-500',
      textColor: 'text-blue-800',
      description: 'পডকাস্ট এবং অডিও লেসন'
    },
    {
      id: 'blog',
      name: 'আর্টিকেল',
      icon: <BookText className="h-8 w-8 mb-3 text-emerald-500" />,
      color: 'bg-emerald-100 border-emerald-200',
      hoverColor: 'hover:border-emerald-500',
      textColor: 'text-emerald-800',
      description: 'বিজ্ঞান ব্লগ এবং আর্টিকেল'
    },
    {
      id: 'experiment',
      name: 'এক্সপেরিমেন্ট',
      icon: <Lightbulb className="h-8 w-8 mb-3 text-amber-500" />,
      color: 'bg-amber-100 border-amber-200',
      hoverColor: 'hover:border-amber-500',
      textColor: 'text-amber-800',
      description: 'ভার্চুয়াল বিজ্ঞান এক্সপেরিমেন্ট'
    },
    {
      id: 'ebook',
      name: 'ই-বুক',
      icon: <Smartphone className="h-8 w-8 mb-3 text-purple-500" />,
      color: 'bg-purple-100 border-purple-200',
      hoverColor: 'hover:border-purple-500',
      textColor: 'text-purple-800',
      description: 'ইন্টারেক্টিভ বিজ্ঞান বই'
    },
    {
      id: 'quiz',
      name: 'কুইজ',
      icon: <GamepadIcon className="h-8 w-8 mb-3 text-indigo-500" />,
      color: 'bg-indigo-100 border-indigo-200',
      hoverColor: 'hover:border-indigo-500',
      textColor: 'text-indigo-800',
      description: 'মজার বিজ্ঞান কুইজ ও চ্যালেঞ্জ'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">আপনার পছন্দমত শেখার উপায়</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            আমরা সবাই আলাদাভাবে শিখি। আপনার পছন্দের ফরম্যাটে বিজ্ঞান শিখুন - অডিও, ভিডিও, বা ইন্টারেক্টিভ কন্টেন্ট।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contentTypes.map((type) => (
            <Link 
              to="/content" 
              key={type.id}
              className={`${type.color} border-2 ${type.hoverColor} rounded-lg p-6 flex flex-col items-center text-center transition-all hover:shadow-md transform hover:-translate-y-1`}
              onClick={() => setSelectedContentType(type.id as any)}
            >
              <div className="bg-white p-4 rounded-full mb-4">
                {type.icon}
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${type.textColor}`}>{type.name}</h3>
              <p className="text-gray-600">{type.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentTypeSection;
