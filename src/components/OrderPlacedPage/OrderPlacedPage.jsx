import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import MyMap from "/src/components/MyMap/MyMap"


function OrderPlacedPage() {
  const history = useHistory();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "87.5vh", // Use vh unit for responsive height relative to the viewport
        gap: 4,
        paddingTop: 6,
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        Order Placed!
      </Typography>

      {/* Row of buttons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
        }}
      >
        {/* Home */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            color: "white",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
          onClick={() => history.push("/home")}
        >
          Return Home
        </Button>

        {/* order details */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#035a4c",
            color: "white",
            "&:hover": {
              backgroundColor: "#065a52",
            },
          }}
          onClick={() => history.push("/user")}
        >
          View Order
        </Button>
      </Box>
      {/* Google Maps directions */}
      <MyMap />
    </Box>
  );
}
export default OrderPlacedPage;


