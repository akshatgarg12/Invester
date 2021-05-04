 import {useEffect} from 'react'
import { useHistory } from 'react-router'
import { useAuth } from '../../context/AuthContextProvider'

 const PortfolioPage: React.FC<any> = (props) => {
  const index = parseInt(props?.match?.params?.id)
  const {user} = useAuth()
  const history = useHistory()
  if(isNaN(index) || index < 0) history.push('/')

  useEffect(()=> {
    // create a function to take index and email of user and return the portfolio info.
    if(user){
      console.log(user.email)
    }
  }, [user])

  return (
    <div>
      <h4>Portfolio Number {index} of user {user.displayName}</h4>
    </div>
  );
}
 
export default PortfolioPage;