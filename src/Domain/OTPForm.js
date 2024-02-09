import React, { useEffect, useState } from 'react';
import '../Common/assets/css/regular.css'; // Import CSS for styling
import Header from '../Common/pages/Header';
import Footer from '../Common/pages/Footer';



// image path
import loginImg from '../Common/assets/image/login_img.png'
import mail from '../Common/assets/image/mail.png'
import { useDispatch, useSelector } from 'react-redux';
import { setOtpVerify, setRegisterToken } from '../Redux/CreateSlice';
import { otpToken, otpVerify } from '../Common/pages/apiBaseurl';
import { useNavigate } from 'react-router-dom';

const OTPForm = () => {
    const { registerDetails, otpNumber,registerToken } = useSelector((state) => state.usedbookr_product)
    const [otpCheck, setOtp] = useState(
        {
            otp1: '',
            otp2: '',
            otp3: '',
            otp4: '',
            otp5: '',
            otp6: ''
        }
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()
    // onchange value 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setOtp(prevState => ({
            ...prevState,
            [name]: value
        }));
        // automove value next input 
        if (value && name !== 'otp6') {
            const nextInput = document.getElementById(`otp${parseInt(name.charAt(3)) + 1}`);
            if (nextInput) {
                nextInput.focus();
            }
        }

    };
   
    // verify fn  
    const verifyOTP = async () => {
        try {
            const response = await otpVerify(otpNumber);
            if (response.status == '200') {
                const token_get = localStorage.setItem('usedbookrtoken', response.access_token);
                const localRegisterToken = localStorage.getItem('usedbookrtoken');
                const response_token = await otpToken(localRegisterToken)
                dispatch(setRegisterToken(response_token));
                alert("SuccessFully Registered");
                navigate('/profile')
            }else {
                alert("OTP error")
            }
        } catch {
            alert("Invaild OTP");
        }
    };
    useEffect(() => {
        // Combine OTP values into a single string
        const joinString = Object.values(otpCheck).join('');

        // Check if all OTP fields are filled
        if (joinString.length === 6) {
            // Dispatch action to verify OTP
            dispatch(setOtpVerify({ email: registerDetails.email, otp: joinString }));
        }
    }, [otpCheck, registerDetails.email]);
    
    return (
        <>
            <Header />
            <div className='d-lg-block d-none'>
                <div className='login-section register-section otp-form'>
                    <div className='row m-0 p-3 align-items-stretch position-relative'>
                        <div className='col-lg-4 col-md-12 col-12'>
                            <div className='input-section'>
                                <h4>OTP Form</h4>
                                <p>Enter the OTP sent to your mobile number or email address:</p>
                                <div className="my-5">
                                    <label htmlFor="text" className="form-label">Email</label>
                                    <div className="input-group">
                                        <span className="pe-2">
                                            <img src={mail} />
                                        </span>
                                        <input type="email" className="form-control border-0 border-bottom" id="name" value={registerDetails.email} placeholder="Enter Your Register email" required onChange={(e) => dispatch(setOtpVerify({ ...otpNumber, email: registerDetails.email }))} />
                                    </div>
                                </div>
                                <div class="otp-container">
                                    <label htmlFor="text" className="form-label mb-3">Otp Number</label>
                                    <div className='d-flex'>
                                        <div>
                                            <input type="text" name="otp1" id="otp1" maxLength={1} value={otpCheck.otp1} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <input type="text" name="otp2" id="otp2" maxLength={1} value={otpCheck.otp2} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <input type="text" name="otp3" id="otp3" maxLength={1} value={otpCheck.otp3} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <input type="text" name="otp4" id="otp4" maxLength={1} value={otpCheck.otp4} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <input type="text" name="otp5" id="otp5" maxLength={1} value={otpCheck.otp5} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <input type="text" name="otp6" id="otp6" maxLength={1} value={otpCheck.otp6} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className='btn-section'>
                                    <button className='button' onClick={() => verifyOTP()}>OTP Verify</button>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-8 bg-color p-4 text-center mt-lg-0 mt-5'>
                            <img src={loginImg} className='w-75' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-lg-none d-block'>
                <div className='login-section position-relative my-3'>
                    <div className='input-section'>
                        <h4>OTP Form</h4>
                        <p>Enter the OTP sent to your mobile number or email address:</p>
                        <div className="my-5">
                            <label htmlFor="text" className="form-label">Email</label>
                            <div className="input-group">
                                <span className="pe-2">
                                    <img src={mail} />
                                </span>
                                <input type="email" className="form-control border-0 border-bottom" id="name" value={registerDetails.email} placeholder="Enter Your Register email" required />
                            </div>
                        </div>
                        <div class="otp-container">
                            <label htmlFor="text" className="form-label mb-3">Otp Number</label>
                            <div className='d-flex'>
                                <div>
                                    <input type="text" name="otp1" id="otp1" maxLength={1} value={otpCheck.otp1} onChange={handleChange} />
                                </div>
                                <div>
                                    <input type="text" name="otp2" id="otp2" maxLength={1} value={otpCheck.otp2} onChange={handleChange} />
                                </div>
                                <div>
                                    <input type="text" name="otp3" id="otp3" maxLength={1} value={otpCheck.otp3} onChange={handleChange} />
                                </div>
                                <div>
                                    <input type="text" name="otp4" id="otp4" maxLength={1} value={otpCheck.otp4} onChange={handleChange} />
                                </div>
                                <div>
                                    <input type="text" name="otp5" id="otp5" maxLength={1} value={otpCheck.otp5} onChange={handleChange} />
                                </div>
                                <div>
                                    <input type="text" name="otp6" id="otp6" maxLength={1} value={otpCheck.otp6} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className='btn-section otp-btn'>
                            <button className='button' onClick={() => verifyOTP()}>OTP Verify</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    );
};

export default OTPForm;
