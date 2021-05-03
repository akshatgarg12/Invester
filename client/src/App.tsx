import AuthContextProvider from './context/AuthContextProvider'

import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute';
import AuthPage from './components/Pages/Auth';
import Dashboard from './components/Pages/Dashboard';
import Navbar from './components/Navbar';

function App(){
  return (
    <Router>
      <AuthContextProvider>
        <div className="App">
          <Navbar />
            <Switch>
              {/*  Create a login page */}
              <ProtectedRoute path="/" exact={true} component={Dashboard} />
              <Route path="/auth" component={AuthPage} />
              {/* Create a dashboard page */}
              
            </Switch> 
        </div>
     </AuthContextProvider>
    </Router>
  );
}

export default App;
