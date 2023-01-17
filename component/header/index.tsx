import Link from "next/link";

import styles from "./index.module.scss";


export default function Header() {
  return (
    <div className={styles.headerComponent}>
      <Link href="/table" >User</Link>
      <Link href="/calander" >Calander</Link>
    </div>
  );
}
