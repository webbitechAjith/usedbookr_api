import React, { useState } from 'react';
import Header from '../Common/pages/Header'
import Footer from '../Common/pages/Footer'
import Useraside from '../Common/pages/Useraside'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import '../Common/assets/css/profile.css'

// image path 
import plant1 from '../Common/assets/image/description4.png'


function History() {

    const [selectedFilter, setSelectedFilter] = useState('All');
    const [selectedDate, setSelectedDate] = useState('Last 30 Days')
    const [statuslevel, setStatusLevel] = useState(true)
    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
    };
    const handleDateChange = (filter) => {
        setSelectedDate(filter);
    };
    return (
        <div>
            <Header />
            <div className='history-section'>
                <div className='d-lg-block d-none'>
                    <div className='container-90 pt-5'>
                        <div className='row m-0'>
                            <div className='col-6'>
                                <span className='history-head'>Order History</span>
                            </div>
                            <div className='col-6 text-end'>
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
                            </div>
                        </div>
                        <div className='row m-0 py-3'>
                            <div className='col-3'>
                                <Useraside />
                            </div>
                            <div className='col-9 order-card'>
                                <div className='row m-0'>
                                    <div className='col-2 py-5'>
                                        <img src={plant1} alt='plant1' className='w-100' />
                                    </div>
                                    <div className='col-2 py-5'>
                                        <h5>Product</h5>
                                        <h3>Aglaonema</h3>
                                        <h5>quantity</h5>
                                        <h4>5 Nos</h4>
                                    </div>
                                    <div className='col-3 py-5'>
                                        <h5>total</h5>
                                        <h3>AED 74.95</h3>
                                        <h5>ORDER ID /DATE</h5>
                                        <h4>#56532 / 08 SEP 2023</h4>
                                    </div>
                                    <div className='col-3 py-5'>
                                        <h5>To</h5>
                                        <h3>Victoria Nowak</h3>
                                        <h5>STATUS</h5>
                                        <h4 className={statuslevel == true ? 'finish' : 'drop'}>Delivered</h4>
                                    </div>
                                    <div className='col-2 d-flex align-items-center'>
                                        <button>Write Review</button>
                                    </div>
                                    <hr />
                                    <div className='col-2  py-5'>
                                        <img src={plant1} alt='plant1' className='w-100' />
                                    </div>
                                    <div className='col-2 py-5'>
                                        <h5>Product</h5>
                                        <h3>Aglaonema</h3>
                                        <h5>quantity</h5>
                                        <h4>5 Nos</h4>
                                    </div>
                                    <div className='col-3 py-5'>
                                        <h5>total</h5>
                                        <h3>AED 74.95</h3>
                                        <h5>ORDER ID /DATE</h5>
                                        <h4>#56532 / 08 SEP 2023</h4>
                                    </div>
                                    <div className='col-3 py-5'>
                                        <h5>To</h5>
                                        <h3>Victoria Nowak</h3>
                                        <h5>STATUS</h5>
                                        <h4 className={statuslevel == false ? 'finish' : 'drop'}>Delivered</h4>
                                    </div>
                                    <div className='col-2 d-flex align-items-center'>
                                        <button>Write Review</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-md-block d-none'>
                    <Useraside />
                    <div className='container-90 pt-5'>
                        <div className='row m-0 pt-5'>
                            <div className='col-6'>
                                <span className='history-head'>Order History</span>
                            </div>
                            <div className='col-6 text-end'>
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
                            </div>
                        </div>
                        <div className='row m-0 py-3'>
                            <div className='col-12 order-card'>
                                <div className='row m-0'>
                                    <div className='col-md-3 col-sm-4 col-6 py-5'>
                                        <img src={plant1} alt='plant1' className='w-100' />
                                    </div>
                                    <div className='col-md-3 col-sm-4 col-6 py-5'>
                                        <h5>Product</h5>
                                        <h3>Aglaonema</h3>
                                        <h5>quantity</h5>
                                        <h4>5 Nos</h4>
                                    </div>
                                    <div className='col-md-3 col-sm-4 col-6 py-5'>
                                        <h5>total</h5>
                                        <h3>AED 74.95</h3>
                                        <h5>ORDER ID /DATE</h5>
                                        <h4>#56532 / 08 SEP 2023</h4>
                                    </div>
                                    <div className='col-md-3 col-sm-4 col-6 py-5'>
                                        <h5>To</h5>
                                        <h3>Victoria Nowak</h3>
                                        <h5>STATUS</h5>
                                        <h4 className={statuslevel == true ? 'finish' : 'drop'}>Delivered</h4>
                                        <button className='mt-2'>Write Review</button>
                                    </div>
                                    <hr />
                                    <div className='col-md-3 col-sm-4 col-6 py-5'>
                                        <img src={plant1} alt='plant1' className='w-100' />
                                    </div>
                                    <div className='col-md-3 col-sm-4 col-6 py-5'>
                                        <h5>Product</h5>
                                        <h3>Aglaonema</h3>
                                        <h5>quantity</h5>
                                        <h4>5 Nos</h4>
                                    </div>
                                    <div className='col-md-3 col-sm-4 col-6 py-5'>
                                        <h5>total</h5>
                                        <h3>AED 74.95</h3>
                                        <h5>ORDER ID /DATE</h5>
                                        <h4>#56532 / 08 SEP 2023</h4>
                                    </div>
                                    <div className='col-md-3 col-sm-4 col-6 py-5'>
                                        <h5>To</h5>
                                        <h3>Victoria Nowak</h3>
                                        <h5>STATUS</h5>
                                        <h4 className={statuslevel == true ? 'finish' : 'drop'}>Delivered</h4>
                                        <button className='mt-2'>Write Review</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-none d-sm-block'>
                    <Useraside />
                    <div className='container-90 pt-5'>
                        <div className='row m-0 pt-5'>
                            <div className='col-6'>
                                <span className='history-head'>Order History</span>
                            </div>
                            <div className='col-6 text-end'>
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
                            </div>
                        </div>
                        <div className='row m-0 py-3'>
                            <div className='col-12 order-card'>
                                <div className='row m-0'>
                                    <div className='col-sm-4 col-6 pt-5'>
                                        <img src={plant1} alt='plant1' className='w-100' />
                                        <div className='text-center mb-2'>
                                            <button className='mt-2'>Write Review</button>
                                        </div>
                                    </div>
                                    <div className='col-sm-4 col-6 py-5'>
                                        <h5>Product</h5>
                                        <h3>Aglaonema</h3>
                                        <h5>quantity</h5>
                                        <h3>5 Nos</h3>
                                        <h5>total</h5>
                                        <h3>AED 74.95</h3>
                                    </div>
                                    <div className='col-md-4 col-sm-4 col-6 py-5'>
                                        <h5>To</h5>
                                        <h3>Victoria Nowak</h3>
                                        <h5>ORDER ID /DATE</h5>
                                        <h3>#56532 / 08 SEP 2023</h3>
                                        <h5>STATUS</h5>
                                        <h4 className={statuslevel == true ? 'finish' : 'drop'}>Delivered</h4>
                                    </div>

                                    <hr />
                                    <div className='col-sm-4 col-6 pt-5'>
                                        <img src={plant1} alt='plant1' className='w-100' />
                                        <div className='text-center mb-2'>
                                            <button className='mt-2'>Write Review</button>
                                        </div>
                                    </div>
                                    <div className='col-sm-4 col-6 py-5'>
                                        <h5>Product</h5>
                                        <h3>Aglaonema</h3>
                                        <h5>quantity</h5>
                                        <h3>5 Nos</h3>
                                        <h5>total</h5>
                                        <h3>AED 74.95</h3>
                                    </div>
                                    <div className='col-md-4 col-sm-4 col-6 py-5'>
                                        <h5>To</h5>
                                        <h3>Victoria Nowak</h3>
                                        <h5>ORDER ID /DATE</h5>
                                        <h3>#56532 / 08 SEP 2023</h3>
                                        <h5>STATUS</h5>
                                        <h4 className={statuslevel == true ? 'finish' : 'drop'}>Delivered</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-lg-none d-md-none d-sm-none d-block '>
                    <Useraside />
                    <div className='container-90 pt-5'>
                        <div className='row m-0 pt-5'>
                            <div className='col-6'>
                                <span className='history-head'>Order History</span>
                            </div>
                            <div className='col-6 text-end'>
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
                            </div>
                        </div>
                        <div className='row m-0 py-3'>
                            <div className='col-12 order-card'>
                                <div className='row m-0'>
                                    <div className='col-12 pt-5'>
                                        <img src={plant1} alt='plant1' className='w-100' />
                                        <div className='text-center mb-2'>
                                            <button className='mt-2'>Write Review</button>
                                        </div>
                                    </div>
                                    <div className='col-12 p-0'>
                                        <div class="container table-responsive py-5">
                                            <table class="table table-bordered table-hover">
                                                <tbody>
                                                    <tr>
                                                        <td><h3>Product</h3></td>
                                                        <td><h3>Aglaonema</h3></td>
                                                    </tr>
                                                    <tr>
                                                        <td><h3>quantity</h3></td>
                                                        <td><h3>5 Nos</h3></td>
                                                    </tr>
                                                    <tr>
                                                        <td><h3>total</h3></td>
                                                        <td><h3>AED 74.95</h3></td>
                                                    </tr>
                                                    <tr>
                                                        <td><h3>To</h3></td>
                                                        <td><h3>Victoria Nowak</h3></td>
                                                    </tr>
                                                    <tr>
                                                        <td><h3>ORDER ID /DATE</h3></td>
                                                        <td><h3>#56532 / 08 SEP 2023</h3></td>
                                                    </tr>
                                                    <tr>
                                                        <td><h3>STATUS</h3></td>
                                                        <td><h4 className={statuslevel == true ? 'finish' : 'drop'}>Delivered</h4></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className='col-12 pt-5'>
                                        <img src={plant1} alt='plant1' className='w-100' />
                                        <div className='text-center mb-2'>
                                            <button className='mt-2'>Write Review</button>
                                        </div>
                                    </div>
                                    <div className='col-12 p-0'>
                                        <div class="container table-responsive py-5">
                                            <table class="table table-bordered table-hover">
                                                <tbody>
                                                    <tr>
                                                        <td><h3>Product</h3></td>
                                                        <td><h3>Aglaonema</h3></td>
                                                    </tr>
                                                    <tr>
                                                        <td><h3>quantity</h3></td>
                                                        <td><h3>5 Nos</h3></td>
                                                    </tr>
                                                    <tr>
                                                        <td><h3>total</h3></td>
                                                        <td><h3>AED 74.95</h3></td>
                                                    </tr>
                                                    <tr>
                                                        <td><h3>To</h3></td>
                                                        <td><h3>Victoria Nowak</h3></td>
                                                    </tr>
                                                    <tr>
                                                        <td><h3>ORDER ID /DATE</h3></td>
                                                        <td><h3>#56532 / 08 SEP 2023</h3></td>
                                                    </tr>
                                                    <tr>
                                                        <td><h3>STATUS</h3></td>
                                                        <td><h4 className={statuslevel == true ? 'finish' : 'drop'}>Delivered</h4></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
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

export default History