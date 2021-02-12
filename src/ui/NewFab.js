import React from 'react';

import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../actions/ui';


export const NewFab = () => {
    
    const dispatch = useDispatch();

    const handleClickNew = () => {        
        dispatch( uiOpenModal() );        
    }

    return(        
        <button 
            className="btn btn-success fab fab-left"
            onClick={ handleClickNew }
        >
            <i className='fas fa-plus'></i>                
        </button>        
    )
}

