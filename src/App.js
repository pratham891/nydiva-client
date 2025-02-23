import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import ProductPage from './components/ProductPage';
import Cart from './components/Cart';
import Payment from './components/Payment';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import UpdateAddress from './components/UpdateAddress';
import products from './sample products/sampleProducts';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [userDetails, setUserDetails] = useState({ username: '', email: '', address: {
    line01: '',
    line02: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  } });
  const navigate = useNavigate();

  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  };

  // read cookie on App on load
  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const username = getCookie('username');
    const email = getCookie('email');

    if (username && email) {
      setUserDetails({ username, email });
      setIsLoggedIn(true);
    }
  }, []);

  // Add to Cart Function
  const addToCart = (product) => setCart([...cart, product]);

  // Handle Login Success
  const handleLoginSuccess = (username, email) => {
    setIsLoggedIn(true);
    setUserDetails({ username, email });
    alert(`Logged in Successfully`);
    navigate('/');  // Redirect to Home after login
    window.location.reload();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserDetails({ username: '', email: '' });
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    alert(`Logged out Successfully`);
  };

  // Handle Register Success
  const handleRegisterSuccess = (username, email) => {
    setIsLoggedIn(true);
    setUserDetails({ username, email });
    alert(`Registered Successfully`);
    navigate('/');  // Redirect to Home after registration
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartCount={cart.length} isLoggedIn={isLoggedIn} userName={userDetails.username} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductPage products={products} addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} />} />
        <Route path="/payment" element={<Payment clearCart={() => setCart([])} />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} setCookie={setCookie} />} />
        <Route path="/register" element={<Register onRegisterSuccess={handleRegisterSuccess} setCookie={setCookie} />} />
        <Route path="/profile" element={<Profile userDetails={userDetails} />} />
        <Route path="/update-address" element={<UpdateAddress userDetails={userDetails} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
