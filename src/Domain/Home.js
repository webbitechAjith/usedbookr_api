import React, { useEffect, useState } from 'react'
import Header from '../Common/pages/Header'
import Footer from '../Common/pages/Footer'
import axios from "axios";
import Popup from '../Common/pages/Popup';

import '../Common/assets/css/main.css'


// apiservice include path 
import { allbooks, authLogin, authUser, banner } from '../Common/pages/apiBaseurl'



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCheck, faHeart } from '@fortawesome/free-solid-svg-icons';

// image section 
import book1 from '../Common/assets/image/book_1.png'
import book2 from '../Common/assets/image/book_2.png'
import book4 from '../Common/assets/image/book_4.png'
import book5 from '../Common/assets/image/book_5.png'
import address from '../Common/assets/image/address.png'
import message from '../Common/assets/image/message.png'
import contact from '../Common/assets/image/contact.png'
import discount from '../Common/assets/image/discount-card.png'

import { useSelector, useDispatch } from 'react-redux';
import { setisAdded, setisIncrement, setisDecrement, setisLiked, setallBookDetails, setLikedProducts, setlikeProduct, setlikescount, setShopProducts, setshopcount, setClass1Hide, setAuthorsDetails, setBannerImage } from '../Redux/CreateSlice';
import { useNavigate } from 'react-router-dom';
import SimpleSlider from '../Common/pages/SimpleSlider';
import BestSeller from '../Common/pages/BestSeller';
import Authors from '../Common/pages/Authors';
import Allbooks from '../Common/pages/Allbooks';
import Newarrival from '../Common/pages/Newarrival';

function Home() {
  const { bannerImage, allbookDetails, authorsDetails } = useSelector((state) => state.usedbookr_product)

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const all_product = () => {
    navigate('/Allproduct')
  }

  const bookproduct = async () => {
    const data = await allbooks();
    const productsWithIds = data.map((product, index) => ({
      id: index + 1,
      ...product
    }));
    dispatch(setallBookDetails(productsWithIds))
  }

  const all_authors = async () => {
    const data = await authUser();
    dispatch(setAuthorsDetails(data))
  }
  const all_banners = async () => {
    const data = await banner();
    dispatch(setBannerImage(data))
  }
  // console.log(1, allbookDetails)
  // const [showPopUp, setShowPopUp] = useState(false);
  // const showPopupHandler = () => setShowPopUp(true)

  // no.of product view on array 
  // const firstThreeProducts = allbookDetails.slice(0, 3);
  useEffect(() => {
    if (allbookDetails == "") {
      bookproduct();
    }
    all_authors();
    all_banners();
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
              <div className='col-lg-7 col-md-12 col-12 p-0 align-items-stretch'>
                <div id="carouselExampleIndicators" className="carousel slide h-100" data-bs-ride="carousel">
                  <div className="carousel-indicators">
                    {bannerImage.length > 0 && bannerImage.map((numLength, index) => (
                      <button
                        key={index}
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to={index}
                        className={index === 0 ? 'active' : ''}
                        aria-current={index === 0 ? 'true' : 'false'}
                        aria-label={`Slide ${index}`}
                      ></button>
                    ))}
                    {/* <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button> */}
                  </div>
                  <div className="carousel-inner h-100 mobile-ht">
                    {bannerImage.map((imageUrl, index) => (
                      <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''} w-100 h-100`}>
                        <img src={imageUrl.images} className='w-100 h-100 object-fit-cover' alt={`Image ${index}`} />
                      </div>
                    ))}
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

                    <img src={discount} className='w-100' />
                  </div>
                </div>
                <div className='d-lg-none d-block'>
                  <div className='row m-0'>
                    <div className='col-12 mt-md-0 mt-2 p-0'>
                      <div className='h-100 pt-1'>
                        <div className='offer-card'>

                          <img src={discount} className='w-100' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <header section end  */}
          {/* Best sellers in indoor plants start  */}
          <div className='pt-5 container-95'>
            <h1 className='product-title'>Browse your book on Categories</h1>
            <SimpleSlider />
          </div>
          <div className='container-95'>
            <h1 className='product-title'>Browse your book on Authors</h1>
            <div className='mt-4'>
              {authorsDetails == "" ? <><h1>noitems</h1></> : <><Authors /></>}
            </div>
          </div>

          <div className='d-lg-block d-none'>
            <div className='product-list mt-5 mb-3 container-95'>
              <span className='product-title'>Best Sellers in Education Books</span>
              <span className='float-end viewall' onClick={() => all_product()}>View All<FontAwesomeIcon icon={faArrowRight} style={{ color: '#241D60' }} className='ps-2' /></span>
              {allbookDetails == '' ? <><h1 className='text-center product-title'>No items</h1></> : <><Allbooks /></>}
            </div>
          </div>
          <div className='d-lg-none d-block'>
            <div className='container-90 product-list mt-5 mb-3'>
              <span className='product-title'>Best Sellers in Education Books</span>
              <Allbooks />
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
        <div className='container-fluid'>
          <div className='pots-section mt-5'>
            <div className='d-lg-block d-none container-95'>
              <span className='product-title'>Best Sellers in Comics</span>
              <span className='float-end viewall' onClick={() => all_product()}>View All<FontAwesomeIcon icon={faArrowRight} style={{ color: '#241D60' }} className='ps-2' /></span>
              <BestSeller />
            </div>
            <div className='d-lg-none d-block container-95'>
              <span className='product-title'>Best Sellers in Comics</span>
              <BestSeller />
              <div className='author5'>
                <button onClick={() => all_product()}>View All</button>
              </div>
              {/* <span className='viewall'></span> */}
            </div>
          </div>
          <div className='best-seller mt-5 mb-4'>
            <div className='d-lg-block d-none container-95'>
              <span className='product-title'>New Arrivals in Education</span>
              <span className='float-end viewall' onClick={() => all_product()}>View All<FontAwesomeIcon icon={faArrowRight} style={{ color: '#30844A' }} className='ps-2' /></span>
              <Newarrival />
            </div>
            <div className='d-lg-none d-block container-95'>
              <span className='product-title'>New Arrivals in Education</span>
              <Newarrival />
              <div className='author5'>
                <button onClick={() => all_product()}>View All</button>
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