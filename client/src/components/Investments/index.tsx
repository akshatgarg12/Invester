import {useState} from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MoneyIcon from '@material-ui/icons/Money';
import AddCircleOutlined from '@material-ui/icons/AddCircleOutlined';
import Button from '@material-ui/core/Button';
import { InvestmentCardProps } from '../InvestmentCard';
import InvestmentSection from '../InvestmentSection';
import { InvestmentType } from '../../util/investment';
import { Container, Paper } from '@material-ui/core';
import AddInvestmentModal from '../Modals/AddInvestment';
import { usePortfolio } from '../../context/PortfolioContextProvider';
import { useCurrency } from '../../context/CurrencyContextProvider';
import { Currency } from '../../util/currency';




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
        <Box p={3}>
          <Typography>{children}</Typography>
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
  },
  totalValueBox:{
    textAlign:"center",
    width:"98%",
    maxWidth:"1024px",
    margin:"10px auto",
    background:"#F1F1F1",
    padding:"20px 0",
    borderRadius:"20px"
  }
}));

export interface InvestmentData{
  stocks : Array<InvestmentCardProps>
  cryptoCurrencies : Array<InvestmentCardProps>
  mutualFunds : Array<InvestmentCardProps>
}

const getTotalValue = (data:InvestmentData, type : InvestmentType, globalCurrency:Currency, rate:number) => {
  let ttl = 0;
  data[type].forEach((s : InvestmentCardProps) => {
    if(s.currency  === globalCurrency){
        ttl += s.currentPrice * s.units;
    }else{
      ttl += s.currentPrice*rate * s.units;
    }
  })
  return ttl;
}

const Investments: React.FC<any> = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const {data}:{data : InvestmentData} = usePortfolio()
  const {currency, rate} = useCurrency()
  let totalValue : number = 
  getTotalValue(data, InvestmentType.STOCKS, currency, rate) + 
  getTotalValue(data, InvestmentType.CRYPTO, currency, rate) + 
  getTotalValue(data, InvestmentType.MUTUALFUNDS, currency, rate);
  
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  const [open, setOpen] = useState(false)
  return (
    <Container>
      <AddInvestmentModal 
        open = {open}
        handleClose = {() => {setOpen(false)}}
      />
    <Box className={classes.totalValueBox}>
     <Typography variant = "h5">Total Value : {totalValue.toFixed(2)}</Typography>
    </Box>
    <div className={classes.root}>    
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
    </Container>
  );
}
 
export default Investments;
