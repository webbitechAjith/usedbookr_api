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
import { setloginDetails, setlogoutDetails } from '../Redux/CreateSlice';
import axios from 'axios';


function Login() {
    const { loginDetails, logoutDetails } = useSelector((state) => state.usedbookr_product)
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const navigate = useNavigate()
    const register = () => {
        navigate('/register')
    }

    const loginVerify = async () => {
        try {
            const apiUrl = 'https://webbitech.co.in/ecommerce/public/api/login';
            const { data } = await axios.post(apiUrl, loginDetails);
            if (data.success == true) {
                alert('Login Successfully');
                const authToken = data.data.token;
                localStorage.setItem('userLoginToken', authToken);
                const token = localStorage.getItem('token')
                dispatch(setlogoutDetails(true))
                navigate('/Orderprocess')
            } else {
                alert('Login failed:');
            }
        } catch (error) {
            alert('Useremail and password incorrect')
        }
    }
    const forgetpasssword = () => {
        navigate('/Forgetpassword')
    }
    return (
        <>
            <Header />
            <div className='login-section'>
                <div className='d-lg-block d-none'>
                    <div className='row m-0 p-3 align-items-stretch position-relative'>
                        <div className='col-lg-4 col-md-4 col-12 '>
                            <div className='input-section'>
                                <h4>Sign in</h4>
                                <h5>If you don’t have an account register</h5>
                                <h5>You can <span className='register-hover' onClick={() => register()}>Register here !</span></h5>
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
                                            onChange={(e) => { dispatch(setloginDetails({ ...loginDetails, email: e.target.value })) }}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
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
                                </div>
                                <div className='row m-0 pt-2'>
                                    <div className="form-group form-check col-lg-6 col-md-6 col-12">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label rember" htmlFor="exampleCheck1">Remember me</label>
                                    </div>
                                    <div className="form-group form-check col-lg-6 col-md-6 col-12 text-end">
                                        <a href='' className='text-decoration-none forget' onClick={() => forgetpasssword()}>Forgot Password?</a>
                                    </div>
                                </div>
                                <div className='btn-section'>
                                    <button className='button' onClick={loginVerify}>Login</button>
                                </div>
                                {/* <h3 className='or text-center mt-4'>or continue with</h3> */}
                                {/* <div className='text-center mt-5'>
                                <img src={facebook} className='mx-2' />
                                <img src={twitter} className='mx-2' />
                                <img src={google} className='mx-2' />
                            </div> */}
                            </div>
                        </div>
                        <div className='col-lg-8 col-md-8 col-12 bg-color p-4 text-center mt-lg-0 mt-5'>
                            {/* <h5 className='text-lg-end text-md-end text-center phone_number'><FontAwesomeIcon icon={faPhone} style={{ color: "#fafafa", }} className='px-2' /> +971 5 65015231</h5> */}
                            <img src={loginImg} className='w-75 ' />
                        </div>
                    </div>
                </div>
                <div className='d-lg-none d-block'>
                        <div className='input-section position-relative my-3'>
                            <h4>Sign in</h4>
                            <h5>If you don’t have an account register</h5>
                            <h5>You can <span className='register-hover' onClick={() => register()}>Register here !</span></h5>
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
                                        onChange={(e) => { dispatch(setloginDetails({ ...loginDetails, email: e.target.value })) }}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
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
                            </div>
                            <div className='row m-0 pt-2'>
                                <div className="form-group form-check col-lg-6 col-md-6 col-12">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label rember" htmlFor="exampleCheck1">Remember me</label>
                                </div>
                                <div className="form-group form-check col-lg-6 col-md-6 col-12 text-end">
                                    <a href='' className='text-decoration-none forget' onClick={() => forgetpasssword()}>Forgot Password?</a>
                                </div>
                            </div>
                            <div className='btn-section text-center'>
                                <button className='button' onClick={loginVerify}>Login</button>
                            </div>
                            {/* <h3 className='or text-center mt-4'>or continue with</h3> */}
                            {/* <div className='text-center mt-5'>
                                <img src={facebook} className='mx-2' />
                                <img src={twitter} className='mx-2' />
                                <img src={google} className='mx-2' />
                            </div> */}
                        </div>
                    </div>
            </div>
            <Footer />
        </>

    )
}

export default Login