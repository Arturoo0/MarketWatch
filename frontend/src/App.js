import Authentication from './pages/Authentication';
import Dashboard from './pages/Dashboard'; 
import SignedOut from './pages/SignedOut';
import { useEffect } from 'react';
import { get } from './utils/baseRequest.js';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthenticatedAction } from './actions/authenticationActions.js';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector(state => state.app.isAuthenticated);
  const checkingAuthentication = useSelector(state => state.app.checkingAuthentication);

  useEffect(() => {
    async function authenticateUser() {
      const { data } = await get('/auth/is-valid-session', {});
      dispatch(setAuthenticatedAction(data.isAuthenticated));
    }
    authenticateUser();
  }, [dispatch]);

  if (checkingAuthentication) {
    return '';
  }

  if (isAuthenticated && (location && !location.pathname.startsWith('/dashboard'))) {
    return <Redirect to='/dashboard' />
  }

  return (
    <Switch>
      <Route path='/auth' component={Authentication} />
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/signed-out' component={SignedOut} />
      <Route><Redirect to='/signed-out' /></Route>
    </Switch>
  );
}

export default App;
