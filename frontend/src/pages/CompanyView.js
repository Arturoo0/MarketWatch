
import { get } from '../utils/baseRequest';
import React, { useEffect, useState } from 'react'; 

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
            console.log(res);
            setCompanyData(res);
        }
    }, []);

    return (   
        <div>
            {
                companyData === null ?
                <h3>No existing information</h3> 
                :
                <div>
                    {companyData.data.name}
                </div>
            }
        </div>
    );
};

export default CompanyView;
