import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Profile = ({ userDetails }) => {
  const [profileDetails, setProfileDetails] = useState({
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

  useEffect(() => {
    // Fetch user details from the backend
    const fetchProfileDetails = async () => {
      try {
        const response = await fetch(`/api/user/${userDetails.email}`);
        if (response.ok) {
          const data = await response.json();
          setProfileDetails({
            username: data.name,
            email: data.email,
            address: data.address && data.address.length > 0 ? {
              line01: data.address[0].line01 || '',
              line02: data.address[0].line02 || '',
              city: data.address[0].city || '',
              state: data.address[0].state || '',
              zip: data.address[0].zip || '',
              country: data.address[0].country || ''
            } : {
              line01: '',
              line02: '',
              city: '',
              state: '',
              zip: '',
              country: ''
            }
          });
        } else {
          console.error('Failed to fetch profile details');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProfileDetails();
  }, [userDetails.email]);

  const isAddressEmpty = !profileDetails.address.line01 && !profileDetails.address.line02 && !profileDetails.address.city && !profileDetails.address.state && !profileDetails.address.zip && !profileDetails.address.country;

  return (
    <main className="flex-grow p-8 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">User Profile</h2>
        <p><strong>Username:</strong> {profileDetails.username}</p>
        <p><strong>Email:</strong> {profileDetails.email}</p>
        <h3 className="text-xl font-bold mt-6">Address</h3>
        <div>
          {isAddressEmpty ? (
            <p>No Address added yet</p>
          ) : (
            <p>{`${profileDetails.address.line01}, ${profileDetails.address.line02}, ${profileDetails.address.city}, ${profileDetails.address.state}, ${profileDetails.address.zip}, ${profileDetails.address.country}`}</p>
          )}
        </div>
        <Link to="/update-address" className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700 mt-4 inline-block">Update Address</Link>
      </div>
    </main>
  );
};

export default Profile;