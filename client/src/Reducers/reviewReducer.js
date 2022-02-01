import { ADD_REVIEW, REMOVE_REVIEW, REVIEW_ERROR, GET_REVIEWS, GET_REVIEW } from "../Actions/actionTypes";

const initialState = {
    review: null,
    reviews: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action){
    const {type, payload} = action;
    console.log("payload",payload);
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
        case ADD_REVIEW:
            return {
                ...state, 
                reviews: [payload, ...state.reviews],
                review: payload,
                loading: false
            };
        case REVIEW_ERROR:
            return {
                ...state, error: payload,
                loading: false
            };
        case REMOVE_REVIEW:
            return {
                ...state,
                reviews: state.reviews.filter(review => review._id !== payload),
                loading: false
            };
        default:
          
            return state;
    }
}