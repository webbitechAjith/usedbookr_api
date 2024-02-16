import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JavaScript

import '../assets/css/regular.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChevronDown, faHeart, faBagShopping, faXmark, faUser, faShop, faPlus, faMinus, faSignIn, faSignOut, faUserAlt } from '@fortawesome/free-solid-svg-icons';

import { NavLink, useNavigate, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


// image path
import headphone from '../assets/image/Headset.png'
import locations from '../assets/image/location.png'
// import logo from '../assets/image/logo.png'
import logo from '../assets/image/usedbookr-logo.svg'
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

import { setClass1Hide, setallBookDetails, setnavListDetails, setsearchItemDetails, setsearchProduct, setsearchfield } from '../../Redux/CreateSlice'
import axios from 'axios';
import { allbooks } from './apiBaseurl';


function Header() {
    const { isClass1Show, likescount, shopcount, searchProduct, allbookDetails, searchItemDetails, searchResults, searchfield, navListDetails } = useSelector((state) => state.usedbookr_product)
    const [searchTerm, setSearchTerm] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isUserexpanded, setIsUserexpanded] = useState(false);
    const [isSearchexpanded, setIsSearchexpanded] = useState(false);
    const [isChildrenVisible, setIsChildrenVisible] = useState(false);
    const [isEducationVisible, setIsEducationVisible] = useState(false);
    const [isPoliticalVisible, setIspoliticalVisible] = useState(false);
    const [isMagazinesVisible, setIsmagazinesVisible] = useState(false);
    const [products, setProducts] = useState(allbookDetails);
    const [isSticky, setIsSticky] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const { pathname, search, hash } = location;
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    const dropdownAnimation = useSpring({
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'translateY(0)' : 'translateY(-10px)',
        display: isOpen ? 'block' : 'none',
    });

    const hearts = () => {
        navigate('/Wishlist')
    }
    const shops = () => {
        navigate('/Purchase')
    }
    const userProfile = () => {
        navigate('/Profile')
    }
    const signup = () => {
        navigate('/Register')
    }
    const signin = () =>{
        navigate('/Login')
    }
    const navButton = () => {
        // dispatch(setClass1Hide(true))
    }

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    const toggleDropdown = () => {
        setIsExpanded(!isExpanded);
    };
    const userToggleDropDown = () => {
        setIsUserexpanded(!isUserexpanded)
    };
    const searchToggleDropDown = () => {
        setIsSearchexpanded(!isSearchexpanded)
    }
    
    const toggleChildren = () => {
        setIsChildrenVisible(!isChildrenVisible);
    };

    const toggleEducation = () => {
        setIsEducationVisible(!isEducationVisible);
    };
    const togglePolitical = () => {
        setIspoliticalVisible(!isPoliticalVisible);
    };

    const toggleMagazines = () => {
        setIsmagazinesVisible(!isMagazinesVisible);
    };

    const handleChange = async (event) => {
        const newSearchItem = event.target.value;

        // First, update the searchProduct state
        // dispatch(setsearchProduct({ ...searchProduct, searchItem: newSearchItem }));
        dispatch(setsearchProduct(newSearchItem))
        try {
            const allbookSearch = await allbooks();

            // Access the updated searchItem from the state
            const searchResults = allbookSearch.filter((book) =>
                book.title.toLowerCase().includes(newSearchItem) || (book.msrp >= 0 && book.msrp <= parseFloat(newSearchItem))
            );
            console.log("searchResults", searchResults)
            if (newSearchItem === '') {
                dispatch(setallBookDetails(searchResults));
                dispatch(setsearchfield(true))
            } else if (searchResults.length === 0) {
                dispatch(setsearchfield(false))

            } else {
                dispatch(setallBookDetails(searchResults));
                dispatch(setsearchfield(true))

            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const navlist = async () => {
        // const { data } = await axios.get("https://webbitech.co.in/ecommerce/public/api/mainMenu")
        // dispatch(setnavListDetails(data.data))
    }
    const handleNavLinkClick = () => {
        // Replace the current URL with the new path
        // window.location.reload();
        navigate('/categorybook');
        setIsExpanded(!isExpanded);
    };
    useEffect(() => {
        dispatch(setallBookDetails(allbookDetails))
        dispatch(setsearchProduct(searchProduct))
        navlist()
        // dispatch(setClass1Hide(true))
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
                                <div className='col-lg-6 col-md-6 d-lg-block d-md-block d-none'>
                                    <img src={logo} width={130} />
                                </div>
                                <div className='col-lg-6 col-md-6 col-5 d-flex align-items-center justify-content-end icon-section'>
                                    <div className='d-lg-block d-md-block d-none'>
                                        <span className='position-relative'>
                                            <img src={heart} alt='heart' width={30} className='view-all' onClick={() => hearts()} title={likescount} />
                                            {likescount >= 9 ? <><span className='like-count' title={likescount}>9<sup>+</sup></span></> : <><span className='like-count'>{likescount}</span></>}
                                        </span>
                                        <span className='position-relative'>
                                            <img src={shop} width={30} alt='shop' className='mx-3 view-all' onClick={() => shops()} />
                                            {shopcount >= 9 ? <><span className='item-count' title={shopcount}>9<sup>+</sup></span></> : <><span className='item-count'>{shopcount}</span></>}
                                        </span>
                                        <span>
                                            <button className='authregister' onClick={signup}>Sign in/sign up</button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-lg-none d-md-none d-block'>
                    <div className='text-center bg-white py-3'>
                        <img src={logo} width={130} />
                    </div>
                </div>
                <div className='nav-section'>
                    <nav className="navbar navbar-expand-lg container-90">
                        <div className="container-fluid p-0">
                            <a className="navbar-brand d-none" href="#"><img src={mobilelogo} /></a>
                            <div className='d-lg-block d-none'>
                                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className=""><img src={whitenav} /></span>
                                </button>
                            </div>
                            {/* nav section  */}
                            <div className='d-lg-none d-md-block d-none w-100'>
                                <div className='row m-0 w-100'>
                                    <div className='col-4'>
                                        <button className="btn" type="button" onClick={toggleMenu}>
                                            <span className=""><img src={whitenav} /></span>
                                        </button>
                                    </div>
                                    <div className='col-8 text-end'>
                                        <div className="input-group">
                                            <input type="text" className="form-control " placeholder="Search our books" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={(val) => { dispatch(setsearchProduct({ searchItem: val.target.value })); handleChange(val) }} />
                                            <span className="input-group-text search-btn" id="basic-addon2">Search</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* navlist section list  */}
                            <div className='d-lg-none d-md-block d-none w-100'>
                                <div className="collapse navbar-collapse nav-list" id="navbarNavDropdown">
                                    <div className={`offcanvas offcanvas-start ${showMenu ? 'show overflow-auto' : ''}`} tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                                        <div className="offcanvas-header">
                                            <img src={logo} width={130} />
                                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" onClick={toggleMenu}></button>
                                        </div>
                                        <div className="offcanvas-body position-sticky">
                                            <ul className="navbar-nav py-2 nav-content">
                                                <li className='nav-item d-flex align-items-center'>
                                                    <NavLink exact to={{ pathname: '/' }} className={`${pathname === '/' ? 'active' : 'custom-active'} text-decoration-none`}>
                                                        Home
                                                    </NavLink>
                                                </li>
                                                <li className='d-flex align-items-center'>
                                                    <NavLink exact to="/about" className={`${pathname === '/about' ? 'active' : 'custom-active'} text-decoration-none`}>
                                                        About Us
                                                    </NavLink>
                                                </li>
                                                <li className="nav-item dropdown mega-menu-li">
                                                    <a className="nav-link dropdown-toggle option-list" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded={isExpanded} onClick={toggleDropdown}>
                                                        SHOP BOOK {isExpanded ? <><FontAwesomeIcon icon={faMinus} style={{ color: "#000", }} className='ps-2' /></> : <><FontAwesomeIcon icon={faPlus} style={{ color: "#000", }} className='ps-2' /></>}
                                                    </a>
                                                    <div class={`dropdown-menu drop-width w-100 ${isExpanded ? 'show' : ''}`} aria-labelledby="dropdownMenuLink">
                                                        <div class="container-fluid">
                                                            <div class="row m-0">
                                                                <div class="col-md-12  mb-3 mb-lg-0">
                                                                    <div class="list-group list-group-flush">
                                                                        <h5 onClick={toggleChildren}>Children {isChildrenVisible ? <><FontAwesomeIcon icon={faMinus} /></> : <><FontAwesomeIcon icon={faPlus} /></>}</h5>
                                                                        {isChildrenVisible &&
                                                                            <>
                                                                                <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                                    Children1
                                                                                </a>
                                                                                <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                                    Children2
                                                                                </a>
                                                                                <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                                    Children3
                                                                                </a>
                                                                                <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                                    Children4
                                                                                </a>
                                                                            </>
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-12  mb-3 mb-lg-0">
                                                                    <div class="list-group list-group-flush">
                                                                        <h5 onClick={toggleEducation}>Education <FontAwesomeIcon icon={faPlus} /></h5>
                                                                        {isEducationVisible &&
                                                                            <>
                                                                                <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>Education1</a>
                                                                                <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>Education2</a>
                                                                                <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>Education3</a>
                                                                                <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>Education4</a>
                                                                            </>
                                                                        }

                                                                    </div>
                                                                </div>
                                                                <div class="col-md-12 mb-3 mb-lg-0">
                                                                    <div class="list-group list-group-flush">
                                                                        <h5 onClick={togglePolitical}>Political <FontAwesomeIcon icon={faPlus} /></h5>
                                                                        {isPoliticalVisible &&
                                                                            <>
                                                                                <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                                    Political1
                                                                                </a>
                                                                                <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                                    Political2
                                                                                </a>
                                                                                <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                                    Political3
                                                                                </a>
                                                                                <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                                    Political4
                                                                                </a>
                                                                            </>
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-12 mb-3 mb-lg-0">
                                                                    <div class="list-group list-group-flush">
                                                                        <h5 onClick={toggleMagazines}>Magazines <FontAwesomeIcon icon={faPlus} /></h5>
                                                                        {isMagazinesVisible &&
                                                                            <>
                                                                                <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                                    Magazines1
                                                                                </a>
                                                                                <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                                    Magazines2
                                                                                </a>
                                                                                <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                                    Magazines3
                                                                                </a>
                                                                                <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                                    Magazines4
                                                                                </a>
                                                                            </>
                                                                        }
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li className='d-flex align-items-center'>
                                                    <NavLink exact to="/aaa" className={`${pathname === '/aaa' ? 'active' : 'custom-active'} text-decoration-none`}>
                                                        New Arrivals
                                                    </NavLink>
                                                </li>
                                                <li className='d-flex align-items-center'>
                                                    <NavLink exact to="/contact" className={`${pathname === '/contact' ? 'active' : 'custom-active'} text-decoration-none`}>
                                                        Contact Us
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='d-lg-none d-md-none d-block w-100'>
                                <div className='row m-0'>
                                    <div className='col-2 p-0'>
                                        <button className="btn" type="button" onClick={toggleMenu}>
                                            <span className=""><img src={whitenav} /></span>
                                        </button>
                                    </div>
                                    <div className='col-10 p-0'>
                                        <div className='icon-section d-lg-none d-md-none space-item align-items-end'>
                                            <span className='position-relative'>
                                                <FontAwesomeIcon icon={faHeart} className='mx-3 view-all' style={{ color: '#FFF', fontSize: '30px', paddingTop: '10px' }} onClick={() => hearts()} />
                                                {likescount >= 9 ? <><span className='like-count' title={likescount}>9<sup>+</sup></span></> : <><span className='like-count'>{likescount}</span></>}
                                            </span>
                                            <span className='position-relative'>
                                                <FontAwesomeIcon icon={faBagShopping} className='mx-3 view-all' onClick={() => shops()} style={{ color: '#FFF', fontSize: '30px', paddingTop: '10px' }} />
                                                <span className='item-count'>{shopcount}</span>
                                            </span>
                                            {/* <span className='position-relative'>
                                                <FontAwesomeIcon icon={faUser} className='mx-3 mobile-margin' style={{ color: '#FFF', fontSize: '30px', paddingTop: '10px' }} onClick={() => userProfile()} />
                                            </span> */}
                                            {/* <span className='position-relative'>
                                                <FontAwesomeIcon icon={faSearch} className='mx-3 mobile-margin' style={{ color: '#FFF', fontSize: '30px', paddingTop: '10px' }} />
                                            </span> */}
                                            <span className='dropdown user-profiles'>
                                                <FontAwesomeIcon icon={faSearch} className='mx-3 mobile-margin' style={{ color: '#FFF', fontSize: '30px', paddingTop: '10px' }} onClick={searchToggleDropDown}/>
                                                <ul className={`dropdown-menu w-100 ${isSearchexpanded ? 'show' : ''}`} aria-labelledby="dropdownMenuButton1">
                                                    <li className='search-fixed'>
                                                        <div className="input-group">
                                                            <input type="text" className="form-control " placeholder="Search our shop" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={(val) => { dispatch(setsearchProduct({ ...searchProduct, searchItem: val.target.value })); handleChange(val) }} />
                                                            <span className="input-group-text search-btn" id="basic-addon2">Search</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </span>
                                            <span className='dropdown user-profiles'>
                                                <FontAwesomeIcon icon={faUser} className='mx-3 mobile-margin' style={{ color: '#FFF', fontSize: '30px',paddingTop: '10px' }} onClick={userToggleDropDown} />
                                                <ul className={`dropdown-menu ${isUserexpanded ? 'show' : ''}`} aria-labelledby="dropdownMenuButton1">
                                                    <li onClick={signin}><a className="dropdown-item" href="#"><FontAwesomeIcon icon={faSignOut} className='pe-2'/>Sign In</a></li>
                                                    <li onClick={signup}><a className="dropdown-item" href="#"><FontAwesomeIcon icon={faSignIn} className='pe-2'/>Sign Up</a></li>
                                                    <li onClick={userProfile}><a className="dropdown-item" href="#"><FontAwesomeIcon icon={faUserAlt} className='pe-2'/>Profile</a></li>
                                                </ul>
                                            </span>
                                            {/* <span className='position-relative'>
                                                <button className='mobile-register'>Sign in/sign up</button>
                                            </span> */}

                                        </div>
                                    </div>
                                    <div className="collapse navbar-collapse nav-list" id="navbarNavDropdown">
                                        <div className={`offcanvas offcanvas-start ${showMenu ? 'show' : ''}`} tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                                            <div className="offcanvas-header">
                                                <img src={logo} width={130} />
                                                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" onClick={toggleMenu}></button>
                                            </div>
                                            <div className="offcanvas-body">
                                                <ul className="navbar-nav py-2 nav-content">
                                                    <li className='nav-item d-flex align-items-center'>
                                                        <NavLink exact to={{ pathname: '/' }} className={`${pathname === '/' ? 'active' : 'custom-active'} text-decoration-none`}>
                                                            Home
                                                        </NavLink>
                                                    </li>
                                                    <li className='d-flex align-items-center'>
                                                        <NavLink exact to="/about" className={`${pathname === '/about' ? 'active' : 'custom-active'} text-decoration-none`}>
                                                            About Us
                                                        </NavLink>
                                                    </li>
                                                    <li className="nav-item dropdown mega-menu-li">
                                                        <a className="nav-link dropdown-toggle option-list" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded={isExpanded} onClick={toggleDropdown}>
                                                            SHOP BOOK {isExpanded ? <><FontAwesomeIcon icon={faMinus} style={{ color: "#000", }} className='ps-2' /></> : <><FontAwesomeIcon icon={faPlus} style={{ color: "#000", }} className='ps-2' /></>}
                                                        </a>
                                                        <div class={`dropdown-menu drop-width w-100 ${isExpanded ? 'show' : ''}`} aria-labelledby="dropdownMenuLink">
                                                            <div class="container-fluid">
                                                                <div class="row m-0">
                                                                    <div class="col-md-12  mb-3 mb-lg-0">
                                                                        <div class="list-group list-group-flush">
                                                                            <h5 onClick={toggleChildren}>Children {isChildrenVisible ? <><FontAwesomeIcon icon={faMinus} /></> : <><FontAwesomeIcon icon={faPlus} /></>}</h5>
                                                                            {isChildrenVisible &&
                                                                                <>
                                                                                    <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                                        Children1
                                                                                    </a>
                                                                                    <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                                        Children2
                                                                                    </a>
                                                                                    <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                                        Children3
                                                                                    </a>
                                                                                    <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                                        Children4
                                                                                    </a>
                                                                                </>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-12  mb-3 mb-lg-0">
                                                                        <div class="list-group list-group-flush">
                                                                            <h5 onClick={toggleEducation}>Education <FontAwesomeIcon icon={faPlus} /></h5>
                                                                            {isEducationVisible &&
                                                                                <>
                                                                                    <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>Education1</a>
                                                                                    <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>Education2</a>
                                                                                    <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>Education3</a>
                                                                                    <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>Education4</a>
                                                                                </>
                                                                            }

                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-12 mb-3 mb-lg-0">
                                                                        <div class="list-group list-group-flush">
                                                                            <h5 onClick={togglePolitical}>Political <FontAwesomeIcon icon={faPlus} /></h5>
                                                                            {isPoliticalVisible &&
                                                                                <>
                                                                                    <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                                        Political1
                                                                                    </a>
                                                                                    <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                                        Political2
                                                                                    </a>
                                                                                    <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                                        Political3
                                                                                    </a>
                                                                                    <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                                        Political4
                                                                                    </a>
                                                                                </>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-12 mb-3 mb-lg-0">
                                                                        <div class="list-group list-group-flush">
                                                                            <h5 onClick={toggleMagazines}>Magazines <FontAwesomeIcon icon={faPlus} /></h5>
                                                                            {isMagazinesVisible &&
                                                                                <>
                                                                                    <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                                        Magazines1
                                                                                    </a>
                                                                                    <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                                        Magazines2
                                                                                    </a>
                                                                                    <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                                        Magazines3
                                                                                    </a>
                                                                                    <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                                        Magazines4
                                                                                    </a>
                                                                                </>
                                                                            }
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>

                                                    <li className='d-flex align-items-center'>
                                                        <NavLink exact to="/aaa" className={`${pathname === '/aaa' ? 'active' : 'custom-active'} text-decoration-none`}>
                                                            New Arrivals
                                                        </NavLink>
                                                    </li>
                                                    <li className='d-flex align-items-center'>
                                                        <NavLink exact to="/contact" className={`${pathname === '/contact' ? 'active' : 'custom-active'} text-decoration-none`}>
                                                            Contact Us
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="collapse navbar-collapse nav-list" id="navbarNavDropdown">
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
                                                    <NavLink exact to="/about" className={`${pathname === '/about' ? 'active' : 'custom-active'} text-decoration-none`}>
                                                        About Us
                                                    </NavLink>
                                                </li>
                                                <li className="nav-item dropdown mega-menu-li">
                                                    <a className="nav-link dropdown-toggle option-list" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded={isExpanded} onClick={toggleDropdown}>
                                                        SHOP BOOK<FontAwesomeIcon icon={faChevronDown} style={{ color: '#fafafa' }} className="ps-2" />
                                                    </a>
                                                    <div className={`dropdown-menu drop-width w-100 ${isExpanded ? 'show' : ''}`} aria-labelledby="dropdownMenuLink">
                                                        <div class="container-fluid">
                                                            <div class="row m-0">
                                                                <div class="col-lg-3 col-md-4  mb-3 mb-lg-0">
                                                                    <div class="list-group list-group-flush">
                                                                        <h5>Children</h5>
                                                                        <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                            Children1
                                                                        </a>
                                                                        <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                            Children2
                                                                        </a>
                                                                        <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                            Children3
                                                                        </a>
                                                                        <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                            Children4
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-3 col-md-4  mb-3 mb-lg-0">
                                                                    <div class="list-group list-group-flush">
                                                                        <h5>Education</h5>
                                                                        <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                            Education1
                                                                        </a>
                                                                        <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                            Education2
                                                                        </a>

                                                                        <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                            Education3
                                                                        </a>

                                                                        <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                            Education4
                                                                        </a>

                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-3 col-md-4 mb-3 mb-lg-0">
                                                                    <div class="list-group list-group-flush">
                                                                        <h5>Political</h5>
                                                                        <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                            Political1
                                                                        </a>
                                                                        <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                            Political2
                                                                        </a>
                                                                        <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                            Political3
                                                                        </a>
                                                                        <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                            Political4
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-3 col-md-4 mb-3 mb-lg-0">
                                                                    <div class="list-group list-group-flush">
                                                                        <h5>Magazines</h5>
                                                                        <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                            Magazines1
                                                                        </a>
                                                                        <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                            Magazines2
                                                                        </a>
                                                                        <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                            Magazines3
                                                                        </a>
                                                                        <a className='list-group-item text-decoration-none' onClick={handleNavLinkClick}>
                                                                            Magazines4
                                                                        </a>

                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li className='d-flex align-items-center'>
                                                    <NavLink exact to="/aaa" className={`${pathname === '/aaa' ? 'active' : 'custom-active'} text-decoration-none`}>
                                                        New Arrivals
                                                    </NavLink>
                                                </li>
                                                <li className='d-flex align-items-center'>
                                                    <NavLink exact to="/contact" className={`${pathname === '/contact' ? 'active' : 'custom-active'} text-decoration-none`}>
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