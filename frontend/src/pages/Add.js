
import React, { useState, useEffect } from 'react';
import { Search, SymbolLookupCard } from '../components';
import { get } from '../utils/baseRequest';
import { useDebounce } from '../utils/utils';
import { Row, Col } from 'react-bootstrap';

const addContainerStyle = {
    padding: '10px 10px',
    height: '100vh'
};

const symbolContainerStyle = {
    marginTop: '4px'
}

const Add = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [matchedSymbols, setMatchedSymbols] = useState({});

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(async () => {
        const searchQuery = {
            keywords: searchTerm,
        };
        const queryString = new URLSearchParams(searchQuery).toString();
        const response = await get(`/market-data/us-ex-symbols?${queryString}`);
        const matchedSymbols = response.data;
        setMatchedSymbols(matchedSymbols);
    }, [debouncedSearchTerm]);

    const renderMatchedSymbols = () => {
        const renderedCards = matchedSymbols?.US_EX_SYMBOLS?.map((symbol) =>
            <Col><SymbolLookupCard data={
                {
                    symbol: symbol.displaySymbol,
                    description: symbol.description,
                    symbolType: symbol.type
                }
            }/></Col>
        );
        return renderedCards?.length > 0 ? renderedCards : 'No matching symbols.';
    }

    return (
        <div style={addContainerStyle}>
            <Search onChangeHandle={(text) => {setSearchTerm(text)}}/>
            <Row style={symbolContainerStyle}>
                {renderMatchedSymbols()}
            </Row>
        </div>
    );
};

export default Add;