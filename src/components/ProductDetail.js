import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../Context/AppProvider ";

const ProductDetail = () => {
  const { id } = useParams(); // Lấy ID sản phẩm từ URL
  const [product, setProduct] = useState(null);

  const { addToCart, showMessage, message } = useContext(AppContext);
  // console.log("message = ", showMessage);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!product || product.id !== id) {
        try {
          const response = await axios.get(
            `https://fakestoreapi.com/products/${id}`
          );
          setProduct(response.data); // Cập nhật danh sách sản phẩm
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching products:", error);
          // setLoading(false); // Tắt trạng thái đang tải nếu có lỗi
        }
      }
    };
    fetchProducts(); // Gọi hàm lấy dữ liệu
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-8 py-8">
      {/* Hiển thị thông báo nếu có message */}
      {showMessage && (
        <div className="fixed top-13 right-5 bg-green-600 text-white px-4 py-2 rounded-md shadow-md transition-transform transform-gpu animate-slide-in">
          {message}
        </div>
      )}
      <div className="flex space-x-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-1/3 h-auto object-cover rounded-lg"
        />

        <div className="flex flex-col justify-between w-2/3">
          <div>
            <h1 className="text-xl font-bold mb-2">{product.title}</h1>

            <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
            <p className="text-xl font-bold">${product.price}</p>
          </div>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-1/2"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
