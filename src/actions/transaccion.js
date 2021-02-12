import { fetchConToken, fetchSinToken} from "../helpers/fetch";
import { types } from "../types/types";

import Swal from 'sweetalert2';

export const transaccionStartAddNew = (transacciones) => {
    return async( dispatch ) => {
        try{
            const resp = await fetchSinToken('transaccion/register', transacciones, 'POST');
            const body = await resp.json();                        

            if(body.status == "success"){                   
                Swal.fire({                    
                    title: body.message,
                    text: "",
                    icon: "success",
                    button: "Aww yiss!",
                  });

                  dispatch(transaccionClearActive());
            }else{
                Swal.fire({
                    title: body.message,
                    text: "",
                    icon: "error"
                  });
            }            
        }catch(error){
            console.log(error);
        }
    };
}

export const transaccionSetActive = (transaccion) => ({
    type: types.transaccionSetActive,
    payload: transaccion
});

export const transaccionClearActive = () => ({type: types.transaccionClearActive});

export const transaccionStartSearch = (transaccion) => {
    return async( dispatch ) => {        
        try{                        
            let endpoint = 'transaccion/'+transaccion.autoId;
            
            const resp = await fetchSinToken(endpoint);//GET
            const body = await resp.json();                                    
            
            dispatch(transaccionLoaded(body.transacciones));            
        }catch(error){
            console.log(error);
        }        
    }
}

const transaccionLoaded = (transacciones) => ({
    type: types.transaccionLoaded,
    payload: transacciones
});