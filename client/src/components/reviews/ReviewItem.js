import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {FaStar} from 'react-icons/fa'

const PreviewItem = ({review:{review, _id, profile, user:{firstName, lastName, avatar}}}) => {

  return <div className='post bg-white p-1 my-1'>
 <Link to={`/profiles/${profile}`}>
 <img src={avatar} alt="" className="round-img" />
 <h6>{firstName} {lastName}</h6>
 </Link> 
  <div>
 <p>{review}</p>
  </div> 
</div>; 
 
};

PreviewItem.propTypes = {
    reviews: PropTypes.object.isRequired
    
};

export default PreviewItem;
