import React, { useState } from 'react'
import '../Common/assets/css/auth.css'
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faLock, faEnvelope, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';


import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/400.css"; // Specify weight
import "@fontsource/poppins/400-italic.css"; // Specify weight and style

// image path
import loginImg from '../Common/assets/image/login_img.png'
import mail from '../Common/assets/image/mail.png'
import lock from '../Common/assets/image/lock.png'
import facebook from '../Common/assets/image/Facebook.png'
import twitter from '../Common/assets/image/twitter.png'
import google from '../Common/assets/image/google.png'
import Header from '../Common/pages/Header';
import Footer from '../Common/pages/Footer';
import { setforgetDetails, setloginDetails, setlogoutDetails, setresetpasswordDetails } from '../Redux/CreateSlice';
import axios from 'axios';


function Resetpassword() {
    const { forgetDetails, resetpasswordDetails } = useSelector((state) => state.usedbookr_product)
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleEmailChange = (e) => {
        const newEmail = e.target.value;

        // Dispatch the action to update the resetpasswordDetails in the Redux store
        dispatch(setresetpasswordDetails({ ...resetpasswordDetails, email: newEmail }));
    };

    const resetpassword = async () => {

        try {
            const response = await axios.post('https://webbitech.co.in/ecommerce/public/api/passwordReset', {
                email: resetpasswordDetails.email,
                token: resetpasswordDetails.token, // Assuming 'token' is a property in resetpasswordDetails
                password: resetpasswordDetails.password,
            });
            // Handle the API response
            const successMsg = response.data.message
            alert(successMsg)
            navigate('/')
        } catch (error) {
            // Handle errors
            console.error(error);
        }

    }
    const login = () => {
        navigate = ('/')
    }

    return (
        <>
            {/* <Header /> */}
            <div className='login-section'>
                <div className='row m-0 p-3  align-items-stretch'>
                    <div className='col-lg-6 col-md-12 col-12 input-section py-5'>
                        <h4>Reset Password</h4>
                        {/* <h5>You can <span className='register-hover' onClick={() => login()}>Login here !</span></h5> */}
                        <div className="mb-3 mt-4">
                            <label htmlFor="email" className="form-label">Email</label>
                            <div className="input-group">
                                <span className="pe-2">
                                    <img src={mail} />
                                </span>
                                <input
                                    type="text"
                                    className="form-control border-0 border-bottom"
                                    id=""
                                    placeholder="Enter your email"
                                    value={resetpasswordDetails.email}
                                    onChange={handleEmailChange}
                                />
                            </div>
                        </div>
                        <div className="mb-3 mt-4">
                            <label htmlFor="email" className="form-label">token</label>
                            <div className="input-group">
                                <span className="pe-2">
                                    <img src={mail} />
                                </span>
                                <input
                                    type="text"
                                    className="form-control border-0 border-bottom"
                                    id=""
                                    placeholder="Enter your email"
                                    onChange={(e) => { dispatch(setresetpasswordDetails({ ...resetpasswordDetails, token: e.target.value })) }}
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
                                    onChange={(e) => { dispatch(setresetpasswordDetails({ ...resetpasswordDetails, password: e.target.value })) }}
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
                        <div className='btn-section'>
                            <button className='button' onClick={resetpassword}>Submit</button>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-12 col-12 bg-color p-4 text-center mt-lg-0 mt-5'>
                        <h5 className='text-lg-end text-md-end text-center phone_number'><FontAwesomeIcon icon={faPhone} style={{ color: "#fafafa", }} className='px-2' /> +971 5 65015231</h5>
                        <img src={loginImg} className='w-75 ' />
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </>

    )
}

export default Resetpassword