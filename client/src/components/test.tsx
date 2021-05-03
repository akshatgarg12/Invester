import {loginWithGoogle, logout} from '../util/auth'
import {useAuth} from '../context/AuthContextProvider'
import {getUserData} from '../util/user'
import {useEffect} from 'react'

export interface TestComponentProps {
  
}
 
const TestComponent: React.FC<TestComponentProps> = () => {
  const {user} = useAuth()
  useEffect(()=>{
    console.log(user)
    if(!user){
      console.log("user not logged in");
    }
    else{
      getUserData(user?.email)
    }
  },[user])

  return (
    <div>
      <h1>Invester</h1>
      <button onClick={loginWithGoogle}>signin</button>
      <button onClick={logout}>logout</button>
    </div>
  );
}
 
export default TestComponent;