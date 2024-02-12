import React, { useState, useEffect } from 'react';
import '../assets/css/aside.css'
import axios from "axios";
import Slider from '@material-ui/core/Slider';
import Rating from 'react-rating';

import 'font-awesome/css/font-awesome.min.css';




import { useSelector, useDispatch } from 'react-redux';
import { setAuthorsName, setFilteredProducts, setallBookDetails, setpriceFilter } from '../../Redux/CreateSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';


function Authorname() {
    const { allbookDetails, priceFilter, filteredProducts, authorsDetails, authorsName } = useSelector((state) => state.usedbookr_product)
    const [sliderValue, setSliderValue] = useState(0); // Initial value
    const [topDetails, setTopDetails] = useState(0); // Initial value
    const [outDoor, setoutDoor] = useState(0); // Initial value


    const dispatch = useDispatch();

    // language state 
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
    const handleChange = (event) => {
        dispatch(setAuthorsName(event))
    }
    // useEffect(() => {
    //     // Filter products based on the max price
    //     const filtered = allbookDetails.filter(product => product.total_price <= maxPrice);
    //     dispatch(setFilteredProducts(filtered));
    // }, [maxPrice, allbookDetails]);
    useEffect(() => {
        if(authUser.length)
        console.log(authorsDetails)
    },[])

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
                                            {authorsName.length > 0 ? <><input type="text" class="form-control" value={authorsName} onChange={handleChange} /></> : <><input type="text" class="form-control" placeholder="search authorsName" onChange={handleChange} /></>}
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
                                                    {authorsDetails.map((data) => {
                                                        <div className="mb-3 p-0 form-check">
                                                            <label className="form-check-label" for="exampleCheck1">{data.author}</label>
                                                        </div>
                                                    })}
                                                    {!showAll && (
                                                        <span className='text-primary hover' onClick={handleShowMore}>{authorsDetails.length - 1} More </span>
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
                                {authorsName.length > 0 ? <><input type="text" class="form-control" value={authorsName} onChange={handleChange} /></> : <><input type="text" class="form-control" placeholder='search author name' onChange={handleChange} /></>}
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
                                            {/* {items.slice(0, showAll ? items.length : 3).map((item, index) => (
                                                <div className="mb-3 p-0 form-check">
                                                    <label className="form-check-label" for="exampleCheck1">{item}</label>
                                                </div>
                                            ))} */}
                                            {authorsDetails && authorsDetails.map((items) => {
                                                <div className="mb-3 p-0 form-check">
                                                    <label className="form-check-label" for="exampleCheck1">{items.author}</label>
                                                </div>
                                            })}
                                            {!showAll && (
                                                <span className='text-primary hover' onClick={handleShowMore}>{authorsDetails.length - 1} More </span>
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