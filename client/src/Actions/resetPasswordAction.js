import axios from "axios";
import { setAlert } from "./alertAction";
import { LOGIN_SUCCESS} from "./actionTypes";
import { loadUser } from "./authAction";

export const resetPassword = (FormData, token) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.patch(`/api/v1/users/resetPassword/${token}`, FormData, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        
        dispatch(loadUser());
        dispatch(setAlert("Your password has been updated", "success"));
     
    } catch (error) {
        dispatch(setAlert(error.response.data.message, "danger"));
    }
}