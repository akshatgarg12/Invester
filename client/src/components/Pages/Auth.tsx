import {useState} from 'react'

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Hero from '../Hero';
import { Container } from '@material-ui/core';
import {PersonOutline} from '@material-ui/icons';
import {useHistory} from 'react-router-dom'


import {loginWithGoogle} from '../../util/auth'

const AuthPage: React.FC<any> = () => {
  const history = useHistory()
  const [error, setError] = useState<string>("")

  const handleLogin = () => {
      try{
        loginWithGoogle(()=>{
          console.log("push to /")
          history.push('/')
        })
      }catch(e){
        console.log(e)
        setError(e.message)
      }
  }
  return (
    <Container maxWidth="lg">
       <Hero />
       <Box textAlign="center">
          <Button variant="outlined" color="primary" onClick = {handleLogin} fullWidth={false} startIcon={<PersonOutline />}>
              Login with Google 
          </Button>
          <Typography color="error" align="center">{error}</Typography>
       </Box>
    </Container>
  );
}
 
export default AuthPage;