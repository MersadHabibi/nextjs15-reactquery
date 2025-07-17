import { clearTokenCache } from "@/services/axios-client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { removeCookie } from "./server-utils";

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

/**
 * Extracts error message from API error response
 * @param error - The caught error object
 * @param shouldLog - Whether to log the error to console (default: false)
 * @returns The error message string to display
 */
export const handleApiError = (
  error: unknown,
  shouldLog: boolean = false,
): string => {
  // Check if error is an object with response data
  if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    error.response &&
    typeof error.response === "object" &&
    "data" in error.response
  ) {
    const errorData = error.response.data;

    // Log the error data if requested
    if (shouldLog) {
      console.log(errorData);
    }

    if (errorData && typeof errorData === "object") {
      // Try to extract message or details from error response
      if ("message" in errorData && typeof errorData.message === "string") {
        return errorData.message;
      } else if (
        "details" in errorData &&
        typeof errorData.details === "string"
      ) {
        return errorData.details;
      }
    }
  }

  // Fallback to generic error message
  return `${"مشکلی پیش آمده است"}`;
};

export const logout = async () => {
  await removeCookie("accessToken");
  await removeCookie("refreshToken");
  clearTokenCache();
  window.location.reload();
};

export const convertToEnglishNumbers = (str: string) => {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  const englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  let result = str.toString();

  for (let i = 0; i < 10; i++) {
    const regex = new RegExp(persianNumbers[i] + "|" + arabicNumbers[i], "g");
    result = result.replace(regex, englishNumbers[i]);
  }

  return result;
};

// Helper function to format number with thousand separators
export const formatNumber = (value: string) => {
  // Remove any non-digit characters except decimal point
  const cleanValue = value.replace(/[^\d.]/g, "");

  // Split number into integer and decimal parts
  const [integerPart, decimalPart] = cleanValue.split(".");

  // Add thousand separators to integer part
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Return formatted number with decimal part if it exists
  return decimalPart !== undefined
    ? `${formattedInteger}.${decimalPart}`
    : formattedInteger;
};
