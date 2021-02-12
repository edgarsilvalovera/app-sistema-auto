import React , {useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Importaciones de Librerias
import Modal from 'react-modal';

//Importaciones para la tabla
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

//Importaciones de lso Eventos
import { uiCloseModalAutos } from '../../actions/ui';
import { propietarioSetActive, propietarioStartSearch, propietarioClearActive } from '../../actions/propietarios';

//Instancia de la Modal
Modal.setAppElement('#root');

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};

export const AutosModal = () => {
    
    const dispatch = useDispatch();    

    //Variables
    const { modalOpenAutos } = useSelector(state => state.ui );    
    const { autos } = useSelector(state => state.propietario );
    
    //Acciones
    const closeModal = () => {                
        dispatch( uiCloseModalAutos() );        
        //dispatch( propietarioClearActive () );//para limpiar la modal        
    }

    return(
        <Modal
          isOpen={modalOpenAutos}
          //onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}          
          className="modal"
          overlayClassName="modal-fondo"
          closeTimeoutMS={500}
        >
            <h1>                
                Autos
            </h1>
            <hr></hr>
            {
                (autos && autos.length > 0) &&                     
                <TableContainer component={Paper}>
                    <Table className='table-propietario' aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Marca</TableCell>
                                <TableCell align="left">Modelo</TableCell>
                                <TableCell align="left">Patente</TableCell>                                                     
                            </TableRow>
                        </TableHead>

                        <TableBody>
                        {
                            autos.map((auto) => (                                           
                            <TableRow key={auto.id}>                                
                                <TableCell align="left">{auto.marca}</TableCell>
                                <TableCell align="left">{auto.modelo}</TableCell>
                                <TableCell align="left">{auto.color}</TableCell>                                                                                        
                            </TableRow>
                            ))
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </Modal>
    )
}

