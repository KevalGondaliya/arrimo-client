
import Header from "../header";
import {getUserToken} from "@/utils/localStorage"

interface ILayoutProps {
  children : React.ReactNode
}

const Layout: React.FC<ILayoutProps> = ({children}) => {
  const token = getUserToken();
  return(
    <div>
      
     {<Header/>}
      
      {children}
    </div>
  ) ;
};

export default Layout;
