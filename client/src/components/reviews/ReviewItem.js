import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {FaStar} from 'react-icons/fa'
import Spinner from '../layout/Spinner';
import {deleteFeedBack} from '../../Actions/reviewAction'

const ReviewItem = ({deleteFeedBack,auth,review:{user:{_id,firstName, lastName, avatar, loading, photo},review, id, profile}}) => {
 
  return <div className='review p-1 my-1'>
 {/* <Link to={`/profiles/${profile}`}>
 <img src={avatar} alt="" className="round-img" />
 <h6>{firstName} {lastName}</h6>
 </Link>  */}
 <Link to={`/profiles/${profile}`}>
    {photo? (<img src={`/img/users/${photo}`} alt="" className="round-img" />) :(<img src={avatar} alt="" className="round-img" />) }
   
    </Link>
  <div className='bgWhite'>
  <h6>{firstName} {lastName}</h6>
    <p>{review}</p>
    {!auth.loading && _id === auth.user._id &&( <button onClick={e => deleteFeedBack(id)}     
        type="button"
        className="btn review__delete btn-danger"
      >  Delete 
        </button>)}
  </div> 

 
</div>; 
 
};

ReviewItem.propTypes = {
    review: PropTypes.object.isRequired,
    deleteFeedBack: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
    
};
const mapStateToProps = state=>({
  auth: state.authReducer
})
export default connect(mapStateToProps, {deleteFeedBack})(ReviewItem);
