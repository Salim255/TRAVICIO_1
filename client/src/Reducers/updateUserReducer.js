import {UPDATE_SETTING , SETTING_ERROR, IMAGE_ERROR, GET_IMAGE } from "../Actions/actionTypes";

const initialState = {
    user: null,
    loading: true,
    error: {},
    photo: null
}
export default  function(state = initialState , action){
    
     switch (action.type) {
         case UPDATE_SETTING :
             return {
                 ...state,
                 user: action.payload,
                 loading: false
             }
            
         case SETTING_ERROR:
         case IMAGE_ERROR:
             return {
                 ...state,
                 error: action.payload,
                 loading: false
             }
         case GET_IMAGE :
                return {
                    ...state,
                    photo: action.payload,
                    loading: false
                }

         default:
           return state;
     }
}
