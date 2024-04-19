import React, { useState } from 'react';

const SaleItemPage = () => {
    const [salePrice, setSalePrice] = useState(50); // Example starting sale price

    // Dummy data for the product
    const product = {
        name: "Eco-friendly Sneakers",
        description: "These sneakers are made from recycled materials and offer both comfort and style.",
        regularPrice: 100, // Regular price before sales
        imageUrl: "path/to/image" // Since there's no image, we'll use a placeholder
    };

    const handlePriceUpdate = (e) => {
        e.preventDefault(); // Prevent the default form submission
        console.log('Update price to:', salePrice);
        // Logic to update price in the backend
    };

    const handleRemoveFromSale = () => {
        console.log('Remove item from sale');
        // Logic to remove item from sale
    };

    return (
        <div className="p-8 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
            {/* Title Section */}
            <h1 className="text-2xl font-bold text-center mb-6">Put Item on Sale</h1>
            
            {/* Product Image Placeholder */}
            <div className="mb-4 bg-gray-300 h-64 w-full"></div> {/* Placeholder for image */}
            
            {/* Product Details */}
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <div className="my-4">
                <span className="text-gray-900 font-bold">Regular Price: ${product.regularPrice.toFixed(2)}</span>
                <span className="ml-4 text-red-500 font-bold">Sale Price: ${salePrice.toFixed(2)}</span>
            </div>
            
            {/* Form to Update Sale Price */}
            <form onSubmit={handlePriceUpdate} className="flex items-center mb-4">
                <input type="number" value={salePrice} onChange={e => setSalePrice(e.target.value)} className="mr-2 p-2 border rounded" />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Update Sale Price
                </button>
            </form>
            
            {/* Button to Remove Item from Sale */}
            <button onClick={handleRemoveFromSale} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Remove from Sale
            </button>
        </div>
    );
};

export default SaleItemPage;
