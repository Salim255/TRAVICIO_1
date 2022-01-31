import axios from "axios";
import { setAlert } from "./alertAction";
import { ADD_REVIEW, REMOVE_REVIEW, REVIEW_ERROR,GET_REVIEW , GET_REVIEWS} from "./actionTypes";


//Get current users profiles
export const getAllReviews = () => async dispatch  => {
    try {
        const res = await axios.get('/api/v1/reviews/');
       
        dispatch({
            type: GET_REVIEWS,
            payload: res.data.data.reviews
        })
    } catch (error) {
       
        dispatch({
            type: REVIEW_ERROR,
            payload: { message: error.response.statusText, status: error.response.status}
        })
    }
};

//Get user Review in a profile by proile id 
 export const getProileReviews = profileId => async dispatch  => {
    try {
        const res = await axios.get(`/api/v1/profiles/${profileId}/reviews`);
       console.log(res);
        dispatch({
            type: GET_REVIEWS,
            payload: res.data.data.reviews
        })
    } catch (error) {
       
        dispatch({
            type: REVIEW_ERROR,
            payload: { message: error.response.statusText, status: error.response.status}
        })
    }
}; 


export const leaveFeedBack = (profileId,FormData) => async dispatch  => {
    console.log("Hello from leave", FormData);
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post(`/api/v1/profiles/${profileId}/reviews`, FormData, config);
       console.log(res);
        dispatch({
            type: ADD_REVIEW,
            payload: res.data.data.reviews
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: REVIEW_ERROR,
            payload: { message: error.response.statusText, status: error.response.status}
        })
    }
}; 

