// Custom Supabase client implementation without external dependencies

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Basic types for our custom client
type SupabaseQueryParams = Record<string, string | number | boolean | null>;
type SupabaseResponse<T> = { data: T | null; error: Error | null };

// Simple custom Supabase client
class SupabaseClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: HeadersInit;

  constructor(url: string, apiKey: string) {
    this.baseUrl = url;
    this.apiKey = apiKey;
    this.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
      apikey: this.apiKey,
    };
  }

  // Basic auth methods
  auth = {
    getSession: async (): Promise<SupabaseResponse<{ session: any }>> => {
      try {
        const response = await fetch(`${this.baseUrl}/auth/v1/session`, {
          headers: this.headers,
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`Auth error: ${response.statusText}`);
        }

        const data = await response.json();
        return { data, error: null };
      } catch (error) {
        console.error('Error getting session:', error);
        return {
          data: null,
          error: error instanceof Error ? error : new Error(String(error)),
        };
      }
    },

    getUser: async (): Promise<SupabaseResponse<{ user: any }>> => {
      try {
        const response = await fetch(`${this.baseUrl}/auth/v1/user`, {
          headers: this.headers,
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`Auth error: ${response.statusText}`);
        }

        const data = await response.json();
        return { data, error: null };
      } catch (error) {
        console.error('Error getting user:', error);
        return {
          data: null,
          error: error instanceof Error ? error : new Error(String(error)),
        };
      }
    },
  };

  // Basic database methods
  from = (table: string) => {
    return {
      select: (columns = '*'): Promise<SupabaseResponse<any[]>> => {
        return this.request(`/rest/v1/${table}?select=${columns}`, 'GET');
      },

      insert: (data: any): Promise<SupabaseResponse<any>> => {
        return this.request(`/rest/v1/${table}`, 'POST', data);
      },

      update: (data: any): Promise<SupabaseResponse<any>> => {
        return this.request(`/rest/v1/${table}`, 'PATCH', data);
      },

      delete: (): Promise<SupabaseResponse<any>> => {
        return this.request(`/rest/v1/${table}`, 'DELETE');
      },

      eq: (column: string, value: any) => {
        // This is a simplified implementation
        return {
          select: (columns = '*'): Promise<SupabaseResponse<any[]>> => {
            return this.request(
              `/rest/v1/${table}?select=${columns}&${column}=eq.${value}`,
              'GET'
            );
          },
        };
      },

      limit: (count: number) => {
        return {
          select: (columns = '*'): Promise<SupabaseResponse<any[]>> => {
            return this.request(
              `/rest/v1/${table}?select=${columns}&limit=${count}`,
              'GET'
            );
          },
        };
      },
    };
  };

  // Helper method for making requests
  private async request(
    endpoint: string,
    method: string,
    body?: any
  ): Promise<SupabaseResponse<any>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const options: RequestInit = {
        method,
        headers: this.headers,
        credentials: 'include',
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Request error: ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      const data = contentType?.includes('application/json')
        ? await response.json()
        : await response.text();

      return { data, error: null };
    } catch (error) {
      console.error('Request error:', error);
      return {
        data: null,
        error: error instanceof Error ? error : new Error(String(error)),
      };
    }
  }
}

// Create a single supabase client for the entire app
export const supabase = new SupabaseClient(supabaseUrl, supabaseAnonKey);

// Helper function to check if user is authenticated
export const isAuthenticated = async () => {
  const { data } = await supabase.auth.getSession();
  return !!data?.session;
};

// Helper function to get current user
export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data?.user;
};

// Helper function to verify Supabase connection
export const verifyConnection = async () => {
  try {
    // Try a simple query to verify connection
    const { error } = await supabase.from('topics').select().limit(1);

    if (error) {
      console.error('Supabase connection error:', error.message);
      return false;
    }

    console.log('Supabase connection successful!');
    return true;
  } catch (err) {
    console.error('Failed to connect to Supabase:', err);
    return false;
  }
};

// Export types for TypeScript support
export type Database = any; // Replace with your actual database types
