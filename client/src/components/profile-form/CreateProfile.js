import React , { Fragment, useState} from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import  { connect } from 'react-redux'
;
import { createProfile } from '../../Actions/profileAction';

const CreateProfile =({ createProfile, history }) => {
    const [formData, setFormData] = useState({
          location:'',
          jobStatus:'',
          bio:'',
          phone:'',
          hourlyWage:'',
          jobMinimumPay:'',
    });

    const { 
    location,
    jobStatus,
    bio,
    phone,
    hourlyWage,
    jobMinimumPay} = formData;

    const [displaySocialInputs, toggleSocialInputs ] = useState(false);
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value }) ;


    const onSubmit = e =>{
        e.preventDefault();
    
        createProfile(formData, history);
    }

    return (
        <Fragment>
           <div className='Container'>
           <section className='createProfile'>
           <h1 className="large text-primary">
                Create Your Profile
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information to make your
                profile stand out
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form__form-group">
                <select name="jobStatus" value={jobStatus} onChange={e => onChange(e)} >
                    <option value="0">* Select Professional Status</option>
                    <option value="Developer">Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student or Learning">Student or Learning</option>
                    <option value="Instructor">Instructor or Teacher</option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option>
                </select>
                <small className="form__form-text"
                    >Give us an idea of where you are at in your career</small>
                </div>
              
              
                <div className="form__form-group">
                <input type="text" placeholder="Phone number" name="phone" value={phone} onChange={e => onChange(e)} />
                <small className="form__form-text"
                    >City & state suggested (eg. Boston, MA)</small>
                </div>

                <div className="form__form-group">
                <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)} required/>
                <small className="form__form-text"
                    >City & state suggested (eg. Boston, MA)</small>
                </div>
               
                <div className="form__form-group">
                <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e => onChange(e)}></textarea>
                <small className="form__form-text">Tell us a little about yourself</small>
                </div>
                <div className="form__form-group">
                <textarea placeholder="A short bio of yourself" name="jobMinimumPay" value={jobMinimumPay} onChange={e => onChange(e)}></textarea>
                <small className="form__form-text">Minimum Pay /h</small>
                </div>
                <div className="form__form-group">
                <select name="hourlyWage" value={hourlyWage} onChange={e => onChange(e)}>
                    <option value="0"> Select  hourly wage type</option>
                    <option value="Developer">Negotiable</option>
                    <option value="Junior Developer">No Negotiable</option>
                </select>
                <small className="form__form-text"
                    >Give us an idea of where you are at in your career</small>
                </div>
                <div className="my-2">
                <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
                    Add Social Network Links
                </button>
                <span>Optional</span>
                </div>
                 
                 {/* {displaySocialInputs && <Fragment><div className="form__form-group social-input">
                <i className="fab fa-twitter fa-2x"></i>
                <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={e => onChange(e)} />
                </div>

                <div className="form__form-group social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e => onChange(e)}/>
                </div>

                <div className="form__form-group social-input">
                <i className="fab fa-youtube fa-2x"></i>
                <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={e => onChange(e)} />
                </div>

                <div className="form__form-group social-input">
                <i className="fab fa-linkedin fa-2x"></i>
                <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={e => onChange(e)} />
                </div>

                <div className="form__form-group social-input">
                <i className="fab fa-instagram fa-2x"></i>
                <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={e => onChange(e)}/>
                </div>
                </Fragment>} */}

                
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
           </section>
           </div>
        </Fragment>
    )
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
};



export default connect(null, { createProfile })(withRouter(CreateProfile));
