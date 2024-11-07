import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import HomeBar from '../components/HomeBar';
import CartContext from '../contexts/CartContext';
import ProductCard from '../components/ProductCard';

function Products({ productId, navigate }) {
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const { addItem } = useContext(CartContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
                const data = await response.json();
                setProduct(data);

                if (data.category) {
                    const relatedResponse = await fetch(`https://fakestoreapi.com/products/category/${data.category}`);
                    const relatedData = await relatedResponse.json();
                    const filteredRelated = relatedData.filter(item => item.id !== productId);
                    setRelatedProducts(filteredRelated);
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        fetchProducts();
    }, [productId]);

    if (!product) return <div>Loading...</div>;

    const navigateProduct = (id) => {
        navigate('products', id);
        window.history.pushState({}, '', `/products/${id}`);
    };

    return (
        <div>
            <HomeBar navigate={navigate} />
            <img src={product.image} alt={product.title} style={{ width: '200px', height: '200px' }} />
            <h2>{product.title}</h2>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <p>Description: {product.description}</p>
            <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
            <button onClick={() => addItem(product)}>Add to Cart</button>

            {relatedProducts.length > 0 && (
                <div style={{ marginTop: '2rem' }}>
                    <h3>More like &apos;{product.title}&apos;</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                        {relatedProducts.map((relatedProduct) => (
                            <ProductCard
                                key={relatedProduct.id}
                                product={relatedProduct}
                                navigate={() => navigateProduct(relatedProduct.id)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

Products.propTypes = {
    productId: PropTypes.number.isRequired,
    navigate: PropTypes.func.isRequired,
};

export default Products;
