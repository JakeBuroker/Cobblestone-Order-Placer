import React from 'react'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios'




function CustomerCheckout() {
  const total = useSelector(store => store.total);



  const handleSubmit = event => {

  }

  return (
      <>
          <h1>Checkout</h1>

          <p>Total: {total}</p>
          <form onSubmit={handleSubmit}>
              <button type="submit">
                 Place Order
              </button>
          </form>
      </>
  );
}

export default CustomerCheckout

  
