import React,{Fragment, useEffect, useState, useRef} from 'react';
import { Link , Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as AiIcons  from 'react-icons/ai';
import axios from 'axios';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import { getFilteredProfiles,getProfiles } from '../../Actions/profileAction';
//import List from './List';
import auto from '../../images/auto.jpeg';
import artistico from '../../images/artistico.jpg';
import carpinteria from '../../images/carpinteria.jpg';
import cosmetico from '../../images/cosmetico.jpg';
import jardineria from '../../images/jardineria.jpg';
import limpieza from '../../images/limpieza.jpg';
import transportes from '../../images/transportes.jpg';
import tutores from '../../images/tutores.jpg';
import salud from '../../images/salud.jpg';
import generales from '../../images/generales.jpg';
import cuidado from '../../images/cuidado.jpg';
import electronica from '../../images/electronica.jpg';


import ProfileItem from '../profiles/ProfileItem';



const Search = ({ getFilteredProfiles,getProfiles, locationn,profile:{ profiles, loading}}) => {
    const [location, setLocation] = useState('');
    const [jobStatus, setJobStatus] = useState('');
 
   const refContainer = useRef(null);
    //const [jobsList, setJobsList] = useState([]);
    
   const handleClick = (e) => {
    
     
     const result = e.target;
     let jobCategory = '';
    
     //console.log('3//: ',result.innerHTML);
     //console.log(result.classList.contains('list'));
     if(result.classList.contains('card')){
         //console.log(result.children[0].lastChild.children[0].innerHTML);
        jobCategory = result.children[0].lastChild.children[0].innerHTML;
        jobCategory =  jobCategory.split('/')[0];
         
       
     }else if(result.classList.contains('card__cato-0')){
          jobCategory = result.children[1].children[0].innerHTML.split('/')[0];
       
            
     }else if(result.classList.contains('imageSt')){

          jobCategory = result.nextSibling.children[0].innerHTML;
         
     }else if((result.classList.contains('card__heading-span'))){
          jobCategory = result.innerHTML.split('/');
          
     }

     getFilteredProfiles({location, jobStatus, jobCategory});
     jobCategory = "";
   }
   const handlChange =(e) =>{
        e.preventDefault() ;
        getFilteredProfiles({location, jobStatus});
       // window.location.hash = "#profilesId";
       document.getElementById('profilesId').scrollIntoView();
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
       <Link to='/search'  onClick={e =>handlChange(e) }  >
                    < AiIcons.AiOutlineSearch className="search-section__icon"  /* href="#profilesId" *//>
        </Link>
      <input type="text" name="location" id="location" value={location} onChange={e => setLocation(e.target.value)} placeholder="The City you are searching worker in"  className="search-section__input"/>  
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
             <Link to='/search' href="#profilesId" onClick={e =>handlChange(e) } className='searchBtn'>
                    Search
            </Link>
            </form>
 {/*  <div >
  <GiVacuumCleaner className='fnt' />
  </div>  */}     
  <div className='list'>
   {/*  {!loading&&profiles.length > 0 ? "": <Fragment> */}
           <div className='card'  onClick={e =>handleClick(e)} >
                   <figure className={`card__cato-0`} >
                      <img src={auto} alt="Trulli"  className='imageSt'/>
                      <h1 className='card__heading' > <span className='card__heading-span'> Automovilistico </span></h1>
                    </figure>
           </div>
           <div className='card'  onClick={e =>handleClick(e)} >
                   <figure className={`card__cato-0`}>
                      <img src={artistico} alt="Trulli"  className='imageSt'/>
                      <h1 className='card__heading' > <span className='card__heading-span'> Artistico/Creativo
                        </span></h1>
                    </figure>
           </div>
           <div className='card'  onClick={e =>handleClick(e)} >
                   <figure className={`card__cato-0`}>
                      <img src={carpinteria} alt="Trulli"  className='imageSt'/>
                      <h1 className='card__heading' > <span className='card__heading-span'> Construccion
                        </span></h1>
                    </figure>
           </div>
           <div className='card'  onClick={e =>handleClick(e)} >
                   <figure className={`card__cato-0`}>
                      <img src={cosmetico} alt="Trulli"  className='imageSt'/>
                      <h1 className='card__heading' > <span className='card__heading-span'> Cosmetica
                        </span></h1>
                    </figure>
           </div>
           <div className='card'  onClick={e =>handleClick(e)} >
                   <figure className={`card__cato-0`}>
                      <img src={jardineria} alt="Trulli"  className='imageSt'/>
                      <h1 className='card__heading' > <span className='card__heading-span'> Jardineria/Piscinas 
                        </span></h1>
                    </figure>
           </div>
           <div className='card'  onClick={e =>handleClick(e)} >
                   <figure className={`card__cato-0`}>
                      <img src={limpieza} alt="Trulli"  className='imageSt'/>
                      <h1 className='card__heading' > <span className='card__heading-span'> Servicio de Limpieza
                        </span></h1>
                    </figure>
           </div>
           <div className='card'  onClick={e =>handleClick(e)} >
                   <figure className={`card__cato-0`}>
                      <img src={transportes} alt="Trulli"  className='imageSt'/>
                      <h1 className='card__heading' > <span className='card__heading-span'> Transportes/Correo
                        </span></h1>
                    </figure>
           </div>
           <div className='card'  onClick={e =>handleClick(e)} >
                   <figure className={`card__cato-0`}>
                      <img src={tutores} alt="Trulli"  className='imageSt'/>
                      <h1 className='card__heading' > <span className='card__heading-span'> Tutores/Cursos
                        </span></h1>
                    </figure>
           </div>
           <div className='card'  onClick={e =>handleClick(e)} >
                   <figure className={`card__cato-0`}>
                      <img src={salud} alt="Trulli"  className='imageSt'/>
                      <h1 className='card__heading' > <span className='card__heading-span'> Jardineria/Piscinas 
                        </span></h1>
                    </figure>
           </div>
           <div className='card'  onClick={e =>handleClick(e)} >
                   <figure className={`card__cato-0`}>
                      <img src={generales} alt="Trulli"  className='imageSt'/>
                      <h1 className='card__heading' > <span className='card__heading-span'> Trabajos Generals
                        </span></h1>
                    </figure>
           </div>
           <div className='card'  onClick={e =>handleClick(e)} >
                   <figure className={`card__cato-0`}>
                      <img src={cuidado} alt="Trulli"  className='imageSt'/>
                      <h1 className='card__heading' > <span className='card__heading-span'> Jardineria/Piscinas 
                        </span></h1>
                    </figure>
           </div>
           <div className='card'  onClick={e =>handleClick(e)} >
                   <figure className={`card__cato-0`}>
                      <img src={electronica} alt="Trulli"  className='imageSt'/>
                      <h1 className='card__heading' > <span className='card__heading-span'> Electronica/Informatica
                        </span></h1>
                    </figure>
           </div>
       
   {/*  </Fragment> } */}
      
  </div> 

   <section className='searchItemMargin'  id="profilesId">
   { loading ? ' ': <Fragment>
   
   <h2 className="lead" >
          <i className="fab fa-connectdevelop"></i>
          Workers available in your area</h2>
      <div  className="profilesContainer" >
       {!loading&&profiles.length > 0 ? (
         profiles.map(profile => (<Fragment>
          
          
               <ProfileItem key={profile._id} profile={profile}/>
         </Fragment>
         
         ))
       ) : <h4> {/* No proiles found...  */}</h4> } </div></Fragment>}
   </section>
  
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
