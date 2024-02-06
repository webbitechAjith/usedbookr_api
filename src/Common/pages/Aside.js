import React, { useState, useEffect } from 'react';
import '../assets/css/aside.css'
import axios from "axios";
import Slider from '@material-ui/core/Slider';
import Rating from 'react-rating';

import 'font-awesome/css/font-awesome.min.css';




import { useSelector, useDispatch } from 'react-redux';
import { setFilteredProducts, setallplantDetails, setpriceFilter } from '../../Redux/CreateSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faFilter } from '@fortawesome/free-solid-svg-icons';


function Aside() {
    const { allplantsDetails, priceFilter, filteredProducts } = useSelector((state) => state.usedbookr_product)
    const [sliderValue, setSliderValue] = useState(0); // Initial value
    const [topDetails, setTopDetails] = useState(0); // Initial value
    const [outDoor, setoutDoor] = useState(0); // Initial value
    const [value, setValue] = useState([2, 10]);
    const [disCount, setDisCount] = useState([0, 70]);


    const dispatch = useDispatch();


    // Price Changing State when volume increases/decreases 
    const rangeSelector = (event, newValue) => {
        setValue(newValue);
    };
    const discountRange = (event,newValue) =>{
        setDisCount(newValue)
    }
    // const handleFilterChange = (minPrice, maxPrice) => {
    //     setFilter({ minPrice, maxPrice });
    // };

    // const prices = [50, 100, 200, 500, 1000, 1500];

    // language state 
    const language = ['English', 'Tamil', 'Malaiyam', 'Hindi', 'German', 'Bengali']
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
            allplantsDetails && allplantsDetails.map((data, index) => {
                if (data.category_id == 1) {
                    innerdoor.push(data)
                }
            })
            dispatch(setallplantDetails(innerdoor))
        } else {
            const { data } = await axios.get('https://webbitech.co.in/ecommerce/public/api/productlist');
            dispatch(setallplantDetails(data.data))
        }
    }
    const outdoor = async () => {
        const onvalue = setoutDoor((prevValue) => (prevValue === 0 ? 1 : 0));
        console.log("onvalue", topDetails)
        if (outDoor === 0) {
            console.log("ajith")
            const outdoor = [];
            allplantsDetails && allplantsDetails.map((data, index) => {
                if (data.category_id == 3) {
                    outdoor.push(data)
                }
            })
            dispatch(setallplantDetails(outdoor))
        } else {
            const { data } = await axios.get('https://webbitech.co.in/ecommerce/public/api/productlist');
            dispatch(setallplantDetails(data.data))
            console.log('kumar')

        }
    }
    const handlePriceChange = (minPrice, maxPrice) => {
        // Handle the price change logic here
        console.log('Selected Price Range:', minPrice, maxPrice);
    };
    // useEffect(() => {
    //     // Filter products based on the max price
    //     const filtered = allplantsDetails.filter(product => product.total_price <= maxPrice);
    //     dispatch(setFilteredProducts(filtered));
    // }, [maxPrice, allplantsDetails]);

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
                                <div className="accordion scroll-y" id="accordionExample">
                                    <div className="accordion-item border-0">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button btn-option" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                <b>Categories</b>
                                            </button>
                                        </h2>
                                        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <div className="mb-3 form-check">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" checked={topDetails === 1} onClick={() => indoor()} />
                                                    <label className="form-check-label" for="exampleCheck1">Education<span>(13)</span></label>
                                                </div>
                                                <div className="mb-3 form-check">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" onClick={() => outdoor()} />
                                                    <label className="form-check-label" for="exampleCheck1">Magazines<span>(15)</span></label>
                                                </div>
                                                <div className="mb-3 form-check">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                    <label className="form-check-label" for="exampleCheck1">Philosophy & Religion<span>(18)</span></label>
                                                </div>
                                                <div className="mb-3 form-check">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                    <label className="form-check-label" for="exampleCheck1">Economics & Business<span>(13)</span></label>
                                                </div>
                                                <div className="mb-3 form-check">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                    <label className="form-check-label" for="exampleCheck1">Political<span>(15)</span></label>
                                                </div>
                                                <div className="mb-3 form-check">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                    <label className="form-check-label" for="exampleCheck1">Children Comics<span>(18)</span></label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className='m-0' />
                                    <div className="accordion-item border-0">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed btn-option" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                <b>Condition</b>
                                            </button>
                                        </h2>
                                        <div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <div className="mb-3 form-check">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                    <label className="form-check-label" for="exampleCheck1">Good (13)</label>
                                                </div>
                                                <div className="mb-3 form-check">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                    <label className="form-check-label" for="exampleCheck1">Very Good (15)</label>
                                                </div>
                                                <div className="mb-3 form-check">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                    <label className="form-check-label" for="exampleCheck1">Well Read (22)</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className='m-0' />
                                    <div className="accordion-item border-0">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed btn-option" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseTwo">
                                                <b>Language</b>
                                            </button>
                                        </h2>
                                        <div id="collapseThree" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                {items.slice(0, showAll ? items.length : 3).map((item, index) => (
                                                    <div className="mb-3 form-check">
                                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
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
                                    <hr className='m-0' />
                                    <div className="accordion-item border-0">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed btn-option" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseTwo">
                                                <b>Binding Type</b>
                                            </button>
                                        </h2>
                                        <div id="collapseFour" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <div className="mb-3 form-check">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                    <label className="form-check-label" for="exampleCheck1">Hard cover</label>
                                                </div>
                                                <div className="mb-3 form-check">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                    <label className="form-check-label" for="exampleCheck1">Leather Bound</label>
                                                </div>
                                                <div className="mb-3 form-check">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                    <label className="form-check-label" for="exampleCheck1">Non-Binding</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className='m-0' />
                                    <div className="accordion-item border-0">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed btn-option" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseTwo">
                                                <b>Latest Arrivals</b>
                                            </button>
                                        </h2>
                                        <div id="collapseFive" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <div className="mb-3 form-check">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                    <label className="form-check-label" for="exampleCheck1">Last 30 Days</label>
                                                </div>
                                                <div className="mb-3 form-check">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                    <label className="form-check-label" for="exampleCheck1">Last 90 Days</label>
                                                </div>
                                                <div className="mb-3 form-check">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                    <label className="form-check-label" for="exampleCheck1">Last 150 Days</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className='m-0' />
                                    <div className="accordion-item border-0">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed btn-option" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseThree">
                                                <b>Discount</b>
                                            </button>
                                        </h2>
                                        <div id="collapseSix" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                            <div className='container-90'>
                                                <Slider
                                                    value={disCount}
                                                    onChange={discountRange}
                                                    valueLabelDisplay="auto"
                                                />
                                                <h6>Discount is between {disCount[0]}% - {disCount[1]}%</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className='m-0' />
                                    <div className="accordion-item border-0">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed btn-option" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseThree">
                                                <b>Price</b>
                                            </button>
                                        </h2>
                                        <div id="collapseSix" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                            <div className='container-90'>
                                                <Slider
                                                    value={value}
                                                    onChange={rangeSelector}
                                                    valueLabelDisplay="auto"
                                                />
                                                <h6 className='py-2'>Price is between {value[0]} - {value[1]}</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className='m-0' />
                                    <div className="accordion-item border-0">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed btn-option" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseFour">
                                                <b>Rating</b>
                                            </button>
                                        </h2>
                                        <div id="collapseSeven" className="accordion-collapse collapse show" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <div className="mb-3 form-check">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                    <Rating
                                                        initialRating={5}
                                                        emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                                        fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                                        readonly={true}
                                                    /> <b>5.0</b>
                                                </div>
                                                <div className="mb-3 form-check">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                    <Rating
                                                        initialRating={4}
                                                        emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                                        fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                                        readonly={true}
                                                    /> <b>4.0 & up</b>
                                                </div>
                                                <div className="mb-3 form-check">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                    <Rating
                                                        initialRating={3}
                                                        emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                                        fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                                        readonly={true}
                                                    /> <b>3.0 & up</b>
                                                </div>
                                                <div className="mb-3 form-check">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                    <Rating
                                                        initialRating={2}
                                                        emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                                        fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                                        readonly={true}
                                                    /> <b>2.0 & up</b>
                                                </div>
                                                <div className="mb-3 form-check">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                    <Rating
                                                        initialRating={1}
                                                        emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                                        fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                                        readonly={true}
                                                    /> <b>1.0 & up</b>
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
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item border-0">
                                <h2 className="accordion-header">
                                    <button className="accordion-button btn-option" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        <b>Categories</b>
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div className="mb-3 form-check">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" checked={topDetails === 1} onClick={() => indoor()} />
                                            <label className="form-check-label" for="exampleCheck1">Education<span>(13)</span></label>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" onClick={() => outdoor()} />
                                            <label className="form-check-label" for="exampleCheck1">Magazines<span>(15)</span></label>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                            <label className="form-check-label" for="exampleCheck1">Philosophy & Religion<span>(18)</span></label>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                            <label className="form-check-label" for="exampleCheck1">Economics & Business<span>(13)</span></label>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                            <label className="form-check-label" for="exampleCheck1">Political<span>(15)</span></label>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                            <label className="form-check-label" for="exampleCheck1">Children Comics<span>(18)</span></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className='m-0' />
                            <div className="accordion-item border-0">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed btn-option" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        <b>Condition</b>
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div className="mb-3 form-check">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                            <label className="form-check-label" for="exampleCheck1">Good (13)</label>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                            <label className="form-check-label" for="exampleCheck1">Very Good (15)</label>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                            <label className="form-check-label" for="exampleCheck1">Well Read (22)</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className='m-0' />
                            <div className="accordion-item border-0">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed btn-option" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseTwo">
                                        <b>Language</b>
                                    </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        {items.slice(0, showAll ? items.length : 3).map((item, index) => (
                                            <div className="mb-3 form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
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
                            <hr className='m-0' />
                            <div className="accordion-item border-0">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed btn-option" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseTwo">
                                        <b>Binding Type</b>
                                    </button>
                                </h2>
                                <div id="collapseFour" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div className="mb-3 form-check">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                            <label className="form-check-label" for="exampleCheck1">Hard cover</label>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                            <label className="form-check-label" for="exampleCheck1">Leather Bound</label>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                            <label className="form-check-label" for="exampleCheck1">Non-Binding</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className='m-0' />
                            <div className="accordion-item border-0">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed btn-option" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseTwo">
                                        <b>Latest Arrivals</b>
                                    </button>
                                </h2>
                                <div id="collapseFive" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div className="mb-3 form-check">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                            <label className="form-check-label" for="exampleCheck1">Last 30 Days</label>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                            <label className="form-check-label" for="exampleCheck1">Last 90 Days</label>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                            <label className="form-check-label" for="exampleCheck1">Last 150 Days</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className='m-0' />
                            <div className="accordion-item border-0">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed btn-option" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseThree">
                                        <b>Discount</b>
                                    </button>
                                </h2>
                                <div id="collapseSix" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                    <div className='container-90'>
                                        <Slider
                                            value={disCount}
                                            onChange={discountRange}
                                            valueLabelDisplay="auto"
                                        />
                        
                                        <h6 className='py-2'>Discount is between {disCount[0]}% - {disCount[1]}%</h6>
                                    </div>
                                </div>
                            </div>
                            <hr className='m-0' />
                            <div className="accordion-item border-0">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed btn-option" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseThree">
                                        <b>Price</b>
                                    </button>
                                </h2>
                                <div id="collapseSeven" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                    <div className='container-90'>
                                        <Slider
                                            value={value}
                                            onChange={rangeSelector}
                                            valueLabelDisplay="auto"
                                        />
                                        <h6>Price is between {value[0]} - {value[1]}</h6>
                                    </div>
                                </div>
                            </div>
                            <hr className='m-0' />
                            <div className="accordion-item border-0">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed btn-option" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseFour">
                                        <b>Rating</b>
                                    </button>
                                </h2>
                                <div id="collapseEight" className="accordion-collapse collapse show" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div className="mb-3 form-check">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                            <Rating
                                                initialRating={5}
                                                emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                                fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                                readonly={true}
                                            /> <b>5.0</b>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                            <Rating
                                                initialRating={4}
                                                emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                                fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                                readonly={true}
                                            /> <b>4.0 & up</b>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                            <Rating
                                                initialRating={3}
                                                emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                                fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                                readonly={true}
                                            /> <b>3.0 & up</b>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                            <Rating
                                                initialRating={2}
                                                emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                                fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                                readonly={true}
                                            /> <b>2.0 & up</b>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                            <Rating
                                                initialRating={1}
                                                emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                                fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                                readonly={true}
                                            /> <b>1.0 & up</b>
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

export default Aside