import React, { useEffect, useState } from 'react'
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
import phone from '../Common/assets/image/phone1.png'

import axios from 'axios';
import { setregisterDetails } from '../Redux/CreateSlice';
import Header from '../Common/pages/Header';
import Footer from '../Common/pages/Footer';

// api call fn path 
import { userRegister } from '../Common/pages/apiBaseurl'

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
        const isEmpty = Object.values(registerDetails).some(value => value === "");
        if (isEmpty) {
            alert("Please fill in all the fields.");
            return;
        } else {
            if (registerDetails.password == registerDetails.password_confirmation) {
                try {
                    const response = await userRegister(registerDetails);
                    console.log("response",response)
                    if (response.success == true) {
                        alert(response.message);
                        navigate('/otpform')
                    }
                    // Handle the API response
                } catch (error) {
                    // Handle errors
                    alert("check your mail and mobilenumber");
                }
            } else {
                alert("don't match password and confirm password")
            }
        }
    }
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])
    return (
        <>
            <Header />
            <div className='d-lg-block d-none w-75 mx-auto'>
                <div className='login-section register-section'>
                    <div className='row m-0 p-5 align-items-stretch'>
                        <div className='col-lg-6 col-md-12 col-12 p-0'>
                            <div className='input-section'>
                                <h4>Sign up</h4>
                                <h5>If you already have an account register</h5>
                                <h5>You can <span className='register-hover' onClick={() => login()}>Login here !</span></h5>
                                <div className="my-3">
                                    <label htmlFor="text" className="form-label">Name</label>
                                    <div className="input-group">
                                        <span className="pe-2">
                                            <img src={usericon} />
                                        </span>
                                        <input type="text" className="form-control border-0 border-bottom" id="name" placeholder="Enter your name" required onChange={(e) => dispatch(setregisterDetails({ ...registerDetails, name: e.target.value }))} />
                                    </div>
                                </div>
                                <div className="my-3">
                                    <label htmlFor="text" className="form-label">Email</label>
                                    <div className="input-group">
                                        <span className="pe-2">
                                            <img src={mail} />
                                        </span>
                                        <input type="email" className="form-control border-0 border-bottom" id="email" name='email' value={registerDetails.email} placeholder="Enter your Email" onChange={(e) => dispatch(setregisterDetails({ ...registerDetails, email: e.target.value }))} />
                                    </div>
                                </div>
                                <div className="my-3">
                                    <label htmlFor="text" className="form-label">Mobile Number</label>
                                    <div className="input-group">
                                        <span className="pe-2">
                                            <img src={phone} />
                                        </span>
                                        <input type="text" className="form-control border-0 border-bottom" id="name" placeholder="Enter your mobile number" required onChange={(e) => dispatch(setregisterDetails({ ...registerDetails, phone_number: e.target.value }))} />
                                    </div>
                                </div>
                                <div className="my-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <div className="input-group">
                                        <span className="pe-2">
                                            <img src={lock} />
                                        </span>
                                        <input type={showPassword ? 'text' : 'password'} className="form-control border-0 border-bottom" id="password" placeholder="Enter the 8 Character minimum" required onChange={(e) => dispatch(setregisterDetails({ ...registerDetails, password: e.target.value }))} />
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
                                        <input type={confirm ? 'text' : 'password'} className="form-control border-0 border-bottom" id="password" placeholder="Enter the Confrim Password" onChange={(e) => dispatch(setregisterDetails({ ...registerDetails, password_confirmation: e.target.value }))} />
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
                        <div className='col-lg-6 col-md-12 col-12 bg-color p-4 text-center mt-lg-0'>
                            <img src={loginImg} className='h-75 w-50' />
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
                            <label htmlFor="text" className="form-label">Name</label>
                            <div className="input-group">
                                <span className="pe-2">
                                    <img src={usericon} />
                                </span>
                                <input type="text" className="form-control border-0 border-bottom" id="name" placeholder="Enter your name" required onChange={(e) => dispatch(setregisterDetails({ ...registerDetails, name: e.target.value }))} />
                            </div>
                        </div>
                        <div className="my-3">
                            <label htmlFor="text" className="form-label">Email</label>
                            <div className="input-group">
                                <span className="pe-2">
                                    <img src={mail} />
                                </span>
                                <input type="email" className="form-control border-0 border-bottom" id="email" name='email' value={registerDetails.email} placeholder="Enter your Email" onChange={(e) => dispatch(setregisterDetails({ ...registerDetails, email: e.target.value }))} />
                            </div>
                        </div>
                        <div className="my-3">
                            <label htmlFor="text" className="form-label">Mobile Number</label>
                            <div className="input-group">
                                <span className="pe-2">
                                    <img src={phone} />
                                </span>
                                <input type="text" className="form-control border-0 border-bottom" id="name" placeholder="Enter your mobile number" required onChange={(e) => dispatch(setregisterDetails({ ...registerDetails, phone_number: e.target.value }))} />
                            </div>
                        </div>
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
                                <input type={confirm ? 'text' : 'password'} className="form-control border-0 border-bottom" id="password" placeholder="Confrim your Password" onChange={(e) => dispatch(setregisterDetails({ ...registerDetails, password_confirmation: e.target.value }))} />
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