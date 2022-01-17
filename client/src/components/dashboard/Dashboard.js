import React, {Fragment, useEffect} from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//import Spinner from "../layout/spinner.gif";
import { getCurrentProfile } from '../../Actions/profileAction';

import { connect } from 'react-redux';


const Dashboard = ({getCurrentProfile, auth: { user}, profile: { profile, loading}}) => {

    useEffect(() =>{
        getCurrentProfile();
    }, []);

    return loading && profile === null ? <Fragment>Hello</Fragment> : <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className='lead'> <i className="fas fa-user"></i> Welcome { user && user.name}</p>

        {profile !== null ? <Fragment>has</Fragment> : <Fragment><p>You have not yet setup a profile, please add some info</p>
        <Link to='/create-profile' className="btn btn-primary my-1">
            Create Profile
        </Link>
        </Fragment>}
    </Fragment>
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    auth: state.authReducer,
    profile: state.profileReducer
});

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard)