import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { removeCookie, setCookie } from "./server-utils";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function srcToFile(
  url: string,
  fileName: string = "file",
): Promise<File | undefined> {
  try {
    // Fetch the file from the URL
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    // Get content type from headers with proper fallback
    let contentType = response.headers.get("content-type");

    // If no content type is provided, try to infer from file extension
    if (!contentType) {
      const extension = fileName.split(".").pop()?.toLowerCase();
      const mimeTypes: Record<string, string> = {
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        gif: "image/gif",
        webp: "image/webp",
        // Add more mime types as needed
      };
      contentType = extension
        ? mimeTypes[extension] || "application/octet-stream"
        : "application/octet-stream";
    }

    const blob = await response.blob();

    // Create a new File object with the determined content type
    const file = new File([blob], `${fileName}.${contentType.split("/")[1]}`, {
      type: contentType,
    });

    return file;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]; // Copy array to avoid mutation
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }
  return shuffled;
}

export function userFullName(firstName?: string, lastName?: string) {
  return (
    (firstName || "") + ((firstName || lastName) && " ") + (lastName || "") ||
    ""
  );
}

export function isVideo(file) {
  return file && file.type?.startsWith("video/");
}

export function removeOrigin(url: string) {
  try {
    const urlObj = new URL(url);
    const path = urlObj.pathname + urlObj.search + urlObj.hash;
    return decodeURIComponent(path.startsWith("/") ? path.substring(1) : path);
  } catch (error) {
    console.error("Invalid URL:", error);
    return decodeURIComponent(url); // Return original URL if invalid
  }
}

export function isFile(value: unknown): value is File {
  return value instanceof File;
}

export function rgbaToHex(r: number, g: number, b: number, a: number): string {
  const toHex = (value: number) => value?.toString(16).padStart(2, "0");
  const alpha = a < 1 ? toHex(Math.round(a * 255)) : "";
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${alpha}`;
}

export const isOnlyNumbers = (str: string): boolean => {
  return /^\d+$/.test(str);
};

// Helper function to remove formatting
export const unFormatNumber = (value: string) => {
  return value?.replace(/,/g, "");
};

export const removeDuplicates = (arr: number[]): number[] =>
  Array.from(new Set(arr));

export const remainingDate = (targetDate: Date) => {
  const now = new Date();
  const timeDiff = targetDate.getTime() - now.getTime();

  if (timeDiff <= 0) return { number: 0, key: "" };

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    return { number: days + 1, label: "روز", key: "day" };
  } else if (hours > 0) {
    return { number: hours + 1, label: "ساعت", key: "hour" };
  } else {
    return { number: minutes + 1, label: "دقیقه", key: "min" };
  }
};
