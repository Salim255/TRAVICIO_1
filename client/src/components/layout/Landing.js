import React, { Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as AiIcons  from 'react-icons/ai'

const Landing = ({isAuthenticated}) => {

    /* if(isAuthenticated){
      return <Redirect to='/dashboard'/>
    }  */
    return (
    <section className="landing">
        <div className="dark-overlay">
          <div className="landing__inner">
            <h1 className="x-large worker">Work Connector</h1>
            <p className="lead">
              Searching for workers in your area right now. No account needed.<br/>
              Want to advertise your skills or post a job offer? Then easy, just register above
            </p>
            
          <div className="home">
            <div className="search-section">
            
                <div className="search-section__searchBox">
                < AiIcons.AiOutlineSearch className="search-section__icon" />
                <input type="text" name="search" id="search" placeholder="The City you searhing worker in"  className="search-section__input"/>  
                <input type="text" name="search" id="search" placeholder="The work type you are looking for"  className="search-section__input"/> 
               </div>
              {/*  <button type="submit" className="search-section__btn">
                    search
                </button> */}
            </div>
      
        </div>
        {!isAuthenticated && <Fragment> <div className="landing__buttons">
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
              <Link to="/login" className="btn btn-light">Login</Link>
            </div></Fragment>}
           
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

export default connect(mapStateToProps)(Landing);
