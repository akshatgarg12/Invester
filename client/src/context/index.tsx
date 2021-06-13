import AuthContextProvider from "./AuthContextProvider";
import CurrencyContextProvider from "./CurrencyContextProvider";
import PortfolioContextProvider from "./PortfolioContextProvider";
import PortfolioStatsProvider from "./PortfolioStatsProvider";
import UserContextProvider from "./UserContextProvider";

export interface ProvidersProps {
  
}
 
const Providers: React.FC<ProvidersProps> = ({children}) => {
  return (
    <AuthContextProvider>
      <UserContextProvider>
          <PortfolioContextProvider>
            <CurrencyContextProvider>
              <PortfolioStatsProvider>
                {children}
              </PortfolioStatsProvider>
            </CurrencyContextProvider>
          </PortfolioContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  );
}
 
export default Providers;