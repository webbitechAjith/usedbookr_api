import React, { useEffect } from 'react';
import { useParams,BrowserRouter, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import 'font-awesome/css/font-awesome.min.css';


import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/400.css"; // Specify weight
import "@fontsource/poppins/400-italic.css"; // Specify weight and style

import Login from './Domain/Login'
import Register from './Domain/Register'
import Home from './Domain/Home';
import Product from './Domain/Product';
import Description from './Domain/Description';
import Profile from './Domain/Profile';
import History from './Domain/History';
import Wishlist from './Domain/Wishlist';
import Purchase from './Domain/Purchase';
import Placeorder from './Domain/Placeorder';
import Address from './Domain/Address';
import ProductOrderForm from './Domain/ProductOrderForm';
import Orderprocess from './Domain/Orderprocess';
import Forgetpassword from './Domain/Forgetpassword';
import Resetpassword from './Domain/Resetpassword';
import Fdfd from './Domain/Fdfd';
import Autherfliter from './Domain/Authorfliter';
import OTPForm from './Domain/OTPForm';
import Contact from './Domain/Contact';
import Categorybook from './Common/pages/Categorybook';
import About from './Domain/About';
import Newarrival from './Domain/Newarrival';
import Error from './Common/pages/Error';

function App() {
    
  const {id} = useParams();
  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll('.slide-up, .slide-left, .slide-right');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.75;

        if (isVisible) {
          card.classList.add('visible');
        } else {
          card.classList.remove('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <BrowserRouter basename='/demo1'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Forgetpassword' element={<Forgetpassword />} />
        <Route path='/Resetpassword' element={<Resetpassword />} />
        <Route path='/register' element={<Register />} />
        <Route path='/otpform' element={<OTPForm />} />
        <Route path='/Allproduct' element={<Product />} />
        {/* <Route path={`/Description/${id}`} element={<Description />} /> */}
        <Route path='/Description/:id' element={<Description />} />
        <Route path='/contact' element={<Contact />}/>
        <Route path='/Profile' element={<Profile />} />
        <Route path='/History' element={<History />} />
        <Route path='/Wishlist' element={<Wishlist />} />
        <Route path='/Purchase' element={<Purchase />}/>
        <Route path='/Placeorder' element={<Placeorder />}/>
        <Route path='/ProductOrderForm' element={<ProductOrderForm />}/>
        <Route path='/Orderprocess' element={<Orderprocess />} />
        <Route path='/authors' element={<Autherfliter />} />
        <Route path='/categorybook' element={<Categorybook />} />
        <Route path='/newarrival' element={<Newarrival />} />
        <Route path='/about' element={<About />} />
        {/* <Route path='*' element={<Error />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
