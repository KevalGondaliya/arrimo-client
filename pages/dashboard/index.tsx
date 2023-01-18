
import Header from "../../component/header";


interface ILayoutProps {
  children : React.ReactNode
}

const Dashboard: React.FC<ILayoutProps> = ({children}) => {
  
  return(
    <div>
     <Header/>
      {children}
    </div>
  ) ;
};

export default Dashboard;
