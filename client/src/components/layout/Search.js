import React,{Fragment, useEffect, useState} from 'react';
import { Link , Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as AiIcons  from 'react-icons/ai';
import axios from 'axios';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import { getFilteredProfiles,getProfiles } from '../../Actions/profileAction';

import ProfileItem from '../profiles/ProfileItem';
import Test from './Test.js'


const Search = ({ getFilteredProfiles,getProfiles, locationn,profile:{ profiles, loading}}) => {
    const [location, setLocation] = useState('');
    const [jobStatus, setJobStatus] = useState('');
    //const [jobsList, setJobsList] = useState([]);


   const handlChange =(e) =>{
        e.preventDefault() ;
        
        getFilteredProfiles({location, jobStatus});
        
   };

 /*   const getJobstatus = () =>{
     for(const job in profiles){
       console.log(job);
     }
   } */
  
   useEffect(() =>{
   
    setLocation(locationn.location);
    getProfiles();
    /* for(const job in profiles){
      console.log(profiles[job].jobStatus);
      setJobStatus(oldArray=> [...oldArray, profiles[job].jobStatus ])
    }
    console.log(jobsList[0]); */
   }, [setLocation,   getProfiles, locationn.location])
  return <Fragment>
  <form  onSubmit={e => {e.preventDefault() ;
        setLocation('');
        setJobStatus('')
    }} className='filterSerch hide-sm'>
       <div className="search-section__searchBox">
       <Link to='/search' onClick={e =>handlChange(e) }>
                    < AiIcons.AiOutlineSearch className="search-section__icon" />
                </Link>
      <input type="text" name="location" id="location" value={location} onChange={e => setLocation(e.target.value)} placeholder="The City you are  for searching worker in"  className="search-section__input"/>  
   <input type="text" name="jobStatus" id="jobStatus" value={jobStatus}  onChange={e => setJobStatus(e.target.value)} placeholder="The work type you are looking for"  className="search-section__input"/>  
  {/*    <div > 
               <select name="jobStatus" value={jobStatus} className='selectList' onChange={(e) => setJobStatus(e.target.value) } >
                 {jobsList.map(job =>(<option value="Developer">Developer</option>))}
                   {/* <option value="0"> Work type you are looking for</option>
                    <option value="Developer">Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student or Learning">Student or Learning</option>
                    <option value="Instructor">Instructor or Teacher</option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option> 
                </select>
                
     </div> */} 

     </div>
   
    
     
  </form>
  <form className="hide-bg " action="create-profile.html" >
                <div className=" search-sm">
                    <input
                        type="text"
                        placeholder="The City you are searching for"
                        name="location" id="location" value={location} onChange={e => setLocation(e.target.value)}
                    />
                </div>
                <div className="search-sm form__form-group">
               
                    <input
                        type="text"
                        placeholder="The work Type you are searshing for "
                        name="jobStatus" id="jobStatus" value={jobStatus}  onChange={e => setJobStatus(e.target.value)}
                        
                    /> 
                
                    
                    
                </div>
             
             <br/>
             <br/>
             <br/>
             <Link to='/search' onClick={e =>handlChange(e) } className='searchBtn'>
                    Search
            </Link>
            </form>
            
{/*   <button type="submit" className="btn filterBtn"  onClick={e =>handlChange(e) } >Search</button> */}
   <div className='searchItemMargin'>
   { loading ? <Spinner/>: <Fragment>
   
    <h2 className="lead">
      <i className="fab fa-connectdevelop"></i>
      Workers available in your area</h2>
      <div className="">
       {!loading&&profiles.length > 0 ? (
         profiles.map(profile => (
          
           <ProfileItem key={profile._id} profile={profile}/>
         ))
       ) : <h4> No proiles found... </h4> } </div></Fragment>}
   </div>
  </Fragment>
};

Search.propTypes = {
  getFilteredProfiles: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  locationn:  PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profileReducer,
    locationn: state.locationReducer
  })

export default connect(mapStateToProps, { getFilteredProfiles, getProfiles})(Search);
