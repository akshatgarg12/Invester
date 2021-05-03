import AuthContextProvider from './context/AuthContextProvider'

import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute';
import AuthPage from './components/Pages/Auth';
import Dashboard from './components/Pages/Dashboard';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Router>
          <Switch>
            {/*  Create a login page */}
            <Route path="/auth" exact component={AuthPage} />
            {/* Create a dashboard page */}
            <ProtectedRoute path="/" component={Dashboard} />
          </Switch>
        </Router>    
      </AuthContextProvider>
    </div>
  );
}

export default App;
