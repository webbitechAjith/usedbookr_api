import React, { useEffect, useState } from 'react'
import Header from '../Common/pages/Header'
import Footer from '../Common/pages/Footer'
import Aside from '../Common/pages/Aside'
import axios from "axios";

// image path 

import likes from '../Common/assets/image/heart-like.png'
import unlike from '../Common/assets/image/heart-unlike.png'
import plant3 from '../Common/assets/image/plant_3.png'
import rating from '../Common/assets/image/Rating.png'
import add from '../Common/assets/image/addcard.png'
import remove from '../Common/assets/image/removecard.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faHeart } from '@fortawesome/free-solid-svg-icons';


import { useSelector, useDispatch } from 'react-redux';
import { setisAdded, setisIncrement, setisDecrement, setisLiked, setallBookDetails, setLikedProducts, setlikeProduct, setlikescount, setShopProducts, setshopcount, setproductIdDetails, setClass1Hide } from '../Redux/CreateSlice';
import { Link, useNavigate } from 'react-router-dom'
import Authorname from '../Common/pages/Authorname';

function Autherfliter() {

  const { isLiked, isAdded, allbookDetails, likedProducts, likescount, shopProducts, shopcount, minPrice, priceFilter, filteredProducts, productIdDetails, searchfield, authorsName, authorsDetails } = useSelector((state) => state.usedbookr_product)
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
  console.log(likedProducts)
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
    // dispatch(setallBookDetails(data.data))
    const { data } = await axios.get('https://fakestoreapi.com/products');
    dispatch(setallBookDetails(data.data))

  }
  // useEffect(() => {
  //   plantproduct();
  // }, []);
  // console.log(allbookDetails)
  const pass = (data) => {
    const updatedData = [data];
    dispatch(setproductIdDetails(updatedData))
    navigate('/Description');
  }
  useEffect(() => {
    dispatch(setClass1Hide(false))
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='product-section'>
      <Header />
      <div className='product-view container-90'>
        <div className='d-lg-block d-none'>
          <div className='row m-0'>
            <div className='col-3'>
              <Authorname />
            </div>
            <div className='col-9'>
              <div className='product-list mt-5'>
                <div className='row m-0 '>
                  {allbookDetails.length > 0 ?
                    <>
                      {allbookDetails && allbookDetails.map((data) => {
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
                              <div style={{ width: '100%', height: '200px' }}>
                                <img src={data.image} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
                              </div>
                              <div class="row m-0 product-details">
                                <div class="col-12 mt-3">
                                  <h4 title={data.title}>{data.title.slice(0, 10)}...</h4>
                                  {data.authors[0] && (
                                    <a href='#' className='text-decoration-none' title={data.authors[0]}>
                                      {data.authors[0].slice(0, 10)}...
                                    </a>
                                  )}<br />
                                  {/* <a href='#' className='text-decoration-none' title={data.authors[0]}>{data.authors[0].slice(0, 10)}</a><br /> */}
                                  <span className='price pe-2'>INR {data.msrp}</span><span className='text-decoration-line-through rate'>{data.actual_price}</span><br />
                                  <img src={rating} className='' />
                                </div>
                              </div>
                              <div className='row m-0 pt-2'>
                                <div className='col-6'>
                                  <button className='float-start sales-offer' onClick={() => pass(data)}>view all</button>

                                </div>
                                <div className="col-6">
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
                    </>}

                </div>

              </div>
            </div>
          </div>
        </div>
        <div className='d-lg-none d-block'>
          <div className='row m-0 '>
            {allbookDetails.length > 0 ?
              <>
                {allbookDetails && allbookDetails.map((data) => {
                  return (
                    <div className='col-lg-4 col-md-4 col-sm-6 col-12 ps-1 mt-2 d-flex align-self-stretch'>
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
                        <div style={{ width: '100%', height: '200px' }}>
                          <img src={data.image} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
                        </div>
                        <div class="row m-0 product-details">
                          <div class="col-12 mt-3">
                            <h4 title={data.title}>{data.title.slice(0, 10)}</h4>
                            {data.authors[0] && (
                              <a href='#' className='text-decoration-none' title={data.authors[0]}>
                                {data.authors[0].slice(0, 10)}
                              </a>
                            )}<br />
                            {/* <a href='#' className='text-decoration-none' title={data.authors[0]}>{data.authors[0].slice(0, 10)}</a><br /> */}
                            <span className='price pe-2'>INR {data.msrp}</span><span className='text-decoration-line-through rate'>{data.actual_price}</span><br />
                            <img src={rating} className='' />
                          </div>
                        </div>
                        <div className='row m-0 pt-2'>
                          <div className='col-6'>
                            <button className='float-start sales-offer' onClick={() => pass(data)}>view all</button>

                          </div>
                          <div className="col-6">
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