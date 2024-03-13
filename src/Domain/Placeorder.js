import React, { useEffect, useState } from 'react';
import Rating from 'react-rating';
import Header from '../Common/pages/Header'
import Footer from '../Common/pages/Footer'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import '../Common/assets/css/description.css'

// fontawesome link 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShop, faTruckFast } from '@fortawesome/free-solid-svg-icons';

// image path 

import description4 from '../Common/assets/image/description4.png'
// import Rating from '../Common/assets/image/Rating.png'

// state change action 
import { setallBookDetails, setproductIdDetails, setUserIdShop, setsingleItemCount, setsingleItemPrice, setSingleProductPrice } from '../Redux/CreateSlice';
import { addTocard_list, allbooks } from '../Common/pages/apiBaseurl';


function Placeorder() {
    const { allbookDetails, productIdDetails, singleProductPrice, userIdShop } = useSelector((state) => state.usedbookr_product)
    const [activeTab, setActiveTab] = useState('tab1');
    const [orderBooks, setOrderBooks] = useState('')
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();



    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };
    const priceCheck = (data) => {
        dispatch(setSingleProductPrice(data.price))
    }
    const payment = () => {
        navigate('/Orderprocess')
    }
    const allbook_view = async () => {
        const single_book = await allbooks();
        dispatch(setallBookDetails(single_book))
        const bookDetail = single_book.find(data => data.id == params.id);
        setOrderBooks([bookDetail])
    }


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

    useEffect(() => {
        allbook_view();
        dispatch(setproductIdDetails(productIdDetails))
        // dispatch(setsingleItemPrice(productIdDetails[0].total_price))
    }, [])
    return (
        <div>
            <div className='description-section'>
                <Header />
                <section className='description container-90 py-5'>
                    <div className='row m-0 gy-2'>
                        <div className='col-lg-8 col-12 price-card'>
                            <div className='row m-0 py-2'>
                                {orderBooks?.length > 0 ?
                                    <>

                                        {orderBooks && orderBooks.map((data) => {
                                            const match = userIdShop.find(item => item.book_id === data.id);

                                            return (
                                                <div className='row m-0 gy-2' key={data.id}>
                                                    <div className='col-lg-6 col-12'>
                                                        <img src={data.image} alt={data.title_long} />
                                                    </div>
                                                    <div className='col-lg-6 col-12 description-details'>
                                                        <h1>{data.title_long}</h1>
                                                        <p className='m-0'>Author: {data.author}</p>
                                                        <Rating
                                                            initialRating={data.rating_count}
                                                            emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                                            fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                                            readonly={true}
                                                        />
                                                        <br />
                                                        <span className='price pe-2'>INR {singleProductPrice ? <>{singleProductPrice}</> : <>{data.selling_price}</>}</span>
                                                        <span className='text-decoration-line-through rate'>INR {data.original_price}</span>
                                                        <button className='sales-offer'>{data.discount}% offer</button>
                                                        <h6 className='cate my-2'>Category: <span className='ms-2'>{data.category_id[0].name}</span></h6>
                                                        <h6 className='cate my-2'>Sub Category: <span className='ms-2'>{data.subcategory_id[0].name}</span></h6>
                                                        <hr />
                                                        <p>{data.synopsis}</p>
                                                        {match && (
                                                            <div>
                                                                {match.quantity > 1 ? <><span class="minus" onClick={() => itemDecrement(data)}>-</span></> : <><span class="minus">-</span></>}
                                                                <span class="num"><a className='mx-2 text-decoration-none'>{match.quantity}</a></span>
                                                                <span class="plus" onClick={() => itemIncrement(data)}>+</span>
                                                            </div>
                                                        )}
                                                        <hr />
                                                    </div>
                                                </div>
                                            );
                                        })}

                                    </>
                                    :
                                    <>
                                    </>
                                }

                            </div>
                            {/* <div className='text-center'>
                                <button className='buynow' onClick={() => buynow()}>Place order<FontAwesomeIcon icon={faTruckFast} className='mx-2' /></button>
                            </div> */}
                        </div>
                        <div className='col-lg-4 col-12 '>
                            <div className='packing-card price-card p-4'>
                                <h2>PRICE DETAILS</h2>
                                <div className='money-details'>
                                    <div className='row m-0'>
                                        <div className='col-6'>
                                            <h6 className=''>Price
                                                {orderBooks?.length > 0 ? (
                                                    <>
                                                        {orderBooks.map((data) => {
                                                            const match = userIdShop?.find(item => item.book_id === data.id);
                                                            return (
                                                                match && (
                                                                    <span key={data.id}>
                                                                        ({match.quantity} item)
                                                                    </span>
                                                                )
                                                            );
                                                        })}
                                                    </>
                                                ) : null}
                                            </h6>
                                        </div>
                                        <div className='col-6 text-end'>
                                            <h6 className=''>
                                                {orderBooks?.length > 0 ?
                                                    <>
                                                        {orderBooks && orderBooks.map((data) => {
                                                            const match = userIdShop.find(item => item.book_id === data.id);
                                                            return (
                                                                match && (
                                                                    <span key={data.id}>
                                                                        {singleProductPrice ? <>{singleProductPrice * match.quantity}</> : <>{(data.selling_price * match.quantity)}</>}
                                                                    </span>
                                                                )
                                                            );
                                                        })}
                                                    </>
                                                    :
                                                    <></>}

                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div className='money-details'>
                                    <div className='row m-0'>
                                        <div className='col-6'>
                                            <h6 className=''>GST :</h6>
                                        </div>
                                        <div className='col-6 text-end'>
                                            <h6 className=''>
                                                {orderBooks?.length > 0 ?
                                                    <>
                                                        {orderBooks && orderBooks.map((data) => {
                                                            const match = userIdShop.find(item => item.book_id === data.id);
                                                            return (
                                                                match && (
                                                                    <span key={data.id}>
                                                                        {singleProductPrice ? <>{((singleProductPrice * data.gst_charge) / 100) * match.quantity}</> : <>{((data.selling_price * data.gst_charge) / 100) * match.quantity} </>}
                                                                    </span>
                                                                )
                                                            );
                                                        })}
                                                    </>
                                                    :
                                                    <></>}

                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div className='money-details'>
                                    <div className='row m-0'>
                                        <div className='col-6'>
                                            <h6 className=''>Shipping :</h6>
                                        </div>
                                        <div className='col-6 text-end'>
                                            <h6 className=''>60</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className='row m-0'>
                                    <div className='col-6'>
                                        <h3 className=''>Total:</h3>
                                    </div>
                                    <div className='col-6 text-end'>
                                        <h3>
                                            {/* {(() => {
                                                let tempTotalPrice = 0;
                                                if (orderBooks?.length > 0) {
                                                    const price = singleProductPrice?.length > 0 ? (singleProductPrice + orderBooks[0].gst_charge) : (orderBooks[0].original_price);
                                                    tempTotalPrice += parseFloat(price) + orderBooks[0].gst_charge;
                                                    tempTotalPrice = Math.round(tempTotalPrice); // Round to the nearest integer
                                                }
                                                return tempTotalPrice;
                                            })()} */}
                                            {orderBooks?.length > 0 ?
                                                <>
                                                    {orderBooks && orderBooks.map((data) => {
                                                        const match = userIdShop.find(item => item.book_id === data.id);
                                                        return (
                                                            match && (
                                                                <span key={data.id}>
                                                                    {singleProductPrice ? <>{(((singleProductPrice * match.quantity) + ((singleProductPrice * data.gst_charge) / 100)* match.quantity)+60)} </> : <>{(((data.selling_price * match.quantity) + ((data.selling_price * data.gst_charge) / 100)* match.quantity) + 60)} </>}
                                                                </span>
                                                            )
                                                        );
                                                    })}
                                                </>
                                                :
                                                <></>}
                                        </h3>
                                    </div>

                                </div>
                                <div className='text-center'>
                                    <button className='buynow' onClick={() => payment()}>Place order<FontAwesomeIcon icon={faTruckFast} className='mx-2' /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </div>
    )
}

export default Placeorder