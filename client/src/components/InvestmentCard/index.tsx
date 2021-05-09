import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Box, IconButton } from '@material-ui/core';
import { RenderCardInfo } from '../PortfolioCard';
import { DeleteOutline } from '@material-ui/icons';


export interface InvestmentCardProps {
  id : string
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
  },
  loss : {
    color:"red"
  },
  gain : {
    color:"green"
  }
});

const InvestmentCard: React.FC<InvestmentCardProps> = ({id, symbol, name, averageBuyPrice, currentPrice, units}) => {
  const classes = useStyles();
  const changePercentage = ((currentPrice - averageBuyPrice)/averageBuyPrice)*100
  const changeClass:string = changePercentage > 0 ? classes.gain : classes.loss
  return (
    <Card className={classes.root}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography className={classes.title} color="textPrimary" gutterBottom>
            {symbol}
          </Typography>
          <Typography className={`${classes.title} ${changeClass}`} gutterBottom>
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
        <IconButton onClick = {() => console.log("id : ", id)}>
          <DeleteOutline />
        </IconButton>
      </CardActions>
    </Card>
  );
}
 
export default InvestmentCard;



