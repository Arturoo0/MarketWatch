
import { get } from '../utils/baseRequest';
import { QuoteInfo, RelatedNews, CandlestickCompanyView, FinancialInfo, PageSpinner } from '../components';
import React, { useEffect, useState } from 'react';

const companyViewContainerStyle = {
    padding: '4% 4%'
};

const headerContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between'
};

const logoStyling = {
    height: '2em'
};

const quoteAndCandleContainer = {
    display: 'flex',
    justifyContent: 'space-between', 
    flexWrap: 'wrap'
}; 

const CompanyView = () => {
    const [companyData, setCompanyData] = useState(null);
    const [quoteData, setQuoteData] = useState(null);
    const [companyNews, setCompanyNews] = useState(null);
    const [candleData, setCandleData] = useState(null);
    const [financialData, setFinancialData] = useState(null);

    useEffect(async () => {
        const pullTickerFromURL = () => {
            const windowUrl = window.location.search;
            const params = new URLSearchParams(windowUrl);
            const param = params.get('symbol');
            return !!param && param;
        };  
        const symbol = pullTickerFromURL();
        if (!symbol) {
            return;
        }
        const currentUnixTime = Math.floor(Date.now() / 1000); 
        const oneYearBack = currentUnixTime - 31536000;
        const endpoints = [
            `profile`,
            `quote`,
            `news`,
            `candles?resolution=${'D'}&from=${oneYearBack}&to=${currentUnixTime}`,
            `basic-financials`
        ];
        const [profile, quote, news, candles, financials] = await Promise.all(
            endpoints.map((endpoint) => {
                return get(`/market-data/company/${symbol}/${endpoint}`, {});
            })
        );
        setCompanyData(profile);
        setQuoteData(quote);
        setCompanyNews(news);
        setCandleData(candles);
        setFinancialData(financials);
    }, []);

    const renderCompanyHeader = () => {
        const {
            name,
            ticker 
        } = companyData.data.companyProfile;
        const companyHeader = `${name || 'Company'} (${ticker || 'Company Symbol'})`;
        return companyHeader;
    };

    const renderCompanyLogoImage = () => {
        const {
            logo
        } = companyData.data.companyProfile;
        return !!logo && <img style={logoStyling} src={logo}/>;
    };

    const renderQuoteFigures = () => {
        if (!quoteData) return null;
        return <QuoteInfo quote={quoteData}/>;
    };

    return (   
        <div>
            {
                companyData === null
                ? <PageSpinner />
                : <div style={companyViewContainerStyle}>
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
                    <div style={quoteAndCandleContainer}>
                        {renderQuoteFigures()}
                        <FinancialInfo financials={financialData}/>
                        <CandlestickCompanyView candles={candleData}/>
                    </div>
                    <div>
                        <hr/>
                        <RelatedNews news={companyNews}/>
                    </div>
                </div>
            }
        </div>
    );
};

export default CompanyView;
