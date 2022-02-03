import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import{ updateUserSetting } from '../../Actions/userSettingAction';
import {connect} from 'react-redux'

const UserSetting = ({updateUserSetting}) => {
    const [form, setFormData] = useState({
        firstName:'',
        lastName:'',
        email: '',
       
    });
    const { firstName, lastName, email}= form;
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
    updateUserSetting(formData);
    
    };

  return <Fragment>
     
      <form className='form setting' onSubmit={e => onSubmit(e)}>
            <div className="form__group">
                    <label htmlFor="firstName" className="form__label">FirstName</label>
                    <input type="text" className="form__input" name="firstName" id="firstName" value={firstName} onChange={e => onChange(e)} />
            </div>
            <div className="form__group">
                    <label htmlFor="lastName" className="form__label">FirstName</label>
                    <input type="text" className="form__input" name="lastName" value={lastName} onChange={e => onChange(e)} id="lastName" />
            </div>
            <div className="form__group">
                    <label htmlFor="email" className="form__label">Email adress</label>
                    <input type="text" className="form__input" name="email" value={email} onChange={e => onChange(e)} />
            </div>
            <div className="form__group">
                <img src="" alt="" className="form__user-photo" />
                <input type="file" accept='image/*' id="photo" name="photo" className='form__photo-upload'  onChange={e =>chanangH(e)} />
             
                <label htmlFor="photo">Choose new photo </label>
            </div>
            <div className="form__group right">
                <input type="submit" className="btn btn-primary" value="Save settings" />
                
                
            </div>

      </form>
  </Fragment>;
};

UserSetting.propTypes = {
    updateUserSetting: PropTypes.func.isRequired,
};

export default connect(null, {updateUserSetting})(UserSetting);
