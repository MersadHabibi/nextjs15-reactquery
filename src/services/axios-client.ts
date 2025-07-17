import { getCookie } from "@/lib/server-utils";
import {
  type TEditProfile,
  type TForgetPassword,
  type TLogin,
  type TSendOtp,
} from "@/types/client/auth/types";
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { API_CONFIG, buildUrlWithQuery } from "./api-config";

// Token cache for client-side
let accessTokenCache: string | null = null;
let isTokenBeingFetched = false;
let tokenPromise: Promise<string | null> | null = null;

// Function to get token (from cache or server)
const getAccessToken = async (): Promise<string | null> => {
  // Return from cache if available
  if (accessTokenCache) {
    return accessTokenCache;
  }

  // If a fetch is already in progress, wait for it
  if (isTokenBeingFetched && tokenPromise) {
    return tokenPromise;
  }

  // Start new fetch
  isTokenBeingFetched = true;
  tokenPromise = new Promise<string | null>(async (resolve) => {
    try {
      const token = await getCookie("accessToken");
      accessTokenCache = token ?? null;
      resolve(accessTokenCache);
    } catch (error) {
      console.error("Error fetching token:", error);
      resolve(null);
    } finally {
      isTokenBeingFetched = false;
    }
  });

  return tokenPromise;
};

// Default configuration for axios
const axiosConfig: AxiosRequestConfig = {
  baseURL: API_CONFIG.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 30000, // Default timeout
};

// Create axios instance
const axiosClient: AxiosInstance = axios.create(axiosConfig);

// Request interceptor
axiosClient.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loops
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // Handle 401 (Unauthorized) - Token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Clear token cache
        accessTokenCache = null;

        // Request new access token
        const response = await axios.post(
          buildUrlWithQuery(API_CONFIG.endpoints.client.IAM.refreshToken),
          {
            refresh_token: await getCookie("refreshToken"),
          },
        );

        if (response.status < 300) {
          // Update token cache if response contains token
          if (response.data?.accessToken) {
            accessTokenCache = response.data.accessToken;
          } else {
            // Fetch fresh token from cookie after refresh
            const newToken = await getCookie("accessToken");
            accessTokenCache = newToken ?? null;
          }

          // Retry original request with new token
          return axiosClient(originalRequest);
        }
      } catch (refreshError) {
        // If refresh token is invalid, logout user
        accessTokenCache = null;
        // await removeCookie("refreshToken");
        // await removeCookie("accessToken");

        if (typeof window !== "undefined") {
          // window.location.reload();
        }

        return Promise.reject(refreshError);
      }
    }

    // Handle 403 (Forbidden) - No permissions
    if (error.response?.status === 403) {
      accessTokenCache = null;
      // await removeCookie("refreshToken");
      // await removeCookie("accessToken");

      if (typeof window !== "undefined") {
        // window.location.reload();
      }
    }

    return Promise.reject(error);
  },
);

// Helper functions
export const handleQueries = (
  queries: Record<string, string | number | boolean | undefined>,
) => {
  return Object.entries(queries)
    .filter(([_, value]) => value?.toString())
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    )
    .join("&");
};

// Function to manually update token cache (call this after login)
export const updateTokenCache = (token: string) => {
  accessTokenCache = token;
};

// Function to clear token cache (call this on logout)
export const clearTokenCache = () => {
  accessTokenCache = null;
};

// Export instance and API methods
export default axiosClient;

// Common API methods with axios
export const apiService = {
  get: <T>(
    url: string,
    params?: Record<string, string | number | undefined>,
  ): Promise<AxiosResponse<T>> => {
    return axiosClient.get(buildUrlWithQuery(url, params));
  },

  post: <T>(url: string, data?: any): Promise<AxiosResponse<T>> => {
    return axiosClient.post(buildUrlWithQuery(url), data);
  },

  put: <T>(url: string, data?: any): Promise<AxiosResponse<T>> => {
    return axiosClient.put(buildUrlWithQuery(url), data);
  },

  patch: <T>(url: string, data?: any): Promise<AxiosResponse<T>> => {
    return axiosClient.patch(buildUrlWithQuery(url), data);
  },

  delete: <T>(url: string): Promise<AxiosResponse<T>> => {
    return axiosClient.delete(buildUrlWithQuery(url));
  },
};

// API endpoints
export const api = {
  admin: {},
  client: {
    IAM: {
      refreshToken: async () =>
        apiService.post(API_CONFIG.endpoints.client.IAM.refreshToken, {
          refresh_token: await getCookie("refreshToken"),
        }),
      sendOtp: (data: TSendOtp) =>
        apiService.post(API_CONFIG.endpoints.client.IAM.sendOtp, data),
      login: (data: TLogin) =>
        apiService.post(API_CONFIG.endpoints.client.IAM.login, data),
      forgetPassword: (data: TForgetPassword) =>
        apiService.post(API_CONFIG.endpoints.client.IAM.forgetPassword, data),
      editProfile: (data: TEditProfile) =>
        apiService.put(API_CONFIG.endpoints.client.IAM.userEditProfile, data),
      getUserInfo: () =>
        apiService.get(API_CONFIG.endpoints.client.IAM.userGetInfo),
    },
  },
  // Additional API endpoints can be added here
};
