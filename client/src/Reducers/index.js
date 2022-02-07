import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import reviewReducer from './reviewReducer';
import locationReducer from './locationReducer';

import postReducer from './postReducer';

import updateUserReducer from './updateUserReducer';


export default combineReducers({
    alertReducer, authReducer, profileReducer, postReducer, reviewReducer, updateUserReducer, locationReducer
});