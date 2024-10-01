import React from "react";
import CartItem from "./CartItem";

const Cart = ({ cartItems }) => {
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="cart">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {/* <CartItem cartItems={cartItems} /> */}
          </div>
          <div className="cart-total">
            <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
