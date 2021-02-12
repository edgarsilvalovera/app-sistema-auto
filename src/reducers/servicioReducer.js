import { types } from '../types/types';


/* Temporal Mienstras Implemeto la API */
// function createServicio(id, servicio, costo){
//     return {id, servicio, costo};
// }

// const servicios = [
//     createServicio(1, 'Cambio de Aceite', 1000),
//     createServicio(2, 'Cambio de Filtro', 2000),
//     createServicio(3, 'Cambio de Correa', 500),
//     createServicio(4, 'Revisión General', 600),
//     createServicio(5, 'Otro', 1500)
// ];
/* FIn Temporal Mienstras Implemeto la API */



const initialState = {
    servicios: [],
    activeServicio: null

};

export const servicioReducer = ( state = initialState, action ) => {    
    switch( action.type ){   
        case types.servicioLoaded:
            return{
                ...state,
                servicios: [ ...action.payload]
            }

        default:
            
            return state;        
    }
}