import { handleApiError } from "@/lib/utils";
import { api } from "@/services/axios-client";
import {
  type TEditProfile,
  type TEditProfileResponse,
} from "@/types/client/auth/types";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useEditUserInfo() {
  const editProfile = useMutation({
    mutationKey: ["auth", "editProfile"],
    mutationFn: async (props: TEditProfile) => {
      try {
        const res = await api.client.IAM.editProfile(props);
        if (res.status >= 400) {
          if (res.status === 500) throw new Error(JSON.stringify(res));
          const data = (await res.data) as {
            message: string;
            details: string;
          };
          if (data.message || data.details)
            toast.error(data.message || data.details);
          console.log(data);
          return null;
        }

        const data = (await res.data) as TEditProfileResponse;

        toast.success(data.message);
        return data;
      } catch (error: unknown) {
        toast.error(handleApiError(error, true));
        return null;
      }
    },
  });

  return { editProfile };
}
