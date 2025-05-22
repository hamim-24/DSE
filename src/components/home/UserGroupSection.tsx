import React from 'react';
import { Link } from 'react-router-dom';
import { Baby, GraduationCap, Briefcase, Heart, Users, School } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const UserGroupSection: React.FC = () => {
  const { setSelectedUserGroup } = useAppContext();

  const userGroups = [
    { 
      id: 'child', 
      name: 'শিশু', 
      icon: <Baby className="h-10 w-10 mb-4 text-indigo-500 group-hover:text-white transition-colors" />,
      bg: 'from-indigo-50 to-indigo-100',
      hoverBg: 'hover:bg-indigo-600',
      description: '৩-১২ বছ��� বয়সী শিশুদের জন্য আকর্ষণীয় বিজ্ঞান শিক্ষা'
    },
    { 
      id: 'student', 
      name: 'শিক্ষার্থী', 
      icon: <GraduationCap className="h-10 w-10 mb-4 text-purple-500 group-hover:text-white transition-colors" />,
      bg: 'from-purple-50 to-purple-100',
      hoverBg: 'hover:bg-purple-600',
      description: 'স্কুল, কলেজ ও বিশ্ববিদ্যালয় শিক্ষার্থীদের জন্য বিশেষ কন্টেন্ট'
    },
    { 
      id: 'professional', 
      name: 'পেশাজীবী', 
      icon: <Briefcase className="h-10 w-10 mb-4 text-blue-500 group-hover:text-white transition-colors" />,
      bg: 'from-blue-50 to-blue-100',
      hoverBg: 'hover:bg-blue-600',
      description: 'ব্যস্ত পেশাজীবীদের জন্য সংক্ষিপ্ত ও কার্যকরী বিজ্ঞান তথ্য'
    },
    { 
      id: 'woman', 
      name: 'নারী', 
      icon: <Heart className="h-10 w-10 mb-4 text-pink-500 group-hover:text-white transition-colors" />,
      bg: 'from-pink-50 to-pink-100',
      hoverBg: 'hover:bg-pink-600',
      description: 'গ্রামীণ ও শহুরে নারীদের জন্য বিশেষ বিজ্ঞান শিক্ষা মডিউল'
    },
    { 
      id: 'elderly', 
      name: 'প্রবীণ', 
      icon: <Users className="h-10 w-10 mb-4 text-amber-500 group-hover:text-white transition-colors" />,
      bg: 'from-amber-50 to-amber-100',
      hoverBg: 'hover:bg-amber-600',
      description: 'সহজ ভাষায় অডিও-ভিজ্যুয়াল বিজ্ঞান শিক্ষা'
    },
    { 
      id: 'teacher', 
      name: 'শিক্ষক', 
      icon: <School className="h-10 w-10 mb-4 text-emerald-500 group-hover:text-white transition-colors" />,
      bg: 'from-emerald-50 to-emerald-100',
      hoverBg: 'hover:bg-emerald-600',
      description: 'শিক্ষকদের জন্য পাঠদান সহায়িকা এবং রিসোর্স'
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">আমরা সবার জন্য</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            আপনার বয়স, পেশা, শিক্ষাগত যোগ্যতা যাই হোক না কেন, আমাদের প্লাটফর্মে আপনার জন্য উপযুক্ত বিজ্ঞান শিক্ষা আছে।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userGroups.map((group) => (
            <Link 
              to="/content" 
              key={group.id}
              className={`bg-gradient-to-br ${group.bg} p-6 rounded-xl shadow-sm group ${group.hoverBg} hover:text-white transform hover:-translate-y-1 transition-all duration-300`}
              onClick={() => setSelectedUserGroup(group.id as any)}
            >
              <div className="text-center">
                {group.icon}
                <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors">{group.name}</h3>
                <p className="text-gray-600 group-hover:text-indigo-100 transition-colors">{group.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserGroupSection;
