import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import './style.css'


export interface HeroProps {
  
}
const useStyles = makeStyles({
  hero : {
    display : "flex",
    flexDirection:"column",
    margin:"50px auto",
    justifyContent:"center",
    padding:"20px auto"
  },
  logo : {
    height:"200px"
  }
})
const Hero: React.FC<HeroProps> = () => {
  const classes = useStyles()
  return (
    <Container maxWidth="lg" className={`${classes.hero} hero`}>
      {/* Image of money in circular */}
      <Box alignItems="center" textAlign="center">
        <Box>
          <img alt="logo" src="/assets/logo.png" className={`${classes.logo} logo`} />
        </Box>
        <Typography variant="h1"  className="title">
          Invester
        </Typography>
      </Box>
    </Container>
  );
}
 
export default Hero;


