import React from 'react';
import {useEffect, useState, useMemo} from 'react'
import { useHistory } from 'react-router'
import {Portfolio } from '../../util/portfolio'
import Investments from '../Investments';


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
  const portfolio = useMemo(()=> new Portfolio(id), [id])
  const history = useHistory()
  const [data, setData] = useState<PortfolioPageProps | null>(null) 
  const [loading, setLoading] = useState<boolean>(false) 
  useEffect(()=> {
    // create a function to take index and email of user and return the portfolio info.
    const callData = async  () => {
      try{
       setLoading(true)
       const d:PortfolioPageProps = await portfolio.get()
       console.log(d)
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
  }, [portfolio, history])

  if(loading || !data){
    return <h4>Loading...</h4>
  }  
  return (
    <div>
     <Investments
        stocks = {data.stocks}
        mutualFunds = {data.mutualFunds}
        cryptoCurrencies = {data.cryptoCurrencies}
     />
    </div>
  );
}
 
export default PortfolioPage;
