import React, { useEffect, useState } from 'react'
import Header from '../Common/pages/Header'
import Footer from '../Common/pages/Footer'
import Aside from '../Common/pages/Aside'
import axios from "axios";
import Rating from 'react-rating';

// image path 

import likes from '../Common/assets/image/like.png'
import unlike from '../Common/assets/image/unlike.png'
import plant3 from '../Common/assets/image/plant_3.png'
import rating from '../Common/assets/image/Rating.png'
import add from '../Common/assets/image/addcard.png'
import remove from '../Common/assets/image/removecard.png'
import book1 from '../Common/assets/image/book_1.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faHeart } from '@fortawesome/free-solid-svg-icons';


import { useSelector, useDispatch } from 'react-redux';
import { setisAdded, setisIncrement, setisDecrement, setisLiked, setallplantDetails, setLikedProducts, setlikeProduct, setlikescount, setShopProducts, setshopcount, setproductIdDetails } from '../Redux/CreateSlice';
import { Link, useNavigate } from 'react-router-dom'

function Product() {

  const { isLiked, isAdded, allplantsDetails, likedProducts, likescount, shopProducts, shopcount, minPrice, priceFilter, filteredProducts, productIdDetails, searchfield } = useSelector((state) => state.usedbookr_product)
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    }
  };

  const all_product = () => {
    navigate('/Allproduct')
  }
  const plantproduct = async () => {
    // const { data } = await axios.get('https://webbitech.co.in/ecommerce/public/api/productlist');
    // dispatch(setallplantDetails(data.data))
    const { data } = await axios.get('https://fakestoreapi.com/products');
    dispatch(setallplantDetails(data.data))

  }
  // useEffect(() => {
  //   plantproduct();
  // }, []);
  console.log(allplantsDetails)
  const product_like = () => {
  }
  const product_add = () => {

  }
  const product_remove = () => {

  }
  const pass = (data) => {
    const updatedData = [data];
    dispatch(setproductIdDetails(updatedData))
    navigate('/Description');
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='product-section'>
      <Header />
      <div className='product-view'>
        <div className='d-lg-block d-none'>
          <div className='row m-0'>
            <div className='col-3'>
              <Aside />
            </div>
            <div className='col-9'>
              <div className='product-list my-5'>
                {/* <div className='row m-0  py-4'>
                  {searchfield ?
                    <>
                      {allplantsDetails && allplantsDetails && filteredProducts.map((data, index) => {
                        return (
                          <div className='col-lg-4 col-md-4 col-sm-6 col-12 mt-2 d-flex align-self-stretch'>
                            <div className={totalshops.includes(data.id) ? 'normal-box' : 'box-view'}>
                              <button className='sales-offer'>Sale {data.discount_price}</button>
                              <span
                                className='float-end'
                                onClick={() => handleLikeClick(data)}
                              >
                                <img
                                  src={totallikes.includes(data.id) ? likes : unlike}
                                  alt="Like Button"
                                />
                              </span>
                              <img src={plant3} className='w-100' />
                              <div class="row m-0 product-details">
                                <div class="col-9">
                                  <h5>{data.title}</h5>
                                  <span className='price pe-2'>{data.total_price}</span><span className='text-decoration-line-through rate'>{data.actual_price}</span>
                                  <img src={rating} className='ms-2' />
                                </div>
                                <div class="col-3">
                                  <span
                                    className='float-end'
                                    id={data.id} value={data.id}
                                    onClick={() => handleShopClick(data, data.id, data.total_price)}
                                  >
                                    <img
                                      src={totalshops.includes(data.id) ? add : remove}
                                      alt="Shop Button"
                                    />
                                  </span>
                                </div>
                              </div>
                              <div className='col-12 d-flex align-items-center justify-content-end mt-3'>
                                <button className='float-end sales-offer' onClick={() => pass(data)}>view all</button>

                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </> :
                    <>
                      <h1 className='text-center product-title'>No items</h1>
                    </>}

                </div> */}
                <div className='row m-0'>
                  <div className='col-lg-4 col-md-4 col-sm-6 col-12 mt-2 d-flex align-self-stretch'>
                    {/* <div className='normal-box box-view'>
                      <button className='sales-offer'>offer50%</button>
                      <span
                        className='float-end'
                        onClick={() => handleLikeClick(1)}
                      >
                        <img
                          src={totallikes.includes(1) ? likes : unlike}
                          alt="Like Button"
                        />
                      </span>
                      <img src={book1} className='w-100 py-2' />
                      <div class="row m-0 product-details">
                        <div class="col-9">
                          <h5>Book</h5>
                          <span className='price pe-2'>INR 100</span><span className='text-decoration-line-through rate'>INR 230</span>
                          <img src={rating} className='ms-2' />
                        </div>
                        <div class="col-3">
                          <span
                            className='float-end'
                            id={1} value={1}
                            onClick={() => handleShopClick(1,1,1)}
                          >
                            <img
                              src={totalshops.includes(0) ? add : remove}
                              alt="Shop Button"
                            />
                          </span>
                        </div>
                      </div>
                      <div className='col-12 d-flex align-items-center justify-content-end mt-3'>
                        <button className='float-end sales-offer' onClick={() => pass(1)}>view all</button>

                      </div>
                    </div> */}
                    <div className='bestseller'>
                      <div className='seller-book position-relative'>
                        <div className='best-seller'>
                          <img src={book1} height='300px' className='w-100 p-lg-4 p-md-2 p-0' />
                          <span className='selles-offer'>offer 50%</span>
                          <span className='like-position float-end m-2'>
                            <span className={` ${isLiked ? 'likes' : 'unlikes'} `}><img src={isLiked ? likes : unlike} alt="Like Button" onClick={() => product_like()} /></span>
                          </span>
                          <div className='book-details p-3'>
                            <h1>Dual Ring </h1>
                            <h5>By Lisa Jewall</h5>
                            <div className='d-flex '>
                              <div className='rate-details'>
                                <span className='new-rate'>₹ 299</span> <span className='ps-2 old-rate'>₹ 440</span><br />
                                <Rating
                                  initialRating={5}
                                  emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                  fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                  readonly={true}
                                />
                              </div>
                              <div className='ms-auto'>
                                {isAdded ? (<><img src={add} alt="Like Button" onClick={() => product_add()} /></>) : (<> <img src={remove} alt="Remove Button" onClick={() => product_remove()} /> </>)}

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-4 col-md-4 col-sm-6 col-12 mt-2 d-flex align-self-stretch'>
                    {/* <div className='normal-box box-view'>
                      <button className='sales-offer'>offer50%</button>
                      <span
                        className='float-end'
                        onClick={() => handleLikeClick(1)}
                      >
                        <img
                          src={totallikes.includes(1) ? likes : unlike}
                          alt="Like Button"
                        />
                      </span>
                      <img src={book1} className='w-100 py-2' />
                      <div class="row m-0 product-details">
                        <div class="col-9">
                          <h5>Book</h5>
                          <span className='price pe-2'>INR 100</span><span className='text-decoration-line-through rate'>INR 230</span>
                          <img src={rating} className='ms-2' />
                        </div>
                        <div class="col-3">
                          <span
                            className='float-end'
                            id={1} value={1}
                            onClick={() => handleShopClick(1,1,1)}
                          >
                            <img
                              src={totalshops.includes(0) ? add : remove}
                              alt="Shop Button"
                            />
                          </span>
                        </div>
                      </div>
                      <div className='col-12 d-flex align-items-center justify-content-end mt-3'>
                        <button className='float-end sales-offer' onClick={() => pass(1)}>view all</button>

                      </div>
                    </div> */}
                    <div className='bestseller'>
                      <div className='seller-book position-relative'>
                        <div className='best-seller'>
                          <img src={book1} height='300px' className='w-100 p-lg-4 p-md-2 p-0' />
                          <span className='selles-offer'>offer 50%</span>
                          <span className='like-position float-end m-2'>
                            <span className={` ${isLiked ? 'likes' : 'unlikes'} `}><img src={isLiked ? likes : unlike} alt="Like Button" onClick={() => product_like()} /></span>
                          </span>
                          <div className='book-details p-3'>
                            <h1>Dual Ring </h1>
                            <h5>By Lisa Jewall</h5>
                            <div className='d-flex '>
                              <div className='rate-details'>
                                <span className='new-rate'>₹ 299</span> <span className='ps-2 old-rate'>₹ 440</span><br />
                                <Rating
                                  initialRating={5}
                                  emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                  fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                  readonly={true}
                                />
                              </div>
                              <div className='ms-auto'>
                                {isAdded ? (<><img src={add} alt="Like Button" onClick={() => product_add()} /></>) : (<> <img src={remove} alt="Remove Button" onClick={() => product_remove()} /> </>)}

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-4 col-md-4 col-sm-6 col-12 mt-2 d-flex align-self-stretch'>
                    {/* <div className='normal-box box-view'>
                      <button className='sales-offer'>offer50%</button>
                      <span
                        className='float-end'
                        onClick={() => handleLikeClick(1)}
                      >
                        <img
                          src={totallikes.includes(1) ? likes : unlike}
                          alt="Like Button"
                        />
                      </span>
                      <img src={book1} className='w-100 py-2' />
                      <div class="row m-0 product-details">
                        <div class="col-9">
                          <h5>Book</h5>
                          <span className='price pe-2'>INR 100</span><span className='text-decoration-line-through rate'>INR 230</span>
                          <img src={rating} className='ms-2' />
                        </div>
                        <div class="col-3">
                          <span
                            className='float-end'
                            id={1} value={1}
                            onClick={() => handleShopClick(1,1,1)}
                          >
                            <img
                              src={totalshops.includes(0) ? add : remove}
                              alt="Shop Button"
                            />
                          </span>
                        </div>
                      </div>
                      <div className='col-12 d-flex align-items-center justify-content-end mt-3'>
                        <button className='float-end sales-offer' onClick={() => pass(1)}>view all</button>

                      </div>
                    </div> */}
                    <div className='bestseller'>
                      <div className='seller-book position-relative'>
                        <div className='best-seller'>
                          <img src={book1} height='300px' className='w-100 p-lg-4 p-md-2 p-0' />
                          <span className='selles-offer'>offer 50%</span>
                          <span className='like-position float-end m-2'>
                            <span className={` ${isLiked ? 'likes' : 'unlikes'} `}><img src={isLiked ? likes : unlike} alt="Like Button" onClick={() => product_like()} /></span>
                          </span>
                          <div className='book-details p-3'>
                            <h1>Dual Ring </h1>
                            <h5>By Lisa Jewall</h5>
                            <div className='d-flex '>
                              <div className='rate-details'>
                                <span className='new-rate'>₹ 299</span> <span className='ps-2 old-rate'>₹ 440</span><br />
                                <Rating
                                  initialRating={5}
                                  emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                  fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                  readonly={true}
                                />
                              </div>
                              <div className='ms-auto'>
                                {isAdded ? (<><img src={add} alt="Like Button" onClick={() => product_add()} /></>) : (<> <img src={remove} alt="Remove Button" onClick={() => product_remove()} /> </>)}

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-4 col-md-4 col-sm-6 col-12 mt-2 d-flex align-self-stretch'>
                    {/* <div className='normal-box box-view'>
                      <button className='sales-offer'>offer50%</button>
                      <span
                        className='float-end'
                        onClick={() => handleLikeClick(1)}
                      >
                        <img
                          src={totallikes.includes(1) ? likes : unlike}
                          alt="Like Button"
                        />
                      </span>
                      <img src={book1} className='w-100 py-2' />
                      <div class="row m-0 product-details">
                        <div class="col-9">
                          <h5>Book</h5>
                          <span className='price pe-2'>INR 100</span><span className='text-decoration-line-through rate'>INR 230</span>
                          <img src={rating} className='ms-2' />
                        </div>
                        <div class="col-3">
                          <span
                            className='float-end'
                            id={1} value={1}
                            onClick={() => handleShopClick(1,1,1)}
                          >
                            <img
                              src={totalshops.includes(0) ? add : remove}
                              alt="Shop Button"
                            />
                          </span>
                        </div>
                      </div>
                      <div className='col-12 d-flex align-items-center justify-content-end mt-3'>
                        <button className='float-end sales-offer' onClick={() => pass(1)}>view all</button>

                      </div>
                    </div> */}
                    <div className='bestseller'>
                      <div className='seller-book position-relative'>
                        <div className='best-seller'>
                          <img src={book1} height='300px' className='w-100 p-lg-4 p-md-2 p-0' />
                          <span className='selles-offer'>offer 50%</span>
                          <span className='like-position float-end m-2'>
                            <span className={` ${isLiked ? 'likes' : 'unlikes'} `}><img src={isLiked ? likes : unlike} alt="Like Button" onClick={() => product_like()} /></span>
                          </span>
                          <div className='book-details p-3'>
                            <h1>Dual Ring </h1>
                            <h5>By Lisa Jewall</h5>
                            <div className='d-flex '>
                              <div className='rate-details'>
                                <span className='new-rate'>₹ 299</span> <span className='ps-2 old-rate'>₹ 440</span><br />
                                <Rating
                                  initialRating={5}
                                  emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                  fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                  readonly={true}
                                />
                              </div>
                              <div className='ms-auto'>
                                {isAdded ? (<><img src={add} alt="Like Button" onClick={() => product_add()} /></>) : (<> <img src={remove} alt="Remove Button" onClick={() => product_remove()} /> </>)}

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-4 col-md-4 col-sm-6 col-12 mt-2 d-flex align-self-stretch'>
                    {/* <div className='normal-box box-view'>
                      <button className='sales-offer'>offer50%</button>
                      <span
                        className='float-end'
                        onClick={() => handleLikeClick(1)}
                      >
                        <img
                          src={totallikes.includes(1) ? likes : unlike}
                          alt="Like Button"
                        />
                      </span>
                      <img src={book1} className='w-100 py-2' />
                      <div class="row m-0 product-details">
                        <div class="col-9">
                          <h5>Book</h5>
                          <span className='price pe-2'>INR 100</span><span className='text-decoration-line-through rate'>INR 230</span>
                          <img src={rating} className='ms-2' />
                        </div>
                        <div class="col-3">
                          <span
                            className='float-end'
                            id={1} value={1}
                            onClick={() => handleShopClick(1,1,1)}
                          >
                            <img
                              src={totalshops.includes(0) ? add : remove}
                              alt="Shop Button"
                            />
                          </span>
                        </div>
                      </div>
                      <div className='col-12 d-flex align-items-center justify-content-end mt-3'>
                        <button className='float-end sales-offer' onClick={() => pass(1)}>view all</button>

                      </div>
                    </div> */}
                    <div className='bestseller'>
                      <div className='seller-book position-relative'>
                        <div className='best-seller'>
                          <img src={book1} height='300px' className='w-100 p-lg-4 p-md-2 p-0' />
                          <span className='selles-offer'>offer 50%</span>
                          <span className='like-position float-end m-2'>
                            <span className={` ${isLiked ? 'likes' : 'unlikes'} `}><img src={isLiked ? likes : unlike} alt="Like Button" onClick={() => product_like()} /></span>
                          </span>
                          <div className='book-details p-3'>
                            <h1>Dual Ring </h1>
                            <h5>By Lisa Jewall</h5>
                            <div className='d-flex '>
                              <div className='rate-details'>
                                <span className='new-rate'>₹ 299</span> <span className='ps-2 old-rate'>₹ 440</span><br />
                                <Rating
                                  initialRating={5}
                                  emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                  fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                  readonly={true}
                                />
                              </div>
                              <div className='ms-auto'>
                                {isAdded ? (<><img src={add} alt="Like Button" onClick={() => product_add()} /></>) : (<> <img src={remove} alt="Remove Button" onClick={() => product_remove()} /> </>)}

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className='d-lg-none d-block'>
          <div className='row m-0'>
            {/* <div className='col-3'>
              <Aside />
            </div> */}
            <div className='col-12'>
              <Aside />
            </div>
            <div className='col-12 p-0'>
              <div className='row m-0 product-list'>
                {/* <div className='row m-0  py-4'>
                  {searchfield ?
                    <>
                      {allplantsDetails && allplantsDetails && filteredProducts.map((data, index) => {
                        return (
                          <div className='col-lg-4 col-md-4 col-sm-6 col-12 mt-2 d-flex align-self-stretch'>
                            <div className={totalshops.includes(data.id) ? 'normal-box' : 'box-view'}>
                              <button className='sales-offer'>Sale {data.discount_price}</button>
                              <span
                                className='float-end'
                                onClick={() => handleLikeClick(data)}
                              >
                                <img
                                  src={totallikes.includes(data.id) ? likes : unlike}
                                  alt="Like Button"
                                />
                              </span>
                              <img src={plant3} className='w-100' />
                              <div class="row m-0 product-details">
                                <div class="col-9">
                                  <h5>{data.title}</h5>
                                  <span className='price pe-2'>{data.total_price}</span><span className='text-decoration-line-through rate'>{data.actual_price}</span>
                                  <img src={rating} className='ms-2' />
                                </div>
                                <div class="col-3">
                                  <span
                                    className='float-end'
                                    id={data.id} value={data.id}
                                    onClick={() => handleShopClick(data, data.id, data.total_price)}
                                  >
                                    <img
                                      src={totalshops.includes(data.id) ? add : remove}
                                      alt="Shop Button"
                                    />
                                  </span>
                                </div>
                              </div>
                              <div className='col-12 d-flex align-items-center justify-content-end mt-3'>
                                <button className='float-end sales-offer' onClick={() => pass(data)}>view all</button>

                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </> :
                    <>
                      <h1 className='text-center product-title'>No items</h1>
                    </>}

                </div> */}
                <div className='col-lg-4 col-md-4 col-sm-6 col-12 mt-2 d-flex align-self-stretch'>
                  {/* <div className='normal-box box-view'>
                      <button className='sales-offer'>offer50%</button>
                      <span
                        className='float-end'
                        onClick={() => handleLikeClick(1)}
                      >
                        <img
                          src={totallikes.includes(1) ? likes : unlike}
                          alt="Like Button"
                        />
                      </span>
                      <img src={book1} className='w-100 py-2' />
                      <div class="row m-0 product-details">
                        <div class="col-9">
                          <h5>Book</h5>
                          <span className='price pe-2'>INR 100</span><span className='text-decoration-line-through rate'>INR 230</span>
                          <img src={rating} className='ms-2' />
                        </div>
                        <div class="col-3">
                          <span
                            className='float-end'
                            id={1} value={1}
                            onClick={() => handleShopClick(1,1,1)}
                          >
                            <img
                              src={totalshops.includes(0) ? add : remove}
                              alt="Shop Button"
                            />
                          </span>
                        </div>
                      </div>
                      <div className='col-12 d-flex align-items-center justify-content-end mt-3'>
                        <button className='float-end sales-offer' onClick={() => pass(1)}>view all</button>

                      </div>
                    </div> */}
                  <div className='bestseller'>
                    <div className='seller-book position-relative'>
                      <div className='best-seller'>
                        <img src={book1} height='300px' className='w-100 p-lg-4 p-md-2 p-0' />
                        <span className='selles-offer'>offer 50%</span>
                        <span className='like-position float-end m-2'>
                          <span className={` ${isLiked ? 'likes' : 'unlikes'} `}><img src={isLiked ? likes : unlike} alt="Like Button" onClick={() => product_like()} /></span>
                        </span>
                        <div className='book-details p-3'>
                          <h1>Dual Ring </h1>
                          <h5>By Lisa Jewall</h5>
                          <div className='d-flex '>
                            <div className='rate-details'>
                              <span className='new-rate'>₹ 299</span> <span className='ps-2 old-rate'>₹ 440</span><br />
                              <Rating
                                initialRating={5}
                                emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                readonly={true}
                              />
                            </div>
                            <div className='ms-auto'>
                              {isAdded ? (<><img src={add} alt="Like Button" onClick={() => product_add()} /></>) : (<> <img src={remove} alt="Remove Button" onClick={() => product_remove()} /> </>)}

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-4 col-md-4 col-sm-6 col-12 mt-2 d-flex align-self-stretch'>
                  {/* <div className='normal-box box-view'>
                      <button className='sales-offer'>offer50%</button>
                      <span
                        className='float-end'
                        onClick={() => handleLikeClick(1)}
                      >
                        <img
                          src={totallikes.includes(1) ? likes : unlike}
                          alt="Like Button"
                        />
                      </span>
                      <img src={book1} className='w-100 py-2' />
                      <div class="row m-0 product-details">
                        <div class="col-9">
                          <h5>Book</h5>
                          <span className='price pe-2'>INR 100</span><span className='text-decoration-line-through rate'>INR 230</span>
                          <img src={rating} className='ms-2' />
                        </div>
                        <div class="col-3">
                          <span
                            className='float-end'
                            id={1} value={1}
                            onClick={() => handleShopClick(1,1,1)}
                          >
                            <img
                              src={totalshops.includes(0) ? add : remove}
                              alt="Shop Button"
                            />
                          </span>
                        </div>
                      </div>
                      <div className='col-12 d-flex align-items-center justify-content-end mt-3'>
                        <button className='float-end sales-offer' onClick={() => pass(1)}>view all</button>

                      </div>
                    </div> */}
                  <div className='bestseller'>
                    <div className='seller-book position-relative'>
                      <div className='best-seller'>
                        <img src={book1} height='300px' className='w-100 p-lg-4 p-md-2 p-0' />
                        <span className='selles-offer'>offer 50%</span>
                        <span className='like-position float-end m-2'>
                          <span className={` ${isLiked ? 'likes' : 'unlikes'} `}><img src={isLiked ? likes : unlike} alt="Like Button" onClick={() => product_like()} /></span>
                        </span>
                        <div className='book-details p-3'>
                          <h1>Dual Ring </h1>
                          <h5>By Lisa Jewall</h5>
                          <div className='d-flex '>
                            <div className='rate-details'>
                              <span className='new-rate'>₹ 299</span> <span className='ps-2 old-rate'>₹ 440</span><br />
                              <Rating
                                initialRating={5}
                                emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                readonly={true}
                              />
                            </div>
                            <div className='ms-auto'>
                              {isAdded ? (<><img src={add} alt="Like Button" onClick={() => product_add()} /></>) : (<> <img src={remove} alt="Remove Button" onClick={() => product_remove()} /> </>)}

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-4 col-md-4 col-sm-6 col-12 mt-2 d-flex align-self-stretch'>
                  {/* <div className='normal-box box-view'>
                      <button className='sales-offer'>offer50%</button>
                      <span
                        className='float-end'
                        onClick={() => handleLikeClick(1)}
                      >
                        <img
                          src={totallikes.includes(1) ? likes : unlike}
                          alt="Like Button"
                        />
                      </span>
                      <img src={book1} className='w-100 py-2' />
                      <div class="row m-0 product-details">
                        <div class="col-9">
                          <h5>Book</h5>
                          <span className='price pe-2'>INR 100</span><span className='text-decoration-line-through rate'>INR 230</span>
                          <img src={rating} className='ms-2' />
                        </div>
                        <div class="col-3">
                          <span
                            className='float-end'
                            id={1} value={1}
                            onClick={() => handleShopClick(1,1,1)}
                          >
                            <img
                              src={totalshops.includes(0) ? add : remove}
                              alt="Shop Button"
                            />
                          </span>
                        </div>
                      </div>
                      <div className='col-12 d-flex align-items-center justify-content-end mt-3'>
                        <button className='float-end sales-offer' onClick={() => pass(1)}>view all</button>

                      </div>
                    </div> */}
                  <div className='bestseller'>
                    <div className='seller-book position-relative'>
                      <div className='best-seller'>
                        <img src={book1} height='300px' className='w-100 p-lg-4 p-md-2 p-0' />
                        <span className='selles-offer'>offer 50%</span>
                        <span className='like-position float-end m-2'>
                          <span className={` ${isLiked ? 'likes' : 'unlikes'} `}><img src={isLiked ? likes : unlike} alt="Like Button" onClick={() => product_like()} /></span>
                        </span>
                        <div className='book-details p-3'>
                          <h1>Dual Ring </h1>
                          <h5>By Lisa Jewall</h5>
                          <div className='d-flex '>
                            <div className='rate-details'>
                              <span className='new-rate'>₹ 299</span> <span className='ps-2 old-rate'>₹ 440</span><br />
                              <Rating
                                initialRating={5}
                                emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                readonly={true}
                              />
                            </div>
                            <div className='ms-auto'>
                              {isAdded ? (<><img src={add} alt="Like Button" onClick={() => product_add()} /></>) : (<> <img src={remove} alt="Remove Button" onClick={() => product_remove()} /> </>)}

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-4 col-md-4 col-sm-6 col-12 mt-2 d-flex align-self-stretch'>
                  {/* <div className='normal-box box-view'>
                      <button className='sales-offer'>offer50%</button>
                      <span
                        className='float-end'
                        onClick={() => handleLikeClick(1)}
                      >
                        <img
                          src={totallikes.includes(1) ? likes : unlike}
                          alt="Like Button"
                        />
                      </span>
                      <img src={book1} className='w-100 py-2' />
                      <div class="row m-0 product-details">
                        <div class="col-9">
                          <h5>Book</h5>
                          <span className='price pe-2'>INR 100</span><span className='text-decoration-line-through rate'>INR 230</span>
                          <img src={rating} className='ms-2' />
                        </div>
                        <div class="col-3">
                          <span
                            className='float-end'
                            id={1} value={1}
                            onClick={() => handleShopClick(1,1,1)}
                          >
                            <img
                              src={totalshops.includes(0) ? add : remove}
                              alt="Shop Button"
                            />
                          </span>
                        </div>
                      </div>
                      <div className='col-12 d-flex align-items-center justify-content-end mt-3'>
                        <button className='float-end sales-offer' onClick={() => pass(1)}>view all</button>

                      </div>
                    </div> */}
                  <div className='bestseller'>
                    <div className='seller-book position-relative'>
                      <div className='best-seller'>
                        <img src={book1} height='300px' className='w-100 p-lg-4 p-md-2 p-0' />
                        <span className='selles-offer'>offer 50%</span>
                        <span className='like-position float-end m-2'>
                          <span className={` ${isLiked ? 'likes' : 'unlikes'} `}><img src={isLiked ? likes : unlike} alt="Like Button" onClick={() => product_like()} /></span>
                        </span>
                        <div className='book-details p-3'>
                          <h1>Dual Ring </h1>
                          <h5>By Lisa Jewall</h5>
                          <div className='d-flex '>
                            <div className='rate-details'>
                              <span className='new-rate'>₹ 299</span> <span className='ps-2 old-rate'>₹ 440</span><br />
                              <Rating
                                initialRating={5}
                                emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                readonly={true}
                              />
                            </div>
                            <div className='ms-auto'>
                              {isAdded ? (<><img src={add} alt="Like Button" onClick={() => product_add()} /></>) : (<> <img src={remove} alt="Remove Button" onClick={() => product_remove()} /> </>)}

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-4 col-md-4 col-sm-6 col-12 mt-2 d-flex align-self-stretch'>
                  {/* <div className='normal-box box-view'>
                      <button className='sales-offer'>offer50%</button>
                      <span
                        className='float-end'
                        onClick={() => handleLikeClick(1)}
                      >
                        <img
                          src={totallikes.includes(1) ? likes : unlike}
                          alt="Like Button"
                        />
                      </span>
                      <img src={book1} className='w-100 py-2' />
                      <div class="row m-0 product-details">
                        <div class="col-9">
                          <h5>Book</h5>
                          <span className='price pe-2'>INR 100</span><span className='text-decoration-line-through rate'>INR 230</span>
                          <img src={rating} className='ms-2' />
                        </div>
                        <div class="col-3">
                          <span
                            className='float-end'
                            id={1} value={1}
                            onClick={() => handleShopClick(1,1,1)}
                          >
                            <img
                              src={totalshops.includes(0) ? add : remove}
                              alt="Shop Button"
                            />
                          </span>
                        </div>
                      </div>
                      <div className='col-12 d-flex align-items-center justify-content-end mt-3'>
                        <button className='float-end sales-offer' onClick={() => pass(1)}>view all</button>

                      </div>
                    </div> */}
                  <div className='bestseller'>
                    <div className='seller-book position-relative'>
                      <div className='best-seller'>
                        <img src={book1} height='300px' className='w-100 p-lg-4 p-md-2 p-0' />
                        <span className='selles-offer'>offer 50%</span>
                        <span className='like-position float-end m-2'>
                          <span className={` ${isLiked ? 'likes' : 'unlikes'} `}><img src={isLiked ? likes : unlike} alt="Like Button" onClick={() => product_like()} /></span>
                        </span>
                        <div className='book-details p-3'>
                          <h1>Dual Ring </h1>
                          <h5>By Lisa Jewall</h5>
                          <div className='d-flex '>
                            <div className='rate-details'>
                              <span className='new-rate'>₹ 299</span> <span className='ps-2 old-rate'>₹ 440</span><br />
                              <Rating
                                initialRating={5}
                                emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                readonly={true}
                              />
                            </div>
                            <div className='ms-auto'>
                              {isAdded ? (<><img src={add} alt="Like Button" onClick={() => product_add()} /></>) : (<> <img src={remove} alt="Remove Button" onClick={() => product_remove()} /> </>)}

                            </div>
                          </div>
                        </div>
                      </div>
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

export default Product