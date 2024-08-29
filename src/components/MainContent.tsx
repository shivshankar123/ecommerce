import React, { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import { Tally3 } from "lucide-react";
import axios from "axios";

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilter();

  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
          (currentPage - 1) * itemsPerPage
        }`;

        if (keyword) {
          url = `https://dummyjson.com/products?q=${keyword}`;
        }

        const response = await axios.get(url);
        setProducts(response.data.products);
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
      console.log(filteredProducts);
    }
  };

  return (
    <section className="xl:w-[55rem] lg:w-[55rem] sm:w[40rem] xs:w-[20rem] p-5 bg-white">
      {" "}
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="relative mb-5 mt-5">
            <button className="border px-4 py-2 rounded-full flex items-center">
              <Tally3 className="mr-2" />
              {filter === "all"
                ? "filter"
                : filter.charAt(0).toLowerCase() + filter.slice(1)}
            </button>

            {dropdownOpen && (
              <div className="absolute top-12 right-0 bg-white shadow-md rounded-md p-2">
                <button
                  onClick={() => setFilter("cheap")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  cheap
                </button>

                <button
                  onClick={() => setFilter("expensive")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  expensive
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
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-100 p-4 rounded-md shadow-md"
            >
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p>{product.description}</p>
              <p className="text-xl font-semibold">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
      MainContent
    </section>
  );
};

export default MainContent;
