import {UPDATE_SETTING , SETTING_ERROR} from "../Actions/actionTypes";

const initialState = {
    user: null,
    loading: true,
    error: {}
}
export default  function(state = initialState , action){
    console.log(action);
     switch (action.type) {
         case UPDATE_SETTING :
             return {
                 ...state,
                 user: action.payload,
                 loading: false
             }
            
         case SETTING_ERROR:
             return {
                 ...state,
                 error: action.payload,
                 loading: false
             }
         default:
           return state;
     }
}
