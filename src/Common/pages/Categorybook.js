import React, { useEffect, useState } from 'react'
import Header from '../pages/Header'
import Footer from '../pages/Footer'
import Aside from '../pages/Aside'


import { useSelector, useDispatch } from 'react-redux';
import { setisAdded, setisIncrement, setisDecrement, setisLiked, setallBookDetails, setLikedProducts, setlikeProduct, setlikescount, setShopProducts, setshopcount, setproductIdDetails, setsingleProductView } from '../../Redux/CreateSlice';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { category_list, megamenu_list } from './apiBaseurl';

function Categorybook() {
  const { allbookDetails, shopProducts, searchfield, subCategoryBook } = useSelector((state) => state.usedbookr_product)
  const [categoryBook, setCategoryBook] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  

  // shop product click fn 
  const totalshops = shopProducts.map((data) => data.id);
 
  const click_view = (id) => {
    dispatch(setsingleProductView([allbookDetails[id]]))
    navigate('/Description')
  }

  const category_book = async () => {
    const catebook_details = await megamenu_list();
    const category_bookDetail = catebook_details?.find(data => data.id == params.id);
    setCategoryBook(category_bookDetail.subcategories)
  }
  const handleSuncategory = (data) => {
    navigate(`/subcategory/${data.id}`, { state: data })
  }
  useEffect(() => {
    category_book();
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='product-section'>
      <Header />
      <div className='product-view'>
        <div className=''>
          <div className='row m-0'>
            {/* <div className='col-3'>
              <Aside />
            </div> */}
            <div className='col-12'>
              <div className='product-list my-5'>
                <div className='row m-0 bestseller'>
                  {searchfield ?
                    <>
                      {categoryBook && categoryBook.map((book, index) => {
                        return (
                          <div className='col-lg-2 col-md-3 col-sm-4 col-6 mt-2 d-flex align-self-stretch' style={{cursor:'pointer'}} onClick={() => handleSuncategory(book)}>
                            <div className={totalshops.includes(book.id) ? 'normal-box seller-book position-relative' : 'box-view seller-book position-relative'}>
                              <div className='best-seller' >
                                <img src={book.images} height='300px' className='w-100 p-lg-4 p-md-2 p-0' />
                                <h4 className='text-center' style={{ fontSize: '16px' }}>{book.name}</h4>
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

export default Categorybook