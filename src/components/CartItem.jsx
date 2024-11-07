import PropTypes from 'prop-types';
import { Box, Typography, TextField, Button } from '@mui/material';

function CartItem({ item, updateQty, removeItem }) {
  return (
    <Box display="flex" alignItems="center" gap={2} p={2} border="1px solid #ccc" borderRadius={1}>
      <img src={item.image} alt={item.title} style={{ width: '50px', height: '50px' }} />
      <Box flexGrow={1}>
        <Typography variant="h6">{item.title}</Typography>
        <Typography variant="body2" color="textSecondary">Price: ${item.price}</Typography>
        <TextField
          label="Quantity"
          type="number"
          min="1"
          variant="outlined"
          value={item.qty}
          onChange={(e) => updateQty(Number(e.target.value))}
          sx={{ width: '100px', mt: 1 }}
        />
      </Box>
      <Button variant="outlined" color="secondary" onClick={removeItem}>
        Remove
      </Button>
    </Box>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    qty: PropTypes.number.isRequired,
  }).isRequired,
  updateQty: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default CartItem;
