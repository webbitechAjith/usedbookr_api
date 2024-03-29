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
import { setisAdded, setisIncrement, setisDecrement, setisLiked, setallBookDetails, setLikedProducts, setlikeProduct, setlikescount, setShopProducts, setshopcount, setproductIdDetails, setsingleProductView, setUserIdShop, setUserIdLike, setAuthorsName, setFilterCategory } from '../../Redux/CreateSlice';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { addTocard_list, addTowhish_list, allbooks, cardToget_list, cardTolike_list, removeTocard_list } from './apiBaseurl';
import Subaside from './Subaside';

function Subcategory() {
    const { isLiked, isAdded, allbookDetails, filterBookCategory, likedProducts, userIdShop, userIdLike, likescount, shopProducts, shopcount, minPrice, priceFilter, filteredProducts, productIdDetails, searchfield, subCategoryBook, filterCategory } = useSelector((state) => state.usedbookr_product)
    const [childcategoryBook, setChildcategoryBook] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const childcategory = location.state.childcategories


    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // like product click fn 
    const totallikes = likedProducts.map((data) => data.id);

    const handleLikeClick = async (product, id) => {
        const auth_login = localStorage.getItem('usedbookrtoken')
        const auth_uesrlogin = localStorage.getItem('isLoginAuth')
        if (auth_login || auth_uesrlogin == true) {
            // Check if the product ID is in the likedProducts array
            if (userIdLike?.some(data => data.id === id)) {
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
            if (userIdShop?.some(data => data.id === id)) {
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
    const author_name = (name) => {
        dispatch(setAuthorsName(name))
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

    const all_book = async () => {
        const book = await allbooks();
        dispatch(setallBookDetails(book))
    }

    const filterSubcategory = childcategoryBook && Array.isArray(allbookDetails) && allbookDetails
        .filter(book => childcategoryBook.some(category => book.childcategory_id.some(childCategory => childCategory.name === category.name)))
        .filter(book => filterCategory.some(category => (
            book.language === category.lan ||
            book.varient.some(variant => variant.bookconditions === category.con) ||
            book.varient.some(variant => variant.bindings === category.bind) ||
            book.original_price == category.original_price ||
            book.discount == category.discount ||
            (Math.floor(parseFloat(book.avg_rating)) >= parseFloat(category.star) &&
                Math.floor(parseFloat(book.avg_rating)) <= parseFloat(category.star))
        )))


    useEffect(() => {
        all_book()
        if (childcategory) {
            setChildcategoryBook(childcategory);
        }
        if(filterCategory.length > 0){
            dispatch(setFilterCategory([]))
        }
        window.scrollTo(0, 0);
    }, [childcategory]);
    console.log(filterCategory)
    return (
        <div className='product-section'>
            <Header />
            <div className='product-view'>
                <div className=''>
                    <div className='row m-0'>
                        <div className='col-lg-3 col-12'>
                            <Subaside />
                        </div>
                        <div className='col-lg-9 col-12'>
                            <div className='product-list my-5'>
                                <div className='row m-0 bestseller'>
                                    {searchfield ?
                                        <>
                                            {childcategoryBook?.length > 0 ?
                                                <>
                                                    {filterCategory?.length > 0 ?
                                                        <>
                                                            {filterSubcategory?.length > 0 ? (
                                                                childcategoryBook && Array.isArray(allbookDetails) && allbookDetails
                                                                    .filter(book => childcategoryBook.some(category => book.childcategory_id.some(childCategory => childCategory.name === category.name)))
                                                                    .filter(book => filterCategory.some(category => (
                                                                        book.language === category.lan ||
                                                                        book.varient.some(variant => variant.bookconditions === category.con) ||
                                                                        book.varient.some(variant => variant.bindings === category.bind) ||
                                                                        book.original_price == category.original_price ||
                                                                        book.discount == category.discount ||
                                                                        (Math.floor(parseFloat(book.avg_rating)) >= parseFloat(category.star) &&
                                                                            Math.floor(parseFloat(book.avg_rating)) <= parseFloat(category.star))
                                                                    )))
                                                                    .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
                                                                    .map(book => (
                                                                        <>
                                                                            <div className='col-lg-3 col-md-4 col-sm-6 col-12 mt-2 d-flex align-self-stretch' key={book.id}>
                                                                                <div className={userIdShop && userIdShop.length > 0 ? (userIdShop.some(cartId => cartId.book_id === book.id) ? 'normal-box seller-book position-relative' : 'box-view seller-book position-relative') : 'box-view seller-book position-relative'}>
                                                                                    <div className='best-seller'>
                                                                                        <img src={book.image} height='300px' className='w-100 p-lg-4 p-md-2 p-0' onClick={(id) => click_view(book)} />
                                                                                        <span className='selles-offer'>offer {book.discount}%</span>
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
                                                                                            <h1 className='w-100 mb-1' title={book.title}>{book.title_long.slice(0, 20)}...</h1>
                                                                                            {book.author === undefined ? <><h5 className='text-primary'>No Author</h5></> : <><h5 className='text-primary' title={book.author} onClick={() => author_name(book.author)} style={{cursor:'pointer'}}>{book.author.slice(0, 10)}</h5></>}
                                                                                            {/* <h5>{book.category_id[0].name}</h5> */}
                                                                                            <div className='d-flex '>
                                                                                                <div className='rate-details'>
                                                                                                    <span className='new-rate'>INR {book.selling_price}</span> <span className='ps-2 old-rate'>INR {book.original_price}</span><br />
                                                                                                    <Rating
                                                                                                        initialRating={book.avg_rating}
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
                                                                        </>
                                                                    ))
                                                            ) : (
                                                                <div className='col-lg-12 text-center mt-3'>
                                                                    <h4>No books match the selected criteria.</h4>
                                                                </div>
                                                            )
                                                            }
                                                            <div className='row m-0 gy-2 total-books mt-3'>
                                                                <div className='col-lg-6 col-12'>
                                                                    <p className=''>Total Books - {filterSubcategory?.length}</p>
                                                                </div>
                                                                <div className='col-lg-6 col-12'>
                                                                    <ul className="pagination mt-2 justify-content-end">
                                                                        {Array(Math.ceil(filterSubcategory.length / productsPerPage))
                                                                            .fill()
                                                                            .map((_, i) => (
                                                                                <li
                                                                                    key={i}
                                                                                    className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                                                                                    onClick={() => handleClick(i + 1)}
                                                                                >
                                                                                    <button className="page-link">{i + 1}</button>
                                                                                </li>
                                                                            ))}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </>
                                                        :
                                                        <>
                                                            {childcategoryBook && Array.isArray(allbookDetails) && allbookDetails
                                                                .filter(book => childcategoryBook.some(category => book.childcategory_id.some(childCategory => childCategory.name === category.name)))
                                                                .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
                                                                .map(book => (
                                                                    <div className='col-lg-3 col-md-4 col-sm-6 col-12 mt-2 d-flex align-self-stretch' key={book.id}>
                                                                        <div className={userIdShop && userIdShop.length > 0 ? (userIdShop.some(cartId => cartId.book_id === book.id) ? 'normal-box seller-book position-relative' : 'box-view seller-book position-relative') : 'box-view seller-book position-relative'}>
                                                                            <div className='best-seller'>
                                                                                <img src={book.image} height='300px' className='w-100 p-lg-4 p-md-2 p-0' onClick={(id) => click_view(book)} />
                                                                                <span className='selles-offer'>offer {book.discount}%</span>
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
                                                                                    <h1 className='w-100 mb-1' title={book.title}>{book.title_long.slice(0, 20)}...</h1>
                                                                                    {book.author === undefined ? <><h5 className='text-primary'>No Author</h5></> : <><h5 className='text-primary' title={book.author} onClick={() => author_name(book.author)} style={{cursor:'pointer'}}>{book.author.slice(0, 10)}</h5></>}
                                                                                    {/* <h5>{book.category_id[0].name}</h5> */}
                                                                                    <div className='d-flex '>
                                                                                        <div className='rate-details'>
                                                                                            <span className='new-rate'>INR {book.selling_price}</span> <span className='ps-2 old-rate'>INR {book.original_price}</span><br />
                                                                                            <Rating
                                                                                                initialRating={book.avg_rating}
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
                                                            <div className='row m-0 gy-2 total-books mt-3'>
                                                                <div className='col-lg-6 col-12'>
                                                                    <p className=''>Total Books - {childcategoryBook?.length}</p>
                                                                </div>
                                                                <div className='col-lg-6 col-12'>
                                                                    <ul className="pagination mt-2 justify-content-end">
                                                                        {Array(Math.ceil(childcategoryBook.length / productsPerPage))
                                                                            .fill()
                                                                            .map((_, i) => (
                                                                                <li
                                                                                    key={i}
                                                                                    className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                                                                                    onClick={() => handleClick(i + 1)}
                                                                                >
                                                                                    <button className="page-link">{i + 1}</button>
                                                                                </li>
                                                                            ))}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </>
                                                    }

                                                </>
                                                :
                                                <>
                                                    <div className='col-lg-12 text-center mt-3'>
                                                        <h4>No books.</h4>
                                                    </div>
                                                </>
                                            }


                                        </>
                                        :
                                        <>
                                            <div className='col-lg-12 text-center mt-3'>
                                                <h4>No books Search.</h4>
                                            </div>
                                        </>
                                    }
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