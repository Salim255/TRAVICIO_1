import React, {Fragment, useEffect} from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getCurrentProfile , deleteAccount} from '../../Actions/profileAction';
import DashboardAction from './DashboardAction';
import Experience from './Experience';
import Education from './Education';

import { connect } from 'react-redux';



const Dashboard = ({getCurrentProfile,deleteAccount, auth: { user}, profile: { profile, loading}}) => {

    useEffect(() =>{
        getCurrentProfile();
    }, [getCurrentProfile]);
 
    return loading && profile === null ? <Spinner/>: <Fragment>
        <div className='dashboard'>
                <h1 className="large text-primary">  
                   <img
            className="round-img my-1 profile-container__img "
            src={`/img/users/${user.photo}`}
            alt="" 
        />
               </h1>
                <p className='lead'> <i className="fas fa-user"></i>  { user && user.firstName}</p>
              

                <div className="my-2">
                    <Link to="/settings" className='btn btn-primary' >
                    <i class="fas fa-cog">Account Settings</i> 
                    </Link>
                    <button className='btn btn-danger' onClick={() => deleteAccount()}>
                        <i className="fas fa-user-minus" >Delete My Account</i>
                    </button>
               </div>
           
                {profile !== null ? <Fragment><DashboardAction/>
               {profile.experience && <Experience experience={profile.experience}/>}
                {profile.education&&<Education education={profile.education}/>}
                </Fragment> : <Fragment><p>You have not yet setup a profile, please add some info</p>
                <Link to='/create-profile' className="btn btn-primary my-1">
                    Create Profile
                </Link>
                </Fragment>}
        </div>
    </Fragment>
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    auth: state.authReducer,
    profile: state.profileReducer,
   
});

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard)
