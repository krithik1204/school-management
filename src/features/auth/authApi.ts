import httpClient from '../../services/http';
import { API_ENDPOINTS } from '../../config/api.config';

export interface UserRegistrationRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  medicalRecordNumber: string;
  roles: string[];
  gender: string;
  dateOfBirth: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface AuthenticationResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    medicalRecordNumber?: string;
    roles: string[];
  };
}

export interface UserRegistrationResponse {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
  };
}

export const register = (data: UserRegistrationRequest) => {
  return httpClient.post<UserRegistrationResponse>(API_ENDPOINTS.AUTH.REGISTER, data);
};

export const login = (data: UserLoginRequest) => {
  return httpClient.post<AuthenticationResponse>(API_ENDPOINTS.AUTH.LOGIN, data);
};

export const logout = (userId: string | number, token?: string) => {
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
