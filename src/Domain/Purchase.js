import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Rating from 'react-rating';

import Header from '../Common/pages/Header'
import Footer from '../Common/pages/Footer'
import Useraside from '../Common/pages/Useraside'



// css file include path 
import '../Common/assets/css/profile.css'

// fontawesome 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


// image path 
import noshop from '../Common/assets/image/no-shops.gif'


// state value action process 
import { setshopcount, settotalItemShop, setShopProducts, setfinalItemPrice, setUserIdShop, setallBookDetails } from '../Redux/CreateSlice';
import { useNavigate } from 'react-router-dom';
import { addTocard_list, allbooks, removeTocard_list } from '../Common/pages/apiBaseurl';

function Purchase() {
    // state value declear 
    const { shopProducts, shopcount, totalItemShop, singleProductPrice, finalItemPrice, userLogin, userIdShop, allbookDetails } = useSelector((state) => state.usedbookr_product)

    const dispatch = useDispatch();
    const navigate = useNavigate()
    // total amount declear 
    const total_amount = shopProducts.map((data) => { return data.amount })
    const final_amount = total_amount.reduce((accumulator, currentValue) => {
        const num = parseFloat(currentValue);
        return accumulator + num;
    }, 0);

    // increment in product count 
    const itemIncrement = async (data) => {
        const updatedBooks = userIdShop.map(book => {
            if (book.book_id === data.id) {
                return { ...book, quantity: book.quantity + 1 };
            }
            return book;
        });
        dispatch(setUserIdShop(updatedBooks));
        const updatedBook = updatedBooks.find(book => book.book_id === data.id);
        if (updatedBook) {
            await addTocard_list(data, updatedBook.quantity);
        }
    };
    // decrement in product count 
    const itemDecrement = async (data) => {
        const updatedBooks = userIdShop.map(book => {
            if (book.book_id === data.id) {
                return { ...book, quantity: book.quantity - 1 };
            }
            return book;
        });
        dispatch(setUserIdShop(updatedBooks));
        const updatedBook = updatedBooks.find(book => book.book_id === data.id);
        if (updatedBook) {
            await addTocard_list(data, updatedBook.quantity);
        }
    };
    const deleteitem = async (id) => {
        if (userIdShop.some(data => data.id === id)) {
            await removeTocard_list(id);
            window.location.reload();
        }
    }
    // payment process
    const paymentProcess = () => {
        if (shopProducts?.length > 0) {
            if (userLogin == true) {
                navigate('/Login')
            } else {
                navigate('/Orderprocess')
            }
        } else {
            alert("No Any Book Shop")
        }

    }
    let totalPrice = 0;
    if (userIdShop?.length > 0) {
        {
            userIdShop && allbookDetails && allbookDetails.map(data => {
                const cartItem = userIdShop.find(item => item.book_id === data.id);
                if (cartItem) {
                    totalPrice += (data.original_price + data.gst_charge) * cartItem.quantity;
                }
                return null;
            })
        }
    }
    const book_details = async () => {
        const books = await allbooks();
        dispatch(setallBookDetails(books))
    }
    useEffect(() => {
        book_details()
        window.scrollTo(0, 0);
    }, []);
    console.log(allbookDetails)
    return (
        <div className='purchase-section'>
            <Header />
            <div className='account-section'>
                <div className='d-lg-block d-none'>
                    <div className='container-90 pt-5'>
                        <span className='profile-head'>My Shopping Cart</span>
                        <div className='row m-0 py-3'>
                            <div className='col-9'>
                                <div className='profile-card order-card'>
                                    {Array.isArray(userIdShop) && userIdShop?.length > 0 ?
                                        <>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Product</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col" className=''>Subtotal</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {userIdShop && allbookDetails && allbookDetails.map((data, index) => {
                                                        const match = userIdShop.find(item => item.book_id === data.id);
                                                        // If there's a match, it means the book is in userIdShop
                                                        if (match) {
                                                            return (
                                                                <tr key={index} className='total-wish'>
                                                                    <td className='wish-product'>
                                                                        <div className='row m-0 pt-2'>
                                                                            <div className='col-4 py-4'>
                                                                                <img src={data.image} alt={data.image} className='w-100' />
                                                                            </div>
                                                                            <div className='col-8 py-4'>
                                                                                <h5>{data.title_long}</h5>
                                                                                <Rating
                                                                                    initialRating={4}
                                                                                    emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                                                                    fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                                                                    readonly={true}
                                                                                />
                                                                                <h5>{data.total_price}</h5>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className='py-5 px-0 sum-product'>
                                                                        <span>
                                                                            {match.quantity > 1 ? <><button onClick={() => itemDecrement(data)}>-</button></> : <><button type='button'>-</button></>}
                                                                            <a className='mx-2 text-decoration-none'>{match.quantity}</a>
                                                                            <button onClick={() => itemIncrement(data)}>+</button>
                                                                        </span>
                                                                    </td>
                                                                    <td className='py-5 text-start'>
                                                                        <a className='text-decoration-none price-count'>
                                                                            {(data.original_price + data.gst_charge) * match.quantity}
                                                                        </a>
                                                                        <FontAwesomeIcon icon={faTrash} style={{ color: '#EA4B48' }} className='ps-3 delete_id'
                                                                            onClick={() => {
                                                                                const cartId = userIdShop.find(cart => cart.book_id === data.id);
                                                                                deleteitem(cartId.id);
                                                                            }}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                        return null; // Don't forget to handle when there's no match
                                                    })}
                                                </tbody>
                                            </table>
                                        </> :
                                        <>
                                            <h1 className='text-center'>No Shop Product</h1>
                                            {/* <img src={noshop} className='w-100 ' height={440} /> */}
                                        </>
                                    }
                                </div>
                            </div>
                            <div className='col-3'>
                                <div className='purchase-list'>
                                    <p>Coupon Code</p>
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter code" aria-label="Search" aria-describedby="searchButton" />
                                        <button className="btn" type="button" id="searchButton">Apply Coupon</button>
                                    </div>
                                    <div className='packing-card p-2'>
                                        <h2>Cart Total</h2>
                                        <div className='money-details'>
                                            <div className='row m-0'>
                                                <div className='col-6'>
                                                    <h6 className=''>No.of.Item :</h6>
                                                </div>
                                                <div className='col-6 text-end'>
                                                    <h6 className=''>

                                                        {userIdShop && userIdShop?.length > 0 ? (
                                                            userIdShop.reduce((total, data) => total + data.quantity, 0)
                                                        ) : (
                                                            0
                                                        )}

                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='money-details'>
                                            <div className='row m-0'>
                                                <div className='col-6'>
                                                    <h6 className=''>Subtotal :</h6>
                                                </div>
                                                <div className='col-6 text-end'>
                                                    <h6>{totalPrice}</h6>
                                                    {/* <h6 className=''>{Math.round(final_amount)}</h6> */}

                                                </div>
                                            </div>
                                        </div>
                                        <div className='money-details'>
                                            <div className='row m-0'>
                                                <div className='col-6'>
                                                    <h6 className=''>Shipping :</h6>
                                                </div>
                                                <div className='col-6 text-end'>
                                                    <h6 className=''>Free</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row m-0'>
                                            <div className='col-6'>
                                                <h3 className=''>Total :</h3>
                                            </div>
                                            <div className='col-6 text-end'>
                                                <h3 className=''>{totalPrice}</h3>
                                            </div>
                                        </div>
                                        <div className='text-center'>
                                            <button className='process-check' onClick={paymentProcess}>Proceed to checkout</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='d-lg-none d-md-block d-sm-block  d-none'>
                    {/* <Useraside /> */}
                    <div className='pt-5'>
                        <div className='row m-0'>
                            <div className='col-12'>
                                <span className='profile-head'>My Shopping Cart</span>
                            </div>
                            <div className='col-12'>
                                <div className='profile-card order-card'>
                                    {Array.isArray(userIdShop) && userIdShop?.length > 0 ?
                                        <>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Product</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col" className=''>Subtotal</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {userIdShop && allbookDetails && allbookDetails.map((data, index) => {
                                                        const match = userIdShop.find(item => item.book_id === data.id);
                                                        // If there's a match, it means the book is in userIdShop
                                                        if (match) {
                                                            return (
                                                                <tr key={index} className='total-wish'>
                                                                    <td className='wish-product'>
                                                                        <div className='row m-0 pt-2'>
                                                                            <div className='col-4 py-4'>
                                                                                <img src={data.image} alt={data.image} className='w-100' />
                                                                            </div>
                                                                            <div className='col-8 py-4'>
                                                                                <h5>{data.title_long}</h5>
                                                                                <Rating
                                                                                    initialRating={4}
                                                                                    emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                                                                    fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                                                                    readonly={true}
                                                                                />
                                                                                <h5>{data.total_price}</h5>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className='py-5 px-0 sum-product'>
                                                                        <span>
                                                                            {match.quantity > 1 ? <><button onClick={() => itemDecrement(data)}>-</button></> : <><button type='button'>-</button></>}
                                                                            <a className='mx-2 text-decoration-none'>{match.quantity}</a>
                                                                            <button onClick={() => itemIncrement(data)}>+</button>
                                                                        </span>
                                                                    </td>
                                                                    <td className='py-5 text-start'>
                                                                        <a className='text-decoration-none price-count'>
                                                                            {(data.original_price + data.gst_charge) * match.quantity}
                                                                        </a>
                                                                        <FontAwesomeIcon icon={faTrash} style={{ color: '#EA4B48' }} className='ps-3 delete_id'
                                                                            onClick={() => {
                                                                                const cartId = userIdShop.find(cart => cart.book_id === data.id);
                                                                                deleteitem(cartId.id);
                                                                            }}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                        return null; // Don't forget to handle when there's no match
                                                    })}
                                                </tbody>
                                            </table>
                                        </> :
                                        <>
                                            <h1 className='text-center'>No Shop Product</h1>
                                            {/* <img src={noshop} className='w-100 ' height={440} /> */}
                                        </>
                                    }
                                </div>
                            </div>
                            <div className='col-12 py-5'>
                                <div className='purchase-list'>
                                    <p>Coupon Code</p>
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter code" aria-label="Search" aria-describedby="searchButton" />
                                        <button className="btn" type="button" id="searchButton">Apply Coupon</button>
                                    </div>
                                    <div className='packing-card p-2'>
                                        <h2>Cart Total</h2>
                                        <div className='money-details'>
                                            <div className='row m-0'>
                                                <div className='col-6'>
                                                    <h6 className=''>No.of.Item :</h6>
                                                </div>
                                                <div className='col-6 text-end'>
                                                    <h6 className=''>

                                                        {userIdShop && userIdShop?.length > 0 ? (
                                                            userIdShop.reduce((total, data) => total + data.quantity, 0)
                                                        ) : (
                                                            0
                                                        )}

                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='money-details'>
                                            <div className='row m-0'>
                                                <div className='col-6'>
                                                    <h6 className=''>Subtotal :</h6>
                                                </div>
                                                <div className='col-6 text-end'>
                                                    <h6>{totalPrice}</h6>
                                                    {/* <h6 className=''>{Math.round(final_amount)}</h6> */}

                                                </div>
                                            </div>
                                        </div>
                                        <div className='money-details'>
                                            <div className='row m-0'>
                                                <div className='col-6'>
                                                    <h6 className=''>Shipping :</h6>
                                                </div>
                                                <div className='col-6 text-end'>
                                                    <h6 className=''>Free</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row m-0'>
                                            <div className='col-6'>
                                                <h3 className=''>Total :</h3>
                                            </div>
                                            <div className='col-6 text-end'>
                                                <h3 className=''>{totalPrice}</h3>
                                            </div>
                                        </div>
                                        <div className='text-center'>
                                            <button className='process-check' onClick={paymentProcess}>Proceed to checkout</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='d-lg-none d-md-none d-sm-none  d-block'>
                    {/* <Useraside /> */}
                    <div className='pt-5'>
                        <div className='row m-0'>
                            <div className='col-12'>
                                <span className='profile-head'>My Shopping Cart</span>
                            </div>
                            <div className='col-12'>
                                <div className='profile-card order-card'>
                                    {Array.isArray(userIdShop) && userIdShop?.length > 0 ?
                                        <>

                                            {userIdShop && allbookDetails && allbookDetails.map((data, index) => {
                                                const match = userIdShop.find(item => item.book_id === data.id);
                                                // If there's a match, it means the book is in userIdShop
                                                if (match) {
                                                    return (
                                                        <div className='col-12 pt-3'>
                                                            <div class="card card-mobile" >
                                                                <div className='card-img-hgt'>
                                                                    <img src={data.image} alt={data.image} className='w-100' />
                                                                </div>
                                                                <div class="card-body">
                                                                    <h5 class="card-title"><b>Title</b> :{data.title_long.slice(0, 30)}...</h5>
                                                                    {/* <h5 class="card-title"><b>Author</b> : {data.author}...</h5> */}
                                                                    <div className='py-3 px-0 sum-product'>
                                                                        <span>
                                                                            {match.quantity > 1 ? <><button onClick={() => itemDecrement(data)}>-</button></> : <><button type='button'>-</button></>}
                                                                            <a className='mx-2 text-decoration-none'>{match.quantity}</a>
                                                                            <button onClick={() => itemIncrement(data)}>+</button>
                                                                        </span>
                                                                    </div>
                                                                    <Rating
                                                                        initialRating={4}
                                                                        emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                                                        fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                                                        readonly={true}
                                                                    />
                                                                    <div className='pt-5 pb-3'>
                                                                        <span className='py-5 text-center'><a className='text-decoration-none price-count'>Price  :{(data.original_price + data.gst_charge) * match.quantity}</a>
                                                                            <FontAwesomeIcon icon={faTrash} style={{ color: '#EA4B48' }} className='ps-3 delete_id'
                                                                                onClick={() => {
                                                                                    const cartId = userIdShop.find(cart => cart.book_id === data.id);
                                                                                    deleteitem(cartId.id);
                                                                                }} /></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                return null;
                                            })}
                                        </>
                                        :
                                        <>

                                        </>
                                    }
                                </div>
                            </div>
                            <div className='col-12 py-5'>
                                <div className='purchase-list'>
                                    <p>Coupon Code</p>
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter code" aria-label="Search" aria-describedby="searchButton" />
                                        <button className="btn" type="button" id="searchButton">Apply Coupon</button>
                                    </div>
                                    <div className='packing-card p-2'>
                                        <h2>Cart Total</h2>
                                        <div className='money-details'>
                                            <div className='row m-0'>
                                                <div className='col-6'>
                                                    <h6 className=''>No.of.Item :</h6>
                                                </div>
                                                <div className='col-6 text-end'>
                                                    <h6 className=''>

                                                        {userIdShop && userIdShop?.length > 0 ? (
                                                            userIdShop.reduce((total, data) => total + data.quantity, 0)
                                                        ) : (
                                                            0
                                                        )}

                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='money-details'>
                                            <div className='row m-0'>
                                                <div className='col-6'>
                                                    <h6 className=''>Subtotal :</h6>
                                                </div>
                                                <div className='col-6 text-end'>
                                                    <h6>{totalPrice}</h6>
                                                    {/* <h6 className=''>{Math.round(final_amount)}</h6> */}

                                                </div>
                                            </div>
                                        </div>
                                        <div className='money-details'>
                                            <div className='row m-0'>
                                                <div className='col-6'>
                                                    <h6 className=''>Shipping :</h6>
                                                </div>
                                                <div className='col-6 text-end'>
                                                    <h6 className=''>Free</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row m-0'>
                                            <div className='col-6'>
                                                <h3 className=''>Total :</h3>
                                            </div>
                                            <div className='col-6 text-end'>
                                                <h3 className=''>{totalPrice}</h3>
                                            </div>
                                        </div>
                                        <div className='text-center'>
                                            <button className='process-check' onClick={paymentProcess}>Proceed to checkout</button>
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

export default Purchase