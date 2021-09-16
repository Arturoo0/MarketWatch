
import React, { useState, useEffect } from 'react';
import { Search, SymbolLookupCard } from '../components';
import { getPortfolios } from '../actions/portfoliosActions.js';
import { useDispatch, useSelector } from 'react-redux';
import { get } from '../utils/baseRequest';
import { useDebounce } from '../utils/utils';
import { Row, Col } from 'react-bootstrap';

const securitiesContainerStyle = {
    margin: '1rem',
    padding: '1rem',
};

const symbolContainerStyle = {
    marginTop: '4px'
};

const noMatchesTextStyle = {
    margin: '1rem',
    textAlign: 'center',
}

const Securities = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [matchedSymbols, setMatchedSymbols] = useState({});

    const userId = useSelector(state => state.app.userId);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        async function searchForQuery() {
            const searchQuery = {
                keywords: debouncedSearchTerm,
            };
            const queryString = new URLSearchParams(searchQuery).toString();
            const response = await get(`/market-data/us-ex-symbols?${queryString}`);
            const matchedSymbols = response.data;
            setMatchedSymbols(matchedSymbols);
        }
        dispatch(getPortfolios(userId));
        searchForQuery();
    }, [debouncedSearchTerm, userId, dispatch]);

    const renderMatchedSymbols = () => {
        const renderedCards = matchedSymbols?.US_EX_SYMBOLS?.map((symbol) => {
            const cardData = {
                symbol: symbol.displaySymbol,
                description: symbol.description,
                symbolType: symbol.type
            };
            return (<Col key={symbol.displaySymbol}><SymbolLookupCard data={cardData}/></Col>);
        });
        return renderedCards?.length > 0
            ? renderedCards
            : <div style={noMatchesTextStyle}>No securities match this query.</div>
    }

    return (
        <div style={securitiesContainerStyle}>
            <h2>Securities</h2>
            <Search onChangeHandle={(text) => {setSearchTerm(text)}}/>
            <Row style={symbolContainerStyle}>
                {renderMatchedSymbols()}
            </Row>
        </div>
    );
};

export default Securities;
