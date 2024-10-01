import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppProvider ";
import CartItem from "./Cart/CartItem";
import axios from "axios";

const Payment = () => {
  const { cart } = useContext(AppContext);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  // Hàm xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };
  //   console.log(userInfo);

  // Tính tổng tiền trong giỏ hàng
  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic để xử lý thông tin thanh toán
    // try {
    //   const response = await axios.post(
    //     "http://localhost:8080/api/cart/save",
    //     cart
    //   );
    //   console.log("CART", cart);

    //   console.log("Cart saved:", response.data);
    // } catch (error) {
    //   console.error("Error saving cart:", error);
    // }
  };

  return (
    <div className="container mx-auto px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Payment Information</h1>

      {/* Phân chia 2 cột */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form thông tin cá nhân */}
        <div>
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            <div>
              <label className="block font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={userInfo.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block font-bold mb-2" htmlFor="address">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={userInfo.address}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block font-bold mb-2" htmlFor="phone">
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={userInfo.phone}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-800"
            >
              Submit Payment
            </button>
          </form>
        </div>

        {/* Chi tiết giỏ hàng */}
        <div className="border p-6 rounded-lg bg-white shadow-md">
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          {/* {cart.length > 0 ? (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Your cart is empty.</p>
          )} */}
          <div className="">
            <CartItem cartItems={cart} />
          </div>
          <div className="border-t mt-4 pt-4 text-right">
            <p className="text-xl font-bold">Total: ${getTotalPrice()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
