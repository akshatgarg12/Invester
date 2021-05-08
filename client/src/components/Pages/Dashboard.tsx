import {useAuth} from '../../context/AuthContextProvider'
import { Container } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { User } from '../../util/user';
import  { PortfolioCardProps } from '../PortfolioCard';
import PortfolioContainer from '../PortfolioContainer';

export interface DashboardProps {
  
}
 
const Dashboard: React.FC<DashboardProps> = () => {
  // use this user to call for data from firebase, get the protfolios and basic user info.
  const {user} = useAuth()
  const [portfolios, setPortfolios] = useState<Array<PortfolioCardProps>>([])
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    if(!user) return
    const callData = async () => {
      try{
        const currentUser = new User(user.email)
        setLoading(true)
        const d = await currentUser.getData()
        console.log(d)
        setPortfolios(d)
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
  }, [user])
  if(loading) return <h4>Loading...</h4>

  return (  
    <Container>
      <PortfolioContainer portfolios={portfolios} />
    </Container>
  );
}
 
export default Dashboard;