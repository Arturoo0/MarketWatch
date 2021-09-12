import React from 'react';
import { BsSearch } from 'react-icons/bs';

const searchWrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    margin: '2rem auto',
    borderRadius: '1rem'
}

const searchInputStyle = {
    width: '90%',
    flexGrow: 10,
    border: 0,
    outline: 'none',
    fontWeight: 400,
    fontSize: '1.2rem',
    color: '#555',
}

const searchIconStyle = {
    flexGrow: 1,
    margin: '0.5rem 1rem',
}

const Search = (props) => {
    return (
        <div
            style={searchWrapperStyle}
            className='shadow-sm border'
        >
            <BsSearch style={searchIconStyle} />
            <input
                style={searchInputStyle}
                placeholder={'Search for symbol, name, etc'}
                onChange={e => props.onChangeHandle(e.target.value)}
            ></input>
        </div>
    ); 
};

export default Search; 