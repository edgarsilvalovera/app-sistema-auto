import { types } from '../types/types';
import { fetchSinToken} from "../helpers/fetch";


/* Temporal Mienstras Implemeto la API */
// function createPropietario(apellido, nombre, documento, direccion, telefono){
//     return {apellido, nombre, documento, direccion, telefono};
// }

// function createAuto(id, marca, modelo, anio, patente, color, propietario) {
//     return { id, marca, modelo, anio, patente, color, propietario };
// }  

// function Propietarios(){
//     return [
//         createPropietario('Silva', 'Edgar', 96024788, 'Roque Perez 3160', '1150280326'),
//         createPropietario('Hernandez', 'Guido', 95025789, 'Tucuman 3150', '1150280526'),
//         createPropietario('Fernandez', 'Franco', 95025741, 'Gallo 780', '1145685215')
//     ]
// }

// const propietarios = Propietarios();

// const autos = [
// createAuto(1, 'Chevrolet', 'Modelo 1', 2015, 'AFG5', '#F0F0F0', propietarios[0]),
// createAuto(2, 'Ferrari', 'Modelo 2', 2016, 'PAT2', '#AD4523' , propietarios[1]),
// createAuto(3, 'Marca1', 'Modelo 3', 2017, 'PAT3', '#F423ED', propietarios[2]),
// createAuto(4, 'Marca2', 'Modelo 4', 2018, 'PAT4', '#B45A23', propietarios[0]),
// createAuto(5, 'Marca3', 'Modelo 5', 2019, 'PAT5', '#123456', propietarios[1]),
// createAuto(6, 'Marca SP', 'Modelo 6', 2019, 'PAT6', '#1234566', {}),
// createAuto(7, 'Marca7', 'Modelo 7', 2019, 'PAT7', '#1234567', {}),
// createAuto(8, 'Marca8', 'Modelo 8', 2019, 'PAT8', '#1234568', {}),
// createAuto(9, 'Marca9', 'Modelo 9', 2019, 'PAT9', '#1234569', {}),
// createAuto(10, 'Marca10', 'Modelo 10', 2019, 'PAT10', '#12345610', {})
// ];
/* FIn Temporal Mienstras Implemeto la API */

//const resp = await fetchSinToken('auto', {}, 'GET');
//const autos = await resp.json();



const initialState = {
    autos: [],
    activeAuto: null
};

export const autoReducer = ( state = initialState, action ) => {    
    switch( action.type ){   

        case types.autoSetActive:            
            return {
                ...state,
                activeAuto: action.payload
            }     

        

        case types.autoAddNew:
            return{
                ...state,
                autos: [                  
                    ...state.autos,             
                    action.payload
                ]
            }
        
        case types.autoClearActive:
            return{
                ...state,
                activeAuto: null
            }

        case types.autoUpdated:
            return{
                ...state,
                autos: state.autos.map(
                    a => ( a.id === action.payload.id ) ? action.payload : a
                )
            }

        case types.autoDeleted:
            return{
                ...state,//regreso todo el objeto state
                autos: state.autos.filter(
                    a => ( a.id !== state.activeAuto.id )
                ),
                activeAuto: null
            }
            
        case types.autoSearch:
            return{
                ...state,//regreso todo el objeto state
                autos: state.autos.filter(
                    a => ( a.id === state.activeAuto.id )
                ),
                activeAuto: null
            }

        case types.autoLoaded:
            return{
                ...state,
                autos: [ ...action.payload]
            }

        default:
            return state;        
    }
}