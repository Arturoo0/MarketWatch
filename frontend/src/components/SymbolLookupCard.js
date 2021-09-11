
import React from 'react';

const cardStyle = {
    margin: '0 0 10px 0',
    borderRadius: '3px',
    padding: '15px 5px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' 
}

const SymbolLookupCard = (props) => {
    return (
        <div style={cardStyle}>
            {props.data.symbol}
            
        </div>
    );
};

export default SymbolLookupCard;