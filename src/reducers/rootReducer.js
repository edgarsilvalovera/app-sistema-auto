import { combineReducers } from 'redux';
import { autoReducer } from './autoReducer';
import { propietarioReducer } from './propietarioReducer';
import { servicioReducer } from './servicioReducer';
import { transaccionReducer } from './transaccionReducer';
import { uiReducer } from './uiReducer';



export const rootReducer = combineReducers({
   ui: uiReducer,      
   auto: autoReducer,
   propietario: propietarioReducer,
   servicio: servicioReducer,
   transaccion: transaccionReducer,
   //TODO: AuthReducer 
   
});