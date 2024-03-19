import React, { useEffect } from 'react'
import Header from '../Common/pages/Header'
import Footer from '../Common/pages/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLocation, faLocationDot, faPhone, faPhoneVolume } from '@fortawesome/free-solid-svg-icons'

// css file path 
import '../Common/assets/css/address.css'




function Contact() {

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])

    return (
        <div>
            <Header />
            <section>
                <div class="contact pt-5">
                    <div class="container-90">
                        <div className='contact-details text-center'>
                            <h1>Contact Information</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis nunc a molestie dictum. Mauris venenatis, felis scelerisque aliquet lacinia, nulla nisi venenatis odio.</p>
                        </div>
                        <div className='contact-card'>
                            <div class="row justify-content-center py-5 contact-address">
                                <div className='col-lg-4 col-md-6 col-sm-6 col-12'>
                                    <div className='contact-number text-center'>
                                        <FontAwesomeIcon icon={faPhoneVolume} style={{ color: '#FFF', fontSize: '30px' }} />
                                        <p>+91 6300201360 </p>
                                    </div>
                                </div>
                                <div className='col-lg-4 col-md-6 col-sm-6 col-12 py-lg-0 py-md-2 py-sm-0 py-2 '>
                                    <div className='contact-mail text-center'>
                                        <FontAwesomeIcon icon={faEnvelope} style={{ color: '#FFF', fontSize: '30px' }} />
                                        <p>info@usedbookr.com</p>
                                    </div>
                                </div>
                                <div className='col-lg-4 col-md-6 col-sm-6 col-12 pt-lg-0 pt-md-0 pt-sm-2 pt-0'>
                                    <div className='contact-location text-center px-2'>
                                        <FontAwesomeIcon icon={faLocationDot} style={{ color: '#FFF', fontSize: '30px' }}/>
                                        <p className=''>2nd Floor, 105/3, Athipalayam Road, chinnavedampatti,Coimbatore, Coimbatore, Tamil Nadu, 641049</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="vertical-space-50"></div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d31329.237919798416!2d76.95277234999999!3d11.027014600000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2sin!4v1710849649457!5m2!1sen!2sin" width="100%" height="450" style={{ border: '0px', pointerEvents: 'none' }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Contact