import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import LeftMenu from '@/components/leftMenu';
import React, { useEffect, useState } from "react";

import axios from "axios";
import Link from "next/link";



const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({
        size: [],
        color: [],
        priceRange: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:8080/product/getOnSaleProducts")
            .then((res) => {
                setProducts(res.data);
                setFilteredProducts(res.data); // Initialize filtered products with all products
                console.log("products sales", res.data)
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    }, []);
    const removeFromSale = async(product) => {
        console.log("product", product);
        try {
            const token = sessionStorage.getItem('token'); 
            const response = await axios.delete(`http://localhost:8080/product/admin/removeProductFromSale/${product.onSaleProducts.productId.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Assuming your API requires Bearer token authentication
                }
            });
    
            console.log('Sale successful:', response.data);
            // Optionally, you can handle navigation or alert messages here
            alert('product has been removed from sales');
            const updatedProducts = products.filter(item => !(item.onSaleProducts.productId.id === product.onSaleProducts.productId.id));
            setProducts(updatedProducts);
            router.push('/sales')
        } catch (error) {
            console.log("error", error)
            console.error('Failed to del product on sale:', error.response ? error.response.data : error.message);
              console.error('Failed to place product on sale:', error.response);
           alert('failed to place product on sale, ${error.message}');
           alert(`Failed to place product on sale: ${error.response.data.message}`);
        
        }
    }


    if (loading || !products) {
        return <div>Loading...</div>;
    }
    return (
        <div className="p-6 pl-0 flex bg-gray-100 rounded-lg">
            <div className="flex-1 py-4 pr-4"> {/* Added pr-4 to give some space before the sidebar */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mr-2">
                {products.map((product) => (
    <div key={product.onSaleProducts.productId.id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between">
        <Link href={`/sale/${product.onSaleProducts.productId.id}`} passHref>
            <div className="bg-gray-300 h-48 w-full mb-4">
                <img src={product.images[0].url} alt={product.onSaleProducts.productId.name} className="h-full w-full rounded mr-4" />
            </div> {/* Placeholder for the product image */}
            <h2 className="text-xl font-bold">{product.onSaleProducts.productId.name}</h2>
            <p className="text-red-700"> Sale Price: ${product.onSaleProducts.salePrice.toFixed(2)}</p>
            <p className="text-gray-600"> Actual product Price: ${product.onSaleProducts.currentPrice.toFixed(2)}</p>
            <p className="text-gray-600">Category: {product.onSaleProducts.productId.category.category}</p>
            <div className="flex flex-wrap mb-2">
            {/* Additional product details if needed */}
            </div>
        </Link>
        <div className="flex justify-between mt-4">
            <button className="text-white bg-red-500 hover:bg-red-700 px-3 py-2 rounded shadow" onClick={() => removeFromSale(product)}>Remove From Sales</button>
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
                    <Link href="/products">
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
