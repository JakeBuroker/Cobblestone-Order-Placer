import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import useReduxStore from '../../hooks/useReduxStore';
import { useEffect } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';

function UserPage() {
  const dispatch = useDispatch();
  const store = useReduxStore();
  const fetchOrders = () => {
    axios.get("/api/userOrders")
      .then((response) => {
        dispatch({ type: "SET_USER_ORDERS", payload: response.data });
      })
      .catch((error) => {
        console.error("Could not fetch orders:", error);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container">
      <h2>Welcome, {store.user.username}!</h2>
      <p>Your ID is: {store.user.id}</p>
      <p style={{ fontSize: "150%", textAlign: 'center', marginRight:'35px' }}>Order History</p>
      {store.userOrders.map((order, index) => (
        <p key={order.id}>
         Order ID: <b>{order.order_id}</b>, Total: <b>${order.total}, </b> Placed: <b>{DateTime.fromISO(order.time).toLocaleString(DateTime.DATETIME_MED)}</b> <button onClick={() => handleDetails(index)}>Details</button> 
        </p>
      ))}
    </div>
  );
      }  

// this allows us to use <App /> in index.js
export default UserPage;
