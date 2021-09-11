
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

const CompanyView = (props) => {
    const [companyData, setCompanyData] = useState(null);
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
            const resourceLocation = `/market-data/company-profile-2/${symbol}` 
            const res = await get(resourceLocation, {});
            setCompanyData(res);
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
                </div>
            }
        </div>
    );
};

export default CompanyView;
