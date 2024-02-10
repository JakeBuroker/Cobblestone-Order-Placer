import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useReduxStore from '../../hooks/useReduxStore';
import { useEffect } from 'react';
import { Dialog, DialogContent, Typography } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
import { DateTime } from 'luxon';

function UserPage() {
  const dispatch = useDispatch();
  const store = useReduxStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedDetails, setSelectedDetails] = useState([]);
  
  const fetchOrders = () => {
    axios.get("/api/userOrders")
      .then((response) => {
        dispatch({ type: "SET_USER_ORDERS", payload: response.data });
      })
      .catch((error) => {
        console.error("Could not fetch orders:", error);
      });
  };

  const fetchDetails = () => {
    axios.get('/api/details')
      .then((response) => {
        dispatch({ type: 'SET_DETAILS', payload: response.data });
      })
      .catch((error) => {
        console.error("Could not fetch details:", error);
      });
  };

  useEffect(() => {
    fetchOrders();
    fetchDetails();
  }, []);

  const openModal = (orderId) => {
    const orderDetails = store.details.filter(detail => detail.order_id === orderId);
    setSelectedDetails(orderDetails);
    const selectedOrder = store.userOrders.find(order => order.order_id === orderId);
    setSelectedItem(selectedOrder);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setSelectedDetails([]);
    setModalOpen(false);
  };
  
  return (
    <div className="container">
      <h2>Welcome, {store.user.username}!</h2>
      <p>Your ID is: {store.user.id}</p>
      <p style={{ fontSize: "150%", textAlign: 'center', marginRight:'35px' }}>Order History</p>
      {store.userOrders.map((order, index) => (
        <p key={order.id}>
  Order ID: <b>{order.order_id}</b>, Total: <b>${order.total}, </b> Placed: <b>{DateTime.fromISO(order.time).toLocaleString(DateTime.DATETIME_MED)}</b> 
  <button onClick={() => openModal(order.order_id)} style={{ marginRight: '5px' }}><InfoIcon/></button>
</p>
      ))}

    <Dialog open={modalOpen} onClose={closeModal}>
        <DialogContent>
          {selectedItem && (
            <div>
              <Typography variant="h5">
                {selectedItem.firstName} {selectedItem.lastName}
          {console.log(selectedItem)}
              </Typography>
              {selectedDetails.map((detail, index) => (
                <Typography key={index} variant="body1">
                  Item: {store.details.name}, Quantity: {detail.quantity}, Price: ${detail.price}
                </Typography>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
      </div>
      
  );
      }  

// this allows us to use <App /> in index.js
export default UserPage;
