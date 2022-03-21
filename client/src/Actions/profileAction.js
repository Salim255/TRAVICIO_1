import axios from "axios";
import { setAlert } from "./alertAction";

import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, CLEAR_PROFILE, ACCOUNT_DELETED, GET_PROFILES } from  "./actionTypes";



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

//Get all profiles
export const getProfiles = () => async dispatch  => {
   
    dispatch({ type: CLEAR_PROFILE});
    
 
    try {
      
        const res = await axios.get(`/api/v1/profiles/`);
        dispatch({
            type: GET_PROFILES,
            payload: res.data.data.profiles
        })
    } catch (error) {
        
        dispatch({
            type: PROFILE_ERROR,
            payload: { message: error.response, status: error.response}
        })
    }
}; 

//Filter profiles by location and jobStatus
export const getFilteredProfiles = option => async dispatch  => {
   
    dispatch({ type: CLEAR_PROFILE});
   
    try {
        
        let res
        if(option){
            if(option.location && option.jobStatus){
               res = await axios.get(`/api/v1/profiles/?location=${option.location}&&jobStatus=${option.jobStatus}`);
            }
            else if(option.location && option.jobCategory){
                res = await axios.get(`/api/v1/profiles/?location=${option.location}&&jobStatus=${option.jobStatus}&&jobCategory=${option.jobCategory}`);
             }
            else if(option.location){
                res = await axios.get(`/api/v1/profiles/?location=${option.location}`);
            }
            else if(option.jobStatus){
               res = await axios.get(`/api/v1/profiles/?jobStatus=${option.jobStatus}`);
            }
        }else{
           res = await axios.get(`/api/v1/profiles/`);
        };
        //const {location, jobStatus} = option;
   
        dispatch({
            type: GET_PROFILES,
            payload: res.data.data.profiles
        })
    } catch (error) {
      
        dispatch({
            type: PROFILE_ERROR,
            payload: { message: error.response, status: error.response}
        })
    }
};


//Get profile by Id
export const getProfileById = userId => async dispatch  => {
    try {
        const res = await axios.get(`/api/v1/profiles/user/${userId}`);
       
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
       
      
        const res = await axios.put('/api/v1/profiles/experience', formData, config);
      
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data.data.profile
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

 //Delete experience
 export const deleteExperience = id => async dispatch =>{
    try {
        const res = await axios.delete(`/api/v1/profiles/experience/${id}`);
        
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data.data.profile
        });
        dispatch(setAlert('Experience Removed', 'success'));
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
           type: PROFILE_ERROR,
           payload: { message: error.response.statusText, status: error.response.status}
       })
    }
};

//Add Education
export const addEducation = (formData, history) => async dispatch =>{
    try {
        const config = {
            headers: {
               'Content-Type': 'application/json'
            }
        }
       
      
        const res = await axios.put('/api/v1/profiles/education', formData, config);
       
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data.data.profile
        });

        dispatch(setAlert('Education Added', 'success'));

        
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

//Delete Education
export const deleteEducation = id => async dispatch =>{
   try {
    
       const res = await axios.delete(`/api/v1/profiles/education/${id}`);
     
       dispatch({
           type: UPDATE_PROFILE,
           payload: res.data.data.profile
       });
       dispatch(setAlert('Education Removed', 'success'));
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
       type: PROFILE_ERROR,
       payload: { message: error.response.statusText, status: error.response.status}
   })
   }
}; 


//Delete Account and Profile 
export const deleteAccount = () => async dispatch =>{
   if(window.confirm('Are you sure ? This can NOT be undone!')){
       try {
           const res = await axios.delete(`/api/v1/profiles`);
   
           dispatch({
               type: CLEAR_PROFILE,
               
           });
           dispatch({
               type: ACCOUNT_DELETED,
               
           });
           
           dispatch(setAlert('Your account has been permanantly deleted'));
       } catch (error) {
          dispatch({
              type: PROFILE_ERROR,
              payload: { msg: error.response.statusText, status: error.response.status}
          })
       }
   }
   
};
