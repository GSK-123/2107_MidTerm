import { useState, useEffect } from 'react';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { CartProvider } from './contexts/CartProvider';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentId, setCurrentId] = useState(null);

  const navigate = (page, productId = null) => {
    setCurrentPage(page);
    setCurrentId(productId);
    if (page === 'products' && productId) {
      window.history.pushState({}, '', `/products/${productId}`);
    } else if (page === 'category' && productId) {
      window.history.pushState({}, '', `/products/categories/${productId}`);
    } else if (page === 'products') {
      window.history.pushState({}, '', '/products');
    } else if (page === 'cart') {
      window.history.pushState({}, '', '/cart');
    } else if (page === 'checkout') {
      window.history.pushState({}, '', '/checkout');
    } else if (page === 'home') {
      window.history.pushState({}, '', '/');
    }
  };

  const setURL = () => {
    const path = window.location.pathname;
    const productMatch = path.match(/^\/products\/(\d+)$/);
    const categoryMatch = path.match(/^\/products\/categories\/([^/]+)$/);

    if (productMatch) {
      setCurrentPage('products');
      setCurrentId(parseInt(productMatch[1], 10));
    } else if (categoryMatch) {
      setCurrentPage('category');
      setCurrentId(categoryMatch[1]);
    } else if (path === '/products') {
      setCurrentPage('productsPage');
      setCurrentId(null);
    } else if (path === '/cart') {
      setCurrentPage('cart');
      setCurrentId(null);
    } else if (path === '/checkout') {
      setCurrentPage('checkout');
      setCurrentId(null);
    } else {
      setCurrentPage('home');
      setCurrentId(null);
    }
  };

  useEffect(() => {
    setURL();

    const handlePopState = () => {
      setURL();
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <CartProvider>
      {currentPage === 'home' && <Home navigate={navigate} />}
      {currentPage === 'productsPage' && <ProductsPage navigate={navigate} />}
      {currentPage === 'products' && currentId && (
        <Products productId={currentId} navigate={navigate} />
      )}
      {currentPage === 'category' && currentId && (
        <ProductsPage navigate={navigate} category={currentId} />
      )}
      {currentPage === 'cart' && <Cart navigate={navigate} />}
      {currentPage === 'checkout' && <Checkout navigate={navigate} />}
    </CartProvider>
  );
}

export default App;
