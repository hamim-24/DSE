'use client';

import type React from 'react';
import { useState } from 'react';
import { BookOpen, GraduationCap, Award, Clock, Plus, X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const TeacherProfileSection: React.FC = () => {
  const { teacherProfile, updateTeacherProfile } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    specialization: teacherProfile?.specialization || [],
    experience: teacherProfile?.experience || 0,
    education: teacherProfile?.education || '',
    certifications: teacherProfile?.certifications || [],
    areasOfInterest: teacherProfile?.areasOfInterest || [],
    availableForVolunteering: teacherProfile?.availableForVolunteering || false,
  });
  const [newSpecialization, setNewSpecialization] = useState('');
  const [newCertification, setNewCertification] = useState('');
  const [newAreaOfInterest, setNewAreaOfInterest] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : name === 'experience'
          ? Number.parseInt(value) || 0
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTeacherProfile(formData);
    setIsEditing(false);
  };

  const addSpecialization = () => {
    if (
      newSpecialization.trim() &&
      !formData.specialization.includes(newSpecialization.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        specialization: [...prev.specialization, newSpecialization.trim()],
      }));
      setNewSpecialization('');
    }
  };

  const removeSpecialization = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      specialization: prev.specialization.filter((i) => i !== item),
    }));
  };

  const addCertification = () => {
    if (
      newCertification.trim() &&
      !formData.certifications.includes(newCertification.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        certifications: [...prev.certifications, newCertification.trim()],
      }));
      setNewCertification('');
    }
  };

  const removeCertification = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((i) => i !== item),
    }));
  };

  const addAreaOfInterest = () => {
    if (
      newAreaOfInterest.trim() &&
      !formData.areasOfInterest.includes(newAreaOfInterest.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        areasOfInterest: [...prev.areasOfInterest, newAreaOfInterest.trim()],
      }));
      setNewAreaOfInterest('');
    }
  };

  const removeAreaOfInterest = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      areasOfInterest: prev.areasOfInterest.filter((i) => i !== item),
    }));
  };

  if (!teacherProfile && !isEditing) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
            শিক্ষক প্রোফাইল
          </h3>
        </div>

        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <GraduationCap className="h-12 w-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500 mb-3">
            আপনি এখনও শিক্ষক প্রোফাইল সেট আপ করেননি
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            শিক্ষক প্রোফাইল সেট আপ করুন
          </button>
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
            শিক্ষক প্রোফাইল সম্পাদনা করুন
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              বিশেষজ্ঞতা
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.specialization.map((item, index) => (
                <div
                  key={index}
                  className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full flex items-center"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => removeSpecialization(item)}
                    className="ml-2 text-indigo-600 hover:text-indigo-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={newSpecialization}
                onChange={(e) => setNewSpecialization(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="নতুন বিশেষজ্ঞতা যোগ করুন"
              />
              <button
                type="button"
                onClick={addSpecialization}
                className="bg-indigo-600 text-white px-3 py-2 rounded-r-md hover:bg-indigo-700"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              অভিজ্ঞতা (বছর)
            </label>
            <input
              type="number"
              name="experience"
              min="0"
              value={formData.experience}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              শিক্ষাগত যোগ্যতা
            </label>
            <textarea
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              সার্টিফিকেশন
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.certifications.map((item, index) => (
                <div
                  key={index}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => removeCertification(item)}
                    className="ml-2 text-green-600 hover:text-green-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={newCertification}
                onChange={(e) => setNewCertification(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="নতুন সার্টিফিকেশন যোগ করুন"
              />
              <button
                type="button"
                onClick={addCertification}
                className="bg-green-600 text-white px-3 py-2 rounded-r-md hover:bg-green-700"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              আগ্রহের ক্ষেত্র
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.areasOfInterest.map((item, index) => (
                <div
                  key={index}
                  className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => removeAreaOfInterest(item)}
                    className="ml-2 text-purple-600 hover:text-purple-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={newAreaOfInterest}
                onChange={(e) => setNewAreaOfInterest(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="নতুন আগ্রহের ক্ষেত্র যোগ করুন"
              />
              <button
                type="button"
                onClick={addAreaOfInterest}
                className="bg-purple-600 text-white px-3 py-2 rounded-r-md hover:bg-purple-700"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="availableForVolunteering"
              name="availableForVolunteering"
              checked={formData.availableForVolunteering}
              onChange={handleInputChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="availableForVolunteering"
              className="ml-2 block text-sm text-gray-700"
            >
              আমি স্বেচ্ছাসেবী শিক্ষাদানের জন্য উপলব্ধ
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              সংরক্ষণ করুন
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
          শিক্ষক প্রোফাইল
        </h3>
        <button
          onClick={() => setIsEditing(true)}
          className="text-indigo-600 text-sm font-medium hover:text-indigo-800"
        >
          সম্পাদনা করুন
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm text-gray-500 mb-2 flex items-center">
            <Award className="h-4 w-4 mr-1 text-indigo-600" />
            বিশেষজ্ঞতা
          </h4>
          <div className="flex flex-wrap gap-2">
            {teacherProfile?.specialization.map((item, index) => (
              <span
                key={index}
                className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm text-gray-500 mb-2 flex items-center">
              <Clock className="h-4 w-4 mr-1 text-indigo-600" />
              অভিজ্ঞতা
            </h4>
            <p className="font-medium">{teacherProfile?.experience} বছর</p>
          </div>

          <div>
            <h4 className="text-sm text-gray-500 mb-2 flex items-center">
              <GraduationCap className="h-4 w-4 mr-1 text-indigo-600" />
              শিক্ষাগত যোগ্যতা
            </h4>
            <p className="font-medium">{teacherProfile?.education}</p>
          </div>
        </div>

        <div>
          <h4 className="text-sm text-gray-500 mb-2 flex items-center">
            <Award className="h-4 w-4 mr-1 text-green-600" />
            সার্টিফিকেশন
          </h4>
          <div className="flex flex-wrap gap-2">
            {teacherProfile?.certifications.map((item, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm text-gray-500 mb-2 flex items-center">
            <BookOpen className="h-4 w-4 mr-1 text-purple-600" />
            আগ্রহের ক্ষেত্র
          </h4>
          <div className="flex flex-wrap gap-2">
            {teacherProfile?.areasOfInterest.map((item, index) => (
              <span
                key={index}
                className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-2">
          {teacherProfile?.availableForVolunteering ? (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md inline-flex items-center">
              <Award className="h-5 w-5 mr-2" />
              আমি স্বেচ্ছাসেবী শিক্ষাদানের জন্য উপলব্ধ
            </div>
          ) : (
            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md inline-flex items-center">
              <Award className="h-5 w-5 mr-2" />
              আমি বর্তমানে স্বেচ্ছাসেবী শিক্ষাদানের জন্য উপলব্ধ নই
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherProfileSection;
