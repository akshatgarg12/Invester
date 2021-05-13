import {createContext, useContext, useState} from 'react'

const CurrencyContext = createContext<any>(null)

export const useCurrency = () => useContext(CurrencyContext)

export interface CurrencyContextProviderProps {
  
}
enum Currency{
  INR = "inr",
  USD = "usd"
}
const CurrencyContextProvider: React.FC<CurrencyContextProviderProps> = ({children}
) => {
  const defaultCurrency:any = localStorage.getItem("currency") || Currency.INR
  const [currency, setCurrency] = useState<Currency>(defaultCurrency)
  const changeCurrency = (x : Currency) => {
    setCurrency(x)
    localStorage.setItem("currency", x);
  }
  return (
    <CurrencyContext.Provider 
      value ={{
        currency,
        changeCurrency
      }}
    >
        {children}
    </CurrencyContext.Provider>
  );
}
 
export default CurrencyContextProvider;