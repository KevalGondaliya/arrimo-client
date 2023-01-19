import Link from "next/link";
import { Button } from "antd";
import { useRouter } from "next/router";
import { logOutUser } from "@/store/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { getLocalStorageValue } from "@/utils/localStorage";

import styles from "./index.module.scss";

export default function Header() {
  const token = getLocalStorageValue();
  const router = useRouter();
  const dispatch = useDispatch();
  const userRole = useSelector((state: any) => state.user.logInUserData);
  const loader = useSelector((state: any) => state.user.isLoading);
  const handleOnClear = () => {
    localStorage.clear();
    dispatch(logOutUser());
    router.push({
      pathname: "/",
    });
  };

  return (
    <div className={styles.headerMain}>
      <div className={styles.headerComponent}>
        {userRole.role === "admin" && <Link href="/user">User</Link>}
        <Link
          className={router.pathname == "/dashboard" ? "active" : ""}
          href="/calander"
        >
          Calander
        </Link>
      </div>
      {token && (
        <>
          <div className={styles.userName}>
            {" "}
            {userRole && `${userRole?.firstName} ${userRole.lastName}`}
          </div>
          <div>
            <Button loading={loader} onClick={handleOnClear}>
              LogOut
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
