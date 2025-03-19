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
import Checkout from './components/Checkout';
import products from './sample products/sampleProducts';
import Orders from './components/Orders';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]);
  const [userDetails, setUserDetails] = useState({
    userId: '',
    username: '',
    email: '',
    address: {
      line01: '',
      line02: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    }
  });
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

    const userId = getCookie('userId');
    const username = getCookie('username');
    const email = getCookie('email');

    if (userId && username && email) {
      setUserDetails({ userId, username, email });
      setIsLoggedIn(true);
    }
  }, []);

  // Add to Cart Function
  const addToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
    setItems([...items, { productId: product.id, quantity: 1 }]);
  };

  // Clear Cart function
  const clearCart = () => {
    setCart([]);
    setItems([]);
  };

  // Remove from Cart function
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
    setItems(items.filter(item => item.productId !== productId));
  };

  // Update Item Quantity Function
  const updateItemQuantity = (productId, quantity) => {
    setCart(cart.map(item => item.id === productId ? { ...item, quantity } : item));
    setItems(items.map(item => item.productId === productId ? { ...item, quantity } : item));
  };

  // Handle Login Success
  const handleLoginSuccess = (userId, username, email) => {
    setIsLoggedIn(true);
    setUserDetails({ userId, username, email });
    alert(`Logged in Successfully`);
    navigate('/');  // Redirect to Home after login
    window.location.reload();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserDetails({ userId: '', username: '', email: '' });
    document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    alert(`Logged out Successfully`);
  };

  // Handle Register Success
  const handleRegisterSuccess = (userId, username, email) => {
    setIsLoggedIn(true);
    setUserDetails({ userId, username, email });
    alert(`Registered Successfully`);
    navigate('/');  // Redirect to Home after registration
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartCount={cart.length} isLoggedIn={isLoggedIn} userName={userDetails.username} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductPage products={products} addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} updateItemQuantity={updateItemQuantity} isLoggedIn={isLoggedIn} clearCart={clearCart} removeFromCart={removeFromCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} userDetails={userDetails} items={items} clearCart={clearCart} />} />
        <Route path="/payment" element={<Payment clearCart={() => setCart([])} />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} setCookie={setCookie} />} />
        <Route path="/register" element={<Register onRegisterSuccess={handleRegisterSuccess} setCookie={setCookie} />} />
        <Route path="/profile" element={<Profile userDetails={userDetails} />} />
        <Route path="/update-address" element={<UpdateAddress userDetails={userDetails} />} />
        <Route path="/my-orders" element={<Orders userDetails={userDetails} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
