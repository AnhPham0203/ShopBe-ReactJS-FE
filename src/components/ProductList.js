import React, { useContext, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
// import products from "../data/products";
import notfound from "../assets/notfound.png";
import { AppContext } from "../Context/AppProvider ";

const ProductList = () => {
  const { searchTerm, products, loading } = useContext(AppContext);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchTerm]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    if (category === "All") {
      setFilteredProducts(products); // Hiển thị tất cả sản phẩm nếu chọn "All"
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  };
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) {
    return <p className="text-center">Loading products...</p>;
  }

  return (
    <main className="container mx-auto px-8 py-8">
      {/* Danh sách Category */}
      <div className="mb-4 flex flex-wrap space-x-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-md ${
              selectedCategory === category
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center my-10">
            <img
              alt="notfound"
              src={notfound}
              className="w-2/3 md:w-1/2 lg:w-1/2 h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
      {isVisible && (
        <div className="fixed bottom-4 right-4">
          <button
            onClick={scrollToTop}
            className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition duration-300"
            title="Go to top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </main>
  );
};

export default ProductList;
