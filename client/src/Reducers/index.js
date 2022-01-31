import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import reviewReducer from './reviewReducer';

import postReducer from './postReducer';


export default combineReducers({
    alertReducer, authReducer, profileReducer, postReducer, reviewReducer
});