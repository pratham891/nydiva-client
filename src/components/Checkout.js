import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cart, userDetails, items }) => {
  const [paymentMode, setPaymentMode] = useState('');
  const [address, setAddress] = useState({
    line01: '',
    line02: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await fetch(`/api/user/${userDetails.email}`);
        if (response.ok) {
          const data = await response.json();
          setAddress(data.address && data.address.length > 0 ? data.address[0] : {
            line01: '',
            line02: '',
            city: '',
            state: '',
            zip: '',
            country: ''
          });
        } else {
          console.error('Failed to fetch address');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchAddress();
  }, [userDetails.email]);

  const handlePaymentModeChange = (e) => {
    setPaymentMode(e.target.value);
  };

  const handleProceedToPayment = async () => {
    if (paymentMode) {
      try {

        console.log({
          body: JSON.stringify({
            userEmail: userDetails.email,
            items,
            totalPrice: items.reduce((acc, item) => acc + item.price * item.quantity, 0),
          })
        });


        const response = await fetch('http://localhost:5000/api/orders/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userEmail: userDetails.email,
            items,
            totalPrice: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Order created successfully:', data);
        } else {
          console.error('Error creating order:', response.statusText);
          return;
        }

        navigate('/payment', { state: { paymentMode } });
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      alert('Please select a payment mode');
    }
  };

  return (
    <main className="flex-grow p-8 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>
        <p className="mb-4">Kindly confirm the following details before moving to payment:</p>
        <p><strong>Username:</strong> {userDetails.username}</p>
        <p><strong>Email:</strong> {userDetails.email}</p>
        <h3 className="text-xl font-bold mt-6">Address</h3>
        <div>
          <p>{`${address.line01}, ${address.line02}, ${address.city}, ${address.state}, ${address.zip}, ${address.country}`}</p>
        </div>
        <h3 className="text-xl font-bold mt-6">Items</h3>
        <div>
          {items.map((item, index) => (
            <p key={index}>{`Product ID: ${item.productId}, Quantity: ${item.quantity}`}</p>
          ))}
        </div>
        <h3 className="text-xl font-bold mt-6">Select Payment Mode</h3>
        <div className="space-y-4">
          <div>
            <input
              type="radio"
              id="upi"
              name="paymentMode"
              value="UPI"
              checked={paymentMode === 'UPI'}
              onChange={handlePaymentModeChange}
            />
            <label htmlFor="upi" className="ml-2">UPI Payment</label>
          </div>
          <div>
            <input
              type="radio"
              id="card"
              name="paymentMode"
              value="CARD"
              checked={paymentMode === 'CARD'}
              onChange={handlePaymentModeChange}
            />
            <label htmlFor="card" className="ml-2">Credit or Debit Card</label>
          </div>
          <div>
            <input
              type="radio"
              id="cod"
              name="paymentMode"
              value="COD"
              checked={paymentMode === 'COD'}
              onChange={handlePaymentModeChange}
            />
            <label htmlFor="cod" className="ml-2">Cash on Delivery</label>
          </div>
        </div>
        <button
          onClick={handleProceedToPayment}
          className="mt-6 bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700"
        >
          Proceed to Payment
        </button>
      </div>
    </main>
  );
};

export default Checkout;