import React from 'react';
import {useEffect, useState} from 'react'
import { useHistory } from 'react-router'
import {getPortfolioData } from '../../util/portfolio'
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
       
      //  await Promise.all([getStocks(d.stocks), getMutualFunds(d.mutualFunds), getCryptoCurrencies(d.cryptoCurrencies)]).then((data) => {
      //     console.log(data)
      //  })
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
     <Investments
        stocks = {data.stocks}
        mutualFunds = {data.mutualFunds}
        cryptoCurrencies = {data.cryptoCurrencies}
     />
    </div>
  );
}
 
export default PortfolioPage;
