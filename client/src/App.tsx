import AuthContextProvider from './context/AuthContextProvider'

import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute';
import AuthPage from './components/Pages/Auth';
import Dashboard from './components/Pages/Dashboard';
import Navbar from './components/Navbar';
import PortfolioPage from './components/Pages/Portfolio';
import PortfolioContextProvider from './context/PortfolioContextProvider';

function App(){
  return (
    <Router>
      <AuthContextProvider>
      <PortfolioContextProvider>
        <div className="App">
          <Navbar />
            <Switch>
              {/*  Create a login page */}
              <ProtectedRoute path="/" exact={true} component={Dashboard} />
              {/* Portfolio page */}
              <ProtectedRoute path="/portfolio/:id" exact component={PortfolioPage}/>
              <Route path="/auth" component={AuthPage} />
              {/* Create a dashboard page */}
            </Switch> 
        </div>
        </PortfolioContextProvider>
     </AuthContextProvider>
    </Router>
  );
}

export default App;
