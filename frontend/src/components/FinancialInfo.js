
import React from 'react';

const financialLiStyling = {
    display: 'flex',
    justifyContent: 'space-between'
}

const liFinancialDescriptionStyling = {
    color: '#444444'
};

const liFinancialValueStyling = {
    fontWeight: '600'
};

const FinancialInfo = (props) => {
    const generateFinancialsBlock = () => {
        const financialOrder = [
            'marketCapitalization',
            '52WeekHigh',
            '52WeekHighDate',
            '52WeekLow',
            '52WeekLowDate',
            'currentDividendYieldTTM'
        ];

        const res = financialOrder.map(figure =>
            <li style={financialLiStyling}>
                <div style={liFinancialDescriptionStyling}>
                    {figure}
                </div>
                <div style={liFinancialValueStyling}>
                    {'hehe'}        
                </div>
            </li>
        );
        return res; 
    }; 

    return (  
        <div>
            <ul>
                {generateFinancialsBlock()}
            </ul>
        </div>
    );
}

export default FinancialInfo;