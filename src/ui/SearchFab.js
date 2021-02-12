import React from 'react';

import { useDispatch } from 'react-redux';
import { uiOpenModalSearch } from '../actions/ui';
 

export const SearchFab = () => {
    
    const dispatch = useDispatch();

    const handleClickSearch = () => {        
        dispatch( uiOpenModalSearch() );        
    }

    return(        
        <button 
            className="btn btn-primary fab fab-right"
            onClick={ handleClickSearch }
        >
            <i className="fas fa-search"></i>
        </button>        
    )
}

