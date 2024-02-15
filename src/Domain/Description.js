import React, { useState, useEffect } from 'react';
import Header from '../Common/pages/Header'
import Footer from '../Common/pages/Footer'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import axios from 'axios'
import Rating from 'react-rating';


import '../Common/assets/css/description.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faShop } from '@fortawesome/free-solid-svg-icons';

// image path 
import description1 from '../Common/assets/image/description1.png'
import description2 from '../Common/assets/image/description2.png'
import description3 from '../Common/assets/image/description3.png'
import description4 from '../Common/assets/image/description4.png'
import star from '../Common/assets/image/Rating.png'
import shop from '../Common/assets/image/white-shop.png'
import blackshop from '../Common/assets/image/black-shop.png'
import likes from '../Common/assets/image/heart-like.png'
import unlike from '../Common/assets/image/heart-unlike.png'
import icon1 from '../Common/assets/image/footer-facebook.png'
import icon2 from '../Common/assets/image/footer-twitter.png'
import icon3 from '../Common/assets/image/footer-pinterest.png'
import icon4 from '../Common/assets/image/footer-instagram.png'
import plant3 from '../Common/assets/image/plant_3.png'
import rating from '../Common/assets/image/Rating.png'
import add from '../Common/assets/image/addcard.png'
import remove from '../Common/assets/image/removecard.png'
import arrive1 from '../Common/assets/image/arrive1.png'
import seller1 from '../Common/assets/image/seller1.png'

import { useNavigate, useParams } from 'react-router-dom';
import { setallBookDetails, setproductIdDetails, setLikedProducts, setlikeProduct, setlikescount, setShopProducts, setshopcount, setsingleItemCount, setClass1Hide } from '../Redux/CreateSlice';
import { useDispatch, useSelector } from 'react-redux';
import BestSeller from '../Common/pages/BestSeller';

function Description() {
    const { isLiked, isAdded, likedProducts, likescount, singleProductView, shopProducts, shopcount, productIdDetails, singleItemCount } = useSelector((state) => state.usedbookr_product)
    const [value, setValue] = useState(1);
    const [showAll, setShowAll] = useState(false);
    const [showLess, setShowLess] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const review = [
        {
            "author_name": "Tevita Taufoou",
            "author_url": "https://www.google.com/maps/contrib/105937236918123663309/reviews",
            "language": "en",
            "profile_photo_url": "https://lh3.googleusercontent.com/a/AATXAJwZANdRSSg96QeZG--6BazG5uv_BJMIvpZGqwSz=s128-c0x00000000-cc-rp-mo",
            "rating": 1,
            "relative_time_description": "6 months ago",
            "text": "I need help.  Google Australia is taking my money. Money I don't have any I am having trouble sorting this issue out",
            "time": "2min",
        },
        {
            "author_name": "Jordy Baker",
            "author_url": "https://www.google.com/maps/contrib/102582237417399865640/reviews",
            "language": "en",
            "profile_photo_url": "https://lh3.googleusercontent.com/a/AATXAJwgg1tM4aVA4nJCMjlfJtHtFZuxF475Vb6tT74S=s128-c0x00000000-cc-rp-mo",
            "rating": 3,
            "relative_time_description": "4 months ago",
            "text": "I have literally never been here in my life, I am 17 and they are taking money I don't have for no reason.\n\nThis is not ok. I have rent to pay and my own expenses to deal with and now this.",
            "time": '25min',
        },
        {
            "author_name": "Prem Rathod",
            "author_url": "https://www.google.com/maps/contrib/115981614018592114142/reviews",
            "language": "en",
            "profile_photo_url": "https://lh3.googleusercontent.com/a/AATXAJyEQpqs4YvPPzMPG2dnnRTFPC4jxJfn8YXnm2gz=s128-c0x00000000-cc-rp-mo",
            "rating": 4.5,
            "relative_time_description": "4 months ago",
            "text": "Terrible service. all reviews are fake and irrelevant. This is about reviewing google as business not the building/staff etc.",
            "time": '1h 2mins',
        },
    ]
    const showReview = () => {
        setShowAll(!showAll);
        setShowLess(!showLess)
    };
    const handleLessMore = () => {
        setShowLess(!showLess)
        setShowAll(!showAll);
    };
    const params = useParams()
    const handleIncrement = () => {
        setValue(value + 1);
        // const milliseconds = 1641389490 * 1000;

        // const dateObject = new Date(milliseconds);

        // // Get the minutes from the Date object
        // const minutes = dateObject.getMinutes();
        // console.log(minutes)
    };
    const handleDecrement = () => {
        setValue(value - 1);
    };
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
            // dispatch(setproductitemDetails([...product_item,{...data,id,amount:price,qty:1}]))
            dispatch(setShopProducts([...shopProducts, { ...product, id, amount: price, qty: 1 }]));
            dispatch(setshopcount(shopcount + 1))
            navigate('/Purchase')
        }
    };

    const buynow = () => {
        dispatch(setsingleItemCount(singleItemCount + 1))
        navigate('/Placeorder')
    }
    const product_add = () => {

    }
    const product_remove = () => {

    }
    const product_like = () => {
    }
    const all_product = () => {
        navigate('/Allproduct')
    }
    const plantproduct = async () => {
        // const { data } = await axios.get('https://webbitech.co.in/ecommerce/public/api/productlist');
        //   dispatch(setallBookDetails(data.data))
        // const { data } = await axios.get('https://fakestoreapi.com/products');
        // dispatch(setallBookDetails(data.data))

    }
    const [activeTab, setActiveTab] = useState('tab1');

    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    const removecards = () => {
        alert("Remove this Book in  Shoplist")
    }

    useEffect(() => {
        dispatch(setproductIdDetails(productIdDetails))
        dispatch(setClass1Hide(false))
        window.scrollTo(0, 0);
    }, [])
    return (
        <div className='description-section'>
            <Header />
            <section className='description container-100 pb-5'>
                <div className='d-lg-block d-none'>
                    <div className='row m-0 bg-white p-3'>
                        {singleProductView && singleProductView.map((data) => {
                            return (
                                <>
                                    <div className='col-6'>
                                        <div className='row m-0'>
                                            <div className='col-12 w-75 h-25 mx-auto'>
                                                <img src={data.image} className='w-100' />
                                            </div>
                                        </div>
                                        {/* <div className='text-center'>
                                            <button className='buynow'>Add to Cart <img src={shop} alt='shop' className='mx-2 p-0' /></button>
                                            <button className='buynow' onClick={() => buynow()}>Buy Now <FontAwesomeIcon icon={faShop} className='mx-2' /></button>
                                        </div> */}
                                    </div>
                                    <div className='col-6 description-details'>
                                        <>
                                            <h1>{data.title}<span className='stock'>In Stock</span></h1>
                                            <p>{data.authors[0]}</p>
                                            <img src={star} alt='star' />
                                            <span className='review'>4 Reviews</span>
                                            <br />
                                            <span className='price pe-2'>INR {data.msrp}</span><span className='text-decoration-line-through rate'>AED 20.99</span>
                                            <button className='sales-offer'>50% off</button>
                                            <hr />
                                            <p>{data.synopsis}</p>
                                            <div className='condition-level my-3'>
                                                <h1><span>Binding type</span></h1>
                                                <button className='very'>{data.binding}</button>
                                            </div>
                                            <div className='condition-level my-3'>
                                                <h1><span>Condition</span> - Very Good (100+ in Stock)</h1>
                                                <button className='very'>Very good</button>
                                                <button className='very mx-2'>Good</button>
                                                <button className='very'>Well Read</button>
                                                <button className='very ms-2'>Bad</button>
                                            </div>
                                            <div className='my-5'>
                                                {/* <span className="mb-4 count-btn">
                                                    {value == 1 ? <><button className="btn sum-btn" type="button" disabled>-</button></> : <><button className="btn sum-btn" type="button" onClick={handleDecrement}>-</button></>}
                                                    <span onChange={(e) => setValue(parseInt(e.target.value, 10) || 0)} className='mx-4 count-value'>{value}</span>
                                                    {totalshops.includes(data.id) ? <><button className="btn sum-btn" type="button" onClick={()=>removecards()}>+</button></> : <><button className="btn sum-btn" type="button" onClick={handleIncrement}>+</button></>}
                                                </span> */}
                                                <span className='text-center'>
                                                    {/* <button className='buynow'>Add to Cart <img src={shop} alt='shop' className='mx-2 p-0' /></button> */}
                                                    <button className='buynow' onClick={() => buynow()}>Buy Now <FontAwesomeIcon icon={faShop} className='mx-2' /></button>
                                                </span>
                                                {value == 1 ? <><button className={totalshops.includes(data.id) ? 'shop-card' : 'shop-card'} onClick={() => handleShopClick(data, data.id, data.msrp)}>{totalshops.includes(data.id) ? <>Remove to Cart</> : <>Add to Cart</>} <FontAwesomeIcon icon={faBagShopping} className='ms-2' /></button></> : <><button className="disabled-shop" disabled>Add to card <FontAwesomeIcon icon={faBagShopping} /></button></>}
                                                {/* <span className='like-btn'><img src={totallikes.includes(data.id) ? likes : unlike} alt='heart' className='mx-2' onClick={() => handleLikeClick(data)} /></span> */}
                                                <h4 className='cate my-4'>Category:<span className='ms-2'>Lifestyle</span></h4>
                                            </div>
                                        </>
                                    </div>
                                </>
                            )
                        })}

                    </div>
                </div>
                <div className='d-lg-none d-md-block d-none pt-5'>
                    <div className='row m-0'>
                        {singleProductView && singleProductView.map((data) => {
                            return (
                                <>
                                    <div className='col-5'>
                                        <div className='row m-0'>
                                            <div className='col-12'>
                                                <img src={data.image} className='w-100 h-100' />
                                            </div>
                                        </div>
                                        {/* <div className='text-center'>
                                            <button className='buynow'>Add to Cart <img src={shop} alt='shop' className='mx-2 p-0' /></button>
                                            <button className='buynow' onClick={() => buynow()}>Buy Now <FontAwesomeIcon icon={faShop} className='mx-2' /></button>
                                        </div> */}
                                    </div>
                                    <div className='col-7 description-details'>
                                        <h1>{data.title} <span className='stock'>In Stock</span></h1>
                                        <p>{data.authors[0]}</p>
                                        <img src={star} alt='star' />
                                        <span className='review'>4 Reviews</span>
                                        <br />
                                        <span className='price pe-2'>INR {data.msrp}</span><span className='text-decoration-line-through rate'>AED 20.99</span>
                                        <button className='sales-offer'>50% off</button>
                                        <hr />
                                        <p>{data.synopsis}</p>

                                    </div>
                                    <div className='col-12 pt-1'>
                                        <div className='row m-0'>
                                            <div className='col-3'>
                                                <div className='condition-level my-3'>
                                                    <h1><span>Binding type</span></h1>
                                                    <button className='very'>{data.binding}</button>
                                                </div>
                                            </div>
                                            <div className='col-9'>
                                                <div className='condition-level my-3'>
                                                    <h1><span>Condition</span> - Very Good (100+ in Stock)</h1>
                                                    <button className='very'>Very good</button>
                                                    <button className='very mx-2'>Good</button>
                                                    <button className='very'>Well Read</button>
                                                    <button className='very ms-2'>Bad</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })}


                        <div className='col-12 description-details text-center mt-5'>
                            <>
                                <span className="mb-3 count-btn">
                                    <button
                                        className="btn sum-btn"
                                        type="button"
                                        onClick={handleDecrement}
                                    >
                                        -
                                    </button>
                                    <span onChange={(e) => setValue(parseInt(e.target.value, 10) || 0)} className='mx-4 count-value'>{value}</span>
                                    <button
                                        className="btn sum-btn"
                                        type="button"
                                        onClick={handleIncrement}
                                    >
                                        +
                                    </button>
                                </span>
                                <button className={totalshops.includes(1) ? 'add-card' : 'shop-card'} onClick={() => handleShopClick(1, 2, 3)}>Add to Cart <img src={totalshops.includes(1) ? shop : blackshop} alt='shop' className='mx-2 p-0' /></button>
                                <span className='like-btn'><img src={totallikes.includes(1) ? likes : unlike} alt='heart' className='mx-2' onClick={() => handleLikeClick(1)} /></span>
                                <h4 className='cate my-4'>Category:<span className='ms-2'>Lifestyle</span></h4>
                            </>
                        </div>
                    </div>

                </div>
                <div className='d-lg-none d-md-none d-block pt-5'>
                    <div className='row m-0'>
                        {singleProductView && singleProductView.map((data) => {
                            return (
                                <>
                                    <div className='col-12'>
                                        <div className='row m-0'>
                                            <div className='col-12 h-75'>
                                                <img src={data.image} className='w-100' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 description-details mt-5'>
                                        <h1>{data.title}<span className='stock'>In Stock</span></h1>
                                        <p>{data.authors[0]}</p>
                                        <img src={star} alt='star' />
                                        <span className='review'>4 Reviews</span>
                                        <br />
                                        <span className='price pe-2'>INR {data.msrp}</span><span className='text-decoration-line-through rate'>AED 20.99</span>
                                        <button className='sales-offer'>50% off</button>
                                        <hr />
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis nunc a molestie dictum. Mauris venenatis, felis scelerisque aliquet lacinia, nulla nisi venenatis odio, id blandit mauris ipsum id sapien.</p>
                                        <h4 className='cate my-4'>Category:<span className='ms-2'>Lifestyle</span></h4>
                                        <div className='condition-level my-3'>
                                            <h1><span>Binding type</span></h1>
                                            <button className='very'>{data.binding}</button>
                                        </div>
                                        <div className='condition-level my-4'>
                                            <h1><span>Condition</span> - Very Good (100+ in Stock)</h1>
                                            <button className='very'>Very good</button>
                                            <button className='very mx-2'>Good</button>
                                            <button className='very'>Well Read</button>
                                            <button className='very ms-2'>Bad</button>
                                        </div>
                                        <>
                                            <span className="mb-3 count-btn">
                                                <button
                                                    className="btn sum-btn"
                                                    type="button"
                                                    onClick={handleDecrement}
                                                >
                                                    -
                                                </button>
                                                <span onChange={(e) => setValue(parseInt(e.target.value, 10) || 0)} className='mx-4 count-value'>{value}</span>
                                                <button
                                                    className="btn sum-btn"
                                                    type="button"
                                                    onClick={handleIncrement}
                                                >
                                                    +
                                                </button>
                                            </span>
                                            <span className='d-md-block d-none'>
                                                <button className={totalshops.includes(1) ? 'add-card' : 'shop-card'} onClick={() => handleShopClick(1, 2, 3)}>Add to Cart <img src={totalshops.includes(1) ? shop : blackshop} alt='shop' className='mx-2 p-0' /></button>
                                            </span>
                                            <span className='d-md-none d-inline-block'>
                                                <button className={totalshops.includes(1) ? 'add-card' : 'shop-card'} onClick={() => handleShopClick(1, 2, 3)}><img src={totalshops.includes(1) ? shop : blackshop} alt='shop' className='mx-2 p-0' /></button>
                                            </span>
                                            {/* <button className={totalshops.includes(1) ? 'add-card' : 'shop-card'} onClick={() => handleShopClick(1, 2, 3)}>Add to Cart <img src={totalshops.includes(1) ? shop : blackshop} alt='shop' className='mx-2 p-0' /></button> */}
                                            <span className='like-btn'><img src={totallikes.includes(1) ? likes : unlike} alt='heart' className='mx-2' onClick={() => handleLikeClick(1)} /></span>
                                            <div className='text-center my-5'>
                                                {/* <button className='buynow'>Add to Cart <img src={shop} alt='shop' className='mx-2 p-0' /></button> */}
                                                <button className='buynow' onClick={() => buynow()}>Buy Now <FontAwesomeIcon icon={faShop} className='mx-2' /></button>
                                            </div>
                                        </>
                                    </div>
                                </>
                            )
                        })}
                    </div>

                </div>
                <div className='tab-details mt-lg-5 mt-md-4 mt-3'>
                    <Nav tabs>
                        <NavItem className='plant-content'>
                            <NavLink
                                className={activeTab === 'tab1' ? 'active' : ''}
                                onClick={() => toggleTab('tab1')}
                            >
                                Descriptions
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={activeTab === 'tab2' ? 'active' : ''}
                                onClick={() => toggleTab('tab2')}
                            >
                                Additional Information
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={activeTab === 'tab3' ? 'active' : ''}
                                onClick={() => toggleTab('tab3')}
                            >
                                Customer Feedback
                            </NavLink>
                        </NavItem>
                        {/* Add more tabs as needed */}
                    </Nav>
                    <TabContent activeTab={activeTab} className='mt-3'>
                        <TabPane tabId="tab1">
                            <div className='row m-0 tab-content flex-wrap-reverse'>
                                {singleProductView.map((data) => {
                                    return (
                                        <>
                                            <div className='col-lg-6 col-md-6 col-12 mt-5'>
                                                <h1>{data.title}</h1>
                                                <p>{data.synopsis}</p>
                                            </div>
                                            <div className='col-lg-6 col-md-6 col-12 mt-5'>
                                                <img className='w-100 ' height={500} src={data.image} />
                                                {/* <iframe className='rounded' width="100%" height="500" src={data.image} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
                                            </div>
                                        </>
                                    )
                                })}

                            </div>
                        </TabPane>
                        <TabPane tabId="tab2">
                            <div className='row m-0 tab-content'>
                                <div className='col-lg-6 col-md-6 col-12 mt-5'>
                                    <div className='row m-0 additional'>
                                        {/* <ul className='additional'>
                                            <li className='nav-item'><label>SKU :</label> <span>GOR007119845</span></li>
                                            <li className='nav-item'><label>ISBN 13  :</label> <span>9781782943099</span></li>
                                            <li className='nav-item'><label>ISBN 10 :</label> <span>1782943099</span></li>
                                            <li className='nav-item'><label>TITLE :</label> <span>Grade 9-1 GCSE English Text Guide</span></li>
                                            <li className='nav-item'><label>AUTHOR :</label> <span>CGP Books</span></li>
                                            <li className='nav-item'><label>CONDITION :</label> <span>Used - Very Good</span></li>
                                            <li className='nav-item'><label>BINDING TYPE :</label> <span>Hardback</span></li>
                                        </ul> */}
                                        {singleProductView.map((data) => {
                                            return (
                                                <>
                                                    <div className='col-4 mt-4'>
                                                        <label>TITLE :</label>
                                                    </div>
                                                    <div className='col-8 mt-4'>
                                                        <span>{data.title}</span>
                                                    </div>
                                                    <div className='col-4 mt-4'>
                                                        <label>DATE OF PUBLISHED :</label>
                                                    </div>
                                                    <div className='col-8 mt-4'>
                                                        <span>{data.date_published}</span>
                                                    </div>
                                                    <div className='col-4 mt-4'>
                                                        <label>PUBLISHER :</label>
                                                    </div>
                                                    <div className='col-8 mt-4'>
                                                        <span>{data.publisher}</span>
                                                    </div>
                                                    <div className='col-4 mt-4'>
                                                        <label>AUTHOR :</label>
                                                    </div>
                                                    <div className='col-8 mt-4'>
                                                        <span>{data.authors[0]}</span>
                                                    </div>
                                                    <div className='col-4 mt-4'>
                                                        <label>MSRP :</label>
                                                    </div>
                                                    <div className='col-8 mt-4'>
                                                        <span>{data.msrp}</span>
                                                    </div>
                                                    <div className='col-4 mt-4'>
                                                        <label>EDITION :</label>
                                                    </div>
                                                    <div className='col-8 mt-4'>
                                                        <span>{data.edition}</span>
                                                    </div>
                                                    <div className='col-4 mt-4'>
                                                        <label>CONDITION TYPE:</label>
                                                    </div>
                                                    <div className='col-8 mt-4'>
                                                        <span>good</span>
                                                    </div>
                                                    <div className='col-4 mt-4'>
                                                        <label>BINDING TYPE :</label>
                                                    </div>
                                                    <div className='col-8 mt-4'>
                                                        <span>{data.binding}</span>
                                                    </div>

                                                </>
                                            )
                                        })}

                                    </div>
                                </div>
                                <div className='col-lg-6 col-md-6 col-12 mt-lg-5 mt-md-5 mt-sm-0 mt-0'>
                                    {/* <iframe className='rounded' width="100%" height="315" src="https://www.youtube.com/embed/jp4xdxcc7WU?si=bUpj3Gg3QC0u5uLK" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
                                    <div className='row m-0 additional'>
                                        {singleProductView.map((data) => {
                                            return (
                                                <>

                                                    <div className='col-4 mt-4'>
                                                        <label>ISBN:</label>
                                                    </div>
                                                    <div className='col-8 mt-4'>
                                                        <span>{data.isbn}</span>
                                                    </div>
                                                    <div className='col-4 mt-4'>
                                                        <label>ISBN 13 :</label>
                                                    </div>
                                                    <div className='col-8 mt-4'>
                                                        <span>{data.isbn13}</span>
                                                    </div>
                                                    <div className='col-4 mt-4'>
                                                        <label>ISBN 10 :</label>
                                                    </div>
                                                    <div className='col-8 mt-4'>
                                                        <span>{data.isbn10}</span>
                                                    </div>
                                                    <div className='col-4 mt-4'>
                                                        <label>LANGUAGE :</label>
                                                    </div>
                                                    <div className='col-8 mt-4'>
                                                        <span>{data.language}</span>
                                                    </div>
                                                    <div className='col-4 mt-4'>
                                                        <label>DIMENSION :</label>
                                                    </div>
                                                    <div className='col-8 mt-4'>
                                                        <span>{data.dimensions}</span>
                                                    </div>
                                                    <div className='col-4 mt-4'>
                                                        <label>WEIGHT :</label>
                                                    </div>
                                                    <div className='col-8 mt-4'>
                                                        <span>{data.dimensions_structured.weight.value}</span>
                                                    </div>
                                                    <div className='col-4 mt-4'>
                                                        <label>PAGES :</label>
                                                    </div>
                                                    <div className='col-8 mt-4'>
                                                        <span>{data.pages}</span>
                                                    </div>
                                                </>
                                            )
                                        })}

                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tabId="tab3">
                            {review.slice(0, showAll ? review.length : 2).map((data, index) => {
                                return (
                                    <div className='container-80 pt-3 review'>
                                        <div className='row m-0'>
                                            <div className='col-lg-9 col-md-9 col-12'>
                                                <div className='d-flex'>
                                                    <div className='w-50'>
                                                        <img src={data.profile_photo_url} className='w-50 pe-4' />
                                                    </div>
                                                    <div className='w-75'>
                                                        <h6>{data.author_name}</h6>
                                                        <Rating
                                                            initialRating={data.rating}
                                                            emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                                            fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                                            readonly={true}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-lg-3 col-md-3 col-12'>
                                                <p>{data.relative_time_description}</p>
                                            </div>
                                            <div className='col-12'>
                                                <p>{data.text}</p>
                                            </div>
                                        </div>
                                        <hr className='' />
                                    </div>
                                )
                            })}
                            <div className='container-80'>
                                {!showAll && (
                                    <button className='show-more hover' onClick={showReview}>Show more </button>
                                )}
                                {showLess && (
                                    <button className='show-more hover' onClick={handleLessMore}>Less</button>
                                )}
                            </div>

                        </TabPane>
                        {/* Add more TabPanes as needed */}
                    </TabContent>
                </div>
                <div className='best-seller mt-5'>
                    <h1 className='product-title text-center pt-5'>Related Products</h1>
                    {/* <div className='row m-0  py-5'>
                        <div className='col-lg-3 col-sm-6 col-12 py-2'>
                            <div className={isAdded ? 'normal-box' : 'box-view'}>
                                <button className='sales-offer mt-3 mx-2'>Sale 50%</button>
                                <span className='float-end m-2'><img src={isLiked ? likes : arrive1} alt="Like Button" onClick={() => product_like()} /></span>
                                <img src={seller1} className='w-100 px-4' />
                                <div class="row m-0 pt-4 product-details">
                                    <div class="col-9">
                                        <h5>Blumenerde</h5>
                                        <span className='price pe-2'>AED 14.99</span><span className='text-decoration-line-through rate'>AED 20.99</span>
                                        <img src={rating} />
                                    </div>
                                    <div class="col-3">
                                        {isAdded ? (<><img src={add} alt="Like Button" onClick={() => product_add()} /></>) : (<> <img src={remove} alt="Remove Button" onClick={() => product_remove()} /> </>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-3 col-sm-6 col-12 py-2'>
                            <div className={isAdded ? 'normal-box' : 'box-view'}>
                                <button className='sales-offer mt-3 mx-2'>Sale 50%</button>
                                <span className='float-end m-2'><img src={isLiked ? likes : arrive1} alt="Like Button" onClick={() => product_like()} /></span>
                                <img src={seller1} className='w-100 px-4' />
                                <div class="row m-0 pt-4 product-details">
                                    <div class="col-9">
                                        <h5>Blumenerde</h5>
                                        <span className='price pe-2'>AED 14.99</span><span className='text-decoration-line-through rate'>AED 20.99</span>
                                        <img src={rating} />
                                    </div>
                                    <div class="col-3">
                                        {isAdded ? (<><img src={add} alt="Like Button" onClick={() => product_add()} /></>) : (<> <img src={remove} alt="Remove Button" onClick={() => product_remove()} /> </>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-3 col-sm-6 col-12 py-2'>
                            <div className={isAdded ? 'normal-box' : 'box-view'}>
                                <button className='sales-offer mt-3 mx-2'>Sale 50%</button>
                                <span className='float-end m-2'><img src={isLiked ? likes : arrive1} alt="Like Button" onClick={() => product_like()} /></span>
                                <img src={seller1} className='w-100 px-4' />
                                <div class="row m-0 pt-4 product-details">
                                    <div class="col-9">
                                        <h5>Blumenerde</h5>
                                        <span className='price pe-2'>AED 14.99</span><span className='text-decoration-line-through rate'>AED 20.99</span>
                                        <img src={rating} />
                                    </div>
                                    <div class="col-3">
                                        {isAdded ? (<><img src={add} alt="Like Button" onClick={() => product_add()} /></>) : (<> <img src={remove} alt="Remove Button" onClick={() => product_remove()} /> </>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-3 col-sm-6 col-12 py-2'>
                            <div className={isAdded ? 'normal-box' : 'box-view'}>
                                <button className='sales-offer mt-3 mx-2'>Sale 50%</button>
                                <span className='float-end m-2'><img src={isLiked ? likes : arrive1} alt="Like Button" onClick={() => product_like()} /></span>
                                <img src={seller1} className='w-100 px-4' />
                                <div class="row m-0 pt-4 product-details">
                                    <div class="col-9">
                                        <h5>Blumenerde</h5>
                                        <span className='price pe-2'>AED 14.99</span><span className='text-decoration-line-through rate'>AED 20.99</span>
                                        <img src={rating} />
                                    </div>
                                    <div class="col-3">
                                        {isAdded ? (<><img src={add} alt="Like Button" onClick={() => product_add()} /></>) : (<> <img src={remove} alt="Remove Button" onClick={() => product_remove()} /> </>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <BestSeller />
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Description