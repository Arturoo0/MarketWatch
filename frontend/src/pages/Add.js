
import React, { useState, useEffect } from 'react';
import { Search } from '../components';
import { get } from '../utils/baseRequest';

const addContainerStyle = {
    padding: '10px 10px',
    height: '100vh'
};

const Add = () => {
    const [currentEnteredSearchText, updateCurrentEnteredSearchText] = useState('');
    const [US_EX_SYMBOLS, setUS_EX_SYMBOLS] = useState(undefined);

    useEffect(async () => {        
        if (US_EX_SYMBOLS === undefined){
            const res = await get('/market-data/us-ex-symbols', {});
            setUS_EX_SYMBOLS(res.data.US_EX_SYMBOLS);
        }
    }, [currentEnteredSearchText]); 

    const generateAvailableSymbols = () => {
        if (US_EX_SYMBOLS === undefined){
            return null;
        }
        let filteredArr = [];
        for (let pos = 0; pos < US_EX_SYMBOLS.length; pos++){
            if (US_EX_SYMBOLS[pos].displaySymbol.includes(currentEnteredSearchText)){
                filteredArr.push(US_EX_SYMBOLS[pos].displaySymbol);
            }
        }
        if (filteredArr.length === 0){
            return <div>No matching symbols.</div>;
        }
        const res = filteredArr.map((symbols) => 
            <li>{symbols}</li>
        );
        return res; 
    }

    return (
        <div style={addContainerStyle}>
            <Search onChangeHandle={(text) => {updateCurrentEnteredSearchText(text)}}/>
            <ul>
                {generateAvailableSymbols()}    
            </ul>
        </div>
    );
};

export default Add;