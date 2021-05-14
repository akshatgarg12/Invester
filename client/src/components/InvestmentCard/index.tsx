import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Box, Collapse, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StorefrontTwoToneIcon from '@material-ui/icons/StorefrontTwoTone';
import LocalMallTwoToneIcon from '@material-ui/icons/LocalMallTwoTone';
import { RenderCardInfo } from '../PortfolioCard';
import { DeleteOutline } from '@material-ui/icons';
import { Investment, InvestmentType } from '../../util/investment';
import { useParams } from 'react-router';
import ConfirmDeleteModal from '../Modals/ConfirmDelete';
import { updatePortfolioData } from '../../util/custom';
import { PortfolioReducerAction, usePortfolio } from '../../context/PortfolioContextProvider';
import { useCurrency } from '../../context/CurrencyContextProvider';
import { Currency } from '../../util/currency';


export interface InvestmentCardProps {
  id : string
  symbol : string
  name : string
  averageBuyPrice : number
  currentPrice : number
  units : number
  type : InvestmentType,
  currency ?: Currency,
  market : string,
  shop : string 
}
 
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
  root: {
    maxWidth : "350px",
    width :"100%",
    borderRadius:"20px",
    margin : "5px"
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  center:{
    width:"100%",
    background : "skyblue",
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
  },
  expandOpen: {
    transform: 'rotate(180deg)',
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
}));

const InvestmentCard: React.FC<InvestmentCardProps> = ({id, symbol, name, averageBuyPrice, currentPrice, units, type, currency, market, shop}) => {
  const {id:portfolioId}:any = useParams()
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const {currency: globalCurrency, rate} = useCurrency()

  let abp:number = averageBuyPrice
  let cp:number = currentPrice
  if(globalCurrency !== currency){
    abp = abp*rate
    cp  = cp*rate
  }
  const {data:initialData, dispatch} = usePortfolio()
  const investment = new Investment()
  const handleClose = async (response : "CONFIRM" | "CANCEL") => {
    try{
      setLoading(true)
      if(response === "CONFIRM"){
        const deleteId = await investment.delete(id,portfolioId,type)
        if(deleteId){
          const updatedData = await updatePortfolioData(type, initialData,deleteId, "DELETE")
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
          value = {(1*abp).toFixed(2)}
        />
        <RenderCardInfo 
          title = "current price"
          value = {(1*cp).toFixed(2)}
        />
        <RenderCardInfo 
          title = "units"
          value = {units}
        />
         <RenderCardInfo 
          title = "investment value"
          value = {(units * abp).toFixed(2)}
        />
      </CardContent>
      <CardActions>
          <IconButton onClick = {()=>{
            handleOpen()
          }}>
            {/* investment.delete(id,portfolioId,type) */}
            <DeleteOutline />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit className={classes.center}>
        <Button variant="text" 
          startIcon={<StorefrontTwoToneIcon />}
        >{market}</Button>
        <Button variant="text" 
          startIcon={<LocalMallTwoToneIcon />}
          >{shop}</Button>
      </Collapse>
      
    </Card>
    </>
  );
}
 
export default InvestmentCard;



