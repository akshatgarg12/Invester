import {useAuth} from '../../context/AuthContextProvider'
import {logout} from '../../util/auth'

export interface DashboardProps {
  
}
 
const Dashboard: React.FC<DashboardProps> = () => {
  const {user} = useAuth()

  return (  
    <div>
      <h1>Hello {user.displayName}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
 
export default Dashboard;