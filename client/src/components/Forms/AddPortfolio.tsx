import {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Button} from '@material-ui/core';
import { Portfolio } from '../../util/portfolio';
import { useAuth } from '../../context/AuthContextProvider';
import { UserDataReducerActions, useUser } from '../../context/UserContextProvider';
import { User } from '../../util/user';

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

export interface AddPortfolioFormProps {
  closeModal : () => any
}
 
const AddPortfolioForm: React.FC<AddPortfolioFormProps> = ({closeModal}) => {
  const classes = useStyles();
  const {dispatch} = useUser()
  const {user} = useAuth()
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>("")
  const handleChange = (event: React.ChangeEvent<any>) => {
    setName(event.target.value)
  };
  const portfolio = new Portfolio(undefined)
  const userObj = new User(user.uid)
  const submitHandler = async (e:any) => {
    e.preventDefault()
    try{
      setLoading(true)
      const id = await portfolio.create(user.uid,name)
      console.log(id);
      const updatedData = await userObj.getData()
      if(updatedData){
        dispatch({type : UserDataReducerActions.SET, payload : updatedData})
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
            id="name-of-portfolio"
            label="name"
            helperText="name of portfolio"
            name="name"
            type="string"
            onChange={handleChange}
            value = {name}
            required
          />
          <Button type="submit" color="primary" variant="outlined" className={classes.submitBtn} disabled = {loading} >
            Add
          </Button>
      </form>
    </Box>
  );
}
 
export default AddPortfolioForm;
