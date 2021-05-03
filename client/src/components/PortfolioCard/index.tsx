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

export interface PortfolioCardProps {
  index : number
  createdAt: string
  name : string
  totalValue : number
  investment : any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
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


const RenderCardInfo: React.FC<{title : string, value : number}> = ({title, value}) => {
  return (
    <Typography variant="subtitle1" color="textSecondary">
      {title} : <Typography color="textPrimary" display="inline"> {value}</Typography>
    </Typography>
  )
} 

const PortfolioCard: React.FC<PortfolioCardProps> = ({index, name, createdAt,totalValue, investment}) => {
  const classes = useStyles();
  return (
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
            title = "Total invested amount"
            value = {totalValue}
          />
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
        <IconButton aria-label="delete the portfolio">
          <DeleteOutline />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      <Button variant="outlined">
        Open
      </Button>
      </CardActions> 
    </Card>
  );
}
 
export default PortfolioCard;


