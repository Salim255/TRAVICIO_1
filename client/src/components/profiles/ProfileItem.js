import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {RiStarLine} from 'react-icons/ri';
import { MdStar} from 'react-icons/md';

const ProfileItem = ({ profile: { ratingsAverage,jobMinimumPay,hourlyWage,user: {_id, firstName,lastName, avatar, photo},
    jobStatus,
    company,
    location,
    }}) => {
  
  const rating =Math.round( ratingsAverage);


  return <div className='profile bg-light'>
   
    {!photo? (<img src={`${avatar}`} alt="user-img" className="round-img profile-containerimg" />) :(<img src={`/img/users/${photo}`} alt="user-img" className="round-img" />) }
 <div>
 <h2>{firstName}&nbsp;{lastName}</h2>
  <div>{jobStatus} { company && <span> at {company}</span>}</div>
  <div className="my-1">{location && <span>{location}</span>}<br/>
  <div>Pay : {jobMinimumPay}&euro;/h &nbsp;<span className='hourlyWage'>{hourlyWage}</span></div>
  Rating :&nbsp;
  {[...Array(5)].map((star, index) =>{
    return (
      <MdStar   color={rating<= index ? "#e4e5e9": "#ffcc10" } key={index} className='starMargin'/>
    )
  })}
   
 
  </div>
  
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
