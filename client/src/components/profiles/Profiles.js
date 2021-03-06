import React, {Fragment,useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import  { getProfiles } from '../../Actions/profileAction';

const Profiles = ({ getProfiles, profile:{ profiles, loading}}) => {
  
  useEffect(() => {
    
    getProfiles();
  },[getProfiles] );
  
  return <Fragment>

  { loading ? <Spinner/> : <Fragment>
    <div className='profileContainer'>
        <h1 className="large text-primary">Workers</h1>
        <p className="lead">
          <i className="fab fa-connectdevelop"></i>
          Browse and connect with workers</p>
          <div className="profilesContainer">
          {profiles.length > 0 ? (
            profiles.map(profile => (
              
            
              <ProfileItem key={profile._id} profile={profile}/>
            ))
          ) : <h4> No proiles found... </h4> } </div>
    </div>
       
       </Fragment>}
  
</Fragment>;
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
  
}

const mapStateToProps = state => ({
  profile: state.profileReducer
})
export default connect(mapStateToProps, { getProfiles})(Profiles);


