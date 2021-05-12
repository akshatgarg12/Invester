import {useAuth} from '../../context/AuthContextProvider'
import { Container } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { User } from '../../util/user';
import  { PortfolioCardProps } from '../PortfolioCard';
import PortfolioContainer from '../PortfolioContainer';
import { Portfolio } from '../../util/portfolio';
import Button from '@material-ui/core/Button'
export interface DashboardProps {
  
}
 
const Dashboard: React.FC<DashboardProps> = () => {
  const {user} = useAuth()
  const [portfolios, setPortfolios] = useState<Array<PortfolioCardProps>>([])
  const [loading, setLoading] = useState<boolean>(false)
  const portfolio = new Portfolio(undefined)
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
      <Button onClick = {()=>{
        // testing the function
        portfolio.create(user.email, "test")
      }}>Add</Button>
      <PortfolioContainer portfolios={portfolios} />
    </Container>
  );
}
 
export default Dashboard;