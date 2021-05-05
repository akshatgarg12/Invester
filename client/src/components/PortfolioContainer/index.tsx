import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PortfolioCard, {PortfolioCardProps} from '../PortfolioCard';



export interface PortfolioContainerProps {
  portfolios : Array<PortfolioCardProps>
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth:"100%",
      margin:"auto",
      paddingTop:"20px",
      paddingBottom:"20px",
      minHeight:"90vh"
    }
  }),
);
const PortfolioContainer: React.FC<PortfolioContainerProps> = ({portfolios}) => {
  const classes = useStyles();
  return (
    // <Grid item xs={12} lg={12}>
      <Grid container justify="center" spacing={3} className={classes.root}>
        {portfolios.map((portfolio) => (
          <Grid key={portfolio.index} item>
            <PortfolioCard
              id = {portfolio.id}
              index = {portfolio.index}
              name = {portfolio.name}
              createdAt = {portfolio.createdAt}
              investment ={portfolio.investment}
              totalValue = {portfolio.totalValue}
            />
          </Grid>
        ))}
      </Grid>
  // </Grid>
  );
}
 
export default PortfolioContainer;
