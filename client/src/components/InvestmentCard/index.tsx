import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Box, IconButton } from '@material-ui/core';
import { RenderCardInfo } from '../PortfolioCard';
import { DeleteOutline } from '@material-ui/icons';
import { Investment, InvestmentType } from '../../util/investment';
import { useParams } from 'react-router';
import ConfirmDeleteModal from '../Modals/ConfirmDelete';
import { updatePortfolioData } from '../../util/custom';
import { PortfolioReducerAction, usePortfolio } from '../../context/PortfolioContextProvider';
import { useCurrency } from '../../context/CurrencyContextProvider';


export interface InvestmentCardProps {
  id : string
  symbol : string
  name : string
  averageBuyPrice : number
  currentPrice : number
  units : number
  type : InvestmentType 
}
 
const useStyles = makeStyles({
  root: {
    maxWidth : "300px",
    width :"100%",
    borderRadius:"20px",
    margin : "5px"
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

const InvestmentCard: React.FC<InvestmentCardProps> = ({id, symbol, name, averageBuyPrice, currentPrice, units, type}) => {
  const {id:portfolioId}:any = useParams()
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const {currency, rate} = useCurrency()
  const {data:initialData, dispatch} = usePortfolio()
  const investment = new Investment(currency, rate)
  const handleClose = async (response : "CONFIRM" | "CANCEL") => {
    try{
      setLoading(true)
      if(response === "CONFIRM"){
        const deleteId = await investment.delete(id,portfolioId,type)
        if(deleteId){
          const updatedData = await updatePortfolioData(type, initialData,deleteId, "DELETE",currency, rate)
          if(updatedData){
            dispatch({type:PortfolioReducerAction.SET, payload: updatedData})
          }
        }
      }
    }catch(e){
      console.log(e)
    }finally{
      setOpen(false);
      setLoading(false)
    }
  };
  const changePercentage = ((currentPrice - averageBuyPrice)/averageBuyPrice)*100
  const changeClass:string = changePercentage > 0 ? classes.gain : classes.loss
  return (
    <>
    <ConfirmDeleteModal 
      loading = {loading}
      open = {open}
      handleClose = {handleClose}
    />
    <Card className={classes.root}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography className={classes.title} color="textPrimary" gutterBottom>
            {symbol}
          </Typography>
          <Typography className={`${classes.title} ${changeClass}`} gutterBottom>
           {/* Calculate gain/loss */}
           {changePercentage > 0 && "+" }
            {changePercentage.toFixed(2)} %
          </Typography>
        </Box>
        <Typography className={classes.pos} color="textSecondary">
          {name}
        </Typography>
        <RenderCardInfo 
          title = "average buy price"
          value = {(1*averageBuyPrice).toFixed(2)}
        />
        <RenderCardInfo 
          title = "current price"
          value = {(1*currentPrice).toFixed(2)}
        />
        <RenderCardInfo 
          title = "units"
          value = {units}
        />
         <RenderCardInfo 
          title = "investment value"
          value = {(units * averageBuyPrice).toFixed(2)}
        />
      </CardContent>
      <CardActions>
        <IconButton onClick = {()=>{
          handleOpen()
        }}>
          {/* investment.delete(id,portfolioId,type) */}
          <DeleteOutline />
        </IconButton>
      </CardActions>
    </Card>
    </>
  );
}
 
export default InvestmentCard;



