
import React, { useState, useEffect } from 'react';
import { Search, SymbolLookupCard } from '../components';
import { get } from '../utils/baseRequest';
import { Row, Col } from 'react-bootstrap';

const addContainerStyle = {
    padding: '10px 10px',
    height: '100vh'
};

const symbolContainerStyle = {
    marginTop: '4px'
}

const Add = () => {
    const [currentEnteredSearchText, updateCurrentEnteredSearchText] = useState(undefined);
    const [US_EX_SYMBOLS, setUS_EX_SYMBOLS] = useState(undefined);

    useEffect(async () => {        
        if (US_EX_SYMBOLS === undefined){
            const res = await get('/market-data/us-ex-symbols', {});
            setUS_EX_SYMBOLS(res.data.US_EX_SYMBOLS);
        }
    }, [currentEnteredSearchText]); 

    const generateAvailableSymbols = () => {
        const chunkSize = 100;
        let filteredArr = [];
        if (US_EX_SYMBOLS === undefined || currentEnteredSearchText === undefined){
            return null;
        }else if (currentEnteredSearchText === '' || currentEnteredSearchText === ' '){
            filteredArr = US_EX_SYMBOLS.splice(0, chunkSize);
        }else{
            for (let pos = 0; pos < US_EX_SYMBOLS.length; pos++){
                if (US_EX_SYMBOLS[pos].displaySymbol.includes(currentEnteredSearchText)){
                    filteredArr.push(US_EX_SYMBOLS[pos]);
                }
                if (filteredArr.length > chunkSize) break;
            }
        }
        if (filteredArr.length === 0){
            return <div>No matching symbols.</div>;
        }
        const res = filteredArr.map((symbols) => 
            <Col><SymbolLookupCard data={
                {
                    symbol: symbols.displaySymbol,
                    description: symbols.description,
                    symbolType: symbols.type
                }
            }/></Col>
        );
        return res; 
    }

    return (
        <div style={addContainerStyle}>
            <Search onChangeHandle={(text) => {updateCurrentEnteredSearchText(text)}}/>
            <Row style={symbolContainerStyle}>
                {generateAvailableSymbols()}    
            </Row>
        </div>
    );
};

export default Add;