import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import { setAlert } from '../../Actions/alertAction';
import { register } from '../../Actions/authAction';

const Register = ({ setAlert, register , isAuthenticated}) => {
    const [formData, setFormData] = useState({
        firstName:'',
        lastName:'',
        email: '',
        password:'',
        passwordConfirm: ''
    });

    const { firstName, lastName, email, password, passwordConfirm} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value });
    const onSubmit = async (e) => {
        e.preventDefault();
        if(password !== passwordConfirm){
             setAlert('Password do not match', 'danger');
        }else{
           
            register({
                firstName,lastName, email, password, passwordConfirm
            })
        }
    }

    //Redirect to dashboard
   //Redirect if dachboard in
   if(isAuthenticated){
    return <Redirect to="/dashboard"/>
}
   
    return (
    <Fragment>
        
            <div className='container'>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" action="create-profile.html" onSubmit={e => onSubmit(e)}>
                <div className="form__form-group">
                    <input type="text" placeholder="First Name" name="firstName" value={firstName} onChange={e => onChange(e)} required />
                </div>
                <div className="form__form-group">
                    <input type="text" placeholder="Last Name" name="lastName" value={lastName} onChange={e => onChange(e)} required />
                </div>
                <div className="form__form-group">
                    <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required />
                    
                </div>
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
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login"><span>Sign In</span></Link>
            </p>
            </div>
           
        
    </Fragment>
    );
};


Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated
})
export default connect(mapStateToProps, { setAlert, register })(Register);
