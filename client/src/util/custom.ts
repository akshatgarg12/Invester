import {Portfolio} from './portfolio'
import {Investment, InvestmentType} from './investment'
import { PortfolioPageProps } from '../components/Pages/Portfolio';
import { InvestmentData } from '../components/Investments';


export const asyncForEach = async (array:Array<any>, callback: any)  => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}


export const getPortfolioData = async (id:string) => {
  try{
    const portfolio = new Portfolio(id)
    const investment = new Investment()
    const d:PortfolioPageProps = await portfolio.get()
    const {stocks, cryptoCurrencies, mutualFunds} = d
    const x:any = await investment.getAll(stocks, cryptoCurrencies, mutualFunds)
    return x
  }catch(e){
    console.log(e)
    throw e
  }
}

export const updatePortfolioData = async (toUpdateType : InvestmentType, initialData: InvestmentData, updateId : string, action : "ADD" | "DELETE" | "UPDATE") => {
  try{
    if(action === "ADD"){
      const investment = new Investment()
      const x:any = await investment.get([updateId], toUpdateType)
      const updatedData = initialData[toUpdateType]
      updatedData.unshift(x[0])
      return {
        ...initialData,
        [toUpdateType] : updatedData
      }
    }
    if(action === "DELETE"){
      const updatedData = initialData[toUpdateType].filter((data) => data.id !== updateId)
      return {
        ...initialData,
        [toUpdateType] : updatedData
      }
    }
    if(action === "UPDATE"){
      const investment = new Investment()
      const x:any = await investment.get([updateId], toUpdateType)
      const updatedData = initialData[toUpdateType].filter((data) => data.id !== updateId)
      updatedData.unshift(x[0])
      return {
        ...initialData,
        [toUpdateType] : updatedData
      }
    }
  }catch(e){
    console.log(e)
    throw e
  }
}

export const updateUserData = async (initialData : any, id : string, action : "ADD" | "DELETE") => {
  if(action === "ADD"){
    const portfolio = new Portfolio(id)
    const d:PortfolioPageProps = await portfolio.get()
    const p: any = {
      id,
      name : d.name,
      createdAt : new Date(d.createdAt.seconds*1000).toLocaleDateString(),
      investment : {
        crypto:d.cryptoCurrencies.length,
        stocks : d.stocks.length, 
        mutualFunds: d.mutualFunds.length 
      }
    }
    return [
      ...initialData,
       p
    ]
  }
  if(action === "DELETE"){
    const updatedData = initialData.filter((d:any) =>  d.id !== id)
    return updatedData
  }

}