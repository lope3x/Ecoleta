import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/pages/Home'
import CreatePoint from './components/pages/CreatePoint'

const Routes = () =>{
    return(
        <Router>
            <Route component ={Home} exact path ='/'/>
            <Route component ={CreatePoint} exact path ='/create-point'/>
        </Router>
    )
};

export default Routes;