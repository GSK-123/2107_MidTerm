import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import HomeBar from '../components/HomeBar';
import ProductCard from '../components/ProductCard';
import useNavigation from '../hooks/useNavigation';
import useQueryParam from '../hooks/useQueryParam';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function ProductsPage({ navigate, category }) {
    const [allProducts, setAllProducts] = useState([]);
    const Navigate = useNavigation();
    const searchQuery = useQueryParam('search');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const url = category 
                    ? `https://fakestoreapi.com/products/category/${category}` 
                    : 'https://fakestoreapi.com/products';
                const response = await fetch(url);
                const data = await response.json();
                
                const filteredData = data.filter(
                    product => product.category !== 'jewelery' &&
                    (searchQuery ? product.title.toLowerCase().includes(searchQuery.toLowerCase()) : true)
                );
                setAllProducts(filteredData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, [category, searchQuery]);

    if (allProducts.length === 0) return <div>Loading Products...</div>;

    return (
        <div>
            <HomeBar navigate={navigate} /> {/* HomeBar included at the top */}
            <Typography variant="h4" gutterBottom>
                {category ? `${category} Products` : 'All Products'}
            </Typography>
            <Grid container spacing={2} padding={2}>
                {allProducts.map(product => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <ProductCard
                            product={product}
                            navigate={() => Navigate(`/products/${product.id}`)}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

ProductsPage.propTypes = {
    category: PropTypes.string,
    navigate: PropTypes.func,
};

export default ProductsPage;
