import React, { useState, useEffect } from 'react';

import '../assets/css/regular.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChevronDown, faHeart, faBagShopping, faXmark, faUser } from '@fortawesome/free-solid-svg-icons';

import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


// image path
import headphone from '../assets/image/Headset.png'
import locations from '../assets/image/location.png'
import logo from '../assets/image/logo.png'
import heart from '../assets/image/header1.png'
import shop from '../assets/image/header2.png'
import profile from '../assets/image/header3.png'
import mobilelogo from '../assets/image/mobilelogo.png'
import whiteheart from '../assets/image/white_Heart.png'
import whiteprofile from '../assets/image/white_user.png'
import whitesearch from '../assets/image/white_search.png'
import whiteshop from '../assets/image/white_shop.png'
import whitenav from '../assets/image/whitenav.png'
import heartShop from '../assets/image/heart-shop.png'

import { setClass1Hide, setallplantDetails, setnavListDetails, setsearchItemDetails, setsearchProduct, setsearchfield } from '../../Redux/CreateSlice'
import axios from 'axios';


function Header() {
    const { isClass1Show, likescount, shopcount, searchProduct, allplantsDetails, searchItemDetails, searchResults, searchfield, navListDetails } = useSelector((state) => state.usedbookr_product)
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState(allplantsDetails);
    const [isSticky, setIsSticky] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { pathname, search, hash } = location;

    const hearts = () => {
        navigate('/Wishlist')
    }
    const shops = () => {
        navigate('/Purchase')
    }
    const userProfile = () => {
        navigate('/Profile')
    }
    const navButton = () => {
        if (isClass1Show == false) {
            dispatch(setClass1Hide(true))
        } else {
            dispatch(setClass1Hide(false))
        }
    }
    const handleChange = async (event) => {
        const newSearchItem = event.target.value;

        // First, update the searchProduct state
        // dispatch(setsearchProduct({ ...searchProduct, searchItem: newSearchItem }));
        dispatch(setsearchProduct(newSearchItem))
        try {
            const { data } = await axios.get('https://webbitech.co.in/ecommerce/public/api/productlist');

            // Access the updated searchItem from the state
            const searchResults = data.data.filter((product) =>
                product.title.toLowerCase().includes(newSearchItem) ||
                (product.total_price >= 0 && product.total_price <= parseFloat(newSearchItem))
            );

            if (newSearchItem === '') {
                dispatch(setallplantDetails(data.data));
                dispatch(setsearchfield(true))
            } else if (searchResults.length === 0) {
                dispatch(setsearchfield(false))

            } else {
                dispatch(setallplantDetails(searchResults));
                dispatch(setsearchfield(true))

            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const navlist = async () => {
        const { data } = await axios.get("https://webbitech.co.in/ecommerce/public/api/mainMenu")
        dispatch(setnavListDetails(data.data))
    }
    useEffect(() => {
        dispatch(setallplantDetails(allplantsDetails))
        dispatch(setsearchProduct(searchProduct))
        navlist()
        const handleScroll = () => {
            if (window.scrollY >= 2) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    // useEffect(() => {

    // }, [])
    return (
        <>
            <div className='top-header'>
                <div className='container-90 d-lg-block d-none'>
                    <div className='row m-0 p-2'>
                        <div className='col-lg-6 col-md-12 col-12 text-start p-0'>
                            <h4><img src={locations} className='mx-2 p-0' />PO BOX:115786 - Al Warsan3, Dubai, UAE.</h4>
                        </div>
                        <div className='col-lg-6 col-md-12 col-12 p-0'>
                            <h4 className='text-lg-end text-center phone_number'><img src={headphone} className='mx-2' />+971 42872900</h4>
                        </div>
                    </div>
                </div>
            </div>
            <header className='position-sticky top-0 sticky-header'>
                <div className={isSticky ? 'sticky-element' : 'bottom-header py-lg-2 py-md-2 py-0'}>
                    <div className='container-90'>
                        <div className='d-lg-block d-md-block d-none'>
                            <div className='row m-0 p-2'>
                                {/* <div className='col-lg-4 col-md-5 col-6 text-start d-flex align-items-center'>
                                    <div className="input-group input-set">
                                        <span className="input-group-text border-0 bg-none bg-white" id="searchIcon">
                                            <FontAwesomeIcon icon={faSearch} />
                                        </span>
                                        <input type="text" className="form-control border-0" placeholder="Search our book" aria-label="Search" aria-describedby="searchButton" onChange={(val) => { dispatch(setsearchProduct({ ...searchProduct, searchItem: val.target.value })); handleChange(val) }} />
                                        <input type="text" className="form-control border-0" placeholder="Search our shop" aria-label="Search" aria-describedby="searchButton" onChange={handleChange} />
                                        <button className="btn btn-outline-secondary" type="button" id="searchButton" onClick={() => searchlist()}>search</button>
                                    </div>
                                </div> */}
                                <div className='col-lg-6 col-md-6 d-lg-block d-md-block d-none'>
                                    <img src={logo} />
                                </div>
                                <div className='col-lg-6 col-md-6 col-5 d-flex align-items-center justify-content-end icon-section'>
                                    <div className='d-lg-block d-md-block d-none'>
                                        <span className='position-relative'>
                                            <img src={heart} alt='heart' className='view-all' onClick={() => hearts()} />
                                            <span className='like-count'>{likescount}</span>
                                        </span>
                                        <span className='position-relative'>
                                            <img src={shop} alt='shop' className='mx-3 view-all' onClick={() => shops()} />
                                            <span className='item-count'>{shopcount}</span>
                                        </span>
                                        <span>
                                            <img src={profile} className='view-all' onClick={() => userProfile()} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='d-lg-none d-md-none d-block'>
                    <div className='text-center bg-white py-3'>
                        <img src={logo} className='w-50' />
                    </div>
                </div>
                <div className='nav-section'>
                    <nav className="navbar navbar-expand-lg container-90">
                        <div className="container-fluid p-0">
                            <a className="navbar-brand d-none" href="#"><img src={mobilelogo} /></a>
                            {/* <button className="navbar-toggler d-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button> */}
                            <div className='d-lg-block d-none'>
                                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className=""><img src={whitenav} /></span>
                                </button>
                            </div>
                            <div className='d-lg-none d-md-block d-none w-100'>
                                <div className='row m-0 w-100'>
                                    <div className='col-4'>
                                        {isClass1Show ?
                                            <>
                                                <button className="navbar-toggler close-btn" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation" onClick={() => navButton()}>
                                                    <FontAwesomeIcon icon={faXmark} style={{ fontSize: '30px', color: '#FFF' }} />
                                                </button>
                                            </>
                                            :
                                            <>
                                                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation" onClick={() => navButton()}>
                                                    <span className=""><img src={whitenav} /></span>
                                                </button>
                                            </>
                                        }

                                    </div>
                                    <div className='col-8 text-end'>
                                        <div className="input-group">
                                            <input type="text" className="form-control " placeholder="Search our shop" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={(val) => { dispatch(setsearchProduct({ ...searchProduct, searchItem: val.target.value })); handleChange(val) }} />
                                            <span className="input-group-text search-btn" id="basic-addon2">Search</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='d-lg-none d-md-none d-block w-100'>
                                <div className='row m-0'>
                                    <div className='col-2 p-0'>
                                        {isClass1Show ?
                                            <>
                                                <button className="navbar-toggler close-btn" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation" onClick={() => navButton()}>
                                                    <FontAwesomeIcon icon={faXmark} style={{ fontSize: '30px', color: '#FFF' }} />
                                                </button>
                                            </>
                                            :
                                            <>
                                                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation" onClick={() => navButton()}>
                                                    <span className=""><img src={whitenav} /></span>
                                                </button>
                                            </>
                                        }
                                    </div>
                                  
                                    <div className='col-10 p-0'>
                                        <div className='icon-section d-lg-none d-md-none space-item align-items-end'>
                                            <span className='position-relative'>
                                                <FontAwesomeIcon icon={faHeart} className='mx-3 view-all' style={{ color: '#FFF', fontSize: '30px', paddingTop: '10px' }} onClick={() => hearts()} />
                                                {/* <img src={whiteheart} width='50px' alt='heart' className='mx-3 mobile-margin' onClick={() => hearts()} /> */}
                                                <span className='like-count'>{likescount}</span>
                                            </span>
                                            <span className='position-relative'>
                                                <FontAwesomeIcon icon={faBagShopping} className='mx-3 view-all' onClick={() => shops()} style={{ color: '#FFF', fontSize: '30px', paddingTop: '10px' }} />
                                                {/* <img src={shop} alt='shop' className='mx-3 view-all' onClick={() => shops()} /> */}
                                                <span className='item-count'>{shopcount}</span>
                                            </span>
                                            <span className='position-relative'>
                                                <FontAwesomeIcon icon={faUser} className='mx-3 mobile-margin' style={{ color: '#FFF', fontSize: '30px', paddingTop: '10px' }} onClick={() => userProfile()} />
                                                {/* <img src={profile} className='view-all' onClick={() => userProfile()} /> */}
                                            </span>
                                            <span className='position-relative'>
                                                <FontAwesomeIcon icon={faSearch} className='mx-3 mobile-margin' style={{ color: '#FFF', fontSize: '30px', paddingTop: '10px' }} />
                                                {/* <img src={whitesearch} className='mx-3 mobile-margin' /> */}
                                            </span>
                                            {/* <span className='item-count'>{shopcount}</span>
                                            <span className='like-count'>{likescount}</span> */}
                                        </div>
                                    </div>
                                    
                                </div>

                            </div>

                            <div className="collapse navbar-collapse nav-list" id="navbarNavDropdown">
                                {/* <ul className="navbar-nav py-2 nav-content">
                                    {navListDetails && navListDetails.map((data, index) => {
                                        return (
                                            <li key={index}>
                                                <NavLink exact to={{ pathname: `/${data.name.toLowerCase()}`   }} className={`${pathname === `/${data.name.toLowerCase()}` ? 'active' : 'custom-active'} text-decoration-none`}>
                                                    {data.name}
                                                </NavLink>
                                            </li>
                                        )

                                    })}

                                </ul> */}
                                {isClass1Show ?
                                    <>
                                        <div className="sidebar">
                                            <div className={`${isClass1Show == true ? 'nav-show' : ''} collapse navbar-collapse navbarNav justify-content-center navlist`} id="navbarSupportedContent">
                                                <ul className="navbar-nav pb-3 nav-content">
                                                    <li className='mb-5 mt-2 text-center d-md-none d-sm-none d-block '><img src={mobilelogo} className='w-100' /></li>
                                                    <li className='nav-item d-flex align-items-center'>
                                                        <NavLink exact to={{ pathname: '/' }} className={`${pathname === '/' ? 'active' : 'custom-active'} text-decoration-none`}>
                                                            Home
                                                        </NavLink>
                                                    </li>
                                                    <li className='d-flex align-items-center'>
                                                        <NavLink exact to="/package" className={`${pathname === '/package' ? 'active' : 'custom-active'} text-decoration-none`}>
                                                            About Us
                                                        </NavLink>
                                                    </li>
                                                    <li className="nav-item dropdown mega-menu-li">
                                                        <a className="nav-link dropdown-toggle option-list" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                            SHOP BOOK
                                                            <FontAwesomeIcon icon={faChevronDown} style={{ color: "#fafafa", }} className='ps-2' />
                                                        </a>
                                                        <div class="dropdown-menu drop-width w-100" aria-labelledby="navbarDropdown">
                                                            <div class="container">
                                                                <div class="row my-4">
                                                                    <div class="col-md-6 col-lg-4 mb-3 mb-lg-0">
                                                                        <div class="list-group list-group-flush">
                                                                            <NavLink exact to="/package" className={`${pathname === '/package' ? 'active' : 'list-group-item list-group-item-action'} text-decoration-none`}>
                                                                                Children
                                                                            </NavLink>
                                                                            <NavLink exact to="/package" className={`${pathname === '/package' ? 'active' : 'list-group-item list-group-item-action'} text-decoration-none`}>
                                                                                Education
                                                                            </NavLink>
                                                                            <NavLink exact to="/package" className={`${pathname === '/package' ? 'active' : 'list-group-item list-group-item-action'} text-decoration-none`}>
                                                                                Political
                                                                            </NavLink>
                                                                            <NavLink exact to="/package" className={`${pathname === '/package' ? 'active' : 'list-group-item list-group-item-action'} text-decoration-none`}>
                                                                                Magazines
                                                                            </NavLink>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-6 col-lg-4 mb-3 mb-lg-0">
                                                                        <div class="list-group list-group-flush">
                                                                            <NavLink exact to="/package" className={`${pathname === '/package' ? 'active' : 'list-group-item list-group-item-action'} text-decoration-none`}>
                                                                                Children
                                                                            </NavLink>
                                                                            <NavLink exact to="/package" className={`${pathname === '/package' ? 'active' : 'list-group-item list-group-item-action'} text-decoration-none`}>
                                                                                Education
                                                                            </NavLink>
                                                                            <NavLink exact to="/package" className={`${pathname === '/package' ? 'active' : 'list-group-item list-group-item-action'} text-decoration-none`}>
                                                                                Political
                                                                            </NavLink>
                                                                            <NavLink exact to="/package" className={`${pathname === '/package' ? 'active' : 'list-group-item list-group-item-action'} text-decoration-none`}>
                                                                                Magazines
                                                                            </NavLink>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-6 col-lg-4 mb-3 mb-lg-0">
                                                                        <div class="list-group list-group-flush">
                                                                            <NavLink exact to="/package" className={`${pathname === '/package' ? 'active' : 'list-group-item list-group-item-action'} text-decoration-none`}>
                                                                                Children
                                                                            </NavLink>
                                                                            <NavLink exact to="/package" className={`${pathname === '/package' ? 'active' : 'list-group-item list-group-item-action'} text-decoration-none`}>
                                                                                Education
                                                                            </NavLink>
                                                                            <NavLink exact to="/package" className={`${pathname === '/package' ? 'active' : 'list-group-item list-group-item-action'} text-decoration-none`}>
                                                                                Political
                                                                            </NavLink>
                                                                            <NavLink exact to="/package" className={`${pathname === '/package' ? 'active' : 'list-group-item list-group-item-action'} text-decoration-none`}>
                                                                                Magazines
                                                                            </NavLink>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>

                                                    <li className='d-flex align-items-center'>
                                                        <NavLink exact to="/Description" className={`${pathname === '/Description' ? 'active' : 'custom-active'} text-decoration-none`}>
                                                            New Arrivals
                                                        </NavLink>
                                                    </li>
                                                    <li className='d-flex align-items-center'>
                                                        <NavLink exact to="/faq" className={`${pathname === '/faq' ? 'active' : 'custom-active'} text-decoration-none`}>
                                                            Contact Us
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                    </> :
                                    <>

                                    </>
                                }
                                <div className='w-100 d-lg-block d-none'>
                                    <div className='row m-0 w-100'>
                                        <div className='col-lg-8 align-self-center'>
                                            <ul className="navbar-nav py-2 nav-content">
                                                <li className='nav-item d-flex align-items-center'>
                                                    <NavLink exact to={{ pathname: '/' }} className={`${pathname === '/' ? 'active' : 'custom-active'} text-decoration-none`}>
                                                        Home
                                                    </NavLink>
                                                </li>
                                                <li className='d-flex align-items-center'>
                                                    <NavLink exact to="/package" className={`${pathname === '/package' ? 'active' : 'custom-active'} text-decoration-none`}>
                                                        About Us
                                                    </NavLink>
                                                </li>
                                                <li className="nav-item dropdown mega-menu-li">
                                                    <a className="nav-link dropdown-toggle option-list" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        SHOP BOOK
                                                        <FontAwesomeIcon icon={faChevronDown} style={{ color: "#fafafa", }} className='ps-2' />
                                                    </a>
                                                    <div class="dropdown-menu drop-width w-100" aria-labelledby="navbarDropdown">
                                                        <div class="container">
                                                            <div class="row my-4">
                                                                <div class="col-md-6 col-lg-4 mb-3 mb-lg-0">
                                                                    <div class="list-group list-group-flush">
                                                                        <NavLink exact to="/package" className={`${pathname === '/package' ? 'active' : 'list-group-item list-group-item-action'} text-decoration-none`}>
                                                                            Children
                                                                        </NavLink>
                                                                        <NavLink exact to="/package" className={`${pathname === '/package' ? 'active' : 'list-group-item list-group-item-action'} text-decoration-none`}>
                                                                            Education
                                                                        </NavLink>
                                                                        <NavLink exact to="/package" className={`${pathname === '/package' ? 'active' : 'list-group-item list-group-item-action'} text-decoration-none`}>
                                                                            Political
                                                                        </NavLink>
                                                                        <NavLink exact to="/package" className={`${pathname === '/package' ? 'active' : 'list-group-item list-group-item-action'} text-decoration-none`}>
                                                                            Magazines
                                                                        </NavLink>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6 col-lg-4 mb-3 mb-lg-0">
                                                                    <div class="list-group list-group-flush">
                                                                        <NavLink exact to="/package" className={`${pathname === '/package' ? 'active' : 'list-group-item list-group-item-action'} text-decoration-none`}>
                                                                            Children
                                                                        </NavLink>
                                                                        <NavLink exact to="/package" className={`${pathname === '/package' ? 'active' : 'list-group-item list-group-item-action'} text-decoration-none`}>
                                                                            Education
                                                                        </NavLink>
                                                                        <NavLink exact to="/package" className={`${pathname === '/package' ? 'active' : 'list-group-item list-group-item-action'} text-decoration-none`}>
                                                                            Political
                                                                        </NavLink>
                                                                        <NavLink exact to="/package" className={`${pathname === '/package' ? 'active' : 'list-group-item list-group-item-action'} text-decoration-none`}>
                                                                            Magazines
                                                                        </NavLink>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6 col-lg-4 mb-3 mb-lg-0">
                                                                    <div class="list-group list-group-flush">
                                                                        <NavLink exact to="/package" className={`${pathname === '/package' ? 'active' : 'list-group-item list-group-item-action'} text-decoration-none`}>
                                                                            Children
                                                                        </NavLink>
                                                                        <NavLink exact to="/package" className={`${pathname === '/package' ? 'active' : 'list-group-item list-group-item-action'} text-decoration-none`}>
                                                                            Education
                                                                        </NavLink>
                                                                        <NavLink exact to="/package" className={`${pathname === '/package' ? 'active' : 'list-group-item list-group-item-action'} text-decoration-none`}>
                                                                            Political
                                                                        </NavLink>
                                                                        <NavLink exact to="/package" className={`${pathname === '/package' ? 'active' : 'list-group-item list-group-item-action'} text-decoration-none`}>
                                                                            Magazines
                                                                        </NavLink>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li className='d-flex align-items-center'>
                                                    <NavLink exact to="/Description" className={`${pathname === '/Description' ? 'active' : 'custom-active'} text-decoration-none`}>
                                                        New Arrivals
                                                    </NavLink>
                                                </li>
                                                <li className='d-flex align-items-center'>
                                                    <NavLink exact to="/faq" className={`${pathname === '/faq' ? 'active' : 'custom-active'} text-decoration-none`}>
                                                        Contact Us
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className='col-lg-4 d-flex align-items-center text-end'>
                                            <div className="input-group">
                                                <input type="text" className="form-control " placeholder="Search our shop" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={(val) => { dispatch(setsearchProduct({ ...searchProduct, searchItem: val.target.value })); handleChange(val) }} />
                                                <span className="input-group-text search-btn" id="basic-addon2">Search</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Header