import React, { useEffect, useState } from 'react'
import Header from '../Common/pages/Header'
import Footer from '../Common/pages/Footer'
import Useraside from '../Common/pages/Useraside'

import '../Common/assets/css/profile.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faEdit, faPencil } from '@fortawesome/free-solid-svg-icons';

import profile from '../Common/assets/image/profile.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { otpToken, profileImage } from '../Common/pages/apiBaseurl'
import { setProfileUpload, setRegisterToken } from '../Redux/CreateSlice'
import { useNavigate } from 'react-router-dom'

function Profile() {
    const { registerToken, userLogin, userProfileImage } = useSelector((state) => state.usedbookr_product)
    const [imageUrl, setImageUrl] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tokenGet = async () => {
        try {
            const localRegisterToken = localStorage.getItem('usedbookrtoken');
            const response_token = await otpToken(localRegisterToken);
            const data_value = response_token.user;
            dispatch(setRegisterToken({ username: data_value.username, email: data_value.email, name: data_value.name, phonenumber: data_value.phone_number, profile: data_value.profile_img }));
        } catch (error) {
            console.log('error', error)
        }
    }
    const imageupload = (file) => {
        // Here you can perform any additional processing or uploading of the image
        // For now, we'll just set the URL of the selected image to imageUrl state
        const reader = new FileReader();
        reader.onload = () => {
            setImageUrl(reader.result);
        };
        reader.readAsDataURL(file);
        dispatch(setProfileUpload({ "userfile": file }))
    };
    
    const updateProfile = async () => {
        try {
            const updateImage = await profileImage(userProfileImage);
            if (updateImage.success == true) {
                alert("Success your profile Update")
                window.location.reload();
            }
        } catch (error) {
            console.error("Error uploading profile image:", error);
        }
    }
    useEffect(() => {
        tokenGet()
        window.scrollTo(0, 0);
        const userAuth = localStorage.getItem('isLoginAuth')
        if (userAuth) {
            localStorage.setItem('isLoginAuth', userLogin)
            navigate('/profile')
        } else {
            navigate('/Login')
        }
    }, []);
    window.addEventListener("beforeunload", (event) => {
        tokenGet();
        console.log("API call before page reload", registerToken);
    });

    window.addEventListener("unload", (event) => {
        tokenGet();
        console.log("API call after page reload", registerToken);
    });
    return (
        <div className='profile-section'>
            <Header />
            <div className='account-section'>
                <div className='d-lg-block d-none'>
                    <div className='container-90 pt-5'>
                        <span className='profile-head'>Profile</span>
                        <div className='row m-0 py-3'>
                            <div className='col-3'>
                                <Useraside />
                            </div>
                            <div className='col-6'>
                                <div className='profile-card'>
                                    <div className='row m-0 pt-5'>
                                        <div className='col-3'>
                                            <div class="profile-container">
                                                {imageUrl?.length > 0 ? <><img src={imageUrl} class="profile-image" /></> : <>{registerToken.profile == '' ? <><img src={profile} class="profile-image" /></> : <><img src={registerToken.profile} alt={registerToken.profile} class="profile-image" /></>}</>}
                                                <div class="edit-icon">
                                                    <FontAwesomeIcon icon={faPencil} style={{ color: '#000' }}
                                                        onClick={() => {
                                                            const fileInput = document.createElement('input');
                                                            fileInput.type = 'file';
                                                            fileInput.accept = 'image/*';
                                                            fileInput.onchange = (event) => {
                                                                const file = event.target.files[0];
                                                                if (file) {
                                                                    // Here you can call your image upload function with the selected file
                                                                    imageupload(file);
                                                                }
                                                            };
                                                            fileInput.click();
                                                        }}

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-9 profile-title'>
                                            <h2>Profile</h2>
                                            <p>General Information</p>
                                        </div>
                                    </div>
                                    <div className='py-3'>
                                        <div className='row m-0'>
                                            <div className='col-6'>
                                                <div class="mb-3">
                                                    <label for="exampleInputFull name" class="form-label">Username</label>
                                                    <input type="text" class="form-control" placeholder='Victoria Nowak' value={registerToken.username} />
                                                </div>
                                            </div>
                                            <div className='col-6'>
                                                <div class="mb-3">
                                                    <label for="exampleInputFull name" class="form-label">Username</label>
                                                    <input type="text" class="form-control" placeholder='Victoria Nowak' value={registerToken.name} />
                                                </div>
                                            </div>
                                            <div className='col-6'>
                                                <div class="mb-3">
                                                    <label for="exampleInputFull name" class="form-label">Your email</label>
                                                    <input type="email" class="form-control" placeholder='victoria@gmail.com' value={registerToken.email} />
                                                </div>
                                            </div>
                                            <div className='col-6'>
                                                <div class="mb-3">
                                                    <label for="exampleInputFull name" class="form-label">Phone Number</label>
                                                    <input type="text" class="form-control" placeholder='09675 65623' value={registerToken.phonenumber} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-end'>
                                        <button type='button' onClick={() => updateProfile()}>Update <FontAwesomeIcon icon={faArrowRight} style={{ color: '#241D60' }} className='ps-2' /></button>
                                    </div>
                                </div>
                            </div>
                            <div className='col-3'>
                                <div className='profile-address'>
                                    <p>Billing Address</p>
                                    <h4>Victoria Nowak</h4>
                                    <p className='address m-0'>4140 Parker Rd. Allentown, New Mexico 31134</p>
                                    <h5>victoria@gmail.com</h5>
                                    <h5>(671) 555-0110</h5>
                                    <h6>Edit Address</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-lg-none d-block'>
                    <div className=''>
                        <Useraside />
                        <div className='row m-0 py-5'>
                            <div className='col-12'>
                                <span className='profile-head ms-0'>Profile</span>
                            </div>
                            <div className='col-12'>
                                <div className='profile-card'>
                                    <div className='row m-0 pt-5 align-items-center'>
                                        <div className='col-lg-3 col-md-3 col-sm-3 col-3 pe-0'>
                                            <div class="profile-container">
                                                {imageUrl?.length > 0 ? <><img src={imageUrl} class="profile-image" /></> : <>{registerToken.profile == '' ? <><img src={profile} class="profile-image" /></> : <><img src={registerToken.profile} alt={registerToken.profile} class="profile-image" /></>}</>}
                                                {/* <div class="edit-icon">
                                                    <FontAwesomeIcon icon={faPencil} style={{ color: '#000' }}
                                                        onClick={() => {
                                                            const fileInput = document.createElement('input');
                                                            fileInput.type = 'file';
                                                            fileInput.accept = 'image/*';
                                                            fileInput.onchange = (event) => {
                                                                const file = event.target.files[0];
                                                                if (file) {
                                                                    // Here you can call your image upload function with the selected file
                                                                    imageupload(file);
                                                                }
                                                            };
                                                            fileInput.click();
                                                        }}

                                                    />
                                                </div> */}
                                            </div>
                                        </div>
                                        <div className='col-lg-9 col-md-9 col-sm-9 col-9 profile-title'>
                                            <div className='row m-0'>
                                                <div className='col-md-8 col-sm-9 col-12'>
                                                    <h2>Profile</h2>
                                                    <p>General Information</p>
                                                </div>
                                                <div className='col-md-4 col-sm-3 col-12'>
                                                    <div class="edit-icon">
                                                        {/* <img src={edit} /> */}
                                                        <div class="edit-icon">
                                                            <FontAwesomeIcon icon={faPencil} style={{ color: '#000' }}
                                                                onClick={() => {
                                                                    const fileInput = document.createElement('input');
                                                                    fileInput.type = 'file';
                                                                    fileInput.accept = 'image/*';
                                                                    fileInput.onchange = (event) => {
                                                                        const file = event.target.files[0];
                                                                        if (file) {
                                                                            // Here you can call your image upload function with the selected file
                                                                            imageupload(file);
                                                                        }
                                                                    };
                                                                    fileInput.click();
                                                                }}

                                                            /><span className='ms-2'>Edit</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='py-3'>
                                        <div className='row m-0'>
                                            <div className='col-lg-6 col-md-6 col-12'>
                                                <div class="mb-3">
                                                    <label for="exampleInputFull name" class="form-label">User name</label>
                                                    <input type="text" class="form-control" placeholder='Victoria Nowak' value={registerToken.username} />
                                                </div>
                                            </div>
                                            <div className='col-lg-6 col-md-6 col-12'>
                                                <div class="mb-3">
                                                    <label for="exampleInputFull name" class="form-label">Name</label>
                                                    <input type="text" class="form-control" placeholder='name' value={registerToken.name} />
                                                </div>
                                            </div>
                                            <div className='col-lg-6 col-md-6 col-12'>
                                                <div class="mb-3">
                                                    <label for="exampleInputFull name" class="form-label">Your email</label>
                                                    <input type="email" class="form-control" placeholder='victoria@gmail.com' value={registerToken.email} />
                                                </div>
                                            </div>
                                            <div className='col-lg-6 col-md-6 col-12'>
                                                <div class="mb-3">
                                                    <label for="exampleInputFull name" class="form-label">Phone Number</label>
                                                    <input type="text" class="form-control" placeholder='09675 65623' value={registerToken.phonenumber} />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='text-end'>
                                        <button>Update <FontAwesomeIcon icon={faArrowRight} style={{ color: '#241D60' }} className='ps-2' /></button>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 my-4'>
                                <div className='profile-address'>
                                    <p>Billing Address</p>
                                    <h4>Victoria Nowak</h4>
                                    <p className='address m-0'>4140 Parker Rd. Allentown, New Mexico 31134</p>
                                    <h5>victoria@gmail.com</h5>
                                    <h5>(671) 555-0110</h5>
                                    <h6>Edit Address</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Profile