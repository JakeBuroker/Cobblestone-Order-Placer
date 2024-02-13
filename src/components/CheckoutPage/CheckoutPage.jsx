import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';
import { Grid, TextField, Checkbox, FormControlLabel,Typography,List,ListItem,ListItemText,ListItemSecondaryAction, IconButton,} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';
import PayButton from '../PayButton/PayButton';
import CheckIcon from '@mui/icons-material/Check';

function CheckoutPage() {
  const cart = useSelector((state) => state.cart);
  const total = useSelector((state) => state.total);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [payAtRestaurant, setPayAtRestaurant] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const now = DateTime.now().toISO();

  const handleStripePayment = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!firstName || !lastName || !phone) {
      alert('Fill in all required fields.');
      return;
    }
    setIsSubmitting(true);

    if (payAtRestaurant) {
      submitOrder();
    }
  };

  const handleRemove = (index, price) => {
    dispatch({ type: 'REMOVE', payload: { index, price } });
  };
  

  const submitOrder = () => {
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
        notes: item.notes || '',
      })),
    };

    axios
      .post('/api/orders', newOrder)
      .then(() => {
        dispatch({ type: 'RESET' });
        history.push('/checkout-success');
        alert('Order placed successfully!');
      })
      .catch((error) => {
        alert('Error submitting order: ' + error.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Typography
          sx={{ mb: 2, pb: 1, borderBottom: 2, borderColor: 'divider', textAlign: 'center' }}
          align="center"
          variant="h6"
        >
          Cart
        </Typography>
        <List>
          {cart.map((item, index) => (
            <ListItem key={index} divider>
              <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon onClick ={() => handleRemove(index, item.price)}/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6">Checkout</Typography>
        <Typography variant="body1">Total: ${total.toFixed(2)}</Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
          <TextField label="First Name" variant="outlined" value={firstName} onChange={(e) => setFirstName(e.target.value)} fullWidth />
          <TextField label="Last Name" variant="outlined" value={lastName} onChange={(e) => setLastName(e.target.value)} fullWidth />
          <TextField label="Phone" variant="outlined" value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth />
          <FormControlLabel
            control={<Checkbox checked={payAtRestaurant} onChange={(e) => setPayAtRestaurant(e.target.checked)} />}
            label="Pay at Restaurant" />
          {!payAtRestaurant && <PayButton   onClick={handleStripePayment} ></PayButton>}
          <LoadingButton
            loading={isSubmitting}
            variant="contained"
            type="submit"
            disabled={!payAtRestaurant}
            sx={{ mt: -1.35, backgroundColor: payAtRestaurant ? '#087c69' : '#a5d6a7', '&:hover': { backgroundColor: payAtRestaurant ? '#065a52' : '#81c784' } }} >
            Place Order
          </LoadingButton>
        </form>
      </Grid>
    </Grid>
  );
}

export default CheckoutPage;