import {useAuth} from '../../context/AuthContextProvider'
import {UserDataReducerActions, useUser} from '../../context/UserContextProvider'
import { Container } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { User } from '../../util/user';
import PortfolioContainer from '../PortfolioContainer';
import { Portfolio } from '../../util/portfolio';
import Button from '@material-ui/core/Button'
export interface DashboardProps {
  
}
 
const Dashboard: React.FC<DashboardProps> = () => {
  const {user} = useAuth()
  const [loading, setLoading] = useState<boolean>(false)
  const portfolio = new Portfolio(undefined)
  const {dispatch}  = useUser()
  useEffect(() => {
    if(!user) return
    const callData = async () => {
      try{
        const currentUser = new User(user.email)
        setLoading(true)
        const d = await currentUser.getData()
        dispatch({type : UserDataReducerActions.SET, payload : d})
      }
      catch(e){
        // handle error here
        console.log(e)
      }
      finally{
        setLoading(false)
      }
    }
    callData()
  }, [user, dispatch])
  if(loading) return <h4>Loading...</h4>

  return (  
    <Container>
      <Button onClick = {()=>{
        // testing the function
        portfolio.create(user.email, "test")
      }}>Add</Button>
      <PortfolioContainer  />
    </Container>
  );
}
 
export default Dashboard;