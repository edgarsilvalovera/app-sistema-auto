import { types } from "../types/types";
import { fetchSinToken} from "../helpers/fetch";

import Swal from 'sweetalert2';
import { Propietario } from "../components/propietario/Propietario";

export const propietarioStartAddNew = (propietario) => {
    return async( dispatch ) => {
        try{                        

            const resp = await fetchSinToken('propietario/register', propietario, 'POST');
            const body = await resp.json();                        

            if(body.status == "success"){                
                dispatch( propietarioAddNew( body.propietario ) );

                Swal.fire({                    
                    title: body.message,
                    text: "",
                    icon: "success",                    
                  });
            }else{
                Swal.fire({
                    title: body.message,
                    text: "",
                    icon: "error"                    
                  });
            }

            dispatch( propietarioClearActive() );//para limpiar el propietario activo     
        }catch(error){
            console.log(error);
        }

        
    };
}

const propietarioAddNew = (propietario) => ({
    type: types.propietarioAddNew,
    payload: propietario
});

export const propietarioSetActive = (propietario) => ({
    type: types.propietarioSetActive,
    payload: propietario
});

export const propietarioClearActive = () => ({type: types.propietarioClearActive});

export const propietarioStartUpdate = ( propietario ) => {
    return async( dispatch ) => {
        try{
            const resp = await fetchSinToken('propietario/edit/' + propietario.id, propietario , 'PUT');
            const body = await resp.json(); 
            
            if(body.status == "success"){                                
                
                dispatch( propietarioUpdated( body.propietario ) );

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

            dispatch( propietarioClearActive () );//para limpiar el propietario activo                 
        }catch(error){
            console.log(error);
        }
    };
}

const propietarioUpdated = ( propietario ) => ({
    type: types.propietarioUpdated,
    payload: propietario
});

export const propietarioStartDelete = ( id ) => {
    return async( dispatch ) => {
        try{
            const resp = await fetchSinToken('propietario/delete/' + id, {} , 'DELETE');
            const body = await resp.json();             

            if(body.status == "success"){

                dispatch( propietarioDeleted() );

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

const propietarioDeleted = () => ({type: types.propietarioDeleted});

export const propietarioStartSearch = (propietario) => {
    return async( dispatch ) => {        
        try{                        
            let endpoint = 'propietario?';
            
            Object.keys(propietario).forEach(function(key) {
                if(propietario[key].trim().length > 0)
                    endpoint = endpoint + key + '=' +propietario[key] + '&';
            });

            endpoint = (endpoint == 'propietario?')? 'propietario/all' : endpoint.substring(0,(endpoint.length -1));            
            
            const resp = await fetchSinToken(endpoint);//GET
            const body = await resp.json();                                    

            dispatch(propietarioLoaded(body));            
        }catch(error){
            console.log(error);
        }        
    }
}

export const propietarioSearchAutos = (propietario) => {
    return async( dispatch ) => {        
        try{
            const resp = await fetchSinToken('propietario/searchAutos/'+propietario.id);//GET
            const body = await resp.json();  

            dispatch(propietarioAutosLoaded(body));            
        }catch(error){
            console.log(error);
        }        
    }
}

const propietarioSearch = () => ({type: types.propietarioSearch});

export const propietarioStartLoading = () => {
    return async( dispatch ) => {        
        try{
            const resp = await fetchSinToken('propietario/all');//GET
            const body = await resp.json();                                    

            dispatch(propietarioLoaded(body));
        }catch(error){
            console.log(error);
        }        
    }
}

const propietarioLoaded = (propietarios) => ({
    type: types.propietarioLoaded,
    payload: propietarios
});

const propietarioAutosLoaded = (autos) => ({
    type: types.propietarioAutosLoaded,
    payload: autos
});