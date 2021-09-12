import Authentication from './pages/Authentication';
import Dashboard from './pages/Dashboard'; 
import Add from './pages/Add';
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

const mainContent = {
  marginLeft: '200px',
  fontSize: '20px',
  padding: '0px 10px'
}

const setAuthenticatedAction = (isAuthenticated) => {
  return {
    type: 'SET_AUTHENTICATED',
    data: {
      isAuthenticated,
    }
  }
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
          <Route path="/dashboard/add">
            <Add />
          </Route>
          <Route path="/dashboard/company">
            <CompanyView /> 
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
