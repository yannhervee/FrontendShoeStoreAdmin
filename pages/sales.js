import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import LeftMenu from '@/components/leftMenu';

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
      name: 'Recycled Wool Sweater',
      price: 60.00,
      category: 'Apparel',
      colors: [
          { color: 'Gray', quantity: 15 },
          { color: 'Black', quantity: 10 }
      ],
  },
  {
      id: 3,
      name: 'Organic Cotton Jeans',
      price: 85.00,
      category: 'Apparel',
      colors: [
          { color: 'Denim Blue', quantity: 20 },
          { color: 'Dark Blue', quantity: 6 }
      ],
  },
  {
      id: 4,
      name: 'Bamboo Fabric T-shirt',
      price: 35.00,
      category: 'Apparel',
      colors: [
          { color: 'White', quantity: 30 },
          { color: 'Green', quantity: 25 }
      ],
  },
  {
      id: 5,
      name: 'Recycled Plastic Flip-Flops',
      price: 20.00,
      category: 'Footwear',
      colors: [
          { color: 'Yellow', quantity: 22 },
          { color: 'Blue', quantity: 18 }
      ],
  },
  {
      id: 6,
      name: 'Hemp Sun Hat',
      price: 45.00,
      category: 'Accessories',
      colors: [
          { color: 'Beige', quantity: 12 },
          { color: 'Brown', quantity: 8 }
      ],
  },
  {
      id: 7,
      name: 'Biodegradable Rubber Rain Boots',
      price: 95.00,
      category: 'Footwear',
      colors: [
          { color: 'Black', quantity: 10 },
          { color: 'Olive Green', quantity: 10 }
      ],
  },
  {
      id: 8,
      name: 'Organic Cotton Socks',
      price: 12.00,
      category: 'Apparel',
      colors: [
          { color: 'Red', quantity: 40 },
          { color: 'Blue', quantity: 30 }
      ],
  },
  {
      id: 9,
      name: 'Recycled Material Backpack',
      price: 120.00,
      category: 'Accessories',
      colors: [
          { color: 'Gray', quantity: 15 },
          { color: 'Black', quantity: 15 }
      ],
  },
  {
      id: 10,
      name: 'Sustainable Wood Sunglasses',
      price: 150.00,
      category: 'Accessories',
      colors: [
          { color: 'Wood', quantity: 25 }
      ],
  },
  {
      id: 11,
      name: 'Cork Wallet',
      price: 42.00,
      category: 'Accessories',
      colors: [
          { color: 'Natural Cork', quantity: 35 }
      ],
  },
  {
      id: 12,
      name: 'Upcycled Fabric Scarf',
      price: 29.00,
      category: 'Apparel',
      colors: [
          { color: 'Multicolor', quantity: 20 }
      ],
  },
  {
      id: 13,
      name: 'Vegan Leather Shoes',
      price: 110.00,
      category: 'Footwear',
      colors: [
          { color: 'Black', quantity: 12 },
          { color: 'Brown', quantity: 12 }
      ],
  }
];


const ProductList = () => {
  return (
    <div className="p-6 pl-0 flex bg-gray-100 rounded-lg">
    <div className="flex-1 py-4 pr-4"> {/* Added pr-4 to give some space before the sidebar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mr-2">
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
                <button className="text-white bg-red-500 hover:bg-red-700 px-3 py-2 rounded shadow">Remove From Sales</button>
                <button className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded shadow">Edit</button>
              </div>
            </div>
          ))}
        </div>
    </div>

    {/* Right Sidebar with Actions and Filters */}
    <div className="w-64"> {/* Consider changing the width if needed */}
        {/* Add New Product Section */}
        <div className="bg-white p-4 shadow rounded-lg mb-4">
          <h2 className="text-xl font-semibold mb-3">Actions</h2>
          <Link href="/add-product">
            <span className="block bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded">
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Put New Item on Sale
            </span>
          </Link>
        </div>

        {/* Filter Component */}
        <div className="flex-1 overflow-y-auto">
          <LeftMenu />
        </div>
    </div>
</div>


  );
};

export default ProductList;
