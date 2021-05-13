import { CircularProgress, Container } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
export interface LoadingPageProps {
  
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height : "80vh",
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      textAlign:"center",
    },
    progress:{
      margin:"auto"
    }
  }),
);
const LoadingPage: React.FC<LoadingPageProps> = () => {
  const classes = useStyles()
  return (
    <Container className={classes.root} maxWidth="lg">
      <CircularProgress className={classes.progress} />
    </Container>
  );
}
 
export default LoadingPage;