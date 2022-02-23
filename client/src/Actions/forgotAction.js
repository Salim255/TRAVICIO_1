import axios from "axios";
import { setAlert } from "./alertAction";
import { FORGOT_PASSWORD, FORGOT_ERROR} from "./actionTypes";


export const forgotPassword = (formData) => async dispatch => {
      try {
        const config = {
            headers: {
               'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/v1/users/forgotPassword', formData,config);
        dispatch({
              type:FORGOT_PASSWORD,
              payload:res.data.message
          });
        dispatch(setAlert(res.data.message, "success"));
      } catch (error) {
          dispatch(setAlert(error.response.data.message, 'danger'));
          dispatch({
              type: FORGOT_ERROR,
              payload: error.response.data.message
          })
      }
}