import React, { useEffect, useRef } from 'react'

import Rating from 'react-rating';

// page include 
import Header from '../Common/pages/Header'
import Footer from '../Common/pages/Footer'

// css file include 
import '../Common/assets/css/main.css' // some content css apply
import '../Common/assets/css/address.css' // mainpage css



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons';

// img path 
import book1 from '../Common/assets/image/book_1.png'
import book4 from '../Common/assets/image/book_4.png'
import book5 from '../Common/assets/image/book_5.png'
import teammate1 from '../Common/assets/image/teammate1.png'
import teammate2 from '../Common/assets/image/teammate2.png'
import icon1 from '../Common/assets/image/facebook_1.png'
import icon2 from '../Common/assets/image/instagram 1.png'
import icon3 from '../Common/assets/image/twitter 1.png'
import delvery from '../Common/assets/image/delivery.png'
import semi from '../Common/assets/image/semicolon.png'
import profile from '../Common/assets/image/review-profile.png'
import Review from '../Common/pages/Review';




function About() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div>
            <Header />
            <section className='about-us'>
                <div className='container-90'>
                    <div className='row m-0 py-5 flex-wrap-reverse'>
                        <div className='col-lg-6 col-12 head-content'>
                            <h1>100% Trusted Usedbook Store</h1>
                            <p>Morbi porttitor ligula in nunc varius sagittis. Proin dui nisi, laoreet ut tempor ac, cursus vitae eros. Cras quis ultricies elit. Proin ac lectus arcu. Maecenas aliquet vel tellus at accumsan. Donec a eros non massa vulputate ornare. Vivamus ornare commodo ante, at commodo felis congue vitae.</p>
                        </div>
                        <div className='col-lg-6 col-12'>
                            <img src={book1} className='w-100' />
                        </div>
                    </div>
                </div>
                {/* Best sellers in indoor plants end  */}
                <div className='plant-store'>
                    <div className='row m-0 p-lg-5 p-md-5 p-1 flex-wrap-reverse overflow-hidden'>
                        <div className='col-lg-6 col-12 slide-left visible pt-lg-0 pt-4'>
                            <img src={book4} className='image-1 pe-2' />
                            <img src={book5} className='image-2' />
                        </div>
                        <div className='col-lg-6 col-12 ps-lg-5 ps-md-5 ps-sm-3 ps-0 mt-lg-0 mt-5 slide-right visible'>
                            <h3 className='w-lg-50 w-md-50 w-100 mb-4'>100% Trusted Book Store</h3>
                            <div className='row m-0'>
                                <div className='col-1 p-0'>
                                    <div className='circle'><FontAwesomeIcon icon={faCheck} style={{ color: '#574AC9', margin: '7px 0px' }} /></div>
                                </div>
                                <div className='col-11 ps-2'>
                                    <h4>Ut quis tempus erat. Phasellus euismod bibendum.</h4>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.</p>
                                </div>
                                <div className='col-1 p-0 '>
                                    <div className='circle'><FontAwesomeIcon icon={faCheck} style={{ color: '#574AC9', margin: '7px 0px' }} /></div>
                                </div>
                                <div className='col-11 ps-2'>
                                    <h4>Ut quis tempus erat. Phasellus euismod bibendum.</h4>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.</p>
                                    <div className='text-lg-start text-md-start text-center'>
                                        <button>Shop Now <FontAwesomeIcon icon={faArrowRight} style={{ color: '#241D60' }} className='ps-2' /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* teammate profile start  */}
                <div className='team-member text-center py-5 overflow-hidden'>
                    <h5>Team Member</h5>
                    <h2>Professional Team</h2>
                    <p>Ut suscipit egestas suscipit. Sed posuere pellentesque nunc, ultrices consectetur velit dapibus eu. Mauris sollicitudin dignissim diam, ac mattis eros accumsan rhoncus. Curabitur auctor bibendum nunc eget elementum.</p>
                    <div className=''>
                        <div className='row m-0 team-part justify-content-center gy-5 gx-5 '>
                            <div className='col-lg-4 col-md-5 col-sm-6 slide-left visible'>
                                <div className='profile-card'>
                                    <div className='card-image'>
                                        <img src={teammate2} className='image1' />
                                    </div>
                                    <div className='profile-image'>
                                        <div className='teammate-name'>
                                            <h1>Rohit Gupta</h1>
                                            <p>Founder</p>
                                        </div>
                                        <div className='social-media'>
                                            <ul className='nav justify-content-evenly'>
                                                <li><img src={icon1} /></li>
                                                <li><img src={icon2} /></li>
                                                <li><img src={icon3} /></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-5 col-sm-6 slide-right visible'>
                                <div className='profile-card'>
                                    <div className='card-image'>
                                        <img src={teammate1} className='image1' />
                                    </div>
                                    <div className='teammate-name'>
                                        <h1>Jay Yadav</h1>
                                        <p>CEO</p>
                                    </div>
                                    <div className='social-media'>
                                        <ul className='nav justify-content-evenly'>
                                            <li><img src={icon1} /></li>
                                            <li><img src={icon2} /></li>
                                            <li><img src={icon3} /></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* delivery start  */}
                <div className='delivery-section mt-5'>
                    <div className='container-80'>
                        <div className='row m-0 flex-wrap-reverse py-5 overflow-hidden'>
                            <div className='col-lg-6 col-12 py-5 slide-left visible'>
                                <h1>We Delivered, You Enjoy Your Order.</h1>
                                <p>Ut suscipit egestas suscipit. Sed posuere pellentesque nunc, ultrices consectetur velit dapibus eu. Mauris sollicitudin dignissim diam, ac mattis eros accumsan rhoncus. Curabitur auctor bibendum nunc eget elementum.</p>
                                <ul className='list-unstyled'>
                                    <li className='nav-items'>
                                        <span><FontAwesomeIcon icon={faCheck} style={{ color: '#2C742F' }} className='' /></span>Sed in metus pellentesque.
                                    </li>
                                    <li className='nav-items'>
                                        <span><FontAwesomeIcon icon={faCheck} style={{ color: '#2C742F' }} className='' /></span>Fusce et ex commodo, aliquam nulla efficitur, tempus lorem.
                                    </li>
                                    <li className='nav-items'>
                                        <span><FontAwesomeIcon icon={faCheck} style={{ color: '#2C742F' }} className='' /></span>Maecenas ut nunc fringilla erat varius.
                                    </li>
                                </ul>
                                <div className='text-lg-start text-center mt-5'>
                                    <button>Shop Now <FontAwesomeIcon icon={faArrowRight} style={{ color: '#241D60' }} className='ps-2' /></button>
                                </div>
                            </div>
                            <div className='col-lg-6 col-12 text-center slide-right visible'>
                                <img src={delvery} className='w-100 delivery-image' />
                            </div>
                        </div>
                    </div>
                </div>
                {/* review section start  */}
                <div className='client-test'>
                    <div className='container-80'>
                        <h1>Client Testimonials</h1>
                        <div className='pt-5'>
                            <Review />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default About