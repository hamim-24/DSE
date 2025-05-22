import type React from 'react';
import type { CompletedAudio } from '../../types/audioTypes';

interface CertificateViewProps {
  completedAudios: CompletedAudio[];
  totalPoints: number;
  userName?: string;
}

const CertificateView: React.FC<CertificateViewProps> = ({
  completedAudios,
  totalPoints,
  userName = 'শিক্ষার্থী',
}) => {
  const currentDate = new Date().toLocaleDateString('bn-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-3xl mx-auto my-8 p-8 bg-white border-8 border-double border-amber-700 rounded-lg shadow-lg">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-amber-800 mb-2">
          সার্টিফিকেট অফ অ্যাচিভমেন্ট
        </h1>
        <div className="w-32 h-1 bg-amber-600 mx-auto mb-6"></div>

        <p className="text-lg mb-6">এই সার্টিফিকেট প্রদান করা হচ্ছে</p>
        <h2 className="text-2xl font-bold text-amber-900 mb-8">{userName}</h2>

        <p className="mb-6">
          অডিও শিক্ষা প্ল্যাটফর্মে সফলভাবে নিম্নলিখিত কোর্স সমূহ সম্পন্ন করার
          জন্য
        </p>
      </div>

      <div className="my-8">
        <h3 className="text-xl font-semibold mb-4 text-amber-800">
          সম্পন্ন করা কোর্স সমূহ:
        </h3>
        <ul className="list-disc pl-8 space-y-2">
          {completedAudios.length > 0 ? (
            completedAudios.map((audio) => (
              <li key={audio.id} className="text-gray-700">
                <span className="font-medium">{audio.title}</span> -{' '}
                {audio.points} পয়েন্ট
                <span className="text-sm text-gray-500 ml-2">
                  ({new Date(audio.completedAt).toLocaleDateString('bn-BD')})
                </span>
              </li>
            ))
          ) : (
            <li className="text-gray-500">এখনো কোন কোর্স সম্পন্ন করা হয়নি</li>
          )}
        </ul>
      </div>

      <div className="flex justify-between items-center mt-12 pt-6 border-t border-amber-200">
        <div>
          <p className="text-gray-600">তারিখ: {currentDate}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-amber-800">
            মোট অর্জিত পয়েন্ট: {totalPoints}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {totalPoints < 20
              ? 'প্রাথমিক স্তর'
              : totalPoints < 50
              ? 'মধ্যম স্তর'
              : 'উন্নত স্তর'}
          </p>
        </div>
      </div>

      <div className="text-center mt-12">
        <div className="w-48 h-px bg-black mx-auto mb-2"></div>
        <p className="text-gray-700">অধিকর্তার স্বাক্ষর</p>
      </div>
    </div>
  );
};

export default CertificateView;
