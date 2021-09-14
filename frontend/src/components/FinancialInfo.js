
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

const hrStyling = {
    margin: '8px 0'
}

const financialFigureStyling = {
    listStyle: 'none',
    padding: '0 0',
    width: '400px'
};

const noWrap = {
    whiteSpace: 'nowrap'
}

const FinancialInfo = (props) => {
    const generateFinancialsBlock = () => {
        if (props.financials === null || props.financials === undefined) return null;
        const financialOrder = [
            'marketCapitalization',
            'fiftyTwoWeekRange',
            'fiftyTwoWeekLowHighDates',
            'currentDividendYield'
        ]
        const metrics = props.financials.data.basicCompanyFinancials;
        const res = financialOrder.map(figure =>
            <div>
                <li style={financialLiStyling}>
                    <div style={liFinancialDescriptionStyling}>
                        {metrics[figure].description}
                    </div>
                    {
                        figure === 'fiftyTwoWeekLowHighDates' ?
                        <div style={{...liFinancialValueStyling, ...noWrap}}>
                            {metrics[figure].value}        
                        </div>
                        :
                        <div style={liFinancialValueStyling}>
                            {metrics[figure].value}        
                        </div>
                    }
                </li>
                <hr/> 
            </div>
        );
        return res; 
    }; 

    return (  
        <div>
            <ul style={financialFigureStyling}>
                {generateFinancialsBlock()}
            </ul>
        </div>
    );
}

export default FinancialInfo;