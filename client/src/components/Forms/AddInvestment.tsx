import {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button , Select, MenuItem, Container} from '@material-ui/core';
import {InvestmentType, InvestmentDetails, Investment} from '../../util/investment'
import { useParams } from 'react-router';
import { PortfolioReducerAction, usePortfolio } from '../../context/PortfolioContextProvider';
import { updatePortfolioData } from '../../util/custom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box:{
      width:"100%",
      maxWidth:"500px",
      height:"100%",
      textAlign:"center",
      margin:"auto",
      overflow:"hidden"
    },
    root: {
      '& .MuiTextField-root': {
        margin: "2px 10px",
      },
    },
    submitBtn : {
      width:"80%",
      margin:"5px auto"
    }
  }),
);

export interface AddInvestmentFormProps {
  
}
 
const AddInvestmentForm: React.FC<AddInvestmentFormProps> = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {id: portfolioId}:any = useParams()
  const initialData:InvestmentDetails = {
    name : "",
    symbol : "",
    averageBuyPrice : 0,
    units : 0,
    market : "",
    shop : ""
}
  const [data, setData] = useState<InvestmentDetails>(initialData)
  const [type, setType] = useState<InvestmentType>(InvestmentType.STOCKS)
  const {data:collection, dispatch} = usePortfolio()
  const handleChange = (event: React.ChangeEvent<any>) => {
    if(event.target.name === "type"){
      setType(event.target.value)
      setData(initialData)
      return
    }
    setData((prev) => ({
      ...prev, 
      [event?.target?.name] : event.target.value
    }))
  };
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)
  const investment = new Investment()
  const submitHandler = async (e:any) => {
    e.preventDefault()
    console.log(data, type)
    try{
      setLoading(true)
      const id:string|undefined = await investment.create(data, type,portfolioId)
      if(id){
        const updatedData = await updatePortfolioData(type, collection, id, "ADD")
        if(updatedData){
          dispatch({type:PortfolioReducerAction.SET, payload:updatedData})
        }
      }
    }catch(e){ 
      console.log(e)
    }finally{
      setLoading(false)
    }
  }

  return (
    <Container className={classes.box}>
      <Select
            label="Type of investment"
            id="type-of-investment"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={type}
            name = "type"
            onChange={handleChange}
          >
        <MenuItem value={InvestmentType.STOCKS}>Stocks</MenuItem>
        <MenuItem value={InvestmentType.CRYPTO}>Crypto Currency</MenuItem>
        <MenuItem value={InvestmentType.MUTUALFUNDS}>Mutual Funds</MenuItem>
      </Select>
      <form className={classes.root} noValidate={false} autoComplete="off" onSubmit={submitHandler}>  
          <TextField
            id="name-of-investment"
            label="name"
            helperText="name of investment"
            name="name"
            type="string"
            onChange={handleChange}
            value = {data.name}
            required
          />
          <TextField
            id="symbol-of-investment"
            label="symbol"
            helperText="symbol of investment"
            name="symbol"
            type="string"
            onChange={handleChange}
            value = {data.symbol}
            required
          />
          <TextField
            id="averageBuyPrice-of-investment"
            label="average buy price"
            helperText="Average Buy Price"
            name="averageBuyPrice"
            type="number"
            onChange={handleChange}
            value = {data.averageBuyPrice}
            required
          />
          <TextField
            id="units"
            label="units"
            helperText="no of units bought"
            name="units"
            type="number"
            onChange={handleChange}
            value = {data.units}
            required
          />
          <TextField
            id="market"
            label="market"
            helperText="market eg : NSE, NASDAQ"
            name="market"
            type="string"
            onChange={handleChange}
            value = {data.market}
            required
            />
          <TextField
            id="shop"
            label="shop"
            type="string"
            helperText="broker name"
            name="shop"
            onChange={handleChange}
            value = {data.shop}
            required
          />
          <Button type="submit" color="primary" variant="outlined" className={classes.submitBtn} disabled = {loading} >
            Add
          </Button>
      </form>  
    </Container>
  );
}
 
export default AddInvestmentForm;
