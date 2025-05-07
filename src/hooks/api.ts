export function handleQueries(
  queries: Record<string, string | number | undefined>,
) {
  return Object.entries(queries)
    ?.map(([key, value]) => {
      if (value)
        return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
    })
    .join("&");
}

export async function FRequestNewAccessTokenWithRefreshToken() {
  return await fetch(
    process.env.baseUrl +
      "/api/v1/admin/iam/requestNewAccessTokenWithRefreshToken",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );
}
