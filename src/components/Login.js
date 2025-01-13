import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();  // Initialize useNavigate

  return (
    <main className="flex-grow flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form 
          className="space-y-4" 
          onSubmit={(e) => {
            e.preventDefault(); 
            onLoginSuccess();  // Calls the function passed from App.js
          }}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
          <p className="text-center mt-4">
            <span 
              className="text-blue-600 cursor-pointer hover:underline" 
              onClick={() => navigate('/register')}  // Navigate to Register page
            >
              Create an account
            </span>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
