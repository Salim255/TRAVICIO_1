import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {RiStarLine} from 'react-icons/ri';
import { MdStar} from 'react-icons/md';
import {IoIosStarHalf} from 'react-icons/io'

const ProfileItem = ({ profile: { ratingsAverage,jobMinimumPay,hourlyWage,user: {_id, firstName,lastName, avatar, photo},
    jobStatus,
    company,
    location,
    }}) => {
  const E = Math.trunc(ratingsAverage);
  const rating =Math.round( ratingsAverage);
  console.log(ratingsAverage);

  return (
      <div className='profile bg-light  profileItem'>
   
 <div>
 {photo ==='default.jpg'? (<img src={`/img/users/${photo}`} alt="user-avatar" className="round-img profile-containerimg" />) :(<img src={`/api/v1/image/${photo}`} alt="user-img" className="round-img" />) }
   <h4>{firstName}&nbsp;{lastName}</h4>
 </div>
<div>

 <div>{jobStatus} { company && <span> at {company}</span>}</div>
 <div className="my-1">{location && <span>{location}</span>}<br/>
 <div>Pay : {jobMinimumPay}&euro;/h &nbsp;<span className='hourlyWage'>{hourlyWage}</span></div>
 Rating :&nbsp;
 {[...Array(5)].map((star, index) =>{
   return (

     <Fragment>
        { ((ratingsAverage - index <1) && (ratingsAverage - index > 0))? ( <IoIosStarHalf  color={ "#ffcc10" }   className='starMargin'/> ): (index<E)? (<MdStar   color={"#ffcc10" } key={index} className='starMargin'/>):(<MdStar   color={"#FFFFFF" } key={index} className='starMargin'/>)}
         
     </Fragment>
     /*  <MdStar   color={"#ffcc10" } key={index} className='starMargin'/> index <= E ? (<MdStar   color={"#ffcc10" } key={index} className='starMargin'/>):*/
   )
 })}

{/* { ratingsAverage > E &&(( <IoIosStarHalf  color={ "#ffcc10" }   className='starMargin'/> )) }
{[...Array(5)].map((star, index) =>{
   return (
     <MdStar   color={"	#FFFFFF" } key={index} className='starMargin'/>
     
   )
 })} */}

 </div>
 
 <Link to={`/profiles/${_id}`} className='btn btn-primary'>
     View Profile
 </Link>
</div>
 
</div>
)
 
};

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
    
};

export default ProfileItem;
