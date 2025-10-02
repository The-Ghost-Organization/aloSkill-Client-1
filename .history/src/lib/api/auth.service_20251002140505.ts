// lib/api/auth.service.ts

import { tokenManager, type UserData } from "../auth/token";
import { apiClient } from "./client";

// === INTERFACES ===
export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  role?: "STUDENT" | "INSTRUCTOR";
  bio?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: UserData;
  accessToken: string;
  refreshToken: string;
}

export interface VerifyEmailPayload {
  id: string;
  token: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  id: string;
  token: string;
  oldPassword: string;
  newPassword: string;
}

// === AUTH SERVICE ===
export const authService = {
  // Register new user
  async register(payload: RegisterPayload) {
    const response = await apiClient.post<AuthResponse>("/auth/register", payload);

    if (response.success && response.data) {
      // Store tokens and user data
      tokenManager.setAuth(
        response.data.accessToken,
        response.data.refreshToken,
        response.data.user
      );
    }

    return response;
  },

  // Login user
  async login(payload: LoginPayload) {
    const response = await apiClient.post<AuthResponse>("/auth/login", payload);

    if (response.success && response.data) {
      // Store tokens and user data
      tokenManager.setAuth(
        response.data.accessToken,
        response.data.refreshToken,
        response.data.user
      );
    }

    return response;
  },

  // Google OAuth login
  async googleAuth(payload: {
    googleId: string;
    email: string;
    firstName: string;
    lastName: string;
    profilePicture?: string;
  }) {
    const response = await apiClient.post<AuthResponse>("/auth/google", payload);

    if (response.success && response.data) {
      tokenManager.setAuth(
        response.data.accessToken,
        response.data.refreshToken,
        response.data.user
      );
    }

    return response;
  },

  // Logout
  async logout() {
    const refreshToken = tokenManager.getRefreshToken();

    if (refreshToken) {
      // Call backend to invalidate token
      await apiClient.post("/auth/logout", { refreshToken });
    }

    // Clear local storage
    tokenManager.clearAuth();
  },

  // Logout from all devices
  async logoutAllDevices() {
    const user = tokenManager.getUserData();

    if (user) {
      await apiClient.post("/auth/logout-all", { email: user.email });
    }

    tokenManager.clearAuth();
  },

  // Refresh access token
  async refreshToken() {
    const refreshToken = tokenManager.getRefreshToken();

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await apiClient.post<{
      accessToken: string;
      refreshToken: string;
    }>("/auth/refresh", { refreshToken });

    if (response.success && response.data) {
      tokenManager.setAccessToken(response.data.accessToken);
      tokenManager.setRefreshToken(response.data.refreshToken);
    }

    return response;
  },

  // Verify email
  async verifyEmail(payload: VerifyEmailPayload) {
    const response = await apiClient.post("/auth/verify", {
      body: payload,
    });

    return response;
  },

  // Forgot password
  async forgotPassword(payload: ForgotPasswordPayload) {
    const response = await apiClient.post("/auth/forgot-password", {
      body: payload,
    });

    return response;
  },

  // Reset password
  async resetPassword(payload: ResetPasswordPayload) {
    const response = await apiClient.post(
      `/auth/reset-password?id=${payload.id}&token=${payload.token}`,
      {
        body: {
          oldPassword: payload.oldPassword,
          newPassword: payload.newPassword,
        },
      }
    );

    return response;
  },

  // Get current user (from token)
  getCurrentUser(): UserData | null {
    return tokenManager.getUserData();
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return tokenManager.isAuthenticated();
  },

  // Check if token needs refresh
  needsRefresh(): boolean {
    return tokenManager.needsRefresh();
  },
};
