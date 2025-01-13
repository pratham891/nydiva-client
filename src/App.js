import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import ProductPage from './components/ProductPage';
import Cart from './components/Cart';
import Payment from './components/Payment';
import Login from './components/Login';
import Register from './components/Register';
import products from './sample products/sampleProducts';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Add to Cart Function
  const addToCart = (product) => setCart([...cart, product]);

  // Handle Login Success
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    navigate('/');  // Redirect to Home after login
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartCount={cart.length} isLoggedIn={isLoggedIn} />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Pass products and addToCart to ProductPage */}
        <Route
          path="/products"
          element={<ProductPage products={products} addToCart={addToCart} />}
        />

        <Route path="/cart" element={<Cart cart={cart} />} />
        <Route path="/payment" element={<Payment />} />

        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />



        <Route path="/payment" element={<Payment clearCart={() => setCart([])} />} />

        <Route
          path="/register"
          element={<Register />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
