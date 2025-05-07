import { type TGetUserInfo } from "@/types/api.types";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { api } from "../axios-client";

export function useUser() {
  const user = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const res = await api.auth.getUserInfo();

        if (res.status >= 400) {
          // if (res.status === 500) throw new Error(JSON.stringify(res));
          const data = res.data as {
            message: string;
            details: string;
          };
          if (data.message || data.details)
            toast.error(data.message || data.details);
          console.log(data);
          return null;
        }

        const data = res.data as TGetUserInfo;

        return data;
      } catch (error) {
        toast.error(`${error}`);

        return null;
      }
    },
  });

  return {
    user,
  };
}
