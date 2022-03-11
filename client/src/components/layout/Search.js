import React,{Fragment, useEffect, useState, useRef} from 'react';
import { Link , Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as AiIcons  from 'react-icons/ai';
import axios from 'axios';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import { getFilteredProfiles,getProfiles } from '../../Actions/profileAction';
import List from './List';
//import {FontAwesomeIcon} from '@fortawesome/fontawesome-free';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

import {GiVacuumCleaner} from 'react-icons/gi'
import ProfileItem from '../profiles/ProfileItem';



const Search = ({ getFilteredProfiles,getProfiles, locationn,profile:{ profiles, loading}}) => {
    const [location, setLocation] = useState('');
    const [jobStatus, setJobStatus] = useState('');
 
   const refContainer = useRef(null);
    //const [jobsList, setJobsList] = useState([]);
    
   const handleClick = (e) => {
    
     console.log(e.target);
     const result = document.querySelector('.card__heading-span');
     console.log(result);
   }
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
    //getProfiles();
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
      <input type="text" name="jobStatus"  list="jobStatus"  value={jobStatus}  onChange={e => setJobStatus(e.target.value)} placeholder="The work type you are looking for"  className="search-section__input"/>  
      <datalist name="jobStatus" id="jobStatus" value={jobStatus} onChange={e => setJobStatus(e.target.value)}  >
      <option value="Electrical">Electrical</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="IT">IT</option>
                    <option value="Electronics">Electronics</option>
                    <option value="cosmetics">cosmetics</option>
                    <option value="photography">photography</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="courier">courier</option>
                    <option value="classes">classes</option>
                    <option value="fitness">fitness</option>
                    <option value="lawyers">lawyers</option>
                    <option value="Catering">Catering</option>
                    <option value="Urgent">Urgent</option>
                    <option value="carpenter">carpenter</option>
                    <option value="Gardener">Gardener</option>
      </datalist>
    
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
                        name="jobStatus" id="jobStatus" value={jobStatus} list="jobStatus" onChange={e => setJobStatus(e.target.value)}
                        
                    /> 
                   
                <datalist name="jobStatus" id="jobStatus" value={jobStatus} onChange={e => setJobStatus(e.target.value)}  >
                    <option value="Electrical">Electrical</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="IT">IT</option>
                    <option value="Electronics">Electronics</option>
                    <option value="cosmetics">cosmetics</option>
                    <option value="photography">photography</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="courier">courier</option>
                    <option value="classes">classes</option>
                    <option value="fitness">fitness</option>
                    <option value="lawyers">lawyers</option>
                    <option value="Catering">Catering</option>
                    <option value="Urgent">Urgent</option>
                    <option value="carpenter">carpenter</option>
                    <option value="Gardener">Gardener</option>
                </datalist>
                    
                </div>
             
             <br/>
             <br/>
             <br/>
             <Link to='/search' onClick={e =>handlChange(e) } className='searchBtn'>
                    Search
            </Link>
            </form>
 {/*  <div >
  <GiVacuumCleaner className='fnt' />
  </div>  */}     
  <div className='list'>
    {!loading&&profiles.length > 0 ? "": <Fragment>
    {[...Array(9)].map((el, index) => {
           return(<div className='card' key={index} onClick={e =>handleClick(e)} >
                    <h1 className='card__heading' >
                      <span className='card__heading-span' ref={refContainer} >
                          {(() => {
                              switch(index){
                                  case 0:
                                      return "Jardineria/Piscinas";
                                  case 1:
                                        return "Trabajos Generals";
                                  case 2:
                                     return "Servicio de Limpieza";
                                  case 3:
                                        return "Electronica/Informatica";
                                  case 4:
                                        
                                        return "Cosmetica";
                                  case 5:
                                        return "Construccion";
                                  case 6:
                                        return "Tutores/Cursos";
                                  case 7:
                                        return "Transportes/Correo";
                                  case 8:
                                        return "Artistico/Creativo";
                                  case 9:
                                            return "Artistico/Creativo";
                                  default:
                                    return ""
                              }

                          })()}
                                    
                       </span>
                    </h1>
                    <div className={`card__cato-${index}`}>
                       
                    </div>
           </div>)
       })}
    </Fragment> }
      
  </div> 
   <div className='searchItemMargin'>
   { loading ? ' ': <Fragment>
   
   
      <div className="">
       {!loading&&profiles.length > 0 ? (
         profiles.map(profile => (<Fragment>
            <h2 className="lead">
          <i className="fab fa-connectdevelop"></i>
          Workers available in your area</h2>
           <ProfileItem key={profile._id} profile={profile}/>
         </Fragment>
         
         ))
       ) : <h4> {/* No proiles found...  */}</h4> } </div></Fragment>}
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
