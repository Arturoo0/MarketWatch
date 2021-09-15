
import React from 'react';
import { useDispatch } from 'react-redux';
import { BsArrowRight, BsFillPersonFill, BsArrowBarRight } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import { post } from '../utils/baseRequest';
import { setAuthenticatedAction } from '../actions/authenticationActions.js';

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

const Dashboard = (props) => {
    const dispatch = useDispatch();

    const logoutOnClick = async () => {
        await post('/auth/logout');
        dispatch(setAuthenticatedAction(false));
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
        </div>
    );
};

export default Dashboard;