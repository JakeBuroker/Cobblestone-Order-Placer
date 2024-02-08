

import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function CheckoutPage() {
  const cart = useSelector(state => state.cart);
  const total = useSelector(state => state.total);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [onlinePayment, setOnlinePayment] = useState(false);
  const history = useHistory()

  const handleSubmit = (event) => {
    event.preventDefault();
history.push('/orderplaced')
    const newOrder = {
      firstName,
      lastName,
      phone,
      onlinePayment,
      total: total,
      time: new Date().toISOString(),
      items: cart.map(item => ({
        menuItemId: item.id,
        quantity: item.quantity,
        notes: item.notes || ''
      }))
    };

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
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default CheckoutPage
