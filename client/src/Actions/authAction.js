import axios from 'axios';
import {REGISTER_SUCCESS, REGISTER_FAIL } from './actionTypes';

import { setAlert } from './alertAction';

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