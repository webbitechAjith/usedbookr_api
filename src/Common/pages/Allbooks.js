import React, { useEffect, useState } from 'react';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Rating from 'react-rating';


import '../assets/css/main.css'


import { setisAdded, setisIncrement, setisDecrement, setisLiked, setallBookDetails, setLikedProducts, setlikeProduct, setlikescount, setShopProducts, setshopcount, setsingleProductView, settotallikes, setCategoryBook, setUserIdShop, setUserIdLike } from '../../Redux/CreateSlice';

// function call 


// image path 
import book1 from '../assets/image/sales1.png'
import book2 from '../assets/image/sales2.png'
import likes from '../assets/image/heart-like.png'
import unlike from '../assets/image/heart-unlike.png'
import add from '../assets/image/addcard.png'
import remove from '../assets/image/bag-shop.png'


import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { faBagShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { addTocard_list, addTowhish_list, cardToget_list, cardTolike_list, removeTocard_list } from './apiBaseurl';

const Allbooks = () => {
    const { allbookDetails, isLiked, userIdShop, userIdLike, isAdded, categoryBook, likescount, likedProducts, totalLikes, shopProducts, shopcount, singleProductView, singleProductPrice } = useSelector((state) => state.usedbookr_product)
    const navigate = useNavigate();
    const dispatch = useDispatch();



    // like product click fn 
    const totallikes = likedProducts.map((data) => data.id);

    const handleLikeClick = async (product, id) => {
        const auth_login = localStorage.getItem('usedbookrtoken')
        const auth_uesrlogin = localStorage.getItem('isLoginAuth')
        if (auth_login || auth_uesrlogin == true) {
            // Check if the product ID is in the likedProducts array
            if (userIdLike.some(data => data.id === id)) {
                await removeTocard_list(id);
                window.location.reload();
            } else {
                const set_iddetails = await addTowhish_list(product);
                dispatch(setUserIdLike(set_iddetails))
                window.location.reload();
            }
        } else {
            alert("Please login your account")
            navigate('/login')
        }
    }
    // shop product click fn 
    const totalshops = shopProducts.map((data) => data.id);
    const handleShopClick = async (product, id, price) => {
        const auth_login = localStorage.getItem('usedbookrtoken')
        const auth_uesrlogin = localStorage.getItem('isLoginAuth')
        if (auth_login || auth_uesrlogin == true) {
            // Check if the product ID is in the likedProducts array
            if (userIdShop.some(data => data.id === id)) {
                await removeTocard_list(id);
                window.location.reload();
            } else {
                const set_iddetails = await addTocard_list(product, 1);
                dispatch(setUserIdShop(set_iddetails))
                navigate('/Purchase');
            }
        } else {
            alert("Please login your account")
            navigate('/login')
        }
    }
    const author_name = () => {
        navigate('/authors')
    }
    const click_view = (book) => {
        // dispatch(setsingleProductView([allbookDetails[index]]))
        navigate(`/Description/${book.id}`, { state: book })

    }

    const like_product = async () => {
        const like_id = await cardTolike_list();
        dispatch(setUserIdLike(like_id))
    }

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
                // autoWidth: true,
            },
            600: {
                items: 2,
                // autoWidth: true,
            },
            800: {
                items: 2,
            },
            1000: {
                items: 5,
            },
        },
    };


    useEffect(() => {
        cardToget_list()
        like_product();
    }, []);
    const MemoizedOwlCarousel = React.memo(OwlCarousel);
    return (
        <div className='py-lg-5 py-4 bestseller'>
            <MemoizedOwlCarousel className="owl-theme" {...owlOption}>
                {allbookDetails.length < 0 ?
                    <>
                        <h1 className='text-center product-title'>No items</h1>
                    </>
                    :
                    <>
                        {allbookDetails && allbookDetails.map((book, index) => {
                            return (
                                <>

                                    <div className={userIdShop && userIdShop.length > 0 ? (userIdShop.some(cartId => cartId.book_id === book.id) ? 'normal-box seller-book position-relative' : 'box-view seller-book position-relative') : 'box-view seller-book position-relative'}>
                                        <div className='best-seller'>
                                            <img src={book.image} height='300px' className='w-100 p-lg-2 p-md-2 p-0 border-rounded' onClick={(id) => click_view(book)} />
                                            <span className='selles-offer'>Offer 60%</span>

                                            {/* <span className='like-position float-end m-2' onClick={() => handleLikeClick(book)} >
                                                <span className={` ${isLiked ? 'likes' : 'unlikes'} `}>
                                                    <img src={totallikes.includes(book.id) ? likes : unlike} alt="Like Button" />
                                                </span>
                                            </span> */}
                                            {userIdLike && userIdLike.length > 0 ? (
                                                <>
                                                    {userIdLike.some(cartId => cartId.book_id === book.id) ? (
                                                        <>
                                                            <span
                                                                className='like-position float-end'
                                                                id={book.id}
                                                                value={book.id}
                                                                onClick={() => {
                                                                    const cartId = userIdLike.find(cart => cart.book_id === book.id);
                                                                    handleLikeClick(book, cartId.id);
                                                                }}
                                                            >
                                                                <span className='likes'>
                                                                    <FontAwesomeIcon icon={faHeart} className='mr-fixed' />
                                                                </span>
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span
                                                                className='like-position float-end'
                                                                id={book.id}
                                                                value={book.id}
                                                                onClick={() => handleLikeClick(book, book.id)}
                                                            >
                                                                <span className='unlikes'>
                                                                    <FontAwesomeIcon icon={faHeart} className='mr-fixed' />
                                                                </span>
                                                            </span>
                                                        </>
                                                    )}
                                                </>
                                            ) : (
                                                <span
                                                    className='like-position float-end'
                                                    id={book.id}
                                                    value={book.id}
                                                    onClick={() => handleLikeClick(book, book.id)}
                                                >
                                                    <span className='unlikes'>
                                                        <FontAwesomeIcon icon={faHeart} className='mr-fixed ' />
                                                    </span>
                                                </span>
                                            )
                                            }
                                            <div className='book-details px-3'>
                                                <h1 className='w-100' title={book.title} onClick={(id) => click_view(book)}>{book.title_long.slice(0, 20)}...</h1>
                                                {book.author === undefined ? <><h5 className='text-primary'>No Author</h5></> : <><h5 className='text-primary' title={book.author} onClick={() => author_name()}>{book.author.slice(0, 10)}</h5></>}
                                                <div className='d-flex '>
                                                    <div className='rate-details'>
                                                        <span className='new-rate'>₹{book.original_price}</span> <span className='ps-2 old-rate'>₹ 440</span><br />
                                                        <Rating
                                                            initialRating={5}
                                                            emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                                            fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                                            readonly={true}
                                                        />
                                                    </div>
                                                    <div className='ms-auto'>
                                                        {userIdShop && userIdShop.length > 0 ? (
                                                            <>
                                                                {userIdShop.some(cartId => cartId.book_id === book.id) ? (
                                                                    <>
                                                                        <span
                                                                            className='normal-box1 float-end'
                                                                            id={book.id}
                                                                            value={book.id}
                                                                            onClick={() => {
                                                                                const cartId = userIdShop.find(cart => cart.book_id === book.id);
                                                                                handleShopClick(book, cartId.id, book.original_price);
                                                                            }}
                                                                        >
                                                                            <FontAwesomeIcon icon={faBagShopping} className='mr-fixed' />
                                                                        </span>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <span
                                                                            className='box-view1 float-end'
                                                                            id={book.id}
                                                                            value={book.id}
                                                                            onClick={() => handleShopClick(book, book.id, book.original_price)}
                                                                        >
                                                                            <FontAwesomeIcon icon={faBagShopping} className='mr-fixed' />
                                                                        </span>
                                                                    </>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <span
                                                                className={totalshops.includes(book.id) ? 'normal-box1 float-end' : 'box-view1 float-end'}
                                                                id={book.id}
                                                                value={book.id}
                                                                onClick={() => handleShopClick(book, book.id, book.original_price)}
                                                            >
                                                                <FontAwesomeIcon icon={faBagShopping} className='mr-fixed' />
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </>
                }
            </MemoizedOwlCarousel>
        </div>

    );
};

export default Allbooks;
