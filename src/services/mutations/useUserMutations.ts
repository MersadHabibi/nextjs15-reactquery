import { useMutation } from "@tanstack/react-query";

export default function useUsersMutation() {
  const createUser = useMutation({
    // mutationKey: ["category", "create", type],
    // mutationFn: async (props: TCreateCategory) => {
    //   try {
    //     const res = await FCreateCategory({ data: props, type });
    //     if (!res.ok) {
    //       if (res.status === 500) throw new Error(JSON.stringify(res));
    //       const data = (await res.json()) as {
    //         message: string;
    //         details: string;
    //       };
    //       if (data.message || data.details)
    //         toast.error(data.message || data.details);
    //       console.log(data);
    //       return null;
    //     }
    //     const data = (await res.json()) as { message: string };
    //     toast.success(data.message);
    //     return data;
    //   } catch (error) {
    //     toast.error(`${error}`);
    //     return null;
    //   }
    // },
  });

  return { createUser };
}
