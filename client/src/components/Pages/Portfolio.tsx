 import {useEffect} from 'react'
import { useHistory } from 'react-router'
import { useAuth } from '../../context/AuthContextProvider'
import { getPortfolioData } from '../../util/portfolio'

 const PortfolioPage: React.FC<any> = (props) => {
  const id = props?.match?.params?.id
  const {user} = useAuth()
  const history = useHistory()

  useEffect(()=> {
    // create a function to take index and email of user and return the portfolio info.
    const callData = async  () => {
      try{
       await getPortfolioData(id)
      }
      catch(e){
        console.log(e)
        history.push('/')
      }
    }
    callData()
  }, [id, history])

  return (
    <div>
      <h4>Portfolio Number {id} of user {user.displayName}</h4>
    </div>
  );
}
 
export default PortfolioPage;