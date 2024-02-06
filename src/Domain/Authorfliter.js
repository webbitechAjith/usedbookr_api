import React, { useEffect, useState } from 'react'
import Header from '../Common/pages/Header'
import Footer from '../Common/pages/Footer'
import Aside from '../Common/pages/Aside'
import axios from "axios";

// image path 

import likes from '../Common/assets/image/like.png'
import unlike from '../Common/assets/image/unlike.png'
import plant3 from '../Common/assets/image/plant_3.png'
import rating from '../Common/assets/image/Rating.png'
import add from '../Common/assets/image/addcard.png'
import remove from '../Common/assets/image/removecard.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faHeart } from '@fortawesome/free-solid-svg-icons';


import { useSelector, useDispatch } from 'react-redux';
import { setisAdded, setisIncrement, setisDecrement, setisLiked, setallplantDetails, setLikedProducts, setlikeProduct, setlikescount, setShopProducts, setshopcount, setproductIdDetails, setClass1Hide } from '../Redux/CreateSlice';
import { Link, useNavigate } from 'react-router-dom'
import Authorname from '../Common/pages/Authorname';

function Autherfliter() {

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
                <div className='row m-0  py-4'>
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
              <Authorname />
            </div>
            <div className='col-12'>
              <div className='product-list mt-5'>
                <div className='row m-0  py-4'>
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

export default Autherfliter