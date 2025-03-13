"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useSearchQueries() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const setSearchQuery = useCallback(
    (keys: string[], values: string[]) => {
      const URL = new URLSearchParams(Array.from(searchParams.entries()));

      keys.forEach((key, index) => {
        if (values[index]) {
          URL.set(key, values[index]);
        } else {
          URL.delete(key); // Remove query if value is empty
        }
      });

      const newQuery = URL.toString();
      router.push(newQuery ? `${pathname}?${newQuery}` : pathname);
    },
    [pathname, router, searchParams],
  );

  return setSearchQuery;
}
