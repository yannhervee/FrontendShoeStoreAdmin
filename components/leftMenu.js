import React, { useState } from "react";

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
  const filterOptions = {
    size: ["7", "8", "9"],
    color: ["Red", "Blue", "White", "Brown", "Gold", "Pink", "Black"],
    priceRange: [
      "$0 - $25",
      "$25 - $50",
      "$50 - $75",
      "$75 - $100",
      "$100 - $200",
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
