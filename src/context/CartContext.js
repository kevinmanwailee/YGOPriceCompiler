// CartContext.js
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [ cartTotal, setCartTotal ] = useState(0);


  const addToCart = (newItem) => {
    setCart((prevCart) => {
      const tempValue = (newItem[0] * newItem[2].set_price)
      setCartTotal((cartTotal) => (cartTotal + tempValue).toFixed(2))
      const updatedCart = [...prevCart];
      const existingIndex = updatedCart.findIndex(
        ([, name, contents]) =>
          name === newItem[1] &&
          JSON.stringify(contents) === JSON.stringify(newItem[2])
      );

      if (existingIndex !== -1) {
        // Item exists, update quantity
        updatedCart[existingIndex][0] += newItem[0];
      } else {
        // New item, add to cart
        updatedCart.push(newItem);
      }

      return updatedCart;
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, cartTotal, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
