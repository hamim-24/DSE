'use client';

import type React from 'react';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import type { Reward } from '../data/rewardsData';

type UserGroup =
  | 'child'
  | 'student'
  | 'professional'
  | 'woman'
  | 'elderly'
  | 'disabled'
  | 'teacher'
  | 'service';
type ContentType =
  | 'audio'
  | 'video'
  | 'blog'
  | 'experiment'
  | 'ebook'
  | 'quiz'
  | 'comic';

interface RedeemedReward {
  id: number;
  rewardId: number;
  redeemedAt: Date;
  expiresAt: Date;
  code: string;
  used: boolean;
  shared?: boolean; // Track if reward has been shared
}

interface PointsTransaction {
  id: number;
  amount: number;
  type: 'earned' | 'spent';
  description: string;
  timestamp: Date;
  relatedItemId?: number; // Course ID, reward ID, etc.
}

// User reward tier based on points
type UserTier = 'bronze' | 'silver' | 'gold' | 'platinum';

// Add new user types and social work tracking to the context
// Add these types after the UserTier type definition
type UserRole = 'regular' | 'teacher' | 'ngo' | 'admin';

interface SocialWork {
  id: number;
  title: string;
  description: string;
  type: 'teaching' | 'community' | 'environmental' | 'health' | 'other';
  location: string;
  hours: number;
  date: Date;
  status: 'completed' | 'ongoing' | 'upcoming';
  participants?: number;
  impactedPeople?: number;
}

interface TeacherProfile {
  specialization: string[];
  experience: number; // in years
  education: string;
  certifications: string[];
  areasOfInterest: string[];
  availableForVolunteering: boolean;
}

interface NGOProfile {
  organizationName: string;
  registrationNumber: string;
  foundedYear: number;
  mission: string;
  areas: string[];
  website?: string;
  contactEmail: string;
  contactPhone: string;
  numberOfEmployees: number;
  numberOfVolunteers: number;
}

// Create a default context value to avoid undefined checks
const defaultContextValue = {
  selectedUserGroup: null as UserGroup | null,
  selectedContentType: null as ContentType | null,
  points: 1500, // Starting with some points for testing
  totalPointsEarned: 1500,
  learningStreak: 0,
  isLoggedIn: false,
  downloadedContent: [] as number[],
  redeemedRewards: [] as RedeemedReward[],
  pointsTransactions: [] as PointsTransaction[],
  favoriteRewards: [] as number[],
  userTier: 'bronze' as UserTier,
  // Add these properties to the defaultContextValue
  userRole: 'regular' as UserRole,
  socialWorks: [] as SocialWork[],
  teacherProfile: null as TeacherProfile | null,
  ngoProfile: null as NGOProfile | null,
  communityServiceHours: 0,
  setSelectedUserGroup: () => {},
  setSelectedContentType: () => {},
  addPoints: () => {},
  incrementStreak: () => {},
  login: () => {},
  logout: () => {},
  addDownloadedContent: () => {},
  removeDownloadedContent: () => {},
  redeemReward: () =>
    Promise.resolve({
      success: false,
      message: '',
      redeemedReward: null as RedeemedReward | null,
    }),
  getRedeemedRewards: () => [] as RedeemedReward[],
  markRewardAsUsed: () => {},
  shareReward: () => {},
  toggleFavoriteReward: () => {},
  getPointsHistory: () => [] as PointsTransaction[],
  getUserTier: () => 'bronze' as UserTier,
  getDiscountForTier: () => 0,
  setUserRole: () => {},
  addSocialWork: () =>
    Promise.resolve({
      success: false,
      message: '',
      socialWork: null as SocialWork | null,
    }),
  updateSocialWork: () => Promise.resolve(false),
  deleteSocialWork: () => {},
  getSocialWorks: () => [] as SocialWork[],
  updateTeacherProfile: () => {},
  updateNGOProfile: () => {},
};

// Define the context type
interface AppContextType {
  selectedUserGroup: UserGroup | null;
  selectedContentType: ContentType | null;
  points: number;
  totalPointsEarned: number;
  learningStreak: number;
  isLoggedIn: boolean;
  downloadedContent: number[];
  redeemedRewards: RedeemedReward[];
  pointsTransactions: PointsTransaction[];
  favoriteRewards: number[];
  userTier: UserTier;
  // Add these properties to the AppContextType interface
  userRole: UserRole;
  socialWorks: SocialWork[];
  teacherProfile: TeacherProfile | null;
  ngoProfile: NGOProfile | null;
  communityServiceHours: number;
  setSelectedUserGroup: (group: UserGroup | null) => void;
  setSelectedContentType: (type: ContentType | null) => void;
  addPoints: (
    amount: number,
    description: string,
    relatedItemId?: number
  ) => void;
  incrementStreak: () => void;
  login: () => void;
  logout: () => void;
  addDownloadedContent: (contentId: number) => void;
  removeDownloadedContent: (contentId: number) => void;
  redeemReward: (reward: Reward) => Promise<{
    success: boolean;
    message: string;
    redeemedReward: RedeemedReward | null;
  }>;
  getRedeemedRewards: () => RedeemedReward[];
  markRewardAsUsed: (redeemedRewardId: number) => void;
  shareReward: (redeemedRewardId: number) => void;
  toggleFavoriteReward: (rewardId: number) => void;
  getPointsHistory: () => PointsTransaction[];
  getUserTier: () => UserTier;
  getDiscountForTier: (tier: UserTier) => number;
  setUserRole: (role: UserRole) => void;
  addSocialWork: (work: Omit<SocialWork, 'id'>) => Promise<{
    success: boolean;
    message: string;
    socialWork: SocialWork | null;
  }>;
  updateSocialWork: (
    id: number,
    updates: Partial<Omit<SocialWork, 'id'>>
  ) => Promise<boolean>;
  deleteSocialWork: (id: number) => void;
  getSocialWorks: () => SocialWork[];
  updateTeacherProfile: (profile: TeacherProfile) => void;
  updateNGOProfile: (profile: NGOProfile) => void;
}

// Create the context with default values
const AppContext = createContext<AppContextType>(defaultContextValue);

// Create a safer hook with better error messages
export const useAppContext = () => {
  const context = useContext(AppContext);

  // This should never happen with our default value, but keeping the check for safety
  if (!context) {
    console.error(
      'useAppContext was called outside of AppProvider. ' +
        "This could happen if you're calling useAppContext in a component that's not wrapped by AppProvider."
    );
    // Return default context instead of throwing to prevent app crashes
    return defaultContextValue;
  }

  return context;
};

// Create the provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedUserGroup, setSelectedUserGroup] = useState<UserGroup | null>(
    null
  );
  const [selectedContentType, setSelectedContentType] =
    useState<ContentType | null>(null);
  const [points, setPoints] = useState(1500); // Starting with some points for testing
  const [totalPointsEarned, setTotalPointsEarned] = useState(1500);
  const [learningStreak, setLearningStreak] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [downloadedContent, setDownloadedContent] = useState<number[]>([]);
  const [redeemedRewards, setRedeemedRewards] = useState<RedeemedReward[]>([]);
  const [pointsTransactions, setPointsTransactions] = useState<
    PointsTransaction[]
  >([]);
  const [favoriteRewards, setFavoriteRewards] = useState<number[]>([]);
  const [userTier, setUserTier] = useState<UserTier>('bronze');

  // Add these state variables after the userTier state
  const [userRole, setUserRole] = useState<UserRole>('regular');
  const [socialWorks, setSocialWorks] = useState<SocialWork[]>([]);
  const [teacherProfile, setTeacherProfile] = useState<TeacherProfile | null>(
    null
  );
  const [ngoProfile, setNGOProfile] = useState<NGOProfile | null>(null);
  const [communityServiceHours, setCommunityServiceHours] = useState(0);

  // Update user tier based on total points earned
  useEffect(() => {
    if (totalPointsEarned >= 10000) {
      setUserTier('platinum');
    } else if (totalPointsEarned >= 5000) {
      setUserTier('gold');
    } else if (totalPointsEarned >= 2000) {
      setUserTier('silver');
    } else {
      setUserTier('bronze');
    }
  }, [totalPointsEarned]);

  const addPoints = (
    amount: number,
    description: string,
    relatedItemId?: number
  ) => {
    setPoints((prev) => prev + amount);
    setTotalPointsEarned((prev) => prev + (amount > 0 ? amount : 0));

    // Record the transaction
    const newTransaction: PointsTransaction = {
      id: Date.now(),
      amount,
      type: amount > 0 ? 'earned' : 'spent',
      description,
      timestamp: new Date(),
      relatedItemId,
    };

    setPointsTransactions((prev) => [newTransaction, ...prev]);
  };

  const incrementStreak = () => {
    setLearningStreak((prev) => prev + 1);
  };

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const addDownloadedContent = (contentId: number) => {
    setDownloadedContent((prev) => {
      if (prev.includes(contentId)) return prev;
      return [...prev, contentId];
    });
  };

  const removeDownloadedContent = (contentId: number) => {
    setDownloadedContent((prev) => prev.filter((id) => id !== contentId));
  };

  // Get discount percentage based on user tier
  const getDiscountForTier = (tier: UserTier): number => {
    switch (tier) {
      case 'platinum':
        return 20;
      case 'gold':
        return 15;
      case 'silver':
        return 10;
      case 'bronze':
      default:
        return 5;
    }
  };

  // Enhanced reward functions
  const redeemReward = async (reward: Reward) => {
    // Apply tier discount to the reward cost
    const tierDiscount = getDiscountForTier(userTier);
    const discountedCost = Math.floor(
      reward.pointsCost * (1 - tierDiscount / 100)
    );

    // Check if user has enough points
    if (points < discountedCost) {
      return {
        success: false,
        message: 'আপনার পয়েন্ট পর্যাপ্ত নয়',
        redeemedReward: null,
      };
    }

    // Generate a random code (in a real app, this would come from a backend)
    const generateCode = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let code = '';
      for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return code;
    };

    // Simulate API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Create redeemed reward
    const now = new Date();
    const expiresAt = new Date();
    expiresAt.setDate(now.getDate() + reward.expiryDays);

    const redeemedReward: RedeemedReward = {
      id: Date.now(), // Use timestamp as ID
      rewardId: reward.id,
      redeemedAt: now,
      expiresAt: expiresAt,
      code: reward.code || generateCode(),
      used: false,
      shared: false,
    };

    // Update state
    setRedeemedRewards((prev) => [...prev, redeemedReward]);

    // Record points transaction
    addPoints(
      -discountedCost,
      `রিডিম করা হয়েছে: ${reward.title}${
        tierDiscount > 0 ? ` (${tierDiscount}% ছাড়সহ)` : ''
      }`,
      reward.id
    );

    return {
      success: true,
      message: `রিওয়ার্ড সফলভাবে রিডিম করা হয়েছে!${
        tierDiscount > 0 ? ` আপনি ${tierDiscount}% ছাড় পেয়েছেন!` : ''
      }`,
      redeemedReward,
    };
  };

  const getRedeemedRewards = () => {
    return redeemedRewards;
  };

  const markRewardAsUsed = (redeemedRewardId: number) => {
    setRedeemedRewards((prev) =>
      prev.map((reward) =>
        reward.id === redeemedRewardId ? { ...reward, used: true } : reward
      )
    );
  };

  const shareReward = (redeemedRewardId: number) => {
    setRedeemedRewards((prev) =>
      prev.map((reward) =>
        reward.id === redeemedRewardId ? { ...reward, shared: true } : reward
      )
    );

    // Bonus points for sharing
    addPoints(50, 'রিওয়ার্ড শেয়ার করার জন্য বোনাস', redeemedRewardId);
  };

  const toggleFavoriteReward = (rewardId: number) => {
    setFavoriteRewards((prev) => {
      if (prev.includes(rewardId)) {
        return prev.filter((id) => id !== rewardId);
      } else {
        return [...prev, rewardId];
      }
    });
  };

  const getPointsHistory = () => {
    return pointsTransactions;
  };

  const getUserTier = () => {
    return userTier;
  };

  // Add these functions before the return statement
  const addSocialWork = async (work: Omit<SocialWork, 'id'>) => {
    // Create a new social work entry
    const newWork: SocialWork = {
      ...work,
      id: Date.now(),
    };

    // Update state
    setSocialWorks((prev) => [...prev, newWork]);

    // Update community service hours
    setCommunityServiceHours((prev) => prev + work.hours);

    // Add points for social work
    addPoints(work.hours * 10, `সামাজিক কাজ সম্পন্ন: ${work.title}`);

    return {
      success: true,
      message: 'সামাজিক কাজ সফলভাবে যোগ করা হয়েছে!',
      socialWork: newWork,
    };
  };

  const updateSocialWork = async (
    id: number,
    updates: Partial<Omit<SocialWork, 'id'>>
  ) => {
    let success = false;

    setSocialWorks((prev) => {
      const workIndex = prev.findIndex((work) => work.id === id);
      if (workIndex === -1) return prev;

      const oldWork = prev[workIndex];
      const newWork = { ...oldWork, ...updates };

      // If hours changed, update community service hours
      if (updates.hours !== undefined && updates.hours !== oldWork.hours) {
        const hoursDiff = updates.hours - oldWork.hours;
        setCommunityServiceHours((prev) => prev + hoursDiff);
      }

      success = true;
      return [
        ...prev.slice(0, workIndex),
        newWork,
        ...prev.slice(workIndex + 1),
      ];
    });

    return success;
  };

  const deleteSocialWork = (id: number) => {
    setSocialWorks((prev) => {
      const workIndex = prev.findIndex((work) => work.id === id);
      if (workIndex === -1) return prev;

      const work = prev[workIndex];

      // Update community service hours
      setCommunityServiceHours((prev) => prev - work.hours);

      return [...prev.slice(0, workIndex), ...prev.slice(workIndex + 1)];
    });
  };

  const getSocialWorks = () => {
    return socialWorks;
  };

  const updateTeacherProfile = (profile: TeacherProfile) => {
    setTeacherProfile(profile);
  };

  const updateNGOProfile = (profile: NGOProfile) => {
    setNGOProfile(profile);
  };

  const value = {
    selectedUserGroup,
    selectedContentType,
    points,
    totalPointsEarned,
    learningStreak,
    isLoggedIn,
    downloadedContent,
    redeemedRewards,
    pointsTransactions,
    favoriteRewards,
    userTier,
    // Add these properties to the value object
    userRole,
    socialWorks,
    teacherProfile,
    ngoProfile,
    communityServiceHours,
    setSelectedUserGroup,
    setSelectedContentType,
    addPoints,
    incrementStreak,
    login,
    logout,
    addDownloadedContent,
    removeDownloadedContent,
    redeemReward,
    getRedeemedRewards,
    markRewardAsUsed,
    shareReward,
    toggleFavoriteReward,
    getPointsHistory,
    getUserTier,
    getDiscountForTier,
    setUserRole,
    addSocialWork,
    updateSocialWork,
    deleteSocialWork,
    getSocialWorks,
    updateTeacherProfile,
    updateNGOProfile,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Create a higher-order component for wrapping components that need context
export const withAppContext = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return (props: P) => (
    <AppProvider>
      <Component {...props} />
    </AppProvider>
  );
};
