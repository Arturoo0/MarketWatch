
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsArrowRight, BsFillPersonFill, BsArrowBarRight } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import { post } from '../utils/baseRequest';
import { refreshAuthentication } from '../actions/authenticationActions.js'
import Portfolios from './Portfolios';
import Securities from './Securities';
import CompanyView from './CompanyView';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

const sidenavStyle = {
    height: '100%',
    width: '200px',
    position: 'fixed',
    zIndex: '1',
    top: '0',
    left: '0',
    backgroundColor: '#111',
    overflowX: 'hidden',
    paddingTop: '20px'
}

const dashSelectorStyle = {
    padding: '6px 8px 6px 16px',
    textDecoration: 'none',
    fontSize: '20px',
    color: '#818181',
    display: 'block',
    border: 'none',
    background: 'none',
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
    outline: 'none'
}

const logoutButtonStyle = {
    position: 'absolute',
    bottom: '1%',
    left: '50%',
    transform: 'translateX(-50%)',
}

const mainContent = {
    marginLeft: '200px',
    fontSize: '20px',
    padding: '0px 10px'
}  

const handleLinkClick = (selector) => {
    window.location.pathname = `/dashboard/${selector.toLowerCase()}`;
}

const generateSidePanelSelectors = (selectors) => {
    const res = selectors.map((selector) => {
        const path = `/dashboard/${selector.toLowerCase()}`
        return (<a key={path} href={path} onClick={
            () => handleLinkClick(selector)
        } style={dashSelectorStyle}>{selector} <BsArrowRight /></a>);
    });
    return res;
};

const Dashboard = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.app.isAuthenticated);
    const checkingAuthentication = useSelector(state => state.app.checkingAuthentication);

    const logoutOnClick = async () => {
        await post('/auth/logout');
        dispatch(refreshAuthentication());
    }

    if (!checkingAuthentication && !isAuthenticated) {
        return <Redirect to='/signed-out' />;
    }

    return (
        <div>
            <div style={sidenavStyle}>
                <BsFillPersonFill style={{...dashSelectorStyle, ...{color: 'white', fontSize: '4rem'}}}/> 
                {
                    generateSidePanelSelectors(
                        [
                            'Portfolios',
                            'Securities'
                        ]
                    )
                }
                <Button onClick={logoutOnClick} style={logoutButtonStyle} className='btn-dark'>
                    Logout
                    <BsArrowBarRight style={{ marginLeft: '5px' }} />
                </Button>
            </div>
            <Router>
                <div style={mainContent}>
                    <Route path='/dashboard/securities'>
                        <Securities />
                    </Route>
                    <Route path='/dashboard/company'>
                        <CompanyView /> 
                    </Route>
                    <Route path='/dashboard/portfolios'>
                        <Portfolios /> 
                    </Route>
                </div>
            </Router>
        </div>
    );
};

export default Dashboard;