import React, { useEffect, useCallback, useState } from 'react';
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
import { getInvestmentData, InvestmentType } from '../../util/portfolio';
import { InvestmentCardProps } from '../InvestmentCard';
import InvestmentSection from '../InvestmentSection';

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
    margin:"20px auto",
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

  const [data, setData] = useState<InvestmentData>({
    stocks:[],
    cryptoCurrencies:[],
    mutualFunds:[]
  })

  const callData = useCallback(async () => {
    try{
      const s = getInvestmentData(stocks, InvestmentType.STOCKS)
      const c = getInvestmentData(cryptoCurrencies, InvestmentType.CRYPTO)
      const m = getInvestmentData(mutualFunds, InvestmentType.MUTUALFUNDS)
      await Promise.all([s,c,m]).then((d) => {
        const x:InvestmentData = {
          stocks : d[0],
          cryptoCurrencies : d[1],
          mutualFunds : d[2]
        } 
        setData(x)
      }) 
    }catch(e){
      console.log(e)
    }
  }, [stocks, cryptoCurrencies, mutualFunds])

  useEffect(() => {
    // console.log("data called")
    callData()
  }, [callData])


  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
 
  return (
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
          <InvestmentSection data =  {data.stocks} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <InvestmentSection data =  {data.cryptoCurrencies} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <InvestmentSection data =  {data.mutualFunds} />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
 
export default Investments;
