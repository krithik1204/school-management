import axios, { AxiosError } from 'axios';
import { API_CONFIG } from '../../config/api.config';

// Request interceptor to add auth token
export const requestInterceptor = (config) => {
  const token = sessionStorage.getItem('accessToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// Response interceptor for success
export const responseInterceptor = (response) => {
  return response;
};

// Response interceptor for errors
export const errorInterceptor = (error) => {
  const errorData = error.response?.data;

  const apiError = {
    message: errorData?.message || errorData?.error || error.message || 'An error occurred',
    status: error.response?.status || 500,
    code: error.code,
    details: error.response?.data,
  };

  // Handle specific error codes
  switch (apiError.status) {
    case 401:
      // Token expired or invalid
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      // Redirect to login if needed
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
      break;
    case 403:
      // Forbidden - user doesn't have permission
      console.error('Access forbidden:', apiError.message);
      break;
    case 500:
      // Server error
      console.error('Server error:', apiError.message);
      break;
    default:
      console.error('API Error:', apiError);
  }

  return Promise.reject(apiError);
};

// Retry logic for failed requests
export const retryInterceptor = (error) => {
  const config = error.config;

  if (!config || !config._retry) {
    config._retry = true;
    config._retryCount = config._retryCount ?? 0;

    if ((config._retryCount ?? 0) < API_CONFIG.RETRY_ATTEMPTS) {
      config._retryCount = (config._retryCount ?? 0) + 1;

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(axios(config));
        }, API_CONFIG.RETRY_DELAY * (config._retryCount ?? 0));
      });
    }
  }

  return Promise.reject(error);
};