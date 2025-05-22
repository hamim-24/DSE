'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { testSupabaseConnection } from '../../services/learningPathService';
import { verifySupabaseConnection } from '../../utils/supabaseClient';

const SupabaseConnectionTest: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<{
    success: boolean;
    message: string;
    data?: any;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [utilityStatus, setUtilityStatus] = useState<boolean | null>(null);

  const testConnection = async () => {
    setIsLoading(true);
    try {
      // Test using the service function
      const result = await testSupabaseConnection();
      setConnectionStatus(result);

      // Also test using the utility function
      const utilityResult = await verifySupabaseConnection();
      setUtilityStatus(utilityResult);
    } catch (error) {
      setConnectionStatus({
        success: false,
        message: `Error: ${
          error instanceof Error ? error.message : String(error)
        }`,
      });
      setUtilityStatus(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Test connection on component mount
    testConnection();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Supabase Connection Test</h2>

      <div className="mb-6">
        <div className="flex items-center mb-2">
          <div className="mr-2 font-semibold">Service Connection Status:</div>
          {isLoading ? (
            <div className="animate-pulse">Testing connection...</div>
          ) : connectionStatus ? (
            <div
              className={`flex items-center ${
                connectionStatus.success ? 'text-green-600' : 'text-red-600'
              }`}
            >
              <span
                className={`inline-block w-3 h-3 rounded-full mr-2 ${
                  connectionStatus.success ? 'bg-green-600' : 'bg-red-600'
                }`}
              ></span>
              {connectionStatus.success ? 'Connected' : 'Failed'}
            </div>
          ) : null}
        </div>

        <div className="flex items-center mb-4">
          <div className="mr-2 font-semibold">Utility Connection Status:</div>
          {isLoading ? (
            <div className="animate-pulse">Testing connection...</div>
          ) : utilityStatus !== null ? (
            <div
              className={`flex items-center ${
                utilityStatus ? 'text-green-600' : 'text-red-600'
              }`}
            >
              <span
                className={`inline-block w-3 h-3 rounded-full mr-2 ${
                  utilityStatus ? 'bg-green-600' : 'bg-red-600'
                }`}
              ></span>
              {utilityStatus ? 'Connected' : 'Failed'}
            </div>
          ) : null}
        </div>

        {connectionStatus && (
          <div className="mt-2">
            <p className="text-gray-700">{connectionStatus.message}</p>
          </div>
        )}
      </div>

      {connectionStatus &&
        connectionStatus.success &&
        connectionStatus.data && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Sample Data:</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
              {JSON.stringify(connectionStatus.data, null, 2)}
            </pre>
          </div>
        )}

      <button
        onClick={testConnection}
        disabled={isLoading}
        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
      >
        {isLoading ? 'Testing...' : 'Test Connection Again'}
      </button>
    </div>
  );
};

export default SupabaseConnectionTest;
