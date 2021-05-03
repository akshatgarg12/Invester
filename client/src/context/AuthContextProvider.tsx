import {createContext, useContext, useEffect, useState} from 'react'
import {auth} from '../config/firebase'

const AuthContext: React.Context<any> = createContext(null)

export const useAuth = () => useContext(AuthContext)

const AuthContextProvider: React.FC<any> = ({children}) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  
  useEffect(()=>{
    auth.onAuthStateChanged((u) => {
      if(u){
        const {displayName, email} = u
        setUser({displayName, email})
      }else{
        setUser(null)
      }
      console.log(u);
      setLoading(false)
      // console.log(user)
    })
  }, [])

  if(loading){
    return <h6>loading...</h6>
  }
  return (
    <AuthContext.Provider value={{user}}>
      {children}
    </AuthContext.Provider>

  );
}
 
export default AuthContextProvider;