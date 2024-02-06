import React, { useState, useEffect } from 'react';
import '../assets/css/aside.css'
import axios from "axios";
import Slider from '@material-ui/core/Slider';
import Rating from 'react-rating';

import 'font-awesome/css/font-awesome.min.css';




import { useSelector, useDispatch } from 'react-redux';
import { setFilteredProducts, setallBookDetails, setpriceFilter } from '../../Redux/CreateSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';


function Authorname() {
    const { allbookDetails, priceFilter, filteredProducts } = useSelector((state) => state.usedbookr_product)
    const [sliderValue, setSliderValue] = useState(0); // Initial value
    const [topDetails, setTopDetails] = useState(0); // Initial value
    const [outDoor, setoutDoor] = useState(0); // Initial value


    const dispatch = useDispatch();

    // language state 
    const language = ['William Shakespeare', 'Shubhra Gupta', 'Shashi Tharoor', 'Tamal Bandyopadhyay', 'Dr. Ashwin Fernandes', 'Dr. Ashwin Fernandes']
    const [items, setItems] = useState(language);
    const [filterOption, setFilterOption] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [showLess, setShowLess] = useState(false);
    const handleShowMore = () => {
        setShowAll(!showAll);
        setShowLess(!showLess)
    };
    const handleLessMore = () => {
        setShowLess(!showLess)
        setShowAll(!showAll);
    };
    const filter = () => {
        if (filterOption == false) {
            setFilterOption(true)
        } else {
            setFilterOption(false)
        }
    }
    const indoor = async () => {
        const onvalue = setTopDetails((prevValue) => (prevValue === 0 ? 1 : 0));
        console.log("onvalue", topDetails)
        if (topDetails === 0) {
            const innerdoor = [];
            allbookDetails && allbookDetails.map((data, index) => {
                if (data.category_id == 1) {
                    innerdoor.push(data)
                }
            })
            dispatch(setallBookDetails(innerdoor))
        } else {
            const { data } = await axios.get('https://webbitech.co.in/ecommerce/public/api/productlist');
            dispatch(setallBookDetails(data.data))
        }
    }
    const outdoor = async () => {
        const onvalue = setoutDoor((prevValue) => (prevValue === 0 ? 1 : 0));
        console.log("onvalue", topDetails)
        if (outDoor === 0) {
            console.log("ajith")
            const outdoor = [];
            allbookDetails && allbookDetails.map((data, index) => {
                if (data.category_id == 3) {
                    outdoor.push(data)
                }
            })
            dispatch(setallBookDetails(outdoor))
        } else {
            const { data } = await axios.get('https://webbitech.co.in/ecommerce/public/api/productlist');
            dispatch(setallBookDetails(data.data))
            console.log('kumar')

        }
    }
    const handlePriceChange = (minPrice, maxPrice) => {
        // Handle the price change logic here
        console.log('Selected Price Range:', minPrice, maxPrice);
    };
    // useEffect(() => {
    //     // Filter products based on the max price
    //     const filtered = allbookDetails.filter(product => product.total_price <= maxPrice);
    //     dispatch(setFilteredProducts(filtered));
    // }, [maxPrice, allbookDetails]);

    return (
        <>
            <aside className='my-lg-5 my-2'>
                {filterOption ?
                    <>

                    </>
                    :
                    <>
                        <div className='text-end d-lg-none d-block filter-category my-2'>
                            <button onClick={filter}><FontAwesomeIcon icon={faFilter} style={{ color: '#FFF' }} className='mx-2' />filter</button>
                        </div>
                    </>

                }
                {filterOption ?
                    <>
                        <div className='aside-section fixed-filter'>
                            <div className=''>
                                <div className='text-end d-lg-none d-block filter-category my-2'>
                                    <button onClick={filter}><FontAwesomeIcon icon={faClose} style={{ color: '#FFF' }} className='mx-2' /></button>
                                </div>
                                <div className="accordion" id="accordionExample">
                                    <div className='author-search w-75 mx-auto rounded'>
                                        <label>Search by author name</label>
                                        <div class="form-group has-search">
                                            <FontAwesomeIcon icon={faSearch} className='form-control-feedback' />
                                            {/* <span class="fa fa-search form-control-feedback"></span> */}
                                            <input type="text" class="form-control" placeholder="Search Author" />
                                        </div>
                                    </div>
                                    <hr className='m-0' />
                                    <div className="accordion-item border-0">
                                        <div className="accordion-item border-0">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button collapsed btn-option" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseTwo">
                                                    <b>Famous Authors</b>
                                                </button>
                                            </h2>
                                            <div id="collapseThree" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    {items.slice(0, showAll ? items.length : 3).map((item, index) => (
                                                        <div className="mb-3 form-check">
                                                            <label className="form-check-label" for="exampleCheck1">{item}</label>
                                                        </div>
                                                    ))}
                                                    {!showAll && (
                                                        <span className='text-primary hover' onClick={handleShowMore}>{language.length - 3} More </span>
                                                    )}
                                                    {showLess && (
                                                        <span className='text-primary hover' onClick={handleLessMore}>Less</span>
                                                    )}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </>
                    :
                    <>
                    </>
                }
                <div className='d-lg-block d-none'>
                    <div className='aside-section'>
                        <div className='author-search'>
                            <label>Search by author name</label>
                            <div class="form-group has-search">
                                <FontAwesomeIcon icon={faSearch} className='form-control-feedback' />
                                {/* <span class="fa fa-search form-control-feedback"></span> */}
                                <input type="text" class="form-control" placeholder="Search Author" />
                            </div>
                        </div>
                        <div className="accordion" id="accordionExample">
                            <hr className='m-0' />
                            <div className="accordion-item border-0">
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed btn-option" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseTwo">
                                            <b>Famous Authors</b>
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            {items.slice(0, showAll ? items.length : 3).map((item, index) => (
                                                <div className="mb-3 p-0 form-check">
                                                    <label className="form-check-label" for="exampleCheck1">{item}</label>
                                                </div>
                                            ))}
                                            {!showAll && (
                                                <span className='text-primary hover' onClick={handleShowMore}>{language.length - 3} More </span>
                                            )}
                                            {showLess && (
                                                <span className='text-primary hover' onClick={handleLessMore}>Less</span>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>

    )
}

export default Authorname