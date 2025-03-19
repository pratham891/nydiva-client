import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cart, updateItemQuantity, isLoggedIn, clearCart }) => {
  const navigate = useNavigate();  // Initialize useNavigate

  // handle navigate to checkout page
  const navigateToCheckout = () => {
    if (isLoggedIn) {
      navigate('/checkout');
    } else {
      alert(`Please login to proceed to checkout`);
      navigate('/login');
    }
  }

  const handleQuantityChange = (productId, quantity) => {
    updateItemQuantity(productId, quantity);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="flex-grow p-8 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          cart.map((item, index) => (
            <div key={index} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div className="ml-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              </div>
              <div>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  className="w-16 p-2 border rounded"
                />
              </div>
            </div>
          ))
        )}

        {cart.length > 0 && (
          <div className="mt-6 text-right">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            <button
              onClick={navigateToCheckout}
              className="mt-4 bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={clearCart}
              className="mt-4 ml-4 bg-red-600 text-white px-8 py-3 rounded hover:bg-red-700"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
