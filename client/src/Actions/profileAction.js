import axios from "axios";
import { setAlert } from "./alertAction";

import { GET_PROFILE, PROFILE_ERROR } from  "./actionTypes";



//Get current users profiles
export const getCurrentProfile = () => async dispatch  => {
    try {
        const res = await axios.get('/api/v1/profile/me');
         console.log(res.data);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { masg: error.response.statusText, status: error.response.status}
        })
    }
}