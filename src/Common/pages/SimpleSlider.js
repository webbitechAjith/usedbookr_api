import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import { useDispatch, useSelector } from 'react-redux';

import '../assets/css/main.css'


// image path 
import book1 from '../assets/image/category1.png'
import book2 from '../assets/image/category2.png'
import book3 from '../assets/image/category3.png'
import book4 from '../assets/image/category4.png'
import book5 from '../assets/image/category5.png'


const SimpleSlider = () => {
  const { authorsDetails, authorsName } = useSelector((state) => state.usedbookr_product)
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const owlOptions = {
    items: 5,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    loop: true,
    margin: 10,
    autoWidth: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      800: {
        items: 2,
      },
      1000: {
        items: 5,
      },
    },
  };


  // bookCategory fn 
  const bookCategory = () => {
    navigate('categorybook')
  }

  return (
    <div className='py-lg-5 py-md-4 py-sm-3 py-2 '>
      <OwlCarousel className="owl-theme card-design" {...owlOptions}>
        <div className='education text-center' onClick={() => bookCategory()}>
          <img src={book1} className='w-100 p-5' />
          <h2>EDUCATION</h2>
        </div>
        <div className='magazine text-center' onClick={() => bookCategory()}>
          <img src={book2} className='w-100 p-5' />
          <h2>MAGAZINES</h2>
        </div>
        <div className='philosophy text-center' onClick={() => bookCategory()}>
          <img src={book3} className='w-100 p-5' />
          <h2>PHILOSOPHY & RELIGION</h2>
        </div>
        <div className='economic text-center' onClick={() => bookCategory()}>
          <img src={book4} className='w-100 p-5' />
          <h2>ECONOMICS & BUSINESS</h2>
        </div>
        <div className='political text-center' onClick={() => bookCategory()}>
          <img src={book5} className='w-100 p-5' />
          <h2>POLITICAL</h2>
        </div>
      </OwlCarousel>
    </div>

  );
};

export default SimpleSlider;
