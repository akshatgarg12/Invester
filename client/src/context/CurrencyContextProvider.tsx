import {createContext, useContext, useEffect, useState} from 'react'
import LoadingPage from '../components/Pages/Loading'
import { currencyRates, Currency } from '../util/currency'

/* Contains info about the currency:rates and user selected currency */
const CurrencyContext = createContext<any>(null)

export const useCurrency = () => useContext(CurrencyContext)

export interface CurrencyContextProviderProps {
  
}

const CurrencyContextProvider: React.FC<CurrencyContextProviderProps> = ({children}
) => {
  const defaultCurrency:any = localStorage.getItem("currency") || Currency.INR
  const [currency, setCurrency] = useState<Currency>(defaultCurrency)
  const [rate, setRate] = useState<number|null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(()=>{
    const fn = async () => {
      try{
        setLoading(true)
        const r : any = await currencyRates(Currency.USD, Currency.INR)
        if(currency === Currency.INR) setRate(parseInt(r))
        else setRate(1/parseInt(r))
      }catch(e){
        console.log(e)
      }finally{
        setLoading(false)
      }
    }
    fn()
  },[currency])
  const changeCurrency = (x : Currency) => {
    setCurrency(x)
    localStorage.setItem("currency", x);
  }

  if(loading) return <LoadingPage />

  return (
    <CurrencyContext.Provider 
      value ={{
        currency,
        rate,
        changeCurrency
      }}
    >
        {children}
    </CurrencyContext.Provider>
  );
}
 
export default CurrencyContextProvider;