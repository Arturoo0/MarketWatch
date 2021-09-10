
import React, { useState } from 'react';
import { Search } from '../components';

const addContainerStyle = {
    padding: '10px 10px'
};

const Add = () => {
    const [currentEnteredSearchText, updateCurrentEnteredSearchText] = useState();

    return (
        <div style={addContainerStyle}>
            <Search onChangeHandle={(text) => {updateCurrentEnteredSearchText(text)}}/>
        </div>
    );
};

export default Add;