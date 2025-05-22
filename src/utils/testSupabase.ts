import { supabase } from './supabaseClient';

// Function to test Supabase connection
export async function testSupabaseConnection() {
  try {
    // Try to fetch some data from your 'todos' table
    const { data, error } = await supabase.from('todos').select().limit(5);

    if (error) {
      console.error('Error connecting to Supabase:', error);
      return false;
    }

    console.log('Successfully connected to Supabase!');
    console.log('Sample data:', data);
    return true;
  } catch (err) {
    console.error('Exception when connecting to Supabase:', err);
    return false;
  }
}
