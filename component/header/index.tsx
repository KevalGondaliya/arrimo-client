import Link from "next/link";
import { Button } from "antd";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
import {getUserToken} from "@/utils/localStorage"
import { PrivateLayout } from "@/privateLayout/PrivateLayout";

export default function Header() {
  const token = getUserToken();
  const router = useRouter();
  const handleOnClear = () => {
    localStorage.clear()
    router.push({
      pathname: "/",
    });
  }
  return (
    <PrivateLayout> 
    <div className={styles.headerMain}>
      <div className={styles.headerComponent}>
        <Link  href="/table">User</Link>
        <Link href="/calander">Calander</Link> 
      </div>
      {token && (
        <div>
          <Button onClick={handleOnClear}>LogOut</Button>
        </div>
      )}
    </div>
    </PrivateLayout>
  );
}
