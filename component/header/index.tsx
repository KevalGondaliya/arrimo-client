import Link from "next/link";
import { Button } from "antd";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
import {getLocalStorageValue} from "@/utils/localStorage"
import { PrivateLayout } from "@/privateLayout/PrivateLayout";

export default function Header() {
  const token = getLocalStorageValue();
  const router = useRouter();
  const handleOnClear = () => {
    localStorage.clear()
    router.push({
      pathname: "/",
    });
  }
  return (
   
    <div className={styles.headerMain}>
      <div className={styles.headerComponent}>
        <Link  href="/user">User</Link>
        <Link href="/calander">Calander</Link> 
      </div>
      {token && (
        <div>
          <Button onClick={handleOnClear}>LogOut</Button>
        </div>
      )}
    </div>
   
  );
}
