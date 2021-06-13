import {useContext, createContext, ReactNode, useRef, useEffect} from 'react'
import { InvestmentCardProps } from '../components/InvestmentCard'
import { InvestmentData } from '../components/Investments'
import { InvestmentType } from '../util/investment'
import { useCurrency } from './CurrencyContextProvider'
import { usePortfolio } from './PortfolioContextProvider'


const PortfolioStatsContext = createContext<any>(null)

export const usePortfolioStats = () => useContext(PortfolioStatsContext)

export interface PortfolioStatsProviderProps {
    children : ReactNode
}
 
const PortfolioStatsProvider = ({children}:any) :JSX.Element => {
    const {data}:{data : InvestmentData} = usePortfolio()
    const {currency:globalCurrency, rate} = useCurrency()
    const stats = useRef<any>()
    useEffect(()=>{
        const getTotalCurrentValue = (type : InvestmentType) => {
            const total = data[type].map((s:InvestmentCardProps) => {
                let value = s.currentPrice*s.units
                if(s.currency !== globalCurrency) value *= rate
                return value
            }).reduce((a, b) => a+b)
            return Number(total.toFixed(2))
        }
        const getTotalInvestedValue = (type : InvestmentType) => {
            const total = data[type].map((s:InvestmentCardProps) => {
                let value = s.averageBuyPrice*s.units
                if(s.currency !== globalCurrency) value *= rate
                return value
            }).reduce((a, b) => a+b)
            return Number(total.toFixed(2))
        }
        if(data){
            const stocksInvestedValue  = getTotalInvestedValue(InvestmentType.STOCKS)
            const stocksCurrentValue  = getTotalCurrentValue(InvestmentType.STOCKS)
            const cryptoInvestedValue  = getTotalInvestedValue(InvestmentType.CRYPTO)
            const cryptoCurrentValue  = getTotalCurrentValue(InvestmentType.CRYPTO)
            const mutualFundsInvestedValue  = getTotalInvestedValue(InvestmentType.MUTUALFUNDS)
            const mutualFundsCurrentValue  = getTotalCurrentValue(InvestmentType.MUTUALFUNDS)
            const totalInvestedValue  = stocksInvestedValue + cryptoInvestedValue + mutualFundsInvestedValue
            const totalCurrentValue  = stocksCurrentValue + cryptoCurrentValue + mutualFundsCurrentValue
            
            stats.current = {
                overall : {
                    name : 'Total',
                    invested : totalInvestedValue,
                    current : totalCurrentValue,
                    change : Change({invested :totalInvestedValue, current : totalCurrentValue}),
                },
                stocks : {
                    name : "Stocks",
                    invested : stocksInvestedValue,
                    current : stocksCurrentValue,
                    change : Change({invested : stocksInvestedValue, current : stocksCurrentValue}),
                },
                cryptoCurrencies : {
                    name : "Crypto Currency",
                    invested : cryptoInvestedValue,
                    current : cryptoCurrentValue,
                    change : Change({invested : cryptoInvestedValue, current : cryptoCurrentValue})
                },
                mutualFunds : {
                    name : "Mutual Funds",
                    invested : mutualFundsInvestedValue,
                    current : mutualFundsCurrentValue,
                    change : Change({invested : mutualFundsInvestedValue, current : mutualFundsCurrentValue})
                }
            }
        }
    }, [data, globalCurrency, rate])

    const Change = ({invested, current}:{invested:number, current:number}) => (((current - invested)/invested)*100).toFixed(2);

    return (
        <PortfolioStatsContext.Provider value={{
            data : stats.current
        }}>
            {children}
        </PortfolioStatsContext.Provider>
    );
}
 
export default PortfolioStatsProvider;