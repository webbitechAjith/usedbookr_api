import React, { useState } from 'react';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


import '../assets/css/main.css'


// image path 
import book1 from '../assets/image/category1.png'
import book2 from '../assets/image/category2.png'
import book3 from '../assets/image/category3.png'
import book4 from '../assets/image/category4.png'
import book5 from '../assets/image/category5.png'

const SimpleSlider = () => {

    const owlOptions = {
        items: 5,
        dots:false,
        autoplay:true,
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
            800:{
                items: 2, 
            },
            1000: {
                items: 5,
            },
        },
    };
    return (
        <div className='ps-lg-5 ps-2 py-lg-5 py-md-4 py-sm-3 py-2 '>
            <OwlCarousel className="owl-theme card-design" {...owlOptions}>
              <div className='education text-center'>
                <img src={book1} className='w-100 p-5'/>
                <h2>EDUCATION</h2>
              </div>
              <div className='magazine text-center'>
                <img src={book2} className='w-100 p-5'/>
                <h2>MAGAZINES</h2>
              </div>
              <div className='philosophy text-center'>
                <img src={book3} className='w-100 p-5'/>
                <h2>PHILOSOPHY & RELIGION</h2>
              </div>
              <div className='economic text-center'>
                <img src={book4} className='w-100 p-5'/>
                <h2>ECONOMICS & BUSINESS</h2>
              </div>
              <div className='political text-center'>
                <img src={book5} className='w-100 p-5'/>
                <h2>POLITICAL</h2>
              </div>
            </OwlCarousel>
        </div>

    );
};

export default SimpleSlider;
