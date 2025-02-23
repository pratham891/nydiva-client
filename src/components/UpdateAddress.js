import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateAddress = ({ userDetails }) => {
  const initialAddress = userDetails.address || {
    line01: '',
    line02: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  };

  const [address, setAddress] = useState(initialAddress);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleUpdateAddress = async () => {
    // console.log('Updating address:', JSON.stringify({address}));
    
    try {
      const response = await fetch(`/api/user/${userDetails.email}/update-address`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(address),
      });

      if (response.ok) {
        alert('Address updated successfully');
        navigate('/profile');
      } else {
        console.error('Failed to update address');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <main className="flex-grow p-8 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Update Address</h2>
        <div className="space-y-4">
          <input type="text" name="line01" value={address.line01} onChange={handleChange} placeholder="Line 01" className="w-full p-2 border rounded" />
          <input type="text" name="line02" value={address.line02} onChange={handleChange} placeholder="Line 02" className="w-full p-2 border rounded" />
          <input type="text" name="city" value={address.city} onChange={handleChange} placeholder="City" className="w-full p-2 border rounded" />
          <input type="text" name="state" value={address.state} onChange={handleChange} placeholder="State" className="w-full p-2 border rounded" />
          <input type="text" name="zip" value={address.zip} onChange={handleChange} placeholder="ZIP" className="w-full p-2 border rounded" />
          <input type="text" name="country" value={address.country} onChange={handleChange} placeholder="Country" className="w-full p-2 border rounded" />
          <button onClick={handleUpdateAddress} className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700">Update Address</button>
        </div>
      </div>
    </main>
  );
};

export default UpdateAddress;