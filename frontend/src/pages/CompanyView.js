
import { get } from '../utils/baseRequest';
import React, { useEffect, useState } from 'react'; 

const companyViewContainerStyle = {
    padding: '4% 4%'
};

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

    const displayCompanyTitle = () => {
        const {
            name,
            ticker 
        } = companyData.data.companyProfile2
        const companyHeader = `${name} (${ticker})`;
        return companyHeader
    };

    return (   
        <div>
            {
                companyData === null ?
                <h3>No existing information</h3> 
                :
                <div style={companyViewContainerStyle}>
                    <div>
                        <h3>
                            {displayCompanyTitle()}
                        </h3>
                    </div>
                </div>
            }
        </div>
    );
};

export default CompanyView;
