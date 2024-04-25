import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const SearchResultsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { query } = router.query;

  useEffect(() => {
    axios.get('http://localhost:8080/product')
      .then(response => {
        console.log("response", response.data)
        setLoading(false);
        if (query) {
            
          const searchTerm = decodeURIComponent(query).toLowerCase();
          const filteredProducts = response.data.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.color_names.some(color => color.toLowerCase().includes(searchTerm)) ||
            product.category.toLowerCase().includes(searchTerm)
          );
          setProducts(filteredProducts);
        } else {
          setProducts(response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, [query]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (!products.length) 
  return (
    <div className="text-center p-4">
      <h3 className="text-xl font-bold">No Results Found</h3>
      <p>No results found for "{query}". Please try another search term.</p>
      <button onClick={() => router.push('/adminHome')} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Return Home
      </button>
    </div>
  );


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
      <div className="grid grid-cols-3 gap-4">
        
        {products.map(product => (
          <Link key={product.productId} href={`/products/${product.productId}`} passHref>
          <div className="bg-white shadow rounded p-4">
            <img src={product.image.url} alt={product.name} className="w-full h-40 object-cover" />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            <p className="text-gray-500">Category: {product.category}</p>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;
