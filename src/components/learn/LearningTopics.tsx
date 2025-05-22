import React, { useState } from 'react';
import { Search, Filter, BookOpen } from 'lucide-react';
import { learningContent, ContentFormat, AudienceType } from '../../data/learningContent';

const LearningTopics: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAudience, setSelectedAudience] = useState<AudienceType | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<ContentFormat | null>(null);

  const audienceTypes: { id: AudienceType; label: string }[] = [
    { id: 'child', label: 'শিশু' },
    { id: 'student', label: 'শিক্ষার্থী' },
    { id: 'adult', label: 'প্রাপ্তবয়স্ক' },
    { id: 'elderly', label: 'প্রবীণ' },
    { id: 'women', label: 'নারী' },
    { id: 'teacher', label: 'শিক্ষক' },
    { id: 'all', label: 'সকলের জন্য' }
  ];

  const contentFormats: { id: ContentFormat; label: string }[] = [
    { id: 'video', label: 'ভিডিও' },
    { id: 'audio', label: 'অডিও' },
    { id: 'blog', label: 'ব্লগ' },
    { id: 'comic', label: 'কমিক' },
    { id: 'animation', label: 'অ্যানিমেশন' },
    { id: 'quiz', label: 'কুইজ' },
    { id: 'podcast', label: 'পডকাস্ট' },
    { id: 'interactive', label: 'ইন্টারেক্টিভ' }
  ];

  const filteredContent = learningContent
    .map(category => ({
      ...category,
      topics: category.topics.filter(topic => {
        const matchesSearch = searchQuery === '' || 
          topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory = !selectedCategory || category.id === selectedCategory;
        
        const matchesAudience = !selectedAudience || 
          topic.targetAudience.includes(selectedAudience) ||
          topic.targetAudience.includes('all');
        
        const matchesFormat = !selectedFormat || 
          topic.contentFormats.includes(selectedFormat);
        
        return matchesSearch && matchesCategory && matchesAudience && matchesFormat;
      })
    }))
    .filter(category => category.topics.length > 0);

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">শিক্ষণীয় বিষয়সমূহ</h2>
          <p className="text-gray-600">
            আপনার পছন্দ ও প্রয়োজন অনুযায়ী বিষয় বেছে নিন
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="বিষয় খুঁজুন..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>

            {/* Category Filter */}
            <div>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
              >
                <option value="">সব ক্যাটাগরি</option>
                {learningContent.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Audience Filter */}
            <div>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={selectedAudience || ''}
                onChange={(e) => setSelectedAudience((e.target.value || null) as AudienceType)}
              >
                <option value="">সব ধরনের শ্রোতা</option>
                {audienceTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Format Filter */}
            <div>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={selectedFormat || ''}
                onChange={(e) => setSelectedFormat((e.target.value || null) as ContentFormat)}
              >
                <option value="">সব ধরনের কনটেন্ট</option>
                {contentFormats.map(format => (
                  <option key={format.id} value={format.id}>
                    {format.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Content Categories */}
        {filteredContent.length > 0 ? (
          <div className="space-y-8">
            {filteredContent.map(category => (
              <div key={category.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                  {category.topics.map(topic => (
                    <div key={topic.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                      <h4 className="font-semibold mb-2">{topic.title}</h4>
                      <p className="text-sm text-gray-600 mb-4">{topic.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {topic.contentFormats.map(format => (
                          <span 
                            key={format}
                            className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-md"
                          >
                            {contentFormats.find(f => f.id === format)?.label}
                          </span>
                        ))}
                      </div>
                      
                      <button className="mt-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium inline-flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        বিস্তারিত দেখুন
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-100 inline-block p-5 rounded-full mb-4">
              <Filter className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">কোন বিষয় পাওয়া যায়নি</h3>
            <p className="text-gray-600 mb-6">অনুগ্রহ করে আপনার ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন</p>
            <button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
                setSelectedAudience(null);
                setSelectedFormat(null);
              }}
            >
              সব ফিল্টার রিসেট করুন
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningTopics;