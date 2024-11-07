import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import useNavigation from '../hooks/useNavigation';
import PropTypes from 'prop-types';
import { Box, Typography, Grid, Button } from '@mui/material';

function CategoryCard({ category }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigation();

  useEffect(() => {
    const fetchCategory = async () => {
      if (!category) return;

      const apiUrl = `https://fakestoreapi.com/products/category/${category}`;

      try {
        const response = await fetch(apiUrl);
        const productsData = await response.json();
        setProducts(productsData);
      } catch (error) {
        console.error(`Error fetching products for category ${category}:`, error);
      }
    };

    fetchCategory();
  }, [category]);

  const decodedCategory = decodeURIComponent(category);

  return (
    <Box padding={3} width="100vw">
      <Typography variant="h4" gutterBottom>
        Products in {decodedCategory}
      </Typography>
      
      <Grid container spacing={2}>
        {products.length > 0 ? (
          products.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard
                product={product}
                navigate={() => navigate(`/products/${product.id}`)}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            No products found in this category.
          </Typography>
        )}
      </Grid>

      <Box mt={4}>
        <Button variant="contained" color="primary" onClick={() => navigate('/home')}>
          Back to Home
        </Button>
      </Box>
    </Box>
  );
}

CategoryCard.propTypes = {
  category: PropTypes.string.isRequired
};

export default CategoryCard;
