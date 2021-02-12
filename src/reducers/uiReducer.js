import { types } from "../types/types";

const initialState = {
    modalOpen: false,
    modalOpenSearch: false,
    modalOpenAutos: false
    
}

export const uiReducer = ( state = initialState, action ) => {
    switch( action.type ){
        case types.uiOpenModal:            
            return {
                ...state,
                modalOpen: true,                
            };
        

        case types.uiCloseModal:
            return {
                ...state,
                modalOpen: false
            }

        case types.uiOpenModalSearch:
            return {
                ...state,
                modalOpenSearch: true
            };
        

        case types.uiCloseModalSearch:            
            return {
                ...state,
                modalOpenSearch: false
            }

        case types.uiOpenModalAutos:
            return {
                ...state,
                modalOpenAutos: true
            };
        

        case types.uiCloseModalAutos:            
            return {
                ...state,
                modalOpenAutos: false
            }

        default:
            return state;
        break;
    }

};