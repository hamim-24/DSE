// Utility to check if environment variables are loaded correctly
export function checkEnvironmentVariables() {
  console.log('Environment Variables Check:');

  // Check Supabase variables
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  console.log('VITE_SUPABASE_URL:', supabaseUrl ? '✅ Loaded' : '❌ Missing');
  console.log(
    'VITE_SUPABASE_ANON_KEY:',
    supabaseAnonKey ? '✅ Loaded' : '❌ Missing'
  );

  // Return true if all required variables are present
  return !!(supabaseUrl && supabaseAnonKey);
}
