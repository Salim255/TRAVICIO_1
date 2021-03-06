import React, { useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../Actions/postAction';


const PostForm = ({addPost}) => {
    const [text, setText] = useState('');
  return (
  <div className="post-form">
        <div className="bgprimary p-1 borderRad">
            <h2>Say Something...</h2>
        </div>
        <form className="form  my-1" onSubmit={e => {e.preventDefault() ;
        addPost({ text });
        setText('');
        window.location.reload();
    }}>
            <textarea
            name="text"
            cols="30"
            rows="5"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Create a post "
            required 
            ></textarea>
            <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
    </div>);
};

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
};

export default connect(null, {addPost})(PostForm);
