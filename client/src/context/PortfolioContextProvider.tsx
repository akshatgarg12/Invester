import { createContext, useContext, useReducer } from "react";

const PortfolioContext = createContext<any>(null)

export const usePortfolio = () => useContext(PortfolioContext)

export enum PortfolioReducerAction{
  GET = "GET_DATA",
  SET = "SET_DATA"
}

const reducer = (state:any, action:any) => {
  switch(action.type){
    case PortfolioReducerAction.SET:
      return action.payload   
    case PortfolioReducerAction.GET:
      return state
  }
}

const PortfolioContextProvider: React.FC<any> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, null, () => {})
  return (
  <PortfolioContext.Provider
    value ={{
      data : state,
      dispatch
    }}
  >
    {children}
  </PortfolioContext.Provider>
  )
}

export default PortfolioContextProvider