
import React, { useState } from 'react';

const Search = () => {
    const [currentEnteredText, updateCurrentEnteredText] = useState();

    return (    
        <div>
            <input 
                placeholder={'Search...'}
                onChange={e => {updateCurrentEnteredText(e.target.value)}}
            ></input>
        </div>
    ); 
};

export default Search; 