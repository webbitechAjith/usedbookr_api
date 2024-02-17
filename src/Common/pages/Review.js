import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Rating from 'react-rating';


import '../assets/css/address.css'


import profile from '../assets/image/review-profile.png'
import semi from '../assets/image/semicolon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Review = () => {



    const data = [
        { id: 1, semi: semi, image: profile },
        { id: 2, semi: semi, image: profile },
        { id: 3, semi: semi, image: profile },
        // Add more items as needed
    ];

    const options = {
        dots:false,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        nav: true,
        navText: [
            '<span aria-label="Next"></span>',
            '<span aria-label="Next"></span>'
        ],
        responsive: {
            0: {
                items: 1
            },
            700: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    };

    return (
        <>
            <OwlCarousel className="owl-theme" {...options}>
                {data.map((item) => (
                    <div class="card border-0 p-lg-3 p-md-3 p-sm-2 p-1 review-card">
                        <img src={item.semi} className='semi-colon' />
                        <div class="card-body border-0 p-0">
                            <p class="card-text">Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget</p>
                            <div className='row m-0'>
                                <div className='col-3 p-0'>
                                    <span className='profile-section'><img src={item.image} className='h-100' /></span>
                                </div>
                                <div className='col-4 p-0'>
                                    <h5>Robert Fox</h5>
                                    <h6>Customer</h6>
                                </div>
                                <div className='col-5 p-0 text-end align-self-center'>
                                    <Rating
                                        initialRating={5}
                                        emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                        fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                        readonly={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </OwlCarousel>
        </>
    );
};

export default Review;