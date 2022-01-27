import axios from 'axios';
import { setAlert} from './alertAction';
import { DELETE_POST, GET_POSTS, POST_ERROR, UPDATE_LIKES,  ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT} from './actionTypes';


//Get posts
export const getPosts = () => async dispatch =>{
    try {
        
        const res = await axios.get('/api/v1/posts');
      
        dispatch({
            type: GET_POSTS,
            payload: res.data.data.posts
        })
    } catch (error) {
       
        dispatch({
            type: POST_ERROR,
            payload: { message: error.response.statusText, status: error.response.status}
        })
    }
};
//ADD like to posts
export const addLike = (id) => async dispatch =>{
    try {
        
        const res = await axios.put(`/api/v1/posts/like/${id}`);
       
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data.data.data}
        })
        
    } catch (error) {
      
        dispatch({
            type: POST_ERROR,
            payload: { message: error.response.statusText, status: error.response.status}
        })
    }
};

//Remove like to posts
export const removeLike = (id) => async dispatch =>{
    try {
        
        const res = await axios.put(`/api/v1/posts/unlike/${id}`);
  
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes:res.data}
        })

       
    } catch (error) {
       
        dispatch({
            type: POST_ERROR,
            payload: { message: error.response.statusText, status: error.response.status}
        })
    }
};

//Delete post 
export const deletePost = (id) => async dispatch =>{
    try {
        
        await axios.delete(`/api/v1/posts/${id}`);
       
        dispatch({
            type: DELETE_POST,
            payload: id
        })

       dispatch(setAlert('Post Removed', 'success'));
    } catch (error) {
       
        dispatch({
            type: POST_ERROR,
            payload: { message: error.response.statusText, status: error.response.status}
        })
    }
};

//Add post 
export const addPost = FormData => async dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        
        const res = await axios.post(`/api/v1/posts`, FormData, config);
     
        dispatch({
            type: ADD_POST,
            payload: res.data.data.post
        })

       dispatch(setAlert('Post Created', 'success'));
    } catch (error) {
       
        dispatch({
            type: POST_ERROR,
            payload: { message: error.response.statusText, status: error.response.status}
        })
    }
};

//Get post
export const getPost = (id) => async dispatch =>{
    try {
        
        const res = await axios.get(`/api/v1/posts/${id}`);
      
        dispatch({
            type: GET_POST,
            payload: res.data.data.post
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { message: error.response.statusText, status: error.response.status}
        })
    }
};

//Add Comment
export const addComment =(postId, FormData) => async dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
     
        const res = await axios.put(`/api/v1/posts/comment/${postId}`, FormData, config);
      
        dispatch({
            type: ADD_COMMENT,
            payload: res.data.data.data
        })

       dispatch(setAlert('Comment Added', 'success'));
    } catch (error) {
       
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
};

//Delete Comment
export const deleteComment =(postId,commentId) => async dispatch =>{
 

    try {
        
        await axios.delete(`/api/v1/posts/comment/${postId}/${commentId}`);
       
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        })

       dispatch(setAlert('Comment Removed', 'success'));
    } catch (error) {
       
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
};