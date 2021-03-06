import React, {Fragment, useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getCurrentProfile , deleteAccount} from '../../Actions/profileAction';
import{ gettingSingleImage  } from '../../Actions/userSettingAction';
import DashboardAction from './DashboardAction';
import Experience from './Experience';
import Education from './Education';

import { connect } from 'react-redux';



const Dashboard = ({getCurrentProfile,deleteAccount,gettingSingleImage , auth: { user}, profile: { profile, loading}}) => {
    const [image, setImage] = useState('');

    useEffect(() =>{
        getCurrentProfile();
        
    }, [getCurrentProfile]);
    
    return loading && profile ? <Spinner/>: <Fragment>
        <div className='dashContainer'>
        <div className='dashboard'>
              <h1 className="large text-primary">  
               {user &&(<Fragment>
                   {user.photo ==='default.jpg'?  (<Fragment>
                        <img    src={`/img/users/${user.photo}`} className="round-img my-1 profile-container__img "
                      /* 
                       */ 
                       alt="" />
                   </Fragment>): (<Fragment>
                     <img className="round-img my-1 profile-container__img "
                     src={`/api/v1/image/${user.photo}`}alt="" />
                   </Fragment>)}
               </Fragment>) 
               }
               </h1>
                <p className='lead'> <i className="fas fa-user"></i>  { user && (user.firstName +' '+ user.lastName )}</p>
              

                <div className="my-2">
                    <Link to="/settings" className='btn btn-primary' >
                    <i className="fas fa-cog">Account Settings</i> 
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
        </div>
    </Fragment>
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    gettingSingleImage :PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    auth: state.authReducer,
    profile: state.profileReducer,
   
});

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount,  gettingSingleImage})(Dashboard)
