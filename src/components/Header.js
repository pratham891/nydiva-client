import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShoppingCart } from 'lucide-react';
import '../App.css';

const Header = ({ cartCount, isLoggedIn, userName, onLogout }) => {
  const navigate = useNavigate();
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const profileRef = useRef();

  // Close the popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfilePopup(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex justify-between items-center p-2 bg-white shadow-md sticky top-0 z-50">
      {/* Logo - Navigates to Home */}
      <div className="flex items-center">
        <img
          src="/image/logo.jpeg"
          alt="Shop Logo"
          className="w-20 h-20 object-contain cursor-pointer"
          onClick={() => navigate('/')}
        />
      </div>

      {/* Cart and Profile Icons */}
      <div className="flex items-center space-x-6 relative">
        {/* Cart Icon */}
        <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
          <ShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartCount}
            </span>
          )}
        </div>

        {/* Profile Icon */}
        <div ref={profileRef} className="relative">
          <User
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              if (isLoggedIn) {
                setShowProfilePopup(!showProfilePopup);
              } else {
                navigate('/login');
              }
            }}
          />

          {/* Profile Popup */}
          {showProfilePopup && (
            <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg">
              <p className="px-4 py-2 text-gray-800 font-medium cursor-pointer" onClick={() => navigate('/profile')}>View Profile</p>

              <p className="px-4 py-1 text-gray-800 font-medium cursor-pointer" onClick={() => navigate('/my-orders')}>View My Orders</p>

              <button
                onClick={() => {
                  onLogout();
                  navigate('/');
                  setShowProfilePopup(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
