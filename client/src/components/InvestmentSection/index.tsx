import { Container } from "@material-ui/core";
import InvestmentCard, {InvestmentCardProps} from "../InvestmentCard";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

export interface InvestmentSectionProps {
  data : Array<InvestmentCardProps>
}
const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    width:"100%",
    margin:"auto",
  }
}),
);
const InvestmentSection: React.FC<InvestmentSectionProps> = ({data}) => {
  const classes = useStyles(); 
  console.log(data)
  return (
    // create a card component which will take values and will render here.
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
              />
          )
        })
      }
      </Grid>
      
    </Container>
  );
}
 
export default InvestmentSection;