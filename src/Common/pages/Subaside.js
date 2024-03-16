import React, { useState, useEffect } from 'react';
import '../assets/css/aside.css'
import axios from "axios";
import Slider from '@material-ui/core/Slider';
import Rating from 'react-rating';

import 'font-awesome/css/font-awesome.min.css';




import { useSelector, useDispatch } from 'react-redux';
import { setFilterBookCategory, setFilterCategory, setFilteredProducts, setMegaMenu, setallBookDetails, setpriceFilter } from '../../Redux/CreateSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faFilter } from '@fortawesome/free-solid-svg-icons';
import { megamenu_list } from './apiBaseurl';
import { useLocation, useParams } from 'react-router-dom';


function Subaside() {
    const { allbookDetails, priceFilter, filteredProducts, filterBookCategory, megaMenu, filterCategory } = useSelector((state) => state.usedbookr_product)
    const [disCount, setDisCount] = useState([0, 70]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [minDiscount, setMinDiscount] = useState(0);
    const [maxDiscount, setMaxDiscount] = useState(0);
    const [showCategory, setShowCategory] = useState(false);
    const [condition, setCondition] = useState([{ id: 1, con: 'New' }, { id: 2, con: 'Very Good' }, { id: 3, con: 'Good' }, { id: 4, con: 'Normal' }]);
    const [binding, setBinding] = useState([{ id: 1, bind: 'slim' }, { id: 2, bind: 'Cover' }]);
    const [languageType, setLanguageType] = useState([{ id: 1, lan: 'English' }, { id: 2, lan: 'Tamil' }, { id: 3, lan: 'Malaiyam' }, { id: 4, lan: 'Hindi' }, { id: 5, lan: 'German' }, { id: 6, lan: 'Bengali' }]);
    const [ratingType, setRatingType] = useState([{ id: 1, star: '5' }, { id: 2, star: '4' }, { id: 3, star: '3' }, { id: 4, star: '2' }, { id: 5, star: '1' }]);
    const [filterOption, setFilterOption] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [showLess, setShowLess] = useState(false);

    const dispatch = useDispatch();
    const location = useLocation();
    const params = useParams();
    const childcategorysss = location.state.name
    console.log("ajith", childcategorysss)
    console.log("kumar", megaMenu)
    const handleShowMore = () => {
        setShowAll(!showAll);
        setShowLess(!showLess)
    };
    const handleLessMore = () => {
        setShowLess(!showLess)
        setShowAll(!showAll);
    };


    const menu_lists = async () => {
        const data = await megamenu_list();
        dispatch(setMegaMenu(data))
    }
    const filterData = (filterCategory, data, key) => {
        const index = filterCategory.findIndex(item => item[key] === data[key]);
        if (index === -1) {
            return [...filterCategory, data];
        } else {
            return filterCategory.filter(item => item[key] !== data[key]);
        }
    };
    const filter = (data, key) => {
        dispatch(setFilterCategory(filterData(filterCategory, data, key)));
    };

    // Function to handle changes in price range slider
    const handlePriceFilter = (newMinPrice, newMaxPrice) => {
        setMinPrice(newMinPrice);
        setMaxPrice(newMaxPrice);
        const updatedFilteredBooks = allbookDetails.filter(book => {
            const price = parseFloat(book.original_price);
            return price >= minPrice && price <= maxPrice;
        });
        if (updatedFilteredBooks.length > 0) {
            dispatch(setFilterCategory(updatedFilteredBooks));
        } else {
            dispatch(setFilterCategory([{ key: "price", value: null }]));
        }
    };

    // Render your items based on the discount
    const handleDiscountFilter = (newMinDiscount, newMaxDiscount) => {
        setMinDiscount(newMinDiscount);
        setMaxDiscount(newMaxDiscount);
        const updatedFilteredBooks = allbookDetails.filter(book => {
            const disCounts = parseFloat(book.discount);
            return disCounts >= minDiscount && disCounts <= maxDiscount;
        });
        if (updatedFilteredBooks.length > 0) {
            dispatch(setFilterCategory(updatedFilteredBooks));
        } else {
            dispatch(setFilterCategory([{ key: "discounts", value: null }]));
        }
    };

    // Use the filteredBooks array as needed
    const toggleCategory = () => {
        setShowCategory(!showCategory);
        setFilterOption(!filterOption)
    };
    useEffect(() => {
        menu_lists();
    }, [allbookDetails, minPrice, maxPrice]);

    return (
        <>
            <aside className='my-lg-5 my-2'>
                {filterOption ?
                    <>

                    </>
                    :
                    <>
                        <div className='text-end d-lg-none d-block filter-category my-2'>
                            <button onClick={toggleCategory}><FontAwesomeIcon icon={faFilter} style={{ color: '#FFF' }} className='mx-2' />filter</button>
                        </div>
                    </>

                }
                {filterOption ?

                    <>
                        <div className='aside-section fixed-filter'>
                            <div className={`offcanvas offcanvas-start ${showCategory ? 'show overflow-auto w-100' : ''}`} tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                                <div className="offcanvas-header">
                                    {/* <button className='filter-search'>Search</button> */}
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
                                                    <div className="mb-3 form-check">
                                                        <input type="checkbox"
                                                            className="form-check-input"
                                                            checked
                                                        />
                                                        <label className="form-check-label">{childcategorysss}</label>
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
                                                    {condition && condition.map((data, index) => (
                                                        <div key={index} className="mb-3 form-check">
                                                            <input type="checkbox"
                                                                className="form-check-input" id={`exampleCheck${index + 1}`}
                                                                onClick={() => filter(data, 'con')}
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
                                                    {languageType.slice(0, showAll ? languageType?.length : 3).map((data, index) => (
                                                        <div className="mb-3 form-check">
                                                            <input type="checkbox"
                                                                className="form-check-input" id={`exampleCheck${index + 1}`}
                                                                onClick={() => filter(data, 'lan')}
                                                                checked={filterCategory.some(item => item.lan === data.lan)}
                                                            />
                                                            <label className="form-check-label" for="exampleCheck1">{data.lan}</label>
                                                        </div>
                                                    ))}
                                                    {!showAll && (
                                                        <span className='text-primary hover' onClick={handleShowMore}>{languageType?.length - 3} More </span>
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
                                                                onClick={() => filter(data, 'bind')}
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
                                                <button className="accordion-button collapsed btn-option" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseThree">
                                                    <b>Discount</b>
                                                </button>
                                            </h2>
                                            <div id="collapseSix" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                                <div className='container-90'>
                                                    <Slider
                                                        value={[minDiscount, maxDiscount]}
                                                        onChange={(event, newValue) => handleDiscountFilter(newValue[0], newValue[1])}
                                                        min={0}
                                                        max={100}
                                                    />

                                                    <h6 className='py-2'>Discount is between {minDiscount}% - {maxDiscount}%</h6>
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
                                                        value={[minPrice, maxPrice]}
                                                        onChange={(event, newValue) => handlePriceFilter(newValue[0], newValue[1])}
                                                        min={0}
                                                        max={2000}
                                                    />
                                                    {/* Display the low and high prices */}
                                                    <h6>Price is between {minPrice} - {maxPrice}</h6>
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
                                                        {ratingType && ratingType.map((data, index) => (
                                                            <div className="mb-3 form-check">
                                                                <input type="checkbox"
                                                                    className="form-check-input" id={`exampleCheck${index + 1}`}
                                                                    onClick={() => filter(data, 'star')}
                                                                    checked={filterCategory.some(item => item.star === data.star)}
                                                                />
                                                                <Rating
                                                                    initialRating={data.star}
                                                                    emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                                                    fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                                                    readonly={true}
                                                                />{data.star}.0 & ups
                                                            </div>
                                                        ))}
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
                                        <div className="mb-3 form-check">
                                            <input type="checkbox"
                                                className="form-check-input"
                                                checked
                                            />
                                            <label className="form-check-label">{childcategorysss}</label>
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
                                        {condition && condition.map((data, index) => (
                                            <div key={index} className="mb-3 form-check">
                                                <input type="checkbox"
                                                    className="form-check-input" id={`exampleCheck${index + 1}`}
                                                    onClick={() => filter(data, 'con')}
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
                                                    onClick={() => filter(data, 'lan')}
                                                    checked={filterCategory.some(item => item.lan === data.lan)}
                                                />
                                                <label className="form-check-label" for="exampleCheck1">{data.lan}</label>
                                            </div>
                                        ))}
                                        {!showAll && (
                                            <span className='text-primary hover' onClick={handleShowMore}>{languageType?.length - 3} More </span>
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
                                                    onClick={() => filter(data, 'bind')}
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
                                    <button className="accordion-button collapsed btn-option" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseThree">
                                        <b>Discount</b>
                                    </button>
                                </h2>
                                <div id="collapseSix" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                    <div className='container-90'>
                                        <Slider
                                            value={[minDiscount, maxDiscount]}
                                            onChange={(event, newValue) => handleDiscountFilter(newValue[0], newValue[1])}
                                            min={0}
                                            max={100}
                                        />

                                        <h6 className='py-2'>Discount is between {minDiscount}% - {maxDiscount}%</h6>
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
                                            value={[minPrice, maxPrice]}
                                            onChange={(event, newValue) => handlePriceFilter(newValue[0], newValue[1])}
                                            min={0}
                                            max={2000}
                                        />
                                        {/* Display the low and high prices */}
                                        <h6>Price is between {minPrice} - {maxPrice}</h6>
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
                                            {ratingType && ratingType.map((data, index) => (
                                                <div className="mb-3 form-check">
                                                    <input type="checkbox"
                                                        className="form-check-input" id={`exampleCheck${index + 1}`}
                                                        onClick={() => filter(data, 'star')}
                                                        checked={filterCategory.some(item => item.star === data.star)}
                                                    />
                                                    <Rating
                                                        initialRating={data.star}
                                                        emptySymbol={<i className="far fa-star" style={{ color: 'lightgray' }}></i>}
                                                        fullSymbol={<i className="fas fa-star" style={{ color: '#FFA837' }}></i>}
                                                        readonly={true}
                                                    /> <b className='mx-2'>{data.star}.0 & up </b>
                                                </div>
                                            ))}
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

export default Subaside