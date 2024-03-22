import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JavaScript
import Select from 'react-select';

import '../assets/css/regular.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChevronDown, faHeart, faBagShopping, faXmark, faUser, faShop, faPlus, faMinus, faSignIn, faSignOut, faUserAlt, faBars } from '@fortawesome/free-solid-svg-icons';

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

import { setCategoryBook, setClass1Hide, setMegaMenu, setUserIdLike, setUserIdShop, setUserLogin, setallBookDetails, setnavListDetails, setsearchItemDetails, setsearchProduct, setsearchfield, setshopcount } from '../../Redux/CreateSlice'
import axios from 'axios';
import { allbooks, cardToget_list, cardTolike_list, megamenu_list } from './apiBaseurl';


const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
];

function Header() {
    const { isClass1Show, likescount, megaMenu, registerToken, userIdShop, userIdLike, shopcount, searchProduct, allbookDetails, categoryBook, searchItemDetails, searchResults, searchfield, navListDetails } = useSelector((state) => state.usedbookr_product)
    const [searchTerm, setSearchTerm] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobileExpanded, setIsMobileExpanded] = useState(false);
    const [isUserexpanded, setIsUserexpanded] = useState(false);
    const [isSearchexpanded, setIsSearchexpanded] = useState(false);
    const [visibleCategories, setVisibleCategories] = useState([]);
    const [products, setProducts] = useState(allbookDetails);
    const [isSticky, setIsSticky] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    // const [selectedOption, setSelectedOption] = useState(null);
    const [localStorageValue, setLocalStorage] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    // const [selectedOption, setSelectedOption] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    // const [userIdShop, setUserIdShop] = useState(0); // State to store the value of abc
    const dropdownRef = useRef(null);

    // const [megaMenu, setMegaMenu] = useState({})
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pathname, search, hash } = location;


    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
  
    const handleDropdownChange = (selected) => {
        setSelectedOption(selected);
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
    const signin = () => {
        localStorage.setItem('usedbookrtoken', '');
        localStorage.setItem('isLoginAuth', false);
        dispatch(setUserLogin(false))
        navigate('/Login')
    }
   
    const menu_lists = async () => {
        const data = await megamenu_list();
        dispatch(setMegaMenu(data))
        dispatch(setCategoryBook(data))
    }
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    const toggleDropdown = () => {
        setIsExpanded(!isExpanded);
        setIsMobileExpanded(!isMobileExpanded)
    };
    const userToggleDropDown = () => {
        setIsUserexpanded(!isUserexpanded)
    };
    const searchToggleDropDown = () => {
        setIsSearchexpanded(!isSearchexpanded)
    }

    const toggleTitle = (name) => {
        if (visibleCategories.includes(name)) {
            setVisibleCategories(visibleCategories.filter(category => category !== name));
        } else {
            setVisibleCategories([...visibleCategories, name]);
        }
    };

    const isCategoryVisible = (name) => {
        return visibleCategories.includes(name);
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
                book.title_long.toLowerCase().includes(newSearchItem) || (book.original_price >= 0 && book.original_price <= parseFloat(newSearchItem))
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
            dispatch(setallBookDetails(searchResults));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const seacrch_product = () => {
        handleChange({ target: { value: searchProduct } });
    };

    const navlist = async () => {
        // const { data } = await axios.get("https://webbitech.co.in/ecommerce/public/api/mainMenu")
        // dispatch(setnavListDetails(data.data))
    }
    // const handleNavLinkClick = (name,data) => {
    //     // navigate('/categorybook');
    //     navigate(`/subcategory/${data.id}`, { state: name,data })
    //     setIsExpanded(!isExpanded);
    //     setIsMobileExpanded(!isMobileExpanded)
    // };
    const handleNavLinkClick = (data) => {
        // navigate('/categorybook');
        navigate(`/subcategory/${data.id}`, { state: data })
        setIsExpanded(!isExpanded);
        setIsMobileExpanded(!isMobileExpanded)
    };
    useEffect(() => {
        dispatch(setallBookDetails(allbookDetails))
        dispatch(setsearchProduct(searchProduct))
        navlist()
        menu_lists();
        const fetchData = async () => {
            try {
                const result = await cardToget_list();
                dispatch(setUserIdShop(result)); // Set the value of abc
                const like_result = await cardTolike_list();
                dispatch(setUserIdLike(like_result))
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
        const loginUser = localStorage.getItem('usedbookrtoken');
        if (loginUser) {
            setLocalStorage(true)
        }

        // dispatch(setClass1Hide(true))
        const handleScroll = () => {
            if (window.scrollY >= 2) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsExpanded(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <>
            <div className='top-header'>
                <div className='container-90 d-lg-block d-none'>
                    <div className='row m-0 p-1'>
                        <div className='col-lg-8 col-md-12 col-12 text-start p-0'>
                            <h4 className='mb-0'><img src={locations} className='mx-2 p-0' />2nd Floor, 105/3, Athipalayam Road, chinnavedampatti,
                                Coimbatore,Tamil Nadu, 641049</h4>
                        </div>
                        <div className='col-lg-4 col-md-12 col-12 p-0'>
                            <h4 className='text-lg-end text-center phone_number mb-0'><img src={headphone} className='mx-2' />+91 6300201360 </h4>
                        </div>
                    </div>
                </div>
            </div>
            <header className='position-sticky top-0 sticky-header'>
                <div className={isSticky ? 'sticky-element' : 'bottom-header py-0'}>
                    <div className='container-90'>
                        <div className='d-lg-block d-md-block d-none'>
                            <div className='row m-0 p-2'>
                                <div className='col-lg-6 col-md-6 d-lg-block d-md-block d-none'>
                                    <img src={logo} height={80} />
                                </div>
                                <div className='col-lg-6 col-md-6 col-5 d-flex align-items-center justify-content-end icon-section'>
                                    <div className='d-lg-block d-md-block d-none'>
                                        <span className='position-relative'>
                                            <img src={heart} alt='heart' width={25} className='view-all' onClick={() => hearts()} title={likescount} />
                                            {/* {likescount >= 9 ? <><span className='like-count' title={likescount}>9<sup>+</sup></span></> : <><span className='like-count'>{likescount}</span></>} */}
                                            {userIdLike && userIdLike?.length > 0 ? (
                                                <>
                                                    {userIdLike?.length >= 9 ? (
                                                        <span className='like-count' title={userIdLike.length}>9<sup>+</sup></span>
                                                    ) : (
                                                        <span className='like-count'>{userIdLike.length}</span>
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    {userIdLike && userIdLike?.length >= 9 ? (
                                                        <span className='like-count' title={userIdLike.length}>9<sup>+</sup></span>
                                                    ) : (
                                                        <span className='like-count'>0</span>
                                                    )}
                                                </>
                                            )}
                                        </span>
                                        <span className='position-relative'>
                                            <img src={shop} width={25} alt='shop' className='mx-3 view-all' onClick={() => shops()} />
                                            {userIdShop && userIdShop?.length > 0 ? (
                                                <>
                                                    {userIdShop?.length >= 9 ? (
                                                        <span className='item-count' title={userIdShop.length}>9<sup>+</sup></span>
                                                    ) : (
                                                        <span className='item-count'>{userIdShop.length}</span>
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    {userIdShop && userIdShop?.length >= 9 ? (
                                                        <span className='item-count' title={userIdShop.length}>9<sup>+</sup></span>
                                                    ) : (
                                                        <span className='item-count'>0</span>
                                                    )}
                                                </>
                                            )}
                                        </span>
                                        {localStorageValue == true ?
                                            <>
                                                {/* <span>{registerToken.username}</span> */}
                                                <span className='dropdown user-profiles'>
                                                    <FontAwesomeIcon icon={faUser} className='mx-3 mobile-margin' style={{ color: '#000', fontSize: '25px', paddingTop: '10px' }} onClick={userToggleDropDown} />
                                                    <ul className={`dropdown-menu ${isUserexpanded ? 'show' : ''}`} aria-labelledby="dropdownMenuButton1">
                                                        {/* <li><a className="dropdown-item" href="#">{registerToken.username}</a></li> */}
                                                        <li onClick={userProfile}><a className="dropdown-item" href="#"><FontAwesomeIcon icon={faUserAlt} className='pe-2' />Profile</a></li>
                                                        <li onClick={signin}><a className="dropdown-item" href="#"><FontAwesomeIcon icon={faSignOut} className='pe-2' />Logout</a></li>
                                                    </ul>
                                                </span>

                                            </>
                                            :
                                            <>
                                                <span>
                                                    <button className='authregister' onClick={signup}>Sign in / Sign up</button>
                                                </span>
                                            </>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-lg-none d-md-none d-block'>
                    <div className='text-center bg-white py-1'>
                        <img src={logo} height={80} />
                    </div>
                </div>
                <div className='nav-section'>
                    <nav className="navbar navbar-expand-lg container-90 py-1">
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
                                    <div className='col-6 align-self-center'>
                                        <span className="" onClick={toggleMenu}><FontAwesomeIcon icon={faBars} style={{ color: '#FFF', fontSize: '20px' }} /></span>
                                    </div>
                                    <div className='col-6 text-end'>
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
                                            <img src={logo} />
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
                                                    <a className="nav-link dropdown-toggle option-list" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded={isMobileExpanded} onClick={toggleDropdown}>
                                                        SHOP BOOK {isMobileExpanded ? <><FontAwesomeIcon icon={faMinus} style={{ color: "#000", }} className='ps-2' /></> : <><FontAwesomeIcon icon={faPlus} style={{ color: "#000", }} className='ps-2' /></>}
                                                    </a>
                                                    <div class={`dropdown-menu drop-width w-100 ${isMobileExpanded ? 'show' : ''}`} aria-labelledby="dropdownMenuLink">
                                                        <div class="container-fluid">
                                                            <div class="row m-0">
                                                                {megaMenu?.length > 0 ?
                                                                    <>
                                                                        {megaMenu.map((data) => {
                                                                            return (

                                                                                <>
                                                                                    <div key={data.name} className="col-12 mb-3 mb-lg-0">
                                                                                        <div className="list-group list-group-flush">
                                                                                            <h5 onClick={() => toggleTitle(data.name)}>
                                                                                                {data.name}
                                                                                                {data.subcategories.length > 0 ? <><FontAwesomeIcon icon={isCategoryVisible(data.name) ? faMinus : faPlus} className='ps-2' /></> : <></>}
                                                                                            </h5>
                                                                                            {isCategoryVisible(data.name) && data.subcategories.map((subcategory, subIndex) => (
                                                                                                <a key={subIndex} className='list-group-item text-decoration-none' onClick={() => handleNavLinkClick(subcategory.name)}>
                                                                                                    {subcategory.name}
                                                                                                </a>
                                                                                            ))}
                                                                                        </div>
                                                                                    </div>
                                                                                </>
                                                                            )

                                                                        })}
                                                                    </>
                                                                    :
                                                                    <>
                                                                    </>
                                                                }

                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li className='d-flex align-items-center'>
                                                    <NavLink exact to="/newarrival" className={`${pathname === '/newarrival' ? 'active' : 'custom-active'} text-decoration-none`}>
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
                                    <div className='col-2 p-0 align-self-center'>
                                        <span className="" onClick={toggleMenu}><FontAwesomeIcon icon={faBars} style={{ color: '#FFF', fontSize: '20px' }} /></span>
                                    </div>
                                    <div className='col-10 p-0 align-self-center'>
                                        <div className='icon-section d-lg-none d-md-none space-item align-items-end float-end'>
                                            <span className='position-relative'>
                                                <FontAwesomeIcon icon={faHeart} className='mx-3 view-all' style={{ color: '#FFF', fontSize: '25px', paddingTop: '10px' }} onClick={() => hearts()} />
                                                {userIdLike && userIdLike?.length > 0 ? (
                                                    <>
                                                        {userIdLike?.length >= 9 ? (
                                                            <span className='like-count' title={userIdLike.length}>9<sup>+</sup></span>
                                                        ) : (
                                                            <span className='like-count'>{userIdLike.length}</span>
                                                        )}
                                                    </>
                                                ) : (
                                                    <>
                                                        {userIdLike && userIdLike?.length >= 9 ? (
                                                            <span className='like-count' title={userIdLike.length}>9<sup>+</sup></span>
                                                        ) : (
                                                            <span className='like-count'>0</span>
                                                        )}
                                                    </>
                                                )}                                            </span>
                                            <span className='position-relative'>
                                                <FontAwesomeIcon icon={faBagShopping} className='mx-3 view-all' onClick={() => shops()} style={{ color: '#FFF', fontSize: '25px', paddingTop: '10px' }} />
                                                {userIdShop && userIdShop?.length > 0 ? (
                                                    <>
                                                        {userIdShop.length >= 9 ? (
                                                            <span className='item-count' title={userIdShop?.length}>9<sup>+</sup></span>
                                                        ) : (
                                                            <span className='item-count'>{userIdShop?.length}</span>
                                                        )}
                                                    </>
                                                ) : (
                                                    <>
                                                        {userIdShop && userIdShop?.length >= 9 ? (
                                                            <span className='item-count' title={userIdShop.length}>9<sup>+</sup></span>
                                                        ) : (
                                                            <span className='item-count'>0</span>
                                                        )}
                                                    </>
                                                )}                                            </span>
                                            <span className='dropdown user-profiles'>
                                                <FontAwesomeIcon icon={faSearch} className='mx-3 mobile-margin' style={{ color: '#FFF', fontSize: '25px', paddingTop: '10px' }} onClick={searchToggleDropDown} />
                                                <ul className={`dropdown-menu w-100 ${isSearchexpanded ? 'show' : ''}`} aria-labelledby="dropdownMenuButton1">
                                                    <li className='search-fixed'>
                                                        <div className="input-group">
                                                            <input type="text" className="form-control " placeholder="search our book" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={(val) => { dispatch(setsearchProduct({ ...searchProduct, searchItem: val.target.value })); handleChange(val) }} />
                                                            <span className="input-group-text search-btn" id="basic-addon2">Search</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </span>
                                            <span className='dropdown user-profiles'>
                                                <FontAwesomeIcon icon={faUser} className='mx-3 mobile-margin' style={{ color: '#FFF', fontSize: '25px', paddingTop: '10px' }} onClick={userToggleDropDown} />
                                                <ul className={`dropdown-menu ${isUserexpanded ? 'show' : ''}`} aria-labelledby="dropdownMenuButton1">
                                                    <li onClick={signin}><a className="dropdown-item" href="#"><FontAwesomeIcon icon={faSignOut} className='pe-2' />Sign In</a></li>
                                                    <li onClick={signup}><a className="dropdown-item" href="#"><FontAwesomeIcon icon={faSignIn} className='pe-2' />Sign Up</a></li>
                                                    <li onClick={userProfile}><a className="dropdown-item" href="#"><FontAwesomeIcon icon={faUserAlt} className='pe-2' />Profile</a></li>
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
                                                <img src={logo} />
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
                                                        <a className="nav-link dropdown-toggle option-list" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded={isMobileExpanded} onClick={toggleDropdown}>
                                                            SHOP BOOKs{isMobileExpanded ? <><FontAwesomeIcon icon={faMinus} style={{ color: "#000", }} className='ps-2' /></> : <><FontAwesomeIcon icon={faPlus} style={{ color: "#000", }} className='ps-2' /></>}
                                                        </a>
                                                        <div class={`dropdown-menu drop-width w-100 ${isMobileExpanded ? 'show' : ''}`} aria-labelledby="dropdownMenuLink">
                                                            <div class="container-fluid">
                                                                <div class="row m-0">
                                                                    {megaMenu?.length > 0 ?
                                                                        <>
                                                                            {megaMenu?.length > 0 ?
                                                                                <>
                                                                                    {megaMenu.map((data) => {
                                                                                        return (

                                                                                            <>
                                                                                                <div key={data.name} className="col-12 mb-3 mb-lg-0">
                                                                                                    <div className="list-group list-group-flush">
                                                                                                        <h5 onClick={() => toggleTitle(data.name)}>
                                                                                                            {data.name}
                                                                                                            {data.subcategories.length > 0 ? <><FontAwesomeIcon icon={isCategoryVisible(data.name) ? faMinus : faPlus} className='ps-2' /></> : <></>}
                                                                                                        </h5>
                                                                                                        {isCategoryVisible(data.name) && data.subcategories.map((subcategory, subIndex) => (
                                                                                                            <a key={subIndex} className='list-group-item text-decoration-none' onClick={() => handleNavLinkClick(subcategory)}>
                                                                                                                {subcategory.name}
                                                                                                            </a>
                                                                                                        ))}
                                                                                                    </div>
                                                                                                </div>
                                                                                            </>
                                                                                        )

                                                                                    })}
                                                                                </>
                                                                                :
                                                                                <>
                                                                                </>
                                                                            }
                                                                        </>
                                                                        :
                                                                        <>
                                                                        </>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>

                                                    <li className='d-flex align-items-center'>
                                                        <NavLink exact to="/newarrival" className={`${pathname === '/newarrival' ? 'active' : 'custom-active'} text-decoration-none`}>
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
                                        <div className='col-lg-10 align-self-center'>
                                            <ul className="navbar-nav py-0 nav-content">
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
                                                    <div className={`dropdown-menu drop-width w-100 ${isExpanded ? 'show' : ''}`} aria-labelledby="dropdownMenuLink" ref={dropdownRef}>
                                                        <div class="container-fluid">
                                                            <div class="row m-0">
                                                                {megaMenu?.length > 0 ?
                                                                    <>
                                                                        {megaMenu.map((data) => {
                                                                            return (
                                                                                <>
                                                                                    <div class="col-lg-3 col-md-4  mb-3 mb-lg-0">
                                                                                        <div class="list-group list-group-flush">
                                                                                            <h5>{data.name}</h5>
                                                                                            {data.subcategories.map((subcategory, index) => (
                                                                                                <a key={index} className='list-group-item text-decoration-none sub-category' onClick={() => handleNavLinkClick(subcategory)}>
                                                                                                    {subcategory.name}
                                                                                                </a>
                                                                                            ))}
                                                                                        </div>
                                                                                    </div>
                                                                                </>
                                                                            )
                                                                        })}
                                                                    </>
                                                                    :
                                                                    <></>
                                                                }

                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className='d-flex align-items-center'>
                                                    <NavLink exact to="/newarrival" className={`${pathname === '/newarrival' ? 'active' : 'custom-active'} text-decoration-none`}>
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
                                        <div className='col-lg-2 d-flex align-items-center text-end'>
                                            <div className="input-group">
                                                <input type="text" className="form-control " placeholder="search our book" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={(val) => { dispatch(setsearchProduct({ ...searchProduct, searchItem: val.target.value })); handleChange(val) }} />
                                                {/* <input type="text" className="form-control " placeholder="search our book" aria-label="Recipient's username" aria-describedby="basic-addon2" value={searchProduct.length > 0 ? searchProduct : ''} onChange={(event) => { dispatch(setsearchProduct(event.target.value)) }} /> */}
                                                {/* <span className="input-group-text search-btn" id="basic-addon2" onClick={seacrch_product}>Search</span> */}
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