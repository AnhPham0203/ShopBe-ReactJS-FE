import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
export const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data); // Cập nhật danh sách sản phẩm
        setLoading(false); // Tắt trạng thái đang tải
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false); // Tắt trạng thái đang tải nếu có lỗi
      }
    };
    fetchProducts(); // Gọi hàm lấy dữ liệu
  }, []);

  // lấy giỏ hàng

  const fetchCart = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/cart/getCart"
      );
      // console.log(response.data);
      setCart(response.data);
    } catch (error) {}
  };

  // lưu giỏ hàng
  const addToCart = async (product) => {
    try {
      const respone = await axios.post(
        "http://localhost:8080/api/cart/save",
        product
      );
      setMessage(respone.data);
      setShowMessage(true); // Hiển thị thông báo

      // Ẩn thông báo sau 3 giây
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);

      const existingProduct = cart.find(
        (cartItem) => cartItem.id === product.id
      );
      if (existingProduct) {
        // Tăng số lượng nếu sản phẩm đã có trong giỏ
        const updatedCart = cart.map((cartItem) =>
          cartItem.id === product.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        setCart(updatedCart);
      } else {
        // Thêm sản phẩm mới vào giỏ
        setCart([...cart, { ...product, quantity: 1 }]);
      }

      // Lấy lại giỏ hàng sau khi thêm sản phẩm thành công
      await fetchCart(); // Chờ cho đến khi giỏ hàng được cập nhật
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data);
      } else {
        setMessage("Đã xảy ra lỗi khi kết nối đến server");
      }
      setShowMessage(true);

      // Ẩn thông báo sau 3 giây
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };
  useEffect(() => {
    fetchCart(); // Lấy giỏ hàng khi component được render
  }, []);

  return (
    <AppContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        cart,
        setCart,
        addToCart,
        products,
        setProducts,
        loading,
        message,
        showMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
