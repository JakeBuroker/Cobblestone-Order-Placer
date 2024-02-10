

import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';
import  LoadingButton  from '@mui/lab/LoadingButton';

function CheckoutPage() {
  const cart = useSelector(state => state.cart);
  const total = useSelector(state => state.total);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [onlinePayment, setOnlinePayment] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory()
  const now = DateTime.now().toISO()

  
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
history.push('/orderplaced')
    const newOrder = {
      firstName,
      lastName,
      phone,
      onlinePayment,
      total: total,
      time: now,
      items: cart.map(item => ({
        menuItemId: item.id,
        quantity: item.quantity,
        notes: item.notes || ''
      }))
    };
    console.log(now)

    axios.post('/api/orders', newOrder)
      .then(response => {
        console.log('Order submitted successfully', response.data);
        alert('Order placed');
      })
      .catch(error => {
        console.error('Error submitting order:', error);
        alert('Error submitting order: ' + error.message);
      });
  };

  return (
    <>
      <h2>Checkout</h2>
      <p>Total: ${total}</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
        <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
        <input type="text" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
        <div>
          <label>
            Pay at restaurant:
            <input type="checkbox" checked={onlinePayment} onChange={e => setOnlinePayment(e.target.checked)} />
          </label>
        </div>
        <LoadingButton  sx={{
                  border: '2px solid',
                 color: 'green'
                }}loading={isSubmitting} loadingIndicator="Loading…" variant="outlined" type="submit">Place Order</LoadingButton>
      </form>
    </>
  );
}

export default CheckoutPage
