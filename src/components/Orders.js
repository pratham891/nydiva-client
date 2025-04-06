import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const Orders = ({ userDetails }) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, [userDetails]);

  const fetchOrders = async () => {
    try {
      const baseUrl = 'https://nydiva-backend.vercel.app' || '';
      const response = await fetch(`${baseUrl}/api/orders/${userDetails.userId}`);
      if (!response.ok) {
        console.log('Failed to fetch orders');
        return;
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setShowModal(false);
  };

  return (
    <main className="flex-grow p-8 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">My Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul className="list-group">
            {orders.map((order) => (
              <li key={order._id} className="list-group-item d-flex align-items-center">
                <div>
                  <strong>Order ID:</strong> {order.orderId}
                  <p className="mb-0"><strong>Status:</strong> {order.status}</p>
                  <p className="mb-0"><strong>Total Price:</strong> ${order.totalPrice}</p>
                  <p className="mb-0"><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <Button variant="primary" className="ms-auto" onClick={() => handleViewOrder(order)}>
                  View Order
                </Button>
              </li>
            ))}
          </ul>
        )}

        {/* Modal for viewing order details */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedOrder ? (
              <div>
                <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
                <p><strong>User Email:</strong> {userDetails.email}</p>
                <p><strong>Total Price:</strong> ${selectedOrder.totalPrice}</p>
                <p><strong>Status:</strong> {selectedOrder.status}</p>
                <h5 className="mt-3">Items:</h5>
                <ul>
                  {selectedOrder.items.map(item => (
                    <li key={item.productId._id}>
                      <p><strong>Product Name:</strong> {item.productId.name}</p>
                      <p><strong>Quantity:</strong> {item.quantity}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No order selected.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </main>
  );
};

export default Orders;