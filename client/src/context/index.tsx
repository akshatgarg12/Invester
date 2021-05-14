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
          <PortfolioContextProvider>
            <CurrencyContextProvider>
                {children}
            </CurrencyContextProvider>
          </PortfolioContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  );
}
 
export default Providers;