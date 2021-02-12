import transitions from '@material-ui/core/styles/transitions';
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";


import { Auto } from '../components/auto/Auto';
import { Propietario } from '../components/propietario/Propietario';
import { Inicio } from '../Inicio';
import { Transaccion } from '../components/transaccion/Transaccion'
import { TransaccionSearch } from '../components/transaccion/TransaccionSearch';




export const AppRouter = () => {
    return(
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={Inicio} />
                    <Route exact path="/autos" component={Auto} />
                    <Route exact path="/propietarios" component={Propietario} />
                    <Route exact path="/transaccion" component={Transaccion} />
                    <Route exact path="/transaccion/search" component={TransaccionSearch} />
                    
                    <Redirect to='/'></Redirect>
                </Switch>
            </div>
        </Router>
    )
}