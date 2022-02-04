import {UPDATE_SETTING , SETTING_ERROR} from './actionTypes';
import axios from 'axios';

export const updateUserSetting = (formData) => async dispatch =>
{   

    try {
        const config = {
            headers: {
               'Content-Type': 'application/json'
            }
        }
       
        const res = await axios({
            method: 'PATCH',
            url: '/api/v1/users/updateMe',
            data: formData,
            config,
            withCredentials: true 
        });
         console.log(res.data);
        dispatch({
            type: UPDATE_SETTING ,
            payload: res.data
        });
    
    } catch (error) {
        console.log(error);
         dispatch({
             type: SETTING_ERROR,
             payload: error.response.data.error.message
         })
    }
}