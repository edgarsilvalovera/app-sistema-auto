import React , {useState , useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Importaciones de Librerias
import Swal from 'sweetalert2';
import Modal from 'react-modal';

import { uiCloseModal } from '../../actions/ui';
import { propietarioStartAddNew, propietarioClearActive, propietarioStartUpdate } from '../../actions/propietarios';
import { autoStartLoading } from '../../actions/autos';

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

const initPropietario = {
    apellido: '',
    nombre: '',
    documento: '',
    direccion: '',
    telefono: ''
};

export const PropietarioModal = () => {
    
    const dispatch = useDispatch();
    const { activePropietario } = useSelector(state => state.propietario );

    useEffect(() => {        
        dispatch( autoStartLoading() );
    }, [ dispatch ]);

    // let listAutos = autos.filter(
    //     a => ( Object.entries(a.propietario).length == 0 )//Lista de Autos Sin Propietarios
    // );

    // if(activePropietario){
    //     listAutos = autos.filter(
    //         a => ( a.propietario.documento == activePropietario.documento || a.hasOwnProperty('propietario') || Object.entries(a.propietario).length == 0 )//Lista de Autos Sin Propietarios
    //     );
    // }

    //Variables de la Modal
    const { modalOpen } = useSelector(state => state.ui );        

    //Acciones de la Modal
    const closeModal = () => {        
        dispatch( uiCloseModal() );
        dispatch( propietarioClearActive () );//para limpiar la modal        
    }

    //Variables del Formulario
    const [formValues, setFormValues]= useState(initPropietario);
    const { apellido, nombre, documento, direccion, telefono }= formValues;

    //Para actualizar el formvalues dependiendo si hay auto activo
    useEffect(() => {
        if( activePropietario ){
            setFormValues( activePropietario );
        }else{
            setFormValues( initPropietario );
        }   
    }, [activePropietario, setFormValues]);

    //Variables de Validación de Formulario
    const [apellidoValid, setApellidoValid] = useState(true);
    const [nombreValid, setNombreValid] = useState(true);
    const [documentoValid, setDocumentoValid] = useState(true);
    const [direccionValid, setDireccionValid] = useState(true);
    const [telefonoValid, setTelefonoValid] = useState(true);

    //Acciones del Formulario
    const handelInputChange = ({ target }) => {        
        setFormValues({
            ...formValues,
            [target.name]: target.value.toUpperCase()
        });
    };    
    
    const handleSubmitForm = (e) => {
        e.preventDefault();        
        //Validaciones del Formulario
        if(apellido.trim().length == 0){
            setApellidoValid(false);
            return true;
        }      
        setApellidoValid(true);  

        if(nombre.trim().length == 0){
            setNombreValid(false);
            return true;
        }        
        setNombreValid(true);
        
        if(documento.trim().length == 0){
            setDocumentoValid(false);
            return true;
        } 
        setDocumentoValid(true);       

        if(direccion.trim().length == 0){
            setDireccionValid(false);
            return true;
        }        
        setDireccionValid(true);

        if(telefono.trim().length == 0){
            setTelefonoValid(false);
            return true;
        }        
        setTelefonoValid(true);

        if( activePropietario ){            
            setFormValues({
                ...formValues,
                'id': activePropietario.id
            });
            dispatch( propietarioStartUpdate( formValues ) );  
            
        }else{
            dispatch( propietarioStartAddNew( formValues ) );
        }

        setFormValues( initPropietario );
        closeModal();     
    };


    return(
        <Modal
          isOpen={modalOpen}
          //onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}          
          className="modal"
          overlayClassName="modal-fondo"
          closeTimeoutMS={500}
        >
            <h1>                
                { (activePropietario)? 'Editar Propietario': 'Nuevo Propietario' } 
            </h1>
            <hr />
            <form 
                className="container"
                onSubmit={handleSubmitForm}
            >
                <div className="form-group">
                    <label>Apellido</label>
                    <input 
                        type="text" 
                        className={`form-control ${ (!apellidoValid) && 'is-invalid'  }`}
                        placeholder="Apellido"
                        name="apellido"
                        autoComplete="off"
                        value={apellido}
                        onChange={handelInputChange}
                    />                    
                </div>

                <div className="form-group">
                    <label>Nombre</label>
                    <input 
                        type="text" 
                        className={`form-control ${ !nombreValid && 'is-invalid' }`}
                        placeholder="Nombre"
                        name="nombre"
                        autoComplete="off"
                        value={nombre}
                        onChange={handelInputChange}
                    />                    
                </div>

                <div className="form-group">
                    <label>Documento</label>
                    <input 
                        type="text" 
                        className={`form-control ${ !documentoValid && 'is-invalid' }`}
                        placeholder="Documento"
                        name="documento"
                        autoComplete="off"
                        value={documento}
                        onChange={handelInputChange}
                    />                    
                </div>

                <div className="form-group">
                    <label>Dirección</label>
                    <input 
                        type="text" 
                        className={`form-control ${ !direccionValid && 'is-invalid' }`}
                        placeholder="Direacción"
                        name="direccion"
                        autoComplete="off"
                        value={direccion}
                        onChange={handelInputChange}
                    />                    
                </div>

                <div className="form-group">
                    <label>Teléfono</label>
                    <input 
                        type="text" 
                        className={`form-control ${ !telefonoValid && 'is-invalid' }`}
                        placeholder="Teléfono"
                        name="telefono"
                        autoComplete="off"
                        value={telefono}
                        onChange={handelInputChange}
                    />                    
                </div>     

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}

