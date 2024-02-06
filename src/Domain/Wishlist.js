import React, { useEffect, useState } from 'react';
import Header from '../Common/pages/Header'
import Footer from '../Common/pages/Footer'
import Useraside from '../Common/pages/Useraside'

import Rating from 'react-rating';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import '../Common/assets/css/profile.css'

// image path 
import plant1 from '../Common/assets/image/description4.png'
// import Rating from '../Common/assets/image/Rating.png'
import cancel from '../Common/assets/image/cancel.png'

import { useSelector, useDispatch } from 'react-redux';
import { setClass1Hide, setLikedProducts, setlikescount } from '../Redux/CreateSlice';


function Wishlist() {
    const { likedProducts, likescount } = useSelector((state) => state.usedbookr_product);
    const dispatch = useDispatch();

    const [statuslevel, setStatusLevel] = useState(true)

    const deleteitem = (id) => {
        const updatedItems = likedProducts.filter(item =>
            item.id !== id

        );
        dispatch(setLikedProducts(updatedItems))
        dispatch(setlikescount(likescount - 1))
    };
    useEffect(() => {
        dispatch(setClass1Hide(false))
        window.scrollTo(0, 0);
    }, [])
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
                                {likedProducts.length > 0 ? <>
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
                                            {likedProducts && likedProducts.map((data, index) => {
                                                return (
                                                    <>
                                                        <tr className='total-wish'>
                                                            <td className='wish-product'>
                                                                <div className='row m-0 pt-2'>
                                                                    <div className='col-4 p-0'>
                                                                        <img src={plant1} alt='plant1' className='w-100' />
                                                                    </div>
                                                                    <div className='col-8 py-4'>
                                                                        <h5>Book</h5>
                                                                        <Rating
                                                                            initialRating={4}
                                                                            emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                                                            fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                                                            readonly={true}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className='py-5'><h6>INR 100</h6></td>
                                                            <td className='py-5'><h3>In Stock</h3></td>
                                                            <td className='py-5'><button>Move to Cart</button><img src={cancel} className='ms-2' onClick={() => deleteitem(data.id)} /></td>
                                                        </tr>
                                                    </>
                                                )
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
                <div className='d-md-block d-none'>
                    <Useraside />
                    <div className='container-90 pt-5'>
                        <div className='row m-0 py-3 wishlist-product'>
                            <div className='col-12 py-3'>
                                <span className='profile-head'>My Wishlist</span>
                            </div>
                            <div className='col-12 p-0 order-card'>
                                {likedProducts.length > 0 ? <>
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
                                            {likedProducts && likedProducts.map((data, index) => {
                                                return (
                                                    <>
                                                        <tr className='total-wish'>
                                                            <td className='wish-product'>
                                                                <div className='row m-0 pt-2'>
                                                                    <div className='col-4 p-0'>
                                                                        <img src={plant1} alt='plant1' className='w-100' />
                                                                    </div>
                                                                    <div className='col-8 py-4'>
                                                                        <h5>Book</h5>
                                                                        <Rating
                                                                            initialRating={4}
                                                                            emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                                                            fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                                                            readonly={true}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className='py-5'><h6>INR 100</h6></td>
                                                            <td className='py-5'><h3>In Stock</h3></td>
                                                            <td className='py-5'><button>Move to Cart</button><img src={cancel} className='ms-2' onClick={() => deleteitem(data.id)} /></td>
                                                        </tr>
                                                    </>
                                                )
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
                <div className='d-lg-none d-md-none d-sm-block d-none'>
                    <Useraside />
                    <div className='pt-5'>
                        <div className='row m-0 py-3 wishlist-product'>
                            <div className='col-12 py-3'>
                                <span className='profile-head'>My Wishlist</span>
                            </div>
                            <div className='col-12 p-0 order-card'>
                                {likedProducts.length > 0 ? <>
                                    {likedProducts && likedProducts.map((data, index) => {
                                        return (
                                            <>
                                                <div className='row m-0'>
                                                    <div className='col-4'>
                                                        <img src={plant1} alt='plant1' className='w-100' />
                                                        <h5 className=''>Book</h5>
                                                        <Rating
                                                            initialRating={4}
                                                            emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                                            fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                                            readonly={true}
                                                        />
                                                    </div>
                                                    <div className='col-4 rate_details'>
                                                        <label>Price</label>
                                                        <h6>INR 100</h6>
                                                        <label>stock status</label><br />
                                                        <h3>In Stock</h3>
                                                    </div>
                                                    <div className='col-4'>
                                                        <td className='py-5'><button>Move to Cart</button><img src={cancel} className='ms-2' onClick={() => deleteitem(data.id)} /></td>
                                                    </div>

                                                </div>
                                            </>
                                        )
                                    })}

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
                <div className='d-lg-none d-md-none d-sm-none d-block'>
                    <Useraside />
                    <div className='pt-5'>
                        <div className='row m-0 py-3 wishlist-product'>
                            <div className='col-12 py-3'>
                                <span className='profile-head'>My Wishlist</span>
                            </div>
                            <div className='col-12 p-0 order-card'>
                                {likedProducts.length > 0 ? <>
                                    {likedProducts && likedProducts.map((data, index) => {
                                        return (
                                            <>
                                                <div className='row m-0'>
                                                    <div className='col-6'>
                                                        <img src={plant1} alt='plant1' className='w-100' />

                                                    </div>
                                                    <div className='col-6 p-0'>
                                                        <h5 className=''>Book</h5>
                                                        <Rating
                                                            initialRating={4}
                                                            emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                                            fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                                            readonly={true}
                                                        />
                                                        <h5 className='pt-4'><button>Move to Cart</button><img src={cancel} className='ms-2' onClick={() => deleteitem(data.id)} /></h5>

                                                    </div>
                                                    <div className='col-12 rate_details'>
                                                        <div className='row m-0'>
                                                            <div className='col-5'>
                                                                <label>Price</label><br />
                                                                <label>stock status</label><br />
                                                            </div>
                                                            <div className='col-7'>
                                                                <h6>INR 100</h6>
                                                                <h3>In Stock</h3>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })}

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