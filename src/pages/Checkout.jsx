import { useContext } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from '../contexts/CartContext';

function Checkout({ navigate }) {
  const { cartItems, clearCart, total } = useContext(CartContext);

  const handleCheckout = () => {
    alert("Thank you for your purchase!");
    clearCart();
    navigate('home');
  };

  if (cartItems.length === 0) {
    return (
      <div>
        Your cart is empty. Go back to{' '}
        <button onClick={() => navigate('home')}>Home</button>.
      </div>
    );
  }

  return (
    <div>
      <h2>Checkout</h2>
      <div>
        {cartItems.map(item => (
          <div key={item.id}>
            <p>{item.title}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <h3>Total: ${total.toFixed(2)}</h3>
      <button onClick={handleCheckout}>Place Order</button>
    </div>
  );
}

Checkout.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default Checkout;
