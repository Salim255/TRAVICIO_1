import {UPDATE_SETTING , SETTING_ERROR, GET_IMAGE, IMAGE_ERROR} from './actionTypes';
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
    //history.push('/settings');
    } catch (error) {
        console.log(error);
         dispatch({
             type: SETTING_ERROR,
             payload: error.response.data.error.message
         })
    }
}

export const gettingSingleImage = (photo) => async dispatch=>{
    try {
      
        
        const res = await axios({
            method: 'GET',
            url:`/api/v1/image/${photo}`,
            withCredentials: true 
        });
        console.log("👄👄",res.data);
        dispatch({
            type: GET_IMAGE ,
            payload: res.data
        });
    //history.push('/settings');
    } catch (error) {
        console.log(error);
         dispatch({
             type: IMAGE_ERROR,
             payload: error.response.data.error.message
         })
    }
}