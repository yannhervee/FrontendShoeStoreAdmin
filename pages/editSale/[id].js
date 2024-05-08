import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const EditSaleItem = () => {
    const [salePrice, setSalePrice] = useState(1.99); // Example starting sale price
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const regularPrice = useState(localStorage.getItem("regular"))
    
    const router = useRouter();
    const { id } = router.query; // Get the product ID from the URL
    

    useEffect(() => {
        const fetchProductDetails = async () => {
          try {
           
            // Configure the request with the Authorization header
            const response = await axios.get(`http://localhost:8080/product/${id}`)
            
            console.log("response for sale", response.data);
            setProduct(response.data);
            setSalePrice(response.data.price)
             // Assuming the data is an array of products
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

    const handlePriceUpdate = async (e) => {
        e.preventDefault();
        console.log('Placing Item on Sale');
        console.log("regular price", regularPrice)

        

    // Check if sale price is less than regular price and positive
    if (parseFloat(salePrice) >= parseFloat(regularPrice)) {
        alert('Sale price must be less than the regular price.');
        return; // Exit the function if validation fails
    }
    if (parseFloat(salePrice) <= 0) {
        alert('Sale price must be a positive value.');
        return; // Exit the function if validation fails
    }

    const id = localStorage.getItem("saleId");
        const saleData = {
            id: id,  // Assuming 'id' at this level is the same as 'productId.id'
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
    
        try {
            const token = sessionStorage.getItem('token'); 
            const response = await axios.put('http://localhost:8080/product/admin/updateSalePrice', saleData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Assuming your API requires Bearer token authentication
                }
            });
    
            console.log('Sale successful:', response.data);
            // Optionally, you can handle navigation or alert messages here
            alert('Sale price was successfully updated!');
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
                <span className="text-gray-900 font-bold">Regular Price: ${regularPrice}</span>
                <span className="ml-4 text-red-500 font-bold"> Sale Price: ${salePrice}</span>
            </div>
            
            {/* Form to Update Sale Price */}
            <form onSubmit={handlePriceUpdate} className="flex items-center mb-4">
                <input type="number" value={salePrice} onChange={e => setSalePrice(e.target.value)} className="mr-2 p-2 border rounded text-black" />
                
                 <button type="submit" className="bg-yellow-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Edit Sale
            </button>
            </form>
            
        </div>
    );
};

export default EditSaleItem;
