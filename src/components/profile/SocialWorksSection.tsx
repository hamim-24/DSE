'use client';

import type React from 'react';
import { useState } from 'react';
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  AlertCircle,
  CalendarClock,
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

type SocialWorkType =
  | 'teaching'
  | 'community'
  | 'environmental'
  | 'health'
  | 'other';

interface SocialWorkFormData {
  title: string;
  description: string;
  type: SocialWorkType;
  location: string;
  hours: number;
  date: Date;
  status: 'completed' | 'ongoing' | 'upcoming';
  participants?: number;
  impactedPeople?: number;
}

const SocialWorksSection: React.FC = () => {
  const {
    socialWorks,
    addSocialWork,
    updateSocialWork,
    deleteSocialWork,
    communityServiceHours,
  } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<SocialWorkFormData>({
    title: '',
    description: '',
    type: 'teaching',
    location: '',
    hours: 1,
    date: new Date(),
    status: 'upcoming',
    participants: undefined,
    impactedPeople: undefined,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'hours' || name === 'participants' || name === 'impactedPeople'
          ? Number.parseInt(value) || 0
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId !== null) {
      const success = await updateSocialWork(editingId, formData);
      if (success) {
        setEditingId(null);
        setShowForm(false);
        resetForm();
      }
    } else {
      const result = await addSocialWork({
        ...formData,
        date: new Date(formData.date),
      });

      if (result.success) {
        setShowForm(false);
        resetForm();
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: 'teaching',
      location: '',
      hours: 1,
      date: new Date(),
      status: 'upcoming',
      participants: undefined,
      impactedPeople: undefined,
    });
  };

  const handleEdit = (id: number) => {
    const work = socialWorks.find((w) => w.id === id);
    if (work) {
      setFormData({
        title: work.title,
        description: work.description,
        type: work.type,
        location: work.location,
        hours: work.hours,
        date: work.date,
        status: work.status,
        participants: work.participants,
        impactedPeople: work.impactedPeople,
      });
      setEditingId(id);
      setShowForm(true);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('আপনি কি নিশ্চিত যে আপনি এই সামাজিক কাজটি মুছতে চান?')) {
      deleteSocialWork(id);
    }
  };

  const getTypeLabel = (type: SocialWorkType) => {
    switch (type) {
      case 'teaching':
        return 'শিক্ষাদান';
      case 'community':
        return 'সম্প্রদায় সেবা';
      case 'environmental':
        return 'পরিবেশ সংরক্ষণ';
      case 'health':
        return 'স্বাস্থ্য সেবা';
      case 'other':
        return 'অন্যান্য';
    }
  };

  const getTypeColor = (type: SocialWorkType) => {
    switch (type) {
      case 'teaching':
        return 'bg-blue-100 text-blue-800';
      case 'community':
        return 'bg-purple-100 text-purple-800';
      case 'environmental':
        return 'bg-green-100 text-green-800';
      case 'health':
        return 'bg-red-100 text-red-800';
      case 'other':
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'ongoing':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'upcoming':
        return <CalendarClock className="h-5 w-5 text-amber-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'সম্পন্ন';
      case 'ongoing':
        return 'চলমান';
      case 'upcoming':
        return 'আসন্ন';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold flex items-center">
          <Users className="h-5 w-5 mr-2 text-indigo-600" />
          সামাজিক কাজ
        </h3>
        <div className="flex items-center space-x-4">
          <div className="text-sm bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
            মোট সেবা: {communityServiceHours} ঘন্টা
          </div>
          <button
            onClick={() => {
              setEditingId(null);
              resetForm();
              setShowForm(!showForm);
            }}
            className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            {showForm ? (
              'বাতিল করুন'
            ) : (
              <>
                <Plus className="h-4 w-4 mr-1" /> নতুন যোগ করুন
              </>
            )}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-4">
            {editingId !== null
              ? 'সামাজিক কাজ সম্পাদনা করুন'
              : 'নতুন সামাজিক কাজ যোগ করুন'}
          </h4>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  শিরোনাম
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ধরন
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="teaching">শিক্ষাদান</option>
                  <option value="community">সম্প্রদায় সেবা</option>
                  <option value="environmental">পরিবেশ সংরক্ষণ</option>
                  <option value="health">স্বাস্থ্য সেবা</option>
                  <option value="other">অন্যান্য</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  অবস্থান
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  তারিখ
                </label>
                <input
                  type="date"
                  name="date"
                  value={
                    formData.date instanceof Date
                      ? formData.date.toISOString().split('T')[0]
                      : ''
                  }
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ঘন্টা
                </label>
                <input
                  type="number"
                  name="hours"
                  min="1"
                  value={formData.hours}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  অবস্থা
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="upcoming">আসন্ন</option>
                  <option value="ongoing">চলমান</option>
                  <option value="completed">সম্পন্ন</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  অংশগ্রহণকারী (ঐচ্ছিক)
                </label>
                <input
                  type="number"
                  name="participants"
                  min="0"
                  value={formData.participants || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  প্রভাবিত মানুষ (ঐচ্ছিক)
                </label>
                <input
                  type="number"
                  name="impactedPeople"
                  min="0"
                  value={formData.impactedPeople || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                বিবরণ
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              ></textarea>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                {editingId !== null ? 'আপডেট করুন' : 'যোগ করুন'}
              </button>
            </div>
          </form>
        </div>
      )}

      {socialWorks.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <Users className="h-12 w-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500">আপনি এখনও কোন সামাজিক কাজ যোগ করেননি</p>
          <button
            onClick={() => {
              setEditingId(null);
              resetForm();
              setShowForm(true);
            }}
            className="mt-3 text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" /> প্রথম সামাজিক কাজ যোগ করুন
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {socialWorks.map((work) => (
            <div key={work.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span
                      className={`text-xs font-medium px-2.5 py-0.5 rounded-full mr-2 ${getTypeColor(
                        work.type
                      )}`}
                    >
                      {getTypeLabel(work.type)}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      {getStatusIcon(work.status)}
                      <span className="ml-1">
                        {getStatusLabel(work.status)}
                      </span>
                    </div>
                  </div>
                  <h4 className="font-semibold text-lg mb-1">{work.title}</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    {work.description}
                  </p>
                  <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {work.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {work.date instanceof Date
                        ? work.date.toLocaleDateString('bn-BD')
                        : new Date(work.date).toLocaleDateString('bn-BD')}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {work.hours} ঘন্টা
                    </div>
                    {work.participants && (
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {work.participants} জন অংশগ্রহণকারী
                      </div>
                    )}
                    {work.impactedPeople && (
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {work.impactedPeople} জন উপকৃত
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(work.id)}
                    className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(work.id)}
                    className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SocialWorksSection;
