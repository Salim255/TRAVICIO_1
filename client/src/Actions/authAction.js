import axios from 'axios';
import {REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE } from './actionTypes';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alertAction';

//Load User
export const loadUser = () => async dispatch =>{
    if(localStorage.token){
            setAuthToken(localStorage.token);
            
    }

    try {
       
        const res = await axios.get('/api/v1/users');
     
        
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

//Register user
export const register = ({ firstName,lastName, email, password, passwordConfirm}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
    }
    }

    const body = JSON.stringify({
        firstName,lastName, email, password, passwordConfirm
    });

    try {
        const res = await axios({
            method:'POST',
            url:'api/v1/users/signup',
            data:{
                firstName,lastName, email, password, passwordConfirm
            },
            config,
            //credentials:'include'
             withCredentials: true 
        });
        //const res = await axios.post('api/v1/users/signup', body, config, credentials: 'include');
        
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
       
        dispatch(loadUser());
    } catch (error) {
        const errors = error.response.data;
        let list = [];
        
        Object.keys(errors).forEach(key => {
            if(key==='message'){
                list.push({'message': errors[key]})
            }
         } );

        if(list){
            
            list.forEach(error => dispatch(
                setAlert(error.message, 'danger')
            ))
        }

        dispatch({
            type: REGISTER_FAIL
        })
    }
};

//Login user
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            
    }
    }

   

    try {
        const res = await axios({
            method:'POST',
            url:'api/v1/users/login',
            data:{
                email, password 
            },
            config,
            //credentials:'include'
             //withCredentials: true 
        });
       
        
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
       
        dispatch(loadUser());
    } catch (error) {
       
        const errors = error.response.data;
        let list = [];
        
        Object.keys(errors).forEach(key => {
            if(key==='message'){
                list.push({'message': errors[key]})
            }
         } );

        if(list){
            
            list.forEach(error => dispatch(
                setAlert(error.message, 'danger')
            ))
        }
        dispatch({
            type: LOGIN_FAIL
        });
    }
};

//LOGOUT /CLEAR Profile
export const logout = () => dispatch =>{
    dispatch({type: CLEAR_PROFILE});    
    dispatch({type: LOGOUT});
        
    };


