import httpClient from '../../services/http';
import { API_ENDPOINTS } from '../../config/api.config';

export const register = (data) => {
  return httpClient.post(API_ENDPOINTS.AUTH.REGISTER, data);
};

export const login = (data) => {
  return httpClient.post(API_ENDPOINTS.AUTH.LOGIN, data);
};

export const logout = (userId, token) => {
  return httpClient.post(
    `${API_ENDPOINTS.AUTH.LOGOUT}/${userId}`,
    null,
    token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : undefined
  );
};