import axios from 'axios';
import {REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR } from './actionTypes';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alertAction';
//Load User
export const loadUser = () => async dispatch =>{
    if(localStorage.token){
            setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/v1/users/login');

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
        console.log(res);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

    } catch (error) {
        const errors = error.response.data.errors;
        
        if(errors){
            errors.forEatch(error => dispatch(
                setAlert(error.messag, 'danger')
            ))
        }

        dispatch({
            type: REGISTER_FAIL
        })
    }
}