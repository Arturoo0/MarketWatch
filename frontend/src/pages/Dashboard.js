
import React from 'react';
import { BsArrowRight, BsFillPersonFill } from 'react-icons/bs';

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

const Dashboard = (page) => {
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
            </div>
        </div>
    );
};

export default Dashboard;