import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Swal from 'sweetalert2';

//Importaciones para la tabla
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

//Importaciones de los componentes de mi APP
import { Navbar } from '../../ui/Navbar';
import { AutoModal } from './AutoModal';
import { SearchAutoModal } from './SearchAutoModal';
import { NewFab } from '../../ui/NewFab';
import { SearchFab } from '../../ui/SearchFab';

//Importaciones del control de los eventos
import { uiOpenModal } from '../../actions/ui';
import { autoStartDelete, autoSetActive, autoStartLoading } from '../../actions/autos';

export const Auto = () => {
    
    const dispatch = useDispatch();

    //Variables
    const { autos } = useSelector(state => state.auto );   

    //Effects
    useEffect(() => {        
        dispatch( autoStartLoading() );
    }, [ dispatch ]);

    //Acciones
    const handleUpdate = (auto) => {
        dispatch( autoSetActive( auto ) );        
        dispatch( uiOpenModal() );                
    }

    const handleDelete = (auto) => {
        Swal.fire({
            title: 'Confirme que desea eliminar el auto?',
            text: "No podrás revertir los cambios!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si!',
            cancelButtonText: 'No'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch( autoSetActive( auto ) );        
                dispatch( autoStartDelete( auto.id ) );
            }
          });
    }

    return(
        <div>
            <Navbar />            
            <h1>Listado de Autos</h1>
            <TableContainer component={Paper}>
                <Table className='table-auto' aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Auto</TableCell>
                            <TableCell align="right">Color</TableCell>
                            <TableCell align="right">Año</TableCell>
                            <TableCell align="right">Patente</TableCell>
                            <TableCell align="left">Propietario</TableCell>                        
                            <TableCell align="left">Acción</TableCell>                        
                        </TableRow>
                    </TableHead>

                    <TableBody>
                    {
                        autos.map((auto) => (                                           
                        <TableRow key={auto.id}>
                            <TableCell component="th" scope="row">                                
                                {auto.marca + ' - ' + auto.modelo}
                            </TableCell>
                            <TableCell align="right">
                                <i className="fas fa-car-alt" ></i>                                 
                                {auto.color}
                            </TableCell>
                            <TableCell align="right">{auto.anio}</TableCell>
                            <TableCell align="right">{auto.patente}</TableCell>
                            <TableCell align="left">
                                {                                    
                                    (auto.hasOwnProperty('propietario') && Object.entries(auto.propietario).length >0 )?auto.propietario.documento + ' - ' + auto.propietario.apellido + ' ' + auto.propietario.nombre : 'S/P'
                                }
                            </TableCell>                            
                            <TableCell align="left">
                                <i 
                                    title='Actualizar' 
                                    className="far fa-edit fa-edit-primary"
                                    onClick={ () => handleUpdate(auto) }                                    
                                >                                        
                                </i>
                                <span> </span>
                                <i 
                                    title='Eliminar' 
                                    className="fas fa-trash-alt fa-trash-alt-danger"
                                    onClick={ () => handleDelete(auto) }                                    
                                >                                    
                                </i>
                            </TableCell>                            
                        </TableRow>
                        ))
                    }
                    </TableBody>
                </Table>
            </TableContainer>

            <NewFab />
            <SearchFab />

            <AutoModal />
            <SearchAutoModal />
        </div>
    )
}








