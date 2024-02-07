import React, { useEffect, useState } from 'react';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Rating from 'react-rating';


import '../assets/css/main.css'

import { setisAdded, setisIncrement, setisDecrement, setisLiked, setallBookDetails, setLikedProducts, setlikeProduct, setlikescount, setShopProducts, setshopcount, setsingleProductView } from '../../Redux/CreateSlice';

// function call 


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
    const { allbookDetails, isLiked, isAdded, likescount, likedProducts } = useSelector((state) => state.usedbookr_product)
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
    const product_add = () => {

    }
    // like product click fn 
    // const totallikes = likedProducts.map((data, index) => data[index]);

    // const handleLikeClick = (product) => {
    //     const likeproduct = product;
    //     console.log('product',product)
    //     //ajithkumar
    //     // Check if the product ID is in the likedProducts array
    //     if (totallikes.indexOf(likeproduct)) {
    //         console.log("kumar",likedProducts.indexOf(likeproduct))
    //         // If it's not liked, add it to the likedProducts array
    //         dispatch(setLikedProducts([...likedProducts, allbookDetails[likeproduct]]));
    //         dispatch(setlikescount(likescount + 1))

    //     } else {

    //         console.log("ajith",totallikes.indexOf(likeproduct));
    //         // If it's already liked, remove it from the likedProducts array
    //         dispatch(setLikedProducts(likedProducts.filter((likedProduct, index) => index !== likeproduct)));
    //         dispatch(setlikescount(likescount - 1))
    //     }
    // };
    console.log('totallikes', likedProducts)
    // const product_like = (id) => {
    //     dispatch(setisLiked(true))
    //     dispatch(setlikescount(likescount + 1))
    //     dispatch(setLikedProducts([...likedProducts, allbookDetails[id]]));

    // }
    // like product click fn 
    const totallikes = likedProducts.map((data,index) => data);

    const handleLikeClick = (product,index) => {
        const isLikeds = product;
        // Check if the product ID is in the likedProducts array
        if (totallikes.includes(isLikeds)) {
            console.log('ajith');
            // If it's already liked, remove it from the likedProducts array
            dispatch(setLikedProducts(likedProducts.filter((likedProduct) => likedProduct.id !== isLikeds)));
            dispatch(setlikescount(likescount - 1))
        } else {
            console.log('kumar',isLikeds);
            dispatch(setisLiked(true))
            // If it's not liked, add it to the likedProducts array
            dispatch(setLikedProducts([...likedProducts, isLikeds]));
            dispatch(setlikescount(likescount + 1))

        }
    };
    // console.log('sai',likedProducts);
    const product_remove = (id) => {
    }

    const author_name = () => {
        navigate('/authors')
    }
    const click_view = (id) => {
        dispatch(setsingleProductView([allbookDetails[id]]))
        navigate('Description')
    }
    useEffect(() => {

        dispatch(setallBookDetails(allbookDetails))
        dispatch(setsingleProductView(allbookDetails))
    }, [])
    // console.log(totallikes)
    // console.log(likedProducts)
    return (
        <div className='py-lg-5 py-4 bestseller'>
            <OwlCarousel className="owl-theme" {...owlOption}>
                {allbookDetails && allbookDetails.map((book, index) => {
                    return (
                        <>
                            <div className='seller-book position-relative'>
                                <div className='best-seller' key={index}>
                                    <img src={book.image} height='300px' className='w-100 p-lg-4 p-md-2 p-0' />
                                    <span className='selles-offer'>offer 60%</span>
                                    {/* <span className='like-position float-end m-2'>
                                        <span className={` ${isLiked ? 'likes' : 'unlikes'} `} onClick={isLiked ? () => product_remove(index) : () => product_like(index)}><img src={isLiked ? likes : unlike} alt="Like Button" /></span>
                                    </span> */}
                                    <span
                                        className='like-position float-end m-2'
                                        onClick={() => handleLikeClick(book,index)}
                                    >
                                        <img
                                            src={totallikes.includes(index) ? likes : unlike}
                                            alt="Like Button"
                                        />
                                    </span>
                                    <div className='book-details p-3'>
                                        <h1 className='w-100' title={book.title}>{book.title.slice(0, 10)}</h1>
                                        {book.authors[0] === undefined ? <><h5 className='text-primary'>No Author</h5></> : <><h5 className='text-primary' title={book.authors[0]} onClick={() => author_name()}>{book.authors[0].slice(0, 10)}</h5></>}
                                        <div className='d-flex '>
                                            <div className='rate-details'>
                                                <span className='new-rate'>₹{book.msrp}</span> <span className='ps-2 old-rate'>₹ 440</span><br />
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
                                            <button className='viewall mt-5 border-0 rounded-2' onClick={(id) => click_view(index)}>view</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )

                })}
            </OwlCarousel>
        </div>

    );
};

export default Allbooks;
