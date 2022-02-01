import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {FaStar} from 'react-icons/fa'

const ProfileItem = ({ profile: { ratingsAverage,user: {_id, firstName, avatar},
    jobStatus,
    company,
    location,
    }}) => {

  const rating =Math.round( ratingsAverage);

  return <div className='profile bg-light'>
  <img src={avatar} alt="" className="round-img" />
 <div>
 <h2>{firstName}</h2>
  <p>{jobStatus} { company && <span> at {company}</span>}</p>
  <p className="my-1">{location && <span>{location}</span>}<br/>

  {[...Array(5)].map((star, index) =>{
    return <FaStar   color={rating<= index ? "#e4e5e9": "#ffcc10" } key={index} className='starMargin'/>
  })}
   
 
  </p>
  
  <Link to={`/profiles/${_id}`} className='btn btn-primary'>
      View Profile
  </Link>
 </div>
  
</div>; 
 
};

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
    
};

export default ProfileItem;
