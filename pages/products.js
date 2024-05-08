
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
    axios.get("http://localhost:8080/product")
      .then((res) => {
         setProducts(res.data);
         setFilteredProducts(res.data); // Initialize filtered products with all products
        console.log("products", res.data)
     setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const handleRemoveButton = async(productId ) => {
    const token = sessionStorage.getItem('token');
    console.log("here")
    console.log("productId", productId)
    try{
      const response = await axios.delete(`http://localhost:8080/admin/deleteProduct/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
     console.log("response admin delete", response.data)
    //  console.log(' items to filter', filteredProducts);
     setFilteredProducts (filteredProducts.filter(item => !(item.productId ===productId)))
     // const updatedCart = cartItems.filter(item => !(item.productId === productId && item.sizeId === sizeId && item.colorId === colorId));
    //  console.log('left items', filteredProducts);
      
      
    } catch(error){
      console.error('Error deleting product', error);
    }
    // const response = await axios.post(`http://localhost:8080/admin/deleteProduct/${productId}`, {
    //   headers: {
    //     'Authorization': `Bearer ${token}`
    //   }
    // })
    // console.log("response admin delete", response.data)
   // router.push("/checkoutShip");

   

  };

  if (loading || !products) {
    return <div>Loading...</div>;
  }

    // Function to handle filter changes
    const handleFilterChange = (filterType, values) => {
      const newFilters = { ...filters, [filterType]: values };
      setFilters(newFilters);
  
      let filtered = [...products];
  
      // Apply all active filters together
      if (Object.values(newFilters).flat().length > 0) {
        filtered = filtered.filter((product) => {
          return Object.entries(newFilters).every(([type, selectedValues]) => {
            if (type === "size" && selectedValues.length > 0) {
              return selectedValues.some((size) => product.sizes.includes(parseInt(size)));
            }
            if (type === "color" && selectedValues.length > 0) {
              // console.log("Selected Colors:", selectedValues);
              // console.log("Product Colors:", product.color_names);
          
              return selectedValues.some((selectedColor) =>
                  product.color_names.some((productColor) =>
                      productColor.toLowerCase() === selectedColor.toLowerCase()
                  )
              );
          }
          
          
            if (type === "priceRange" && selectedValues.length > 0) {
              return selectedValues.some((priceRange) => {
                const [minStr, maxStr] = priceRange.split(" - ");
                const minPrice = parseInt(minStr.replace("$", ""));
                const maxPrice = parseInt(maxStr.replace("$", ""));
                return product.price >= minPrice && product.price <= maxPrice;
              });
            }
            return true;
          });
        });
      }
  
      setFilteredProducts(filtered);
    };
  return (
    <div className="p-6 pl-0 flex bg-gray-100 rounded-lg">
    <div className="flex-1 py-4 pr-4"> {/* Added pr-4 to give some space before the sidebar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mr-2">
          {filteredProducts.map((product) => (

            <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between">
                          <Link key={product.productId} href={`/product/${product.productId}`} passHref>
              <div className="bg-gray-300 h-48 w-full mb-4">
              <img src={product.image.url} alt={"shoes image"} className="w-full h-full object-contain rounded-lg mb-4" />
                </div> {/* Placeholder for the product image */}
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="text-gray-700">Price: ${product.price.toFixed(2)}</p>
              <p className="text-gray-600">Category: {product.category}</p>
              </Link>
            
              <div className="flex justify-between mt-4">
                <button className="text-white bg-red-500 hover:bg-red-700 px-3 py-2 rounded shadow" onClick={() => handleRemoveButton(product.productId)}>Remove</button>
                <Link href={`sale/${product.productId}`}className="text-white bg-yellow-500 hover:bg-yellow-700 px-3 py-2 rounded shadow">Put on Sale</Link>
                {/* <Link href={`editProduct/${item.productId}`}></Link> */}
                <Link href={`editProduct/${product.productId}`} className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded shadow">Edit</Link>
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
          <Link href="/adminAddProduct">
            <span className="block bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded">
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add New Product
            </span>
          </Link>
        </div>

        {/* Filter Component */}
        <div className="flex-1 overflow-y-auto">
          <LeftMenu onFilterChange={handleFilterChange}/>
        </div>
    </div>
</div>


  );
};

export default ProductList;
