// CartContext.js
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

// Each item is stored as [quantity, name, details, imgURL]
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  //TO DO
  useEffect(() => {
    let tempTotal = 0;

    cart.forEach(([qty, name, details, url]) => {
      const price = Number(details.set_price);
      tempTotal += qty * price;
    });

    setCartTotal(Number(tempTotal.toFixed(2)));
  }, [cart]);

  function updateQuantity(name, newQty) {
    setCart(
      (prevCart) =>
        prevCart
          .map(([qty, itemName, details, imgURL]) =>
            itemName === name
              ? [newQty, itemName, details, imgURL]
              : [qty, itemName, details, imgURL]
          )
          .filter(([qty]) => qty > 0) // remove items with qty 0
    );
  }
  function addToCart(newItem) {
    setCart((prevCart) => {
      // var tempValue = (cartTotal + (newItem[0] * newItem[2].set_price));
      // setCartTotal(Number(tempValue.toFixed(2)));

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
  }

  // TODO
  function removeFromCart(name) {
    setCart((prev) => prev.filter((item) => item[0][1] !== name));
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
