import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { usePortfolioStats } from "../../context/PortfolioStatsProvider";
import LoadingPage from "../Pages/Loading";
export interface InvestmentInfoProps {
  
}

const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
});
const InvestmentInfo: React.FC<InvestmentInfoProps> = () => {
  
  const {data : stats} = usePortfolioStats()

  const classes = useStyles();

  if(!stats) return <LoadingPage />

  const rows = [
    stats.overall,
    stats.stocks,
    stats.cryptoCurrencies,
    stats.mutualFunds
  ]

  // if no investment don't show this component
  if(!stats?.overall?.invested){
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
            <TableCell align="right">Net</TableCell>
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
              <TableCell align="right">{(Number(row.current) - Number(row.invested)).toFixed(2)}</TableCell>
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