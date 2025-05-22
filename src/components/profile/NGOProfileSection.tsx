'use client';

import type React from 'react';
import { useState } from 'react';
import {
  Building2,
  Globe,
  Mail,
  Phone,
  Users,
  Calendar,
  Plus,
  X,
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const NGOProfileSection: React.FC = () => {
  const { ngoProfile, updateNGOProfile } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: ngoProfile?.organizationName || '',
    registrationNumber: ngoProfile?.registrationNumber || '',
    foundedYear: ngoProfile?.foundedYear || new Date().getFullYear(),
    mission: ngoProfile?.mission || '',
    areas: ngoProfile?.areas || [],
    website: ngoProfile?.website || '',
    contactEmail: ngoProfile?.contactEmail || '',
    contactPhone: ngoProfile?.contactPhone || '',
    numberOfEmployees: ngoProfile?.numberOfEmployees || 0,
    numberOfVolunteers: ngoProfile?.numberOfVolunteers || 0,
  });
  const [newArea, setNewArea] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'foundedYear' ||
        name === 'numberOfEmployees' ||
        name === 'numberOfVolunteers'
          ? Number.parseInt(value) || 0
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateNGOProfile(formData);
    setIsEditing(false);
  };

  const addArea = () => {
    if (newArea.trim() && !formData.areas.includes(newArea.trim())) {
      setFormData((prev) => ({
        ...prev,
        areas: [...prev.areas, newArea.trim()],
      }));
      setNewArea('');
    }
  };

  const removeArea = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      areas: prev.areas.filter((i) => i !== item),
    }));
  };

  if (!ngoProfile && !isEditing) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold flex items-center">
            <Building2 className="h-5 w-5 mr-2 text-indigo-600" />
            এনজিও প্রোফাইল
          </h3>
        </div>

        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <Building2 className="h-12 w-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500 mb-3">
            আপনি এখনও এনজিও প্রোফাইল সেট আপ করেননি
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            এনজিও প্রোফাইল সেট আপ করুন
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
            <Building2 className="h-5 w-5 mr-2 text-indigo-600" />
            এনজিও প্রোফাইল সম্পাদনা করুন
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                প্রতিষ্ঠানের নাম
              </label>
              <input
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                রেজিস্ট্রেশন নম্বর
              </label>
              <input
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                প্রতিষ্ঠার বছর
              </label>
              <input
                type="number"
                name="foundedYear"
                min="1900"
                max={new Date().getFullYear()}
                value={formData.foundedYear}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ওয়েবসাইট (ঐচ্ছিক)
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                যোগাযোগের ইমেইল
              </label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                যোগাযোগের ফোন
              </label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                কর্মচারীর সংখ্যা
              </label>
              <input
                type="number"
                name="numberOfEmployees"
                min="0"
                value={formData.numberOfEmployees}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                স্বেচ্ছাসেবকের সংখ্যা
              </label>
              <input
                type="number"
                name="numberOfVolunteers"
                min="0"
                value={formData.numberOfVolunteers}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              মিশন
            </label>
            <textarea
              name="mission"
              value={formData.mission}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              কাজের ক্ষেত্র
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.areas.map((item, index) => (
                <div
                  key={index}
                  className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full flex items-center"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => removeArea(item)}
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
                value={newArea}
                onChange={(e) => setNewArea(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="নতুন কাজের ক্ষেত্র যোগ করুন"
              />
              <button
                type="button"
                onClick={addArea}
                className="bg-indigo-600 text-white px-3 py-2 rounded-r-md hover:bg-indigo-700"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
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
          <Building2 className="h-5 w-5 mr-2 text-indigo-600" />
          এনজিও প্রোফাইল
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
          <h2 className="text-2xl font-bold mb-1">
            {ngoProfile?.organizationName}
          </h2>
          <p className="text-gray-600 mb-4">
            রেজিস্ট্রেশন নম্বর: {ngoProfile?.registrationNumber}
          </p>
        </div>

        <div>
          <h4 className="text-sm text-gray-500 mb-2">আমাদের মিশন</h4>
          <p className="text-gray-700">{ngoProfile?.mission}</p>
        </div>

        <div>
          <h4 className="text-sm text-gray-500 mb-2">কাজের ক্ষেত্র</h4>
          <div className="flex flex-wrap gap-2">
            {ngoProfile?.areas.map((item, index) => (
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
              <Calendar className="h-4 w-4 mr-1 text-indigo-600" />
              প্রতিষ্ঠার বছর
            </h4>
            <p className="font-medium">{ngoProfile?.foundedYear}</p>
          </div>

          <div>
            <h4 className="text-sm text-gray-500 mb-2 flex items-center">
              <Users className="h-4 w-4 mr-1 text-indigo-600" />
              মানব সম্পদ
            </h4>
            <p className="font-medium">
              {ngoProfile?.numberOfEmployees} জন কর্মচারী,{' '}
              {ngoProfile?.numberOfVolunteers} জন স্বেচ্ছাসেবক
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <h4 className="text-sm text-gray-500 mb-3">যোগাযোগ</h4>
          <div className="space-y-2">
            {ngoProfile?.website && (
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-gray-500 mr-2" />
                <a
                  href={ngoProfile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  {ngoProfile.website}
                </a>
              </div>
            )}
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-500 mr-2" />
              <a
                href={`mailto:${ngoProfile?.contactEmail}`}
                className="text-indigo-600 hover:underline"
              >
                {ngoProfile?.contactEmail}
              </a>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gray-500 mr-2" />
              <a
                href={`tel:${ngoProfile?.contactPhone}`}
                className="text-indigo-600 hover:underline"
              >
                {ngoProfile?.contactPhone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGOProfileSection;
