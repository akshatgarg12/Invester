import {useState} from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import AddIcon from '@material-ui/icons/Add';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import RefreshIcon from '@material-ui/icons/Refresh';
import MoneyIcon from '@material-ui/icons/Money';
import AddCircleOutlined from '@material-ui/icons/AddCircleOutlined';
import Button from '@material-ui/core/Button';
import { InvestmentCardProps } from '../InvestmentCard';
import InvestmentSection from '../InvestmentSection';
import { InvestmentType } from '../../util/investment';
import { Container, Fab, Paper } from '@material-ui/core';
import AddInvestmentModal from '../Modals/AddInvestment';
import InvestmentInfo from '../InvestmentInfo';
import { PortfolioReducerAction, usePortfolio } from '../../context/PortfolioContextProvider';
import { getPortfolioData } from '../../util/custom';
import LoadingPage from '../Pages/Loading';
import {PieChart} from '../InvestmentGraphs'



interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={1}>
          {children}
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: "#f1f1f1",
    width: "98%",
    maxWidth:"1024px",
    margin:"10px auto",
    marginBottom:"30px"
  },
  box:{
    textAlign:"center",
    width:"98%",
    maxWidth:"1024px",
    margin:"10px auto",
    padding:"20px 0"
  },
  floatingBtn:{
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex:100
  },
  tabs:{
    padding:0
  }
}));

export interface InvestmentData{
  stocks : Array<InvestmentCardProps>
  cryptoCurrencies : Array<InvestmentCardProps>
  mutualFunds : Array<InvestmentCardProps>
}

interface InvestmentsProps{
  id : string
}

const Investments: React.FC<InvestmentsProps> = ({id}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  const {dispatch} = usePortfolio()
  const refreshHandler = async () => {
    try{
      setLoading(true);
      const portfolioData = await getPortfolioData(id);
      dispatch({type:PortfolioReducerAction.SET, payload : portfolioData});
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
    }
  }

  if(loading) return <LoadingPage />
  return (
    <Container>
      <AddInvestmentModal 
        open = {open}
        handleClose = {() => {setOpen(false)}}
      />
      <Box className={classes.box}>
        <InvestmentInfo />
      </Box>
    <div className={classes.root}>  
      <Button 
        startIcon={<RefreshIcon />}
        onClick = {refreshHandler}
      />
      <div className = {classes.floatingBtn} onClick={()=>setOpen(true)}>
        <Fab color="primary" size="small" aria-label="Add a new investment">
            <AddIcon />
        </Fab>
      </div>
      <Button
          variant="outlined"
          color="primary"
          onClick={()=>setOpen(true)}
          startIcon={<AddCircleOutlined />}
          >
          Add an investment
        </Button>
        <Paper color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            centered
            aria-label="full width tabs"
          >
          <Tab icon={<ShowChartIcon />} label="STOCKS" />
          <Tab icon={<MonetizationOnIcon />} label="CRYPTO" />
          <Tab icon={<MoneyIcon />} label="MUTUAL FUNDS" />
          </Tabs>
        </Paper>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
          className={classes.tabs}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <InvestmentSection 
            type={InvestmentType.STOCKS} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <InvestmentSection 
            type={InvestmentType.CRYPTO} />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <InvestmentSection 
            type={InvestmentType.MUTUALFUNDS} />
          </TabPanel>
        </SwipeableViews>
    </div>
     <Box className={classes.box}>
        <PieChart />
     </Box>
   
    </Container>
  );
}
 
export default Investments;
