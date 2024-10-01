import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppProvider ";
import axios from "axios";

const CartItem = () => {
  const { cart, setCart } = useContext(AppContext);

  const handleRemoveFromCart = async (id) => {
    try {
      await axios.post(
        `http://localhost:8080/api/cart/deleteCartItem?cid=${id}`
      );
    } catch (error) {}
    const updatedCartItems = cart.filter((cartItem) => cartItem.id !== id);
    setCart(updatedCartItems);
  };

  // Hàm xử lý khi người dùng nhấn nút giảm số lượng
  const handleDecreaseQuantity = async (item, action) => {
    try {
      await axios.post("http://localhost:8080/api/cart/updateQuantity", {
        action: action,
        cid: item.id,
      });
    } catch (error) {}
    // Nếu số lượng lớn hơn 1, giảm số lượng
    if (item.quantity > 1) {
      const updatedCartItems = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
      setCart(updatedCartItems); // Cập nhật lại giỏ hàng
    }
  };

  // Hàm xử lý khi người dùng nhấn nút tăng số lượng
  const handleIncreaseQuantity = async (item, action) => {
    try {
      await axios.post("http://localhost:8080/api/cart/updateQuantity", {
        action: action,
        cid: item.id,
      });
    } catch (error) {}

    const updatedCartItems = cart.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    setCart(updatedCartItems); // Cập nhật lại giỏ hàng
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  return (
    <div className="p-5 max-h-64 overflow-y-auto bg-gray-100">
      <h2 className="text-lg font-semibold mb-3 text-black">Cart Items</h2>
      {cart.length === 0 ? (
        <p className="text-black font-medium">Your cart is empty</p> // Nếu giỏ hàng trống, hiển thị thông báo
      ) : (
        <ul className="space-y-2">
          {cart.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center border p-2 bg-white"
            >
              {/* Hiển thị hình ảnh sản phẩm */}
              <img
                alt={item.product.title}
                src={item.product.image} // Đảm bảo bạn có thuộc tính `image` trong dữ liệu sản phẩm
                className="w-16 h-16 object-cover mr-4"
              />

              <div className="flex flex-col justify-between w-full">
                {/* Hiển thị tên sản phẩm */}
                <span className="text-black font-medium">
                  {item.product.title}
                </span>

                {/* Hiển thị giá sản phẩm */}
                <span className="text-black">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>

                {/* Nút tăng giảm số lượng */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDecreaseQuantity(item, "decrease")}
                    className="px-2 py-1 bg-gray-300 text-black rounded"
                  >
                    -
                  </button>
                  <span className="text-black">{item.quantity}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(item, "increase")}
                    className="px-2 py-1 bg-gray-300 text-black rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Nút xóa sản phẩm */}
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="text-red-500 hover:text-red-700 font-bold ml-4"
              >
                X
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-total">
        <h3 className="text-black font-medium">
          Total: ${getTotalPrice().toFixed(2)}
        </h3>
      </div>
    </div>
  );
};

export default CartItem;
