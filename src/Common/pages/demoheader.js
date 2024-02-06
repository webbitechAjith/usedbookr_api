import React from 'react'



import '../assets/css/regular.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faChevronDown } from '@fortawesome/free-solid-svg-icons';

// image path
import headphone from '../assets/image/Headset.png'
import location from '../assets/image/location.png'
import logo from '../assets/image/logo.png'
import shop from '../assets/image/header1.png'
import heart from '../assets/image/header2.png'
import profile from '../assets/image/header3.png'
import mobilelogo from '../assets/image/mobilelogo.png'

function Header() {
    return (
        <>
            <header>
                <div className='top-header'>
                    <div className='container-90 d-lg-block d-none'>
                        <div className='row m-0 p-2'>
                            <div className='col-lg-6 col-md-12 col-12 text-start p-0'>
                                <h4><img src={location} className='mx-2 p-0' />PO BOX:115786 - Al Warsan3, Dubai, UAE.</h4>
                            </div>
                            <div className='col-lg-6 col-md-12 col-12 p-0'>
                                <h4 className='text-lg-end text-center phone_number'><img src={headphone} className='mx-2' />+971 42872900</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bottom-header py-4'>
                    <div className='container-90'>
                        <div className='row m-0 p-2'>
                            <div className='col-lg-4 col-6 text-start d-flex align-items-center d-lg-block b-md-block d-none'>
                                <div className="input-group input-set">
                                    <span className="input-group-text border-0 bg-none bg-white" id="searchIcon">
                                        <FontAwesomeIcon icon={faSearch} />
                                    </span>
                                    <input type="text" className="form-control border-0" placeholder="Search our shop" aria-label="Search" aria-describedby="searchButton" />
                                    <button className="btn btn-outline-secondary" type="button" id="searchButton">search</button>
                                </div>
                            </div>
                            <div className='col-lg-5 text-center d-lg-block d-md-block d-none'>
                                <img src={logo} />
                            </div>
                            <div className='col-lg-3 col-6 d-flex align-items-center justify-content-end icon-section'>
                                <img src={heart} alt='heart' className='mx-3' />
                                <img src={shop} alt='shop' className='mx-3' />
                                <img src={profile} className='mx-3' />
                                <span className='item-count'>1</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='nav-section'>
                    <nav className="navbar navbar-expand-lg container-90">
                        <div className="container-fluid">
                            <a className="navbar-brand d-lg-none" href="#"><img src={mobilelogo} /></a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                <ul className="navbar-nav py-2 nav-content">
                                    <li class="nav-item">
                                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                                    </li>
                                    <li className="nav-item dropdown" aria-labelledby="dropdownMenuButton">
                                        <a className="nav-link dropdown-toggle option-list" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Indoor Plants
                                            <FontAwesomeIcon icon={faChevronDown} style={{color: "#fafafa",}} className='ps-2'/>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#">Action</a></li>
                                            <li><a className="dropdown-item" href="#">Another action</a></li>
                                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle option-list" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Outdoor Plants
                                            <FontAwesomeIcon icon={faChevronDown} style={{color: "#fafafa",}} className='ps-2'/>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#">Action</a></li>
                                            <li><a className="dropdown-item" href="#">Another action</a></li>
                                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle option-list" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Flower Pots / Planters
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#">Action</a></li>
                                            <li><a className="dropdown-item" href="#">Another action</a></li>
                                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle option-list" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Seeds & Grow Kits
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#">Action</a></li>
                                            <li><a className="dropdown-item" href="#">Another action</a></li>
                                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle option-list" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Planting Arrangements
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#">Action</a></li>
                                            <li><a className="dropdown-item" href="#">Another action</a></li>
                                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle option-list" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Planting Supplies
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#">Action</a></li>
                                            <li><a className="dropdown-item" href="#">Another action</a></li>
                                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Header