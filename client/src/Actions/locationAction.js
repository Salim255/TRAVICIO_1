import { GET_LOCATION} from  "./actionTypes";

export const  saveLocation = (location) => async dispatch =>{
    console.log(location);
        dispatch({
            type: GET_LOCATION,
            payload: location
        })
}