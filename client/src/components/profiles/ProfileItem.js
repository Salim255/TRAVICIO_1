import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({ profile: { user: {_id, firstName, avatar},
    jobStatus,
    company,
    location,
    }}) => {
    
  return <div className='block'>
      <div className='profile-container'>
        <img src={avatar} alt='rando worker' className='profile-container__img' />
        <h2>{firstName}</h2>
                        <p className='profile-container__worker-title'>{jobStatus} { company && <span> at {company}</span>}</p>
                        <p className="profile-container__worker-value my-1">{location&& <span>{location}</span>}</p>
                        <Link to={`/profile/${_id}`} className='btn btn-primary'>
                                View Profile
                         </Link>
        </div>
        
  </div>
              
 
};

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
    
};

export default ProfileItem;
