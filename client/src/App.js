import React, { Fragment, useEffect } from 'react';
import {BrowserRouter as Router , Route, Switch, Routes} from 'react-router-dom';

import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar' ;
//import Header from './components/layout/Header';
import Login from './components/auth/Login';
import ForgotPassword  from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Search from './components/layout/Search';
import Dashboard from './components/dashboard/Dashboard'

import CreateProfile from './components/profile-form/CreateProfile';
import EditProfile from './components/profile-form/EditProfile';
import AddExperience from './components/profile-form/AddExperience';
import AddEducation from './components/profile-form/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/Profile/Profile';
import Shape from './components/layout/Shape';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import UserSetting from './components/auth/UserSetting';
import PrivateRoute from './components/routing/PrivateRoute';
import Rating from './components/layout/Rating';
import NotFound from './components/layout/NotFound';

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
              <Route exact path='/forgotPassword' component={ ForgotPassword }/>
              <Route exact path='/resetPassword/:token' component={ ResetPassword }/>
              <Route exact path='/login' component={ Login }/>
              <Route exact path='/profiles' component={ Profiles }/>
      
              <Route exact path='/profiles/:id' component={ Profile }/>
              <Route exact path='/search' component={ Search }/>
              <PrivateRoute exact path='/dashboard' component={ Dashboard }/>
              <PrivateRoute exact path='/edit-profile' component={ EditProfile }/>
              <PrivateRoute exact path='/add-experience' component={ AddExperience }/>
              <PrivateRoute exact path='/add-education' component={ AddEducation }/>
              <PrivateRoute exact path='/create-profile' component={ CreateProfile }/>
              <PrivateRoute exact path='/posts' component={ Posts }/>
              <PrivateRoute exact path='/settings' component={ UserSetting }/>
              <PrivateRoute exact path='/posts/:id' component={ Post }/>
              <PrivateRoute exact path='/add-feedback/:id/reviews' component={ Rating }/>
              <Route component={NotFound}/>
            </Switch>
          </section>
        </Fragment>
     </Router>
    </Provider>
  );
}

export default App;
