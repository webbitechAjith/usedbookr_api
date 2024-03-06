import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Common/pages/Header';
import Footer from '../Common/pages/Footer';
import { setOrderDetails } from '../Redux/CreateSlice';
import { useDispatch, useSelector } from 'react-redux';




// api call fn path 
import { orderPlace, userRegister } from '../Common/pages/apiBaseurl'


const Orderprocess = () => {
    const { orderDetails } = useSelector((state) => state.usedbookr_product)
    const [activeTab, setActiveTab] = useState(1);

    const dispatch = useDispatch();

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
    const handlePayment = (e) => {
        dispatch(setOrderDetails({ ...orderDetails, paymentmode: e.target.value }));
      };
    const orderPlacess = async () => {
        const isEmpty = Object.values(orderDetails).some(value => value === "");
        if (isEmpty) {
            alert("Please fill in all the fields.");
            return;
        } else {
            try {
                const response = await orderPlace(orderDetails);
                console.log(response)
                if (response.success == true) {
                    alert(response.message);
                }
                // Handle the API response
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log(formData);
    };
    console.log(1515, orderDetails);
    const renderTabContent = () => {
        switch (activeTab) {
            case 1:
                return <div>
                    <div className='login-section'>
                        <div className="my-3">
                            <label htmlFor="text" className="form-label">Username</label>
                            <div className="input-group">
                                <input type="text" className="form-control border-0 border-bottom" id="password" placeholder="Enter your name" required onChange={(e) => dispatch(setOrderDetails({ ...orderDetails, name: e.target.value }))} />
                            </div>
                        </div>
                        <div className="my-3">
                            <label htmlFor="text" className="form-label">Email</label>
                            <div className="input-group">
                                {/* <span className="pe-2">
                                    <img src={mail} />
                                </span> */}
                                <input type="email" className="form-control border-0 border-bottom" id="email" placeholder="Enter your email" required onChange={(e) => dispatch(setOrderDetails({ ...orderDetails, email: e.target.value }))} />
                            </div>
                        </div>
                        <div className="my-3">
                            <label htmlFor="text" className="form-label">Phone Number</label>
                            <div className="input-group">
                                <input type="text" className="form-control border-0 border-bottom" id="email" placeholder="Enter your Phone number" required onChange={(e) => dispatch(setOrderDetails({ ...orderDetails, mobile_no: e.target.value }))} />
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
                                <textarea type="text" className="form-control border-0 border-bottom" id="email" placeholder="Enter your Address" required onChange={(e) => dispatch(setOrderDetails({ ...orderDetails, address: e.target.value }))}></textarea>
                            </div>
                        </div>
                        <div className="my-3">
                            <label htmlFor="text" className="form-label">City</label>
                            <div className="input-group">
                                <input type="text" className="form-control border-0 border-bottom" id="email" placeholder="Enter your City" required onChange={(e) => dispatch(setOrderDetails({ ...orderDetails, state: e.target.value }))} />
                            </div>
                        </div>
                        <div className="my-3">
                            <label htmlFor="text" className="form-label">State</label>
                            <div className="input-group">
                                <input type="text" className="form-control border-0 border-bottom" id="email" placeholder="Enter your State" required onChange={(e) => dispatch(setOrderDetails({ ...orderDetails, city: e.target.value }))} />
                            </div>
                        </div>
                        <div className="my-3">
                            <label htmlFor="text" className="form-label">Pincode</label>
                            <div className="input-group">
                                <input type="text" className="form-control border-0 border-bottom" id="email" placeholder="Enter your Pincode" required onChange={(e) => dispatch(setOrderDetails({ ...orderDetails, pincode: e.target.value }))} />
                            </div>
                        </div>
                        <div className="my-3">
                            <label htmlFor="text" className="form-label">Paymentmode</label>
                            <div className="input-group">
                                <select onChange={handlePayment} className='form-control'>
                                    <option>Select the payment method</option>
                                    <option value="COD">COD</option>
                                </select>
                                {/* <input type="text"  ="form-control border-0 border-bottom" id="email" placeholder="Enter your Pincode" required onChange={(e) => dispatch(setOrderDetails({ ...orderDetails, paymentmode: e.target.value }))} /> */}
                            </div>
                        </div>
                        <div className='order-confirm text-end'>
                            <button type='button' onClick={() => orderPlacess()}>OrderConfirm</button>
                        </div>
                    </div>
                </div>;
            // case 3:
            //     return <div>
            //         <form onSubmit={handleSubmit}>
            //             <div className="mb-3">
            //                 <label htmlFor="cardNumber" className="form-label">
            //                     Card Number
            //                 </label>
            //                 <input
            //                     type="text"
            //                     className="form-control"
            //                     id="cardNumber"
            //                     name="cardNumber"
            //                     value={formData.cardNumber}
            //                     onChange={handleChange}
            //                     placeholder="Enter your cardNumber"
            //                     required
            //                 />
            //             </div>
            //             <div className="mb-3">
            //                 <label htmlFor="cardHolder" className="form-label">
            //                     Card Holder
            //                 </label>
            //                 <input
            //                     type="text"
            //                     className="form-control"
            //                     id="cardHolder"
            //                     name="cardHolder"
            //                     value={formData.cardHolder}
            //                     onChange={handleChange}
            //                     placeholder="Enter Your Holder Name"
            //                     required
            //                 />
            //             </div>
            //             <div className="row">
            //                 <div className="col-md-6 mb-3">
            //                     <label htmlFor="expirationDate" className="form-label">
            //                         Expiration Date
            //                     </label>
            //                     <input
            //                         type="text"
            //                         className="form-control"
            //                         id="expirationDate"
            //                         name="expirationDate"
            //                         value={formData.expirationDate}
            //                         onChange={handleChange}
            //                         placeholder="MM/YY"
            //                         required
            //                     />
            //                 </div>
            //                 <div className="col-md-6 mb-3">
            //                     <label htmlFor="cvv" className="form-label">
            //                         CVV
            //                     </label>
            //                     <input
            //                         type="text"
            //                         className="form-control"
            //                         id="cvv"
            //                         name="cvv"
            //                         value={formData.cvv}
            //                         onChange={handleChange}
            //                         placeholder="Enter your CVV"
            //                         required
            //                     />
            //                 </div>
            //             </div>
            //         </form>
            //         <div className='order-confirm text-end'>
            //             <button>OrderConfirm</button>
            //         </div>
            //     </div>;
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
                    {/* <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 3 ? 'active' : ''}`}
                            onClick={() => handleTabClick(3)}
                        >
                            payment
                        </button>
                    </li> */}
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
                    {activeTab < 2 && (
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
