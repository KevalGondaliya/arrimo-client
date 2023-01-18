
import Header from "../header";
import {getLocalStorageValue} from "@/utils/localStorage"

interface ILayoutProps {
  children : React.ReactNode
}

const Layout: React.FC<ILayoutProps> = ({children}) => {
  const token = getLocalStorageValue();
  return(
    <div>
     <Header/>
      <Dashboard/>
    </div>
  ) ;
};

export default Layout;
