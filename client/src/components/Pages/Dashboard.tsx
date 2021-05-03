// import {useAuth} from '../../context/AuthContextProvider'
import Navbar from '../Navbar';

export interface DashboardProps {
  
}
 
const Dashboard: React.FC<DashboardProps> = () => {
  // use this user to call for data from firebase, get the protfolios and basic user info.
  // const {user} = useAuth()
  return (  
    <div>
      <Navbar
        name = "Akshat Garg"
        displayImg = "https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_960_720.png"
      />
    </div>
  );
}
 
export default Dashboard;