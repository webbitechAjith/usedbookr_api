import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


import '../assets/css/main.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { authUser } from './apiBaseurl';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthorsName, setClickauthorName } from '../../Redux/CreateSlice';


const Authors = () => {
    const { authorsDetails, authorsName } = useSelector((state) => state.usedbookr_product)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const author = (authName) => {
        authUser();
        if (authName) {
            dispatch(setAuthorsName(authName))
            navigate('authors')
        } else {
            navigate('authors')
        }
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
                        {authorsDetails && authorsDetails.map((data) => {
                            return (
                                <>
                                    <div className='author1 text-center' onClick={() => author(data.author)}>
                                        <h2>{data.author}</h2>
                                    </div>
                                </>
                            )
                        })}
                    </OwlCarousel>
                    <div className='author5'>
                        <button onClick={author}>View All</button>
                    </div>
                </div>
            </div>
            <div className='d-lg-none d-block'>
                <OwlCarousel className="owl-theme card-design author-card" {...owlOptions}>
                    {authorsDetails && authorsDetails.map((data) => {
                        return (
                            <>
                                <div className='author1 text-center' onClick={() => author(data.author)}>
                                    <h2>{data.author}</h2>
                                </div>
                            </>
                        )
                    })}
                </OwlCarousel>
                <div className='author5 d-block text-center mt-4'>
                    <button onClick={author}>View All</button>
                </div>
            </div>
        </>
    );
};

export default Authors;
