import { RESET_PASSWORD, RESET_ERROR} from "../Actions/actionTypes";

const initialState = {
    success:"",
    error: ""
}

export default function(state= initialState, action){
    const {type, payload} = action;
    switch (type) {
        case RESET_PASSWORD:
            return {...state,
            success: payload,
            error: ""};
        case RESET_ERROR:
            return  {...state,
                error: payload,
                success: ""};
        default:
            return state;
    }
}