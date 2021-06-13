import {useContext, createContext, ReactNode, useEffect, useState} from 'react'
import { InvestmentCardProps } from '../components/InvestmentCard'
import { InvestmentData } from '../components/Investments'
import { InvestmentType } from '../util/investment'
import { useCurrency } from './CurrencyContextProvider'
import { usePortfolio } from './PortfolioContextProvider'

/* Contains info about the  portfolio : overall investments and values for graphs and table */
const PortfolioStatsContext = createContext<any>(null)

export const usePortfolioStats = () => useContext(PortfolioStatsContext)

export interface PortfolioStatsProviderProps {
    children : ReactNode
}
 
const PortfolioStatsProvider = ({children}:any) :JSX.Element => {
    const {data}:{data : InvestmentData} = usePortfolio()
    const {currency:globalCurrency, rate} = useCurrency()
    const [stats, setStats] = useState<any>({})

    useEffect(()=>{
        const getTotalCurrentValue = (type : InvestmentType) => {
            if(!data[type].length) return 0
            const total = data[type].map((s:InvestmentCardProps) => {
                let value = s.currentPrice*s.units
                if(s.currency !== globalCurrency) value *= rate
                return value
            }).reduce((a, b) => a+b)
            return Number(total.toFixed(2))
        }
        const getTotalInvestedValue = (type : InvestmentType) => {
            if(!data[type].length) return 0
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
            const totalInvestedValue  = Number((stocksInvestedValue + cryptoInvestedValue + mutualFundsInvestedValue).toFixed(2))
            const totalCurrentValue  = Number((stocksCurrentValue + cryptoCurrentValue + mutualFundsCurrentValue).toFixed(2))
            
            const state = {
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
            setStats(state)
        }
    }, [data, globalCurrency, rate])

    const Change = ({invested, current}:{invested:number, current:number}) => (((current - invested)/invested)*100).toFixed(2);

    return (
        <PortfolioStatsContext.Provider value={{
            data : stats
        }}>
            {children}
        </PortfolioStatsContext.Provider>
    );
}
 
export default PortfolioStatsProvider;