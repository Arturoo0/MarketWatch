
import React from 'react';

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

const generateSidePanelSelectors = (selectors) => {
    const res = selectors.map((selector) => 
        <a href={`#${selector}`} style={dashSelectorStyle}>{selector}</a>
    );
    return res;
};

const Dashboard = () => {
    return (
        <div>
            <div style={sidenavStyle}>
                {
                    generateSidePanelSelectors(
                        [
                            'View',
                            'Positions'
                        ]
                    )
                }
            </div>
        </div>
    );
};

export default Dashboard;