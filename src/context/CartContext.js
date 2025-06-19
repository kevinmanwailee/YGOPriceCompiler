// CartContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

// Each item is stored as { quantity, name, imgURL, details }
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    let tempTotal = 0;
    cart.forEach((item) => {
      const price = Number(item.details.set_price);
      tempTotal += item.quantity * price;
    });
    setCartTotal(Number(tempTotal.toFixed(2)));
  }, [cart]);

  function updateQuantity(name, newQty) {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.name === name
            ? { ...item, quantity: newQty }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function addToCart(newItem) {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const existingIndex = updatedCart.findIndex(
        (item) =>
          item.name === newItem.name &&
          JSON.stringify(item.details) === JSON.stringify(newItem.details)
      );

      if (existingIndex !== -1) {
        // Item exists, update quantity
        updatedCart[existingIndex].quantity += newItem.quantity;
      } else {
        // New item, add to cart
        updatedCart.push({
          quantity: newItem.quantity,
          name: newItem.name,
          imgURL: newItem.imgURL,
          details: newItem.details,
        });
      }

      return updatedCart;
    });
  }

  function removeFromCart(name) {
    setCart((prev) => prev.filter((item) => item.name !== name));
  }

  return (
    <CartContext.Provider
      value={{ cart, cartTotal, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
