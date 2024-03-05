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
import book1 from '../Common/assets/image/book_1.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faHeart, faBagShopping } from '@fortawesome/free-solid-svg-icons';

import { useSelector, useDispatch } from 'react-redux';
import { setisAdded, setisIncrement, setisDecrement, setisLiked, setallBookDetails, setLikedProducts, setlikeProduct, setlikescount, setShopProducts, setshopcount, setproductIdDetails, setsingleProductView, setUserIdShop, setMegaMenu, setUserIdLike } from '../Redux/CreateSlice';
import { Link, useNavigate } from 'react-router-dom'
import { addTocard_list, addTowhish_list, allbooks, megamenu_list, removeTocard_list } from '../Common/pages/apiBaseurl';

function Product() {

  const { isLiked, isAdded, allbookDetails, userIdShop, userIdLike, likedProducts, likescount, shopProducts, filterCategory, shopcount, minPrice, priceFilter, filteredProducts, productIdDetails, searchfield } = useSelector((state) => state.usedbookr_product)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // like product click fn 
  const totallikes = likedProducts.map((data) => data.id);
  const handleLikeClick = async (product, id) => {
    const auth_login = localStorage.getItem('usedbookrtoken')
    const auth_uesrlogin = localStorage.getItem('isLoginAuth')
    if (auth_login || auth_uesrlogin == true) {
      // Check if the product ID is in the likedProducts array
      if (userIdLike.some(data => data.id === id)) {
        await removeTocard_list(id);
        window.location.reload();
      } else {
        const set_iddetails = await addTowhish_list(product);
        dispatch(setUserIdLike(set_iddetails))
        window.location.reload();
      }
    } else {
      alert("Please login your account")
      navigate('/login')
    }
  }

  // shop product click fn 
  const totalshops = shopProducts.map((data) => data.id);
  const handleShopClick = async (product, id, price) => {
    const auth_login = localStorage.getItem('usedbookrtoken')
    const auth_uesrlogin = localStorage.getItem('isLoginAuth')
    if (auth_login || auth_uesrlogin == true) {
      // Check if the product ID is in the likedProducts array
      if (userIdShop.some(data => data.id === id)) {
        await removeTocard_list(id);
        window.location.reload();
      } else {
        const set_iddetails = await addTocard_list(product, 1);
        dispatch(setUserIdShop(set_iddetails))
        navigate('/Purchase');
      }
    } else {
      alert("Please login your account")
      navigate('/login')
    }
  }

  const all_product = () => {
    navigate('/Allproduct')
  }
  const plantproduct = async () => {
    // const { data } = await axios.get('https://webbitech.co.in/ecommerce/public/api/productlist');
    // dispatch(setallBookDetails(data.data))
    // const { data } = await axios.get('https://fakestoreapi.com/products');
    // dispatch(setallBookDetails(data.data))

  }

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
  const author_name = () => {
    navigate('/authors')
  }
  const click_view = (id) => {
    dispatch(setsingleProductView([allbookDetails[id]]))
    navigate('/Description')
  }
  const over_allbook = async () => {
    const books = await allbooks()
    dispatch(setallBookDetails(books))
  }

  useEffect(() => {
    over_allbook();
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
              <div className='product-list my-4'>
                <div className='row m-0  py-4 bestseller'>
                  {filterCategory?.length > 0 ?
                    <>
                      {filterCategory && allbookDetails && (
                        allbookDetails?.length > 0 ? (
                          allbookDetails
                            .filter(book => filterCategory.some(category => book.category_id[0].name === category.name ||
                              (
                                book.language === category.lan ||
                                book.varient.some(variant => variant.bookconditions === category.con) ||
                                book.varient.some(variant => variant.bindings === category.bind) ||
                                book.original_price == category.original_price
                              )
                            ))
                            .map(book => (
                              <div className='col-lg-3 col-md-4 col-sm-6 col-12 mt-2 d-flex align-self-stretch' key={book.id}>
                                <div className={userIdShop && userIdShop.length > 0 ? (userIdShop.some(cartId => cartId.book_id === book.id) ? 'normal-box seller-book position-relative' : 'box-view seller-book position-relative') : 'box-view seller-book position-relative'}>
                                  <div className='best-seller'>
                                    <img src={book.image} height='300px' className='w-100 p-lg-4 p-md-2 p-0' />
                                    <span className='selles-offer'>offer 60%</span>
                                    {userIdLike && userIdLike.length > 0 ? (
                                      <>
                                        {userIdLike.some(cartId => cartId.book_id === book.id) ? (
                                          <>
                                            <span
                                              className='like-position float-end'
                                              id={book.id}
                                              value={book.id}
                                              onClick={() => {
                                                const cartId = userIdLike.find(cart => cart.book_id === book.id);
                                                handleLikeClick(book, cartId.id);
                                              }}
                                            >
                                              <span className='likes'>
                                                <FontAwesomeIcon icon={faHeart} className='mr-fixed' />
                                              </span>
                                            </span>
                                          </>
                                        ) : (
                                          <>
                                            <span
                                              className='like-position float-end'
                                              id={book.id}
                                              value={book.id}
                                              onClick={() => handleLikeClick(book, book.id)}
                                            >
                                              <span className='unlikes'>
                                                <FontAwesomeIcon icon={faHeart} className='mr-fixed' />
                                              </span>
                                            </span>
                                          </>
                                        )}
                                      </>
                                    ) : (
                                      <span
                                        className='like-position float-end'
                                        id={book.id}
                                        value={book.id}
                                        onClick={() => handleLikeClick(book, book.id)}
                                      >
                                        <span className='unlikes'>
                                          <FontAwesomeIcon icon={faHeart} className='mr-fixed ' />
                                        </span>
                                      </span>
                                    )}
                                    <div className='book-details p-1'>
                                      <h1 className='w-100' title={book.title}>{book.title_long.slice(0, 20)}...</h1>
                                      {book.author === undefined ? <><h5 className='text-primary'>No Author</h5></> : <><h5 className='text-primary' title={book.author} onClick={() => author_name()}>{book.author.slice(0, 10)}</h5></>}
                                      <h5>{book.category_id[0].name}</h5>
                                      <div className='d-flex '>
                                        <div className='rate-details'>
                                          <span className='new-rate'>₹{book.original_price}</span> <span className='ps-2 old-rate'>₹ 440</span><br />
                                          <Rating
                                            initialRating={5}
                                            emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                            fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                            readonly={true}
                                          />
                                        </div>
                                        <div className='ms-auto'>
                                          {userIdShop && userIdShop.length > 0 ? (
                                            <>
                                              {userIdShop.some(cartId => cartId.book_id === book.id) ? (
                                                <>
                                                  <span
                                                    className='normal-box1 float-end'
                                                    id={book.id}
                                                    value={book.id}
                                                    onClick={() => {
                                                      const cartId = userIdShop.find(cart => cart.book_id === book.id);
                                                      handleShopClick(book, cartId.id, book.original_price);
                                                    }}
                                                  >
                                                    <FontAwesomeIcon icon={faBagShopping} className='mr-fixed' />
                                                  </span>
                                                </>
                                              ) : (
                                                <>
                                                  <span
                                                    className='box-view1 float-end'
                                                    id={book.id}
                                                    value={book.id}
                                                    onClick={() => handleShopClick(book, book.id, book.original_price)}
                                                  >
                                                    <FontAwesomeIcon icon={faBagShopping} className='mr-fixed' />
                                                  </span>
                                                </>
                                              )}
                                            </>
                                          ) : (
                                            <span
                                              className={totalshops.includes(book.id) ? 'normal-box1 float-end' : 'box-view1 float-end'}
                                              id={book.id}
                                              value={book.id}
                                              onClick={() => handleShopClick(book, book.id, book.original_price)}
                                            >
                                              <FontAwesomeIcon icon={faBagShopping} className='mr-fixed' />
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                        ) : (
                          <h1>No books to display</h1>
                        )
                      )}
                    </>
                    :
                    <>
                      {allbookDetails?.length > 0 ?
                        <>
                          {allbookDetails && allbookDetails.map((book, index) => {
                            return (
                              <div className='col-lg-3 col-md-4 col-sm-6 col-12 mt-2 d-flex align-self-stretch'>
                                <div className={userIdShop && userIdShop.length > 0 ? (userIdShop.some(cartId => cartId.book_id === book.id) ? 'normal-box seller-book position-relative' : 'box-view seller-book position-relative') : 'box-view seller-book position-relative'}>
                                  <div className='best-seller'>
                                    <img src={book.image} height='300px' className='w-100 p-lg-4 p-md-2 p-0' />
                                    <span className='selles-offer'>offer 60%</span>
                                    {userIdLike && userIdLike.length > 0 ? (
                                      <>
                                        {userIdLike.some(cartId => cartId.book_id === book.id) ? (
                                          <>
                                            <span
                                              className='like-position float-end'
                                              id={book.id}
                                              value={book.id}
                                              onClick={() => {
                                                const cartId = userIdLike.find(cart => cart.book_id === book.id);
                                                handleLikeClick(book, cartId.id);
                                              }}
                                            >
                                              <span className='likes'>
                                                <FontAwesomeIcon icon={faHeart} className='mr-fixed' />
                                              </span>
                                            </span>
                                          </>
                                        ) : (
                                          <>
                                            <span
                                              className='like-position float-end'
                                              id={book.id}
                                              value={book.id}
                                              onClick={() => handleLikeClick(book, book.id)}
                                            >
                                              <span className='unlikes'>
                                                <FontAwesomeIcon icon={faHeart} className='mr-fixed' />
                                              </span>
                                            </span>
                                          </>
                                        )}
                                      </>
                                    ) : (
                                      <span
                                        className='like-position float-end'
                                        id={book.id}
                                        value={book.id}
                                        onClick={() => handleLikeClick(book, book.id)}
                                      >
                                        <span className='unlikes'>
                                          <FontAwesomeIcon icon={faHeart} className='mr-fixed ' />
                                        </span>
                                      </span>
                                    )
                                    }
                                    <div className='book-details p-1'>
                                      <h1 className='w-100' title={book.title}>{book.title_long.slice(0, 20)}...</h1>
                                      {book.author === undefined ? <><h5 className='text-primary'>No Author</h5></> : <><h5 className='text-primary' title={book.author} onClick={() => author_name()}>{book.author.slice(0, 10)}</h5></>}
                                      <h5>{book.category_id[0].name}</h5>
                                      <div className='d-flex '>
                                        <div className='rate-details'>
                                          <span className='new-rate'>₹{book.original_price}</span> <span className='ps-2 old-rate'>₹ 440</span><br />
                                          <Rating
                                            initialRating={5}
                                            emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                            fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                            readonly={true}
                                          />
                                        </div>
                                        <div className='ms-auto'>
                                          {userIdShop && userIdShop.length > 0 ? (
                                            <>
                                              {userIdShop.some(cartId => cartId.book_id === book.id) ? (
                                                <>
                                                  <span
                                                    className='normal-box1 float-end'
                                                    id={book.id}
                                                    value={book.id}
                                                    onClick={() => {
                                                      const cartId = userIdShop.find(cart => cart.book_id === book.id);
                                                      handleShopClick(book, cartId.id, book.original_price);
                                                    }}
                                                  >
                                                    <FontAwesomeIcon icon={faBagShopping} className='mr-fixed' />
                                                  </span>
                                                </>
                                              ) : (
                                                <>
                                                  <span
                                                    className='box-view1 float-end'
                                                    id={book.id}
                                                    value={book.id}
                                                    onClick={() => handleShopClick(book, book.id, book.original_price)}
                                                  >
                                                    <FontAwesomeIcon icon={faBagShopping} className='mr-fixed' />
                                                  </span>
                                                </>
                                              )}
                                            </>
                                          ) : (
                                            <span
                                              className={totalshops.includes(book.id) ? 'normal-box1 float-end' : 'box-view1 float-end'}
                                              id={book.id}
                                              value={book.id}
                                              onClick={() => handleShopClick(book, book.id, book.original_price)}
                                            >
                                              <FontAwesomeIcon icon={faBagShopping} className='mr-fixed' />
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                      {/* <div className='text-center'>
                                    <button className='viewall mt-5 border-0 rounded-2' onClick={(id) => click_view(index)}>view</button>
                                  </div> */}
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
                    </>
                  }
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
              <div className='product-list my-4'>
                <div className='row m-0  py-4 bestseller'>
                  {filterCategory?.length > 0 ?
                    <>
                      {filterCategory && allbookDetails && (
                        allbookDetails?.length > 0 ? (
                          allbookDetails
                            .filter(book => filterCategory.some(category => book.category_id[0].name === category.name ||
                              (
                                book.language === category.lan ||
                                book.varient.some(variant => variant.bookconditions === category.con) ||
                                book.varient.some(variant => variant.bindings === category.bind) ||
                                book.original_price == category.original_price
                              )
                            ))
                            .map(book => (
                              <div className='col-lg-3 col-md-3 col-sm-4 col-6 mt-2 d-flex align-self-stretch' key={book.id}>
                                <div className={userIdShop && userIdShop.length > 0 ? (userIdShop.some(cartId => cartId.book_id === book.id) ? 'normal-box seller-book position-relative' : 'box-view seller-book position-relative') : 'box-view seller-book position-relative'}>
                                  <div className='best-seller'>
                                    <img src={book.image} height='300px' className='w-100 p-lg-4 p-md-2 p-0' />
                                    <span className='selles-offer'>offer 60%</span>
                                    {userIdLike && userIdLike.length > 0 ? (
                                      <>
                                        {userIdLike.some(cartId => cartId.book_id === book.id) ? (
                                          <>
                                            <span
                                              className='like-position float-end'
                                              id={book.id}
                                              value={book.id}
                                              onClick={() => {
                                                const cartId = userIdLike.find(cart => cart.book_id === book.id);
                                                handleLikeClick(book, cartId.id);
                                              }}
                                            >
                                              <span className='likes'>
                                                <FontAwesomeIcon icon={faHeart} className='mr-fixed' />
                                              </span>
                                            </span>
                                          </>
                                        ) : (
                                          <>
                                            <span
                                              className='like-position float-end'
                                              id={book.id}
                                              value={book.id}
                                              onClick={() => handleLikeClick(book, book.id)}
                                            >
                                              <span className='unlikes'>
                                                <FontAwesomeIcon icon={faHeart} className='mr-fixed' />
                                              </span>
                                            </span>
                                          </>
                                        )}
                                      </>
                                    ) : (
                                      <span
                                        className='like-position float-end'
                                        id={book.id}
                                        value={book.id}
                                        onClick={() => handleLikeClick(book, book.id)}
                                      >
                                        <span className='unlikes'>
                                          <FontAwesomeIcon icon={faHeart} className='mr-fixed ' />
                                        </span>
                                      </span>
                                    )}
                                    <div className='book-details p-1'>
                                      <h1 className='w-100' title={book.title}>{book.title_long.slice(0, 20)}...</h1>
                                      {book.author === undefined ? <><h5 className='text-primary'>No Author</h5></> : <><h5 className='text-primary' title={book.author} onClick={() => author_name()}>{book.author.slice(0, 10)}</h5></>}
                                      <h5>{book.category_id[0].name}</h5>
                                      <div className='d-flex '>
                                        <div className='rate-details'>
                                          <span className='new-rate'>₹{book.original_price}</span> <span className='ps-2 old-rate'>₹ 440</span><br />
                                          <Rating
                                            initialRating={5}
                                            emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                            fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                            readonly={true}
                                          />
                                        </div>
                                        <div className='ms-auto'>
                                          {userIdShop && userIdShop.length > 0 ? (
                                            <>
                                              {userIdShop.some(cartId => cartId.book_id === book.id) ? (
                                                <>
                                                  <span
                                                    className='normal-box1 float-end'
                                                    id={book.id}
                                                    value={book.id}
                                                    onClick={() => {
                                                      const cartId = userIdShop.find(cart => cart.book_id === book.id);
                                                      handleShopClick(book, cartId.id, book.original_price);
                                                    }}
                                                  >
                                                    <FontAwesomeIcon icon={faBagShopping} className='mr-fixed' />
                                                  </span>
                                                </>
                                              ) : (
                                                <>
                                                  <span
                                                    className='box-view1 float-end'
                                                    id={book.id}
                                                    value={book.id}
                                                    onClick={() => handleShopClick(book, book.id, book.original_price)}
                                                  >
                                                    <FontAwesomeIcon icon={faBagShopping} className='mr-fixed' />
                                                  </span>
                                                </>
                                              )}
                                            </>
                                          ) : (
                                            <span
                                              className={totalshops.includes(book.id) ? 'normal-box1 float-end' : 'box-view1 float-end'}
                                              id={book.id}
                                              value={book.id}
                                              onClick={() => handleShopClick(book, book.id, book.original_price)}
                                            >
                                              <FontAwesomeIcon icon={faBagShopping} className='mr-fixed' />
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                        ) : (
                          <h1>No books to display</h1>
                        )
                      )}
                    </>
                    :
                    <>
                      {allbookDetails?.length > 0 ?
                        <>
                          {allbookDetails && allbookDetails.map((book, index) => {
                            return (
                              <div className='col-lg-3 col-md-3 col-sm-4 col-6 mt-2 d-flex align-self-stretch'>
                                <div className={userIdShop && userIdShop.length > 0 ? (userIdShop.some(cartId => cartId.book_id === book.id) ? 'normal-box seller-book position-relative' : 'box-view seller-book position-relative') : 'box-view seller-book position-relative'}>
                                  <div className='best-seller'>
                                    <img src={book.image} height='300px' className='w-100 p-lg-4 p-md-2 p-0' />
                                    <span className='selles-offer'>offer 60%</span>
                                    {userIdLike && userIdLike.length > 0 ? (
                                      <>
                                        {userIdLike.some(cartId => cartId.book_id === book.id) ? (
                                          <>
                                            <span
                                              className='like-position float-end'
                                              id={book.id}
                                              value={book.id}
                                              onClick={() => {
                                                const cartId = userIdLike.find(cart => cart.book_id === book.id);
                                                handleLikeClick(book, cartId.id);
                                              }}
                                            >
                                              <span className='likes'>
                                                <FontAwesomeIcon icon={faHeart} className='mr-fixed' />
                                              </span>
                                            </span>
                                          </>
                                        ) : (
                                          <>
                                            <span
                                              className='like-position float-end'
                                              id={book.id}
                                              value={book.id}
                                              onClick={() => handleLikeClick(book, book.id)}
                                            >
                                              <span className='unlikes'>
                                                <FontAwesomeIcon icon={faHeart} className='mr-fixed' />
                                              </span>
                                            </span>
                                          </>
                                        )}
                                      </>
                                    ) : (
                                      <span
                                        className='like-position float-end'
                                        id={book.id}
                                        value={book.id}
                                        onClick={() => handleLikeClick(book, book.id)}
                                      >
                                        <span className='unlikes'>
                                          <FontAwesomeIcon icon={faHeart} className='mr-fixed ' />
                                        </span>
                                      </span>
                                    )
                                    }
                                    <div className='book-details p-1'>
                                      <h1 className='w-100' title={book.title}>{book.title_long.slice(0, 20)}...</h1>
                                      {book.author === undefined ? <><h5 className='text-primary'>No Author</h5></> : <><h5 className='text-primary' title={book.author} onClick={() => author_name()}>{book.author.slice(0, 10)}</h5></>}
                                      <h5>{book.category_id[0].name}</h5>
                                      <div className='d-flex '>
                                        <div className='rate-details'>
                                          <span className='new-rate'>₹{book.original_price}</span> <span className='ps-2 old-rate'>₹ 440</span><br />
                                          <Rating
                                            initialRating={5}
                                            emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                            fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                            readonly={true}
                                          />
                                        </div>
                                        <div className='ms-auto'>
                                          {userIdShop && userIdShop.length > 0 ? (
                                            <>
                                              {userIdShop.some(cartId => cartId.book_id === book.id) ? (
                                                <>
                                                  <span
                                                    className='normal-box1 float-end'
                                                    id={book.id}
                                                    value={book.id}
                                                    onClick={() => {
                                                      const cartId = userIdShop.find(cart => cart.book_id === book.id);
                                                      handleShopClick(book, cartId.id, book.original_price);
                                                    }}
                                                  >
                                                    <FontAwesomeIcon icon={faBagShopping} className='mr-fixed' />
                                                  </span>
                                                </>
                                              ) : (
                                                <>
                                                  <span
                                                    className='box-view1 float-end'
                                                    id={book.id}
                                                    value={book.id}
                                                    onClick={() => handleShopClick(book, book.id, book.original_price)}
                                                  >
                                                    <FontAwesomeIcon icon={faBagShopping} className='mr-fixed' />
                                                  </span>
                                                </>
                                              )}
                                            </>
                                          ) : (
                                            <span
                                              className={totalshops.includes(book.id) ? 'normal-box1 float-end' : 'box-view1 float-end'}
                                              id={book.id}
                                              value={book.id}
                                              onClick={() => handleShopClick(book, book.id, book.original_price)}
                                            >
                                              <FontAwesomeIcon icon={faBagShopping} className='mr-fixed' />
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                      {/* <div className='text-center'>
                                    <button className='viewall mt-5 border-0 rounded-2' onClick={(id) => click_view(index)}>view</button>
                                  </div> */}
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
                    </>
                  }
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