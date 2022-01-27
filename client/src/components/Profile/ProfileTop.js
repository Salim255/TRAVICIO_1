import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({profile: { jobStatus, company, location, website, social, user: {firstName, avatar}}}) => {
   
  return <div className='block '>
      <div className='profile-container '>
      <div className=" bg-primary ">
        <img
            className="round-img my-1 profile-container__img "
            src={avatar}
            alt="" 
        />
        
        <h1 className="large">{firstName}</h1>
        <p className="lead">{jobStatus} {company && <span> at {company} </span>}</p>
        <p className="lead">{location && <span>{location}</span>}</p>
        <div className="icons paddingicon ">
        <i className="fab fa-twitter fa-2x"></i>
        <i className="fab fa-twitter fa-2x"></i>
        <i className="fab fa-twitter fa-2x"></i>
        <i className="fab fa-twitter fa-2x"></i>
            
            {
                website && (
                    <a href={website} target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-globe fa-2x"></i>
                    </a>
                )
            }
            {
                social && social.twitter &&(
                    <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter fa-2x"></i>
                    </a>
                )
            }
             {
                social && social.facbook &&(
                    <a href={social.facbook} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook fa-2x"></i>
                    </a>
                )
            }
             {
                social && social.linkedin &&(
                    <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin fa-2x"></i>
                    </a>
                )
            }
              {
                social && social.youtube &&(
                    <a href={social.youtube} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-youtube fa-2x"></i>
                  </a>
                )
            }
             {
                social && social.instagram &&(
                    <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram fa-2x"></i>
                  </a>
                )
            }
            
        </div>
</div>
      </div>
  </div>
};

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileTop;

