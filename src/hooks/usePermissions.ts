import { type User } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";

async function fetchUser(): Promise<User> {
  const response = await fetch("/api/user");
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
}

export function usePermissions() {
  const user = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  return {
    user,
  };
}
