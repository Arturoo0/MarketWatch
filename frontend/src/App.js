import Authentication from "./pages/Authentication";
import Dashboard from "./pages/Dashboard"; 
import Add from "./pages/Add";
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
