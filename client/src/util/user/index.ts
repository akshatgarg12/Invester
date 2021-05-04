import { PortfolioCardProps } from '../../components/PortfolioCard'
import {database} from '../../config/firebase'
import {asyncForEach} from '../custom'



// current user get from context api
export const getUserData = async (email : string) => {
  try{
    const portfolios:Array<PortfolioCardProps> = []
    const db = await database.collection('/users').where("email","==", email).get();
    const user = db.docs[0].data()
    const userPortfolios =  user.portfolios

    await asyncForEach(userPortfolios, async (portfolio:any, index:number) => {
     const snap = await portfolio.get()
     const data = snap.data()
     const {name, totalValue, createdAt} = data
     const p: PortfolioCardProps = {
       id : portfolio.id,
       index,
       name,
       totalValue,
       createdAt : new Date(createdAt.seconds*1000).toLocaleDateString(),
       investment : {
         crypto:data.cryptoCurrencies.length,
         stocks : data.stocks.length, 
         mutualFunds: data.mutualFunds.length 
       }
     }
     portfolios.push(p);
    })
    return portfolios
  }catch(e){
    console.log("error while fetching user data : ", e)
    throw e
  }
}

