import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';


const Login = () => {
    const [formData, setFormData] = useState({
        email:'',
        password:''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("Success");
        
    }
   
    return (
    <Fragment>
        <section className="section">
            <div className='container'>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
            <form className="form" action="create-profile.html" onSubmit={e => onSubmit(e)}>
                <div className="form__form-group">
                
                </div>
                <div className="form__form-group">
                <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required />
                <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                    Gravatar email</small
                >
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
                <div className="form-group">
                
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have  have an account? <Link to="/register"><span>Sign Up</span></Link>
            </p>
            </div>
        </section>
    </Fragment>
    )
}



export default Login;