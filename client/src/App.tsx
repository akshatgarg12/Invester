import AuthContextProvider from './context/AuthContextProvider'
import TestComponent from './components/test';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

import HelloWorld from './components/protect';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
 
  return (
    <div className="App">
      <AuthContextProvider>
        <Router>
          <Switch>
            {/*  Create a login page */}
            <Route path="/auth" exact component={TestComponent} />
            {/* Create a dashboard page */}
            <ProtectedRoute path="/" component={HelloWorld} />
          </Switch>
        </Router>    
      </AuthContextProvider>
    </div>
  );
}

export default App;
