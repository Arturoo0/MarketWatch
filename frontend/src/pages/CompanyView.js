
import { get } from '../utils/baseRequest';
import { QuoteInfo, RelatedNews, CandlestickCompanyView } from '../components';
import React, { useEffect, useState } from 'react'; 
import { 
    Spinner
} from 'react-bootstrap'


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

const loadingContainerStyle = {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

const loaderStyle = {
    height: '4rem',
    width: '4rem'
}

const CompanyView = (props) => {
    const [companyData, setCompanyData] = useState(null);
    const [quoteData, setQuoteData] = useState(null);
    const [companyNews, setCompanyNews] = useState(null);
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
            const endpoints = [
                `/market-data/company-profile-2/${symbol}`,
                `/market-data/company-quote/${symbol}`,
                `/market-data/company-news/${symbol}`
            ];
            const [profile, quote, news] = await Promise.all(
                endpoints.map((endpoint) => {
                    return get(endpoint, {});
                })
            );
            setCompanyData(profile);
            setQuoteData(quote);
            setCompanyNews(news);
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
        return <QuoteInfo quote={quoteData}/>;
    };

    return (   
        <div>
            {
                companyData === null ?
                <div style={loadingContainerStyle}>
                    <Spinner style={loaderStyle} animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
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
                    <div>
                        <hr/>
                        <RelatedNews news={companyNews}/>
                    </div>
                    <CandlestickCompanyView />
                </div>
            }
        </div>
    );
};

export default CompanyView;
