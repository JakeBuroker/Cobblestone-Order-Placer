import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';

function OrderPlacedPage() {
  const history = useHistory();

  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70vh', 
        gap: 2, 
      }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Order Placed!
      </Typography>
      <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
        }}>
        <Button variant="contained" sx={{
            backgroundColor: 'black', 
            color: 'white',
            '&:hover': {
              backgroundColor: '#333',
            },
          }}
          onClick={() => history.push("/home")} >
          Return Home </Button>
        <Button variant="contained"
          sx={{
            backgroundColor: "#035a4c", 
            color: 'white',
            '&:hover': {
              backgroundColor: '#065a52',
            },
          }}
          onClick={() => history.push("/user")} >
          View Order
        </Button>
      </Box>
    </Box>
  );
}

export default OrderPlacedPage;


