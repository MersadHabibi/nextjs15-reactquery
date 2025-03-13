import { useQuery } from "@tanstack/react-query";

export default function useUsers({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
}) {
  const users = useQuery({
    queryKey: ["users", page, limit],
    queryFn: async () => {
      // try {
      //   const res = await FGetUserList({ page, limit });
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
      //   const data = (await res.json()) as TGetUserList;
      //   return data;
      // } catch {
      //   toast.error("مشکلی پیش آمده!");
      //   return null;
      // }
    },
  });

  return { users };
}
