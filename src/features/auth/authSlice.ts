import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'ROLE_ADMIN' | 'ROLE_TEACHER' | 'ROLE_STUDENT' | 'ROLE_PRINCIPAL' | '';

export interface AuthState {
  isAuthenticated: boolean;
  fullName: string;
  roles: UserRole[];
  accessToken: string | null;
  refreshToken: string | null;
  userId: string | null;
}

const storedAccessToken = sessionStorage.getItem('accessToken');
const storedFullName = sessionStorage.getItem('fullName') ?? '';
const storedRoles = (() => {
  const raw = sessionStorage.getItem('roles');
  if (!raw) {
    return [] as UserRole[];
  }

  try {
    return JSON.parse(raw) as UserRole[];
  } catch {
    return [] as UserRole[];
  }
})();
const storedUserId = sessionStorage.getItem('userId');
const storedRefreshToken = sessionStorage.getItem('refreshToken');

const initialState: AuthState = {
  isAuthenticated: Boolean(storedAccessToken),
  fullName: storedFullName,
  roles: storedRoles,
  accessToken: storedAccessToken,
  refreshToken: storedRefreshToken,
  userId: storedUserId || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        fullName: string;
        roles: UserRole[];
        accessToken: string;
        refreshToken?: string | null;
        userId: string | null;
      }>
    ) => {
      const { fullName, roles, accessToken, refreshToken, userId } = action.payload;
      state.isAuthenticated = true;
      state.fullName = fullName;
      state.roles = roles;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken ?? null;
      state.userId = userId;

      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('fullName', fullName);
      sessionStorage.setItem('roles', JSON.stringify(roles));
      sessionStorage.setItem('userId', userId ?? '');

      if (refreshToken) {
        sessionStorage.setItem('refreshToken', refreshToken);
      } else {
        sessionStorage.removeItem('refreshToken');
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.fullName = '';
      state.roles = [];
      state.accessToken = null;
      state.refreshToken = null;
      state.userId = null;

      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      sessionStorage.removeItem('fullName');
      sessionStorage.removeItem('roles');
      sessionStorage.removeItem('userId');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
