
import React from 'react';
import { 
    Badge
} from 'react-bootstrap'

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
    margin: '8px 0'
}

const QuoteInfo = (props) => {
    const generateQuoteBlock = () => {
        const quoteRef = props.quote.data.companyQuote;
        if (quoteRef === null || quoteRef === undefined) return null;
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
                                {
                                    key === 'change' || key === 'percentChange'?                                        
                                        quoteRef[key].value > 0 ?
                                            <Badge bg='success'>{quoteRef[key].value}</Badge> 
                                            :
                                            <Badge bg='danger'>{quoteRef[key].value}</Badge>          
                                        :
                                        quoteRef[key].value                         
                                }                                 
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