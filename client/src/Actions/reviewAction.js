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
        });
       
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
   
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post(`/api/v1/profiles/${profileId}/reviews`, FormData, config);
      
        dispatch({
            type: ADD_REVIEW,
            payload: res.data.data.review
        });
        dispatch(setAlert('Review Created', 'success'));
    } catch (error) {
        dispatch(setAlert(error.response.data.message, 'danger'));
        console.log(error.response.data.message);
        dispatch({
            type: REVIEW_ERROR,
            payload: { message: error.response.message, status: error.response}
        })
    }
}; 

export const deleteFeedBack = (reviewId) => async dispatch  => {
    try {
        await axios.delete(`/api/v1/reviews/${reviewId}`);
      
        dispatch({
            type: REMOVE_REVIEW,
            payload: reviewId
        });
    
    } catch (error) {
        
        dispatch({
            type: REVIEW_ERROR,
            payload: { message: error.response.statusText, status: error.response.status}
        })
    }
}; 



