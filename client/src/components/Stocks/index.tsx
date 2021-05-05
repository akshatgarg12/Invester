import { Container } from "@material-ui/core";
import InvestmentCard, {InvestmentCardProps} from "../InvestmentCard";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

export interface StocksProps {
  
}
const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    width:"100%",
    margin:"auto",
  }
}),
);
const Stocks: React.FC<StocksProps> = () => {
  const classes = useStyles();

  const stocks:Array<InvestmentCardProps> = [
    {
      symbol:"WIPRO",
      name : "wipro pvt ltd",
      averageBuyPrice:425,
      currentPrice:442,
      units:10
    },
    {
      symbol:"BTC",
      name : "Bitcoin",
      averageBuyPrice:4421031,
      currentPrice:4223221,
      units:0.00082
    },
    {
      symbol:"ICICI prudential growth direct plan",
      name : "ICICI",
      averageBuyPrice:117.84,
      currentPrice:117.46,
      units:8.486
    },
    {
      symbol:"WIPRO",
      name : "wipro pvt ltd",
      averageBuyPrice:425,
      currentPrice:442,
      units:10
    },
    {
      symbol:"BTC",
      name : "Bitcoin",
      averageBuyPrice:4421031,
      currentPrice:4223221,
      units:0.00082
    },
    {
      symbol:"ICICI prudential growth direct plan",
      name : "ICICI",
      averageBuyPrice:117.84,
      currentPrice:117.46,
      units:8.486
    }
  ]
  return (
    // create a card component which will take values and will render here.
    <Container>
       <Grid container justify="center" spacing={1} className={classes.root}>
       {
        stocks.map((s:InvestmentCardProps, index : number) => {
          const {name, symbol, averageBuyPrice, currentPrice, units} = s
          return (
              <InvestmentCard
                key={index} 
                name={name}
                symbol={symbol}
                averageBuyPrice={averageBuyPrice}
                currentPrice={currentPrice}
                units={units}
              />
          )
        })
      }
      </Grid>
      
    </Container>
  );
}
 
export default Stocks;