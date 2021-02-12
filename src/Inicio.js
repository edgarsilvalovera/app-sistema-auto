import React from 'react';
import { Navbar } from './ui/Navbar';


export const Inicio = () => {
    return(       
        <div>
            <Navbar />

            <h1>Menú</h1>

            <ul>
                <li><a href='/propietarios'>Módulo Propietarios</a></li>
                <li><a href='/autos'>Módulo Autos</a></li>                
                <li>
                    Módulo Transacción
                    <ul>
                        <li><a href='/transaccion'>Nueva</a></li>
                        <li><a href='/transaccion/search'>Consulta</a></li>
                    </ul>
                </li>
            </ul>

        </div>
    )
}

