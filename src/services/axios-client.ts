import { removeCookie } from "@/lib/server-utils";
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

// Default configuration for axios
const axiosConfig: AxiosRequestConfig = {
  baseURL: process.env.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 30000, // Default timeout
};

// Create axios instance
const axiosClient: AxiosInstance = axios.create(axiosConfig);

// Request interceptor
// axiosClient.interceptors.request.use(
//   async (config) => {
//     const accessToken = await getCookie("accessToken");

//     if (accessToken && config.headers) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

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
        // Request new access token
        const response = await axios.get(
          `${process.env.apiUrl}/api/v1/admin/iam/requestNewAccessTokenWithRefreshToken`,
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          },
        );

        if (response.status === 200) {
          // Retry original request with new token
          return axiosClient(originalRequest);
        }
      } catch (refreshError) {
        // If refresh token is invalid, logout user
        await removeCookie("refreshToken");
        await removeCookie("accessToken");

        if (typeof window !== "undefined") {
          window.location.reload();
        }

        return Promise.reject(refreshError);
      }
    }

    // Handle 403 (Forbidden) - No permissions
    if (error.response?.status === 403) {
      await removeCookie("refreshToken");
      await removeCookie("accessToken");

      if (typeof window !== "undefined") {
        window.location.reload();
      }
    }

    return Promise.reject(error);
  },
);

// Helper functions
export const handleQueries = (
  queries: Record<string, string | number | undefined>,
) => {
  return Object.entries(queries)
    .filter(([_, value]) => value)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    )
    .join("&");
};

// Export instance and API methods
export default axiosClient;

// Common API methods with axios
export const apiService = {
  get: <T>(
    url: string,
    params?: Record<string, string | number | undefined>,
  ): Promise<AxiosResponse<T>> => {
    const queryString = params ? `?${handleQueries(params)}` : "";
    return axiosClient.get(`${url}${queryString}`);
  },

  post: <T>(url: string, data?: any): Promise<AxiosResponse<T>> => {
    return axiosClient.post(url, data);
  },

  put: <T>(url: string, data?: any): Promise<AxiosResponse<T>> => {
    return axiosClient.put(url, data);
  },

  patch: <T>(url: string, data?: any): Promise<AxiosResponse<T>> => {
    return axiosClient.patch(url, data);
  },

  delete: <T>(url: string): Promise<AxiosResponse<T>> => {
    return axiosClient.delete(url);
  },
};

// API endpoints
export const api = {
  auth: {
    getUserInfo: () => apiService.get("/api/v1/admin/iam/userInfo"),
    requestNewToken: () =>
      apiService.get("/api/v1/admin/iam/requestNewAccessTokenWithRefreshToken"),
  },
  // Additional API endpoints can be added here
};
