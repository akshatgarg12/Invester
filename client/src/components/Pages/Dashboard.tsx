// import {useAuth} from '../../context/AuthContextProvider'
import { Container } from '@material-ui/core';
import  { PortfolioCardProps } from '../PortfolioCard';
import PortfolioContainer from '../PortfolioContainer';

export interface DashboardProps {
  
}
 
const Dashboard: React.FC<DashboardProps> = () => {
  // use this user to call for data from firebase, get the protfolios and basic user info.
  // const {user} = useAuth()
 
  const portfolios : Array <PortfolioCardProps> = [
    {
      index : 1,
      name : "Main",
      investment :{
        crypto : 10,
        stocks : 12,
        mutualFunds : 3
      },
      totalValue: 2211100,
      createdAt: new Date().toLocaleDateString()
    },
    {
      index : 2,
      name : "Practise",
      investment :{
        crypto : 10,
        stocks : 12,
        mutualFunds : 3
      },
      totalValue: 2211100,
      createdAt: new Date().toLocaleDateString()
    },
    {
      index : 3,
      name : "Experiment",
      investment :{
        crypto : 10,
        stocks : 12,
        mutualFunds : 3
      },
      totalValue: 2211100,
      createdAt: new Date().toLocaleDateString()
    }
  ]
  return (  
    <Container>
      <PortfolioContainer portfolios={portfolios} />
    </Container>
  );
}
 
export default Dashboard;