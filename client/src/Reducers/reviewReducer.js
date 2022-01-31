import { ADD_REVIEW, REMOVE_REVIEW, REVIEW_ERROR, GET_REVIEWS, GET_REVIEW } from "../Actions/actionTypes";

const initialState = {
    review: null,
    reviews: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action){
    const {type, payload} = action;
  
    switch (type) {
        case GET_REVIEW:
            return {
                ...state, review: payload,
                loading: false
            };
         
        case GET_REVIEWS:
          
                return {
                    ...state, reviews: payload,
                    loading: false
                };

        case REVIEW_ERROR:
            return {
                ...state, error: payload,
                loading: false
            };

        default:
            return state;
    }
}