import React, { useState } from 'react'
import '../Common/assets/css/auth.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faLock, faEnvelope, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

// image path
import loginImg from '../Common/assets/image/login.png'
import mail from '../Common/assets/image/mail.png'
import lock from '../Common/assets/image/lock.png'
import facebook from '../Common/assets/image/Facebook.png'
import twitter from '../Common/assets/image/twitter.png'
import google from '../Common/assets/image/google.png'
import Header from '../Common/pages/Header';
import Footer from '../Common/pages/Footer';
import { setRegisterToken, setUserLogin, setforgetDetails, setloginDetails, setlogoutDetails } from '../Redux/CreateSlice';
import axios from 'axios';
import { authLogin, otpToken } from '../Common/pages/apiBaseurl';


function Forgetpassword() {
    const { loginDetails, forgetDetails } = useSelector((state) => state.usedbookr_product)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const forgetVerify = async () => {
        try {
            const apiUrl = 'https://webbitech.co.in/ecommerce/public/api/passwordEmail';
            const data = await axios.post(apiUrl, forgetDetails);
            // navigate('/Resetpassword')
            navigate(`/Resetpassword?email=${forgetDetails.email}`)
        } catch (error) {
            alert('correct email id')
        }
    }
    const login = () => {
        navigate('/Login')
    }


    return (
        <>
            <Header />
            <div className='login-section login-page'>
                <div className='d-lg-block d-none w-75 mx-auto'>
                    <div className='row m-0 p-3 align-items-stretch position-relative'>
                        <div className='col-lg-6 col-md-4 col-12 p-0'>
                            <div className='input-section'>
                                <h4>Forgetpassword</h4>
                                <h5>You can <span className='register-hover' onClick={login}>Login !</span></h5>
                                <div className="mb-3 mt-4">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <div className="input-group">
                                        <span className="pe-2">
                                            <img src={mail} />
                                        </span>
                                        <input
                                            type="email"
                                            className="form-control border-0 border-bottom"
                                            id="email"
                                            placeholder="Enter your email"
                                            onChange={(e) => { dispatch(setforgetDetails({ ...forgetDetails, email: e.target.value })) }}
                                        />
                                    </div>
                                </div>
                                {/* <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <div className="input-group">
                                        <span className="pe-2">
                                            <img src={lock} />
                                        </span>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            className="form-control border-0 border-bottom"
                                            id="password"
                                            placeholder="Enter your password"
                                            // value={password}
                                            onChange={(e) => { dispatch(setloginDetails({ ...loginDetails, password: e.target.value })) }}
                                        />
                                        <button
                                            className="btn "
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                        >
                                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                        </button>
                                    </div>
                                </div> */}
                                <div className='row m-0 pt-2'>
                                    <div className="form-group form-check col-lg-6 col-md-6 col-12">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label rember" htmlFor="exampleCheck1">Remember me</label>
                                    </div>
                                    {/* <div className="form-group form-check col-lg-6 col-md-6 col-12 text-end">
                                        <a href='' className='text-decoration-none forget' onClick={() => forgetpasssword()}>Forgot Password?</a>
                                    </div> */}
                                </div>
                                <div className='btn-section'>
                                    <button className='button' onClick={forgetVerify}>Forget Password</button>
                                </div>

                            </div>
                        </div>
                        <div className='col-lg-6 col-md-12 col-12 bg-color p-4 text-center mt-lg-0'>
                            <img src={loginImg} className='h-100 w-50' />
                        </div>
                    </div>
                </div>
                <div className='d-lg-none d-block'>
                    <div className='input-section position-relative my-3'>
                        <h4>Forgetpassword</h4>
                        <h5>You can <span className='register-hover' onClick={() => login()}>Login !</span></h5>
                        <div className="mb-3 mt-4">
                            <label htmlFor="email" className="form-label">Email</label>
                            <div className="input-group">
                                <span className="pe-2">
                                    <img src={mail} />
                                </span>
                                <input
                                    type="email"
                                    className="form-control border-0 border-bottom"
                                    id="email"
                                    placeholder="Enter your email"
                                    onChange={(e) => { dispatch(setforgetDetails({ ...forgetDetails, email: e.target.value })) }}
                                />
                            </div>
                        </div>
                        <div className='btn-section text-center'>
                            <button className='button w-75' onClick={forgetVerify}>Forget Password</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    )
}

export default Forgetpassword