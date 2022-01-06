import React, { Fragment } from 'react';
import {BrowserRouter as Router , Route, Switch, Routes} from 'react-router-dom';

import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar' ;
import Header from './components/layout/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import './App.scss';

const App = () =>{
  return (
    <Router>
      < Fragment>
          <Navbar/>
          <Route exact  path='/' component={ Landing} />
          <section>
            <Switch>
              <Route exact path='/register' component={ Register }/>
              <Route exact path='/login' component={ Login }/>
            </Switch>
          </section>
        </Fragment>
    </Router>
  );
}

export default App;
