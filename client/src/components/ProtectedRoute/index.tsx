import {Route, useHistory} from 'react-router-dom'
import {useAuth} from '../../context/AuthContextProvider'

export interface ProtectedRouteProps {
  component : React.ComponentType<any>
  path : string
}
 
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({component, path}) => {
  const {user} = useAuth() 
  const history = useHistory()
  if(!user){
    console.log("redirect to login")
    history.replace("/auth")
    return <h1>Login please</h1>
  }
  return (
   <Route path={path} component = {component} />
  );
}
 
export default ProtectedRoute;