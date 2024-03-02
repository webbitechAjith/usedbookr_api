import React, { useEffect, useState } from 'react'
import Header from '../Common/pages/Header'
import Footer from '../Common/pages/Footer'
import Aside from '../Common/pages/Aside'
import axios from "axios";
import Rating from 'react-rating';

// image path 

import likes from '../Common/assets/image/heart-like.png'
import unlike from '../Common/assets/image/heart-unlike.png'
import plant3 from '../Common/assets/image/plant_3.png'
import rating from '../Common/assets/image/Rating.png'
import add from '../Common/assets/image/addcard.png'
import remove from '../Common/assets/image/removecard.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faHeart, faBagShopping, faFilter } from '@fortawesome/free-solid-svg-icons';


import { useSelector, useDispatch } from 'react-redux';
import { setisAdded, setisIncrement, setisDecrement, setisLiked, setallBookDetails, setLikedProducts, setlikeProduct, setlikescount, setShopProducts, setshopcount, setproductIdDetails, setClass1Hide, setsingleProductView } from '../Redux/CreateSlice';
import { Link, useNavigate } from 'react-router-dom'
import Authorname from '../Common/pages/Authorname';

function Autherfliter() {

  const { isLiked, isAdded, allbookDetails, authorBookDetails, likedProducts, likescount, shopProducts, shopcount, minPrice, priceFilter, filteredProducts, productIdDetails, searchfield, authorsName, authorsDetails } = useSelector((state) => state.usedbookr_product)
  const [showCategory, setShowCategory] = useState(false);
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
  const pass = (data) => {
    const updatedData = [data];
    dispatch(setproductIdDetails(updatedData))
    navigate('/Description');
  }
  const author_name = () => {
    navigate('/authors')
  }
  const click_view = (id) => {
    dispatch(setsingleProductView([allbookDetails[id]]))
    navigate('/Description')
  }

  const toggleAuthor = () => {
    setShowCategory(!showCategory);
  };

  useEffect(() => {
    dispatch(setClass1Hide(false))
    window.scrollTo(0, 0);
  }, []);

  
  return (
    <div className='product-section'>
      <Header />
      <div className='product-view container-95'>
        <div className='d-lg-block d-none'>
          <div className='row m-0'>
            <div className='col-3'>
              <Authorname />
            </div>
            <div className='col-9'>
              <div className='product-list my-lg-5 my-2'>
                <div className='row m-0 bestseller'>
                  {allbookDetails.length > 0 && searchfield ?
                    <>
                      {allbookDetails && allbookDetails.map((book, index) => {
                        return (
                          <>
                            {authorsName.length > 0 ?
                              <>
                                {book.author.toLowerCase() === authorsName.toLowerCase() ?
                                  <>
                                    <div className='col-lg-3 col-md-4 col-sm-6 col-12 pb-2 d-flex align-self-stretch py-0'>
                                      <div className={totalshops.includes(book.id) ? 'normal-box seller-book position-relative' : 'box-view seller-book position-relative'}>
                                        <div className='best-seller'>
                                          <img src={book.image} height='300px' className='w-100 p-lg-4 p-md-2 p-0' />
                                          <span className='selles-offer'>offer 60%</span>

                                          <span
                                            className='like-position float-end m-2'
                                            onClick={() => handleLikeClick(book)}
                                          >
                                            <span className={` ${isLiked ? 'likes' : 'unlikes'} `}>
                                              <img
                                                src={totallikes.includes(book.id) ? likes : unlike}
                                                alt="Like Button"
                                              />
                                            </span>
                                          </span>
                                          <div className='book-details p-3'>
                                            <h1 className='w-100' title={book.title}>{book.title_long.slice(0, 10)}...</h1>
                                            {book.author === undefined ? <><h5 className='text-primary'>No Author</h5></> : <><h5 className='text-primary' title={book.author} onClick={() => author_name()}>{book.author.slice(0, 10)}</h5></>}
                                            <div className='d-flex '>
                                              <div className='rate-details'>
                                                <span className='new-rate'>₹{book.msrp}</span> <span className='ps-2 old-rate'>₹ 440</span><br />
                                                <Rating
                                                  initialRating={5}
                                                  emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                                  fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                                  readonly={true}
                                                />
                                              </div>
                                              <div className='ms-auto'>
                                                <span
                                                  className={totalshops.includes(book.id) ? 'normal-box1 float-end' : 'box-view1 float-end'}
                                                  id={book.id} value={book.id}
                                                  onClick={() => handleShopClick(book, book.id, book.msrp)}
                                                >

                                                  {totalshops.includes(book.id) ? <><FontAwesomeIcon icon={faBagShopping} className='mr-fixed' /></> : <><FontAwesomeIcon icon={faBagShopping} className='mr-fixed' /></>}
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                  :
                                  <>
                                    {authorBookDetails.length > 0 ?
                                      <>
                                        <div className='col-lg-3 col-md-4 col-sm-6 col-12 pb-2 d-flex align-self-stretch py-0'>
                                          <div className={totalshops.includes(book.id) ? 'normal-box seller-book position-relative' : 'box-view seller-book position-relative'}>
                                            <div className='best-seller'>
                                              <img src={book.image} height='300px' className='w-100 p-lg-4 p-md-2 p-0' />
                                              <span className='selles-offer'>offer 10%</span>

                                              <span
                                                className='like-position float-end m-2'
                                                onClick={() => handleLikeClick(book)}
                                              >
                                                <span className={` ${isLiked ? 'likes' : 'unlikes'} `}>
                                                  <img
                                                    src={totallikes.includes(book.id) ? likes : unlike}
                                                    alt="Like Button"
                                                  />
                                                </span>
                                              </span>
                                              <div className='book-details p-3'>
                                                <h1 className='w-100' title={book.title}>{book.title_long.slice(0, 10)}...</h1>
                                                {book.author === undefined ? <><h5 className='text-primary'>No Author</h5></> : <><h5 className='text-primary' title={book.author} onClick={() => author_name()}>{book.author.slice(0, 10)}</h5></>}
                                                <div className='d-flex '>
                                                  <div className='rate-details'>
                                                    <span className='new-rate'>₹{book.msrp}</span> <span className='ps-2 old-rate'>₹ 440</span><br />
                                                    <Rating
                                                      initialRating={5}
                                                      emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                                      fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                                      readonly={true}
                                                    />
                                                  </div>
                                                  <div className='ms-auto'>
                                                    <span
                                                      className={totalshops.includes(book.id) ? 'normal-box1 float-end' : 'box-view1 float-end'}
                                                      id={book.id} value={book.id}
                                                      onClick={() => handleShopClick(book, book.id, book.msrp)}
                                                    >

                                                      {totalshops.includes(book.id) ? <><FontAwesomeIcon icon={faBagShopping} className='mr-fixed' /></> : <><FontAwesomeIcon icon={faBagShopping} className='mr-fixed' /></>}
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                      :
                                      <></>
                                    }
                                  </>
                                }
                              </>
                              :
                              <>
                                <div className='col-lg-3 col-md-4 col-sm-6 col-12 pb-2 d-flex align-self-stretch py-0'>
                                  <div className={totalshops.includes(book.id) ? 'normal-box seller-book position-relative' : 'box-view seller-book position-relative'}>
                                    <div className='best-seller'>
                                      <img src={book.image} height='300px' className='w-100 p-lg-4 p-md-2 p-0' />
                                      <span className='selles-offer'>offer 60%</span>

                                      <span
                                        className='like-position float-end m-2'
                                        onClick={() => handleLikeClick(book)}
                                      >
                                        <span className={` ${isLiked ? 'likes' : 'unlikes'} `}>
                                          <img
                                            src={totallikes.includes(book.id) ? likes : unlike}
                                            alt="Like Button"
                                          />
                                        </span>
                                      </span>
                                      <div className='book-details p-3'>
                                        <h1 className='w-100' title={book.title}>{book.title_long.slice(0, 15)}...</h1>
                                        {book.author === undefined ? <><h5 className='text-primary'>No Author</h5></> : <><h5 className='text-primary' title={book.author} onClick={() => author_name()}>{book.author.slice(0, 10)}</h5></>}
                                        <div className='d-flex '>
                                          <div className='rate-details'>
                                            <span className='new-rate'>₹{book.msrp}</span> <span className='ps-2 old-rate'>₹ 440</span><br />
                                            <Rating
                                              initialRating={5}
                                              emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                              fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                              readonly={true}
                                            />
                                          </div>
                                          <div className='ms-auto'>
                                            <span
                                              className={totalshops.includes(book.id) ? 'normal-box1 float-end' : 'box-view1 float-end'}
                                              id={book.id} value={book.id}
                                              onClick={() => handleShopClick(book, book.id, book.msrp)}
                                            >

                                              {totalshops.includes(book.id) ? <><FontAwesomeIcon icon={faBagShopping} className='mr-fixed' /></> : <><FontAwesomeIcon icon={faBagShopping} className='mr-fixed' /></>}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            }
                          </>
                        )
                      })}
                    </>
                    :
                    <>
                      <h1 className='text-center product-title'>No items</h1>
                    </>}

                </div>
              </div >
            </div>
          </div>
        </div>
        <div className='d-lg-none d-block'>
          <div className='text-end d-lg-none d-block filter-category my-2'>
            <button onClick={toggleAuthor}><FontAwesomeIcon icon={faFilter} style={{ color: '#FFF' }} className='mx-2' />filter</button>
          </div>
          <div className='row m-0 bestseller py-3'>
            {allbookDetails.length > 0 && searchfield ?
              <>
                {allbookDetails && allbookDetails.map((book, index) => {
                  return (
                    <>
                      {authorsName.length > 0 ?
                        <>
                          {book.author.toLowerCase() === authorsName.toLowerCase() ?
                            <>
                              <div className='col-lg-3 col-md-4 col-sm-6 col-12 pb-2 d-flex align-self-stretch py-0'>
                                <div className={totalshops.includes(book.id) ? 'normal-box seller-book position-relative' : 'box-view seller-book position-relative'}>
                                  <div className='best-seller'>
                                    <img src={book.image} height='300px' className='w-100 p-lg-4 p-md-2 p-0' />
                                    <span className='selles-offer'>offer 60%</span>

                                    <span
                                      className='like-position float-end m-2'
                                      onClick={() => handleLikeClick(book)}
                                    >
                                      <span className={` ${isLiked ? 'likes' : 'unlikes'} `}>
                                        <img
                                          src={totallikes.includes(book.id) ? likes : unlike}
                                          alt="Like Button"
                                        />
                                      </span>
                                    </span>
                                    <div className='book-details p-3'>
                                      <h1 className='w-100' title={book.title}>{book.title_long.slice(0, 35)}...</h1>
                                      {book.author === undefined ? <><h5 className='text-primary'>No Author</h5></> : <><h5 className='text-primary' title={book.author} onClick={() => author_name()}>{book.author.slice(0, 10)}</h5></>}
                                      <div className='d-flex '>
                                        <div className='rate-details'>
                                          <span className='new-rate'>₹{book.msrp}</span> <span className='ps-2 old-rate'>₹ 440</span><br />
                                          <Rating
                                            initialRating={5}
                                            emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                            fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                            readonly={true}
                                          />
                                        </div>
                                        <div className='ms-auto'>
                                          <span
                                            className={totalshops.includes(book.id) ? 'normal-box1 float-end' : 'box-view1 float-end'}
                                            id={book.id} value={book.id}
                                            onClick={() => handleShopClick(book, book.id, book.msrp)}
                                          >

                                            {totalshops.includes(book.id) ? <><FontAwesomeIcon icon={faBagShopping} className='mr-fixed' /></> : <><FontAwesomeIcon icon={faBagShopping} className='mr-fixed' /></>}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                            :
                            <>
                              {authorBookDetails.length > 0 ?
                                <>
                                  <div className='col-lg-3 col-md-4 col-sm-6 col-12 pb-2 d-flex align-self-stretch py-0'>
                                    <div className={totalshops.includes(book.id) ? 'normal-box seller-book position-relative' : 'box-view seller-book position-relative'}>
                                      <div className='best-seller'>
                                        <img src={book.image} height='300px' className='w-100 p-lg-4 p-md-2 p-0' />
                                        <span className='selles-offer'>offer 60%</span>

                                        <span
                                          className='like-position float-end m-2'
                                          onClick={() => handleLikeClick(book)}
                                        >
                                          <span className={` ${isLiked ? 'likes' : 'unlikes'} `}>
                                            <img
                                              src={totallikes.includes(book.id) ? likes : unlike}
                                              alt="Like Button"
                                            />
                                          </span>
                                        </span>
                                        <div className='book-details p-3'>
                                          <h1 className='w-100' title={book.title}>{book.title_long.slice(0, 35)}...</h1>
                                          {book.author === undefined ? <><h5 className='text-primary'>No Author</h5></> : <><h5 className='text-primary' title={book.author} onClick={() => author_name()}>{book.author.slice(0, 10)}</h5></>}
                                          <div className='d-flex '>
                                            <div className='rate-details'>
                                              <span className='new-rate'>₹{book.msrp}</span> <span className='ps-2 old-rate'>₹ 440</span><br />
                                              <Rating
                                                initialRating={5}
                                                emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                                fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                                readonly={true}
                                              />
                                            </div>
                                            <div className='ms-auto'>
                                              <span
                                                className={totalshops.includes(book.id) ? 'normal-box1 float-end' : 'box-view1 float-end'}
                                                id={book.id} value={book.id}
                                                onClick={() => handleShopClick(book, book.id, book.msrp)}
                                              >

                                                {totalshops.includes(book.id) ? <><FontAwesomeIcon icon={faBagShopping} className='mr-fixed' /></> : <><FontAwesomeIcon icon={faBagShopping} className='mr-fixed' /></>}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                                :
                                <></>
                              }
                            </>
                          }
                        </>
                        :
                        <>
                          <div className='col-lg-3 col-md-4 col-sm-6 col-12 pb-2 d-flex align-self-stretch py-0'>
                            <div className={totalshops.includes(book.id) ? 'normal-box seller-book position-relative' : 'box-view seller-book position-relative'}>
                              <div className='best-seller'>
                                <img src={book.image} height='300px' className='w-100 p-lg-4 p-md-2 p-0' />
                                <span className='selles-offer'>offer 60%</span>

                                <span
                                  className='like-position float-end m-2'
                                  onClick={() => handleLikeClick(book)}
                                >
                                  <span className={` ${isLiked ? 'likes' : 'unlikes'} `}>
                                    <img
                                      src={totallikes.includes(book.id) ? likes : unlike}
                                      alt="Like Button"
                                    />
                                  </span>
                                </span>
                                <div className='book-details p-3'>
                                  <h1 className='w-100' title={book.title}>{book.title_long.slice(0, 35)}...</h1>
                                  {book.author === undefined ? <><h5 className='text-primary'>No Author</h5></> : <><h5 className='text-primary' title={book.author} onClick={() => author_name()}>{book.author.slice(0, 10)}</h5></>}
                                  <div className='d-flex '>
                                    <div className='rate-details'>
                                      <span className='new-rate'>₹{book.msrp}</span> <span className='ps-2 old-rate'>₹ 440</span><br />
                                      <Rating
                                        initialRating={5}
                                        emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                        fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                        readonly={true}
                                      />
                                    </div>
                                    <div className='ms-auto'>
                                      <span
                                        className={totalshops.includes(book.id) ? 'normal-box1 float-end' : 'box-view1 float-end'}
                                        id={book.id} value={book.id}
                                        onClick={() => handleShopClick(book, book.id, book.msrp)}
                                      >
                                        {totalshops.includes(book.id) ? <><FontAwesomeIcon icon={faBagShopping} className='mr-fixed' /></> : <><FontAwesomeIcon icon={faBagShopping} className='mr-fixed' /></>}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      }
                    </>
                  )
                })}
              </>
              :
              <>
                <h1 className='text-center product-title'>No items</h1>
              </>}

          </div>
        </div>
      </div>
      <div className='mt-2'>
        <Footer />
      </div>
    </div>
  )
}

export default Autherfliter