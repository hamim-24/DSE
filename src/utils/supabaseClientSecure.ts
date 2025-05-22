import { createClient } from '@supabase/supabase-js';

// Get values from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to check if user is authenticated
export const isAuthenticated = async () => {
  const { data } = await supabase.auth.getSession();
  return !!data.session;
};

// Helper function to get current user
export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data.user;
};
