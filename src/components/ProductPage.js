import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ProductPage = ({ products, addToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {/* {console.log(products.length)} */}
      {products.length === 0 ?
        <div className="flex items-center justify-center h-64 col-span-full">
          <p className="text-center text-lg">No products available</p>
        </div>
        : products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
            <img
              src={product.image}
              alt={product.name}
              // className="w-full h-40 object-cover rounded mb-3"
              className="w-full h-60 object-cover rounded mb-3"
            />
            <h3 className="text-md font-semibold">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors duration-300"
            >
              Add to Cart
            </button>
            <button
              onClick={() => handleViewProduct(product)}
              className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors duration-300"
            >
              View Product
            </button>
          </div>
        ))}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct ? (
            <div>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                style={{ width: '100%', height: 'auto', marginBottom: '15px' }}
              />
              <p><strong>Name:</strong> {selectedProduct.name}</p>
              <p><strong>Price:</strong> ${selectedProduct.price}</p>
              <p><strong>Description:</strong> {selectedProduct.description}</p>
            </div>
          ) : (
            <p>No product selected.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductPage;
