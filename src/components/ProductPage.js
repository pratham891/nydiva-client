import React from 'react';

const ProductPage = ({ products, addToCart }) => {
  return (
    <main className="flex-grow p-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-40 object-cover rounded mb-3" 
              />
              <h3 className="text-md font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
              <button 
                onClick={() => addToCart(product)} 
                className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors duration-300"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProductPage;

