import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = ({ clearCart }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [orderCompleted, setOrderCompleted] = useState(false);
  const navigate = useNavigate();

  const handlePayment = (option) => {
    setSelectedOption(option);
  };

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

  return (
    <main className="flex-grow p-8 bg-gray-50">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
        {!orderCompleted ? (
          <>
            <h2 className="text-2xl font-bold mb-6">Payment Options</h2>
            <div className="space-y-4">
              <div
                className={`border rounded p-4 cursor-pointer hover:bg-gray-100 ${selectedOption === 'UPI' && 'bg-gray-100'}`}
                onClick={() => handlePayment('UPI')}
              >
                UPI Payment
              </div>
              <div
                className={`border rounded p-4 cursor-pointer hover:bg-gray-100 ${selectedOption === 'QR' && 'bg-gray-100'}`}
                onClick={() => handlePayment('QR')}
              >
                Scan QR Code
              </div>
              <div
                className={`border rounded p-4 cursor-pointer hover:bg-gray-100 ${selectedOption === 'COD' && 'bg-gray-100'}`}
                onClick={() => handlePayment('COD')}
              >
                Cash on Delivery
              </div>
            </div>

            {selectedOption && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
                <p className="text-green-700">
                  {selectedOption === 'UPI' && <>Pay using UPI ID: <strong>12345@ybl</strong></>}
                  {selectedOption === 'QR' && <>Scan the QR Code below:</>}
                  {selectedOption === 'COD' && <>You selected <strong>Cash on Delivery</strong>.</>}
                </p>

                {selectedOption === 'QR' && (
                  <img
                    src="/path-to-your-qr-code.png"
                    alt="Scan QR Code"
                    className="w-40 h-40 mx-auto mt-4"
                  />
                )}

                <button
                  onClick={completeOrder}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Complete Order
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600">Order Completed!</h2>
            <p className="mt-4">Thank you for shopping with us! Redirecting to the homepage...</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Payment;
