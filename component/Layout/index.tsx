
import Header from "../header";

interface ILayoutProps {
  children : React.ReactNode
}

const Layout: React.FC<ILayoutProps> = ({children}) => {
  return(
    <div>
      <Header/>
      {children}
    </div>
  ) ;
};

export default Layout;
