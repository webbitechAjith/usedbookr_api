import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


import '../assets/css/main.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


const Authors = () => {

    const navigate = useNavigate();

    const author = () => {
        navigate('authors')
    }

    const owlOptions = {
        items: 4,
        dots: false,
        autoplay: true,
        autoplayTimeout: 4000,
        loop: true,
        margin: 10,
        // autoWidth: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            800: {
                items: 3,
            },
            1000: {
                items: 4,
            },
        },
    };
    return (
        <>
            <div className='d-lg-block d-none'>
                <div className='d-flex '>
                    <OwlCarousel className="owl-theme card-design author-card" {...owlOptions}>
                        <div className='author1 text-center' onClick={author}>
                            <h2>Leo Tolstoy</h2>
                        </div>
                        <div className='author2 text-center' onClick={author}>
                            <h2>J. K. Rowling</h2>
                        </div>
                        <div className='author3 text-center' onClick={author}>
                            <h2>George Orwell</h2>
                        </div>
                        <div className='author4 text-center' onClick={author}>
                            <h2>Lewis Carroll</h2>
                        </div>
                    </OwlCarousel>
                    <div className='author5'>
                        <button onClick={author}>View All</button>
                    </div>
                </div>
            </div>
            <div className='d-lg-none d-block'>
                <OwlCarousel className="owl-theme card-design author-card" {...owlOptions}>
                    <div className='author1 text-center' onClick={author}>
                        <h2>Leo Tolstoy</h2>
                    </div>
                    <div className='author2 text-center' onClick={author}>
                        <h2>J. K. Rowling</h2>
                    </div>
                    <div className='author3 text-center' onClick={author}>
                        <h2>George Orwell</h2>
                    </div>
                    <div className='author4 text-center' onClick={author}>
                        <h2>Lewis Carroll</h2>
                    </div>
                </OwlCarousel>
                <div className='author5 d-block text-center mt-4'>
                    <button onClick={author}>View All</button>
                </div>
            </div>

        </>
        // <div className='ps-lg-5 ps-2 py-5 '>


        // </div>

    );
};

export default Authors;
