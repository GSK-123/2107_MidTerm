import PropTypes from 'prop-types';
import { Card, CardMedia, CardContent, Typography} from '@mui/material';

function ProductCard({ product, navigate }) {
  return (
    <Card onClick={navigate} sx={{ maxWidth: 250, cursor: 'pointer', border: '1px solid #ccc', padding: '1rem' }}>
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt={product.title}
      />
      <CardContent>
        <Typography variant="h6">{product.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          ${product.price}
        </Typography>
      </CardContent>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  navigate: PropTypes.func.isRequired,
};

export default ProductCard;
