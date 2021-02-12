import { fetchSinToken} from "../helpers/fetch";
import { types } from "../types/types";

import Swal from 'sweetalert2';

export const autoStartAddNew = (auto) => {
    return async( dispatch ) => {
        try{            
            const resp = await fetchSinToken('auto/register', auto, 'POST');
            const body = await resp.json();                        

            if(body.status == "success"){                
                dispatch( autoAddNew( body.auto ) );

                Swal.fire({                    
                    title: body.message,
                    text: "",
                    icon: "success"                    
                  });
            }else{
                Swal.fire({
                    title: body.message,
                    text: "",
                    icon: "error"
                  });
            }

            dispatch( autoClearActive () );//para limpiar el auto activo
        }catch(error){
            console.log(error);
        }
    };
}

const autoAddNew = (auto) => ({
    type: types.autoAddNew,
    payload: auto
});

export const autoSetActive = (auto) => ({
    type: types.autoSetActive,
    payload: auto
});

export const autoClearActive = () => ({type: types.autoClearActive});

export const autoStartUpdate = ( auto ) => {
    return async( dispatch ) => {
        try{
            const resp = await fetchSinToken('auto/edit/' + auto.id, auto , 'PUT');
            const body = await resp.json();             

            if(body.status == "success"){  
                dispatch( autoUpdated( body.auto ) );

                Swal.fire({                    
                    title: body.message,
                    text: "",
                    icon: "success"
                  });
            }else{
                Swal.fire({
                    title: body.message,
                    text: "",
                    icon: "error"
                  });
            }
            dispatch( autoClearActive () );//para limpiar el auto activo                 
        }catch(error){
            console.log(error);
        }
    };
}

const autoUpdated = ( auto ) => ({
    type: types.autoUpdated,
    payload: auto
});

export const autoStartDelete = ( id ) => {
    return async( dispatch ) => {
        try{
            const resp = await fetchSinToken('auto/delete/' + id, {} , 'DELETE');
            const body = await resp.json();             

            if(body.status == "success"){
                dispatch( autoDeleted() );

                Swal.fire({                    
                    title: body.message,
                    text: "",
                    icon: "success"                    
                  });
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

const autoDeleted = () => ({type: types.autoDeleted});

export const autoStartSearch = (auto) => {
    return async( dispatch ) => {        
        try{            
            let endpoint = 'auto?';
            
            Object.keys(auto).forEach(function(key) {                
                if(auto[key] != '')
                    endpoint = endpoint + key + '=' +auto[key] + '&';
            });
            
            endpoint = (endpoint == 'auto?')? 'auto/all' : endpoint.substring(0,(endpoint.length -1));                   

            const resp = await fetchSinToken(endpoint);//GET
            const body = await resp.json();

            dispatch(autoLoaded(body));            
        }catch(error){
            console.log(error);
        }        
    }
}

const autoSearch = () => ({type: types.autoSearch});

export const autoStartLoading = () => {
    return async( dispatch ) => {
        //Tarea Asincrona
        try{
            const resp = await fetchSinToken('auto/all');//GET
            const body = await resp.json();                                                

            dispatch(autoLoaded(body));
        }catch(error){
            console.log(error);
        }        
    }
}

const autoLoaded = (autos) => ({
    type: types.autoLoaded,
    payload: autos
});