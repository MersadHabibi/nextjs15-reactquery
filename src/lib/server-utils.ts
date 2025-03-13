"use server";

import { cookies } from "next/headers";
import { cache } from "react";

export async function setCookie(
  key: string,
  value: string,
  httpOnly: boolean = true,
  secure: boolean = true,
) {
  (await cookies()).set(key, value, {
    httpOnly,
    secure,
    maxAge: 60 * 60 * 24 * 365 * 100,
    path: "/",
  });
}

export async function removeCookie(key: string) {
  (await cookies()).delete(key);
}

export const getCookie = cache(async (key: string) => {
  return (await cookies()).get(key)?.value;
});
