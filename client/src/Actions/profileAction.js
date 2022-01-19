import axios from "axios";
import { setAlert } from "./alertAction";

import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from  "./actionTypes";



//Get current users profiles
export const getCurrentProfile = () => async dispatch  => {
    try {
        const res = await axios.get('/api/v1/profiles/me');
       
        dispatch({
            type: GET_PROFILE,
            payload: res.data.data.profile
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { message: error.response.statusText, status: error.response.status}
        })
    }
};

//Creat or Update a profile 
export const createProfile = (formData, history, edit = false) => async dispatch =>{
    try {
        const config = {
            headers: {
               'Content-Type': 'application/json'
            }
        }
       /*  console.log(formData);
        const res = await axios.post('/api/v1/profiles', formData, config); */

        const res = await axios({
            method:'POST',
            url:'api/v1/profiles',
            data:formData,
            config,
            //credentials:'include'
             withCredentials: true 
        });
        
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success' ));

        if(! edit) {
            history.push('/dashboard');
        }
    } catch (error) {
       //const errors = error.response.data.errors;
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
           type: PROFILE_ERROR,
           payload: { message: error.response.statusText, status: error.response.status}
       })
    }
};

//Add Experience
export const addExperience = (formData, history) => async dispatch =>{
    try {
        const config = {
            headers: {
               'Content-Type': 'application/json'
            }
        }
       
        console.log('🌓🌓formData', formData);
        const res = await axios.put('/api/v1/profiles/experience', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Added', 'success'));

        
        history.push('/dashboard');
        
    } catch (error) {
       //const errors = error.response.data.errors;
          //const errors = error.response.data.errors;
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
           type: PROFILE_ERROR,
           payload: { message: error.response.statusText, status: error.response.status}
       })
    }
 };
