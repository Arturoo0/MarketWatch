
import React, { useState, useEffect } from 'react';
import { Search } from '../components';
import { get } from '../utils/baseRequest';

const addContainerStyle = {
    padding: '10px 10px'
};

const Add = () => {
    const [currentEnteredSearchText, updateCurrentEnteredSearchText] = useState();
    useEffect(async () => {
        const pullTickers = async () => {
            // get()
        }
    }, [currentEnteredSearchText]); 
    return (
        <div style={addContainerStyle}>
            <Search onChangeHandle={(text) => {updateCurrentEnteredSearchText(text)}}/>
        </div>
    );
};

export default Add;