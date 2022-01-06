import React from "react";
import {FaHandshake} from 'react-icons/fa';
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar bg-dark">
           <div className="navbar__icon">
           < FaHandshake className="navbar-icon"/>
            <h1 className="navabr__name">
          
               <Link to="/"> Travicio</Link>
            </h1>
           </div>
            <ul className="navbar__list">
                <li className="navbar__list-item"><a href="profiles.html">Workers</a></li>
                <li className="navbar__list-item navbar__list-item-register"><Link to="/register">Register</Link></li>
                <li className="navbar__list-item"><Link to="/login">Login</Link></li>
            </ul>
      </nav>
    )
}

export default Navbar
