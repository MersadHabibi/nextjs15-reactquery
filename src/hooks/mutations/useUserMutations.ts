import { useMutation } from "@tanstack/react-query";

export default function useUsersMutation() {
  const adminEditUser = useMutation({
    mutationKey: ["adminEditUser"],
    mutationFn: async () => {
      // try {
      //   const res = await FAdminEditUser(props);
      //   if (!res.ok) {
      //     if (res.status === 500) throw new Error("error");
      //     const data = (await res.json()) as {
      //       message: string;
      //       details: string;
      //     };
      //     toast.error(data.message || data.details);
      //     console.log(data);
      //     return null;
      //   }
      //   const data = (await res.json()) as { message: string };
      //   return data;
      // } catch {
      //   toast.error("مشکلی پیش آمده!");
      //   return null;
      // }
    },
  });

  return { adminEditUser };
}
