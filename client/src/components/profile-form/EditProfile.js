import React , { Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import  { connect } from 'react-redux'
;
import { createProfile , getCurrentProfile} from '../../Actions/profileAction';


const EditProfile = ({ profile:{profile, loading},createProfile,getCurrentProfile, history }) => {
    const [formData, setFormData] = useState({
        location:'',
        jobStatus:'',
        jobCategory:'',
        bio:'',
        phone:'',
        hourlyWage:'',
        jobMinimumPay:'',
  });
  const list  = ["Beauty","cosmetics", "Artist","photography", "Transport","courier", "Health","fitness","sports", "Finance","lawyers","Construction","carpenter", "Tutors","classes"];
  const { 
  location,
  jobStatus,
  jobCategory,
  bio,
  phone,
  hourlyWage,
  jobMinimumPay} = formData;

    const [displaySocialInputs, toggleSocialInputs ] = useState(false);
    const [displayInputs, toggleInputs ] = useState(false);

    useEffect(()=>{
        getCurrentProfile();
        setFormData({
            phone: loading || !profile.phone ? '': profile.phone,
            hourlyWage: loading || !profile.hourlyWage? '': profile.hourlyWage,
            location: loading || !profile.location ? '': profile.location,
            jobStatus: loading || !profile.jobStatus ? '': profile.jobStatus,
            jobCategory: loading || !profile.jobCategory ? '': profile.jobCategory,
            bio: loading || !profile.bio ? '': profile.bio,
            jobMinimumPay: loading || !profile.jobMinimumPay ? '': profile.jobMinimumPay,
           
        });
       
    }, [])
    
    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
       
     }
    
    const onSubmit = e =>{
        e.preventDefault();
        createProfile(formData, history, true);
        
    }

    return (
        <Fragment>
           <div className=''>
              <section className='createProfile'>
              <h1 className="large text-primary">
                Edit Your Profile
            </h1>
             <p className="lead">
                <i className="fas fa-user"></i> 
            </p> 
            {/* <small>* = required field</small> */}
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form__form-group">
                <input type="text" name="jobStatus" list="jobStatus" value={jobStatus}  placeholder='Select Professional Status'  onChange={e => onChange(e)} required/>
                <datalist name="jobStatus" id="jobStatus" value={jobStatus} onChange={e => onChange(e)}  >
                    <option value="Electrical">Electrical</option>
                    <option value="Automotive">Automotive</option>
                    <option value="General labor">General labor</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Electronics">Electronics</option>
                    <option value="photography">photography</option>
                    <option value="Child care">Child care</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="courier">courier</option>
                    <option value="Tutors">Tutors</option>
                    <option value="lawyers">lawyers</option>
                    <option value="Catering">Catering</option>
                    <option value="Urgent">Urgent</option>
                    <option value="carpenter">carpenter</option>
                    <option value="Gardener">Gardener</option>
                </datalist>
               <small className="form__form-text"
                    >Your job title</small> 
                </div>
               
                <div className="form__form-group">
                <input type="text" name="jobCategory" list="jobCategory" value={jobCategory}  placeholder='Select Your  Job Category'  onChange={e => onChange(e)} />
                <datalist name="jobCategory" id="jobCategory" value={jobCategory} onChange={e => onChange(e)}  >
                   
                    <option value="Beauty">Beauty</option>
                    <option value="Cosmetics">Cosmetics</option>
                    <option value="Artist">Artist</option>
                    <option value="Transport">Transport</option>
                    <option value="Construction">Construction </option>
                    <option value="Other">Other </option>
    
                </datalist>
               <small className="form__form-text"
                    >Job Category</small> 
                </div>
                <div className="form__form-group">
                <input type="number" placeholder="Phone number" name="phone" value={phone} onChange={e => onChange(e)} />
                <small className="form__form-text"
                    >Your Phone number</small> 
                </div>

                <div className="form__form-group">
                <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)} required/>
                <small className="form__form-text"
                    >Your City </small> 
                </div>
               
                
                <div className="form__form-group">
                <input type="text" placeholder="Minimum Pay /h" name="jobMinimumPay" value={jobMinimumPay} onChange={e => onChange(e)}></input>
               <small className="form__form-text">Minimum Pay /h</small> 
                </div>

                <div className="form__form-group">
                <select name="hourlyWage" value={hourlyWage} onChange={e => onChange(e)}>
                    <option value="0"> Select  hourly wage type</option>
                    <option value="Developer">Negotiable</option>
                    <option value="Junior Developer">No Negotiable</option>
                </select>
                 <small className="form__form-text"
                    >Your wage type</small> 
                </div>

                <div className="form__form-group">
                <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e => onChange(e)} className='classarea'></textarea>
                <small className="form__form-text">Tell us a little about yourself</small>
                </div>
                

             
               {/*  <div className="my-2">
                <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
                    Add Social Network Links
                </button>
                <span>Optional</span>
                </div> */}
                 
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

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
        profile: state.profileReducer
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));
