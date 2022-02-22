import { FORGOT_PASSWORD, FORGOT_ERROR} from "../Actions/actionTypes";

const initialState = {
    success:"",
    error: ""
}

export default function(state= initialState, action){
    const {type, payload} = action;
    switch (type) {
        case FORGOT_PASSWORD:
            return {...state,
            success: payload,
            error: ""};
        case FORGOT_ERROR:
            return  {...state,
                error: payload,
                success: ""};
        default:
            return state;
    }
}