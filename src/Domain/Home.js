import React, { useEffect, useState } from 'react'
import Header from '../Common/pages/Header'
import Footer from '../Common/pages/Footer'
import axios from "axios";
import Popup from '../Common/pages/Popup';

import '../Common/assets/css/main.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCheck, faHeart } from '@fortawesome/free-solid-svg-icons';

// image section 
import book1 from '../Common/assets/image/book_1.png'
import book2 from '../Common/assets/image/book_2.png'
import likes from '../Common/assets/image/like.png'
import unlike from '../Common/assets/image/shop-heart.png'
import plant3 from '../Common/assets/image/plant_3.png'
import rating from '../Common/assets/image/Rating.png'
import add from '../Common/assets/image/addcard.png'
import remove from '../Common/assets/image/removecard.png'
import book4 from '../Common/assets/image/book_4.png'
import book5 from '../Common/assets/image/book_5.png'
import check from '../Common/assets/image/Check.png'
import pots1 from '../Common/assets/image/sales1.png'
import seller1 from '../Common/assets/image/seller1.png'
import address from '../Common/assets/image/address.png'
import message from '../Common/assets/image/message.png'
import contact from '../Common/assets/image/contact.png'
import arrive1 from '../Common/assets/image/arrive1.png'
import copy from '../Common/assets/image/copy.png'
import flash from '../Common/assets/image/flash.png'
import discount from '../Common/assets/image/discount-card.png'

import { useSelector, useDispatch } from 'react-redux';
import { setisAdded, setisIncrement, setisDecrement, setisLiked, setallplantDetails, setLikedProducts, setlikeProduct, setlikescount, setShopProducts, setshopcount, setClass1Hide } from '../Redux/CreateSlice';
import { useNavigate } from 'react-router-dom';
import SimpleSlider from '../Common/pages/SimpleSlider';
import BestSeller from '../Common/pages/BestSeller';
import Authors from '../Common/pages/Authors';

function Home() {
  const { isLiked, isAdded, allplantsDetails, likedProducts, searchItemDetails, likescount, shopProducts, shopcount, searchfield } = useSelector((state) => state.usedbookr_product)
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
  const product_add = () => {

  }
  const product_remove = () => {

  }
  const product_like = () => {
    console.log("ajith")
  }
  const all_product = () => {
    navigate('/Allproduct')
  }
  const plantproduct = async () => {
    // const { data } = await axios.get('https://webbitech.co.in/ecommerce/public/api/productlist');
    //   dispatch(setallplantDetails(data.data))
    const { data } = await axios.get('https://fakestoreapi.com/products');
    dispatch(setallplantDetails(data.data))

  }
  // const [showPopUp, setShowPopUp] = useState(false);
  // const showPopupHandler = () => setShowPopUp(true)

  // no.of product view on array 
  // const firstThreeProducts = allplantsDetails.slice(0, 3);
  useEffect(() => {
    plantproduct();
    dispatch(setClass1Hide(false))
    window.scrollTo(0, 0);
  }, [])
  return (
    <div>
      {/* {popup} */}
      {/* <Popup /> */}
      <Header />

      <section className='pt-3'>
        <div className='container-fluid'>
          {/* <header section start  */}
          <div className='d-lg-block'>
            <div className='row m-0  product-img'>
              <div className='col-lg-7 col-md-12 col-12 p-0 d-lg-flex align-items-stretch'>
                <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                  <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                  </div>
                  <div class="carousel-inner h-100">
                    <div class="carousel-item active h-100">
                      <img src={book1} className='w-100 h-100' />
                    </div>
                    <div class="carousel-item h-100">
                      <img src={book2} className='w-100 h-100' />
                    </div>
                    <div class="carousel-item h-100">
                      <img src={book1} className='w-100 h-100' />
                    </div>
                    <div class="carousel-item h-100">
                      <img src={book2} className='w-100 h-100' />
                    </div>
                  </div>
                  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <FontAwesomeIcon icon={faArrowLeft} style={{ color: 'green' }} className='arrow-section' />
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <FontAwesomeIcon icon={faArrowRight} style={{ color: 'green' }} className='arrow-section' />
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
              <div className='col-lg-5 col-12 pe-lg-0 mt-lg-0 mt-2 pe-0 ps-lg-2 ps-0'>
                <div className='d-lg-block d-none'>
                  <div className="cards h-50 img-bg" >
                    <div className="card-body card-content text-center">
                      <h5>Best Deal</h5>
                      <h4>Sell your book for best price</h4>
                      <button className='sell_now'>Sell Now <FontAwesomeIcon icon={faArrowRight} style={{ color: '#FFD731' }} className='ps-2' /></button>
                    </div>
                  </div>
                  <div className='h-50 pt-1'>
                    {/* <div className='offer-card'>
                      <div className='p-1'>
                        <div className='card-border'>
                          <h2>30% OFF</h2>
                          <p>For everything</p>
                          <span className='code'>Code: BOOKLOVER</span>
                          <span className='float-end copy'><img src={copy} />copy</span>
                          <div className='flash mt-2'>
                            <img src={flash} />
                            <span className='sale'>Flash sale</span>
                            <span className='float-end sale'>Ends in 01 h 08 m 59 s</span>
                          </div>
                          <div>
                            <ul>
                              <li>Cannot be combined with other coupons or promotions</li>
                              <li>Only on full priced items</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    <img src={discount} className='w-100' />
                  </div>
                </div>
                <div className='d-lg-none d-block'>
                  <div className='row m-0'>
                    {/* <div className='col-md-6 col-12'>
                      <div className="cards h-100 img-bg" >
                        <div className="card-body card-content text-center">
                          <h5>Best Deal</h5>
                          <h4>Sell your book for best price</h4>
                          <button className='sell_now'>Sell Now <FontAwesomeIcon icon={faArrowRight} style={{ color: '#FFD731' }} className='ps-2' /></button>
                        </div>
                      </div>
                    </div> */}
                    <div className='col-12 mt-md-0 mt-2 p-0'>
                      <div className='h-100 pt-1'>
                        <div className='offer-card'>
                          {/* <div className='p-1'>
                            <div className='card-border'>
                              <h2>30% OFF</h2>
                              <p>For everything</p>
                              <span className='code'>Code: BOOKLOVER</span>
                              <span className='float-end copy'><img src={copy} />copy</span>
                              <div className='flash mt-2'>
                                <img src={flash} />
                                <span className='sale'>Flash sale</span>
                                <span className='float-end sale'>Ends in 01 h 08 m 59 s</span>
                              </div>
                              <div>
                                <ul>
                                  <li>Cannot be combined with other coupons or promotions</li>
                                  <li>Only on full priced items</li>
                                </ul>
                              </div>
                            </div>
                          </div> */}
                          <img src={discount} className='w-100' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className='d-lg-none d-block'>
            <div className='row m-0 product-img '>
              <div className='col-md-6 col-6 p-0'>
                <img src={book1} className='w-100 h-100' />
              </div>
              <div className='col-md-6 col-6 px-2'>
                <img src={book2} className='w-100 h-100' />
              </div>
              <div className='col-12 p-0 mt-lg-0 mt-2'>
                <div className="cards h-100 img-bg" >
                  <div className="card-body card-content">
                    <h5>Best Deal</h5>
                    <h4>Special Products Deal of the Month</h4>
                    <p>Shop Now <FontAwesomeIcon icon={faArrowRight} style={{ color: '#00AF07' }} className='ps-2' /></p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* <header section end  */}
          {/* Best sellers in indoor plants start  */}
          <div className='container-95 pt-5'>
            <h1 className='product-title'>Browse your book on Categories</h1>
            <SimpleSlider />
          </div>
          <div className='container-95 pt-5'>
            <h1 className='product-title'>Browse your book on Authors</h1>
            <div className='mt-4'>
              <Authors />
            </div>
          </div>
          {/* <div className='row m-0'>
              <div className='col-lg-10 col-md-9 col-8'>
                <span className='product-title'>Best Sellers in Education Books</span>
              </div>
              <div className='col-lg-2 col-md-3 col-4 p-0 '>
                <span className='float-end viewall' onClick={() => all_product()}>View All<FontAwesomeIcon icon={faArrowRight} style={{ color: '#056839' }} className='ps-2 d-lg-block d-md-block d-sm-block d-none' /></span>
              </div>
            </div> */}
          <div className='d-lg-block d-none'>
            <div className='container-90 product-list mt-5 mb-3'>
              <span className='product-title'>Best Sellers in Education Books</span>
              <span className='float-end viewall' onClick={() => all_product()}>View All<FontAwesomeIcon icon={faArrowRight} style={{ color: '#241D60' }} className='ps-2' /></span>
              {/* <div className='row m-0 py-5'>
                {searchfield ?
                  <>
                    {allplantsDetails && allplantsDetails.map((data, index) => {
                      return (
                        <div className='col-lg-3 col-md-4 col-sm-6 col-12 mt-2 d-flex align-self-stretch'>
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
                          </div>
                        </div>
                      )
                    })}
                  </> :
                  <>
                    <h1 className='text-center product-title'>No items</h1>
                  </>
                }

              </div> */}
              <BestSeller />
            </div>
          </div>
          <div className='d-lg-none d-block'>
            <div className='container-90 product-list mt-5 mb-3'>
              <span className='product-title'>Best Sellers in Education Books</span>
              {/* <div className='row m-0 py-5'>
                {searchfield ?
                  <>
                    {allplantsDetails && allplantsDetails.map((data, index) => {
                      return (
                        <div className='col-lg-3 col-md-4 col-sm-6 col-12 mt-2 d-flex align-self-stretch'>
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
                          </div>
                        </div>
                      )
                    })}
                  </> :
                  <>
                    <h1 className='text-center product-title'>No items</h1>
                  </>
                }

              </div> */}
              <BestSeller />
              <div className='author5'>
                <button onClick={() => all_product()}>View All</button>
              </div>
            </div>
          </div>
        </div>
        {/* Best sellers in indoor plants end  */}
        <div className='plant-store'>
          <div className='row m-0 p-lg-5 p-md-5 p-1 flex-wrap-reverse'>
            <div className='col-lg-6 col-12 slide-left visible pt-lg-0 pt-4'>
              <img src={book4} className='image-1 pe-2' />
              <img src={book5} className='image-2' />
            </div>
            <div className='col-lg-6 col-12 ps-lg-5 ps-md-5 ps-sm-3 ps-0 mt-lg-0 mt-5 slide-right visible'>
              <h3 className='w-lg-50 w-md-50 w-100 mb-4'>100% Trusted Book Store</h3>
              <div className='row m-0'>
                <div className='col-1 p-0'>
                  <div className='circle'><FontAwesomeIcon icon={faCheck} style={{ color: '#574AC9', margin: '7px 0px' }} /></div>
                </div>
                <div className='col-11 ps-2'>
                  <h4>Ut quis tempus erat. Phasellus euismod bibendum.</h4>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.</p>
                </div>
                <div className='col-1 p-0 '>
                  <div className='circle'><FontAwesomeIcon icon={faCheck} style={{ color: '#574AC9', margin: '7px 0px' }} /></div>
                </div>
                <div className='col-11 ps-2'>
                  <h4>Ut quis tempus erat. Phasellus euismod bibendum.</h4>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.</p>
                  <div className='text-lg-start text-md-start text-center'>
                    <button>Shop Now <FontAwesomeIcon icon={faArrowRight} style={{ color: '#241D60' }} className='ps-2' /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='container-90'>
          <div className='pots-section mt-5'>
            <div className='d-lg-block d-none'>
              <span className='product-title'>Best Sellers in Comics</span>
              <span className='float-end viewall'>View All<FontAwesomeIcon icon={faArrowRight} style={{ color: '#241D60' }} className='ps-2' /></span>
              <BestSeller />
            </div>
            <div className='d-lg-none d-block'>
              <span className='product-title'>Best Sellers in Comics</span>
              <BestSeller />
              <div className='author5'>
                <button>View All</button>
              </div>
              {/* <span className='viewall'></span> */}
            </div>
          </div>
          <div className='best-seller mt-5 mb-4'>
            <div className='d-lg-block d-none'>
              <span className='product-title'>New Arrivals in Education</span>
              <span className='float-end viewall'>View All<FontAwesomeIcon icon={faArrowRight} style={{ color: '#30844A' }} className='ps-2' /></span>
              <BestSeller />
            </div>
            <div className='d-lg-none d-block'>
              <span className='product-title'>New Arrivals in Education</span>
              <BestSeller />
              <div className='author5'>
                <button>View All</button>
              </div>
            </div>
          </div>
          <div className='contact-info mx-lg-4 mx-md-4 mx-sm-2 mx-0 my-lg-5 my-md-4 my-sm-3 my-2'>
            <div className='row m-0 p-lg-5 p-md-5 py-2 '>
              <div className='col-lg-3 col-md-6 col-12 '>
                <div className='contact-box'>
                  <img src={address} alt='location' />
                  <h4>Our Location</h4>
                  <p>PO BOX:115786 - Al Warsan3, Dubai, UAE.</p>
                </div>
              </div>
              <div className='col-lg-3 col-md-6 col-12 my-lg-0 my-md-0 my-2'>
                <div className='contact-box'>
                  <img src={contact} alt='location' />
                  <h4>Call Us </h4>
                  <p className='number'>+971 5 65015231</p>
                </div>
              </div>
              <div className='col-lg-6 col-md-12 col-12 my-lg-0 my-2'>
                <div className='contact-box'>
                  <img src={message} alt='location' />
                  <h4>Subscribe Newsletter</h4>
                  <div className="input-group input-set">
                    <input type="text" className="form-control" placeholder="Your email address" aria-label="Search" aria-describedby="searchButton" />
                    <button className="btn" type="button" id="searchButton">Subscribe</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Home