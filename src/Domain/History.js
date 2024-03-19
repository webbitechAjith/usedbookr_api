import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'; // Import Bootstrap components
import Header from '../Common/pages/Header'
import Footer from '../Common/pages/Footer'
import Useraside from '../Common/pages/Useraside'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChevronDown, faEye, faFileInvoice } from '@fortawesome/free-solid-svg-icons';

import '../Common/assets/css/profile.css'

// image path 
import plant1 from '../Common/assets/image/description4.png'
import { useDispatch, useSelector } from 'react-redux';
import { allbooks, bookHistory, orderHistory, reviewRating } from '../Common/pages/apiBaseurl';
import { setHistoryDetails, setIsInvoiceDetails, setReviewDetails, setSingleBookHistory, setallBookDetails } from '../Redux/CreateSlice';
import { useNavigate } from 'react-router-dom';


function History() {
    const { allbookDetails, historyDetails, reviewDetails, singleBookHistory, isInvoiceDetails } = useSelector((state) => state.usedbookr_product)
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [selectedDate, setSelectedDate] = useState('Last 30 Days')
    const [statuslevel, setStatusLevel] = useState(true);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalBooks = currentPage * productsPerPage > historyDetails?.length
        ? historyDetails?.length
        : currentPage * productsPerPage;

    const handleShows = (data) => {
        console.log(data)
        dispatch(setReviewDetails({ book_id: data.id, rating: '', review: '' }))
        setShow(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        handleClose(); // Close the modal after submission
    };
    const dispatch = useDispatch();


    const reviewUpdate = async (reviewDetails) => {
        const review = await reviewRating(reviewDetails)
        if (review.message) {
            alert("Review Successfully");
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
        const history = await orderHistory();
        dispatch(setHistoryDetails(history));
    }

    const viewHistory = async (book) => {
        try {
            const books = await bookHistory(book.id); // Assuming bookHistory is an asynchronous function
            console.log(1, books)
            dispatch(setSingleBookHistory(books));
            navigate(`/bookhistory/${book.id}`, { state: books });
        } catch (error) {
            console.error('Error fetching book history:', error);
            // Handle error if necessary
        }
    };
    const viewInvoice = async (book) => {
        try {
            const books = await bookHistory(book.id); // Assuming bookHistory is an asynchronous function
            dispatch(setIsInvoiceDetails(books));
            navigate(`/paymentinvoice/${book.id}`, { state: books });
        } catch (error) {
            console.error('Error fetching book history:', error);
            // Handle error if necessary
        }
    };
    useEffect(() => {
        orderDetails();
    }, []);
    return (
        <div>
            <Header />
            <div className='history-section'>
                <div className='d-lg-block d-none'>
                    <div className='container-90 pt-5'>
                        <div className='row m-0'>
                            <div className='col-12'>
                                <span className='history-head'>Order History</span>
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
                            <div className='col-lg-3 col-12'>
                                <Useraside />

                            </div>
                            <div className='col-lg-9 col-12 order-card'>
                                {historyDetails?.length > 0 ?
                                    <>
                                        <div class="over-auto">
                                            <table class="table table-bordered text-center">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Invoice_no</th>
                                                        <th scope="col">order_status</th>
                                                        <th scope="col">final_amount</th>
                                                        <th scope="col">payment_mode</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {historyDetails && historyDetails
                                                        .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
                                                        .map((book) => {
                                                            return (
                                                                <>
                                                                    <tr>
                                                                        <td>{book.invoice_no}</td>
                                                                        <td>{book.order_status}</td>
                                                                        <td>{book.final_amount}</td>
                                                                        <td>{book.payment_mode}</td>
                                                                        <td>
                                                                            <FontAwesomeIcon icon={faEye} style={{ color: '#241D60' }} className='mx-2' onClick={() => viewHistory(book)} />
                                                                            <FontAwesomeIcon icon={faFileInvoice} className='mx-2' onClick={() => viewInvoice(book)} />
                                                                        </td>
                                                                    </tr>
                                                                </>
                                                            )

                                                        })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <>
                                            <h1 className='text-center pt-2'>No Order History</h1>
                                        </>
                                    </>
                                }
                                <div className='row m-0 gy-2 total-books mt-3'>
                                    <div className='col-lg-6 col-12'>
                                        <p className=''>Total Books - {totalBooks}/{historyDetails?.length}</p>
                                    </div>
                                    <div className='col-lg-6 col-12'>
                                        <ul className="pagination mt-2 justify-content-end">
                                            {Array(Math.ceil(historyDetails.length / productsPerPage))
                                                .fill()
                                                .map((_, i) => (
                                                    <li
                                                        key={i}
                                                        className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                                                        onClick={() => handleClick(i + 1)}
                                                    >
                                                        <button className="page-link rounded">{i + 1}</button>
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-lg-none b-block'>
                    <div className=''>
                        <div className='row m-0'>
                            <div className='col-12 p-0'>
                                <Useraside />
                                {/* <span className='history-head'>Order History</span> */}
                            </div>

                        </div>
                        <div className='row m-0 py-3'>
                            <div className='col-lg-3 col-12'>
                                {/* <Useraside /> */}
                                <span className='history-head'>Order History</span>

                            </div>
                            <div className='col-lg-9 col-12 order-card'>
                                {historyDetails?.length > 0 ?
                                    <>
                                        <div class="over-auto">
                                            <table class="table table-bordered text-center">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Invoice_no</th>
                                                        <th scope="col">order_status</th>
                                                        <th scope="col">final_amount</th>
                                                        <th scope="col">payment_mode</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {historyDetails && historyDetails
                                                        .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
                                                        .map((book) => {
                                                            return (
                                                                <>
                                                                    <tr>
                                                                        <td>{book.invoice_no}</td>
                                                                        <td>{book.order_status}</td>
                                                                        <td>{book.final_amount}</td>
                                                                        <td>{book.payment_mode}</td>
                                                                        <td>
                                                                            <FontAwesomeIcon icon={faEye} style={{ color: '#241D60' }} className='mx-2' onClick={() => viewHistory(book)} />
                                                                            <FontAwesomeIcon icon={faFileInvoice} className='mx-2' onClick={() => viewInvoice(book)} />
                                                                        </td>
                                                                    </tr>
                                                                </>
                                                            )

                                                        })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <>
                                            <h1 className='text-center pt-2'>No Order History</h1>
                                        </>
                                    </>
                                }
                                <div className='row m-0 gy-2 total-books mt-3 align-item-center'>
                                    <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                                        <p className=''>Total Books - {totalBooks}/{historyDetails?.length}</p>
                                    </div>
                                    <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                                        <ul className="pagination mt-2 justify-content-center">
                                            {Array(Math.ceil(historyDetails.length / productsPerPage))
                                                .fill()
                                                .map((_, i) => (
                                                    <li
                                                        key={i}
                                                        className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                                                        onClick={() => handleClick(i + 1)}
                                                    >
                                                        <button className="page-link rounded">{i + 1}</button>
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
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

export default History