import React from 'react'

const Header = () => {
    return (
        <>
           <div className="header">
                <ul className="header__list">
                    <li className="header__item"><a href="#" className="header__link">travicio</a></li >
                
                    <li className="header__item"><a href="#" className="header__link">about us</a></li>
                    <li className="header__item"><a href="#" className="header__link">contact</a></li>
                </ul>
                <div className="header__auth">
                    <div className="header__auth-signup"><a href="#" className="header__auth-link">sign-up</a></div>
                    <div className="header__auth-login"><a href="#" className="header__auth-link">log-in</a></div>
                </div>
           </div>
          
           

        </>
     
    )
}

export default Header
