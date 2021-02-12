import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

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
import { CheckServicios } from './CheckServicios';

//Importaciones del control de los eventos
import { uiOpenModal } from '../../actions/ui';
import { propietarioSearchAutos, propietarioSetActive, propietarioStartLoading } from '../../actions/propietarios';
import { servicioStartLoading } from '../../actions/servicios';
import { transaccionSetActive, transaccionClearActive, transaccionStartAddNew, transaccionStartSearch } from '../../actions/transaccion';

const initTransaccion = {
    propietarioId: '',
    autoId: '',
    servicioId: '',
    costoServicio: '',
    servicio: ''
}

function totalTransaccion(transacciones){    
    let suma = 0;
    transacciones.map((transaccion, index) => ( 
        suma = suma + parseFloat(transaccion.costoServicioTransaccion)
    ));
    suma = (isNaN(suma))?0:suma;
    return suma;
} 

export const TransaccionSearch = () => {
    
    const dispatch = useDispatch();

    //Variables        
    const { propietarios } = useSelector(state => state.propietario );
    const { servicios } = useSelector(state => state.servicio ); 
    const { autos } = useSelector(state => state.propietario );
    const { transacciones } = useSelector(state => state.transaccion );

    const [formValues, setFormValues]= useState(initTransaccion);
    const { autoId, propietarioId }= formValues;

    const [autoIdValid, setAutoIdValid] = useState(true);

    //Effect
    useEffect(() => {        
        dispatch( propietarioStartLoading() );                
    }, [ dispatch ]);

    useEffect(() => {        
        dispatch( servicioStartLoading() );
    }, [ dispatch ]);

    //Acciones
    const handelChangeAuto = ({ target }) => {        
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });

        let auto = autos.filter(
            a => ( a.id == target.value)
        );
        
        setFormValues({
            ...formValues,
            autoId: target.value,
            marca: auto[0].marca,
            modelo: auto[0].modelo,
            patente: auto[0].patente            
        });      
    };  

    const handleOnChangePropietario = (event) => {        
        let value = event.target.value;     
        
        let propietario = propietarios.filter(
            a => ( a.id == value)
        );              
        
        dispatch( transaccionClearActive() );
        dispatch( propietarioSetActive( propietario[0] ) );
        dispatch( propietarioSearchAutos( propietario[0] ) );        
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();        

        if(autoId == ""){            
            setAutoIdValid(false);
            return true;
        }      
        setAutoIdValid(true);  

        dispatch( transaccionSetActive( formValues ) );
        dispatch( transaccionStartSearch( formValues ) );

        //setFormValues( initTransaccion );
    };

    return(
        <div>
            <Navbar />

            <h1>Consultar Transacción</h1>

            <hr />
            <form 
                className="container"
                onSubmit={handleSubmitForm}
            >

                <div className="form-group">
                    <label>Propietario</label>
                    <select 
                        className='form-control'
                        name="propietarioId"
                        onChange={ handleOnChangePropietario }
                        defaultValue={ propietarioId}
                    >
                        <option value=''>Seleccione...</option>
                        {
                            propietarios.map((propietario) => (
                                <option key={propietario.id} value={propietario.id}>
                                    {propietario.documento + ' - ' + propietario.apellido + ' ' + propietario.nombre}
                                </option>
                            ))                               
                        }
                    </select>             
                </div>

                <div className="form-group">
                    <label>Auto</label>
                    <select                         
                        className={`form-control ${ (!autoIdValid) && 'is-invalid'  }`}
                        name='autoId'
                        onChange={ handelChangeAuto }
                        defaultValue={autoId}
                    >
                        <option value=''>Seleccione...</option>
                        {
                            (autos) &&    autos.map((auto) => (
                                <option key={auto.id} value={auto.id}>
                                    {auto.marca + ' - ' + auto.modelo + ' - ' + auto.patente}
                                </option>                                
                            ))                         
                        }
                    </select>            
                </div>

                
                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Consultar</span>
                </button>                
            </form>
            {
                (transacciones && transacciones.length > 0) &&       
                    <div>                        
                        <TableContainer component={Paper}>
                            <Table className='table-auto' aria-label="simple table">
                                <TableHead>
                                    <TableRow>                                        
                                        <TableCell align="right">Fecha</TableCell>
                                        <TableCell align="right">Servicio</TableCell>
                                        <TableCell align="right">Costo</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                {
                                    transacciones.map((transaccion, index) => (                                                                                   
                                    <TableRow key={index}>                                        
                                        <TableCell component="th" scope="row" align="right">                                
                                            { transaccion.createdAt }
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="right">                                
                                            { transaccion.servicio.servicio }
                                        </TableCell>
                                        <TableCell align="right" >                                        
                                            {transaccion.costoServicioTransaccion}                                            
                                        </TableCell>               
                                    </TableRow>
                                    ))
                                }
                                    <TableRow key={500}>                                        
                                        <TableCell component="th" scope="row" align="left">                                                                            
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="left">                                
                                            <b>Total</b>
                                        </TableCell>
                                        <TableCell  component="th" scope="row" align="right">                                
                                            <b>{totalTransaccion(transacciones)}</b>
                                        </TableCell>                                                   
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>         
            }
        </div>
    )
}








