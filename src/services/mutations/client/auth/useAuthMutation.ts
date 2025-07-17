import { handleApiError } from "@/lib/utils";
import { api } from "@/services/axios-client";
import {
  type TForgetPassword,
  type TForgetPasswordResponse,
  type TLogin,
  type TLoginResponse,
  type TSendOtp,
  type TSendOtpResponse,
} from "@/types/client/auth/types";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useAuthMutation() {
  const sendOtp = useMutation({
    mutationKey: ["auth", "sendOtp"],
    mutationFn: async (props: TSendOtp) => {
      try {
        const res = await api.client.IAM.sendOtp(props);
        if (res.status >= 400) {
          if (res.status === 500) throw new Error(JSON.stringify(res));
          const data = (await res.data) as {
            message: string;
            details: string;
          };
          console.log(data);
          if (data.message || data.details)
            toast.error(data.message || data.details);
          return null;
        }
        const data = (await res.data) as TSendOtpResponse;
        toast.success(data.message);
        return data;
      } catch (error: unknown) {
        toast.error(handleApiError(error, true));
        return null;
      }
    },
  });

  const login = useMutation({
    mutationKey: ["auth", "login"],
    mutationFn: async (props: TLogin) => {
      try {
        const res = await api.client.IAM.login(props);
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
        const data = (await res.data) as TLoginResponse;
        toast.success(data.message);
        return data;
      } catch (error: unknown) {
        toast.error(handleApiError(error, true));
        return null;
      }
    },
  });

  const forgetPassword = useMutation({
    mutationKey: ["auth", "forgetPassword"],
    mutationFn: async (props: TForgetPassword) => {
      try {
        const res = await api.client.IAM.forgetPassword(props);
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
        const data = (await res.data) as TForgetPasswordResponse;
        toast.success(data.message);
        return data;
      } catch (error: unknown) {
        toast.error(handleApiError(error, true));
        return null;
      }
    },
  });

  return { sendOtp, login, forgetPassword };
}
