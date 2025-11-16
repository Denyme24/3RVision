// API Configuration
// These environment variables must be prefixed with NEXT_PUBLIC_ to be accessible in the browser

export const API_CONFIG = {
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080',
  ML_URL: process.env.NEXT_PUBLIC_ML_URL || 'http://localhost:5001',
} as const;

// Helper functions to build API endpoints
export const getBackendUrl = (endpoint: string) => {
  const baseUrl = API_CONFIG.BACKEND_URL.replace(/\/$/, ''); // Remove trailing slash
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${path}`;
};

export const getMLUrl = (endpoint: string) => {
  const baseUrl = API_CONFIG.ML_URL.replace(/\/$/, ''); // Remove trailing slash
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${path}`;
};

