import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();  // Initialize useNavigate

  return (
    <main
      className="flex-grow flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/image/hero.png')" }}  // Background image remains
    >
      <button
        onClick={() => navigate('/products')}  // Navigate to the products page
        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
      >
        Explore Our Products
      </button>
    </main>
  );
};

export default Home;
