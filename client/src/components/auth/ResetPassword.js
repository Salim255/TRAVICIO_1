import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import {resetPassword} from '../../Actions/resetPasswordAction';

const ResetPassword = ({ resetPassword, match, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        password:'',
        passwordConfirm: ''
    });
    const {  password, passwordConfirm} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value });
    
    const onSubmit = async (e) => {
        e.preventDefault();
        resetPassword(formData,
                 match.params.token);
    }

     //Redirect if dachboard in
     if(isAuthenticated){
        return <Redirect to="/dashboard"/>
    }
    return (
    <Fragment>
        
            <div className='container'>
                    <h1 className="large text-primary">
                        Reset Your Password
                    </h1>
                    <form className="form"  onSubmit={e => onSubmit(e)}>
                    
                        <div className="form__form-group">
                        <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={password} onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className="form__form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="passwordConfirm"
                        minLength="6"

                        value={passwordConfirm} onChange={e => onChange(e)}
                        required
                    />
                </div>
                        <input type="submit" className="btn btn-primary" value="Submit" />  
                    </form>
                    <br/>
           
            </div>
    </Fragment>
    );
};


ResetPassword.propTypes = {

    resetPassword: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    
};

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated
})


export default connect(mapStateToProps, {resetPassword })(ResetPassword);
