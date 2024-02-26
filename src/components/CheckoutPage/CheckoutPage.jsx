import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';
import {
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { loadStripe } from '@stripe/stripe-js';
// import { url } from "../App/ApiConfig";



function CheckoutPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const now = DateTime.now().toISO();
  const cart = useSelector((state) => state.cart);
  const total = useSelector((state) => state.total);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [payAtRestaurant, setPayAtRestaurant] = useState(false);
// State for tracking if the form is currently being submitted. Used to display a loading indicator and prevent duplicate submissions
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStripePayment = async (cart) => {
    // Initialize Stripe with your public API key.
    // const stripe = await loadStripe("");
    const body = {
      products: cart,
    };
    // Set up headers for the request, including the auth token and content type
    const headers = {
      "x-auth-token": localStorage.getItem("token"), // Retrieve auth token stored in localStorage
      "Content-Type": "application/json", // Specify the content type as JSON
    };
    try {
      // Make a POST request to your server endpoint to create a Stripe checkout session
      const response = await fetch(`${url}/stripe/create-checkout-session`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
      // Throw an error with the HTTP status to handle it accordingly
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Parse the JSON response to get the Stripe session ID
      const session = await response.json();
      // Redirect the user to Stripe's checkout page using the session ID
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      // Check if there's an error with the Stripe redirect and log it
      if (result.error) {
        console.log(result.error.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (payAtRestaurant) {
      submitOrder();
    }
  };

  const handleRemove = (index, price) => {
    dispatch({ type: "REMOVE", payload: { index, price } });
  };

  const submitOrder = () => {
    if (cart.length === 0) {    
   return alert("Empty cart!") }
   if (!firstName, !lastName, !phone) {    
    return alert("fill out required fields!") }
    const newOrder = {
      firstName,
      lastName,
      phone,
      payAtRestaurant,
      total: total,
      time: now,
      items: cart.map((item) => ({
        menuItemId: item.id,
        quantity: item.quantity,
        notes: item.notes || "",
      })),
    };
    
    axios
      .post("/api/orders", newOrder)
      .then(() => {
        dispatch({ type: "RESET" });
        history.push("/checkout-success");
        Swal.fire({
          icon: "success",
          showConfirmButton: false,
          timer: 1200,
          confirmButtonColor: '#027662'
        });
      })
      .catch((error) => {
        alert("Error submitting order: " + error.message);
      });
  };

  return (

    // Using MUI Grid to structure the page into two sections
    <Grid container spacing={2}>

     {/* Left section for displaying the cart items */}
      <Grid item xs={12} md={6}>
        <Typography
          sx={{
            mb: 2,
            pb: 1,
            borderBottom: 2,
            borderColor: "divider",
            textAlign: "center",
          }}
          align="center"
          variant="h6"
        >
          Cart
        </Typography>
           {/* List to display each cart item */}
        <List>
          {cart.map((item, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={item.name}
                secondary={`Quantity: ${item.quantity}`}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon onClick={() => handleRemove(index, item.price)} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Grid>

        {/* Right section for the checkout form */}
      <Grid item xs={12} md={6}>
        <Typography variant="h6">Checkout</Typography>
        <Typography variant="body1">Total: ${total.toFixed(2)}</Typography>

        {/* Form for checkout input fields and submission */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "20px",
          }}
        >

            {/* TextFields for user input */}
          <TextField
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Phone"
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
          />

           {/* Checkbox for selecting payment method */}
          <FormControlLabel
            control={
              <Checkbox
                checked={payAtRestaurant}
                onChange={(e) => setPayAtRestaurant(e.target.checked)}
              />
            }
            label="Pay at Restaurant"
          />

            {/* Conditionally render button for placing order if paying at the restaurant */}
          {!payAtRestaurant && (
            <button
              style={{
                cursor: "pointer",
                backgroundColor: "#5433FF",
                color: "white",
                height: "37.5px",
                fontSize: "108%",
              }}
              onClick={() => handleStripePayment(cart)}
            >
              {" "}
              Pay Online with Stripe
            </button>
          )}
          <LoadingButton
            loading={isSubmitting}
            variant="contained"
            type="submit"
            disabled={!payAtRestaurant}
            sx={{
              mt: -1.35,
              backgroundColor: payAtRestaurant ? "#087c69" : "#a5d6a7",
              "&:hover": {
                backgroundColor: payAtRestaurant ? "#065a52" : "#81c784",
              },
            }}
          >
            Place Order
          </LoadingButton>
        </form>
      </Grid>
    </Grid>
  );
}

export default CheckoutPage;