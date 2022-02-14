import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import{ updateUserSetting } from '../../Actions/userSettingAction';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';

const UserSetting = ({updateUserSetting,auth:{user, loading}, history}) => {
    const [form, setFormData] = useState({
        firstName:'',
        lastName:'',
        email: ''
      
    });
    const { firstName, lastName, email}= form;

    useEffect(() =>{
        setFormData({
        firstName: loading || !user.firstName ? '' : user.firstName ,
        lastName:loading || !user.lastName ? '' : user.lastName ,
        email: loading || !user.email ? '' : user.email ,
  
       })
    } ,[]);

    const onChange = e => setFormData({...form, [e.target.name]: e.target.value });
    const  [hoto, setPhoto] = useState(null);
  
  
   
   const chanangH = (e) =>{
    setPhoto(e.target.files[0]);
      
   }
   const onSubmit =  (e) => {
    e.preventDefault();
  
   const formData = new FormData();
   formData.append('firstName', form.firstName);
   formData.append('lastName', form.lastName);
   formData.append('photo', hoto);
    updateUserSetting(formData);///
    window.location.reload();
    };

  return loading === null? <Spinner/> :<Fragment>
      <Link className="btn btn-light my-1" to="/dashboard">Back To Profile</Link>
      <form className='form setting' onSubmit={e => onSubmit(e)}>
     
            <div className="form__group">
                    <label htmlFor="firstName" className="form__label">FirstName</label>
                    <input type="text" className="form__input" name="firstName" value={firstName} onChange={e => onChange(e)} />
            </div>
            <div className="form__group">
                    <label htmlFor="lastName" className="form__label">LastName</label>
                    <input type="text" className="form__input" name="lastName" value={lastName} onChange={e => onChange(e)}  />
            </div>
            <div className="form__group">
                    <label htmlFor="email" className="form__label">Email adress</label>
                    <input type="text" className="form__input" name="email" value={email} onChange={e => onChange(e)} />
            </div>
            <div className="form__group">
                {
                   user&&(user.photo ? (<img src={`/img/users/${user.photo}`} alt="" className="round-img my-1 profile-container__img " />) :( <img src={user.avatar} alt="" className="round-img my-1 profile-container__img " /> ) )
                  
                }
                
                     <input type="file" accept='image/*' id="file" name="file"   onChange={e =>chanangH(e)} />
                     <label htmlFor="file" className='form__fileLadel'>Choose new photo </label>
            </div>
            <div className="form__group right">
                <input type="submit" className="btnSetting btn-primary" value="Save settings" />
              
            </div>

      </form>
  </Fragment>;
};

UserSetting.propTypes = {
    updateUserSetting: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state =>({
    auth: state.authReducer
})

export default connect(mapStateToProps, {updateUserSetting})(UserSetting);
