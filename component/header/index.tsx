import Link from "next/link";
import { Button } from "antd";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getLocalStorageValue } from "@/utils/localStorage";

import styles from "./index.module.scss";

export default function Header() {
  const token = getLocalStorageValue();
  const router = useRouter();
  const userRole = useSelector((state: any) => state.user.logInUserData.role);

  const handleOnClear = () => {
    localStorage.clear();
    router.push({
      pathname: "/",
    });
  };

  return (
    <div className={styles.headerMain}>
      <div className={styles.headerComponent}>
        {userRole === "admin" && <Link href="/user">User</Link>}
        <Link
          className={router.pathname == "/dashboard" ? "active" : ""}
          href="/calander"
        >
          Calander
        </Link>
      </div>
      {token && (
        <div>
          <Button onClick={handleOnClear}>LogOut</Button>
        </div>
      )}
    </div>
  );
}
