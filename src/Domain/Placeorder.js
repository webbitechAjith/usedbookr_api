import React, { useEffect, useState } from 'react';
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
import Rating from '../Common/assets/image/Rating.png'

// state change action 
import { setallBookDetails, setproductIdDetails, setsingleItemCount, setsingleItemPrice, setSingleProductPrice } from '../Redux/CreateSlice';
import { allbooks } from '../Common/pages/apiBaseurl';


function Placeorder() {
    const { allbookDetails, productIdDetails, singleProductPrice } = useSelector((state) => state.usedbookr_product)
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
    console.log(orderBooks)
    const final_price = () => {
        let tempTotalPrice = 0;
        console.log(orderBooks)
        if (orderBooks?.length > 0) {
            console.log("kumar")
            const price = singleProductPrice?.length > 0 ? (singleProductPrice + orderBooks[0].gst_charge) : (orderBooks[0].original_price);
            tempTotalPrice += parseFloat(price) + orderBooks[0].gst_charge;
            tempTotalPrice = Math.round(tempTotalPrice); // Round to the nearest integer
        }
        setTotalPrice(tempTotalPrice); // Set totalPrice state
    }

    useEffect(() => {
        console.log("ajith")
        allbook_view()
        final_price();
        dispatch(setproductIdDetails(productIdDetails))
        // dispatch(setsingleItemPrice(productIdDetails[0].total_price))
    }, [])
    return (
        <div>
            <div className='description-section'>
                <Header />
                <section className='description container-90 py-5'>
                    <div className='row m-0'>
                        <div className='col-8 price-card'>
                            <div className='row m-0 py-2'>
                                {orderBooks?.length > 0 ?
                                    <>

                                        {orderBooks && orderBooks.map((data) => {
                                            return (
                                                <>
                                                    <div className='col-6'>
                                                        <img src={data.image} />
                                                    </div>
                                                    <div className='col-6 description-details'>
                                                        <h1>{data.title_long}</h1>
                                                        <p className='m-0'>Author : {data.author}</p>
                                                        {/* <span className='review'>4 Reviews</span> */}
                                                        <br />
                                                        <span className='price pe-2'>INR {singleProductPrice ? <>{singleProductPrice}</> : <>{data.original_price}</>}</span><span className='text-decoration-line-through rate'>AED 20.99</span>
                                                        <button className='sales-offer'>50% off</button>
                                                        <h4 className='cate my-2'>Category:<span className='ms-2'>{data.category_id[0].name}</span></h4>
                                                        <hr />
                                                        <p>{data.synopsis}</p>

                                                    </div>


                                                </>
                                            )
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
                        <div className='col-lg-4'>
                            <div className='packing-card price-card p-4'>
                                <h2>PRICE DETAILS</h2>
                                <div className='money-details'>
                                    <div className='row m-0'>
                                        <div className='col-6'>
                                            <h6 className=''>Price ({1} item):</h6>
                                        </div>
                                        <div className='col-6 text-end'>
                                            <h6 className=''>
                                                {orderBooks && orderBooks.map((data) => (
                                                    <div key={data.id}>
                                                        <span className='price pe-2'>{singleProductPrice ? <>{singleProductPrice}</> : <>{data.original_price}</>}</span>
                                                    </div>
                                                ))}
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
                                            <h6 className=''>Free</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className='row m-0'>
                                    <div className='col-6'>
                                        <h3 className=''>Total :</h3>
                                    </div>
                                    <div className='col-6 text-end'>
                                        <h3 className=''>
                                            {totalPrice}
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