import React, { useState, useEffect } from "react";

const LeftMenu = ({ onFilterChange }) => {
  const [expanded, setExpanded] = useState({
    size: false,
    color: false,
    priceRange: false,
  });
  const [selectedFilters, setSelectedFilters] = useState({
    size: [],
    color: [],
    priceRange: [],
  });
 

  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
   
     
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
  


  setLoading(false);
}, []);

const filterOptions = {
  size: availableSizes.map(sizeObj => String(sizeObj.size)),
  color: availableColors.map(colorObj => colorObj.color.charAt(0).toUpperCase() + colorObj.color.slice(1)),
  priceRange: [
    "$0 - $25",
    "$25 - $50",
    "$50 - $75",
    "$75 - $100",
    "$100 - $200",
    "$200 - $250",
      "$250 - $300",
      "$300 - $700",
  ],
};

  // Toggle function to handle expansion
  const toggleExpansion = (criterion) => {
    setExpanded((prev) => ({
      ...prev,
      [criterion]: !prev[criterion],
    }));
  };

  // Function to handle filter selection
  const handleFilterSelect = (filterType, value) => {
    const newSelectedFilters = {
      ...selectedFilters,
      [filterType]: selectedFilters[filterType].includes(value)
        ? selectedFilters[filterType].filter((item) => item !== value)
        : [...selectedFilters[filterType], value],
    };

    setSelectedFilters(newSelectedFilters);

    // Notify parent component of filter change
    onFilterChange(filterType, newSelectedFilters[filterType]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="bg-gray-300 text-gray-800 p-4" style={{ width: "200px" }}>
      <div>
        <h2 className="text-lg font-bold mb-2">Filters</h2>

        {/* Size Filter */}
        <div className="mb-4">
          <div className="flex items-center">
            <button
              onClick={() => toggleExpansion("size")}
              className="text-blue-500 hover:underline mr-2"
            >
              {expanded.size ? "-" : "+"}
            </button>
            <h3 className="text-sm font-bold">Size</h3>
          </div>
          {expanded.size && (
            <ul>
              {filterOptions.size.map((option) => (
                <li key={option}>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedFilters.size.includes(option)}
                      onChange={() => handleFilterSelect("size", option)}
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Color Filter */}
        <div className="mb-4">
          <div className="flex items-center">
            <button
              onClick={() => toggleExpansion("color")}
              className="text-blue-500 hover:underline mr-2"
            >
              {expanded.color ? "-" : "+"}
            </button>
            <h3 className="text-sm font-bold">Color</h3>
          </div>
          {expanded.color && (
            <ul>
              {filterOptions.color.map((option) => (
                <li key={option}>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedFilters.color.includes(option)}
                      onChange={() => handleFilterSelect("color", option)}
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Price Range Filter */}
        <div>
          <div className="flex items-center">
            <button
              onClick={() => toggleExpansion("priceRange")}
              className="text-blue-500 hover:underline mr-2"
            >
              {expanded.priceRange ? "-" : "+"}
            </button>
            <h3 className="text-sm font-bold">Price Range</h3>
          </div>
          {expanded.priceRange && (
            <ul>
              {filterOptions.priceRange.map((option) => (
                <li key={option}>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedFilters.priceRange.includes(option)}
                      onChange={() => handleFilterSelect("priceRange", option)}
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default LeftMenu;
