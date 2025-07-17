import { type TUserInfoResponse } from "@/types/client/auth/types";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { api } from "@/services/axios-client";
import { handleApiError } from "@/lib/utils";

export function useUserInfo() {
  const userInfo = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      try {
        const res = await api.client.IAM.getUserInfo();

        if (res.status >= 400) {
          if (res.status === 500) throw new Error(JSON.stringify(res));
          const data = res.data as {
            message: string;
            details: string;
          };
          if (data.message || data.details)
            toast.error(data.message || data.details);
          console.log(data);
          return null;
        }

        const data = res.data as TUserInfoResponse;

        return data;
      } catch (error) {
        toast.error(handleApiError(error, true));

        return null;
      }
    },
  });

  return {
    userInfo,
  };
}
