import { types } from "../types/types";
import { fetchConToken, fetchSinToken} from "../helpers/fetch";

import Swal from 'sweetalert2';

export const servicioStartLoading = () => {
    return async( dispatch ) => {
        //Tarea Asincrona
        try{
            const resp = await fetchSinToken('servicio/all');//GET
            const body = await resp.json();                                    

            dispatch(servicioLoaded(body));
        }catch(error){
            console.log(error);
        }        
    }
}

const servicioLoaded = (servicio) => ({
    type: types.servicioLoaded,
    payload: servicio
});