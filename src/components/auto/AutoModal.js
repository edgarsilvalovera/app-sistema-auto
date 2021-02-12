import React , {useState , useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Importaciones de Librerias
import Modal from 'react-modal';

import { uiCloseModal } from '../../actions/ui';
import { autoStartAddNew, autoClearActive, autoStartUpdate } from '../../actions/autos';
import { propietarioStartLoading } from '../../actions/propietarios';

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
      maxHeight                : '650px'
    }
};

const initAuto = {
    marca: '',
    modelo: '',
    anio: '',
    patente: '',
    //propietarioId: '',
    propietario: {id:''},
    color: '#000000'
};

export const AutoModal = () => {
    
    const dispatch = useDispatch();

    //Variables del State
    const { activeAuto } = useSelector(state => state.auto );
    const { propietarios } = useSelector(state => state.propietario );
    const { modalOpen } = useSelector(state => state.ui );

    //Variables del Formulario
    const [formValues, setFormValues]= useState(initAuto);
    const { id, marca, modelo, anio, patente, color, propietario }= formValues;        

    //Variables de Validación de Formulario
    const [marcaValid, setMarcaValid] = useState(true);
    const [modeloValid, setModeloValid] = useState(true);
    const [anioValid, setAnioValid] = useState(true);
    const [patenteValid, setPatenteValid] = useState(true);
    const [colorValid, setColorValid] = useState(true);
    const [defaultValuePropietarioId, setDefaultValuePropietarioId]= useState(propietario.id);

    //Effect
    useEffect(() => {        
        dispatch( propietarioStartLoading() );                
    }, [ dispatch ]);
        
    useEffect(() => {
        if( activeAuto ){
            setFormValues( activeAuto );                        
            setDefaultValuePropietarioId( activeAuto.propietario.id );
        }else{
            setFormValues( initAuto );
        }   
    }, [activeAuto, setFormValues, setDefaultValuePropietarioId]);
        
    //Acciones
    const closeModal = () => {                
        dispatch( uiCloseModal() );
        dispatch( autoClearActive () );//para limpiar la modal        
    };   

    const handelChange = ({ target }) => {               
        setFormValues({
            ...formValues,
            [target.name]: target.value.toUpperCase()
        });        
    };

    const handelChangeSelect = ({ target }) => {               
        setFormValues({
            ...formValues,
            [target.name]: {'id':target.value}
        });   
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();                
        //Validaciones del Formulario
        if(marca.trim().length == 0){
            setMarcaValid(false);
            return true;
        }      
        setMarcaValid(true);  

        if(modelo.trim().length == 0){
            setModeloValid(false);
            return true;
        }        
        setModeloValid(true);
        
        if(anio < 0){
            setAnioValid(false);
            return true;
        } 
        setAnioValid(true);       

        if(patente.trim().length == 0){
            setPatenteValid(false);
            return true;
        }        
        setPatenteValid(true);

        if(color.trim().length == 0){
            setColorValid(false);
            return true;
        }        
        setColorValid(true);
        
        if( activeAuto ){            
            setFormValues({
                ...formValues,
                'id': activeAuto.id
            });
            dispatch( autoStartUpdate( formValues ) );            
        }else{                                    
            dispatch( autoStartAddNew( formValues ) );            
        }

        setFormValues( initAuto );
        setDefaultValuePropietarioId( '' );            
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
            <h4>                
                { (activeAuto)? 'Editar Auto': 'Nuevo Auto' } 
            </h4>
            <hr />
            <form 
                className="container"
                onSubmit={handleSubmitForm}
            >
                <div className="form-group">
                    <label>Marca</label>
                    <input 
                        type="text" 
                        className={`form-control ${ (!marcaValid) && 'is-invalid'  }`}
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
                        className={`form-control ${ !modeloValid && 'is-invalid' }`}
                        placeholder="Modelo del Auto"
                        name="modelo"
                        autoComplete="off"
                        value={modelo}
                        onChange={handelChange}
                    />                    
                </div>

                <div className="form-group">
                    <label>Año</label>
                    <input 
                        type="number" 
                        className={`form-control ${ !anioValid && 'is-invalid' }`}
                        placeholder="Año del Auto"
                        name="anio"
                        autoComplete="off"
                        value={anio}
                        onChange={handelChange}
                    />                    
                </div>

                <div className="form-group">
                    <label>Patente</label>
                    <input 
                        type="text" 
                        className={`form-control ${ !patenteValid && 'is-invalid' }`}
                        placeholder="Patente del Auto"
                        name="patente"
                        autoComplete="off"
                        value={patente}
                        onChange={handelChange}
                        
                    />                    
                </div>

                <div className="form-group">
                    <label>Color</label>
                    <input 
                        type="color" 
                        className={`form-control ${ !colorValid && 'is-invalid' }`}
                        placeholder="Color del Auto"
                        name="color"
                        autoComplete="off"
                        value={color}
                        onChange={handelChange}
                    />                    
                </div>

                <div className="form-group">
                    <label>Propietario</label>
                    <select 
                        className="form-control"
                        name="propietario"
                        onChange={ handelChangeSelect }
                        defaultValue={defaultValuePropietarioId}
                    >
                        <option value=''>Seleccione...</option>
                        {
                            propietarios.map((propietario) => (
                                <option key={propietario.id} value={propietario.id}  >
                                    {propietario.documento + ' - ' + propietario.apellido + ' ' + propietario.nombre}
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
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}

