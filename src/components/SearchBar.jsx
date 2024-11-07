import { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Box } from '@mui/material';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={1} mt={2}>
      <TextField
        variant="outlined"
        placeholder="Search for products..."
        value={query}
        onChange={handleInput}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
