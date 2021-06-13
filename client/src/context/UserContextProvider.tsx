import { createContext, useContext, useReducer } from "react";
import { PortfolioCardProps } from "../components/PortfolioCard";

/* Contains info about the user portfolios : all the portfolios of user*/
const UserContext = createContext<any>(null)

export const useUser = () => useContext(UserContext)

export enum UserDataReducerActions{
  GET = "GET_DATA",
  SET = "SET_DATA"
}

const reducer = (state:Array<PortfolioCardProps>, action:any) => {
  switch(action.type){
    case UserDataReducerActions.SET:
      return action.payload   
    case UserDataReducerActions.GET:
      return state
  }
}


const UserContextProvider: React.FC<any> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, null, () => {})
  return (
  <UserContext.Provider
    value = {{
      data : state,
      dispatch
    }}
  >
    {children}
  </UserContext.Provider>
  )
}

export default UserContextProvider