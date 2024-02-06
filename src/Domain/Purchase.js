import React, { useEffect, useState } from 'react';
import Header from '../Common/pages/Header'
import Footer from '../Common/pages/Footer'
import Useraside from '../Common/pages/Useraside'
import { useSelector, useDispatch } from 'react-redux';

import Rating from 'react-rating';


// css file include path 
import '../Common/assets/css/profile.css'

// fontawesome 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons';

// image path 
import plant1 from '../Common/assets/image/description4.png'
import Ratings from '../Common/assets/image/Rating.png'
import deletes from '../Common/assets/image/delete.png'

// state value action process 
import { setshopcount, settotalItemShop, setShopProducts, setfinalItemPrice } from '../Redux/CreateSlice';

function Purchase() {
    // state value declear 
    const { shopProducts, shopcount, totalItemShop, finalItemPrice } = useSelector((state) => state.usedbookr_product)

    const dispatch = useDispatch();

    // total amount declear 
    const total_amount = shopProducts.map((data) => { return data.amount })
    const final_amount = total_amount.reduce((accumulator, currentValue) => {
        const num = parseFloat(currentValue);
        return accumulator + num;
    }, 0);

    // increment in product count 
    const itemIncrement = (id) => {
        const updatedProductItems = shopProducts.map(item => {
            if (item.id === id) {
                const updatedQty = item.qty + 1;
                const updatedAmount = item.total_price * updatedQty;
                const quatity = { ...item, qty: item.qty + 1, amount: updatedAmount };
                return quatity
            }
            return item;
        });
        dispatch(setShopProducts(updatedProductItems));
        dispatch(settotalItemShop(totalItemShop + 1))
    };

    // decrement in product count 
    const itemDecrement = (id) => {
        const updatedProductItems = shopProducts.map(item => {
            if (item.id === id) {
                const updatedQty = item.qty - 1;
                const updatedAmount = item.total_price * updatedQty;
                const quatity = { ...item, qty: item.qty - 1, amount: updatedAmount };
                return quatity
            }
            return item;
        });
        dispatch(setShopProducts(updatedProductItems));
        dispatch(settotalItemShop(totalItemShop - 1))
    };

    // delete the product item
    const deleteitem = (id, qty, title) => {
        const updatedItems = shopProducts.filter(item =>
            item.id !== id

        );
        dispatch(setShopProducts(updatedItems))
        dispatch(settotalItemShop(totalItemShop - qty + 1))
        dispatch(setshopcount(shopcount - 1))
    };

    return (
        <div className='purchase-section'>
            <Header />
            <div className='account-section'>
                <div className='d-lg-block d-none'>
                    <div className='container-90 pt-5'>
                        <span className='profile-head'>My Shopping Cart</span>
                        <div className='row m-0 py-3'>

                            <div className='col-3'>
                                <Useraside />
                            </div>
                            <div className='col-6'>
                                <div className='profile-card order-card'>
                                    {shopProducts.length > 0 ?
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
                                                    {shopProducts && shopProducts.map((data, index) => {
                                                        return (
                                                            <tr className='total-wish'>
                                                                <td className='wish-product'>
                                                                    <div className='row m-0 pt-2'>
                                                                        <div className='col-4 py-4'>
                                                                            <img src={plant1} alt='plant1' className='w-100' />
                                                                        </div>
                                                                        <div className='col-8 py-4'>
                                                                            <h5>{data.title}</h5>
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
                                                                        <button onClick={() => itemDecrement(data.id)}>-</button>
                                                                        <a className='mx-2 text-decoration-none'>{data.qty}</a>
                                                                        <button onClick={() => itemIncrement(data.id)}>+</button>
                                                                    </span>
                                                                </td>
                                                                <td className='py-5 text-center'><a className='text-decoration-none price-count'>{data.amount}</a><FontAwesomeIcon icon={faTrash} style={{ color: '#EA4B48' }} className='ps-3' onClick={() => deleteitem(data.id, data.qty, data.title)} /></td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </> :
                                        <><h1 className='text-center'>No Shop Product</h1></>
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
                                    <div className='packing-card p-4'>
                                        <h2>Cart Total</h2>
                                        <div className='money-details'>
                                            <div className='row m-0'>
                                                <div className='col-6'>
                                                    <h6 className=''>No.of.Item :</h6>
                                                </div>
                                                <div className='col-6 text-end'>
                                                    <h6 className=''>{shopcount + totalItemShop}</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='money-details'>
                                            <div className='row m-0'>
                                                <div className='col-6'>
                                                    <h6 className=''>Subtotal :</h6>
                                                </div>
                                                <div className='col-6 text-end'>
                                                    <h6 className=''>{Math.round(final_amount)}</h6>
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
                                                <h3 className=''>{Math.round(final_amount)}</h3>
                                            </div>
                                        </div>
                                        <div className='text-center'>
                                            <button className='process-check'>Proceed to checkout</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-lg-none d-md-block d-none'>
                    <Useraside />
                    <div className='pt-5'>
                        <div className='row m-0 py-3'>
                            <div className='col-12 py-5'>
                                <span className='profile-head'>My Shopping Cart</span>
                            </div>
                            <div className='col-8'>
                                <div className='profile-card order-card'>
                                    {shopProducts.length > 0 ?
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
                                                    {shopProducts && shopProducts.map((data, index) => {
                                                        return (
                                                            <tr className='total-wish'>
                                                                <td className='wish-product'>
                                                                    <div className='row m-0 pt-2'>
                                                                        <div className='col-12 py-4'>
                                                                            <img src={plant1} alt='plant1' className='w-100' />
                                                                            <h5>Book</h5>
                                                                            <Rating
                                                                                initialRating={4}
                                                                                emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                                                                fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                                                                readonly={true}
                                                                            />
                                                                        </div>
                                                                        {/* <div className='col-8 py-4'>
                                                                            <img src={Rating} />
                                                                            <h5>{data.total_price}</h5>
                                                                        </div> */}
                                                                    </div>
                                                                </td>
                                                                <td className='py-5 px-0 sum-product'>
                                                                    <span>
                                                                        <button onClick={() => itemDecrement(data.id)}>-</button>
                                                                        <a className='mx-2 text-decoration-none'>{data.qty}</a>
                                                                        <button onClick={() => itemIncrement(data.id)}>+</button>
                                                                    </span>
                                                                </td>
                                                                <td className='py-5 text-center'><a className='text-decoration-none price-count'>{data.amount}</a><FontAwesomeIcon icon={faTrash} style={{ color: '#EA4B48' }} className='ps-3' onClick={() => deleteitem(data.id, data.qty, data.title)} /></td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </> :
                                        <><h1 className='text-center'>No Shop Product</h1></>
                                    }

                                </div>
                            </div>
                            <div className='col-4'>
                                <div className='purchase-list'>
                                    <p>Coupon Code</p>
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter code" aria-label="Search" aria-describedby="searchButton" />
                                        <button className="btn" type="button" id="searchButton">Apply Coupon</button>
                                    </div>
                                    <div className='packing-card p-1'>
                                        <h2>Cart Total</h2>
                                        <div className='money-details'>
                                            <div className='row m-0'>
                                                <div className='col-6'>
                                                    <h6 className=''>No.of.Item :</h6>
                                                </div>
                                                <div className='col-6 text-end'>
                                                    <h6 className=''>{shopcount + totalItemShop}</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='money-details'>
                                            <div className='row m-0'>
                                                <div className='col-6'>
                                                    <h6 className=''>Subtotal :</h6>
                                                </div>
                                                <div className='col-6 text-end'>
                                                    <h6 className=''>{Math.round(final_amount)}</h6>
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
                                                <h3 className=''>{Math.round(final_amount)}</h3>
                                            </div>
                                        </div>
                                        <div className='text-center'>
                                            <button className='process-check'>Proceed to checkout</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-lg-none d-md-none d-sm-block d-none'>
                    <Useraside />
                    <div className='pt-5'>
                        <div className='row m-0 py-3'>
                            <div className='col-12 py-5'>
                                <span className='profile-head'>My Shopping Cart</span>
                            </div>
                            <div className='col-12'>
                                <div className='profile-card order-card'>
                                    {shopProducts.length > 0 ?
                                        <>
                                            <div className='profile-card order-card'>
                                                {shopProducts.length > 0 ?
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
                                                                {shopProducts && shopProducts.map((data, index) => {
                                                                    return (
                                                                        <tr className='total-wish'>
                                                                            <td className='wish-product'>
                                                                                <div className='row m-0 pt-2'>
                                                                                    <div className='col-12 py-4'>
                                                                                        <img src={plant1} alt='plant1' className='w-100' />
                                                                                        <h5>Book</h5>
                                                                                        <Rating
                                                                                            initialRating={4}
                                                                                            emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                                                                            fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                                                                            readonly={true}
                                                                                        />
                                                                                    </div>
                                                                                    {/* <div className='col-8 py-4'>
                                                                            <img src={Rating} />
                                                                            <h5>{data.total_price}</h5>
                                                                        </div> */}
                                                                                </div>
                                                                            </td>
                                                                            <td className='py-5 px-0 sum-product'>
                                                                                <span>
                                                                                    <button onClick={() => itemDecrement(data.id)}>-</button>
                                                                                    <a className='mx-2 text-decoration-none'>{data.qty}</a>
                                                                                    <button onClick={() => itemIncrement(data.id)}>+</button>
                                                                                </span>
                                                                            </td>
                                                                            <td className='py-5 text-center'><a className='text-decoration-none price-count'>{data.amount}</a><FontAwesomeIcon icon={faTrash} style={{ color: '#EA4B48' }} className='ps-3' onClick={() => deleteitem(data.id, data.qty, data.title)} /></td>
                                                                        </tr>
                                                                    )
                                                                })}
                                                            </tbody>
                                                        </table>
                                                    </> :
                                                    <><h1 className='text-center'>No Shop Product</h1></>
                                                }

                                            </div>
                                        </> :
                                        <><h1 className='text-center'>No Shop Product</h1></>
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
                                    <div className='packing-card p-1'>
                                        <h2>Cart Total</h2>
                                        <div className='money-details'>
                                            <div className='row m-0'>
                                                <div className='col-6'>
                                                    <h6 className=''>No.of.Item :</h6>
                                                </div>
                                                <div className='col-6 text-end'>
                                                    <h6 className=''>{shopcount + totalItemShop}</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='money-details'>
                                            <div className='row m-0'>
                                                <div className='col-6'>
                                                    <h6 className=''>Subtotal :</h6>
                                                </div>
                                                <div className='col-6 text-end'>
                                                    <h6 className=''>{Math.round(final_amount)}</h6>
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
                                                <h3 className=''>{Math.round(final_amount)}</h3>
                                            </div>
                                        </div>
                                        <div className='text-center'>
                                            <button className='process-check'>Proceed to checkout</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-lg-none d-md-none d-sm-none d-block'>
                    <Useraside />
                    <div className='pt-5'>
                        <div className='row m-0 py-3'>
                            <div className='col-12 py-5'>
                                <span className='profile-head'>My Shopping Cart</span>
                            </div>
                            <div className='col-12'>
                                <div class="card" >
                                    <img src={plant1} class="card-img-top" alt="..." />
                                    <div class="card-body">
                                        <h5 class="card-title">Book</h5>
                                        <div className='py-3 px-0 sum-product'>
                                            <span>
                                                <button onClick={() => itemDecrement(1)}>-</button>
                                                <a className='mx-2 text-decoration-none'>{1}</a>
                                                <button onClick={() => itemIncrement(1)}>+</button>
                                            </span>
                                        </div>
                                        <Rating
                                            initialRating={4}
                                            emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                            fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                            readonly={true}
                                        />
                                        <span className='py-5 text-center'><a className='text-decoration-none price-count'>{ }</a><FontAwesomeIcon icon={faTrash} style={{ color: '#EA4B48' }} className='ps-3' onClick={() => deleteitem(1, 1, 1)} /></span>

                                    </div>
                                </div>
                            </div>
                            <div className='col-12 py-5'>
                                <div className='purchase-list'>
                                    <p>Coupon Code</p>
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Enter code" aria-label="Search" aria-describedby="searchButton" />
                                        <button className="btn" type="button" id="searchButton">Apply Coupon</button>
                                    </div>
                                    <div className='packing-card p-1'>
                                        <h2>Cart Total</h2>
                                        <div className='money-details'>
                                            <div className='row m-0'>
                                                <div className='col-6'>
                                                    <h6 className=''>No.of.Item :</h6>
                                                </div>
                                                <div className='col-6 text-end'>
                                                    <h6 className=''>{shopcount + totalItemShop}</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='money-details'>
                                            <div className='row m-0'>
                                                <div className='col-6'>
                                                    <h6 className=''>Subtotal :</h6>
                                                </div>
                                                <div className='col-6 text-end'>
                                                    <h6 className=''>{Math.round(final_amount)}</h6>
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
                                                <h3 className=''>{Math.round(final_amount)}</h3>
                                            </div>
                                        </div>
                                        <div className='text-center'>
                                            <button className='process-check'>Proceed to checkout</button>
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