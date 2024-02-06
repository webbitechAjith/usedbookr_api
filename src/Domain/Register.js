import React, { useState } from 'react'
import '../Common/assets/css/auth.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faLock, faEnvelope, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';


import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/400.css"; // Specify weight
import "@fontsource/poppins/400-italic.css"; // Specify weight and style

// image path
import loginImg from '../Common/assets/image/login_img.png'
import mail from '../Common/assets/image/mail.png'
import usericon from '../Common/assets/image/usericon.png'
import lock from '../Common/assets/image/lock.png'
import phone from '../Common/assets/image/phone.png'

import axios from 'axios';
import { setregisterDetails } from '../Redux/CreateSlice';
import Header from '../Common/pages/Header';
import Footer from '../Common/pages/Footer';


function Register() {
    const { registerDetails } = useSelector((state) => state.usedbookr_product)
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const [confirm, setconfirm] = useState(false);
    const toggleConfiemPasswordVisibility = () => {
        setconfirm(!confirm);
    };
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const login = () => {
        navigate('/Login')
    }

    const signup = async () => {
        if (registerDetails.password == registerDetails.password_confirm) {
            axios.get(`https://webbitech.co.in/ecommerce/public/api/register`, {
                params: {
                    name: registerDetails.name,
                    email: registerDetails.email,
                    mobile: registerDetails.mobile,
                    password: registerDetails.password,
                    password_confirm: registerDetails.password_confirm,
                },
            })
                .then(response => {
                    // Handle the API response
                    console.log(response.data);
                })
                .catch(error => {
                    // Handle errors
                    alert("The mobile has already been taken.")
                });

        } else {
            console.log(registerDetails)
            alert("don't match password and confirm password")
        }

    }
    return (
        <>
            <Header />
            <div className='d-lg-block d-none'>
                <div className='login-section register-section'>
                    <div className='row m-0 p-3 align-items-stretch position-relative'>
                        <div className='col-lg-4 col-md-12 col-12'>
                            <div className='input-section'>
                                <h4>Sign up</h4>
                                <h5>If you already have an account register</h5>
                                <h5>You can <span className='register-hover' onClick={() => login()}>Login here !</span></h5>
                                <div className="my-3">
                                    <label htmlFor="text" className="form-label">Email / Phone Number</label>
                                    <div className="input-group">
                                        <span className="pe-2">
                                            <img src={mail} />
                                        </span>
                                        <input type="email" className="form-control border-0 border-bottom" id="email" name='email' value={registerDetails.email} placeholder="Enter your Email / Phone Number" onChange={(e) => dispatch(setregisterDetails({ ...registerDetails, email: e.target.value }))} />
                                    </div>
                                </div>
                                <div className="my-3">
                                    <label htmlFor="text" className="form-label">Username</label>
                                    <div className="input-group">
                                        <span className="pe-2">
                                            <img src={usericon} />
                                        </span>
                                        <input type="text" className="form-control border-0 border-bottom" id="name" placeholder="Enter your name" required onChange={(e) => dispatch(setregisterDetails({ ...registerDetails, name: e.target.value }))} />
                                    </div>
                                </div>
                                {/* <div className="my-3">
                                <label htmlFor="text" className="form-label">Mobile Number</label>
                                <div className="input-group">
                                    <span className="pe-2">
                                        <img src={phone} />
                                    </span>
                                    <input type="text" className="form-control border-0 border-bottom" id="name" placeholder="Enter your mobile number" required onChange={(e) => dispatch(setregisterDetails({ ...registerDetails, mobile: e.target.value }))} />
                                </div>
                            </div> */}
                                <div className="my-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <div className="input-group">
                                        <span className="pe-2">
                                            <img src={lock} />
                                        </span>
                                        <input type={showPassword ? 'text' : 'password'} className="form-control border-0 border-bottom" id="password" placeholder="Enter your password" required onChange={(e) => dispatch(setregisterDetails({ ...registerDetails, password: e.target.value }))} />
                                        <button className="btn " type="button" onClick={togglePasswordVisibility}>
                                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                        </button>
                                    </div>
                                </div>
                                <div className="my-3">
                                    <label htmlFor="password" className="form-label">Confirm Password</label>
                                    <div className="input-group">
                                        <span className="pe-2">
                                            <img src={lock} />
                                        </span>
                                        <input type={confirm ? 'text' : 'password'} className="form-control border-0 border-bottom" id="password" placeholder="Confrim your Password" onChange={(e) => dispatch(setregisterDetails({ ...registerDetails, password_confirm: e.target.value }))} />
                                        <button
                                            className="btn "
                                            type="button"
                                            onClick={toggleConfiemPasswordVisibility}
                                        >
                                            <FontAwesomeIcon icon={confirm ? faEye : faEyeSlash} />
                                        </button>
                                    </div>
                                </div>
                                <div className='btn-section'>
                                    <button className='button' onClick={() => signup()}>Register</button>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-8 col-md-12 col-12 bg-color p-4 text-center mt-lg-0 mt-5'>
                            <img src={loginImg} className='w-75' />
                        </div>
                    </div>
                </div>
            </div>

            <div className='d-lg-none d-block'>
                <div className='login-section position-relative my-3'>
                    <div className='input-section'>
                        <h4>Sign up</h4>
                        <h5>If you already have an account register</h5>
                        <h5>You can <span className='register-hover' onClick={() => login()}>Login here !</span></h5>
                        <div className="my-3">
                            <label htmlFor="text" className="form-label">Email / Phone Number</label>
                            <div className="input-group">
                                <span className="pe-2">
                                    <img src={mail} />
                                </span>
                                <input type="email" className="form-control border-0 border-bottom" id="email" name='email' value={registerDetails.email} placeholder="Enter your Email / Phone Number" onChange={(e) => dispatch(setregisterDetails({ ...registerDetails, email: e.target.value }))} />
                            </div>
                        </div>
                        <div className="my-3">
                            <label htmlFor="text" className="form-label">Username</label>
                            <div className="input-group">
                                <span className="pe-2">
                                    <img src={usericon} />
                                </span>
                                <input type="text" className="form-control border-0 border-bottom" id="name" placeholder="Enter your name" required onChange={(e) => dispatch(setregisterDetails({ ...registerDetails, name: e.target.value }))} />
                            </div>
                        </div>
                        {/* <div className="my-3">
                                <label htmlFor="text" className="form-label">Mobile Number</label>
                                <div className="input-group">
                                    <span className="pe-2">
                                        <img src={phone} />
                                    </span>
                                    <input type="text" className="form-control border-0 border-bottom" id="name" placeholder="Enter your mobile number" required onChange={(e) => dispatch(setregisterDetails({ ...registerDetails, mobile: e.target.value }))} />
                                </div>
                            </div> */}
                        <div className="my-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <div className="input-group">
                                <span className="pe-2">
                                    <img src={lock} />
                                </span>
                                <input type={showPassword ? 'text' : 'password'} className="form-control border-0 border-bottom" id="password" placeholder="Enter your password" required onChange={(e) => dispatch(setregisterDetails({ ...registerDetails, password: e.target.value }))} />
                                <button className="btn " type="button" onClick={togglePasswordVisibility}>
                                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                </button>
                            </div>
                        </div>
                        <div className="my-3">
                            <label htmlFor="password" className="form-label">Confirm Password</label>
                            <div className="input-group">
                                <span className="pe-2">
                                    <img src={lock} />
                                </span>
                                <input type={confirm ? 'text' : 'password'} className="form-control border-0 border-bottom" id="password" placeholder="Confrim your Password" onChange={(e) => dispatch(setregisterDetails({ ...registerDetails, password_confirm: e.target.value }))} />
                                <button
                                    className="btn "
                                    type="button"
                                    onClick={toggleConfiemPasswordVisibility}
                                >
                                    <FontAwesomeIcon icon={confirm ? faEye : faEyeSlash} />
                                </button>
                            </div>
                        </div>
                        <div className='btn-section'>
                            <button className='button' onClick={() => signup()}>Register</button>
                        </div>
                    </div>
                </div>
                {/* <div className='col-lg-8 col-md-12 col-12 bg-color p-4 text-center mt-lg-0 mt-5'>
                            <img src={loginImg} className='w-75' />
                        </div> */}
            </div>
            <Footer />
        </>

    )
}

export default Register