import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const SaleEditPage = () => {
    const [salePrice, setSalePrice] = useState(1.99); // Example starting sale price
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [availableSizes, setAvailableSizes] = useState([]);
    const [availableColors, setAvailableColors] = useState([]);
    const [currentImages, setCurrentImages] = useState([]);
  
  
  
  
    const router = useRouter();
    const { id } = router.query; // Get the product ID from the URL

    // // Dummy data for the product
    // const product = {
    //     name: "Eco-friendly Sneakers",
    //     description: "These sneakers are made from recycled materials and offer both comfort and style.",
    //     regularPrice: 100, // Regular price before sales
    //     imageUrl: "path/to/image" // Since there's no image, we'll use a placeholder
    // };

    useEffect(() => {
        const fetchProductDetails = async () => {
          try {
           
            // Configure the request with the Authorization header
            const response = await axios.get(`http://localhost:8080/product/${id}`)
            
    
            console.log("response for sale", response.data);
            setProduct(response.data); // Assuming the data is an array of products
          } catch (error) {
            console.error('Error fetching product details:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchProductDetails();
    }, []);
    
      if (loading || !product) {
        return <div>Loading...</div>;
      }

    const handlePriceUpdate = (e) => {
        e.preventDefault(); // Prevent the default form submission
        console.log('Update price to:', salePrice);
        // Logic to update price in the backend
    };

    const handleSale = async (e) => {
        e.preventDefault();
        console.log('Placing Item on Sale');
        const saleData = {
           // id: product.id,  // Assuming 'id' at this level is the same as 'productId.id'
            productId: {
                id: product.product.id,
                name: product.product.name,
                price: product.product.price,
                category: {
                    categoryID: product.product.category.categoryID,
                   // category: product.category.category
                },
                description: product.product.description
            },
            currentPrice: product.product.price, // Assuming the current price is the same as the 'price' field from product details
            salePrice: parseFloat(salePrice) // Ensure the sale price is formatted as a float
        };
        console.log("sending", saleData)
    
        // try {
        //     const token = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage
        //     const response = await axios.post('http://localhost:8080/admin/sale', saleData, {
        //         headers: {
        //             'Authorization': `Bearer ${token}`,  // Assuming your endpoint requires authorization
        //             'Content-Type': 'application/json'
        //         }
        //     });
        try {
            const token = sessionStorage.getItem('token'); 
            const response = await axios.post('http://localhost:8080/product/admin/postProductAsSale', saleData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Assuming your API requires Bearer token authentication
                }
            });
    
            console.log('Sale successful:', response.data);
            // Optionally, you can handle navigation or alert messages here
            alert('Product placed on sale successfully!');
            router.push('/sales')
        } catch (error) {
            console.error('Failed to place product on sale:', error.response ? error.response.data : error.message);
              console.error('Failed to place product on sale:', error.response);
           // alert('failed to place product on sale, ${error.message}');
            alert(`Failed to place product on sale: ${error.response.data.message}`);
        
        }
    };
    
    if (loading || !product) {
        return <div>Loading...</div>;
      }
    return (
        <div className="p-8 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
            {/* Title Section */}
            <h1 className="text-2xl font-bold text-center mb-6">Put Item on Sale</h1>
            
            {/* Product Image Placeholder */}
            <div className="mb-4 bg-gray-300 h-64 w-full">
            <img src={product.images[0].url} alt={"shoes image"} className="w-full h-full object-contain rounded-lg mb-4" />
            </div> {/* Placeholder for image */}
            
            {/* Product Details */}
            <h2 className="text-xl font-bold">{product.product.name}</h2>
            <p className="text-gray-600">{product.product.description}</p>
            <div className="my-4">
                <span className="text-gray-900 font-bold">Regular Price: ${product.price}</span>
                <span className="ml-4 text-red-500 font-bold">Sale Price: ${salePrice}</span>
            </div>
            
            {/* Form to Update Sale Price */}
            <form onSubmit={handlePriceUpdate} className="flex items-center mb-4">
                <input type="number" value={salePrice} onChange={e => setSalePrice(e.target.value)} className="mr-2 p-2 border rounded" />
                {/* <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Update Sale Price
                </button> */}
                 <button type="submit" className="bg-yellow-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Update sale price
            </button>
            </form>
            
            {/* Button to Remove Item from Sale */}
            {/* <button onClick={handleSale} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Put on Sale
            </button> */}
        </div>
    );
};

export default SaleEditPage;
