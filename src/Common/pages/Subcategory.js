import React, { useEffect, useState } from 'react'
import Header from '../pages/Header'
import Footer from '../pages/Footer'
import Aside from '../pages/Aside'
import Rating from 'react-rating';

// image path 

import likes from '../assets/image/heart-like.png'
import unlike from '../assets/image/heart-unlike.png'
import add from '../assets/image/addcard.png'
import remove from '../assets/image/removecard.png'
import book1 from '../assets/image/book_1.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faHeart, faBagShopping } from '@fortawesome/free-solid-svg-icons';

import { useSelector, useDispatch } from 'react-redux';
import { setisAdded, setisIncrement, setisDecrement, setisLiked, setallBookDetails, setLikedProducts, setlikeProduct, setlikescount, setShopProducts, setshopcount, setproductIdDetails, setsingleProductView } from '../../Redux/CreateSlice';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { allbooks, category_list, megamenu_list } from './apiBaseurl';

function Subcategory() {
    const { isLiked, isAdded, allbookDetails, likedProducts, userIdShop, userIdLike, likescount, shopProducts, shopcount, minPrice, priceFilter, filteredProducts, productIdDetails, searchfield, subCategoryBook } = useSelector((state) => state.usedbookr_product)
    const [childcategoryBook, setChildcategoryBook] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const childcategory = location.state.childcategories
    // like product click fn 
    const totallikes = likedProducts.map((data) => data.id);

    const handleLikeClick = (product) => {
        const isLikeds = product.id;

        // Check if the product ID is in the likedProducts array
        if (totallikes.includes(isLikeds)) {
            // If it's already liked, remove it from the likedProducts array
            dispatch(setLikedProducts(likedProducts.filter((likedProduct) => likedProduct.id !== isLikeds)));
            dispatch(setlikescount(likescount - 1))
        } else {
            // If it's not liked, add it to the likedProducts array
            dispatch(setLikedProducts([...likedProducts, product]));
            dispatch(setlikescount(likescount + 1))

        }
    };

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
            dispatch(setShopProducts([...shopProducts, { ...product, id, amount: price, qty: 1 }]));
            dispatch(setshopcount(shopcount + 1))
        }
    };

    const all_product = () => {
        navigate('/Allproduct')
    }
    const product_like = () => {
    }
    const product_add = () => {

    }
    const product_remove = () => {

    }
    const pass = (data) => {
        const updatedData = [data];
        dispatch(setproductIdDetails(updatedData))
        navigate('/Description');
    }
    const author_name = () => {
    }
    const click_view = (id) => {
        dispatch(setsingleProductView([allbookDetails[id]]))
        navigate('/Description')
    }

    const all_book = async () => {
        const book = await allbooks();
        dispatch(setallBookDetails(book))
        console.log("hiii")
    }

    useEffect(() => {
        console.log("byee")
        all_book()
        setChildcategoryBook(childcategory)
        window.scrollTo(0, 0);
    }, []);
    console.log(111, allbookDetails);
    console.log(childcategory)
    return (
        <div className='product-section'>
            <Header />
            <div className='product-view'>
                <div className='d-lg-block d-none'>
                    <div className='row m-0'>
                        <div className='col-3'>
                            <Aside />
                        </div>
                        <div className='col-9'>
                            <div className='product-list my-5'>
                                <div className='row m-0 bestseller'>
                                    {searchfield ?
                                        <>
                                            {childcategory.length > 0 ?
                                                <>
                                                    {childcategory && Array.isArray(allbookDetails) && allbookDetails
                                                        .filter(book => childcategory.some(category => book.childcategory_id.some(childCategory => childCategory.name === category.name)))
                                                        .map(book => (
                                                            <div className='col-lg-3 col-md-4 col-sm-6 col-12 mt-2 d-flex align-self-stretch' key={book.id}>
                                                                <div className={userIdShop && userIdShop.length > 0 ? (userIdShop.some(cartId => cartId.book_id === book.id) ? 'normal-box seller-book position-relative' : 'box-view seller-book position-relative') : 'box-view seller-book position-relative'}>
                                                                    <div className='best-seller'>
                                                                        <img src={book.image} height='300px' className='w-100 p-lg-4 p-md-2 p-0' />
                                                                        <span className='selles-offer'>offer 60%</span>
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
                                                                        )}
                                                                        <div className='book-details p-1'>
                                                                            <h1 className='w-100' title={book.title}>{book.title_long.slice(0, 20)}...</h1>
                                                                            {book.author === undefined ? <><h5 className='text-primary'>No Author</h5></> : <><h5 className='text-primary' title={book.author} onClick={() => author_name()}>{book.author.slice(0, 10)}</h5></>}
                                                                            <h5>{book.category_id[0].name}</h5>
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
                                                            </div>
                                                        ))}

                                                </>
                                                :
                                                <>
                                                    <h1 className='text-center product-title'>No items</h1>
                                                </>
                                            }

                                        </> :
                                        <>
                                            <h1 className='text-center product-title'>No items</h1>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-lg-none d-block'>
                    <div className='row m-0'>
                        <div className='col-12'>
                            <Aside />
                        </div>
                        <div className='col-12 p-0'>
                            <div className='row m-0 product-list'>
                                <div className='col-lg-4 col-md-4 col-sm-6 col-12 mt-2 d-flex align-self-stretch'>
                                    <div className='bestseller'>
                                        <div className='seller-book position-relative'>
                                            <div className='best-seller'>
                                                <img src={book1} height='300px' className='w-100 p-lg-4 p-md-2 p-0' />
                                                <span className='selles-offer'>offer 50%</span>
                                                <span className='like-position float-end m-2'>
                                                    <span className={` ${isLiked ? 'likes' : 'unlikes'} `}><img src={isLiked ? likes : unlike} alt="Like Button" onClick={() => product_like()} /></span>
                                                </span>
                                                <div className='book-details p-3'>
                                                    <h1>Dual Ring </h1>
                                                    <h5>By Lisa Jewall</h5>
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-4 col-md-4 col-sm-6 col-12 mt-2 d-flex align-self-stretch'>
                                    <div className='bestseller'>
                                        <div className='seller-book position-relative'>
                                            <div className='best-seller'>
                                                <img src={book1} height='300px' className='w-100 p-lg-4 p-md-2 p-0' />
                                                <span className='selles-offer'>offer 50%</span>
                                                <span className='like-position float-end m-2'>
                                                    <span className={` ${isLiked ? 'likes' : 'unlikes'} `}><img src={isLiked ? likes : unlike} alt="Like Button" onClick={() => product_like()} /></span>
                                                </span>
                                                <div className='book-details p-3'>
                                                    <h1>Dual Ring </h1>
                                                    <h5>By Lisa Jewall</h5>
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-4 col-md-4 col-sm-6 col-12 mt-2 d-flex align-self-stretch'>
                                    <div className='bestseller'>
                                        <div className='seller-book position-relative'>
                                            <div className='best-seller'>
                                                <img src={book1} height='300px' className='w-100 p-lg-4 p-md-2 p-0' />
                                                <span className='selles-offer'>offer 50%</span>
                                                <span className='like-position float-end m-2'>
                                                    <span className={` ${isLiked ? 'likes' : 'unlikes'} `}><img src={isLiked ? likes : unlike} alt="Like Button" onClick={() => product_like()} /></span>
                                                </span>
                                                <div className='book-details p-3'>
                                                    <h1>Dual Ring </h1>
                                                    <h5>By Lisa Jewall</h5>
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-4 col-md-4 col-sm-6 col-12 mt-2 d-flex align-self-stretch'>
                                    <div className='bestseller'>
                                        <div className='seller-book position-relative'>
                                            <div className='best-seller'>
                                                <img src={book1} height='300px' className='w-100 p-lg-4 p-md-2 p-0' />
                                                <span className='selles-offer'>offer 50%</span>
                                                <span className='like-position float-end m-2'>
                                                    <span className={` ${isLiked ? 'likes' : 'unlikes'} `}><img src={isLiked ? likes : unlike} alt="Like Button" onClick={() => product_like()} /></span>
                                                </span>
                                                <div className='book-details p-3'>
                                                    <h1>Dual Ring </h1>
                                                    <h5>By Lisa Jewall</h5>
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-4 col-md-4 col-sm-6 col-12 mt-2 d-flex align-self-stretch'>
                                    <div className='bestseller'>
                                        <div className='seller-book position-relative'>
                                            <div className='best-seller'>
                                                <img src={book1} height='300px' className='w-100 p-lg-4 p-md-2 p-0' />
                                                <span className='selles-offer'>offer 50%</span>
                                                <span className='like-position float-end m-2'>
                                                    <span className={` ${isLiked ? 'likes' : 'unlikes'} `}><img src={isLiked ? likes : unlike} alt="Like Button" onClick={() => product_like()} /></span>
                                                </span>
                                                <div className='book-details p-3'>
                                                    <h1>Dual Ring </h1>
                                                    <h5>By Lisa Jewall</h5>
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Subcategory