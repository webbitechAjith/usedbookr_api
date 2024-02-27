import React, { useEffect, useState } from 'react';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Rating from 'react-rating';


import '../assets/css/main.css'


import { setisAdded, setisIncrement, setisDecrement, setisLiked, setallBookDetails, setLikedProducts, setlikeProduct, setlikescount, setShopProducts, setshopcount, setsingleProductView, settotallikes, setCategoryBook } from '../../Redux/CreateSlice';

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
import { useNavigate } from 'react-router-dom';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { addTocard_list, cardToget_list } from './apiBaseurl';

const Allbooks = () => {
    const { allbookDetails, isLiked, userIdShop, isAdded, categoryBook, likescount, likedProducts, totalLikes, shopProducts, shopcount, singleProductView, singleProductPrice } = useSelector((state) => state.usedbookr_product)
    const navigate = useNavigate();
    const dispatch = useDispatch();




    // like product click fn 
    const totallikes = likedProducts.map((data) => data.id);

    const handleLikeClick = (product) => {
        const productId = product.id;
        if (totallikes.includes(productId)) {
            // If it's already liked, remove it from the likedProducts array
            dispatch(setLikedProducts(likedProducts.filter((likedProduct) => likedProduct.id !== productId)));
            dispatch(settotallikes(totallikes.filter((likedProductId) => likedProductId !== productId)));
            dispatch(setlikescount(likescount - 1));
        } else {
            // If it's not liked, add it to the likedProducts array
            dispatch(setLikedProducts([...likedProducts, product]));
            dispatch(settotallikes([...totallikes, productId]));
            dispatch(setlikescount(likescount + 1));
        }
    }
    // shop product click fn 
    const totalshops = shopProducts.map((data) => data.id);

    const handleShopClick = async (product, id, price) => {
        const auth_login = localStorage.getItem('usedbookrtoken')
        if (auth_login) {
            const isShops = product.id;
            // Check if the product ID is in the likedProducts array
            if (totalshops.includes(isShops)) {
                // If it's already liked, remove it from the likedProducts array
                dispatch(setShopProducts(shopProducts.filter((shopItems) => shopItems.id !== isShops)));
                dispatch(setshopcount(shopcount - 1))
            } else {
                // If it's not liked, add it to the likedProducts array
                // dispatch(setproductitemDetails([...product_item,{...data,id,amount:price,qty:1}]))
                if (singleProductPrice) {
                    dispatch(setShopProducts([...shopProducts, { ...product, id, original_price: parseFloat(singleProductPrice), amount: parseFloat(singleProductPrice), qty: 1 }]));
                    dispatch(setshopcount(shopcount + 1))
                    navigate('/Purchase')
                } else {
                    await addTocard_list(product, 1)
                    dispatch(setShopProducts([...shopProducts, { ...product, id, amount: product.original_price + product.gst_charge, qty: 1 }]));
                    dispatch(setshopcount(shopcount + 1))
                    navigate('/Purchase')
                }
            };
        } else {
            alert("Login your account")
            navigate('/login')
        }

    }
    const author_name = () => {
        navigate('/authors')
    }
    const click_view = (index) => {
        dispatch(setsingleProductView([allbookDetails[index]]))
        navigate('Description')
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
    }, [])

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

                                    <div className={totalshops.includes(book.id) ? 'normal-box seller-book position-relative' : 'box-view seller-book position-relative'}>
                                        <div className='best-seller'>
                                            <img src={book.image} height='300px' className='w-100 p-lg-2 p-md-2 p-0 border-rounded' onClick={(id) => click_view(index)} />
                                            <span className='selles-offer'>Offer 60%</span>

                                            <span
                                                className='like-position float-end m-2'
                                                onClick={() => handleLikeClick(book)}
                                            >
                                                <span className={` ${isLiked ? 'likes' : 'unlikes'} `}>
                                                    <img
                                                        src={totallikes.includes(book.id) ? likes : unlike}
                                                        alt="Like Button"
                                                    />
                                                </span>
                                            </span>
                                            <div className='book-details px-3'>
                                                <h1 className='w-100' title={book.title} onClick={(id) => click_view(index)}>{book.title_long.slice(0, 20)}...</h1>
                                                {book.author[0].author === undefined ? <><h5 className='text-primary'>No Author</h5></> : <><h5 className='text-primary' title={book.author[0].author} onClick={() => author_name()}>{book.author[0].author.slice(0, 10)}</h5></>}
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
                                                        {userIdShop.length > 0 ? (
                                                            <>
                                                                {userIdShop.some(cartId => cartId.book_id === book.id) ? (
                                                                    <span
                                                                        className='normal-box1 float-end'
                                                                        id={book.id}
                                                                        value={book.id}
                                                                        onClick={() => handleShopClick(book, book.id, book.original_price)}
                                                                    >
                                                                        <FontAwesomeIcon icon={faBagShopping} className='mr-fixed' />
                                                                    </span>
                                                                ) : (
                                                                    <span
                                                                        className='box-view1 float-end'
                                                                        id={book.id}
                                                                        value={book.id}
                                                                        onClick={() => handleShopClick(book, book.id, book.original_price)}
                                                                    >
                                                                        <FontAwesomeIcon icon={faBagShopping} className='mr-fixed' />
                                                                    </span>
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
