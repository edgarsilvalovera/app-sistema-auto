import { types } from '../types/types';


const initialState = {
    transacciones: []    
};

export const transaccionReducer = ( state = initialState, action ) => {    
    switch( action.type ){   

        case types.transaccionSetActive:                        
            return{
                ...state,
                transacciones: [                  
                    ...state.transacciones,             
                    action.payload
                ]
            }
        
        case types.transaccionAddNew:            
            return{
                ...state,
                transacciones: [                                      
                    action.payload
                ]
            }

        case types.transaccionClearActive:                
            return{
                ...state,                
                transacciones: []
            }

        case types.transaccionLoaded:
            return{
                ...state,
                transacciones:  action.payload
            }
    
            
        default:
            
            return state;        
    }
}