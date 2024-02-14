import React, { useEffect, useState } from 'react';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Rating from 'react-rating';


import '../assets/css/main.css'


import { setisAdded, setisIncrement, setisDecrement, setisLiked, setallBookDetails, setLikedProducts, setlikeProduct, setlikescount, setShopProducts, setshopcount, setsingleProductView, settotallikes } from '../../Redux/CreateSlice';

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

const Allbooks = () => {
    const { allbookDetails, isLiked, isAdded, likescount, likedProducts, totalLikes,shopProducts, shopcount,singleProductView } = useSelector((state) => state.usedbookr_product)
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const author = () => {

    }
    const product_add = () => {

    }
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

    console.log(totalLikes)
    // shop product click fn 
    const totalshops = shopProducts.map((data) => data.id);

    const handleShopClick = (product, id, price) => {
        const isShops = product.id;
        // Check if the product ID is in the likedProducts array
        if (totalshops.includes(isShops)) {
            // If it's already liked, remove it from the likedProducts array
            dispatch(setShopProducts(shopProducts.filter((shopItems) => shopItems.id !== isShops)));
            dispatch(setshopcount(shopcount - 1))
        } else {
            // If it's not liked, add it to the likedProducts array
            // dispatch(setproductitemDetails([...product_item,{...data,id,amount:price,qty:1}]))
            dispatch(setShopProducts([...shopProducts, { ...product, id, amount: price, qty: 1 }]));
            dispatch(setshopcount(shopcount + 1))
        }
    };

    const author_name = () => {
        navigate('/authors')
    }
    const click_view = (id) => {
        dispatch(setsingleProductView([allbookDetails[id]]))
        navigate('Description')
    }
    // useEffect(() => {
    //     if (likedProducts.length > 0) {
    //         dispatch(settotallikes(likedProducts.map((data) => data.id)));
    //     }
    //     dispatch(setallBookDetails(allbookDetails))
    //     dispatch(setsingleProductView(allbookDetails))
    // }, [likedProducts]);
    console.log(likedProducts)
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

    const MemoizedOwlCarousel = React.memo(OwlCarousel);
    return (
        <div className='py-lg-5 py-4 bestseller'>
            <MemoizedOwlCarousel className="owl-theme" {...owlOption}>
                {allbookDetails && allbookDetails.map((book,index) => {
                    return (
                        <>
                            <div className={totalshops.includes(book.id) ? 'normal-box seller-book position-relative' : 'box-view seller-book position-relative'}>
                                <div className='best-seller'>
                                    <img src={book.image} height='300px' className='w-100 p-lg-4 p-md-2 p-0' />
                                    <span className='selles-offer'>offer 60%</span>
                                    {/* <span className='like-position float-end m-2' onClick={() => handleLikeClick(book)}>
                                        <span className={` ${isLiked ? 'likes' : 'unlikes'} `} ><img src={totallikes.includes(book.id) ? likes : unlike} alt="Like Button" /></span>
                                    </span> */}
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
                                                {/* {isAdded ? (<><img src={add} alt="Like Button" onClick={() => product_add()} /></>) : (<> <img src={remove} alt="Remove Button" onClick={() => product_remove()} /> </>)} */}
                                                <span
                                                    className={totalshops.includes(book.id) ? 'normal-box1 float-end' : 'box-view1 float-end'}
                                                    id={book.id} value={book.id}
                                                    onClick={() => handleShopClick(book, book.id, book.msrp)}
                                                >
                                                    {/* <img
                                                        src={totalshops.includes(book.id) ? add : remove}
                                                        alt="Shop Button"
                                                    /> */}
                                                    {totalshops.includes(book.id) ? <><FontAwesomeIcon icon={faBagShopping} className='mr-fixed'/></> : <><FontAwesomeIcon icon={faBagShopping} className='mr-fixed'/></>}
                                                </span>
                                            </div>
                                        </div>
                                        <div className='text-center'>
                                            <button className='viewall mt-4 border-0 rounded-2' onClick={(id) => click_view(index)}>view</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )

                })}
            </MemoizedOwlCarousel>
        </div>

    );
};

export default Allbooks;
