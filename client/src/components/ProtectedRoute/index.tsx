import {Route, useHistory} from 'react-router-dom'
import {useAuth} from '../../context/AuthContextProvider'

export interface ProtectedRouteProps {
  component : React.ComponentType<any>
  path : string
  exact : boolean
}
 
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({component, path, exact=true}) => {
  const {user} = useAuth() 
  const history = useHistory()
  if(!user){
    console.log("redirect to login")
    history.replace("/auth")
    return null
  }
  return (
   <Route path={path} exact={exact} component = {component} />
  );
}
 
export default ProtectedRoute;