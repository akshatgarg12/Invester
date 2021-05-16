import React from 'react';
import {useEffect, useState} from 'react'
import { useHistory } from 'react-router'
import { usePortfolio , PortfolioReducerAction} from '../../context/PortfolioContextProvider';
import { getPortfolioData } from '../../util/custom';
import Investments from '../Investments';
import LoadingPage from './Loading';


export interface PortfolioPageProps{
    name: string;
    createdAt: any;
    stocks: string[];
    cryptoCurrencies: string[];
    mutualFunds: string[];
  }

 const PortfolioPage: React.FC<any> = (props) => {
  const id = props?.match?.params?.id
  const history = useHistory() 
  const {data, dispatch} = usePortfolio();
  const [loading, setLoading] = useState<boolean>(false) 
  useEffect(()=> {
    // create a function to take index and email of user and return the portfolio info.
    const callData = async  () => {
      try{
       setLoading(true)
       const d:any = await getPortfolioData(id)
       dispatch({type : PortfolioReducerAction.SET, payload : d})
      }
      catch(e){
        console.log(e)
        history.push('/')
      }finally{
        setLoading(false)
      }
    }
    callData()
  }, [id, dispatch, history])

  if(loading || !data){
    return <LoadingPage />
  }  
  return (
    <div>
     <Investments />
    </div>
  );
}
 
export default PortfolioPage;
