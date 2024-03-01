import React, { useEffect, useState } from 'react'
import Header from '../pages/Header'
import Footer from '../pages/Footer'
import Aside from '../pages/Aside'
import Rating from 'react-rating';

// image path 

import likes from '../assets/image/heart-like.png'
import unlike from '../assets/image/heart-unlike.png'
import add from '../assets/image/addcard.png'
import remove from '../assets/image/removecard.png'
import book1 from '../assets/image/book_1.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faHeart, faBagShopping } from '@fortawesome/free-solid-svg-icons';

import { useSelector, useDispatch } from 'react-redux';
import { setisAdded, setisIncrement, setisDecrement, setisLiked, setallBookDetails, setLikedProducts, setlikeProduct, setlikescount, setShopProducts, setshopcount, setproductIdDetails, setsingleProductView } from '../../Redux/CreateSlice';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { category_list, megamenu_list } from './apiBaseurl';

function Categorybook() {
  const { isLiked, isAdded, allbookDetails, likedProducts, likescount, shopProducts, shopcount, minPrice, priceFilter, filteredProducts, productIdDetails, searchfield,subCategoryBook } = useSelector((state) => state.usedbookr_product)
  const [categoryBook , setCategoryBook] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

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
      dispatch(setShopProducts([...shopProducts, { ...product, id, amount: price, qty: 1 }]));
      dispatch(setshopcount(shopcount + 1))
    }
  };

  const all_product = () => {
    navigate('/Allproduct')
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
  }
  const click_view = (id) => {
    dispatch(setsingleProductView([allbookDetails[id]]))
    navigate('/Description')
  }

  const category_book = async() => {
    const catebook_details = await megamenu_list();
    const category_bookDetail = catebook_details.find(data => data.id == params.id);
    setCategoryBook(category_bookDetail.subcategories)
  }

  useEffect(() => {
    category_book();
    window.scrollTo(0, 0);
  }, []);
  console.log(categoryBook)
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
                <div className='row m-0 bestseller'>
                  {searchfield ?
                    <>
                      {categoryBook && categoryBook.map((book, index) => {
                        return (
                          <div className='col-lg-3 col-md-3 col-sm-4 col-6 mt-2 d-flex align-self-stretch'>
                            <div className={totalshops.includes(book.id) ? 'normal-box seller-book position-relative' : 'box-view seller-book position-relative'}>
                              <div className='best-seller'>
                                <img src={book.images} height='300px' className='w-100 p-lg-4 p-md-2 p-0' />
                                <h4>{book.name}</h4>                                
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </> :
                    <>
                      <h1 className='text-center product-title'>No items</h1>
                    </>}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='d-lg-none d-block'>
          <div className='row m-0'>
            <div className='col-12'>
              <Aside />
            </div>
            <div className='col-12 p-0'>
              <div className='row m-0 product-list'>
                <div className='col-lg-4 col-md-4 col-sm-6 col-12 mt-2 d-flex align-self-stretch'>
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

export default Categorybook