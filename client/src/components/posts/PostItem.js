import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect} from 'react-redux';
import { addLike, removeLike, deletePost } from '../../Actions/postAction';

const PostItem = ({addLike, removeLike,deletePost, auth, post: {_id, text, name,firstName, lastName, avatar,photo, user, likes, comments, date},showActions }) =>  {
 
  return <div className="postStyle p-1 my-1">
  <div>
    <Link to={`/profiles/${user}`}>
    {photo? (<img src={`/img/users/${photo}`} alt="user-img" className="round-img" />) :(<img src={avatar} alt="user-img" className="round-img" />) }
      
    </Link>
  </div>
  <div className=' '>
   <div className='bgWhite'>
      <h4>{name}&nbsp; {lastName}</h4>
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
   {!auth.loading && user === auth.user._id && (<button  onClick={e => deletePost(_id)}     
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
