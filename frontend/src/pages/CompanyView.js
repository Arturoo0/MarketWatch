
import { get } from '../utils/baseRequest';
import React, { useEffect, useState } from 'react'; 

const companyViewContainerStyle = {
    padding: '4% 4%'
};

const headerContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between'
}

const logoStyling = {
    height: '2em'
}

const quoteFigureStyling = {
    display: 'inline-block'
}

const CompanyView = (props) => {
    const [companyData, setCompanyData] = useState(null);
    const [quoteData, setQuoteData] = useState(null);
    useEffect(async () => {
        const pullTickerFromURL = () => {
            const windowUrl = window.location.search;
            const params = new URLSearchParams(windowUrl);
            const param = params.get('symbol');
            if (param === null || param === undefined){
                return null;
            }else{
                return param;
            }
        };  
        const symbol = pullTickerFromURL();
        if (symbol !== null){
            const companyProfileResourceLocation = `/market-data/company-profile-2/${symbol}`
            const companyQuoteResourceLocation = `/market-data/company-quote/${symbol}` 
 
            const profile = await get(companyProfileResourceLocation, {});
            const quote = await get(companyQuoteResourceLocation, {});
            setCompanyData(profile);
            setQuoteData(quote);
        }
    }, []);

    const renderCompanyHeader = () => {
        const {
            name,
            ticker 
        } = companyData.data.companyProfile2;
        const companyHeader = `${name} (${ticker})`;
        return companyHeader
    };

    const renderCompanyLogoImage = () => {
        const {
            logo
        } = companyData.data.companyProfile2;
        if (logo !== undefined || logo !== null || logo !== ''){
            return <img style={logoStyling} src={logo}/> 
        };
    };

    const renderQuoteFigures = () => {
        if (quoteData === null) return null; 
        const {
            c : currentPrice,
            d : change,
            dp: percentChange,
            h: highPriceOfTheDay,
            l: lowPriceOfTheDay,
            o: openPriceOfTheDay,
            pc: previousClosePrice
        } = quoteData.data.companyQuote;
        return (
            <ul>
                <li>{`Current price: ${currentPrice}`}</li>
                <li>{`Change: ${change}`}</li>
                <li>{`Percent change: ${percentChange}%`}</li>
                <li>{`High price of the day: ${highPriceOfTheDay}`}</li>
                <li>{`Low price of the day: ${lowPriceOfTheDay}`}</li>
                <li>{`Open price of the day: ${openPriceOfTheDay}`}</li>
                <li>{`Previous close price: ${previousClosePrice}`}</li>
            </ul>
        );
    };

    return (   
        <div>
            {
                companyData === null ?
                <h3>No existing information</h3> 
                :
                <div style={companyViewContainerStyle}>
                    <div style={headerContainerStyle}>
                        <div>
                            <h3>
                                {renderCompanyHeader()}
                            </h3>
                        </div>
                        <div>
                            {renderCompanyLogoImage()}
                        </div>
                    </div>
                    <hr />
                    <div>
                        {renderQuoteFigures()}
                    </div>
                </div>
            }
        </div>
    );
};

export default CompanyView;
