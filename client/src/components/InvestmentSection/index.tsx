import { Container } from "@material-ui/core";
import InvestmentCard, {InvestmentCardProps} from "../InvestmentCard";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { AddBoxRounded } from "@material-ui/icons";
import { Investment, InvestmentDetails, InvestmentType } from "../../util/investment";
import { useParams } from "react-router";

export interface InvestmentSectionProps {
  data : Array<InvestmentCardProps>
  type : InvestmentType
}
const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    width:"100%",
    margin:"auto",
  }
}),
);
const InvestmentSection: React.FC<InvestmentSectionProps> = ({data,type}) => {
  const classes = useStyles(); 
  const investment = new Investment()
  const {id}:any = useParams()
  return (
    // create a card component which will take values and will render here.
    <div>
      <IconButton color="primary" onClick = {() => {
        const newInvestment : InvestmentDetails = {
          name : "Adani ports and special",
          symbol : "ADANIPORTS",
          averageBuyPrice : 738,
          units : 5,
          market : "NSE",
          shop : "Groww"
        }
        investment.create(newInvestment, type, id)
      }}>
        <AddBoxRounded />
      </IconButton>
   
    <Container>
       <Grid container justify="center" spacing={1} className={classes.root}>
       {
        data.map((s:InvestmentCardProps, index : number) => {
          const {id, name, symbol, averageBuyPrice, currentPrice, units} = s
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