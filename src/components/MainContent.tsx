import React, { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import { Tally3 } from "lucide-react";
import BookCard from "./BookCard";
import axios from "axios";

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilter();

  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const itemsPerPage = 12;
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
          (currentPage - 1) * itemsPerPage
        }`;

        if (keyword) {
          url = `https://dummyjson.com/products/search?q=${keyword}&limit=${itemsPerPage}&skip=${
            (currentPage - 1) * itemsPerPage
          }`;
        }

        const response = await axios.get(url);
        setProducts(response.data.products);
        setTotalProducts(response.data.total);
        console.log(response.data.products);
      } catch (error) {
        console.error("Error Fetching Products", error);
      }
    };

    fetchProducts();
  }, [keyword, currentPage]);

  const getFilteredProducts = () => {
    let filteredProducts = products;

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      );
    }

    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (filter) {
      case "cheap":
        return filteredProducts.sort((a, b) => a.price - b.price);
      case "expensive":
        return filteredProducts.sort((a, b) => b.price - a.price);
      case "Popular":
        return filteredProducts.sort((a, b) => b.rating - a.rating);
      default:
        return filteredProducts;
    }
  };

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationButtons = () => {
    const buttons: number[] = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage - 2 < 1) {
      endPage = Math.min(totalPages, endPage + (2 - currentPage - 1));
    }

    if (currentPage + 2 > totalPages) {
      startPage = Math.max(1, startPage - (2 - (totalPages - currentPage)));
    }

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(page);
    }
    return buttons;
  };

  const filteredProducts = getFilteredProducts();

  return (
    <section className="xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5 bg-white">
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="relative mb-5 mt-5">
            <button
              className="border px-4 py-2 rounded-full flex items-center"
              onClick={() => setDropDownOpen(!dropdownOpen)}
            >
              <Tally3 className="mr-2" />
              {filter === "all"
                ? "Filter"
                : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>

            {dropdownOpen && (
              <div className="absolute top-12 right-0 bg-white shadow-md rounded-md p-2">
                <button
                  onClick={() => setFilter("cheap")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Cheap
                </button>
                <button
                  onClick={() => setFilter("expensive")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Expensive
                </button>
                <button
                  onClick={() => setFilter("Popular")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Popular
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <BookCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.thumbnail}
              price={product.price}
            />
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
          <button
            className="border border-gray-300 px-4 py-2 mx-2 rounded-lg text-gray-500 hover:text-black hover:bg-gray-100"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <div className="flex flex-wrap justify-center space-x-2">
            {getPaginationButtons().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`border border-gray-300 px-4 py-2 rounded-lg ${
                  page === currentPage
                    ? "bg-black text-white"
                    : "text-gray-500 hover:text-black hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className="border border-gray-300 px-4 py-2 mx-2 rounded-lg text-gray-500 hover:text-black hover:bg-gray-100"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default MainContent;
