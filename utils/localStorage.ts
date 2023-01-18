import { ACCESS_TOKEN } from "@/utils/Constant";

export const setLocalStorageValue = (data: string) => {
  localStorage.setItem(ACCESS_TOKEN, data);
};

export const getLocalStorageValue = () => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(ACCESS_TOKEN);
    return item;
  }
  return null;
};
