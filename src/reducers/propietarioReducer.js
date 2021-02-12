import { types } from '../types/types';


/* Temporal Mienstras Implemeto la API */
// function createPropietario2(id, apellido, nombre, documento, direccion, telefono, autos){
//     return {id, apellido, nombre, documento, direccion, telefono, autos};
// }

// function createAuto2(id, marca, modelo, anio, patente, color) {
//     return { id, marca, modelo, anio, patente, color };
// } 

// function Autos2(){
//     return [
//         createAuto2(1, 'Chevrolet', 'Modelo 1', 2015, 'AFG5', '#F0F0F0'),
//         createAuto2(2, 'Ferrari', 'Modelo 2', 2016, 'PAT2', '#AD4523'),
//         createAuto2(3, 'Marca1', 'Modelo 3', 2017, 'PAT3', '#F423ED'),
//         createAuto2(4, 'Marca2', 'Modelo 4', 2018, 'PAT4', '#B45A23'),
//         createAuto2(5, 'Marca3', 'Modelo 5', 2019, 'PAT5', '#123456')
//     ];
// }

// const losAutos = Autos2();

// const misPropietarios = [
//     createPropietario2(1, 'Silva', 'Edgar', '96024788', 'Roque Perez 3160', '1150280326',[losAutos[0], losAutos[3]] ),
//     createPropietario2(2, 'Hernandez', 'Guido', '95025789', 'Tucuman 3150', '1150280526', [losAutos[1], losAutos[4]]),
//     createPropietario2(3, 'Fernandez', 'Franco', '95025741', 'Gallo 780', '1145685215', [ losAutos[2] ])
// ];
/* FIn Temporal Mienstras Implemeto la API */

const initialState = {
    propietarios: [],
    activePropietario: null,
    autos: []

};

export const propietarioReducer = ( state = initialState, action ) => {    
    switch( action.type ){   

        case types.propietarioSetActive:                     
            return {
                ...state,
                activePropietario: action.payload
            }     
     

        case types.propietarioAddNew:
            return{
                ...state,
                propietarios: [                  
                    ...state.propietarios,             
                    action.payload
                ]
            }
        
        case types.propietarioClearActive:            
            return{
                ...state,
                activePropietario: null
            }

        case types.propietarioUpdated:
            return{
                ...state,
                propietarios: state.propietarios.map(
                    p => ( p.id === action.payload.id ) ? action.payload : p
                )
            }

        case types.propietarioDeleted:
            return{
                ...state,//regreso todo el objeto state
                propietarios: state.propietarios.filter(
                    p => ( p.id !== state.activePropietario.id )
                ),
                activePropietario: null
            }
            
        case types.propietarioSearch:
            return{
                ...state,//regreso todo el objeto state
                propietarios: state.propietarios.filter(
                    p => ( p.id === state.activePropietario.id )
                ),
                activePropietario: null
            }

        case types.propietarioLoaded:
            return{
                ...state,
                propietarios: [ ...action.payload]
            }

        case types.propietarioAutosLoaded:            
            return{
                ...state,                
                autos: [ ...action.payload]
            }

        default:
            return state;        
    }
}