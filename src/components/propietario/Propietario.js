import React , {useEffect} from 'react';
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
import { NewFab } from '../../ui/NewFab';
import { SearchFab } from '../../ui/SearchFab';

import { PropietarioModal } from './PropietarioModal';
import { SearchPropietarioModal } from './SearchPropietarioModal';
import { AutosModal } from './AutosModal';


//Importaciones del control de los eventos
import { uiOpenModal, uiOpenModalAutos } from '../../actions/ui';
import { propietarioStartDelete, propietarioSetActive, propietarioStartLoading, propietarioSearchAutos } from '../../actions/propietarios';


export const Propietario = () => {
    
    const dispatch = useDispatch();

    //Variables
    const { propietarios } = useSelector(state => state.propietario );
    
    //Effect
    useEffect(() => {        
        dispatch( propietarioStartLoading() );              
    }, [ dispatch ]);

    //Acciones
    const handleUpdate = (propietario) => {        
        dispatch( propietarioSetActive( propietario ) );        
        dispatch( uiOpenModal() );                
    }

    const handleDelete = (propietario) => {
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
                dispatch( propietarioSetActive( propietario ) );              
                dispatch( propietarioStartDelete( propietario.id ) );
            }
          });
    }

    const handleClickAuto = (propietario) => {           
        dispatch( propietarioSetActive( propietario ) );          
        dispatch( propietarioSearchAutos( propietario ) );        
        dispatch( uiOpenModalAutos() );                
    }
    
    return(
        <div>
            <Navbar />
            <h1>Listado de Propietarios</h1>
            <TableContainer component={Paper}>
                <Table className='table-propietario' aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Apellido</TableCell>
                            <TableCell align="left">Nombre</TableCell>
                            <TableCell align="left">Documento</TableCell>
                            <TableCell align="left">Dirección</TableCell>
                            <TableCell align="left">Teléfono</TableCell>                        
                            <TableCell align="left">Acción</TableCell>                        
                        </TableRow>
                    </TableHead>

                    <TableBody>
                    {
                        propietarios.map((propietario) => (                                           
                        <TableRow key={propietario.id}>
                            <TableCell align="left" component="th" scope="row">                                
                                {propietario.apellido}
                            </TableCell>
                            <TableCell align="left">                                
                                {propietario.nombre}
                            </TableCell>
                            <TableCell align="left">{propietario.documento}</TableCell>
                            <TableCell align="left">{propietario.direccion}</TableCell>
                            <TableCell align="left">{propietario.telefono}</TableCell>                            
                            <TableCell align="left">
                                <i 
                                    title='Actualizar' 
                                    className="far fa-edit fa-edit-primary"
                                    onClick={ () => handleUpdate(propietario) }                                    
                                >                                        
                                </i>
                                <span> </span>
                                <i 
                                    title='Eliminar' 
                                    className="fas fa-trash-alt fa-trash-alt-danger"
                                    onClick={ () => handleDelete(propietario) }                                    
                                >                                    
                                </i>
                                <span> </span>
                                <i 
                                    title='Ver Autos' 
                                    className="fas fa-car-alt" 
                                    onClick={ () => handleClickAuto(propietario) }                                    
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

            <PropietarioModal />
            <SearchPropietarioModal />
            <AutosModal />
            
        </div>
    )
}








