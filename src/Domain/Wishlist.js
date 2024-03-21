import React, { useEffect, useState } from 'react';
import Header from '../Common/pages/Header'
import Footer from '../Common/pages/Footer'
import Useraside from '../Common/pages/Useraside'

import Rating from 'react-rating';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChevronDown, faBagShopping, faCancel, faTrash } from '@fortawesome/free-solid-svg-icons';

import '../Common/assets/css/profile.css'

// image path 
import plant1 from '../Common/assets/image/description4.png'
// import Rating from '../Common/assets/image/Rating.png'
import cancel from '../Common/assets/image/cancel.png'

import { useSelector, useDispatch } from 'react-redux';
import { setAuthorsName, setClass1Hide, setLikedProducts, setShopProducts, setSingleProductPrice, setUserIdLike, setUserIdShop, setallBookDetails, setlikescount, setshopcount } from '../Redux/CreateSlice';
import { addTocard_list, allbooks, cardTolike_list, removeTocard_list, removeTolike_list } from '../Common/pages/apiBaseurl';
import { useNavigate } from 'react-router-dom';


function Wishlist() {
    const { allbookDetails, userIdShop, likedProducts, likescount, shopcount, shopProducts, userIdLike,singleProductPrice } = useSelector((state) => state.usedbookr_product);

    const [statuslevel, setStatusLevel] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // shop product click fn 


    const like_book = async () => {
        const like_details = await cardTolike_list();
        dispatch(setUserIdLike(like_details))
    }
    const book_details = async () => {
        const books = await allbooks();
        dispatch(setallBookDetails(books))
    }
    const handleLikeClick = async (product, id) => {
        const auth_login = localStorage.getItem('usedbookrtoken')
        const auth_uesrlogin = localStorage.getItem('isLoginAuth')
        if (auth_login || auth_uesrlogin == true) {
            // Check if the product ID is in the likedProducts array
            if (userIdLike?.some(data => data.id === id)) {
                await removeTolike_list(id);
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
        console.log(product)
        const auth_login = localStorage.getItem('usedbookrtoken')
        const auth_uesrlogin = localStorage.getItem('isLoginAuth')
        if (auth_login || auth_uesrlogin == true) {
            // Check if the product ID is in the likedProducts array
            if (userIdShop.some(data => data.id === id)) {
                await removeTocard_list(id);
                window.location.reload();
            } else {
                const set_iddetails = await addTocard_list(product, 1);
                dispatch(setSingleProductPrice(price))
                dispatch(setUserIdShop(set_iddetails))
                navigate('/Purchase');
            }
        } else {
            alert("Please login your account")
            navigate('/login')
        }
    }
    const click_view = async(book) => {
        navigate(`/Description/${book.id}`, { state: book })
    }
    const author_name = (name) => {
        dispatch(setAuthorsName(name))
        navigate('/authors')
    }
    useEffect(() => {
        book_details();
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <Header />
            <div className='history-section'>
                <div className='d-lg-block d-none'>
                    <div className='container-90 pt-5'>
                        <span className='profile-head'>My Wishlist</span>
                        <div className='row m-0 py-3 wishlist-product'>
                            <div className='col-3'>
                                <Useraside />
                            </div>
                            <div className='col-9 order-card'>
                                {userIdLike && userIdLike.length > 0 ?
                                    <>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Product</th>
                                                    <th scope="col">price</th>
                                                    <th scope="col">stock status</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {userIdLike && allbookDetails && allbookDetails.map((data, index) => {
                                                    const match = userIdLike.find(item => item.book_id == data.id);
                                                    if (match) {
                                                        return (
                                                            <>
                                                                <tr className='total-wish'>
                                                                    <td className='wish-product'>
                                                                        <div className='row m-0 pt-2'>
                                                                            <div className='col-4 p-0'>
                                                                                <img src={data.image} alt={data.title_long.slice(0, 10)} className='w-100' onClick={(id) => click_view(data)}/>
                                                                            </div>
                                                                            <div className='col-8 py-4'>
                                                                                <h5 title={data.title_long}>{data.title_long.slice(0, 20)}...</h5>
                                                                                {data.author === undefined ? <><h5 className='text-primary'>No Author</h5></> : <><h5 className='text-primary' title={data.author} onClick={() => author_name(data.author)} style={{cursor:'pointer'}}>{data.author.slice(0, 10)}</h5></>}
                                                                                <Rating
                                                                                    initialRating={data.avg_rating}
                                                                                    emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                                                                    fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                                                                    readonly={true}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className='py-5'>
                                                                        <h6 className='price pe-2'>INR {(data.selling_price).toLocaleString()}.00</h6>
                                                                        </td>
                                                                    <td className='py-5'><h3>In Stock</h3></td>
                                                                    <td className='py-5'>
                                                                        {userIdShop && userIdShop.length > 0 ? (
                                                                            <>
                                                                                {userIdShop.some(cartId => cartId.book_id === data.id) ? (
                                                                                    <>
                                                                                        <span
                                                                                            className='normal-box1 float-start'
                                                                                            id={data.id}
                                                                                            value={data.id}
                                                                                            onClick={() => {
                                                                                                const cartId = userIdShop.find(cart => cart.book_id === data.id);
                                                                                                handleShopClick(data, cartId.id, data.original_price);
                                                                                            }}
                                                                                        >
                                                                                            <FontAwesomeIcon icon={faBagShopping} className='mr-fixed' />
                                                                                        </span>
                                                                                    </>
                                                                                ) : (
                                                                                    <>
                                                                                        <span
                                                                                            className='box-view1 float-start'
                                                                                            id={data.id}
                                                                                            value={data.id}
                                                                                            onClick={() => handleShopClick(data, data.id, data.original_price)}
                                                                                        >
                                                                                            <FontAwesomeIcon icon={faBagShopping} className='mr-fixed' />
                                                                                        </span>
                                                                                    </>
                                                                                )}
                                                                            </>
                                                                        ) : (
                                                                            <span
                                                                                className={totalshops.includes(data.id) ? 'normal-box1 float-start' : 'box-view1 float-start'}
                                                                                id={data.id}
                                                                                value={data.id}
                                                                                onClick={() => handleShopClick(data, data.id, data.original_price)}
                                                                            >
                                                                                <FontAwesomeIcon icon={faBagShopping} className='mr-fixed' />
                                                                            </span>
                                                                        )}
                                                                        <FontAwesomeIcon className='ms-3 mt-2' icon={faTrash}
                                                                            onClick={() => {
                                                                                const cartId = userIdLike.find(cart => cart.book_id === data.id);
                                                                                handleLikeClick(data, cartId.id);
                                                                            }}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            </>
                                                        )
                                                    }
                                                    return null;
                                                })}
                                            </tbody>
                                        </table>
                                    </>
                                    :
                                    <>
                                        <h1 className='text-center'>No Likes product</h1>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-lg-none d-md-block d-sm-none d-none'>
                    <Useraside />
                    <div className='container-90 pt-5'>
                        <div className='row m-0 py-3 wishlist-product'>
                            <div className='col-12 py-3'>
                                <span className='profile-head'>My Wishlist</span>
                            </div>
                            <div className='col-12 p-0 order-card'>
                                {userIdLike && userIdLike.length > 0 ?
                                    <>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Product</th>
                                                    <th scope="col">price</th>
                                                    <th scope="col">stock status</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {userIdLike && allbookDetails && allbookDetails.map((data, index) => {
                                                    const match = userIdLike.find(item => item.book_id == data.id);
                                                    if (match) {
                                                        return (
                                                            <>
                                                                <tr className='total-wish'>
                                                                    <td className='wish-product'>
                                                                        <div className='row m-0 pt-2'>
                                                                            <div className='col-4 p-0'>
                                                                                <img src={data.image} alt='plant1' className='w-100' onClick={(id) => click_view(data)}/>
                                                                            </div>
                                                                            <div className='col-8 py-4'>
                                                                                <h5>{data.title_long}</h5>
                                                                                {data.author === undefined ? <><h5 className='text-primary'>No Author</h5></> : <><h5 className='text-primary' title={data.author} onClick={() => author_name(data.author)} style={{cursor:'pointer'}}>{data.author.slice(0, 10)}</h5></>}
                                                                                <Rating
                                                                                    initialRating={data.avg_rating}
                                                                                    emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                                                                    fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                                                                    readonly={true}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className='py-5'><h6>INR {(data.selling_price).toLocaleString()}.00</h6></td>
                                                                    <td className='py-5'><h3>In Stock</h3></td>
                                                                    <td className='py-5'>
                                                                        {userIdShop && userIdShop.length > 0 ? (
                                                                            <>
                                                                                {userIdShop.some(cartId => cartId.book_id === data.id) ? (
                                                                                    <>
                                                                                        <span
                                                                                            className='normal-box1 float-start'
                                                                                            id={data.id}
                                                                                            value={data.id}
                                                                                            onClick={() => {
                                                                                                const cartId = userIdShop.find(cart => cart.book_id === data.id);
                                                                                                handleShopClick(data, cartId.id, data.original_price);
                                                                                            }}
                                                                                        >
                                                                                            <FontAwesomeIcon icon={faBagShopping} className='mr-fixed' />
                                                                                        </span>
                                                                                    </>
                                                                                ) : (
                                                                                    <>
                                                                                        <span
                                                                                            className='box-view1 float-start'
                                                                                            id={data.id}
                                                                                            value={data.id}
                                                                                            onClick={() => handleShopClick(data, data.id, data.original_price)}
                                                                                        >
                                                                                            <FontAwesomeIcon icon={faBagShopping} className='mr-fixed' />
                                                                                        </span>
                                                                                    </>
                                                                                )}
                                                                            </>
                                                                        ) : (
                                                                            <span
                                                                                className={totalshops.includes(data.id) ? 'normal-box1 float-start' : 'box-view1 float-start'}
                                                                                id={data.id}
                                                                                value={data.id}
                                                                                onClick={() => handleShopClick(data, data.id, data.original_price)}
                                                                            >
                                                                                <FontAwesomeIcon icon={faBagShopping} className='mr-fixed' />
                                                                            </span>
                                                                        )}
                                                                        <FontAwesomeIcon className='ms-3 mt-2' icon={faTrash}
                                                                            onClick={() => {
                                                                                const cartId = userIdLike.find(cart => cart.book_id === data.id);
                                                                                handleLikeClick(data, cartId.id);
                                                                            }}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            </>
                                                        )
                                                    }
                                                    return null;
                                                })}
                                            </tbody>
                                        </table>
                                        <hr />
                                    </>
                                    :

                                    <>
                                        <h1 className='text-center'>No Likes product</h1>
                                    </>
                                }
                            </div>

                            <hr />
                        </div>
                    </div>
                </div>
                <div className='d-lg-none d-md-none d-sm-block d-block'>
                    <Useraside />
                    <div className=''>
                        <div className='row m-0 py-3 wishlist-product'>
                            <div className='col-12 py-3'>
                                <span className='profile-head'>My Wishlist</span>
                            </div>
                            <div className='col-12 p-0 order-card'>
                                {userIdLike && userIdLike.length > 0 ?
                                    <>
                                        <div className='row m-0 gy-2 border-bottom py-4'>
                                            {userIdLike && allbookDetails && allbookDetails.map((data, index) => {
                                                const match = userIdLike.find(item => item.book_id == data.id);
                                                if (match) {
                                                    return (
                                                        <>
                                                            <div className='col-sm-4 col-12 text-center' style={{height:'200px'}}>
                                                                <img src={data.image} alt='plant1' style={{ width: '70%', height: '100%', objectFit: 'contain' }} onClick={(id) => click_view(data)}/>
                                                            </div>
                                                            <div className='col-sm-5 col-8 mt-3 rate_details'>
                                                                <h5 className=''><b>Title :</b> {data.title_long.slice(0, 20)}...</h5>
                                                                {data.author === undefined ? <><h5 className='text-primary'>No Author</h5></> : <><h5 className='text-primary' title={data.author} onClick={() => author_name(data.author)} style={{cursor:'pointer'}}>{data.author.slice(0, 10)}</h5></>}
                                                                <Rating
                                                                    initialRating={data.avg_rating}
                                                                    emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                                                    fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                                                    readonly={true}
                                                                />
                                                                <h6>INR {(data.selling_price).toLocaleString()}.00</h6>
                                                                <h3>In Stock</h3>
                                                            </div>
                                                            <div className='col-sm-3 col-4 align-self-center'>
                                                                {userIdShop && userIdShop.length > 0 ? (
                                                                    <>
                                                                        {userIdShop.some(cartId => cartId.book_id === data.id) ? (
                                                                            <>
                                                                                <span
                                                                                    className='normal-box1 float-start'
                                                                                    id={data.id}
                                                                                    value={data.id}
                                                                                    onClick={() => {
                                                                                        const cartId = userIdShop.find(cart => cart.book_id === data.id);
                                                                                        handleShopClick(data, cartId.id, data.original_price);
                                                                                    }}
                                                                                >
                                                                                    <FontAwesomeIcon icon={faBagShopping} className='mr-fixed' />
                                                                                </span>
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <span
                                                                                    className='box-view1 float-start'
                                                                                    id={data.id}
                                                                                    value={data.id}
                                                                                    onClick={() => handleShopClick(data, data.id, data.original_price)}
                                                                                >
                                                                                    <FontAwesomeIcon icon={faBagShopping} className='mr-fixed' />
                                                                                </span>
                                                                            </>
                                                                        )}
                                                                    </>
                                                                ) : (
                                                                    <span
                                                                        className={totalshops.includes(data.id) ? 'normal-box1 float-start' : 'box-view1 float-start'}
                                                                        id={data.id}
                                                                        value={data.id}
                                                                        onClick={() => handleShopClick(data, data.id, data.original_price)}
                                                                    >
                                                                        <FontAwesomeIcon icon={faBagShopping} className='mr-fixed' />
                                                                    </span>
                                                                )}
                                                                <FontAwesomeIcon className='ms-3 mt-2' icon={faTrash}
                                                                    onClick={() => {
                                                                        const cartId = userIdLike.find(cart => cart.book_id === data.id);
                                                                        handleLikeClick(data, cartId.id);
                                                                    }}
                                                                />
                                                            </div>
                                                            <hr className='my-3' />
                                                        </>

                                                    )
                                                }
                                                return null;
                                            })}
                                        </div>
                                    </>
                                    :
                                    <>
                                        <h1 className='text-center'>No Likes product</h1>

                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            <Footer />
        </div >
    )
}

export default Wishlist