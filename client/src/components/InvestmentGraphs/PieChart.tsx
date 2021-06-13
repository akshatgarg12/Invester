import { Pie } from 'react-chartjs-2';
import { usePortfolioStats } from '../../context/PortfolioStatsProvider';

const PieChart = ():JSX.Element | null => {
   const {data: stats} = usePortfolioStats()
   if(!stats?.overall?.invested) return null
   const data = {
    labels: ['stocks', 'crypto-currency', 'mutual-funds'],
    datasets: [
      {
        label: 'Investment Value',
        data: [stats.stocks.invested, stats.cryptoCurrencies.invested, stats.mutualFunds.invested],
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