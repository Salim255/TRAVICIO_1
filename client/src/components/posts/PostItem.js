import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect} from 'react-redux';
import { addLike, removeLike, deletePost } from '../../Actions/postAction';

const PostItem = ({addLike, removeLike,deletePost, auth, post: {_id, text,  user, likes, comments, date},showActions }) =>  {

  return <div className="postStyle p-1 my-1">
  <div>
    <Link to={`/profiles/${user._id}`}>
    <img src={`/api/v1/image/${user.photo}`} alt="user-img" className="round-img" />
      
    </Link>
  </div>
  <div className=' '>
   <div className='bgWhite'>
      <h4>{user.firstName}&nbsp; {user.lastName}</h4>
        <p className="my-1 ">
        {text}<br/>
        <span className="post-date">
            Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </span>
        </p>
        
   </div>
    

    {showActions && <Fragment>
      <button  onClick={e => addLike(_id)} type="button" className="btn btn-light">
      <i className="fas fa-thumbs-up"></i>{' '}
      { likes && (<span>{likes.length > 0 && (<span >{likes.length}</span>)}</span>)}
    </button>
    <button onClick={e => removeLike(_id)} type="button" className="btn btn-light">
      <i className="fas fa-thumbs-down"></i>
    </button>
    <Link to={`/posts/${_id}`} className="btn btn-primary">
      Comment {comments.length > 0 && (<span className='comment-count'>{comments.length}</span>)}
    </Link> 
   {!auth.loading && user._id === auth.user._id && (<button  onClick={e => deletePost(_id)}     
    type="button"
    className="btn btn-danger"
  >  <i className="fas fa-times"></i>
    </button>)} 
    </Fragment> }
  
  </div>
</div>;
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = state =>({
    auth: state.authReducer
    
});

export default connect(mapStateToProps, {addLike, removeLike, deletePost})(PostItem);
