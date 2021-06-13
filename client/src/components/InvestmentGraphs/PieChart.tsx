import { Pie } from 'react-chartjs-2';
import { useCurrency } from '../../context/CurrencyContextProvider';
import { usePortfolio } from '../../context/PortfolioContextProvider';
import { InvestmentType } from '../../util/investment';

const PieChart = ():JSX.Element => {
   const {data: investments} = usePortfolio()
   const {currency, rate} = useCurrency()
   const getInvestmentValue = (type : InvestmentType) => {
     const total = investments[type].map((s:any) => {
         let value = s.averageBuyPrice*s.units
         if(currency !== s.currency) value *= rate
         return value
      }).reduce((a:number,b:number) => a+b);
     return total.toFixed(2)
   }
   const stocksInvestmentPrice = getInvestmentValue(InvestmentType.STOCKS)
   const cryptoInvestmentPrice = getInvestmentValue(InvestmentType.CRYPTO)
   const mutualFundInvestmentPrice = getInvestmentValue(InvestmentType.MUTUALFUNDS)
   const data = {
    labels: ['stocks', 'crypto-currency', 'mutual-funds'],
    datasets: [
      {
        label: 'Investment Value',
        data: [stocksInvestmentPrice, cryptoInvestmentPrice, mutualFundInvestmentPrice],
        backgroundColor: [
          '#118ab2',
          '#ffd166',
          '#06d6a0',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
   return(
     <div style = {{maxWidth:'300px', margin:'auto'}}>
      <Pie type="pie" data={data} />  
     </div>
   );
}

export default PieChart;