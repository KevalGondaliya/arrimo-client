import { ACCESS_TOKEN } from "./Constant";

// For Set Token In LocalStorage
export const setLocalStorageValue = (data: string) => {
  localStorage.setItem(ACCESS_TOKEN, data);
};

// For Get Token In LocalStorage
export const getLocalStorageValue = () => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(ACCESS_TOKEN);
    return item;
  }
  return null;
};
