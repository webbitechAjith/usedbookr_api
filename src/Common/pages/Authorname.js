import React, { useState, useEffect } from 'react';
import '../assets/css/aside.css'
import axios from "axios";
import Slider from '@material-ui/core/Slider';
import Rating from 'react-rating';

import 'font-awesome/css/font-awesome.min.css';




import { useSelector, useDispatch } from 'react-redux';
import { setAuthorBookDetails, setAuthorsDetails, setAuthorsName, setFilteredProducts, setallBookDetails, setpriceFilter } from '../../Redux/CreateSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { allbooks, authUser } from './apiBaseurl';


function Authorname() {
    const { allbookDetails, authorBookDetails, priceFilter, filteredProducts, authorsDetails, authorsName } = useSelector((state) => state.usedbookr_product)
    const [sliderValue, setSliderValue] = useState(0); // Initial value
    const [topDetails, setTopDetails] = useState(0); // Initial value
    const [outDoor, setoutDoor] = useState(0); // Initial value
    const [filterOption, setFilterOption] = useState(false);
    const [showCategory, setShowCategory] = useState(false);
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
    const filter = () => {
        setFilterOption(!filterOption)
        setShowCategory(!showCategory);
    }
    const handleChange = async (event) => {
        try {
            const newSearchAuthor = event.target.value;
            // First, update the searchProduct state
            dispatch(setAuthorsName(newSearchAuthor))
            const data = await authUser();
            const overall_books = await allbooks();
            // Access the updated searchItem from the state
            const searchResults = data.filter((bookauthor) => bookauthor.author.toLowerCase().includes(newSearchAuthor.toLowerCase()) || bookauthor.author.toLowerCase().includes(authorsName.toLowerCase()));
            const allbookSearch = allbookDetails.filter((bookDetails) => {
                if (bookDetails.author && bookDetails.author.length > 0) {
                    const searchAuthorLower = newSearchAuthor.toLowerCase();
                    const authorsNameLower = authorsName.toLowerCase();

                    const firstAuthorLower = bookDetails.author.toLowerCase();
                    return firstAuthorLower.includes(searchAuthorLower) || firstAuthorLower.includes(authorsNameLower);
                }
                return false;
            });
            dispatch(setallBookDetails(allbookSearch));
            dispatch(setAuthorBookDetails(allbookSearch))
            if (newSearchAuthor == '') {
                dispatch(setAuthorsDetails(data));
                dispatch(setallBookDetails(overall_books))
                dispatch(setAuthorBookDetails(''))
            } else {
                dispatch(setAuthorsDetails(searchResults));
                dispatch(setallBookDetails(allbookSearch));
                dispatch(setAuthorBookDetails(allbookSearch))
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const authorCheck = (dataName) => {
        dispatch(setAuthorsName(dataName))
    }
    console.log(filterOption)
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

                        <div className='aside-section'>
                            <div className={`offcanvas offcanvas-start ${showCategory ? 'show overflow-auto w-100' : ''}`} tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                                <div className="offcanvas-header">
                                    {/* <button className='filter-search'>Search</button> */}
                                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" onClick={filter}></button>
                                </div>
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

                                                    {authorsDetails.length > 0 ? (
                                                        <>
                                                            {Array.isArray(authorsDetails) && authorsDetails.slice(0, showAll ? authorsDetails.length : 3).map((items, index) => (
                                                                <div className="mb-3 p-0 form-check" key={index}>
                                                                    <label className="form-check-label" htmlFor="exampleCheck1" onClick={() => authorCheck(items.author)}>{items.author}</label>
                                                                </div>
                                                            ))}
                                                            {!showAll && (
                                                                <span className='text-primary hover' onClick={handleShowMore}>{authorsDetails.length - 3} More </span>
                                                            )}
                                                            {showLess && (
                                                                <span className='text-primary hover' onClick={handleLessMore}>Less</span>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="mb-3 p-0 form-check">
                                                                <label className="form-check-label" htmlFor="exampleCheck1">NO author</label>
                                                            </div>
                                                            {!showAll && (
                                                                <span className='text-primary hover'>Total - {authorsDetails.length}</span>
                                                            )}
                                                        </>
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

                                                    {authorsDetails.length > 0 ? (
                                                        <>
                                                            {Array.isArray(authorsDetails) && authorsDetails.slice(0, showAll ? authorsDetails.length : 3).map((items, index) => (
                                                                <div className="mb-3 p-0 form-check" key={index}>
                                                                    <label className="form-check-label" htmlFor="exampleCheck1" onClick={() => authorCheck(items.author)}>{items.author}</label>
                                                                </div>
                                                            ))}
                                                            {!showAll && (
                                                                <span className='text-primary hover' onClick={handleShowMore}>{authorsDetails.length - 3} More </span>
                                                            )}
                                                            {showLess && (
                                                                <span className='text-primary hover' onClick={handleLessMore}>Less</span>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="mb-3 p-0 form-check">
                                                                <label className="form-check-label" htmlFor="exampleCheck1">NO author</label>
                                                            </div>
                                                            {!showAll && (
                                                                <span className='text-primary hover'>Total - {authorsDetails.length}</span>
                                                            )}
                                                        </>
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