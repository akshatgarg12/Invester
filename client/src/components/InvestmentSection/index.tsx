import { Container } from "@material-ui/core";
import InvestmentCard, {InvestmentCardProps} from "../InvestmentCard";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { InvestmentType } from "../../util/investment";
import { usePortfolio } from "../../context/PortfolioContextProvider";

export interface InvestmentSectionProps {
  type : InvestmentType
}
const useStyles = makeStyles((theme: Theme) =>
createStyles({
  container: {
    height : "70vh",
    overflowY:"scroll",
    scrollbarWidth:"thin"
  },
  root: {
    width:"100%",
    margin:"auto",
  }
}),
);
const InvestmentSection: React.FC<InvestmentSectionProps> = ({type}) => {
  const classes = useStyles(); 
  const {data} = usePortfolio() 

  return (
    // create a card component which will take values and will render here.
    <div>
    <Container className={classes.container}>
       <Grid container justify="center" spacing={1} className={classes.root}>
       {
        data[type].map((s:InvestmentCardProps, index : number) => {
          const {id, name, symbol, averageBuyPrice, currentPrice, units, currency, market, shop} = s
          return (
              <InvestmentCard
                id = {id}
                key={index} 
                name={name}
                symbol={symbol}
                averageBuyPrice={averageBuyPrice}
                currentPrice={currentPrice}
                units={units}
                type = {type}
                currency ={currency}
                market = {market}
                shop = {shop}
              />
          )
        })
      }
      </Grid>
    </Container>
    </div>
  );
}
 
export default InvestmentSection;