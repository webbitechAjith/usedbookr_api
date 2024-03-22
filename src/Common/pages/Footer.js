import React from 'react'
import '../assets/css/footer.css'

// image path
import logo from '../assets/image/white-footer.png'
import icon1 from '../assets/image/facebook_1.png'
import icon2 from '../assets/image/instagram 1.png'
import icon3 from '../assets/image/twitter 1.png'
import icon4 from '../assets/image/pinterest 1.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { NavLink, useLocation } from 'react-router-dom'


function Footer() {
    const location = useLocation();

    const { pathname, search, hash } = location;


    return (
        <>
            <footer className='footer-section'>
                <div className='container-60 pt-5 pb-2'>
                    <div className='text-center'>
                        <img src={logo} className='footer-logo' width={200} />
                        <h6>Contact Us</h6>
                        <hr style={{ width: '20px', margin: '0 auto', border: '5px soild #FFF', color: '#FFF' }} />
                        <p>2nd Floor, 105/3, Athipalayam Road, chinnavedampatti, Coimbatore,Tamil Nadu, 641049</p>
                        <div className='row m-0 py-3 icon-content align-items-stretch justify-content-center'>
                            {/* <div className='col-lg-4 col-md-6 col-12 p-0'>
                                <img src={global} className='pe-2' />
                                <span>govergardencentre@gmail.com</span>
                            </div> */}
                            <div className='col-lg-6 col-md-6 col-12 p-0 mt-lg-0 mt-md-0 mt-2 text-lg-end text-md-end'>
                                <FontAwesomeIcon icon={faEnvelope} className='me-2 text-white' />
                                <span>contact@usedbookr.com</span>
                            </div>
                            <div className='col-lg-6 col-md-6 col-12 mt-lg-0 mt-lg-0 mt-md-0 mt-2 p-0 px-4 text-lg-start text-md-start'>
                                <FontAwesomeIcon icon={faPhone} className='me-2 text-white' />
                                <span>+91 6300201360</span>
                            </div>
                        </div>
                        <div className='icon-section'>
                            <img src={icon1} />
                            <img src={icon2} />
                            <img src={icon3} />
                            <img src={icon4} />
                        </div>
                    </div>
                </div>
                {/* <hr /> */}
                {/* <div className='container-70  '>
                    <ul className='text-center'>
                        <li>My Account</li>
                        <li>Shop</li>
                        <li>Track Order</li>
                        <li>Faqs</li>
                        <li>About</li>
                        <li>Terms & Condition</li>
                        <li>Privacy Policy</li>
                    </ul>
                    <h4 className='text-center'>Usedbookr.com © 2023. All Rights Reserved</h4>
                </div> */}
                <div className='footer-bottom'>
                    <div className='container-95'>
                        <div className='row m-0 align-items-center'>
                            <div className='col-lg-3 col-12 text-center'>
                                <p>Copyright ©2024 Usedbookr.<br />All Rights Reserved</p>
                            </div>
                            <div className='col-lg-6 col-12 my-lg-0 my-2 footer-list '>
                                <ul className='text-center mb-0 p-0'>
                                    {/* <li>Track Order</li> */}
                                    <li>
                                        <NavLink exact to={{ pathname: '/faq' }} className={`${pathname === '/faq' ? 'active' : 'custom-active'} text-white text-decoration-none`}>
                                            FAQ'S
                                        </NavLink>
                                    </li>
                                    <li className='nav-items align-items-center'>
                                        <NavLink exact to={{ pathname: '/about' }} className={`${pathname === '/about' ? 'active' : 'custom-active'} text-white text-decoration-none`}>
                                            About
                                        </NavLink>

                                    </li>
                                    <li>
                                        <NavLink exact to={{ pathname: '/termsconditions' }} className={`${pathname === '/termsconditions' ? 'active' : 'custom-active'} text-white text-decoration-none`}>
                                            Terms & Conditions
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink exact to={{ pathname: '/privacypolicy' }} className={`${pathname === '/privacypolicy' ? 'active' : 'custom-active'} text-white text-decoration-none`}>
                                            Privacy Policy
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div className='col-lg-3 col-12 text-center'>
                                <p>Designed by webbitech.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer