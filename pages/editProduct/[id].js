import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useRouter } from 'next/router';
export default function AdminEditProduct() {
    // States for product details
    const [productName, setProductName] = useState();
    const [productPrice, setProductPrice] = useState();
    const [productCategory, setProductCategory] = useState();
    const [productDescription, setProductDescription] = useState();
    const [categories, setCategories] = useState([]);

    const [availableSizes, setAvailableSizes] = useState([]);
    const [availableColors, setAvailableColors] = useState([]);
    const [ecoImpact, setEcoImpact] = useState();
    const [product, setProduct] = useState();
    const [ecoId, setEcoId] = useState(0);
    

    // const id = 102;


    // State for size and color management
    // const [sizeColorCombos, setSizeColorCombos] = useState([
    //     { size: 6, colors: [{ id: 1, color: 'Red', quantity: 5 }, { id: 2, color: 'Blue', quantity: 3 }] },
    //     { size: 7, colors: [{ id: 3, color: 'Yellow', quantity: 4 }] },
    //     // ... more size/color combinations
    // ]);
    const [sizeColorCombos, setSizeColorCombos] = useState([]);
    // State for new size/color
    const [newSize, setNewSize] = useState('');
    const [newSizeId, setNewSizeId] = useState(0)
    const [newColorId, setNewColorId] = useState(0)
    const [newColor, setNewColor] = useState('');
    const [newQuantity, setNewQuantity] = useState(0);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { id } = router.query; // Get the product ID from the URL



    // Handlers to update state...

    useEffect(() => {
        console.log("id is ", id);
        // Fetch sizes
        fetch('http://localhost:8080/sizes')
            .then(response => response.json())
            .then(data => {
                console.log("data for sizes", data);
                setAvailableSizes(data)
            })
            .catch(error => console.error('Failed to load sizes:', error));

        // Fetch colors
        fetch('http://localhost:8080/colors')
            .then(response => response.json())
            .then(data => {
                console.log("data for colors", data);
                setAvailableColors(data)
            })
            .catch(error => console.error('Failed to load colors:', error));

        // Fetch category
        fetch(`http://localhost:8080/category`)
            .then(response => response.json())
            .then(data => {
                console.log("data for category", data)
                setCategories(data);
                // Assuming this format based on your initial data structure
            })
            .catch(error => console.error('Failed to load product details:', error));
        // Fetch product details
        fetch(`http://localhost:8080/product/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log("data for product", data)
                //  setProduct(data.product);
               // setProductDescription(data.)
               setProductPrice(data.price)
               setProduct(data)
               setProductName(data.product.name)
               setProductDescription(data.product.description)
               setProductCategory(data.product.category.categoryID)
                setSizeColorCombos(data.sizeColorDTO);
                setEcoImpact(data.productEcoImpactInformation[0].ecoImpact)
                setEcoId(data.productEcoImpactInformation[0].id)

            })
            .catch(error => console.error('Failed to load product details:', error));

        setLoading(false);
        console.log("sizeColor", sizeColorCombos)
    }, [id]);

    // Function to add a new size/color combination
    const handleAddSizeColorCombo = () => {
        // Convert newColor to a standardized format for comparison
        const standardizedNewColor = newColor.trim().toLowerCase();

        // Validation to ensure newSize, standardizedNewColor, and positive quantity are set
        if (!newSize || !standardizedNewColor || newQuantity <= 0) {
            console.error('Invalid input: Ensure size and color are selected, and quantity is a positive number.');
            return; // Early return to prevent adding/updating with invalid data
        }

        let isNewSizeColorComboAdded = false;

        console.log("new size ", newSize);
        console.log("new color ", newColor);

        // Try to find and update an existing combination
        const updatedSizeColorCombos = sizeColorCombos.map((combo) => {
            if (combo.size.size.toString() === newSize.toString()) { // Make sure to compare sizes correctly, considering they are objects and might be strings or numbers
                const colorIndex = combo.color.findIndex(c => c.color.color.trim().toLowerCase() === standardizedNewColor);
                if (colorIndex !== -1) {
                    // Update quantity if the exact size and color combination is found
                    combo.color[colorIndex].quantity = newQuantity;
                    isNewSizeColorComboAdded = true;
                } else {
                    // Add new color to the existing size
                    //  const newColorId = Math.max(...combo.color.map(c => c.color.id), 0) + 1;
                    combo.color.push({
                        color: { id: newColorId, color: standardizedNewColor },
                        quantity: newQuantity
                    });
                    isNewSizeColorComboAdded = true;
                }
            }


            return combo;
        });

        // If the size-color combination is new, add it
        if (!isNewSizeColorComboAdded) {
            const newComboId = sizeColorCombos.length > 0 ? Math.max(...sizeColorCombos.flatMap(c => c.color.map(col => col.color.id))) + 1 : 1;
            console.log("new combo", newComboId)
            updatedSizeColorCombos.push({
                size: { size: parseFloat(newSize), id: newSizeId }, // Assuming you might need to generate an ID for the new size
                color: [{ color: { id: newColorId, color: standardizedNewColor }, quantity: newQuantity }]
            });
        }

        console.log("updated here ", updatedSizeColorCombos)

        setSizeColorCombos(updatedSizeColorCombos);
        // Reset the input fields
        setNewSize('');
        setNewColor('');
        setNewQuantity(0);
    };

    const handleSaveChanges = async (e) => {
        // Construct the request body according to the backend's expected format
        e.preventDefault();

        console.log("what I am sending")
        const requestBody = {
            product: {
                id: id,  // Assuming `id` is the product ID from the router or state
                name: productName,
                price: parseFloat(productPrice),
                category: {
                    categoryID: parseInt(productCategory),
                   // category: categories.find(cat => cat.categoryID.toString() === productCategory)?.category || ""
                },
                description: productDescription,
                ecoImpact: ecoImpact,
            },
            sizeColorDTO: sizeColorCombos,
             
            price: parseFloat(productPrice),
            images: [],
            productEcoImpactInformation: [
                {
                  ecoImpact: ecoImpact,
                  id: ecoId
                  
                  
                  
                }
              ]
        };
    
        console.log("request body", requestBody)
        try {
            const token = sessionStorage.getItem('token'); // Retrieve the token if authentication is required
            const response = await axios.put(`http://localhost:8080/admin/product/${id}`, requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Assuming your API requires Bearer token authentication
                }
            });
            console.log('Product updated successfully:', response.data);
            // Handle post-update logic here, such as redirecting the user or showing a success message
           router.push('/products')
        } catch (error) {
            console.error('Failed to update product:', error.response?.data || error.message);
            // Handle errors, such as displaying an error message to the user
        }
    };
    

    const handleRemoveSizeColorCombo = (sizeIndex, colorIndex) => {
        const updatedSizeColorCombos = [...sizeColorCombos];
        // Correctly access the 'color' array to perform the splice operation
        updatedSizeColorCombos[sizeIndex].color.splice(colorIndex, 1);

        // Check if there are no more colors left for this size
        if (updatedSizeColorCombos[sizeIndex].color.length === 0) {
            // Remove the entire size entry if no colors are left
            updatedSizeColorCombos.splice(sizeIndex, 1);
        }

        // Update the state with the new array
        setSizeColorCombos(updatedSizeColorCombos);
    };

    // const handleStockChange = (sizeIndex, colorIndex, newQuantity) => {
    //     const newCombos = sizeColorCombos.map((item, idx) => {
    //         if (idx === sizeIndex) {
    //             const newColors = item.color.map((col, cIdx) => {
    //                 if (cIdx === colorIndex) {
    //                     return { ...col, quantity: newQuantity };
    //                 }
    //                 return col;
    //             });
    //             return { ...item, color: newColors };
    //         }
    //         return item;
    //     });
    //     setSizeColorCombos(newCombos);

    //     console.log("change in combo", newCombos);
    // };

    const handleStockChange = (sizeIndex, colorIndex, newQuantity) => {
        // Ensure newQuantity is a positive number
        if (newQuantity <= 0) {
            alert('Quantity must be a positive number.');
            return; // Early return to prevent updating with invalid data
        }
    
        const newCombos = sizeColorCombos.map((item, idx) => {
            if (idx === sizeIndex) {
                const newColors = item.color.map((col, cIdx) => {
                    if (cIdx === colorIndex) {
                        return { ...col, quantity: newQuantity };
                    }
                    return col;
                });
                return { ...item, color: newColors };
            }
            return item;
        });
        setSizeColorCombos(newCombos);
    
        console.log("change in combo", newCombos);
    };
    

    if (loading || !product) {
        return <div>Loading...</div>;
    }

    if (!sizeColorCombos || !categories.length) {
        console.log("sizecolorcombo not available yet")
        return <div className='text-re'>No product data available or categories failed to load.</div>;
    }

    return (
        <div className="container mx-auto p-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-2xl font-bold mb-4 text-black ">Edit Product</h1>

            {/* Product Information Section */}
            <div className="mb-8">
                <h2 className="text-xl text-black font-semibold mb-2">Product Information</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
                        Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="productName"
                        type="text"
                        placeholder="Product Name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productPrice">
                        Price ($)
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="productPrice"
                        type="number"
                        placeholder="Price"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productCategory">
                        Category
                    </label>
                    <select
                        id="productCategory"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={productCategory}
                        onChange={(e) => setProductCategory(e.target.value)}
                    >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat.categoryID} value={cat.categoryID}>
                                {cat.category}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productDescription">
                        Description
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="productDescription"
                        placeholder="Description"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productDescription">
                        Eco Impact
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="productDescription"
                        placeholder="Eco Impact"
                        value={ecoImpact}
                        onChange={(e) => setEcoImpact(e.target.value)}
                        required
                    />
                </div>
            </div>

            {/* Size and Color Management Section */}
            <div className="mb-8">
                <h2 className="text-black text-xl font-semibold mb-2">Size & Color Stock</h2>
                {sizeColorCombos?.map((sizeCombo, sizeIndex) => (
                    <div key={sizeIndex} className="mb-4">
                        <h3 className="text-black font-semibold">Size: {sizeCombo.size.size}</h3>
                        {sizeCombo.color.map((colorCombo, colorIndex) => (
                            <div key={colorIndex} className="flex items-center mb-2">
                                <p className="text-black w-20 mr-4">{colorCombo.color.color}</p>
                                <input
                                    type="number"
                                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 mr-4"
                                    value={colorCombo.quantity}
                                    onChange={(e) => handleStockChange(sizeIndex, colorIndex, parseInt(e.target.value))}
                                />
                                <button
                                    onClick={() => handleRemoveSizeColorCombo(sizeIndex, colorIndex)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                ))}

            </div>


            {/* Add New Size/Color Combination Section */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2 text-black">Add New Size/Color</h2>
                <div className="flex flex-wrap items-center gap-4">
                    <div>
                        <label htmlFor="newSize" className="block text-sm font-medium text-gray-700">Size</label>
                        <select
                            id="newSize"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-black"
                            value={newSize}
                            onChange={(e) => {
                                const selectedSize = e.target.value;
                                console.log('Selected size value:', selectedSize); // Check what value is being received
                                setNewSize(selectedSize); // Update state with size
                                const selectedSizeData = availableSizes.find(size => Number(size.size) === Number(selectedSize));


                                console.log(selectedSize)

                                if (selectedSizeData) {
                                    console.log('Selected Size ID:', selectedSizeData.id); // Check if ID is being found
                                    setNewSizeId(selectedSizeData.id)
                                }
                            }}
                        >
                            <option value="">Select size</option>
                            {availableSizes.map((size) => (
                                <option key={size.id} value={size.size}>{size.size}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="newColor" className="block text-sm font-medium text-gray-700">Color</label>
                        <select
                            id="newColor"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-black"
                            value={newColor}
                            onChange={(e) => {
                                const selectedColorName = e.target.value;
                                setNewColor(selectedColorName); // Update state with color name
                                const selectedColor = availableColors.find(color => color.color === selectedColorName);
                                if (selectedColor) {
                                    console.log('Selected Color ID:', selectedColor.id);
                                    setNewColorId(selectedColor.id) // Use the ID as needed
                                }
                            }}
                        >
                            <option value="">Select color</option>
                            {availableColors.map((color) => (
                                <option key={color.id} value={color.color}>{color.color}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="newQuantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                        <input
                            type="number"
                            id="newQuantity"
                            className="text-black mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            value={newQuantity}
                            onChange={(e) => setNewQuantity(parseInt(e.target.value))}
                            min="0"
                        />
                    </div>
                    <button
                        onClick={handleAddSizeColorCombo}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Add
                    </button>
                </div>
            </div>



            {/* Save/Submit Button */}
            <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleSaveChanges}
                >
                    Edit Product
                </button>
            </div>
        </div>
    );
}
