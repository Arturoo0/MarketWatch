import Authentication from "./pages/Authentication";
import Dashboard from "./pages/Dashboard"; 
import Add from "./pages/Add";
import { useEffect, useState } from "react";
import { get } from './utils/baseRequest.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const mainContent = {
  marginLeft: '200px',
  fontSize: '20px',
  padding: '0px 10px'
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useEffect(async () => {
    const authenticationRes = await get('/auth/is-valid-session', {});
  }, []);

  return (
    <Router>
      <div> 
        <Switch>
          <Route path="/auth">
            <Authentication />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
            <div style={mainContent}>
              <Route path="/dashboard/add">
                <Add />
              </Route>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
