import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import HomeBar from '../components/HomeBar';
import useNavigation from '../hooks/useNavigation';
import PropTypes from 'prop-types';
import { Grid, Box, Typography, Button } from '@mui/material';

function Home({ navigate }) {
  const [categories, setCategories] = useState([]);
  const [recommended, setRecommended] = useState({});
  const customNavigate = useNavigation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        let categoriesData = await response.json();
        categoriesData = categoriesData.filter(category => category !== 'jewelery');
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      const productData = {};
      for (const category of categories) {
        try {
          const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
          const products = await response.json();
          productData[category] = products.slice(0, 2);
        } catch (error) {
          console.error(`Error fetching products for ${category}:`, error);
        }
      }
      setRecommended(productData);
    };

    if (categories.length > 0) {
      fetchCategory();
    }
  }, [categories]);

  const handleSearch = (query) => {
    customNavigate(`/products?search=${query}`);
  };

  return (
    <Box width="97vw" padding={2}>
      <HomeBar navigate={navigate} />
      <Box my={3}>
        <SearchBar onSearch={handleSearch} />
      </Box>
      
      <Typography variant="h4" gutterBottom>
        Recommended Products
      </Typography>
      
      {Object.keys(recommended).map((category) => (
        <Box key={category} mb={4}>
          <Typography variant="h5" color="textSecondary" gutterBottom>
            {category}
          </Typography>
          
          <Grid container spacing={2}>
            {recommended[category].map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductCard
                  product={product}
                  navigate={() => customNavigate(`/products/${product.id}`)}
                />
              </Grid>
            ))}
          </Grid>
          
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => navigate('category', category)}
          >
            See All {category}
          </Button>
        </Box>
      ))}
    </Box>
  );
}

Home.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default Home;
