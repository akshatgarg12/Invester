import { PortfolioCardProps } from '../../components/PortfolioCard'
import {database} from '../../config/firebase'
import {asyncForEach} from '../custom'

// current user get from context api
export class User{
  uid : string
  constructor(uid : string){
    this.uid = uid
  }
  async getData(){
    try{
      if(!this.uid){
        throw new Error("Provide an ID")
      }
      const portfolios:Array<PortfolioCardProps> = []
      const db = await database.collection('users').doc(this.uid).get();
      const user = db.data()
      const userPortfolios =  user ? user.portfolios : []
  
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
  async delete(){
    console.log("delete user account and data")
  }
  async update(){
    console.log("update user account and data")
  }
}
