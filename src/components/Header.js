import React, { useContext, useState } from "react";
import Cart from "./Cart/Cart";
import CartItem from "./Cart/CartItem";
import { AppContext } from "../Context/AppProvider ";
import { Link } from "react-router-dom";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { searchTerm, setSearchTerm, cart } = useContext(AppContext);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  // Hàm xử lý khi nhấn vào icon giỏ hàng
  // const toggleCart = () => {
  //   setIsCartOpen(!isCartOpen);
  // };

  return (
    <header className="bg-gray-800 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to={"/"}>
          <div className="text-2xl font-bold">E-Commerce</div>
        </Link>

        {/* Search Bar */}
        <div className="w-1/2">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search for products..."
            className="w-full px-4 py-2 rounded-md text-black"
          />
        </div>

        {/* Cart Icon */}
        <div
          className="relative"
          onMouseEnter={() => setIsCartOpen(true)}
          onMouseLeave={() => setIsCartOpen(false)}
        >
          <div
            style={{ cursor: "pointer" }}
            // onClick={toggleCart}
            className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-800"
          >
            <span>Cart</span>

            <span>({cart.length})</span>
          </div>

          {/* Cart Dropdown */}
          {isCartOpen && (
            <div
              className="absolute right-0 top-10 bg-gray-600 w-64 border rounded-md shadow-lg 
              z-50 transition-opacity duration-100 ease-in-out" // Thêm thuộc tính transition
              style={{ opacity: isCartOpen ? 1 : 0 }} // Thay đổi độ mờ của dropdown
            >
              <div className="h-106 overflow-y-auto">
                <CartItem />
              </div>
              <Link to={"/payment"}>
                <div className="border-t p-4">
                  <button className="w-full bg-orange-500 text-white py-2 rounded-md">
                    Show Cart
                  </button>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
