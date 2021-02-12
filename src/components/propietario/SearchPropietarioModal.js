import React , {useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Importaciones de Librerias
import Modal from 'react-modal';

//Importaciones de lso Eventos
import { uiCloseModalSearch } from '../../actions/ui';
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

const initPropietario = {
    apellido: '',
    nombre: '',
    documento: ''
    //direccion: '',
    //telefono: ''
};

export const SearchPropietarioModal = () => {
    
    const dispatch = useDispatch();    

    //Variables de la Modal
    const { modalOpenSearch } = useSelector(state => state.ui );    

    //Acciones de la Modal
    const closeModal = () => {                
        dispatch( uiCloseModalSearch() );        
        dispatch( propietarioClearActive () );//para limpiar la modal        
    }

    //Variables del Formulario
    const [formValues, setFormValues]= useState(initPropietario);
    const { apellido, nombre, documento }= formValues;

    //Acciones del Formulario
    const handelInputChange = ({ target }) => {        
        setFormValues({
            ...formValues,
            [target.name]: target.value.toUpperCase()
        });
    };    
    
    const handleSubmitForm = (e) => {
        e.preventDefault();              
        
        dispatch( propietarioSetActive( formValues ) );                
        dispatch( propietarioStartSearch( formValues ) );

        setFormValues( initPropietario );
        closeModal();
    };

    return(
        <Modal
          isOpen={modalOpenSearch}
          //onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}          
          className="modal"
          overlayClassName="modal-fondo"
          closeTimeoutMS={500}
        >
            <h1>                
                Buscar Propietario
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
                        className='form-control'
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
                        className='form-control'
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
                        className='form-control'
                        placeholder="Documento"
                        name="documento"
                        autoComplete="off"
                        value={documento}
                        onChange={handelInputChange}
                    />                    
                </div>
                
                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Buscar</span>
                </button>

            </form>
        </Modal>
    )
}

