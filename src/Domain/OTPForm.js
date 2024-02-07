import React, { useState } from 'react';
import OtpInput from 'react-otp-input'; import '../Common/assets/css/regular.css'; // Import CSS for styling
import Header from '../Common/pages/Header';
import Footer from '../Common/pages/Footer';



// image path
import loginImg from '../Common/assets/image/login_img.png'
import mail from '../Common/assets/image/mail.png'
import usericon from '../Common/assets/image/usericon.png'
import lock from '../Common/assets/image/lock.png'
import phone from '../Common/assets/image/phone.png'
import { useDispatch, useSelector } from 'react-redux';

const OTPForm = () => {
    const { otp } = useSelector((state) => state.usedbookr_product)
    const [otpNumber,setOtp] = useState('')
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOtp(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const verifyOTP = () => {
        // e.preventDefault();
        const otpValue = Object.values(otp).join('');
        console.log('OTP:', otpValue);

        // Verify the OTP with the backend API
        // ...
    };

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
                                {/* <form onSubmit={handleSubmit}>
                                    <input type="text" name="otp1" maxLength={1} value={otp.otp1} onChange={handleChange} />
                                    <input type="text" name="otp2" maxLength={1} value={otp.otp2} onChange={handleChange} />
                                    <input type="text" name="otp3" maxLength={1} value={otp.otp3} onChange={handleChange} />
                                    <input type="text" name="otp4" maxLength={1} value={otp.otp4} onChange={handleChange} />
                                    <input type="text" name="otp5" maxLength={1} value={otp.otp5} onChange={handleChange} />
                                    <input type="text" name="otp6" maxLength={1} value={otp.otp6} onChange={handleChange} />
                                    <button type="submit">Verify OTP</button>
                                </form> */}
                                <div class="otp-container">
                                    <div className='d-flex'>
                                        <div>
                                            <input type="text" name="otp1" id="otp1" maxlength="1" value={otp.otp1} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <input type="text" name="otp2" id="otp2" maxlength="1" value={otp.otp2} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <input type="text" name="otp3" id="otp3" maxlength="1" value={otp.otp3} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <input type="text" name="otp4" id="otp4" maxlength="1" value={otp.otp4} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <input type="text" name="otp5" id="otp5" maxlength="1" value={otp.otp5} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <input type="text" name="otp6" id="otp6" maxlength="1" value={otp.otp6} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className='btn-section'>
                                    <button className='button' onClick={()=>verifyOTP()}>OTP Verify</button>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-8 col-md-12 col-12 bg-color p-4 text-center mt-lg-0 mt-5'>
                            <img src={loginImg} className='w-75' />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    );
};

export default OTPForm;
