import React from 'react'
import Header from '../Common/pages/Header'
import Footer from '../Common/pages/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'

// css file path 
import '../Common/assets/css/address.css'

function Contact() {
    return (
        <div>
            <Header />
            <section>
                <div class="contact py-5">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-9 col-md-12">
                                <div class="row gy-5">
                                    <div class="col-lg-6 col-md-6">
                                        <div class="contact-left">
                                            <h1 class="contact-title">Contact Information</h1>
                                            <p class="contact-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis nunc a molestie dictum. Mauris venenatis, felis scelerisque aliquet lacinia, nulla nisi venenatis odio.</p>
                                            <div class="contact-detail">
                                                <div class="icon">
                                                    <FontAwesomeIcon icon={faPhone} className='my-3' />
                                                </div>
                                                <div class="text">
                                                    <h6 class="reservation-text">Call Us</h6>
                                                    <p class="reservation-title"><a href="tel:(199) 661-1451">(199) 661-1451</a></p>
                                                </div>
                                            </div>
                                            <div class="contact-detail">
                                                <div class="icon">
                                                    <FontAwesomeIcon icon={faEnvelope} className='my-3' />
                                                </div>
                                                <div class="text">
                                                    <h6 class="reservation-text">Write to us</h6>
                                                    <p class="reservation-title"><a href="mailto:sofía.suárez@skansxka.net">sofía.suárez@skansxka.net</a></p>
                                                </div>
                                            </div>
                                            
                                            <div class="contact-detail">
                                                <div class="icon">
                                                    <FontAwesomeIcon icon={faLocationDot} className='my-3' />
                                                </div>
                                                <div class="text">
                                                    <h6 class="reservation-text">Address</h6>
                                                    <p class="reservation-title"><a href="#">1700 W Blancke St, kiyev port south USA, American</a></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 pb-lg-0 pd-md-0 pb-4">
                                        <div class="contact-right">
                                            <h1 class="get-title">Get in Touch with Us</h1>
                                            <form class="row gx-lg-3 gy-3">
                                                <div class="col-md-12">
                                                    <input type="text" class="form-control" id="inputEmail4" placeholder="John" />
                                                </div>
                                                <div class="col-md-6">
                                                    <input type="email" class="form-control" placeholder="Your Mail" />
                                                </div>
                                                <div class="col-md-6">
                                                    <input type="phone" class="form-control" id="inputAddress2" placeholder="Your Number" />
                                                </div>
                                                <div class="col-md-12">
                                                    <input type="text" class="form-control" id="inputEmail4" placeholder="Subject" />
                                                </div>
                                                <div class="col-md-12">
                                                    <textarea class="form-control" rows="3" placeholder="Message"></textarea>
                                                </div>
                                                <div class="col-12">
                                                    <button type="submit" class="btn common-btn">Send Message</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="vertical-space-50"></div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.4429347301343!2d77.5825651141349!3d12.943484518998364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15955784463b%3A0x17897b70b8eff798!2sHOTEL%20SANMAN%20GARDENIA!5e0!3m2!1sen!2sin!4v1641384286139!5m2!1sen!2sin" width="100%" height="450" style={{ border: '0px', pointerEvents: 'none' }} allowfullscreen="" loading="lazy"></iframe>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Contact