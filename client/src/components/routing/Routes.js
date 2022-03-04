import React, { Fragment, useEffect } from 'react';
import {BrowserRouter as Router , Route, Switch} from 'react-router-dom';
import Login from '../auth/Login';
import ForgotPassword  from '../auth/ForgotPassword';
import ResetPassword from '../auth/ResetPassword';
import Register from '../auth/Register';
import Alert from '../layout/Alert';
import Search from '../layout/Search';
import Dashboard from '../dashboard/Dashboard'

import CreateProfile from '../profile-form/CreateProfile';
import EditProfile from '../profile-form/EditProfile';
import AddExperience from '../profile-form/AddExperience';
import AddEducation from '../profile-form/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../Profile/Profile';

import Posts from '../posts/Posts';
import Post from '../post/Post';
import UserSetting from '../auth/UserSetting';
import PrivateRoute from '../routing/PrivateRoute';
import Rating from '../layout/Rating';
import NotFound from '../layout/NotFound';




export const Routes = () => {
  return (
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
          {/* <Route component={NotFound}/> */}
            </Switch>
          
          </section>
  )
}
