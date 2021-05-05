import { Container } from "@material-ui/core";
import InvestmentCard, {InvestmentCardProps} from "../InvestmentCard";

export interface StocksProps {
  
}
 
const Stocks: React.FC<StocksProps> = () => {
  const stocks:Array<InvestmentCardProps> = [
    {
      symbol:"WIPRO",
      name : "wipro pvt ltd",
      averageBuyPrice:425,
      currentPrice:442,
      units:10
    },
    {
      symbol:"BTC",
      name : "Bitcoin",
      averageBuyPrice:4421031,
      currentPrice:4223221,
      units:0.00082
    },
    {
      symbol:"ICICI prudential growth direct plan",
      name : "ICICI",
      averageBuyPrice:117.84,
      currentPrice:117.46,
      units:8.486
    }
  ]
  return (
    // create a card component which will take values and will render here.
    <Container>
      {
        stocks.map((s:InvestmentCardProps, index : number) => {
          const {name, symbol, averageBuyPrice, currentPrice, units} = s
          return (
            <InvestmentCard
              key={index} 
              name={name}
              symbol={symbol}
              averageBuyPrice={averageBuyPrice}
              currentPrice={currentPrice}
              units={units}
            />
          )
        })
      }
    </Container>
  );
}
 
export default Stocks;