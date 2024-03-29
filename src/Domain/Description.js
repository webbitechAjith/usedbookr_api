import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from '../Common/pages/Header'
import Footer from '../Common/pages/Footer'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import axios from 'axios'
import Rating from 'react-rating';


import '../Common/assets/css/description.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faShop } from '@fortawesome/free-solid-svg-icons';


import { setallBookDetails, setproductIdDetails, setLikedProducts, setlikeProduct, setlikescount, setShopProducts, setshopcount, setsingleItemCount, setClass1Hide, setSingleProductPrice, setAuthorsName } from '../Redux/CreateSlice';
import { useDispatch, useSelector } from 'react-redux';
import BestSeller from '../Common/pages/BestSeller';
import { addTocard_list, allbooks, bookdetails, bookdetailsview, removeTocard_list } from '../Common/pages/apiBaseurl';

function Description() {
    const { allbookDetails, isLiked, isAdded, userIdShop, likedProducts, likescount, singleProductView, singleProductPrice, shopProducts, shopcount, productIdDetails, singleItemCount } = useSelector((state) => state.usedbookr_product)
    const [value, setValue] = useState(1);
    const [bindingfilter, setBindingfilter] = useState('');
    const [conditionfilter, setConditionfilter] = useState('');
    const [showAll, setShowAll] = useState(false);
    const [showLess, setShowLess] = useState(false);
    const [activeTab, setActiveTab] = useState('tab1');
    const [singleBooks, setSingleBooks] = useState('')
    const [reviewRating, setReviewRating] = useState('')
    const [localStorageValue, setLocalStorage] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    // const location = useLocation();
    // const state_id = location.state.id;
    // const bookDetail = allbookDetails.find(data => data.id === params.id);
    // // dispatch(setallBookDetails(bookDetail))
    // console.log(allbookDetails)
    // if (!bookDetail) {
    //     // Handle case when book detail with provided id is not found
    //     return <div>Book not found</div>;
    //   }

    const showReview = () => {
        setShowAll(!showAll);
        setShowLess(!showLess)
    };
    const handleLessMore = () => {
        setShowLess(!showLess)
        setShowAll(!showAll);
    };
    const author_name = (name) => {
        dispatch(setAuthorsName(name))
        navigate('/authors')
    }

    // like product click fn 
    const totallikes = likedProducts.map((data) => data.id);

    // shop product click fn 
    const totalshops = shopProducts.map((data) => data.id);
    const handleShopClick = async (product, id, price) => {
        const auth_login = localStorage.getItem('usedbookrtoken')
        if (auth_login) {
            const isShops = product.id;
            // Check if the product ID is in the likedProducts array
            if (userIdShop?.some(data => data.id === id)) {
                // If it's already in userIdShop, perform the removal process
                dispatch(setShopProducts(shopProducts.filter((shopItems) => shopItems.id !== id)));
                dispatch(setshopcount(shopcount - 1));
                await removeTocard_list(id);
                window.location.reload();
            } else {
                // If it's not in userIdShop, perform the addition process
                if (singleProductPrice) {
                    await addTocard_list(product, 1);
                    dispatch(setallBookDetails([...allbookDetails, { ...product, id, original_price: parseFloat(singleProductPrice), amount: parseFloat(singleProductPrice), qty: 1 }]));
                    // dispatch(setshopcount(shopcount + 1));
                    navigate('/Purchase');
                } else {
                    await addTocard_list(product, 1);
                    dispatch(setallBookDetails([...allbookDetails, { ...product, id, amount: product.original_price + product.gst_charge, qty: 1 }]));
                    // dispatch(setshopcount(shopcount + 1));
                    navigate('/Purchase');
                }
            }
        } else {
            alert("Please login your account")
            navigate('/login')
        }
    }
    const buynow = async (data, id, price) => {
        // await addTocard_list(data, 1);
        const loginUser = localStorage.getItem('usedbookrtoken');
        if (loginUser) {
            navigate(`/Placeorder/${data.id}`, { state: data })
        } else {
            alert("please login user account")
            navigate('/login')
        }
    }

    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    const priceCheck = (data) => {
        const { type, condition, price } = data;
        setConditionfilter(data.bookconditions)
        // dispatch(setSingleProductPrice(data.price))
        dispatch(setSingleProductPrice({ type: data.bindings, condition: data.bookconditions, price: data.price }))
    }

    // const allbook_view = async () => {
    //     const single_book = await allbooks();
    //     const bookDetail = single_book.find(data => data.id == params.id);
    //     setSingleBooks([bookDetail])
    // }
    // const click_view = async (params.id) => {
    //     const onebooks = await bookdetails(params.id);
    //     setSingleBooks([onebooks])
    // }

    const Singlebookid = params.id; // This line seems unnecessary if you're passing Singlebookid as a parameter to click_view
    const click_view = async (Singlebookid) => {
        try {
            const oneBook = await bookdetailsview(Singlebookid);
            setSingleBooks([oneBook[0]]);
            setReviewRating([oneBook[0].ratingreview[0]])
        } catch (error) {
            console.error('Error fetching book details:', error);
            // Handle error as needed
        }
    };
    const filterbinding = (bindingname) => {
        setBindingfilter(bindingname)
        console.log(bindingname)
    }

    useEffect(() => {
        // allbook_view()
        dispatch(setClass1Hide(false))
        click_view(Singlebookid);
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className='description-section'>
            <Header />
            <section className='description container-100 pb-5'>
                <div className='d-lg-block d-none'>
                    <div className='row m-0 bg-white p-3'>
                        {singleBooks && singleBooks.map((data) => {
                            return (
                                <React.Fragment key={data.id}>
                                    <div className='col-6'>
                                        <div className='row m-0'>
                                            <div className='col-12 singleproduct-img-1'>
                                                <img src={data.image} className='w-100' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-6 description-details'>
                                        <>
                                            <h1 className='mb-1'>{data.title_long}<span className='stock'>In Stock</span></h1>
                                            <p className='m-0' onClick={() => author_name(data.author)} style={{ cursor: 'pointer' }}>{data.author}</p>
                                            <Rating
                                                initialRating={data.avg_rating}
                                                emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                                fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                                readonly={true}
                                            />
                                            <span className='review'>Reviews</span>
                                            <br />
                                            <span className='price pe-2'>INR {singleProductPrice.price ? <>{(singleProductPrice.price).toLocaleString()}</> : <>{(data.selling_price).toLocaleString()}.00</>}</span><span className='text-decoration-line-through rate'>{(data.original_price).toLocaleString()}.00</span>
                                            <button className='sales-offer'>{data.discount}% offer</button><br />
                                            {/* <span className='price pe-2'>Bindind Type : {singleProductPrice.type ? <>{singleProductPrice.type}</> : <></>}</span> */}
                                            <h4 className='cate '>Category:<span className='ms-2'>{data.category_id[0].name}</span></h4>
                                            <hr />
                                            {data.varient.length > 0 ?
                                                <>
                                                    <div className='condition-level my-3'>
                                                        <h1><span>Binding type</span></h1>
                                                        {/* {data.varient.map((variantData) => (
                                                            <button key={variantData.id} className='very ms-2'>{variantData.bindings}</button>
                                                        ))} */}
                                                        {Array.from(new Set(data.varient.map((variantData) => variantData.bindings))).map((binding, index) => (
                                                            <>
                                                                <button key={index} className={bindingfilter == binding ? 'checkvery ms-2' : 'very ms-2'} onClick={() => filterbinding(binding)}>{binding}</button>
                                                            </>
                                                        ))}
                                                    </div>
                                                    {(() => {
                                                        const uniqueBindings = Array.from(new Set(data.varient.map((variantData) => variantData.bindings)));
                                                        if (uniqueBindings.length == 1) {
                                                            return (
                                                                <div className='condition-level my-3'>
                                                                    <h1><span>Condition</span></h1>
                                                                    {data.varient.map((variantData) => (
                                                                        <button key={variantData.id} className={conditionfilter == variantData.bookconditions ? 'checkvery ms-2' : 'very ms-2'} onClick={() => priceCheck(variantData)}>{variantData.bookconditions}</button>
                                                                    ))}
                                                                </div>
                                                            );
                                                        } else {
                                                            if (bindingfilter?.length > 0) {
                                                                return (
                                                                    <div className='condition-level my-3'>
                                                                        <h1><span>Condition</span></h1>
                                                                        {data.varient.map((variantData) => (
                                                                            variantData.bindings === bindingfilter && (
                                                                                <button key={variantData.id} className={conditionfilter == variantData.bookconditions ? 'checkvery ms-2' : 'very ms-2'} onClick={() => priceCheck(variantData)}>{variantData.bookconditions}</button>
                                                                            )
                                                                        ))}
                                                                    </div>
                                                                );
                                                            } else {
                                                                return (
                                                                    <div className='condition-level my-3'>
                                                                        <h1><span>Condition</span></h1>
                                                                        <button className='very ms-2' >Click Binding Type</button>
                                                                    </div>
                                                                );
                                                            }
                                                        }
                                                    })()}
                                                </>
                                                :
                                                <>
                                                    <h1>No variant type</h1>
                                                </>
                                            }
                                            <div className='my-3'>
                                                <span className='text-center'>
                                                    <button className='buynow' onClick={() => buynow(data, data.id, data.original_price)}>Buy Now <FontAwesomeIcon icon={faShop} className='mx-2' /></button>
                                                </span>
                                                {userIdShop && userIdShop.length > 0 ? (
                                                    <>
                                                        {userIdShop.some(cartId => cartId.book_id === data.id) ? (
                                                            <>
                                                                <button
                                                                    className='disabled-shop'
                                                                    id={data.id}
                                                                    value={data.id}
                                                                    onClick={() => {
                                                                        const cartId = userIdShop.find(cart => cart.book_id === data.id);
                                                                        handleShopClick(data, cartId.id, data.original_price);
                                                                    }}
                                                                >
                                                                    Remove card  {/* Remove to card <FontAwesomeIcon icon={faBagShopping} className='mr-fixed' /> */}
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <button
                                                                    className='shop-card'
                                                                    id={data.id}
                                                                    value={data.id}
                                                                    onClick={() => handleShopClick(data, data.id, data.original_price)}
                                                                    style={{ cursor: 'pointer' }}
                                                                >
                                                                    Add to card
                                                                </button>
                                                            </>
                                                        )}
                                                    </>
                                                ) : (
                                                    <span
                                                        className='shop-card'
                                                        id={data.id}
                                                        value={data.id}
                                                        onClick={() => handleShopClick(data, data.id, data.original_price)}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        Add to card{/* <FontAwesomeIcon icon={faBagShopping} className='mr-fixed' /> */}
                                                    </span>
                                                )}
                                            </div>
                                        </>
                                    </div>
                                </React.Fragment>
                            );

                        })}


                    </div>
                </div>
                <div className='d-lg-none d-md-block d-none pt-5'>
                    <div className='row m-0'>
                        {singleBooks && singleBooks.map((data) => {
                            return (
                                <>
                                    <div className='col-5'>
                                        <div className='row m-0'>
                                            <div className='col-12'>
                                                <img src={data.image} className='w-100 h-100' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-7 description-details'>
                                        <h1 className='mb-1'>{data.title_long} <span className='stock'>In Stock</span></h1>
                                        <p className='mb-0' onClick={() => author_name(data.author)} style={{ cursor: 'pointer' }}>{data.author}</p>
                                        <Rating
                                            initialRating={data.avg_rating}
                                            emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                            fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                            readonly={true}
                                        />
                                        <span className='review'>Reviews</span>
                                        <br />
                                        <span className='price pe-2'>INR {singleProductPrice.price ? <>{(singleProductPrice.price).toLocaleString()}</> : <>{(data.selling_price).toLocaleString()}.00</>}</span><span className='text-decoration-line-through rate'>{(data.original_price).toLocaleString()}.00</span>
                                        <button className='sales-offer'>{data.discount}% offer</button><br />
                                        <hr />
                                        {data.varient.length > 0 ?
                                            <>

                                                <div className='condition-level my-3'>
                                                    <h1><span>Binding type</span></h1>
                                                    {/* {data.varient.map((variantData) => (
                                                            <button key={variantData.id} className='very ms-2'>{variantData.bindings}</button>
                                                        ))} */}
                                                    {Array.from(new Set(data.varient.map((variantData) => variantData.bindings))).map((binding, index) => (
                                                        <>
                                                            <button key={index} className={bindingfilter == binding ? 'checkvery ms-2' : 'very ms-2'} onClick={() => filterbinding(binding)}>{binding}</button>
                                                        </>
                                                    ))}
                                                </div>
                                                {(() => {
                                                    const uniqueBindings = Array.from(new Set(data.varient.map((variantData) => variantData.bindings)));
                                                    if (uniqueBindings.length == 1) {
                                                        return (
                                                            <div className='condition-level my-3'>
                                                                <h1><span>Condition</span></h1>
                                                                {data.varient.map((variantData) => (
                                                                    <button key={variantData.id} className={conditionfilter == variantData.bookconditions ? 'checkvery ms-2' : 'very ms-2'} onClick={() => priceCheck(variantData)}>{variantData.bookconditions}</button>
                                                                ))}
                                                            </div>
                                                        );
                                                    } else {
                                                        if (bindingfilter?.length > 0) {
                                                            return (
                                                                <div className='condition-level my-3'>
                                                                    <h1><span>Condition</span></h1>
                                                                    {data.varient.map((variantData) => (
                                                                        variantData.bindings === bindingfilter && (
                                                                            <button key={variantData.id} className={conditionfilter == variantData.bookconditions ? 'checkvery ms-2' : 'very ms-2'} onClick={() => priceCheck(variantData)}>{variantData.bookconditions}</button>)
                                                                    ))}
                                                                </div>
                                                            );
                                                        } else {
                                                            return (
                                                                <div className='condition-level my-3'>
                                                                    <h1><span>Condition</span></h1>
                                                                    <button className='very ms-2' >Click Binding Type</button>
                                                                </div>
                                                            );
                                                        }
                                                    }
                                                })()}
                                            </>
                                            :
                                            <>
                                                <h1>No variant type</h1>
                                            </>
                                        }
                                        <span className='text-center'>
                                            <button className='buynow ms-0' onClick={() => buynow(data, data.id, data.original_price)}>Buy Now <FontAwesomeIcon icon={faShop} className='mx-2' /></button>
                                        </span>
                                        {userIdShop && userIdShop.length > 0 ? (
                                            <>
                                                {userIdShop.some(cartId => cartId.book_id === data.id) ? (
                                                    <>
                                                        <button
                                                            className='disabled-shop'
                                                            id={data.id}
                                                            value={data.id}
                                                            onClick={() => {
                                                                const cartId = userIdShop.find(cart => cart.book_id === data.id);
                                                                handleShopClick(data, cartId.id, data.original_price);
                                                            }}
                                                        >
                                                            Remove card  {/* Remove to card <FontAwesomeIcon icon={faBagShopping} className='mr-fixed' /> */}
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button
                                                            className='shop-card'
                                                            id={data.id}
                                                            value={data.id}
                                                            onClick={() => handleShopClick(data, data.id, data.original_price)}
                                                            style={{ cursor: 'pointer' }}
                                                        >
                                                            Add to card
                                                        </button>
                                                    </>
                                                )}
                                            </>
                                        ) : (
                                            <span
                                                className='shop-card'
                                                id={data.id}
                                                value={data.id}
                                                onClick={() => handleShopClick(data, data.id, data.original_price)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                Add to card{/* <FontAwesomeIcon icon={faBagShopping} className='mr-fixed' /> */}
                                            </span>
                                        )}
                                    </div>

                                </>
                            )
                        })}



                    </div>
                </div>
                <div className='d-lg-none d-md-none d-block'>
                    <div className='row m-0'>
                        {singleBooks && singleBooks.map((data) => {
                            return (
                                <>
                                    <div className='col-12'>
                                        <div className='row m-0'>
                                            <div className='col-12 singleproduct-img-1'>
                                                <img src={data.image} className='w-100' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 description-details'>
                                        <h1>{data.title_long.slice(0, 20)}....</h1>
                                        <span className='stock ms-0'>In Stock</span>
                                        <p className='pt-2 mb-0' onClick={() => author_name(data.author)} style={{ cursor: 'pointer' }}>{data.author}</p>
                                        <Rating
                                            initialRating={data.avg_rating_count}
                                            emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                            fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                            readonly={true}
                                        />
                                        <span className='review'>Reviews</span>
                                        <br />
                                        <span className='price pe-2'>INR {singleProductPrice.price ? <>{(singleProductPrice.price).toLocaleString()}</> : <>{(data.selling_price).toLocaleString()}.00</>}</span><span className='text-decoration-line-through rate'>{(data.original_price).toLocaleString()}.00</span>
                                        <button className='sales-offer'>{data.discount}% offer</button><br />
                                        <hr />
                                        {data.varient.length > 0 ?
                                            <>

                                                <div className='condition-level my-3'>
                                                    <h1><span>Binding type</span></h1>
                                                    {/* {data.varient.map((variantData) => (
                                                            <button key={variantData.id} className='very ms-2'>{variantData.bindings}</button>
                                                        ))} */}
                                                    {Array.from(new Set(data.varient.map((variantData) => variantData.bindings))).map((binding, index) => (
                                                        <>
                                                            <button key={index} className={bindingfilter == binding ? 'checkvery ms-2' : 'very ms-2'} onClick={() => filterbinding(binding)}>{binding}</button>
                                                        </>
                                                    ))}
                                                </div>
                                                {(() => {
                                                    const uniqueBindings = Array.from(new Set(data.varient.map((variantData) => variantData.bindings)));
                                                    if (uniqueBindings.length == 1) {
                                                        return (
                                                            <div className='condition-level my-3'>
                                                                <h1><span>Condition</span></h1>
                                                                {data.varient.map((variantData) => (
                                                                    <button key={variantData.id} className={conditionfilter == variantData.bookconditions ? 'checkvery ms-2' : 'very ms-2'} onClick={() => priceCheck(variantData)}>{variantData.bookconditions}</button>))}
                                                            </div>
                                                        );
                                                    } else {
                                                        if (bindingfilter?.length > 0) {
                                                            return (
                                                                <div className='condition-level my-3'>
                                                                    <h1><span>Condition</span></h1>
                                                                    {data.varient.map((variantData) => (
                                                                        variantData.bindings === bindingfilter && (
                                                                            <button key={variantData.id} className={conditionfilter == variantData.bookconditions ? 'checkvery ms-2' : 'very ms-2'} onClick={() => priceCheck(variantData)}>{variantData.bookconditions}</button>
                                                                        )
                                                                    ))}
                                                                </div>
                                                            );
                                                        } else {
                                                            return (
                                                                <div className='condition-level my-3'>
                                                                    <h1><span>Condition</span></h1>
                                                                    <button className='very ms-2' >Click Binding Type</button>
                                                                </div>
                                                            );
                                                        }
                                                    }
                                                })()}
                                            </>
                                            :
                                            <>
                                                <h1>No variant type</h1>
                                            </>
                                        }
                                        <>
                                            <span className='text-center'>
                                                <button className='buynow' onClick={() => buynow(data, data.id, data.original_price)}>Buy Now <FontAwesomeIcon icon={faShop} className='mx-2' /></button>
                                            </span>
                                            {userIdShop && userIdShop.length > 0 ? (
                                                <>
                                                    {userIdShop.some(cartId => cartId.book_id === data.id) ? (
                                                        <>
                                                            <button
                                                                className='disabled-shop'
                                                                id={data.id}
                                                                value={data.id}
                                                                onClick={() => {
                                                                    const cartId = userIdShop.find(cart => cart.book_id === data.id);
                                                                    handleShopClick(data, cartId.id, data.original_price);
                                                                }}
                                                            >
                                                                Remove card  {/* Remove to card <FontAwesomeIcon icon={faBagShopping} className='mr-fixed' /> */}
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button
                                                                className='shop-card'
                                                                id={data.id}
                                                                value={data.id}
                                                                onClick={() => handleShopClick(data, data.id, data.original_price)}
                                                                style={{ cursor: 'pointer' }}
                                                            >
                                                                Add to card
                                                            </button>
                                                        </>
                                                    )}
                                                </>
                                            ) : (
                                                <span
                                                    className='shop-card'
                                                    id={data.id}
                                                    value={data.id}
                                                    onClick={() => handleShopClick(data, data.id, data.original_price)}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    Add to card{/* <FontAwesomeIcon icon={faBagShopping} className='mr-fixed' /> */}
                                                </span>
                                            )}
                                        </>
                                    </div>
                                </>
                            )
                        })}
                    </div>

                </div>
                <div className='tab-details mt-lg-5 mt-md-4 mt-sm-5 mt-3'>
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
                                {singleBooks && singleBooks.map((data) => {
                                    return (
                                        <>
                                            <div className='col-lg-6 col-md-6 col-12 mt-5'>
                                                <h1>{data.title_long}</h1>
                                                <p>{data.synopsis}</p>
                                            </div>
                                            <div className='col-lg-6 col-md-6 col-12 mt-5 singleproduct-img'>
                                                <img className='w-100' src={data.image} />
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
                                        {singleBooks && singleBooks.map((data) => {
                                            return (
                                                <>
                                                    <div className='col-lg-4 col-md-4 col-sm-4 col-12 mt-4'>
                                                        <label><b>TITLE :</b></label>
                                                    </div>
                                                    <div className='col-lg-8 col-md-8 col-sm-8 col-12 mt-4'>
                                                        <span>{data.title_long}</span>
                                                    </div>
                                                    <div className='col-4 mt-4'>
                                                        <label><b>DATE OF PUBLISHED :</b></label>
                                                    </div>
                                                    <div className='col-8 mt-4'>
                                                        <span>{data.date_published}</span>
                                                    </div>
                                                    <div className='col-4 mt-4'>
                                                        <label><b>PUBLISHER :</b></label>
                                                    </div>
                                                    <div className='col-8 mt-4'>
                                                        <span>{data.publisher}</span>
                                                    </div>
                                                    <div className='col-4 mt-4'>
                                                        <label><b>AUTHOR :</b></label>
                                                    </div>
                                                    <div className='col-8 mt-4'>
                                                        <span onClick={() => author_name(data.author)} style={{ cursor: 'pointer' }}>{data.author}</span>
                                                    </div>
                                                    <div className='col-4 mt-4'>
                                                        <label><b>MSRP :</b></label>
                                                    </div>
                                                    <div className='col-8 mt-4'>
                                                        <span>{data.original_price}</span>
                                                    </div>
                                                    <div className='col-4 mt-4'>
                                                        <label><b>EDITION :</b></label>
                                                    </div>
                                                    <div className='col-8 mt-4'>
                                                        <span>{data.edition}</span>
                                                    </div>
                                                    <div className='col-4 mt-4'>
                                                        <label><b>CONDITION TYPE:</b></label>
                                                    </div>
                                                    <div className='col-8 mt-4'>
                                                        <span>good</span>
                                                    </div>
                                                    <div className='col-4 mt-4'>
                                                        <label><b>BINDING TYPE :</b></label>
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
                                        {singleBooks && singleBooks.map((data) => {
                                            return (
                                                <>

                                                    <div className='col-4 mt-4'>
                                                        <label><b>ISBN:</b></label>
                                                    </div>
                                                    <div className='col-8 mt-4'>
                                                        <span>{data.isbn}</span>
                                                    </div>
                                                    <div className='col-4 mt-4'>
                                                        <label><b>ISBN 13 :</b></label>
                                                    </div>
                                                    <div className='col-8 mt-4'>
                                                        <span>{data.isbn13}</span>
                                                    </div>
                                                    <div className='col-4 mt-4'>
                                                        <label><b>ISBN 10 :</b></label>
                                                    </div>
                                                    <div className='col-8 mt-4'>
                                                        <span>{data.isbn10}</span>
                                                    </div>
                                                    <div className='col-4 mt-4'>
                                                        <label><b>LANGUAGE :</b></label>
                                                    </div>
                                                    <div className='col-8 mt-4'>
                                                        <span>{data.language}</span>
                                                    </div>
                                                    <div className='col-4 mt-4'>
                                                        <label><b>DIMENSION :</b></label>
                                                    </div>
                                                    <div className='col-8 mt-4'>
                                                        <span>{data.dimensions}</span>
                                                    </div>
                                                    <div className='col-4 mt-4'>
                                                        <label><b>WEIGHT :</b></label>
                                                    </div>
                                                    <div className='col-8 mt-4'>
                                                        <span>{data.pages}</span>
                                                    </div>
                                                    <div className='col-4 mt-4'>
                                                        <label><b>PAGES :</b></label>
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
                            {reviewRating[0] == undefined ?


                                <>
                                    <h1 className='text-center'>No Reviews</h1>
                                </>
                                :
                                <>
                                    {reviewRating && reviewRating.map((data, index) => {
                                        return (
                                            <div className='container-80 pt-3 review'>
                                                <div className='row m-0'>
                                                    <div className='col-lg-6 col-md-6 col-12'>
                                                        <div className='w-50'>
                                                            <h5><b>{data.review}</b></h5>
                                                        </div>
                                                        <div className='w-75'>
                                                            <Rating
                                                                initialRating={data.rating}
                                                                emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                                                fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                                                readonly={true}
                                                            />
                                                        </div>
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
                                </>
                            }


                        </TabPane>
                        {/* Add more TabPanes as needed */}
                    </TabContent>
                </div>
                <div className='best-seller mt-5'>
                    <h1 className='product-title text-center pt-5'>Related Products</h1>

                    <BestSeller />
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Description