
import React, { useState, useEffect } from 'react';
import { Search, SymbolLookupCard } from '../components';
import { get } from '../utils/baseRequest';
import { useDebounce } from '../utils/utils';
import { Row, Col, Pagination } from 'react-bootstrap';

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

const MAX_PAGE_WINDOW_SIZE = 7;

const Securities = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const [searchQueryResult, setSearchQueryResult] = useState({
        pages: 0,
        symbols: [],
        total: 0,
    });

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        async function searchForQuery() {
            if (searchTerm !== debouncedSearchTerm) {
                setPageNumber(0);
                return;
            }
            const searchQuery = {
                keywords: debouncedSearchTerm,
                offset: Math.max(pageNumber, 0),
            };
            const queryString = new URLSearchParams(searchQuery).toString();
            const response = await get(`/market-data/us-ex-symbols?${queryString}`);
            const queryResult = response.data;
            setSearchQueryResult(queryResult);
        }
        searchForQuery();
    }, [pageNumber, searchTerm, debouncedSearchTerm]);

    const renderMatchedSymbols = () => {
        const renderedCards = searchQueryResult?.symbols?.map((symbol) => {
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

    const paginationItemOnClick = (pageIndex) => {
        return () => {
            const normalizedPageIndex = Math.min(
                Math.max(pageIndex, 0),
                searchQueryResult.pages - 1
            );
            setPageNumber(normalizedPageIndex);
        }
    }

    const renderPagination = () => {
        const pageWindowSize = Math.min(MAX_PAGE_WINDOW_SIZE, searchQueryResult.pages);
        const offset = Math.floor(pageWindowSize / 2);

        let pageNumbersLeft = Math.max(pageNumber - offset, 0);
        let pageNumbersRight = Math.min(pageNumber + offset, searchQueryResult.pages - 1);
        const totalPages = pageNumbersRight - pageNumbersLeft + 1;

        if (totalPages < pageWindowSize) {
            const difference = pageWindowSize - totalPages;
            if (pageNumber - pageNumbersLeft < offset) {
                pageNumbersRight += difference;
            } else {
                pageNumbersLeft -= difference;
            }
        }

        const pageItems = [];
        for (let pageId = pageNumbersLeft; pageId <= pageNumbersRight; ++pageId) {
            const pageItem = (
                <Pagination.Item
                    active={pageId === pageNumber}
                    key={pageId}
                    onClick={paginationItemOnClick(pageId)}
                >
                    {pageId + 1}
                </Pagination.Item>
            );
            pageItems.push(pageItem);
        }
        return pageItems;
    }

    return (
        <div style={securitiesContainerStyle}>
            <h2>Securities</h2>
            <Search onChangeHandle={(text) => {setSearchTerm(text)}}/>
            <Pagination>
                <Pagination.First onClick={paginationItemOnClick(0)} />
                <Pagination.Prev onClick={paginationItemOnClick(pageNumber - 1)}/>
                {renderPagination()}
                <Pagination.Next onClick={paginationItemOnClick(pageNumber + 1)}/>
                <Pagination.Last onClick={paginationItemOnClick(searchQueryResult.pages - 1)}/>
            </Pagination>
            <Row style={symbolContainerStyle}>
                {renderMatchedSymbols()}
            </Row>
        </div>
    );
};

export default Securities;
