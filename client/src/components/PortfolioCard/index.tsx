import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import ShareIcon from '@material-ui/icons/Share';
import { useHistory } from 'react-router';
import { Portfolio } from '../../util/portfolio';
import { useAuth } from '../../context/AuthContextProvider';
import ConfirmDeleteModal from '../Modals/ConfirmDelete';
import {useState} from 'react'
export interface PortfolioCardProps {
  id : string
  index : number
  createdAt: string
  name : string
  totalValue ?: number
  investment : any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width:"100%",
      maxWidth: "345px",
      margin:"10px"
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);


export const RenderCardInfo: React.FC<{title : string, value : number | string}> = ({title, value}) => {
  return (
    <Typography variant="subtitle1" color="textSecondary">
      {title} : <Typography color="textPrimary" display="inline"> {value}</Typography>
    </Typography>
  )
} 

const PortfolioCard: React.FC<PortfolioCardProps> = ({id, index, name, createdAt,totalValue, investment}) => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {user} = useAuth()
  const portfolio = new Portfolio(id)


  const redirectToPortfolioPage = () => {
    history.push(`/portfolio/${id}`)
  }
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = async (response : "CONFIRM" | "CANCEL") => {
    try{
      setLoading(true)
      if(response === "CONFIRM"){
        const deleteId = await portfolio.delete(user.email)
        console.log(deleteId)
        // if(deleteId){
        //   const updatedData = await updatePortfolioData(type, initialData,deleteId, "DELETE")
        //   dispatch({type:PortfolioReducerAction.SET, payload: updatedData})
        // }
      }
    }catch(e){
      console.log(e)
    }finally{
      setOpen(false);
      setLoading(false)
    }
  };
  return (
    <>
    <ConfirmDeleteModal 
     loading = {loading}
     open = {open}
     handleClose = {handleClose}
    />
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {index}
          </Avatar>
        }
        
        title={name.toUpperCase()}
        subheader={createdAt}
      />
      <CardContent>
          <RenderCardInfo 
            title = "Stocks"
            value = {investment.stocks}
          />
          <RenderCardInfo 
            title = "Crypto Currencies"
            value = {investment.crypto}
          />
          <RenderCardInfo 
            title = "Mutual Funds"
            value = {investment.mutualFunds}
          />
      </CardContent>
      <CardActions>
        <IconButton aria-label="delete the portfolio" onClick={()=>{
          handleOpen()
        }}>
          <DeleteOutline />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      <Button variant="outlined" onClick={redirectToPortfolioPage}>
        Open
      </Button>
      </CardActions> 
    </Card>
    </>
  );
}
 
export default PortfolioCard;



