
import React from 'react';
import { Search } from '../components';

const addContainerStyle = {
    padding: '10px 10px'
};

const Add = () => {
    return (
        <div style={addContainerStyle}>
            <Search />
        </div>
    );
};

export default Add;