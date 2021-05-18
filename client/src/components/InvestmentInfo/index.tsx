import { useCurrency } from "../../context/CurrencyContextProvider";
import { usePortfolio } from "../../context/PortfolioContextProvider";
import { Currency } from "../../util/currency";
import { InvestmentType } from "../../util/investment";
import { InvestmentData } from "../Investments";
import { InvestmentCardProps } from "../InvestmentCard";

import Typography from '@material-ui/core/Typography'
import { RenderCardInfo } from "../PortfolioCard";

export interface InvestmentInfoProps {
  
}


const InvestmentInfo: React.FC<InvestmentInfoProps> = () => {

  const {data}:{data : InvestmentData} = usePortfolio()
  const {currency:globalCurrency, rate} = useCurrency()

  const getTotalValue = (type : InvestmentType) => {
    let ttl : number = 0;
    data[type].forEach((s : InvestmentCardProps) => {
      if(s.currency  === globalCurrency){
          ttl += s.currentPrice * s.units;
      }else{
        ttl += s.currentPrice*rate * s.units;
      }
    })
    return ttl;
  }

  let stocksValue : number = getTotalValue(InvestmentType.STOCKS)
  let cryptoValue : number = getTotalValue(InvestmentType.CRYPTO)
  let mutualFundsValue : number = getTotalValue(InvestmentType.MUTUALFUNDS);
  let totalValue : number = stocksValue + cryptoValue + mutualFundsValue
  return ( 
    <>
      <RenderCardInfo 
        title = "total value"
        value = {totalValue.toFixed(2)}
      />
      <RenderCardInfo 
        title = "stocks value"
        value = {stocksValue.toFixed(2)}
      />
      <RenderCardInfo 
        title = "crypto value"
        value = {cryptoValue.toFixed(2)}
      />
      <RenderCardInfo 
        title = "mutual funds value"
        value = {mutualFundsValue.toFixed(2)}
      />
    </>
  );
}
 
export default InvestmentInfo;