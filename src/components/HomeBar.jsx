import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Button, Select, MenuItem} from '@mui/material';

function HomeBar({ navigate }) {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        
        const filteredCategories = data.filter(category => category.toLowerCase() !== 'jewelery');
        setCategories(filteredCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);
  
  const handleCategory = (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory === 'all') {
      navigate('products');
      window.history.pushState({}, '', '/products');
    } else {
      navigate('category', selectedCategory);
      window.history.pushState({}, '', `/products/categories/${selectedCategory}`);
    }
  };
  
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Button color="inherit" onClick={() => navigate('home')}>Home</Button>
        <Button color="inherit" onClick={() => { navigate('products'); window.location.reload(); }}>Products</Button>
        <Button color="inherit" onClick={() => navigate('cart')}>Cart</Button>
        
        <Select
          onChange={handleCategory}
          defaultValue="all"
          variant="outlined"
          sx={{ marginLeft: '1rem', color: 'white', borderColor: 'white' }}
        >
          <MenuItem value="all">All Products</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>{category}</MenuItem>
          ))}
        </Select>
      </Toolbar>
    </AppBar>
  );
}

HomeBar.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default HomeBar;
