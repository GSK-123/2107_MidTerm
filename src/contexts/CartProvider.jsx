import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import CartContext from './CartContext';

export const CartProvider = ({ children }) => {
  const [cartItems, setCart] = useState([]);

  const addItem = (product, quantity = 1) => {
    setCart((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const updateItem = (productId, quantity) => {
    setCart((prevItems) =>
      prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeItem = (productId) => {
    setCart((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const contextValue = useMemo(
    () => ({
      cartItems,
      addItem,
      updateItem,
      removeItem,
      clearCart,
      total,
    }),
    [cartItems, total]
  );

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartProvider;
