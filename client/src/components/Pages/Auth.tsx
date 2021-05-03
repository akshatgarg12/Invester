import {loginWithGoogle} from '../../util/auth'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Hero from '../Hero';
import { Container } from '@material-ui/core';
import {PersonOutline} from '@material-ui/icons';


const AuthPage: React.FC<any> = () => {
  return (
    <Container maxWidth="lg">
       <Hero />

       <Box textAlign="center">
          <Button variant="outlined" color="primary" onClick = {loginWithGoogle} fullWidth={false} startIcon={<PersonOutline />}>
              Login with Google 
          </Button>
       </Box>
    </Container>
  );
}
 
export default AuthPage;