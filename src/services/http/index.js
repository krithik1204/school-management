import axios from 'axios';
import { API_CONFIG } from '../../config/api.config';
import {
  requestInterceptor,
  responseInterceptor,
  errorInterceptor,
  retryInterceptor
} from './interceptors';

// Create axios instance with base configuration
const httpClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
httpClient.interceptors.request.use(requestInterceptor, errorInterceptor);

// Add response interceptor
httpClient.interceptors.response.use(responseInterceptor, retryInterceptor);

// Export the configured axios instance
export default httpClient;

// Export additional utilities
export { httpClient as axiosInstance };