import React, { Fragment, useEffect } from 'react';
import {BrowserRouter as Router , Route, Switch, Routes} from 'react-router-dom';

import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar' ;
//import Header from './components/layout/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard'

import CreateProfile from './components/profile-form/CreateProfile';
import EditProfile from './components/profile-form/EditProfile';
import AddExperience from './components/profile-form/AddExperience';
import AddEducation from './components/profile-form/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/Profile/Profile';
import Shape from './components/layout/Shape';
import Posts from './components/posts/Posts';
import PrivateRoute from './components/routing/PrivateRoute';

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
          
          <section className='container'>
          <Alert/>
            <Switch>
              <Route exact path='/register' component={ Register }/>
              
              <Route exact path='/login' component={ Login }/>
              <Route exact path='/profiles' component={ Profiles }/>
              <Route exact path='/profiles/:id' component={ Profile }/>
              <PrivateRoute exact path='/dashboard' component={ Dashboard }/>
              <PrivateRoute exact path='/edit-profile' component={ EditProfile }/>
              <PrivateRoute exact path='/add-experience' component={ AddExperience }/>
              <PrivateRoute exact path='/add-education' component={ AddEducation }/>
              <PrivateRoute exact path='/create-profile' component={ CreateProfile }/>
              <PrivateRoute exact path='/posts' component={ Posts }/>
            </Switch>
          </section>
        </Fragment>
     </Router>
    </Provider>
  );
}

export default App;
