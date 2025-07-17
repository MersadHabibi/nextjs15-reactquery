// API Configuration
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  endpoints: {
    admin: {},
    client: {
      IAM: {
        userInfo: "/api/v1/client/iam/auth/userInfo",
        refreshToken:
          "/api/v1/client/iam/requestNewAccessTokenWithRefreshToken",
        sendOtp: "/api/v1/client/iam/auth/sendOTP",
        login: "/api/v1/client/iam/auth/login",
        forgetPassword: "/api/v1/client/iam/auth/forgetPassword",
        userEditProfile: "/api/v1/client/iam/auth/userEditProfile",
        userGetInfo: "/api/v1/client/iam/auth/userGetInfo",
      },
    },

    // Add more endpoint groups here
  },
} as const;

// Helper function to build full URL
export function buildApiUrl(path: string): string {
  return `${API_CONFIG.baseURL}${path}`;
}

// Helper function to handle query parameters
export function buildQueryString(
  params: Record<string, string | number | undefined>,
): string {
  return Object.entries(params)
    .filter(([_, value]) => value)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    )
    .join("&");
}

// Helper function to build URL with query parameters
export function buildUrlWithQuery(
  path: string,
  params?: Record<string, string | number | undefined>,
): string {
  const queryString = params ? `?${buildQueryString(params)}` : "";
  return buildApiUrl(path) + queryString;
}
