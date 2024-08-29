import React, { useState, useEffect } from "react";
import { useFilter } from "./FilterContext";

interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

const SideBar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    setKeyword,
  } = useFilter();

  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState(["apple", "watch", "Fashion", "Shoes", "Shirt"]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data: FetchResponse = await response.json();
        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error Fetching Products", error);
      }
    };

    fetchCategories();
  }, []);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };

  const handleRadioChangeCategories = (category: string) => {
    setSelectedCategory(category);
  };

  const handleKeywordClick = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword("");
  };

  return (
    <div className="w-64 p-5 h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-10 mt-4">eStore</h1>

      <section className="mb-6">
        <input
          type="text"
          className="border-2 rounded px-2 py-1 mb-4 w-full"
          placeholder="Search Products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex justify-between mb-4">
          <input
            type="text"
            className="border-2 px-2 py-1 w-full mr-2"
            placeholder="Min Price"
            value={minPrice ?? ""}
            onChange={handleMinPriceChange}
          />
          <input
            type="text"
            className="border-2 px-2 py-1 w-full"
            placeholder="Max Price"
            value={maxPrice ?? ""}
            onChange={handleMaxPriceChange}
          />
        </div>
      </section>

      <section className="mb-6">
        <div className="mb-5">
          <h2 className="text-xl font-semibold mb-3">Categories</h2>
        </div>
        {categories.map((category, index) => (
          <label key={index} className="block mb-2 flex items-center">
            <input
              type="radio"
              name="category"
              value={category}
              onChange={() => handleRadioChangeCategories(category)}
              checked={selectedCategory === category}
              className="mr-2 w-4 h-4"
            />
            {category.toUpperCase()}
          </label>
        ))}
      </section>

      <section>
        <div className="mb-5 mt-4">
          <h2 className="text-xl font-semibold mb-3">Keywords</h2>
          <div>
            {keywords.map((keyword, index) => (
              <button
                key={index}
                onClick={() => handleKeywordClick(keyword)}
                className="block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-blue-100"
              >
                {keyword.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <button
          className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-5"
          onClick={handleResetFilters}
        >
          Reset Filters
        </button>
      </section>
    </div>
  );
};

export default SideBar;
