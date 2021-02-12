import React , {useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Importaciones de Librerias
import Modal from 'react-modal';

import { uiCloseModalSearch } from '../../actions/ui';
import { autoClearActive, autoSetActive, autoSearch, autoStartSearch } from '../../actions/autos';

//Instancia de la Modal
Modal.setAppElement('#root');

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      height                : 'auto'
    }
};

const initAuto = {    
    marca: '',
    modelo: '',    
    patente: '',    
};

export const SearchAutoModal = () => {
    
    const dispatch = useDispatch();    

    //Variables
    const { modalOpenSearch } = useSelector(state => state.ui );    

    const [formValues, setFormValues]= useState(initAuto);
    const { marca, modelo, patente }= formValues;

    //Effects

    //Acciones
    const closeModal = () => {          
        dispatch( uiCloseModalSearch() );
        dispatch( autoClearActive () );//para limpiar la modal        
    }

    const handelChange = ({ target }) => {        
        setFormValues({
            ...formValues,
            [target.name]: target.value.toUpperCase()
        });
    };    
    
    const handleSubmitForm = (e) => {
        e.preventDefault();

        dispatch( autoSetActive( formValues ) );        
        dispatch( autoStartSearch(formValues) );
        
        setFormValues( initAuto );
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
                Buscar Auto
            </h1>
            <hr />
            <form 
                className="container"
                onSubmit={handleSubmitForm}
            >
                <div className="form-group">
                    <label>Marca</label>
                    <input 
                        type="text" 
                        className='form-control'
                        placeholder="Marca del Auto"
                        name="marca"
                        autoComplete="off"
                        value={marca}
                        onChange={handelChange}
                    />                    
                </div>

                <div className="form-group">
                    <label>Modelo</label>
                    <input 
                        type="text" 
                        className='form-control'
                        placeholder="Modelo del Auto"
                        name="modelo"
                        autoComplete="off"
                        value={modelo}
                        onChange={handelChange}
                    />                    
                </div>

                <div className="form-group">
                    <label>Patente</label>
                    <input 
                        type="text" 
                        className='form-control'
                        placeholder="Patente del Auto"
                        name="patente"
                        autoComplete="off"
                        value={patente}
                        onChange={handelChange}
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

