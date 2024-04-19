import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHome, faTag, faBasketShopping } from "@fortawesome/free-solid-svg-icons";

const AdminHome = () => {
  // Example data: List of products that are low in stock
  const lowStockItems = [
    { id: 1, name: 'Recycled Sneakers', stock: 5 },
    { id: 2, name: 'Organic Cotton T-Shirts', stock: 3 },
    { id: 3, name: 'Eco-Friendly Sunglasses', stock: 2 },
  ];

  return (
    <div className="p-8 bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">Admin Dashboard</h1>
      <div className="flex flex-wrap md:flex-nowrap justify-between items-start">
        
        {/* Inventory Status Card */}
        <div className="bg-white p-4 shadow rounded-lg w-full md:w-2/3 lg:w-3/4 mb-6 md:mr-4">
          <h2 className="font-semibold text-lg">Inventory Status</h2>
          <p className="text-gray-600 mt-2">Low stock items:</p>
          {lowStockItems.map(item => (
            <div key={item.id} className="mt-1">
              <p className="text-gray-800">{item.name} - <span className="text-red-500">{item.stock} left</span></p>
            </div>
          ))}
        </div>
        
        {/* Quick Links Card */}
        <div className="bg-white p-4 shadow rounded-lg w-full md:w-1/3 lg:w-1/4">
          <h2 className="font-semibold text-lg">Quick Actions</h2>
          <div className="mt-4">
            <Link href="/adminAddProduct">
              <span className="block bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded">
                Add New Product
              </span>
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AdminHome;
