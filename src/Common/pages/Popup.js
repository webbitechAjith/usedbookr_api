// App.js

import React, { useState, useEffect } from "react";
import Modal from "./Modal";

import '../assets/css/main.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCheck, faClose, faHeart } from '@fortawesome/free-solid-svg-icons';

import model from '../assets/image/model.png'
import SimpleSlider from "./SimpleSlider";
import book1 from '../assets/image/book_1.png';
import book2 from '../assets/image/book_2.png';





export default function App() {
	const [open, setOpen] = React.useState(false);
	const [showPopUp, setShowPopUp] = useState(false);
	const showPopupHandler = () => setShowPopUp(true)

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};
	useEffect(() => {
		const timer = setTimeout(() => {
			setShowPopUp(false);
			handleOpen()
		}, 5000);
		// I will be deleted while component is unmounting.
		return () => clearTimeout(timer)

	}, [showPopUp])
	return (
		<div
			style={{
				textAlign: "center",
				display: "block",
				margin: "auto",
			}}
		>

			<Modal isOpen={open}>
				<div className="float-end handleclose" >
					<FontAwesomeIcon icon={faClose} className="close-btn" onClick={() => handleClose()} />
				</div>
				<div className="popup">
					<div className="row m-0">
						<div className="col-lg-6 col-12">
							<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
								<div class="carousel-indicators">
									<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
									<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
									<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
									<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
								</div>
								<div class="carousel-inner h-100">
									<div class="carousel-item active h-100">
										<img src={model} className='w-100 h-100' />
									</div>
									<div class="carousel-item h-100">
										<img src={model} className='w-100 h-100' />
									</div>
									<div class="carousel-item h-100">
										<img src={model} className='w-100 h-100' />
									</div>
									<div class="carousel-item h-100">
										<img src={model} className='w-100 h-100' />
									</div>
								</div>
								<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
									<FontAwesomeIcon icon={faArrowLeft} style={{ color: 'green' }} className='arrow-section' />
									<span class="visually-hidden">Previous</span>
								</button>
								<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
									<FontAwesomeIcon icon={faArrowRight} style={{ color: 'green' }} className='arrow-section' />
									<span class="visually-hidden">Next</span>
								</button>
							</div>
						</div>
						<div className="col-lg-6 col-12 pt-lg-0 pt-3 contact-box">
							<div className="popup p-5">
								<h1>Subcribe to Our Newsletter</h1>
								<p className="">Subscribe to our newsletter and Save your <span>20% money</span> with discount code today.</p>
								<div className="input-group input-set my-5">
									<input type="text" className="form-control" placeholder="Your email address" aria-label="Search" aria-describedby="searchButton" />
									<button className="btn" type="button" id="searchButton">Subscribe</button>
								</div>
								<input type="checkbox" /><span className="ms-2 check-content">Do not show this window</span>
							</div>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
}
