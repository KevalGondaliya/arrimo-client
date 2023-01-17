import Link from "next/link";
import { Layout } from "antd";
import { useState } from "react";

import UserTable from '../../pages/table/index'
import UserCalander from '../../pages/calander/index';

import styles from "./index.module.scss";

const { Header, Content } = Layout;

export default function Navbar() {

  const [pages, setPages] = useState(<UserTable />);
   
const HandleUserClick = () => {
  setPages(<UserTable/>)
}
const HandleCalanderClick = () => {
  setPages(<UserCalander/>)
}


  return (
    <div>
      <Layout>
        <Header className={styles.headerComponent}>
          <Link  href="" onClick={()=>HandleUserClick()}>User</Link>
          <Link href="" onClick={()=>HandleCalanderClick()}>Calander</Link>
        </Header>
        <Content className={styles.mainContant} >
         {pages}
      </Content>
      </Layout>
    </div>
  );
}
