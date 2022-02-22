import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import { setAlert } from '../../Actions/alertAction';
import { forgotPassword } from '../../Actions/forgotAction';

const ForgotPassword = ({ setAlert, forgotPassword}) => {
    const [formData, setFormData] = useState({
        email: ''
    });

    const { email} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value });
    
    const onSubmit = async (e) => {
        e.preventDefault();
        forgotPassword({
                 email
            });
        //window.location.reload();
        setFormData({email:""});
    }
    return (
    <Fragment>
        
            <div className='container'>
                    <h1 className="large text-primary">
                        Forgot Your Password?
                    </h1>
                    <p className="lead"><i className="fas fa-user"></i> 
                        Enter your email and you will recieve a   link to reset your password
                    </p>
                    <form className="form"  onSubmit={e => onSubmit(e)}>
                        <div className="form__form-group">
                            <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required /> 
                        </div>
                        <input type="submit" className="btn btn-primary" value="Submit" />  
                    </form>
                    <br/>
           
            </div>
    </Fragment>
    );
};


ForgotPassword.propTypes = {
    setAlert: PropTypes.func.isRequired,
    forgotPassword: PropTypes.func.isRequired,
    
};


export default connect(null, { setAlert,  forgotPassword })(ForgotPassword);
