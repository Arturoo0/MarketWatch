
import React from 'react';

const quoteLiStyling = {
    display: 'flex',
    justifyContent: 'space-between'
}

const quoteFigureStyling = {
    listStyle: 'none',
    padding: '0 0',
    width: '400px'
};

const liQuoteDescriptionStyling = {
    color: '#444444'
};

const liQuoteValueStyling = {
    fontWeight: '600'
};

const hrStyling = {
    margin: '6px 0'
}

const QuoteInfo = (props) => {
    const generateQuoteBlock = () => {
        const quoteRef = props.quote.data.companyQuote;
        if (quoteRef === null || quoteRef === undefined) return null;
        const {
            currentPrice,
            change,
            percentChange,
            highPriceOfTheDay,
            lowPriceOfTheDay,
            openPriceOfTheDay,
            previousClosingPriceOfTheDay
        } = props;
        const quoteOrder = [
            'currentPrice',
            'change',
            'percentChange',
            'highPriceOfTheDay',
            'lowPriceOfTheDay',
            'openPriceOfTheDay',
            'previousClosingPriceOfTheDay'
        ];
        const res = quoteOrder.map(key => {
                return (  
                    <div>
                        <li style={quoteLiStyling}>
                            <div style={liQuoteDescriptionStyling}>
                                {quoteRef[key].description}
                            </div>
                            <div style={liQuoteValueStyling}>
                                {quoteRef[key].value}
                            </div> 
                        </li>
                        <hr style={hrStyling}/>
                    </div> 
                );
            }
        );
        return res;
    };

    return (
        <ul style={quoteFigureStyling}>
            {generateQuoteBlock()}
        </ul>
    );
};

export default QuoteInfo;