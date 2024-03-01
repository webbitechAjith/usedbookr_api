import React, { useState, useEffect } from 'react';
import '../assets/css/aside.css'
import axios from "axios";
import Slider from '@material-ui/core/Slider';
import Rating from 'react-rating';

import 'font-awesome/css/font-awesome.min.css';




import { useSelector, useDispatch } from 'react-redux';
import { setFilterCategory, setFilteredProducts, setMegaMenu, setallBookDetails, setpriceFilter } from '../../Redux/CreateSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faFilter } from '@fortawesome/free-solid-svg-icons';
import { megamenu_list } from './apiBaseurl';


function Aside() {
    const { allbookDetails, priceFilter, filteredProducts, megaMenu, filterCategory } = useSelector((state) => state.usedbookr_product)
    const [sliderValue, setSliderValue] = useState(0); // Initial value
    const [topDetails, setTopDetails] = useState(0); // Initial value
    const [outDoor, setoutDoor] = useState(0); // Initial value
    const [disCount, setDisCount] = useState([0, 70]);
    const [values, setValues] = useState([0, 10])
    // const [value, setValue] = useState([0, 10])
    const [value, setValue] = useState([0, 10]);
    const [showCategory, setShowCategory] = useState(false);
    const [condition, setCondition] = useState([{ id: 1, con: 'New' }, { id: 2, con: 'Very Good' }, { id: 3, con: 'Good' }, { id: 4, con: 'Normal' }]);
    const [binding, setBinding] = useState([{ id: 1, bind: 'slim' }, { id: 2, bind: 'Cover' }]);
    const language = [{ id: 1, lan: 'English' }, { id: 2, lan: 'Tamil' }, { id: 3, lan: 'Malaiyam' }, { id: 4, lan: 'Hindi' }, { id: 5, lan: 'German' }, { id: 6, lan: 'Bengali' }]
    const [languageType, setLanguageType] = useState(language);
    const [filterOption, setFilterOption] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [showLess, setShowLess] = useState(false);

    const dispatch = useDispatch();

    const handleShowMore = () => {
        setShowAll(!showAll);
        setShowLess(!showLess)
    };
    const handleLessMore = () => {
        setShowLess(!showLess)
        setShowAll(!showAll);
    };
    // Price Changing State when volume increases/decreases 
    const rangeSelector = (event, newValue) => {
        setValue(newValue);

    };
    const discountRange = (event, newValue) => {
        setDisCount(newValue)
    }
    const menu_lists = async () => {
        const data = await megamenu_list();
        dispatch(setMegaMenu(data))
    }
    const category = (data) => {
        const index = filterCategory.findIndex(item => item.name === data.name);
        if (index === -1) {
            dispatch(setFilterCategory([...filterCategory, data])); // Add to filterCategory if not already present
        } else {
            dispatch(setFilterCategory(filterCategory.filter(item => item.name !== data.name))); // Remove from filterCategory
        }
    };
    const conditionFilter = (data) => {
        const index = filterCategory.findIndex(item => item.con === data.con);
        if (index === -1) {
            dispatch(setFilterCategory([...filterCategory, data])); // Add to filterCategory if not already present
        } else {
            dispatch(setFilterCategory(filterCategory.filter(item => item.con !== data.con))); // Remove from filterCategory
        }
    }
    const languageFilter = (data) => {
        const index = filterCategory.findIndex(item => item.lan === data.lan);
        if (index === -1) {
            dispatch(setFilterCategory([...filterCategory, data])); // Add to filterCategory if not already present
        } else {
            dispatch(setFilterCategory(filterCategory.filter(item => item.lan !== data.lan))); // Remove from filterCategory
        }
    }
    const bindFilter = (data) => {
        const index = filterCategory.findIndex(item => item.bind === data.bind);
        if (index === -1) {
            dispatch(setFilterCategory([...filterCategory, data])); // Add to filterCategory if not already present
        } else {
            dispatch(setFilterCategory(filterCategory.filter(item => item.bind !== data.bind))); // Remove from filterCategory
        }
    }
    
    const handlePriceChange = (minPrice, maxPrice) => {
        // Handle the price change logic here
        console.log('Selected Price Range:', minPrice, maxPrice);
    };
    const toggleCategory = () => {
        setShowCategory(!showCategory);
        setFilterOption(!filterOption)
    };

    useEffect(() => {
        menu_lists();
    }, [])
    return (
        <>
            <aside className='my-lg-5 my-2'>
                {/* {filterOption ?
                    <>

                    </>
                    :
                    <>
                        <div className='text-end d-lg-none d-block filter-category my-2'>
                            <button onClick={toggleCategory}><FontAwesomeIcon icon={faFilter} style={{ color: '#FFF' }} className='mx-2' />filter</button>
                        </div>
                    </>

                } */}
                {filterOption ?

                    <>
                        <div className='aside-section fixed-filter'>
                            <div className={`offcanvas offcanvas-start ${showCategory ? 'show overflow-auto w-100' : ''}`} tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                                <div className="offcanvas-header">
                                    <button className='filter-search'>Search</button>
                                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" onClick={toggleCategory}></button>
                                </div>
                                <div className="offcanvas-body">
                                    <div className="accordion scroll-y" id="accordionExample">
                                        <div className="accordion-item border-0">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button collapsed btn-option" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                                    <b>Categories</b>
                                                </button>
                                            </h2>
                                            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    {megaMenu.length > 0 ? (
                                                        megaMenu.map(data => (
                                                            <div key={data.id} className="mb-3 form-check">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id={data.id}
                                                                    onClick={() => category(data)}
                                                                    checked={filterCategory.some(item => item.name === data.name)}
                                                                />
                                                                <label className="form-check-label" htmlFor={data.id}>{data.name}</label>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p>null</p>
                                                    )}
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
                                                    {condition && condition.map((data, index) => (
                                                        <div key={index} className="mb-3 form-check">
                                                            <input type="checkbox"
                                                                className="form-check-input" id={`exampleCheck${index + 1}`}
                                                                onClick={() => conditionFilter(data)}
                                                                checked={filterCategory.some(item => item.con == data.con)}
                                                            />
                                                            <label className="form-check-label" htmlFor={`exampleCheck${index + 1}`}>{data.con}</label>
                                                        </div>
                                                    ))}

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
                                                    {languageType.slice(0, showAll ? languageType.length : 3).map((data, index) => (
                                                        <div className="mb-3 form-check">
                                                            <input type="checkbox"
                                                                className="form-check-input"
                                                                id="exampleCheck1"
                                                                onClick={() => languageFilter(data)}
                                                                checked={filterCategory.some(item => item.lan === data.lan)}
                                                            />
                                                            <label className="form-check-label" for="exampleCheck1">{data.lan}</label>
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
                                                    {binding && binding.map((data, index) => (
                                                        <div key={index} className="mb-3 form-check">
                                                            <input type="checkbox"
                                                                className="form-check-input" id={`exampleCheck${index + 1}`}
                                                                onClick={() => bindFilter(data)}
                                                                checked={filterCategory.some(item => item.bind == data.bind)}
                                                            />
                                                            <label className="form-check-label" htmlFor={`exampleCheck${index + 1}`}>{data.bind}</label>
                                                        </div>
                                                    ))}

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
                                                    // valueLabelDisplay="auto"
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
                                    <button className="accordion-button collapsed btn-option" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                        <b>Categories</b>
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        {megaMenu.length > 0 ? (
                                            megaMenu.map(data => (
                                                <div key={data.id} className="mb-3 form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        id={data.id}
                                                        onClick={() => category(data)}
                                                        checked={filterCategory.some(item => item.name === data.name)}
                                                    />
                                                    <label className="form-check-label" htmlFor={data.id}>{data.name}</label>
                                                </div>
                                            ))
                                        ) : (
                                            <p>null</p>
                                        )}
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
                                        {condition && condition.map((data, index) => (
                                            <div key={index} className="mb-3 form-check">
                                                <input type="checkbox"
                                                    className="form-check-input" id={`exampleCheck${index + 1}`}
                                                    onClick={() => conditionFilter(data)}
                                                    checked={filterCategory.some(item => item.con == data.con)}
                                                />
                                                <label className="form-check-label" htmlFor={`exampleCheck${index + 1}`}>{data.con}</label>
                                            </div>
                                        ))}

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
                                        {languageType.slice(0, showAll ? languageType.length : 3).map((data, index) => (
                                            <div className="mb-3 form-check">
                                                <input type="checkbox"
                                                    className="form-check-input"
                                                    id="exampleCheck1"
                                                    onClick={() => languageFilter(data)}
                                                    checked={filterCategory.some(item => item.lan === data.lan)}
                                                />
                                                <label className="form-check-label" for="exampleCheck1">{data.lan}</label>
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
                                        {binding && binding.map((data, index) => (
                                            <div key={index} className="mb-3 form-check">
                                                <input type="checkbox"
                                                    className="form-check-input" id={`exampleCheck${index + 1}`}
                                                    onClick={() => bindFilter(data)}
                                                    checked={filterCategory.some(item => item.bind == data.bind)}
                                                />
                                                <label className="form-check-label" htmlFor={`exampleCheck${index + 1}`}>{data.bind}</label>
                                            </div>
                                        ))}

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
                                        // valueLabelDisplay="auto"
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