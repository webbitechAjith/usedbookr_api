import React, { useEffect, useState } from 'react';
import Header from '../Common/pages/Header'
import Footer from '../Common/pages/Footer'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import '../Common/assets/css/description.css'

// fontawesome link 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShop, faTruckFast } from '@fortawesome/free-solid-svg-icons';

// image path 

import description4 from '../Common/assets/image/description4.png'
import Rating from '../Common/assets/image/Rating.png'

// state change action 
import { setproductIdDetails, setsingleItemCount, setsingleItemPrice } from '../Redux/CreateSlice';


function Placeorder() {
    const { productIdDetails, singleItemCount,singleItemPrice,logoutDetails } = useSelector((state) => state.usedbookr_product)
    const [activeTab, setActiveTab] = useState('tab1');
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const total_amount = productIdDetails.map((data) => { return data.total_price })
    const final_amount = total_amount.reduce((accumulator, currentValue) => {
        const num = parseFloat(currentValue);
        return accumulator + num;
       }, 0);

    //    const itemIncrement = (id) => {
    //     const updatedProductItems = shopProducts.map(item => {
    //         if (item.id === id) {
    //             const updatedQty = item.qty + 1;
    //             const updatedAmount = item.total_price * updatedQty;
    //             const quatity = { ...item, qty: item.qty + 1, amount: updatedAmount };
    //             return quatity
    //         }
    //         return item;
    //     });
    //     dispatch(setShopProducts(updatedProductItems));
    //     dispatch(settotalItemShop(totalItemShop + 1))
    // };

    const handleIncrement = () => {
        dispatch(setsingleItemCount((singleItemCount + 1)))
        dispatch(setsingleItemPrice(final_amount*singleItemCount + final_amount))
    };
    const handleDecrement = () => {
        dispatch(setsingleItemCount(singleItemCount - 1))
        dispatch(setsingleItemPrice(final_amount*singleItemCount - final_amount))
    };


    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    const payment = () => {
        if(logoutDetails==true){
            navigate('/Orderprocess')
        }else{
            navigate('/Login')
        }
        
    }
    useEffect(() => {
        dispatch(setproductIdDetails(productIdDetails))
        dispatch(setsingleItemPrice(productIdDetails[0].total_price))
    }, [])
   
    return (
        <div>
            <div className='description-section'>
                <Header />
                <section className='description container-90 py-5'>
                    <div className='row m-0'>
                        <div className='col-8 price-card'>
                            <div className='row m-0'>
                                <div className='col-5'>
                                    <img src={description4} className='w-100 h-100' />
                                </div>
                                <div className='col-6 ms-3 description-details'>
                                    {productIdDetails && productIdDetails.map((data, index) => {
                                        return (
                                            <>
                                                <h1>{data.title} <span className='stock'>In Stock</span></h1>
                                                <img src={Rating} alt='Rating' />
                                                <span className='review'>4 Reviews</span>
                                                <br />
                                                <span className='price pe-2'>{data.total_price}</span><span className='text-decoration-line-through rate'>{data.actual_price}</span>
                                                <button className='sales-offer'>{data.discount_price} off</button>
                                                <hr />
                                                <p>{productIdDetails.description}</p>
                                                <span className="mb-3 count-btn">
                                                    <button
                                                        className="btn sum-btn"
                                                        type="button"
                                                        onClick={handleDecrement}
                                                    >
                                                        -
                                                    </button>
                                                    <span className='mx-4 count-value'>{singleItemCount}</span>
                                                    <button
                                                        className="btn sum-btn"
                                                        type="button"
                                                        onClick={handleIncrement}
                                                    >
                                                        +
                                                    </button>
                                                </span>
                                                <h4 className='cate my-4'>Category:<span> Indoor Plant</span></h4>
                                            </>
                                        )
                                    })}

                                </div>
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
                                            <h6 className=''>Price ({singleItemCount} item):</h6>
                                        </div>
                                        <div className='col-6 text-end'>
                                            <h6 className=''>{singleItemPrice}</h6>
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
                                        <h3 className=''>{singleItemPrice}</h3>
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