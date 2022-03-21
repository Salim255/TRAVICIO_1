import React, { Fragment, useEffect } from 'react';
import {BrowserRouter as Router , Route, Switch} from 'react-router-dom';

import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar' ;
//import Header from './components/layout/Header';
import Shape from './components/layout/Shape';
import Footer from './components/layout/Footer';
import { Routes } from './components/routing/Routes';


//Redux
import { Provider } from 'react-redux';//To connect react and redux
import store from './store';
import { loadUser } from './Actions/authAction';
import setAuthToken from './utils/setAuthToken';


import './App.scss';


if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = () => {

  useEffect(() => {
     store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        < Fragment>
        
          <Navbar/>
          <Shape/>
          <Route exact  path='/' component={ Landing} />
          <Route component={Routes}/>
          <Footer/>
        </Fragment>
     </Router>
    </Provider>
  );
}

export default App;
