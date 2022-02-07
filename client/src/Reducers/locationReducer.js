import { GET_LOCATION} from "../Actions/actionTypes";

const initialState = {
    location: ''
  
}

export default function(state = initialState, action
){
    //console.log(action.payload);
    switch (action.type) {
        case GET_LOCATION:
            return {
                ...state,
                location: action.payload
            };
    
        default:
            return state;
    }
}