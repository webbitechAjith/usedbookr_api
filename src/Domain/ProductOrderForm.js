import React, { useState } from 'react'
import '../Common/assets/css/auth.css'
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faLock, faEnvelope, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';



// image path
import loginImg from '../Common/assets/image/login_img.png'
import mail from '../Common/assets/image/mail.png'
import usericon from '../Common/assets/image/usericon.png'
import lock from '../Common/assets/image/lock.png'

const ProductOrderForm = () => {

    const navigate = useNavigate()
    const [selectedOption, setSelectedOption] = useState('');

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const [formData, setFormData] = useState({
        cardNumber: '',
        cardHolder: '',
        expirationDate: '',
        cvv: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log(formData);
    };
    return (
        <>
            <div className='login-section product-order container-80'>
                <div className='orderplace-section'>
                    <div className='col-lg-12 col-md-12 col-12 input-section'>
                        <h4>Placement order Addresss</h4>
                        <div className="my-3">
                            <label htmlFor="text" className="form-label">Username</label>
                            <div className="input-group">
                                {/* <span className="pe-2">
                                    <img src={usericon} />
                                </span> */}
                                <input type="text" className="form-control border-0 border-bottom" id="password" placeholder="Enter your name" />
                            </div>
                        </div>
                        <div className="my-3">
                            <label htmlFor="text" className="form-label">Email</label>
                            <div className="input-group">
                                {/* <span className="pe-2">
                                    <img src={mail} />
                                </span> */}
                                <input type="email" className="form-control border-0 border-bottom" id="email" placeholder="Enter your email" />
                            </div>
                        </div>
                        <div className="my-3">
                            <label htmlFor="text" className="form-label">Phone Number</label>
                            <div className="input-group">
                                <input type="text" className="form-control border-0 border-bottom" id="email" placeholder="Enter your Phone number" />
                            </div>
                        </div>
                        <div className="my-3">
                            <label htmlFor="text" className="form-label">Address</label>
                            <div className="input-group">
                                <textarea type="text" className="form-control border-0 border-bottom" id="email" placeholder="Enter your Address"></textarea>
                            </div>
                        </div>
                        <div className="my-3">
                            <label htmlFor="text" className="form-label">City</label>
                            <div className="input-group">
                                <input type="text" className="form-control border-0 border-bottom" id="email" placeholder="Enter your City" />
                            </div>
                        </div>
                        <div className="my-3">
                            <label htmlFor="text" className="form-label">State</label>
                            <div className="input-group">
                                <input type="text" className="form-control border-0 border-bottom" id="email" placeholder="Enter your State" />
                            </div>
                        </div>
                        <div className="my-3">
                            <label htmlFor="text" className="form-label">Pincode</label>
                            <div className="input-group">
                                <input type="text" className="form-control border-0 border-bottom" id="email" placeholder="Enter your Pincode" />
                            </div>
                        </div>
                        <div className="my-3">
                            <label htmlFor="text" className="form-label">Country</label>
                            <div className="input-group">
                                <input type="text" className="form-control border-0 border-bottom" id="email" placeholder="Enter your Country" />
                            </div>
                        </div>
                        <div className="container mt-5">
                            <div className="mb-3">
                                <label className="form-label">Select an option:</label>
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        id="option1"
                                        value="option1"
                                        checked={selectedOption === 'option1'}
                                        onChange={handleRadioChange}
                                    />
                                    <label className="form-check-label" htmlFor="option1">
                                        Debit Card and creditCard
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        id="option2"
                                        value="option2"
                                        checked={selectedOption === 'option2'}
                                        onChange={handleRadioChange}
                                    />
                                    <label className="form-check-label" htmlFor="option2">
                                        Cash on Delivery
                                    </label>
                                </div>
                            </div>

                            {selectedOption && (
                                <div className="alert alert-info">
                                    {/* This div will be displayed when a radio button is selected */}
                                    {selectedOption === 'option1' ? (
                                        <>
                                            <form onSubmit={handleSubmit}>
                                                <div className="mb-3">
                                                    <label htmlFor="cardNumber" className="form-label">
                                                        Card Number
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="cardNumber"
                                                        name="cardNumber"
                                                        value={formData.cardNumber}
                                                        onChange={handleChange}
                                                        placeholder="Enter your cardNumber"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="cardHolder" className="form-label">
                                                        Card Holder
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="cardHolder"
                                                        name="cardHolder"
                                                        value={formData.cardHolder}
                                                        onChange={handleChange}
                                                        placeholder="Enter Your Holder Name"
                                                        required
                                                    />
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="expirationDate" className="form-label">
                                                            Expiration Date
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="expirationDate"
                                                            name="expirationDate"
                                                            value={formData.expirationDate}
                                                            onChange={handleChange}
                                                            placeholder="MM/YY"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <label htmlFor="cvv" className="form-label">
                                                            CVV
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="cvv"
                                                            name="cvv"
                                                            value={formData.cvv}
                                                            onChange={handleChange}
                                                            placeholder="Enter your CVV"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </form>

                                        </>
                                    ) : (
                                        <>
                                            <div className="form-check">
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    id="yes"
                                                    value="yes"
                                                />
                                                <label className="form-check-label" htmlFor="option2">
                                                    Yes
                                                </label>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className='btn-section container-60'>
                            <button className='button'>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}
export default ProductOrderForm;
