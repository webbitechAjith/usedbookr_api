import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Common/pages/Header';
import Footer from '../Common/pages/Footer';

const Orderprocess = () => {
    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    const nextTab = () => {
        setActiveTab(activeTab + 1);
    };

    const prevTab = () => {
        setActiveTab(activeTab - 1);
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
    const renderTabContent = () => {
        switch (activeTab) {
            case 1:
                return <div>
                    <div className='login-section'>
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
                    </div>
                </div>;
            case 2:
                return <div>
                    <div className='login-section'>
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
                    </div>
                </div>;
            case 3:
                return <div>
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
                    <div className='order-confirm text-end'>
                        <button>OrderConfirm</button>
                    </div>
                </div>;
            default:
                return null;
        }
    };

    return (
        <>
            <Header />
            <div className="w-50 mx-auto  my-5">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 1 ? 'active' : ''}`}
                            onClick={() => handleTabClick(1)}
                        >
                            User Details
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 2 ? 'active' : ''}`}
                            onClick={() => handleTabClick(2)}
                        >
                            Address
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 3 ? 'active' : ''}`}
                            onClick={() => handleTabClick(3)}
                        >
                            payment
                        </button>
                    </li>
                </ul>

                <div className="tab-content mt-3">
                    {renderTabContent()}
                </div>

                <div className="mt-3">
                    {activeTab > 1 && (
                        <button className="btn btn-success me-2" onClick={prevTab}>
                            Previous
                        </button>
                    )}
                    {activeTab < 3 && (
                        <button className="btn btn-color" onClick={nextTab}>
                            Next
                        </button>
                    )}
                </div>
            </div>
            <Footer />
        </>

    );
};

export default Orderprocess;
