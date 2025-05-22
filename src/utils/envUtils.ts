/**
 * Utility functions for handling environment variables
 */

// Check if an environment variable exists and is not empty
export const hasEnvVariable = (key: string): boolean => {
  const value = import.meta.env[key];
  return value !== undefined && value !== '';
};

// Get an environment variable with a fallback value
export const getEnvVariable = (key: string, fallback = ''): string => {
  if (hasEnvVariable(key)) {
    return import.meta.env[key];
  }
  return fallback;
};

// Securely get API keys with masking for logging
export const getApiKey = (key: string, fallback = ''): string => {
  const value = getEnvVariable(key, fallback);

  // For logging purposes, mask the API key
  if (value && value.length > 8) {
    const maskedKey = `${value.substring(0, 4)}...${value.substring(
      value.length - 4
    )}`;
    console.log(`Using API key for ${key}: ${maskedKey}`);
  } else if (!value) {
    console.warn(`API key for ${key} is not set`);
  }

  return value;
};

// Check if we're in development mode
export const isDevelopment = (): boolean => {
  return import.meta.env.DEV === true;
};

// Check if we're in production mode
export const isProduction = (): boolean => {
  return import.meta.env.PROD === true;
};
