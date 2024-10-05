import React, { useContext, useState } from "react";
import Cart from "./Cart/Cart";
import CartItem from "./Cart/CartItem";
import { AppContext } from "../Context/AppProvider ";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShopBee from "../assets/image.png";
import Cart1 from "../assets/cart.png";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { searchTerm, setSearchTerm, cart, user } = useContext(AppContext);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <header className="bg-white shadow-md py-3 fixed top-0 left-0 w-full z-50 ">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to={"/"} className="flex items-center space-x-2">
          <img src={ShopBee} alt="E-Commerce Logo" className="w-10 h-10" />
          <span className="text-xl font-bold text-orange-500">ShopBee</span>
        </Link>

        {/* Search Bar */}
        <div className="w-1/2 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-orange-500 px-4 py-2 rounded-full hover:bg-orange-600">
            Tìm kiếm
          </button>
        </div>

        {user ? (
          <>
            <div className="flex items-center space-x-6">
              <div
                className="relative inline-block"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* Hiển thị tên người dùng */}
                <span className="cursor-pointer text-black">
                  Chào, <strong>{user.name}</strong>
                </span>

                {/* Dropdown khi hover */}
                {isOpen && (
                  <div className="absolute right-0  w-48 bg-white rounded-md shadow-lg py-2 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:text-orange-500"
                    >
                      Hồ sơ của tôi
                    </Link>
                    {/* Login */}
                    <Link
                      to={"/login"}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:text-orange-500"
                    >
                      <div className="flex items-center space-x-2">
                        <span>Đăng xuất</span>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Giỏ Hàng khi có user */}
              <div
                className="relative"
                onMouseEnter={() => setIsCartOpen(true)}
                onMouseLeave={() => setIsCartOpen(false)}
              >
                <div className="flex items-center space-x-2 cursor-pointer bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600">
                  <img src={Cart1} alt="Cart" className="w-6 h-6" />
                  <span className="bg-red-500 text-xs rounded-full px-2 py-1">
                    {cart.length}
                  </span>
                </div>

                {/* Cart Dropdown */}
                {isCartOpen && (
                  <div className="absolute right-0 top-10 bg-white w-80 border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="p-4 max-h-64 overflow-y-auto">
                      {cart.length > 0 ? (
                        cart.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center space-x-4 py-2 border-b"
                          >
                            <img
                              src={item.product.image}
                              alt={item.product.title}
                              className="w-12 h-12 object-cover"
                            />
                            <div className="flex-1">
                              <p className="text-gray-800 font-medium">
                                {item.product.title}
                              </p>
                              <p className="text-gray-500 text-sm">
                                {item.quantity} x $
                                {item.product.price.toFixed(2)}
                              </p>
                            </div>
                            <p className="text-gray-800 font-bold">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-gray-500">
                          Giỏ hàng trống
                        </p>
                      )}
                    </div>

                    {cart.length > 0 && (
                      <div className="p-4 border-t bg-gray-100">
                        <Link to={"/payment"}>
                          <button className="w-full bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600">
                            Xem giỏ hàng
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center space-x-6">
            {/* Login */}
            <Link to={"/login"} className="text-gray-600 hover:text-orange-500">
              <div className="flex items-center space-x-2">
                <span>Đăng nhập</span>
              </div>
            </Link>
            <span>|</span>
            <Link
              to={"/register"}
              className="text-gray-600 hover:text-orange-500"
            >
              <div className="flex items-center space-x-2">
                <span>Đăng Ký</span>
              </div>
            </Link>

            {/* Giỏ Hàng khi không có user */}
            <div
              className="relative"
              onMouseEnter={() => setIsCartOpen(true)}
              onMouseLeave={() => setIsCartOpen(false)}
            >
              <div className="flex items-center space-x-2 cursor-pointer bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600">
                <img src={Cart1} alt="Cart" className="w-6 h-6" />
                <span className="bg-red-500 text-xs rounded-full px-2 py-1">
                  0
                </span>
              </div>

              {/* Cart Dropdown */}
              {isCartOpen && (
                <div className="absolute right-0 top-10 bg-white w-80 border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-4 max-h-64 overflow-y-auto">
                    <p className="text-center text-gray-500">Giỏ hàng trống</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Login & Cart */}
      </div>
    </header>
  );
};

export default Header;
