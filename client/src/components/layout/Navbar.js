import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes  from 'prop-types';
import { logout } from '../../Actions/authAction';
import {FaHandshake} from 'react-icons/fa';

const Navbar = ({ auth: { isAuthenticated , loading }, logout}) => {

  
    const authLinks = ( 
        <ul className="navbar__list">
             <li className="navbar__list-item hide-sm"><Link to="/profiles">  
             Workers
               </Link></li>
             <li className="navbar__list-item">
                 <Link to="/posts"><i className="fas fa-user hide-sm"></i>{' '}Post
                 </Link>
                </li>
             <li className="navbar__list-item"><Link to="/dashboard"><i className="fas fa-user hide-sm"></i>{' '}Dashboard</Link></li>
            
            <li className="navbar__list-item">
                <Link onClick={logout} to="/login">
                    <i className="fas fa-sign-out-alt hide-sm"></i>{' '}
                   <span> Logout</span>
                </Link>
            </li>
            
        </ul>
        );
    
        const guestLinks = (  
        <ul className="navbar__list">
             <li className="navbar__list-item hide-sm"><Link to="/profiles">  
             Workers
               </Link></li>
            
            <li className="navbar__list-item navbar__list-item-register"><Link to="/register">Register</Link></li>
            <li className="navbar__list-item"><Link to="/login">Login</Link></li>
        </ul>
        );

    return (
        <nav className="navbar bg-dark">
            <div className="navbar__icon">
            <Link to="/">  < FaHandshake className="navbar-icon"/> </Link>
            <h1 className="navabr__name hide-sm">
            
               {/* <Link to="/"> Travicio</Link> */}
            </h1>
           </div>
          { !loading && (<Fragment>
              { isAuthenticated ? authLinks : guestLinks}
          </Fragment>)}
      </nav>
    )
};

Navbar.prototype = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    auth: state.authReducer,
})
export default connect(mapStateToProps,{ logout })(Navbar);

