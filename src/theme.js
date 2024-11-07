// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#004c45', // Dark teal for navbar, buttons
    },
    secondary: {
      main: '#ffffff', // White for backgrounds and text elements
    },
    background: {
      default: '#f5f5f5', // Light gray background
    },
    text: {
      primary: '#333333', // Dark text color for readability
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
  },
});

export default theme;
