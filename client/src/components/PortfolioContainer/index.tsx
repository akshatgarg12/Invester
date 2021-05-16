import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PortfolioCard, {PortfolioCardProps} from '../PortfolioCard';
import { useUser } from '../../context/UserContextProvider';
import { Typography } from '@material-ui/core';
import Hero from '../Hero';



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
    },
    center:{
      margin:"20px auto",
      textAlign:"center"
    }
  }),
);
const PortfolioContainer: React.FC<any> = () => {
  const classes = useStyles();
  const {data : portfolios} = useUser()
  return (
      <Grid container justify="center" spacing={3} className={classes.root}>
        {portfolios && portfolios.length ? portfolios.map((portfolio:PortfolioCardProps) => (
          <Grid key={portfolio.index} item>
            <PortfolioCard
              key = {portfolio.id}
              id = {portfolio.id}
              index = {portfolio.index}
              name = {portfolio.name}
              createdAt = {portfolio.createdAt}
              investment ={portfolio.investment}
              totalValue = {portfolio.totalValue}
            />
          </Grid>
        )) : 
        <div className={classes.center}>
          <Hero />
          <Typography component="h1">Start By Creating a Portfolio!</Typography>
        </div>
        }
        
      </Grid>
  );
}
 
export default PortfolioContainer;
