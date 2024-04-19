import React from 'react';

const products = [
  {
    id: 1,
    name: 'Eco-friendly Sneakers',
    price: 75.00,
    category: 'Footwear',
    colors: [
      { color: 'Red', quantity: 12 },
      { color: 'Blue', quantity: 8 },
      { color: 'Green', quantity: 5 }
    ],
  },
  {
    id: 2,
    name: 'Recycled Fabric Hat',
    price: 22.50,
    category: 'Accessories',
    colors: [
      { color: 'Black', quantity: 20 },
      { color: 'White', quantity: 15 }
    ],
  },
  // More products
];

const ProductList = () => {
  return (
    <div className="px-8 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between">
            <div className="bg-gray-300 h-48 w-full mb-4"></div> {/* Placeholder for the product image */}
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-gray-700">Price: ${product.price.toFixed(2)}</p>
            <p className="text-gray-600">Category: {product.category}</p>
            <div className="flex flex-wrap mb-2">
              {product.colors.map((color, index) => (
                <span key={index} className="text-xs font-semibold mr-2 mb-1 px-2.5 py-0.5 rounded bg-blue-100 text-blue-800">
                  {color.color} ({color.quantity})
                </span>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button className="text-white bg-red-500 hover:bg-red-700 px-3 py-2 rounded shadow">Remove</button>
              <button className="text-white bg-yellow-500 hover:bg-yellow-700 px-3 py-2 rounded shadow">Put on Sale</button>
              <button className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded shadow">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
