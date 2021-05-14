import {createContext, useContext, useEffect, useMemo, useState} from 'react'
import LoadingPage from '../components/Pages/Loading'
import { Auth } from '../util/auth'

const AuthContext: React.Context<any> = createContext(null)

export const useAuth = () => useContext(AuthContext)

const AuthContextProvider: React.FC<any> = ({children}) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const auth = useMemo(()=> new Auth(), [])
  useEffect(()=>{
    const callback = (u:any) => {
        if(u){
          const {uid, displayName, email, photoURL} = u
          setUser({uid, displayName, email, photoURL})
        }else{
          setUser(null)
        }
        setLoading(false)
      }
      auth.currentUser(callback)  
  },[auth])

  if(loading){
    return <LoadingPage />
  }
  return (
    <AuthContext.Provider value={{user}}>
      {children}
    </AuthContext.Provider>

  );
}
 
export default AuthContextProvider;