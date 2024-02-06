import React, { useState } from 'react';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Rating from 'react-rating';


import '../assets/css/main.css'

import { setisAdded, setisIncrement, setisDecrement, setisLiked, setallBookDetails, setLikedProducts, setlikeProduct, setlikescount, setShopProducts, setshopcount, setsingleProductView } from '../../Redux/CreateSlice';


// image path 
import book1 from '../assets/image/sales1.png'
import book2 from '../assets/image/sales2.png'
import likes from '../assets/image/heart-like.png'
import unlike from '../assets/image/heart-unlike.png'
import add from '../assets/image/addcard.png'
import remove from '../assets/image/removecard.png'

import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const Allbooks = () => {
    const { allbookDetails, isLiked, isAdded } = useSelector((state) => state.usedbookr_product)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const owlOption = {
        dots: false,
        // autoplay: true,
        autoplayTimeout: 3000,
        loop: true,
        margin: 10,
        // autoWidth: true,
        responsive: {
            0: {
                items: 1,
                autoWidth: true,
            },
            600: {
                items: 2,
                autoWidth: true,
            },
            800: {
                items: 2,
            },
            1000: {
                items: 5,
            },
        },
    };
    const author = () => {

    }
    const product_like = () => {
    }
    const product_add = () => {

    }
    const product_remove = () => {

    }
    const author_name = () => {
        navigate('/authors')
    }
    const click_view = (id) =>{
        dispatch(setsingleProductView([allbookDetails[id]]))
        navigate('Description')
    }
    return (
        <div className='py-lg-5 py-4 bestseller'>
            <OwlCarousel className="owl-theme" {...owlOption}>
                {allbookDetails && allbookDetails.map((book, index) => (
                    <div className='seller-book position-relative'>
                        <div className='best-seller'>
                            <img src={book.image} height='300px' className='w-100 p-lg-4 p-md-2 p-0' />
                            <span className='selles-offer'>offer 60%</span>
                            <span className='like-position float-end m-2'>
                                <span className={` ${isLiked ? 'likes' : 'unlikes'} `}><img src={isLiked ? likes : unlike} alt="Like Button" onClick={() => product_like()} /></span>
                            </span>
                            <div className='book-details p-3'>
                                <h1 className='w-100' title={book.title}>{book.title.slice(0, 10)}</h1>
                                {book.authors[0] === undefined ? <><h5 className='text-primary'>No Author</h5></> : <><h5 className='text-primary' title={book.authors[0]} onClick={() => author_name()}>{book.authors[0].slice(0, 10)}</h5></>}
                                <div className='d-flex '>
                                    <div className='rate-details'>
                                        <span className='new-rate'>₹ 299</span> <span className='ps-2 old-rate'>₹ 440</span><br />
                                        <Rating
                                            initialRating={5}
                                            emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                            fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                            readonly={true}
                                        />
                                    </div>
                                    <div className='ms-auto'>
                                        {isAdded ? (<><img src={add} alt="Like Button" onClick={() => product_add()} /></>) : (<> <img src={remove} alt="Remove Button" onClick={() => product_remove()} /> </>)}

                                    </div>
                                </div>
                                <div className='text-center'>
                                    <button className='viewall mt-5 border-0 rounded-2' onClick={(id)=>click_view(index)}>view</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </OwlCarousel>
        </div>

    );
};

export default Allbooks;
