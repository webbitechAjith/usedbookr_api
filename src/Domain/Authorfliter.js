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
import { setisAdded, setisIncrement, setisDecrement, setisLiked, setallBookDetails, setLikedProducts, setlikeProduct, setlikescount, setShopProducts, setshopcount, setproductIdDetails, setClass1Hide, setsingleProductView, setUserIdLike, setUserIdShop, setAuthorsDetails } from '../Redux/CreateSlice';
import { Link, useNavigate } from 'react-router-dom'
import Authorname from '../Common/pages/Authorname';
import { addTocard_list, addTowhish_list, allbooks, authUser, removeTocard_list, removeTolike_list } from '../Common/pages/apiBaseurl';

function Autherfliter() {

  const { isLiked, isAdded, allbookDetails, userIdLike, userIdShop, authorBookDetails, likedProducts, likescount, shopProducts, shopcount, minPrice, priceFilter, filteredProducts, productIdDetails, searchfield, authorsName, authorsDetails } = useSelector((state) => state.usedbookr_product)
  const [showCategory, setShowCategory] = useState(false);
  const [filterOption, setFilterOption] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // like product click fn 
  const totallikes = likedProducts.map((data) => data.id);
  const handleLikeClick = async (product, id) => {
    const auth_login = localStorage.getItem('usedbookrtoken')
    const auth_uesrlogin = localStorage.getItem('isLoginAuth')
    if (auth_login || auth_uesrlogin == true) {
      // Check if the product ID is in the likedProducts array
      if (userIdLike.some(data => data.id === id)) {
        await removeTolike_list(id);
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


  const pass = (data) => {
    const updatedData = [data];
    dispatch(setproductIdDetails(updatedData))
    navigate('/Description');
  }
  const author_name = () => {
    navigate('/authors')
  }
  const all_authors = async () => {
    const data = await authUser();
    dispatch(setAuthorsDetails(data))
  }
  const all_books = async () => {
    const data = await allbooks();
    dispatch(setallBookDetails(data))
  }
  const click_view = async (book) => {
    navigate(`/Description/${book.id}`, { state: book })
  }
  const toggleAuthor = () => {
    setShowCategory(!showCategory);
    setFilterOption(!filterOption)

  };


  let totalBooks = 0;
  let booksToShow = [];

  if (authorsName?.length > 0) {
    const filteredBooks = allbookDetails?.filter((book) =>
      authorsName ? book.author.toLowerCase() === authorsName.toLowerCase() : true
    );

    totalBooks = filteredBooks?.length || 0;

    booksToShow = filteredBooks?.slice(
      (currentPage - 1) * productsPerPage,
      currentPage * productsPerPage
    ) || [];
  }


  useEffect(() => {
    dispatch(setClass1Hide(false))
    all_authors()
    all_books();
    window.scrollTo(0, 0);

  }, []);

  console.log("auth",authorsName)
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
                  {allbookDetails?.length > 0 && searchfield ?
                    <>
                      {allbookDetails && allbookDetails
                        .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
                        .map((book, index) => {
                          return (
                            <>
                              {authorsName.length > 0 ?
                                <>
                                  {book.author.toLowerCase() === authorsName.toLowerCase() ?
                                    <>
                                      <div className='col-lg-3 col-md-4 col-sm-6 col-12 pb-2 d-flex align-self-stretch py-0'>
                                        <div className={userIdShop && userIdShop.length > 0 ? (userIdShop.some(cartId => cartId.book_id === book.id) ? 'normal-box seller-book position-relative' : 'box-view seller-book position-relative') : 'box-view seller-book position-relative'}>
                                          <div className='best-seller'>
                                            <img src={book.image} height='300px' className='w-100 p-lg-2 p-md-2 p-0' onClick={(id) => click_view(book)} />
                                            <span className='selles-offer'>offer {book.discount} %</span>

                                            {userIdLike && userIdLike?.length > 0 ? (
                                              <>
                                                {userIdLike?.some(cartId => cartId.book_id === book.id) ? (
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
                                                  <FontAwesomeIcon icon={faHeart} className='mr-fixed' />
                                                </span>
                                              </span>
                                            )
                                            }
                                            <div className='book-details p-3'>
                                              <h1 className='w-100' title={book.title} onClick={(id) => click_view(book)}>{book.title_long.slice(0, 10)}...</h1>
                                              {book.author === undefined ? <><h5 className='text-primary'>No Author</h5></> : <><h5 className='text-primary' title={book.author} onClick={() => author_name()}>{book.author.slice(0, 10)}</h5></>}
                                              <div className='d-flex '>
                                                <div className='rate-details'>
                                                  <span className='new-rate'>INR{book.selling_price}</span> <span className='ps-1 old-rate'>INR {book.original_price}</span><br />
                                                  <Rating
                                                    initialRating={book.avg_rating}
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

                                    </>
                                    :
                                    <>
                                      {authorBookDetails.length > 0 ?
                                        <>
                                          <div className='col-lg-3 col-md-4 col-sm-6 col-12 pb-2 d-flex align-self-stretch py-0'>
                                            <div className={userIdShop && userIdShop.length > 0 ? (userIdShop.some(cartId => cartId.book_id === book.id) ? 'normal-box seller-book position-relative' : 'box-view seller-book position-relative') : 'box-view seller-book position-relative'}>
                                              <div className='best-seller'>
                                                <img src={book.image} height='300px' className='w-100 p-lg-4 p-md-2 p-0' onClick={(id) => click_view(book)} />
                                                <span className='selles-offer'>offer 10%</span>
                                                {userIdLike && userIdLike?.length > 0 ? (
                                                  <>
                                                    {userIdLike?.some(cartId => cartId.book_id === book.id) ? (
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
                                                      <FontAwesomeIcon icon={faHeart} className='mr-fixed' />
                                                    </span>
                                                  </span>
                                                )
                                                }

                                                <div className='book-details p-3'>
                                                  <h1 className='w-100' title={book.title} onClick={(id) => click_view(book)}>{book.title_long.slice(0, 10)}...</h1>
                                                  {book.author === undefined ? <><h5 className='text-primary'>No Author</h5></> : <><h5 className='text-primary' title={book.author} onClick={() => author_name()}>{book.author.slice(0, 10)}</h5></>}
                                                  <div className='d-flex '>
                                                    <div className='rate-details'>
                                                      <span className='new-rate'>INR{book.selling_price}</span> <span className='ps-1 old-rate'>INR {book.original_price}</span><br />
                                                      <Rating
                                                        initialRating={book.avg_rating}
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
                                    <div className={userIdShop && userIdShop.length > 0 ? (userIdShop.some(cartId => cartId.book_id === book.id) ? 'normal-box seller-book position-relative' : 'box-view seller-book position-relative') : 'box-view seller-book position-relative'}>
                                      <div className='best-seller'>
                                        <img src={book.image} height='300px' className='w-100 p-lg-4 p-md-2 p-0' onClick={(id) => click_view(book)} />
                                        <span className='selles-offer'>offer  {book.discount}%</span>

                                        {userIdLike && userIdLike?.length > 0 ? (
                                          <>
                                            {userIdLike?.some(cartId => cartId.book_id === book.id) ? (
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
                                              <FontAwesomeIcon icon={faHeart} className='mr-fixed' />
                                            </span>
                                          </span>
                                        )
                                        }
                                        <div className='book-details p-3'>
                                          <h1 className='w-100' title={book.title} onClick={(id) => click_view(book)}>{book.title_long.slice(0, 15)}...</h1>
                                          {book.author === undefined ? <><h5 className='text-primary'>No Author</h5></> : <><h5 className='text-primary' title={book.author} onClick={() => author_name()}>{book.author.slice(0, 10)}</h5></>}
                                          <div className='d-flex '>
                                            <div className='rate-details'>
                                              <span className='new-rate'>INR{book.selling_price}</span> <span className='ps-1 old-rate'>INR {book.original_price}</span><br />
                                              <Rating
                                                initialRating={book.avg_rating}
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
                                </>
                              }
                            </>
                          )
                        })}
                      {authorsName?.length > 0 ?
                        <>
                          <div className='row m-0 gy-2 total-books mt-3'>
                            <div className='col-lg-6 col-12'>
                              <p className=''>Total Books - {authorsName?.length > 0 ? <>{totalBooks}</> : <></>}</p>
                            </div>
                            <div className='col-lg-6 col-12'>
                              <ul className="pagination mt-2 justify-content-end">
                                {Array(Math.ceil(allbookDetails.length / productsPerPage))
                                  .fill()
                                  .map((_, i) => (
                                    <li
                                      key={i}
                                      className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                                      onClick={() => handleClick(i + 1)}
                                    >
                                      <button className="page-link">{i + 1}</button>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </>
                        :
                        <>
                          <div className='row m-0 gy-2 total-books mt-3'>
                            <div className='col-lg-6 col-12'>
                              <p className=''>Total Books - {allbookDetails?.length}</p>
                            </div>
                            <div className='col-lg-6 col-12'>
                              <ul className="pagination mt-2 justify-content-end">
                                {Array(Math.ceil(allbookDetails.length / productsPerPage))
                                  .fill()
                                  .map((_, i) => (
                                    <li
                                      key={i}
                                      className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                                      onClick={() => handleClick(i + 1)}
                                    >
                                      <button className="page-link">{i + 1}</button>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </>
                      }

                    </>
                    :
                    <>
                      <h1 className='text-center product-title'>No items</h1>
                    </>
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='d-lg-none d-block'>
          {/* <div className='text-end d-lg-none d-block filter-category my-2'>
            {filterOption ?
              <>
                <button onClick={toggleAuthor}><FontAwesomeIcon icon={faFilter} style={{ color: '#FFF' }} className='mx-2' />filter</button>
              </>
              :
              <>
                <button onClick={toggleAuthor}><FontAwesomeIcon icon={faFilter} style={{ color: '#FFF' }} className='mx-2' />filter</button>
              </>
            }
          </div> */}
          <Authorname />
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
                                <div className={userIdShop && userIdShop.length > 0 ? (userIdShop.some(cartId => cartId.book_id === book.id) ? 'normal-box seller-book position-relative' : 'box-view seller-book position-relative') : 'box-view seller-book position-relative'}>
                                  <div className='best-seller'>
                                    <img src={book.image} height='300px' className='w-100 p-lg-4 p-md-2 p-0' onClick={(id) => click_view(book)} />
                                    <span className='selles-offer'>offer {book.discount}%</span>
                                    {userIdLike && userIdLike?.length > 0 ? (
                                      <>
                                        {userIdLike?.some(cartId => cartId.book_id === book.id) ? (
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
                                          <FontAwesomeIcon icon={faHeart} className='mr-fixed' />
                                        </span>
                                      </span>
                                    )
                                    }
                                    <div className='book-details p-3'>
                                      <h1 className='w-100' title={book.title} onClick={(id) => click_view(book)}>{book.title_long.slice(0, 35)}...</h1>
                                      {book.author === undefined ? <><h5 className='text-primary'>No Author</h5></> : <><h5 className='text-primary' title={book.author} onClick={() => author_name()}>{book.author.slice(0, 10)}</h5></>}
                                      <div className='d-flex '>
                                        <div className='rate-details'>
                                          <span className='new-rate'>INR{book.selling_price}</span> <span className='ps-1 old-rate'>INR {book.original_price}</span><br />
                                          <Rating
                                            initialRating={book.avg_rating}
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
                            </>
                            :
                            <>
                              {authorBookDetails.length > 0 ?
                                <>
                                  <div className='col-lg-3 col-md-4 col-sm-6 col-12 pb-2 d-flex align-self-stretch py-0'>
                                    <div className={userIdShop && userIdShop.length > 0 ? (userIdShop.some(cartId => cartId.book_id === book.id) ? 'normal-box seller-book position-relative' : 'box-view seller-book position-relative') : 'box-view seller-book position-relative'}>
                                      <div className='best-seller'>
                                        <img src={book.image} height='300px' className='w-100 p-lg-4 p-md-2 p-0' onClick={(id) => click_view(book)} />
                                        <span className='selles-offer'>offer {book.discount}%</span>

                                        {userIdLike && userIdLike?.length > 0 ? (
                                          <>
                                            {userIdLike?.some(cartId => cartId.book_id === book.id) ? (
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
                                              <FontAwesomeIcon icon={faHeart} className='mr-fixed' />
                                            </span>
                                          </span>
                                        )
                                        }
                                        <div className='book-details p-3'>
                                          <h1 className='w-100' title={book.title} onClick={(id) => click_view(book)}>{book.title_long.slice(0, 35)}...</h1>
                                          {book.author === undefined ? <><h5 className='text-primary'>No Author</h5></> : <><h5 className='text-primary' title={book.author} onClick={() => author_name()}>{book.author.slice(0, 10)}</h5></>}
                                          <div className='d-flex '>
                                            <div className='rate-details'>
                                              <span className='new-rate'>INR{book.selling_price}</span> <span className='ps-1 old-rate'>INR {book.original_price}</span><br />
                                              <Rating
                                                initialRating={book.avg_rating}
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
                            <div className={userIdShop && userIdShop.length > 0 ? (userIdShop.some(cartId => cartId.book_id === book.id) ? 'normal-box seller-book position-relative' : 'box-view seller-book position-relative') : 'box-view seller-book position-relative'}>
                              <div className='best-seller'>
                                <img src={book.image} height='300px' className='w-100 p-lg-4 p-md-2 p-0' onClick={(id) => click_view(book)} />
                                <span className='selles-offer'>offer {book.discount}%</span>

                                {userIdLike && userIdLike?.length > 0 ? (
                                  <>
                                    {userIdLike?.some(cartId => cartId.book_id === book.id) ? (
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
                                      <FontAwesomeIcon icon={faHeart} className='mr-fixed' />
                                    </span>
                                  </span>
                                )
                                }
                                <div className='book-details p-3'>
                                  <h1 className='w-100' title={book.title} onClick={(id) => click_view(book)}>{book.title_long.slice(0, 35)}...</h1>
                                  {book.author === undefined ? <><h5 className='text-primary'>No Author</h5></> : <><h5 className='text-primary' title={book.author} onClick={() => author_name()}>{book.author.slice(0, 10)}</h5></>}
                                  <div className='d-flex '>
                                    <div className='rate-details'>
                                      <span className='new-rate'>INR{book.selling_price}</span> <span className='ps-1 old-rate'>INR {book.original_price}</span><br />
                                      <Rating
                                        initialRating={book.avg_rating}
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