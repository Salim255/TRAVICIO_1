import React , {useState, Fragment} from 'react';
import PropTypes from 'prop-types';
import Rating from '../layout/Rating';
import { Link } from 'react-router-dom';
import { MdStar} from 'react-icons/md';
import {IoIosStarHalf} from 'react-icons/io'

const ProfileTop = ({profile: { _id,jobStatus,ratingsAverage,jobMinimumPay,hourlyWage, company, location, website, social,phone, user: {firstName,lastName, photo,avatar, email}}}) => {
    
    const [popUp, setPopUp] = useState(false);
    
    const onChange = e => {
        e.preventDefault();
    } ;


    const onSubmit = e =>{
        e.preventDefault();
    
    }

    const onClick =() =>{
        setPopUp(!popUp);
    }
    const rating =Math.round( ratingsAverage);
    const E = Math.trunc(ratingsAverage);
  return <><div className='block '>
      <div className='profile-container '>
      <div className=" bgprimary ">
         
         
                   {photo ==='default.jpg'?  (<Fragment>
                        <img    src={`/img/users/${photo}`} className="round-img my-1 profile-container__img "
                      /* 
                       */ 
                       alt="" />
                   </Fragment>): (<Fragment>
                     <img className="round-img my-1 profile-container__img "
                     src={`/api/v1/image/${photo}`}alt="" />
                   </Fragment>)}
               
               
        <h1 className="large">{firstName}</h1>
       <div className='profileTop'>
              
                <div>
                     
                     <p className="lead">{jobStatus} {company && <span> at {company} </span>}</p>
                     <p className="lead">{location && <span>{location}</span>}
                    </p>
                </div>
                <div>
                  
                    <p className="lead">{location && <span>HourlyPay: {jobMinimumPay}&euro;/h </span>}
                    <p className="lead">{location && <span>{[...Array(5)].map((star, index) =>{
   return (
    <Fragment>
    { ((ratingsAverage - index <1) && (ratingsAverage - index > 0))? ( <IoIosStarHalf  color={ "#ffcc10" }   className='starMargin'/> ): (index<E)? (<MdStar   color={"#ffcc10" } key={index} className='starMargin'/>):(<MdStar   color={"#FFFFFF" } key={index} className='starMargin'/>)}
     
 </Fragment>
   )
 })}</span>}
                    </p>
            
                    </p>
                </div>
       </div>
      
       <div className='profileTop'>
            <div>
                 <p className='contactifo padingLR ' /* onClick={()=> onClick()} */>Work Photos
                    
                    </p>
                <p className='contactifo padingLR' /* onClick={()=> onClick()} */>Resume
                    
                    </p>
            </div>
            <div>
           
            <p className='contactifo padingLR' onClick={()=> onClick()}> <i class="far fa-envelope"></i> </p>
            <p className='contactifo padingLR' /* onClick={()=> onClick()} */> <i class="fas fa-phone-volume"></i> </p>
            <Link to={`/add-feedback/${_id}/reviews`} className='contactifo padingLR' >
                     Reviews
            </Link>
            </div>
       </div>
      
        <div className="icons paddingicon ">
       {/*  <i className="fab fa-twitter fa-2x"></i>
        <i className="fab fa-twitter fa-2x"></i>
        <i className="fab fa-twitter fa-2x"></i>
        <i className="fab fa-twitter fa-2x"></i> */}
            
            {
                website && (
                    <a href={website} target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-globe fa-2x"></i>
                    </a>
                )
            }
            {
                social && social.twitter &&(
                    <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter fa-2x"></i>
                    </a>
                )
            }
             {
                social && social.facbook &&(
                    <a href={social.facbook} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook fa-2x"></i>
                    </a>
                )
            }
             {
                social && social.linkedin &&(
                    <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin fa-2x"></i>
                    </a>
                )
            }
              {
                social && social.youtube &&(
                    <a href={social.youtube} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-youtube fa-2x"></i>
                  </a>
                )
            }
             {
                social && social.instagram &&(
                    <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram fa-2x"></i>
                  </a>
                )
            }
            
        </div>
     </div>
    </div>
 
  </div>
  {popUp&&(<div className='popUpInfo'>
    <div className='divName'> 
       <p className="large divName__name"></p> 
        <i className="fas fa-times divName__icon" onClick={() => onClick()}></i>
    </div>
    <div className='contacs'>
        <p className='contacs__text'>Contact Info</p>
       {/*   <div className='contacs__info'>
           <p className=""> <i class="fas fa-phone-volume"></i> {' '}Phone: {' '} {phone}</p>
          <p className=""><i class="far fa-envelope"></i> {' '}Email: {' '}{email}</p>
         </div>  */}
         <form className='form'>
         <div className="form__form-group">
                    <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required />
                    <small className="form__form-text"
                    >Your Email</small>
        </div>
         <div className="form__form-group">
                <input type="text" placeholder="Phone number" name="phone" value={phone} onChange={e => onChange(e)} required/>
                <small className="form__form-text"
                    >Your phone number</small>
        </div>
         <div className="form__form-group">
                <textarea placeholder="Your message..." name="bio" value=""  className='classarea'></textarea>
                <small className="form__form-text">Tell us a little about yourself</small>
                </div>
                <input type="submit" className="btn btn-primary my-1" value="Send"/>
         </form>
    </div>
</div>)}

</>
};

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired,
    //user: PropTypes.object.isRequired
};

export default ProfileTop;

