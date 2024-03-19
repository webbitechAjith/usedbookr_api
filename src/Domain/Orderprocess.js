import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Common/pages/Header';
import Footer from '../Common/pages/Footer';
import { setOrderDetails, setRegisterToken } from '../Redux/CreateSlice';
import { useDispatch, useSelector } from 'react-redux';




// api call fn path 
import { orderPlace, otpToken, userRegister } from '../Common/pages/apiBaseurl'
import { useNavigate } from 'react-router-dom';


const Orderprocess = () => {
    const { orderDetails, registerToken, userLogin } = useSelector((state) => state.usedbookr_product)
    const [activeTab, setActiveTab] = useState(1);

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };
    const tokenGet = async () => {
        try {
            const localRegisterToken = localStorage.getItem('usedbookrtoken');
            const response_token = await otpToken(localRegisterToken);
            // console.log(response_token)
            const data_value = response_token.user;
            dispatch(setRegisterToken({ username: data_value.username, email: data_value.email, name: data_value.name, phonenumber: data_value.phone_number, profile: data_value.profile_img }));
            dispatch(setOrderDetails({ email: data_value.email, name: data_value.name, mobile_no: data_value.phone_number }));
        } catch (error) {
            console.log('error', error)
        }
    }
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
    const handlePayment = (e) => {
        dispatch(setOrderDetails({ ...orderDetails, paymentmode: e.target.value }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log(formData);
    };
    // useEffect(() => {

    // }, []); // Empty dependency array means this effect runs only once on component mount
    useEffect(() => {
        tokenGet()
        window.scrollTo(0, 0);


        // Logic to fetch initial values from somewhere (localStorage, API, etc.)
        const initialOrderDetails = {
            name: orderDetails.name,
            email: orderDetails.email,
            mobile_no: orderDetails.phonenumber,
            state: "",
            city: "",
            pincode: "",
            address: "",
            paymentmode: ""
        };
        dispatch(setOrderDetails(initialOrderDetails));
    }, []);
    const orderPlacess = async () => {
        const isEmpty = Object.values(orderDetails).some(value => value === "");
        if (isEmpty) {
            alert("Please fill in all the fields.");
            return;
        } else {
            try {
                const response = await orderPlace(orderDetails);
                console.log("response",response)
                if (response.success == true) {
                    alert(response.message);
                }
                if (response.message == 'Please redirect to url') {
                    // window.location.href = response.data.redirect_url;
                    window.open(response.data.redirect_url, '_blank')
                    // alert("ajith")
                    // navigate('/paymentinvoice');
                }
                // Handle the API response
            } catch (error) {
                console.log(error);
            }
        }
    }
    // console.log(1010101, orderDetails)
    window.addEventListener("beforeunload", (event) => {
        tokenGet();
        console.log("API call before page reload", registerToken);
    });

    window.addEventListener("unload", (event) => {
        tokenGet();
        console.log("API call after page reload", registerToken);
    });
    // Event handler to update state values based on user input
    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(setOrderDetails({ ...orderDetails, [name]: value }));
    };


    const renderTabContent = () => {
        switch (activeTab) {
            case 1:
                return <div>
                    <div className='login-section'>
                        <div className="my-3">
                            <label htmlFor="text" className="form-label">Username</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control border-0 border-bottom"
                                    id="username"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={orderDetails.name}
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="my-3">
                            <label htmlFor="text" className="form-label">Email</label>
                            <div className="input-group">
                                <input
                                    type="email"
                                    className="form-control border-0 border-bottom"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={orderDetails.email}
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="my-3">
                            <label htmlFor="text" className="form-label">Phone Number</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control border-0 border-bottom"
                                    id="phonenumber"
                                    name="mobile_no"
                                    placeholder="Enter your Phone number"
                                    value={orderDetails.mobile_no}
                                    required
                                    onChange={handleChange}
                                />
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
                                <textarea type="text" className="form-control border-0 border-bottom" placeholder="Enter your Address" required onChange={(e) => dispatch(setOrderDetails({ ...orderDetails, address: e.target.value }))}></textarea>
                            </div>
                        </div>
                        <div className="my-3">
                            <label htmlFor="text" className="form-label">City</label>
                            <div className="input-group">
                                <input type="text" className="form-control border-0 border-bottom" placeholder="Enter your City" required onChange={(e) => dispatch(setOrderDetails({ ...orderDetails, city: e.target.value }))} />
                            </div>
                        </div>
                        <div className="my-3">
                            <label htmlFor="text" className="form-label">State</label>
                            <div className="input-group">
                                <input type="text" className="form-control border-0 border-bottom" placeholder="Enter your State" required onChange={(e) => dispatch(setOrderDetails({ ...orderDetails, state: e.target.value }))} />
                            </div>
                        </div>
                        <div className="my-3">
                            <label htmlFor="text" className="form-label">Pincode</label>
                            <div className="input-group">
                                <input type="number" className="form-control border-0 border-bottom" placeholder="Enter your Pincode" required onChange={(e) => dispatch(setOrderDetails({ ...orderDetails, pincode: e.target.value }))} />
                            </div>
                        </div>
                        <div className="my-3">
                            <label htmlFor="text" className="form-label">Paymentmode</label>
                            <div className="input-group">
                                <select onChange={handlePayment} className='form-control'>
                                    <option>Select the payment method</option>
                                    {/* <option value="COD">COD</option> */}
                                    <option value="ONLINE">ONLINE</option>
                                </select>
                                {/* <input type="text"  ="form-control border-0 border-bottom" id="email" placeholder="Enter your Pincode" required onChange={(e) => dispatch(setOrderDetails({ ...orderDetails, paymentmode: e.target.value }))} /> */}
                            </div>
                        </div>
                        <div className='order-confirm text-end'>
                            <button type='button' onClick={() => orderPlacess()}>OrderConfirm</button>
                        </div>
                    </div>
                </div>;
            default:
                return null;
        }
    };
    return (
        <>
            <Header />
            <div className="w-75 mx-auto  my-5">
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
                    {/* {activeTab > 1 && (
                        <button className="btn btn-success me-2" onClick={prevTab}>
                            Previous
                        </button>
                    )} */}
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
