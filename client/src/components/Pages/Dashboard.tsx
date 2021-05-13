import {useAuth} from '../../context/AuthContextProvider'
import {UserDataReducerActions, useUser} from '../../context/UserContextProvider'
import { Container } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { User } from '../../util/user';
import PortfolioContainer from '../PortfolioContainer';
import Button from '@material-ui/core/Button'
import AddPortfolioModal from '../Modals/AddPortfolio';
export interface DashboardProps {
  
}
 
const Dashboard: React.FC<DashboardProps> = () => {
  const {user} = useAuth()
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState(false)

  const {dispatch}  = useUser()
  useEffect(() => {
    if(!user) return
    const callData = async () => {
      try{
        const currentUser = new User(user.uid)
        setLoading(true)
        const d = await currentUser.getData()
        dispatch({type : UserDataReducerActions.SET, payload : d})
      }
      catch(e){
        // handle error here
        console.log(e)
      }
      finally{
        setLoading(false)
      }
    }
    callData()
  }, [user, dispatch])
  

  if(loading) return <h4>Loading...</h4>

  return (  
    <>
      <AddPortfolioModal
        open ={open}
        handleClose={() => {setOpen(false)}}
        loading= {false}
      />
      <Container>
        <Button 
        style={{marginTop:"10px"}}
        variant="outlined"
        color="primary"
        onClick = {()=>{
          setOpen(true)
        }}>Add a portfolio</Button>
        <PortfolioContainer  />
      </Container>
    </>
  );
}
 
export default Dashboard;