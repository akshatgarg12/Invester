import React, { useEffect, useMemo, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MoneyIcon from '@material-ui/icons/Money';
import { InvestmentCardProps } from '../InvestmentCard';
import InvestmentSection from '../InvestmentSection';
import { Investment, InvestmentType } from '../../util/investment';
import { Container } from '@material-ui/core';
import CustomDrawer from '../CustomDrawer';
import AddInvestmentForm from '../Forms/AddInvestment';


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
  container : {
    width: "98%",
    maxWidth:"1024px",
    margin:"20px auto"
  },
  root: {
    backgroundColor: "#f1f1f1",
    width: "100%",
    height : "80vh",
    overflowY:"scroll"
  },
}));

export interface InvestmentsProps{
    stocks: string[];
    cryptoCurrencies: string[];
    mutualFunds: string[];
}
export interface InvestmentData{
  stocks : Array<InvestmentCardProps>
  cryptoCurrencies : Array<InvestmentCardProps>
  mutualFunds : Array<InvestmentCardProps>
}
const Investments: React.FC<InvestmentsProps> = ({stocks, cryptoCurrencies, mutualFunds}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const investment = useMemo(()=> new Investment() , [])
  
  const [data, setData] = useState<InvestmentData>({
    stocks:[],
    cryptoCurrencies:[],
    mutualFunds:[]
  })
  const [loading, setLoading] = useState<boolean>(false);
  
   
  useEffect(() => {
    const callData = async () => {
      try{
        setLoading(true)
        // firebase database calls
        const x = await investment.getAll(stocks, cryptoCurrencies, mutualFunds)
        setData(x)
      }catch(e){
        console.log(e)
      }finally{
        setLoading(false)
      }
    }
    callData()
  }, [stocks, cryptoCurrencies, mutualFunds,investment])


  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  if(loading) return <h4>Loading data....</h4>
  return (
    <Container>
    <CustomDrawer 
      component = {<AddInvestmentForm />}
    />
    <div className={classes.root}>    
      <AppBar position="static" color="default">
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
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <InvestmentSection 
          data = {data.stocks} 
          type={InvestmentType.STOCKS} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <InvestmentSection 
          data = {data.cryptoCurrencies}
          type={InvestmentType.CRYPTO} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <InvestmentSection 
          data = {data.mutualFunds} 
          type={InvestmentType.MUTUALFUNDS} />
        </TabPanel>
      </SwipeableViews>
    </div>
    </Container>
  );
}
 
export default Investments;
