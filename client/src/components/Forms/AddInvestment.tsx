import {useState} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button , Select, MenuItem, Container} from '@material-ui/core';
import {InvestmentType, InvestmentDetails, Investment} from '../../util/investment'
import { useParams } from 'react-router';
import { PortfolioReducerAction, usePortfolio } from '../../context/PortfolioContextProvider';
import { updatePortfolioData } from '../../util/custom';
import { Currency } from '../../util/currency';
import AddStockForm from './AddStock';
import AddMutualFundForm from './AddMutualFund';
import AddCryptoForm from './AddCrypto';
import { currencies } from '../../constant';


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
        minWidth: "40%"
      },
    },
    submitBtn : {
      width:"80%",
      margin:"5px auto"
    }
  }),
);

export interface AddInvestmentFormProps {
  closeModal :  () => any
}
 
const AddInvestmentForm: React.FC<AddInvestmentFormProps> = ({closeModal}) => {
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
    shop : "",
    currency : Currency.INR
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
      closeModal()
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
          {
            type === InvestmentType.STOCKS && 
            <AddStockForm
              handleChange = {handleChange}
              currencies = {currencies}
              data = {data}
            />
          }
          {
            type === InvestmentType.MUTUALFUNDS && 
            <AddMutualFundForm 
              handleChange = {handleChange}
              currencies = {currencies}
              data = {data}
            />
          }
          {
            type === InvestmentType.CRYPTO &&
             <AddCryptoForm
              handleChange = {handleChange}
              currencies = {currencies}
              data = {data}
             />
          }
          <Button type="submit" color="primary" variant="outlined" className={classes.submitBtn} disabled = {loading} >
            Add
          </Button>
      </form>  
    </Container>
  );
}
 
export default AddInvestmentForm;
