import React, { useContext, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
// import products from "../data/products";
import axios from "axios";
import { AppContext } from "../Context/AppProvider ";

const ProductList = () => {
  const { searchTerm, products, loading } = useContext(AppContext);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [goToTop, setGoToTop] = useState(false);

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
    const handleScroll = () => {
      setGoToTop(window.scrollY >= 400);
      // console.log(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
  }, []);

  // go to top
  // const handleGoToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth", // Cuộn trang mượt mà
  //   });
  // };

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
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-4 text-center">No products found</p>
        )}
      </div>
      {goToTop && (
        <button
          className="
      fixed
      right-5
      bottom-5
      bg-black
      text-white
      border-none
      rounded-full
      w-12
      h-12
      text-lg
      cursor-pointer
      shadow-md
      transition-colors
      duration-300
      ease-in-out
      hover:bg-gray-500
    "
          onClick={() => window.scroll({ top: 0, behavior: "smooth" })} // Cuộn mượt mà
          onMouseEnter={(e) => (e.target.style.backgroundColor = "gray")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "black")}
        >
          ↑
        </button>
      )}
    </main>
  );
};

export default ProductList;
