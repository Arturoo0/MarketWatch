
import React from 'react';

const Search = (props) => {
    return (    
        <div>
            <input 
                placeholder={'Search...'}
                onChange={e => props.onChangeHandle(e.target.value)}
            ></input>
        </div>
    ); 
};

export default Search; 