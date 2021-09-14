import Authentication from './pages/Authentication';
import Dashboard from './pages/Dashboard'; 
import Securities from './pages/Securities';
import SignedOut from './pages/SignedOut';
import CompanyView from './pages/CompanyView';
import { useEffect } from 'react';
import { get } from './utils/baseRequest.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthenticatedAction } from './actions/authenticationActions.js';
import Portfolios from './pages/Portfolios';

const mainContent = {
  marginLeft: '200px',
  fontSize: '20px',
  padding: '0px 10px'
}

function App(props) {
  const { dispatch, checkingAuthentication, isAuthenticated } = props;

  useEffect(() => {
    async function authenticateUser() {
      const { data } = await get('/auth/is-valid-session', {});
      dispatch(setAuthenticatedAction(data.isAuthenticated));
    }
    authenticateUser();
  }, [dispatch]);

  function renderDashboard() {
    if (checkingAuthentication) {
      return;
    }

    if (!isAuthenticated) {
      return <SignedOut />;
    }
    
    return (
      <div>
        <Dashboard />
        <div style={mainContent}>
          <Route path="/dashboard/securities">
            <Securities />
          </Route>
          <Route path="/dashboard/company">
            <CompanyView /> 
          </Route>
          <Route path="/dashboard/portfolios">
            <Portfolios /> 
          </Route>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div> 
        <Switch>
          <Route path="/auth">
            <Authentication />
          </Route>
          <Route path="/dashboard">
            {renderDashboard()}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function appMapStateToProps(state) {
  const { isAuthenticated, checkingAuthentication } = state.app;
  return { checkingAuthentication, isAuthenticated };
}

export default connect(appMapStateToProps)(App);
