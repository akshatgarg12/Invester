import {Portfolio} from './portfolio'
import {Investment} from './investment'
import { PortfolioPageProps } from '../components/Pages/Portfolio';
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