import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cart, userDetails, items, clearCart }) => {
  const baseUrl = 'https://nydiva-backend.vercel.app' || '';
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false);
  const [paymentMode, setPaymentMode] = useState('');
  const [address, setAddress] = useState({
    line01: '',
    line02: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });
  const razorpaykeyid = process.env.REACT_APP_RAZORPAY_KEY_ID;
  const navigate = useNavigate();
  const completeOrder = () => {
    if (typeof clearCart === 'function') {
      clearCart();  // Clear cart after order completion
    } else {
      console.error('clearCart is not a function');
    }

    setOrderCompleted(true);

    // Redirect to home after 3 seconds
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const failOrder = () => {
    setPaymentFailed(true);

    // Redirect to cart after 3 seconds
    setTimeout(() => {
      navigate('/cart');
    }, 3000);
  };

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/user/${userDetails.email}`);
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

  const initPay = async (data) => {
    var options = {
      "key": razorpaykeyid,
      "amount": data.totalPrice,
      "currency": "INR",
      "name": "NyDiva International",
      "description": "Test Transaction",
      "order_id": data.orderId,
      "prefill": {
        "name": userDetails.username,
        "email": userDetails.email,
        // "contact": "9000090000"
      },
      "notes": {
        "address": userDetails.address
      },
      "theme": {
        "color": "#3399cc"
      },
      "handler": function (response) {
        // Collect the payment details
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
        console.log('Payment successful:', response);

        const postOrderId = data.orderId;

        // send details to backend server for payment verification
        fetch(`${baseUrl}/api/payments/verify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId: postOrderId,
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
          }),
        })
          .then(response => {
            if (!response.ok) {
              failOrder();
              throw new Error('Network response was not ok');
            }
            completeOrder();
            return response.json()
          })
          .then(data => {
            console.log('Payment verification response:', data);
            // handle response from server
          })
          .catch(error => {
            console.error('Error verifying payment:', error);
          });
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }

  const handleProceedToPayment = async () => {
    if (paymentMode) {
      try {
        // Calculate totalPrice
        const totalPrice = cart.reduce((sum, item) => {
          console.log(`Item: ${item.name}, Price: ${item.price}, Quantity: ${item.quantity}`);
          return sum + item.price * item.quantity;
        }, 0);

        const response = await fetch(`${baseUrl}/api/orders/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userEmail: userDetails.email,
            items: items,
            totalPrice: totalPrice,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Order created successfully:', data);

          // razorpay frontend integration
          initPay(data);

        } else {
          console.error('Error creating order:', response.statusText);
          return;
        }

        // navigate('/payment', { state: { paymentMode } });
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
        {
          !orderCompleted && !paymentFailed ? (
            <>
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
                id="rzp-button1"
                className="mt-6 bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700"
              >
                Proceed to Payment
              </button>
            </>
          ) : orderCompleted ? (
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-green-500 text-white text-3xl font-bold">
              <div>Order Placed!</div><div className="text-1xl weight-100">Redirecting to home page...</div>
            </div>
          ) : (
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-red-500 text-white text-3xl font-bold">
              <div>Payment Failed!</div><div className="text-1xl">Please try again...</div>
            </div>
          )
        }
      </div>
    </main>
  );
};

export default Checkout;