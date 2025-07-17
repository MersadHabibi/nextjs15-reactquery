import { getCookie } from "@/lib/server-utils";
import { buildUrlWithQuery } from "./api-config";

// Server-side fetch wrapper with authentication
export async function serverFetch<T>(
  path: string,
  options: RequestInit = {},
  params?: Record<string, string | number | undefined>,
): Promise<T> {
  const accessToken = await getCookie("accessToken");
  const url = buildUrlWithQuery(path, params);

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Server-side API methods
export const serverApi = {
  get: <T>(
    path: string,
    params?: Record<string, string | number | undefined>,
  ) => serverFetch<T>(path, { method: "GET" }, params),

  post: <T>(path: string, data?: any) =>
    serverFetch<T>(path, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  put: <T>(path: string, data?: any) =>
    serverFetch<T>(path, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  patch: <T>(path: string, data?: any) =>
    serverFetch<T>(path, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: <T>(path: string) =>
    serverFetch<T>(path, {
      method: "DELETE",
    }),
};
