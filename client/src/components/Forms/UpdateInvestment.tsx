import {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Button} from '@material-ui/core';
import { usePortfolio } from '../../context/PortfolioContextProvider';
import { updatePortfolioData} from '../../util/custom';
import { Investment, UpdateInvestmentData } from '../../util/investment';
import { InvestmentCardProps } from '../InvestmentCard';
import { PortfolioReducerAction } from '../../context/PortfolioContextProvider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box:{
      width:"100%",
      maxWidth:"400px",
      margin:"auto",
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      textAlign:"center"
    },
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
    submitBtn : {
      width:"80%",
      margin:"10px auto"
    }
  }),
);

export interface UpdateInvestmentFormProps {
  closeModal : () => any
  initialData : InvestmentCardProps
}
 
const UpdateInvestmentForm: React.FC<UpdateInvestmentFormProps> = ({closeModal, initialData}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<UpdateInvestmentData>({
    averageBuyPrice : initialData.averageBuyPrice,
    units : initialData.units
  });
  const handleChange = (e: React.ChangeEvent<any>) => {
    setFormData({...formData, [e.target.name] : e.target.value})
  };
  const investment = new Investment()
  const {data, dispatch} = usePortfolio()
  const submitHandler = async (e:any) => {
    e.preventDefault()
    try{
      setLoading(true)
      const {id, type} = initialData
      const updatedDocId = await investment.update(id,type,formData);
      if(updatedDocId){
        const updatedData = await updatePortfolioData(type,data,updatedDocId,"UPDATE")
        dispatch({type : PortfolioReducerAction.SET, payload : updatedData})
      } 
    }catch(e){ 
      console.log(e)
    }finally{
      setLoading(false)
      closeModal()
    }
  }
  return (
    <Box className={classes.box}>
      <form className={classes.root} noValidate={false} autoComplete="off" onSubmit={submitHandler}>  
           <TextField
              id="name"
              label="name"
              helperText="name of the commodity"
              name="name"
              inputProps={{type:'string'}}
              value = {initialData.name}
              required
              disabled
           />
          <TextField
            id="average-buy-price"
            label="average buy price"
            helperText="average of buy price"
            name="averageBuyPrice"
            inputProps={{type:'numeric'}}
            onChange={handleChange}
            value = {formData.averageBuyPrice}
            required
          />
           <TextField
            id="units"
            label="updated units"
            helperText="units you bought"
            name="units"
            inputProps={{type:'numeric'}}
            onChange={handleChange}
            value = {formData.units}
            required
          />
          <Button type="submit" color="primary" variant="outlined" className={classes.submitBtn} disabled = {loading} >
            Update
          </Button>
      </form>
    </Box>
  );
}
 
export default UpdateInvestmentForm;
