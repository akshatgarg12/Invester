 import {useEffect, useState} from 'react'
import { useHistory } from 'react-router'
import { useAuth } from '../../context/AuthContextProvider'
import { getCryptoCurrencies, getMutualFunds, getPortfolioData, getStocks } from '../../util/portfolio'

export interface PortfolioPageProps{
    name: any;
    createdAt: any;
    totalValue: any;
    stocks: string[];
    cryptoCurrencies: string[];
    mutualFunds: string[];
  }

 const PortfolioPage: React.FC<any> = (props) => {
  const id = props?.match?.params?.id
  const {user} = useAuth()
  const history = useHistory()
  const [data, setData] = useState<PortfolioPageProps | null>(null) 
  const [loading, setLoading] = useState<boolean>(false) 
  useEffect(()=> {
    // create a function to take index and email of user and return the portfolio info.
    const callData = async  () => {
      try{
       setLoading(true)
       const d:PortfolioPageProps = await getPortfolioData(id)
       console.log(d)
       
       await Promise.all([getStocks(d.stocks), getMutualFunds(d.mutualFunds), getCryptoCurrencies(d.cryptoCurrencies)]).then((data) => {
          console.log(data)
       })
       setData(d)
      }
      catch(e){
        console.log(e)
        history.push('/')
      }finally{
        setLoading(false)
      }
    }
    callData()
  }, [id, history])
  if(loading || !data){
    return <h4>Loading...</h4>
  }
  return (
    <div>
      <h4>Portfolio Number {data.name} of user {user.displayName}</h4>
      <h4>Total value : {data.totalValue}</h4>
    </div>
  );
}
 
export default PortfolioPage;