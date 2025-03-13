"use client"; // Ensure this runs on the client side

// import CryptoJS from "crypto-js";

// function encrypt(data) {
//   return CryptoJS.AES.encrypt(data, process.env.localSecretKey).toString();
// }

// function decrypt(data) {
//   try {
//     const bytes = CryptoJS.AES.decrypt(data, process.env.localSecretKey);
//     return bytes.toString(CryptoJS.enc.Utf8);
//   } catch (error) {
//     console.error("Decryption failed:", error);
//     return null;
//   }
// }

// function hashKey(key) {
//   return CryptoJS.SHA256(key).toString();
// }

// export function localStorageSetItem(key: string, value: string) {
//   if (typeof window !== "undefined") {
//     localStorage.setItem(hashKey(key), encrypt(value));
//   }
// }

// export function localStorageGetItem(key: string) {
//   if (typeof window !== "undefined") {
//     const encryptedValue = localStorage.getItem(hashKey(key));
//     return encryptedValue ? decrypt(encryptedValue) : null;
//   }
//   return null;
// }

// export function localStorageRemoveItem(key: string) {
//   if (typeof window !== "undefined") {
//     localStorage.removeItem(hashKey(key));
//   }
// }

export function localStorageSetItem(key: string, value: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
}

export function localStorageGetItem(key: string) {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null;
}

export function localStorageRemoveItem(key: string) {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
}

