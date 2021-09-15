import Authentication from './pages/Authentication';
import Dashboard from './pages/Dashboard'; 
import Securities from './pages/Securities';
import SignedOut from './pages/SignedOut';
import CompanyView from './pages/CompanyView';
import { useEffect } from 'react';
import { get } from './utils/baseRequest.js';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthenticatedAction } from './actions/authenticationActions.js';
import Portfolios from './pages/Portfolios';

const mainContent = {
  marginLeft: '200px',
  fontSize: '20px',
  padding: '0px 10px'
}

function App(props) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.app.isAuthenticated);
  const checkingAuthentication = useSelector(state => state.app.checkingAuthentication);

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
      return <Redirect to="/signed-out" />
    }
    
    return (
      <div>
        <Dashboard />
        <Router>
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
        </Router>
      </div>
    );
  }

  return (
    <Router>
      <Route path="/auth">
        <Authentication />
      </Route>
      <Route path="/dashboard">
        {renderDashboard()}
      </Route>
      <Route path="/signed-out">
        <SignedOut />
      </Route>
    </Router>
  );
}

export default App;
