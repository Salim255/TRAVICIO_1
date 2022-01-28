import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({ profile: { user: {_id, firstName, avatar},
    jobStatus,
    company,
    location,
    }}) => {
    
  return <div className='profile bg-light'>
  <img src={avatar} alt="" className="round-img" />
 <div>
 <h2>{firstName}</h2>
  <p>{jobStatus} { company && <span> at {company}</span>}</p>
  <p className="my-1">{location && <span>{location}</span>}<br/>
  <i class="far fa-star"></i>
    <i class="far fa-star"></i>
    <i class="far fa-star"></i>
    <i class="far fa-star"></i>
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
