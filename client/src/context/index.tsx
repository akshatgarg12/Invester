import AuthContextProvider from "./AuthContextProvider";
import CurrencyContextProvider from "./CurrencyContextProvider";
import PortfolioContextProvider from "./PortfolioContextProvider";
import UserContextProvider from "./UserContextProvider";

export interface ProvidersProps {
  
}
 
const Providers: React.FC<ProvidersProps> = ({children}) => {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <CurrencyContextProvider>
          <PortfolioContextProvider>
            {children}
          </PortfolioContextProvider>
        </CurrencyContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  );
}
 
export default Providers;