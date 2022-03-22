import React from 'react'

const Footer = () => {
    return (
       <div className='footerSection'>
             <div className="footer">
            <ul className="footer__list">
               <li className="footer__item">
                    <a href="#" className="footer__link">FAQ</a>
                </li>
                <li className="footer__item">
                    <a href="/" className="footer__link">home</a>
                </li>
                <li className="footer__item">
                    <a href="#" className="footer__link">About Travicio</a>
                </li>
                <li className="footer__item">
                    <a href="#" className="footer__link">Contact/Support</a>
                </li>
                <li className="footer__item">
                    <a href="#" className="footer__link">Helpful Documents</a>
                </li>
                <li className="footer__item">
                    <a href="#" className="footer__link">Terms of Use And Privacy</a>
                </li>
             
               
            </ul>
         
            
            <div className="footer__social">
                <ul className="footer__social-list">
                    <li className="footer__social-item"><a className="footer__social-link" href="#">facbebook</a></li>
                    <li className="footer__social-item"><a className="footer__social-link"href="#">instagram</a></li>
                    <li className="footer__social-item"><a className="footer__social-link"href="#">twitter</a></li>
                </ul>
                
            </div>
           
        </div>
        <div className="footer__mid">
                {/* <div className="footer__logo">
                   <h2>travicio</h2>
                </div> */}
                <div className="footer__copyright">
                      <h1>Travicio &copy;2021</h1>
                </div>
            </div>
       </div>
    )
}

export default Footer
