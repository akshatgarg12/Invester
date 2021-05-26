import { useCurrency } from "../../context/CurrencyContextProvider";
import { usePortfolio } from "../../context/PortfolioContextProvider";
import { InvestmentType } from "../../util/investment";
import { InvestmentData } from "../Investments";
import { InvestmentCardProps } from "../InvestmentCard";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
export interface InvestmentInfoProps {
  
}

const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
});
const InvestmentInfo: React.FC<InvestmentInfoProps> = () => {

  const {data}:{data : InvestmentData} = usePortfolio()
  const {currency:globalCurrency, rate} = useCurrency()

  const getTotalCurrentValue = (type : InvestmentType) => {
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
  const getTotalInvestedValue = (type : InvestmentType) => {
    let ttl : number = 0;
    data[type].forEach((s : InvestmentCardProps) => {
      if(s.currency  === globalCurrency){
          ttl += s.averageBuyPrice * s.units;
      }else{
        ttl += s.averageBuyPrice*rate * s.units;
      }
    })
    return ttl;
  }
  const stocksInvestedValue : number = getTotalInvestedValue(InvestmentType.STOCKS)
  const stocksCurrentValue : number = getTotalCurrentValue(InvestmentType.STOCKS)
  const cryptoInvestedValue : number = getTotalInvestedValue(InvestmentType.CRYPTO)
  const cryptoCurrentValue : number = getTotalCurrentValue(InvestmentType.CRYPTO)
  const mutualFundsInvestedValue : number = getTotalInvestedValue(InvestmentType.MUTUALFUNDS)
  const mutualFundsCurrentValue : number = getTotalCurrentValue(InvestmentType.MUTUALFUNDS)
  const totalInvestedValue : number = stocksInvestedValue + cryptoInvestedValue + mutualFundsInvestedValue
  const totalCurrentValue : number = stocksCurrentValue + cryptoCurrentValue + mutualFundsCurrentValue
  const Change = ({invested, current}:{invested:number, current:number}) => (((current - invested)/invested)*100).toFixed(2);
  const classes = useStyles();
  const rows = [
    {
      name : "Total",
      invested : totalInvestedValue.toFixed(2),
      current : totalCurrentValue.toFixed(2),
      change : Change({invested : totalInvestedValue, current : totalCurrentValue}),
    },
    {
      name : "Stocks",
      invested : stocksInvestedValue.toFixed(2),
      current : stocksCurrentValue.toFixed(2),
      change : Change({invested : stocksInvestedValue, current : stocksCurrentValue}),
    },
    {
      name : "Crypto Currency",
      invested : cryptoInvestedValue.toFixed(2),
      current : cryptoCurrentValue.toFixed(2),
      change : Change({invested : cryptoInvestedValue, current : cryptoCurrentValue})
    },
    {
      name : "Mutual Funds",
      invested : mutualFundsInvestedValue.toFixed(2),
      current : mutualFundsCurrentValue.toFixed(2),
      change : Change({invested : mutualFundsInvestedValue, current : mutualFundsCurrentValue})
    }
  ]
  // if no investment don't show this component
  if(!data?.stocks?.length && !data?.cryptoCurrencies?.length && !data?.mutualFunds?.length){
    return null;
  } 

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{background:"#F1F1F1"}}>
          <TableRow>
            <TableCell>Values</TableCell>
            <TableCell align="right">Invested</TableCell>
            <TableCell align="right">Current</TableCell>
            <TableCell align="right">Change</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            if(isNaN(Number(row.change))) return null;
            const inProfit = Number(row.change) >= 0
            return  (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.invested}</TableCell>
              <TableCell align="right">{row.current}</TableCell>
              <TableCell align="right" style={{color: inProfit ? "green" : "red"}}>{row.change}</TableCell>
            </TableRow>
            )
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
 
export default InvestmentInfo;