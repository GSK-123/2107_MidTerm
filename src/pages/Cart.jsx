import { useContext } from 'react';
import CartContext from '../contexts/CartContext';
import useNavigation from '../hooks/useNavigation';

function Cart() {
  const { cartItems, updateItem, removeItem, total } = useContext(CartContext);
  const navigate = useNavigation();

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
              <img src={item.image} alt={item.title} style={{ width: '50px', height: '50px' }} />
              <h2>{item.title}</h2>
              <p>Price: ${item.price}</p>
              <p>
                Quantity: 
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => updateItem(item.id, parseInt(e.target.value))}
                />
              </p>
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          ))}
          <h2>Total: ${total.toFixed(2)}</h2>
          {cartItems.length > 0 && (
            <button onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
          )}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}

      <button onClick={() => navigate('/home')}>Back to Home</button>
    </div>
  );
}

export default Cart;
