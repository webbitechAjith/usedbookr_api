import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'; // Import Bootstrap components
import Header from '../Common/pages/Header'
import Footer from '../Common/pages/Footer'
import Useraside from '../Common/pages/Useraside'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import '../Common/assets/css/profile.css'

// image path 
import plant1 from '../Common/assets/image/description4.png'
import { useDispatch, useSelector } from 'react-redux';
import { allbooks, bookHistory, orderHistory, reviewRating } from '../Common/pages/apiBaseurl';
import { setsingleBookHistory, setReviewDetails, setallBookDetails, setSingleBookHistory, setHistoryDetails } from '../Redux/CreateSlice';
import { useParams } from 'react-router-dom';


function Historybook() {
    const { allbookDetails, singleBookHistory, reviewDetails } = useSelector((state) => state.usedbookr_product)
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [selectedDate, setSelectedDate] = useState('Last 30 Days')
    const [statuslevel, setStatusLevel] = useState(true);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const handleShows = (data) => {
        dispatch(setReviewDetails({ book_id: data.id, rating: '', review: '' }))
        setShow(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        handleClose(); // Close the modal after submission
    };
    const dispatch = useDispatch();
    const params = useParams();

    const reviewUpdate = async (reviewDetails) => {
        console.log(reviewDetails)
        const review = await reviewRating(reviewDetails);
        console.log(18181,review)
        if (review.message) {
            alert("Review Successfully");
            handleClose(); // Close the modal after submission
            // window.location.reload()
        }
    }

    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
    };

    const handleDateChange = (filter) => {
        setSelectedDate(filter);
    };

    const orderDetails = async () => {
        const book = await allbooks();
        dispatch(setallBookDetails(book));

    }
    const formatDate = (dateString) => {
        const dateObject = new Date(dateString);
        const formattedDate = dateObject.toISOString().split('T')[0];
        return formattedDate;
    };
    const viewHistory = async (book) => {
        try {
            const books = await bookHistory(book); // Assuming bookHistory is an asynchronous function
            dispatch(setSingleBookHistory(books));
        } catch (error) {
            console.error('Error fetching book history:', error);
            // Handle error if necessary
        }
    };

    useEffect(() => {
        orderDetails();
        viewHistory(params.id)
    }, []);
    console.log(11122,reviewDetails)
    return (
        <div>
            <Header />
            <div className='history-section'>
                <div className='d-lg-block d-none'>
                    <div className='container-90 pt-5'>
                        <div className='row m-0'>
                            <div className='col-6'>
                                <span className='history-head'>Order Book History</span>
                            </div>
                            {/* <div className='col-6 text-end'>
                                <span className="dropdown me-2 filter-option">
                                    <button className="btn dropdown-toggle border-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        {selectedFilter}
                                        <FontAwesomeIcon icon={faChevronDown} style={{ color: "#4D4D4D" }} className="ps-2" />
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><button className="dropdown-item" onClick={() => handleFilterChange('All')}>All</button></li>
                                        <li><button className="dropdown-item" onClick={() => handleFilterChange('Option 1')}>Option 1</button></li>
                                        <li><button className="dropdown-item" onClick={() => handleFilterChange('Option 2')}>Option 2</button></li>
                                    </ul>
                                </span>
                                <span className="dropdown me-2 filter-option">
                                    <button className="btn dropdown-toggle border-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        {selectedDate}
                                        <FontAwesomeIcon icon={faChevronDown} style={{ color: "#4D4D4D" }} className="ps-2" />
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><button className="dropdown-item" onClick={() => handleDateChange('Last 30 Days')}>Last 30 Days</button></li>
                                        <li><button className="dropdown-item" onClick={() => handleDateChange('Last 15 Days')}>Last 15 Days</button></li>
                                        <li><button className="dropdown-item" onClick={() => handleDateChange('Last 10 Days')}>Last 10 Days</button></li>
                                    </ul>
                                </span>
                            </div> */}
                        </div>
                        <div className='row m-0 py-3'>
                            <div className='col-3'>
                                <Useraside />
                            </div>
                            <div className='col-9 order-card'>
                                {singleBookHistory?.length > 0 ?
                                    <>
                                        <div className='row m-0'>
                                            {singleBookHistory && allbookDetails && singleBookHistory
                                                .filter(data => data.items.some(item => allbookDetails.some(cate => cate.id === item.book_id)))
                                                .map((data, index) => (
                                                    <>
                                                        {data.items.map((item, itemIndex) => {
                                                            const matchingBook = allbookDetails.find(cate => cate.id === item.book_id);
                                                            return (
                                                                <>
                                                                    <div className='col-2 py-5'>
                                                                        <img src={matchingBook.image} alt={matchingBook.title_long.slice(0, 10)} className='w-100' />
                                                                    </div>
                                                                    <div className='col-2 py-5'>
                                                                        <h5>Product</h5>
                                                                        <h3>{matchingBook.title_long.slice(0, 10)}</h3>
                                                                        <h5>Quantity</h5>
                                                                        <h4>{item.qty}</h4> {/* Use item.qty instead of data.qty */}
                                                                    </div>
                                                                    <div className='col-3 py-5'>
                                                                        <h5>Total</h5>
                                                                        <h3>{item.final_amount}</h3> {/* Use item.final_amount instead of data.final_amount */}
                                                                        <h5>DATE</h5>
                                                                        <h4>{formatDate(data.created_at)}</h4>
                                                                    </div>
                                                                    <div className='col-3 py-5'>
                                                                        <h5>To</h5>
                                                                        <h3>{data.billing_address}</h3>
                                                                        <h5>STATUS</h5>
                                                                        <h4 className='finish'>{item.status}</h4>
                                                                    </div>
                                                                    <div className='col-2 d-flex align-items-center'>
                                                                        <Button variant="success" onClick={() => handleShows(matchingBook)}>
                                                                            Write Reviews
                                                                        </Button>
                                                                    </div>
                                                                    <hr />
                                                                </>
                                                            );
                                                        })}
                                                    </>
                                                ))}

                                        </div>
                                    </>
                                    :
                                    <>
                                        <h1 className='text-center pt-2'>No Order History</h1>
                                    </>
                                }

                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-lg-none d-md-block d-sm-none d-none'>
                    <Useraside />
                    <div className='container-90'>
                        <div className='row m-0 pt-5'>
                            <div className='col-6'>
                                <span className='history-head'>Order Historys</span>
                            </div>
                        </div>
                        {singleBookHistory?.length > 0 ?
                            <>
                                <div className='row m-0 py-3 order-card'>
                                    {singleBookHistory && allbookDetails && singleBookHistory
                                        .filter(data => data.items.some(item => allbookDetails.some(cate => cate.id === item.book_id)))
                                        .map((data, index) => (
                                            <>
                                                {data.items.map((item, itemIndex) => {
                                                    const matchingBook = allbookDetails.find(cate => cate.id === item.book_id);
                                                    return (
                                                        <>
                                                            <div className='col-md-2 col-sm-4 col-6 py-5'>
                                                                <img src={matchingBook.image} alt={matchingBook.title_long.slice(0, 10)} className='w-100' />
                                                            </div>
                                                            <div className='col-md-2 col-sm-4 col-6 py-5'>
                                                                <h5>Product</h5>
                                                                <h3>{matchingBook.title_long.slice(0, 10)}</h3>
                                                                <h5>quantity</h5>
                                                                <h4>{item.qty}</h4>
                                                            </div>
                                                            <div className='col-3 py-5'>
                                                                <h5>total</h5>
                                                                <h3>{data.final_amount}</h3>
                                                                <h5>DATE</h5>
                                                                <h4>{formatDate(data.created_at)}</h4>
                                                            </div>
                                                            <div className='col-3 py-5'>
                                                                <h5>To</h5>
                                                                <h3>{data.billing_address}</h3>
                                                                <h5>STATUS</h5>
                                                                <h4 className='finish'>{item.status}</h4>
                                                            </div>
                                                            <div className='col-2 d-flex align-items-center'>
                                                                <Button variant="success" onClick={() => handleShows(matchingBook)}>
                                                                    Write Review
                                                                </Button>
                                                            </div>
                                                            <hr />
                                                        </>
                                                    );
                                                })}
                                            </>
                                        ))}
                                </div>
                            </>
                            :
                            <>
                                <>
                                    <h1 className='text-center pt-2'>No Order History</h1>
                                </>
                            </>
                        }
                    </div>
                </div>
                <div className='d-lg-none d-md-none d-sm-block d-none   '>
                    <Useraside />
                    <div className='container-90'>
                        <div className='row m-0 pt-5'>
                            <div className='col-6'>
                                <span className='history-head'>Order History</span>
                            </div>
                        </div>
                        <div className='row m-0 py-3 order-card'>
                            {singleBookHistory?.length > 0 ? (
                                <>
                                    {singleBookHistory && allbookDetails && singleBookHistory
                                        .filter(data => data.items.some(item => allbookDetails.some(cate => cate.id === item.book_id)))
                                        .map((data, index) => (
                                            <div key={index} className='row m-0'>
                                                {data.items.map((item, itemIndex) => {
                                                    const matchingBook = allbookDetails.find(cate => cate.id === item.book_id);
                                                    return (
                                                        < >
                                                            <div className='col-sm-4 col-6 pt-5'>
                                                                <img src={matchingBook.image} alt={matchingBook.title_long.slice(0, 10)} className='w-100' />
                                                                <div className='text-center my-2'>
                                                                    <Button variant="success" onClick={() => handleShows(matchingBook)}>
                                                                        Write Review
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                            <div className='col-sm-4 col-6 py-5'>
                                                                <h5>Product</h5>
                                                                <h3>{matchingBook.title_long.slice(0, 10)}</h3>
                                                                <h5>Quantity</h5>
                                                                <h4>{item.qty}</h4>
                                                                <h5>Total</h5>
                                                                <h3>{data.final_amount}</h3>
                                                            </div>
                                                            <div className='col-md-4 col-sm-4 col-6 py-5'>
                                                                <h5>To</h5>
                                                                <h3>{data.billing_address}</h3>
                                                                <h5>STATUS</h5>
                                                                <h4 className='finish'>{item.status}</h4>
                                                                <h5>data</h5>
                                                                <h4 className='finish'>{formatDate(data.created_at)}</h4>
                                                            </div>
                                                            <hr className='my-2' />
                                                        </>
                                                    );
                                                })}
                                            </div>
                                        ))}
                                </>
                            ) : (
                                <h1 className='text-center pt-2'>No Order History</h1>
                            )}

                        </div>
                    </div>
                </div>
                <div className='d-lg-none d-md-none d-sm-none d-block '>
                    <Useraside />
                    <div className='container-90'>
                        <div className='row m-0 pt-5'>
                            <div className='col-12 mb-3'>
                                <span className='history-head'>Order History</span>
                            </div>
                        </div>
                        {singleBookHistory?.length > 0 ? (
                            <>
                                {singleBookHistory &&
                                    allbookDetails &&
                                    singleBookHistory
                                        .filter(data =>
                                            data.items.some(item =>
                                                allbookDetails.some(cate => cate.id === item.book_id)
                                            )
                                        )
                                        .map((data, index) => (
                                            <div key={index} className='row m-0'>
                                                {data.items.map((item, itemIndex) => {
                                                    const matchingBook = allbookDetails.find(
                                                        cate => cate.id === item.book_id
                                                    );
                                                    return (
                                                        <div key={itemIndex} className='container table-responsive my-2 order-card'>
                                                            <div className='text-center pt-2'>
                                                                <img
                                                                    src={matchingBook.image}
                                                                    alt={matchingBook.title_long.slice(0, 10)}
                                                                    className='w-50'
                                                                />
                                                                <div className='text-center my-2'>
                                                                    <Button variant='success' onClick={() => handleShows(matchingBook)}>
                                                                        Write Review
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                            <table className='table table-bordered table-hover'>
                                                                <tbody>
                                                                    <tr>
                                                                        <td><h3>Product</h3></td>
                                                                        <td><h3>{matchingBook.title_long.slice(0, 10)}</h3></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><h3>quantity</h3></td>
                                                                        <td><h3>{item.qty}</h3></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><h3>total</h3></td>
                                                                        <td><h3>{data.final_amount}</h3></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><h3>To</h3></td>
                                                                        <td><h3>{data.billing_address}</h3></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><h3>ORDER DATE</h3></td>
                                                                        <td>{formatDate(data.created_at)}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><h3>STATUS</h3></td>
                                                                        <td><h4 className={statuslevel ? 'finish' : 'drop'}>{item.status}</h4></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ))}
                            </>
                        ) : (
                            <h1 className='text-center pt-2'>No Order History</h1>
                        )}


                    </div>
                </div>
            </div>

            <Footer />
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Review Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={() => handleSubmit(reviewDetails)}>
                        <Form.Group controlId="formName" className='mt-3'>
                            <Form.Control type="hidden" placeholder="Enter your rating" value={reviewDetails.book_id} />
                        </Form.Group>
                        <Form.Group controlId="formName" className='mt-3'>
                            <Form.Label>Rating</Form.Label>
                            <Form.Control type="text" placeholder="Enter your rating" onChange={(e) => dispatch(setReviewDetails({ ...reviewDetails, rating: e.target.value }))} />
                        </Form.Group>
                        <Form.Group controlId="formEmail" className="mt-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Enter your text" onChange={(e) => dispatch(setReviewDetails({ ...reviewDetails, review: e.target.value }))} />
                        </Form.Group>

                        {/* Add more form fields as needed */}
                        {reviewDetails ?
                            <>
                                <Button variant="warning" type="button" className='mt-3' onClick={() => reviewUpdate(reviewDetails)}>
                                    Update Review
                                </Button>
                            </>
                            :
                            <>
                                <Button variant="warning" type="button" className='mt-3' onClick={() => reviewUpdate()}>
                                    Update Review
                                </Button>
                            </>
                        }

                    </Form>
                </Modal.Body>
            </Modal>
        </div >

    )
}

export default Historybook