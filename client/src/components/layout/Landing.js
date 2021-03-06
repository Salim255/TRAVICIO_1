import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {saveLocation} from '../../Actions/locationAction'
import PropTypes from 'prop-types';
import * as AiIcons  from 'react-icons/ai'

const Landing = ({isAuthenticated, saveLocation}) => {

    /* if(isAuthenticated){
      return <Redirect to='/dashboard'/>
    }  */

    const [location, setLocation] = useState("");
    const onChange =(e) =>{
    
      setLocation(e.target.value);
      console.log(location);
    }

    return (
    <section className="landing">
        <div className="dark-overlay">
          <div className="landing__inner">
            <div className='travTEXT'>
                <h1 className="x-large worker travicio">Travicio</h1>
                <p className='textTrav' >Trabajos  y  Servicios</p> 
            </div>
            <div className="lead textSearch">
            
              <p>
              Find workers near to you <br/>
              Or advertise your services, by creating your account. 
              </p>
            </div>
            
          <div className="home">
            <div className="search-section">
            
                <div className="search-section__searchBox">
                  {!location ? (<Link to='#!'  >
                    < AiIcons.AiOutlineSearch className="search-section__icon"/>
                </Link>): (<Link to='/search'  >
                    < AiIcons.AiOutlineSearch className="search-section__icon" onClick={()=> saveLocation(location)}/>
                </Link>)}
                
                <input type="text" name="search" id="search" placeholder="The City you are searching workers in"  className="search-section__input" onChange={(e) => onChange(e)}  required/>  
                {/* <input type="text" name="search" id="search" placeholder="The work type you are looking for"  className="search-section__input"/>  */}
               </div>
              {/*  <button type="submit" className="search-section__btn">
                    search
                </button> */}
            </div>
      
        </div>
      {/*   {!isAuthenticated && <Fragment> <div className="landing__buttons">
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
              <Link to="/login" className="btn btn-light">Login</Link>
            </div></Fragment>} */}
           
        </div>
      </div>
    </section>
    )
};

Landing.prototype = {
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
})

export default connect(mapStateToProps, {saveLocation})(Landing);
