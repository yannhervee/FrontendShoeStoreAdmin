import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import ImageSlider from '@/components/imageSlider';
import Link from 'next/link';


const ProductDetailsPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [currentImages, setCurrentImages] = useState([]);

  

  const router = useRouter();
  const { id } = router.query; // Get the product ID from the URL


  useEffect(() => {
    console.log("id", id)
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/product/${id}`);
        setProduct(response.data);
        
       
        setCurrentImages(response.data.images); // Initial image set up
        console.log("products", response.data);
        const initialSizes = response.data.sizeColorDTO.map(sc => ({...sc.size}));
        const initialColors = Object.values(response.data.sizeColorDTO.flatMap(sc => sc.color.map(c => ({
          ...c.color,
          quantity: c.quantity
        }))).reduce((acc, cur) => {
          acc[cur.color] = {...cur};  // Ensures distinct colors
          return acc;
        }, {}));
  
        console.log("size available", initialSizes);
        console.log("colors available", initialColors);

      console.log("size available", initialSizes)


      setAvailableSizes(initialSizes);
      setAvailableColors(initialColors)
      console.log("colors available", initialColors)
      

        // Set default selected size
        if (response.data.sizeColorDTO.length > 0) {
          setSelectedSize(response.data.sizeColorDTO[0].size.size);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      //  setLoading(false);
      } finally{
        setLoading(false);
      }
 
    };

    if (id) {
      fetchProductDetails();
    }else{
      setLoading(false);
    }
    
  }, [id]);

  useEffect(() => {
    // Update selected color when selected size changes
    setSelectedColor(null);
  }, [selectedSize]);

  const handleSizeClick = (sizeObject) => {
    console.log('Selected size object:', sizeObject);
    setSelectedSize(sizeObject);
  
    // Filter available colors based on the selected size
    const availableColorsForSize = product.sizeColorDTO
      .find(sc => sc.size.id === sizeObject.id)?.color
      .map(c => c.color);
  
    console.log('Available colors for selected size:', availableColorsForSize);
  
    // Check if selected color is available in the new size
    if (!availableColorsForSize.some(c => selectedColor && c.id === selectedColor.id)) {
      setSelectedColor(null);
    }
  
    setCurrentImages(product.images); // Revert to showing all or default images
  };
  
  const handleColorClick = (colorObject) => {
    console.log('Selected color object:', colorObject);
    setSelectedColor(colorObject);
  
    // Filter available sizes based on the selected color
    const availableSizesForColor = product.sizeColorDTO
      .filter(sc => sc.color.some(c => c.color.id === colorObject.id))
      .map(sc => sc.size);
  
    console.log('Available sizes for selected color:', availableSizesForColor);
  
    // Check if selected size is available with the new color
    if (!availableSizesForColor.some(s => selectedSize && s.id === selectedSize.id)) {
      setSelectedSize(null);
    }
  
    const filteredImages = product.images.filter(image =>
      image.url.toLowerCase().includes(colorObject.color.toLowerCase())
    );
  
    setCurrentImages(filteredImages);
  };
  

  // Render sizes with some disabled based on available colors
  const renderSizeOptions = () => {
    return availableSizes.map(size => {
      const isAvailable = product.sizeColorDTO.some(sc => 
        sc.size.id === size.id && 
        (selectedColor ? sc.color.some(c => c.color.id === selectedColor.id) : true)
      );
  
      return (
        <button
          key={size.id}
          className={`border border-gray-300 rounded-md py-2 px-4 mr-2 ${selectedSize && selectedSize.id === size.id ? 'bg-black text-white' : 'text-black'} ${!isAvailable ? 'bg-gray-500 text-white cursor-not-allowed' : ''}`}
          disabled={!isAvailable}
          onClick={() => handleSizeClick(size)}
        >
          {size.size}
        </button>
      );
    });
  };
  
  const renderColorOptions = () => {
    return availableColors.map(color => {
      const isAvailable = product.sizeColorDTO.some(sc => 
        (selectedSize ? sc.size.id === selectedSize.id : true) && 
        sc.color.some(c => c.color.id === color.id)
      );
  
      return (
        <button
          key={color.id}
          className={`border border-gray-300 rounded-md py-2 px-4 mr-2 ${selectedColor && selectedColor.id === color.id ? 'border-red-300' : ''} ${!isAvailable ? 'bg-gray-500 text-white cursor-not-allowed' : ''}`}
          disabled={!isAvailable}
          onClick={() => handleColorClick(color)}
        >
          {color.color}
        </button>
      );
    });
  };
  
  const handlePreview = (image) => {
    setCurrentImages([image]); // Temporarily set the main slider to show this image only
  };
  

  if (loading || !product) {
    return <div>Loading...</div>;
  }

  // Extract unique sizes and colors
 
  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-center mt-24 mr-32">{product.product.name}</h1>
      <div className=" mx-auto flex pt-20 pb-8 pr-0 pl-0 mr-20 ml-20">

        {/* Reasons to Buy */}
        <div className="flex flex-col justify-between mr-8">
          <p className="text-gray-700 mb-4">Why Buy Eco-Friendly Shoes?</p>
          <div className="mb-2">
            <p className="font-medium">1. Sustainable Materials</p>
            <p className="text-gray-600">Reduce environmental impact with eco-conscious materials.</p>
          </div>
          <div className="mb-2">
            <p className="font-medium">2. Ethical Production</p>
            <p className="text-gray-600">Support fair labor practices and humane working conditions.</p>
          </div>
          <div>
            <p className="font-medium">3. This Product</p>
            <p className="text-green-600">{product.productEcoImpactInformation[0].ecoImpact}</p>
          </div>
        </div>

  
<div className="flex flex-col items-center mr-8 w-150 h-150">
  {product.images.map((image, index) => (
    <img key={index} 
         src={image.url} 
         alt={`Product ${index}`} 
         className="rounded-lg mb-4 cursor-pointer"
         onClick={() => handlePreview(image)}
         onMouseLeave={() => setCurrentImages(product.images)} // Optional: revert on mouse leave
    />
  ))}
</div>
        

        {/* Main Product Image */}
        <div class="relative p-0 w-512 mr-24">
          {/* <img src="https://via.placeholder.com/400" alt="Main product" className="w-full rounded-lg mb-4" /> */}
          <ImageSlider images={currentImages} className="w-full rounded-lg mb-4" />
        </div>

        {/* Product Information */}
        <div className="flex flex-col justify-between w-512">
          <div>
            <h1 className="text-2xl font-bold mb-4">
              {" "}
              {product.sizeColorDTO.length === 0 ? <span className="text-red-500">(Out of Stock)</span> : null}
            </h1>

            <p className="text-gray-700 mb-4">Price: ${product.product.price.toFixed(2)}</p>
          </div>
          {/* Size Options */}
          <div className="mb-4">
            <label className="font-medium">Select Size:</label>
            <div className="flex mt-2">
            {renderSizeOptions()}

            </div>
          </div>
          {/* Color Options */}
          <div className="mb-8">
            <label className="font-medium">Select Color:</label>
            <div className="flex mt-2 flex-wrap mb-8">
            {renderColorOptions()}
           
            </div>
          </div>


          {/* Add to Cart Button */}
          {/* <button className="bg-black text-white font-semibold py-2 px-6 rounded-md hover:bg-gray-800">Add to Cart</button> */}
          <Link
            className="bg-green-600 text-center text-white font-semibold py-2 px-6 rounded-md hover:bg-green-900"
            href="/adminHome"
          >
            Go Back Home
          </Link>

        </div>
      </div>
      <div className="mb-4 text-center ">
        <p> {product.product.description}</p>
      </div>

    </>
  );
};

export default ProductDetailsPage;
