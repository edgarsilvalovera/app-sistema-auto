import React from 'react';
import { useSelector } from 'react-redux';

export const CheckServicios = ( {id} ) => {
    
    
    const { servicios } = useSelector(state => state.servicio ); 
    
    return(    
        <div>
            {
                servicios.map((servicio) => (
                <div className="form-check" key={servicio.id}>
                    <input className="form-check-input" type="checkbox" value={servicio.id} name={id + `_servicio[]`} />
                    <label className="form-check-label">
                        {servicio.servicio + ' - ' + servicio.costo + '--->' + id}
                    </label>
                </div>
                ))
            }     
        </div>   
    )
}








