import React, { useEffect, useState } from 'react';
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
import { category_list, megamenu_list } from './apiBaseurl';
import { setCategoryBook, setSubCategoryBook } from '../../Redux/CreateSlice';


const SimpleSlider = () => {
  const { authorsDetails, authorsName, categoryBook, subCategoryBook } = useSelector((state) => state.usedbookr_product)
  const [categoryName, setCategoryName] = useState([])
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // subbookCategory fn 
  const subCategory_book = (data) => {
    const book_name = data.name;
    const sub_name = categoryBook.map((data) => {
      if (data.name == book_name) {
        dispatch(setSubCategoryBook([data.subcategories]))
      }
    })
    // navigate('/categorybook')
  }

  //categorylist fn
  const category_books = async () => {
    const categories_list = await category_list();
    setCategoryName(categories_list)
  }
  const owlOptions = {
    items: 5,
    dots: false,
    // autoplay: true,
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

  useEffect(() => {
    category_books()
  }, [])

  console.log(999, subCategoryBook)


  return (
    <div className='py-lg-3 py-md-4 py-sm-3 py-2 '>
      {categoryName.length > 0 ?
        <>
          <OwlCarousel className="owl-theme card-design" {...owlOptions}>
            {categoryName.map((data, index) => {
              const classNames = ['magazine', 'education', 'philosophy', 'economic'];
              const className = classNames[index] || ''; // If index is out of range, use an empty string
              return (
                <div key={index} className={`text-center ${className}`} onClick={() => subCategory_book(data)}>
                  {/* <img src={data.images} className='w-100 p-5' /> */}
                  <img src={data.images} className='w-100 p-5' />
                  <h2>{data.name}</h2>
                </div>
              );
            })}
          </OwlCarousel>
        </>
        :
        <>
          <h1 className='text-center'>No Items</h1>
        </>
      }

    </div>

  );
};

export default SimpleSlider;
