import React, {Fragment, useEffect} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import { getProfileById} from '../../Actions/profileAction';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';


const Profile = ({getProfileById, profile: {profile, loading}, match , auth}) => {
    useEffect(( ) => {
        console.log(auth);
        getProfileById(match.params.id);
    }, [ getProfileById, match.params.id]);
  
   
  return  <Fragment >
    <div className='profilTO'>
    {profile === null || loading ? <Spinner/> : <Fragment>
          <Link to='/profiles' className='btn btn-light'>
              Back To Profiles
          </Link>
          {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (<Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
          </Link>) }
          <div className="profile-gride my-1 ">
              <ProfileTop profile={profile} user={auth} />
             {/*  <ProfileAbout profile={profile}/> */}
             
              <div className="profile-exp bg-white p-2">
                  <h2 className="text-primary fontSize">Experience</h2>
                  {profile.experience&&(profile.experience.length > 0) ? (<Fragment>
                      {profile.experience.map(exp => (
                          <ProfileExperience key={exp._id} experience={exp} />
                      ))}
                  </Fragment>) : (<h4>No experience credentials</h4>)}
              </div>
              <div className="profile-edu borderRadb bg-white p-2">
                  <h2 className="text-primary fontSize">Education</h2>
                  {profile.education && profile.education.length > 0 ? (<Fragment>
                      {profile.education.map(edu => (
                          <ProfileEducation key={edu._id} education={edu} />
                      ))}
                  </Fragment>) : (<h4>No education credentials</h4>)}
              </div>
              
          </div>
          
      </Fragment> }
    </div>
  </Fragment> 
};

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state =>({
    profile: state.profileReducer,
    auth: state.authReducer
})
export default connect(mapStateToProps, {getProfileById})(Profile);
