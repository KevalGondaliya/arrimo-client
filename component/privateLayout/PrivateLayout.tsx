import React, { useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import { getLocalStorageValue } from "@/utils/localStorage";

interface ILayoutProps {
  children: React.ReactNode;
}

export const PrivateLayout: React.FC<ILayoutProps> = ({ children }) => {
  const token = getLocalStorageValue();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token]);

  return <Fragment>{children}</Fragment>;
};
