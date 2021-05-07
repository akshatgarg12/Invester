import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { RenderCardInfo } from '../PortfolioCard';


export interface InvestmentCardProps {
  symbol : string
  name : string
  averageBuyPrice : number
  currentPrice : number
  units : number
}
 
const useStyles = makeStyles({
  root: {
    maxWidth : "300px",
    width :"100%",
    borderRadius:"20px",
    margin : "10px"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 18,
    maxWidth: "80%",
    margin: "auto 0"
  },
  info: {
    lineHeight: "1.5"
  },
  pos: {
    margin: "5px 0",
    borderBottom:"1px solid black"
  }
});

const InvestmentCard: React.FC<InvestmentCardProps> = ({symbol, name, averageBuyPrice, currentPrice, units}) => {
  const classes = useStyles();
  const changePercentage = ((currentPrice - averageBuyPrice)/averageBuyPrice)*100
  return (
    <Card className={classes.root}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography className={classes.title} color="textPrimary" gutterBottom>
            {symbol}
          </Typography>
          <Typography className={classes.title} color={changePercentage > 0 ? "primary" : "error"} gutterBottom>
           {/* Calculate gain/loss */}
           {changePercentage > 0 && "+" }
            {changePercentage.toString().substr(0,4)} %
          </Typography>
        </Box>
        <Typography className={classes.pos} color="textSecondary">
          {name}
        </Typography>
        <RenderCardInfo 
          title = "average buy price"
          value = {averageBuyPrice}
        />
        <RenderCardInfo 
          title = "current price"
          value = {currentPrice}
        />
        <RenderCardInfo 
          title = "units"
          value = {units}
        />
         <RenderCardInfo 
          title = "investment value"
          value = {4420}
        />
       
      </CardContent>
      <CardActions>
        <Button size="small">More Info</Button>
      </CardActions>
    </Card>
  );
}
 
export default InvestmentCard;



