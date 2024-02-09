import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent, Typography } from "@mui/material";

function Admin() {
  const dispatch = useDispatch();
  const orders = useSelector(store => store.orders);
  const details = useSelector(store => store.details);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedDetails, setSelectedDetails] = useState([]);

  useEffect(() => {
    fetchOrders();
    fetchDetails();
  }, []);

  const deleteOrder = (orderId) => {
    axios.delete(`/api/orders/${orderId}`)
        .then(() => {
            fetchOrders();
        })
        .catch(error => {
            console.error("Error deleting order:", error);
            alert("Could not delete order!");
        });
};

const editOrder = (orderId) => {
  axios.put(`/api/orders/${orderId}`)
      .then(() => {
          fetchOrders();
      })
      .catch(error => {
          console.error("Error updating order:", error);
          alert("Could not update order!");
      });
};

  const fetchOrders = () => {
    axios.get("/api/orders")
      .then((response) => {
        dispatch({ type: "SET_ORDERS", payload: response.data });
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

  const openModal = (order) => {
  
    const orderDetails = details.filter(detail => detail.order_id === order.order_id);
    setSelectedDetails(orderDetails);
    setSelectedItem(order);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setSelectedDetails([]);
    setModalOpen(false);
  };

  return (
    <div className="container">
      <h1>Admin</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Time</th>
            <th>Order Status</th>
            <th>Phone</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td>{order.first_name} {order.last_name}</td>
              <td>{order.time}</td>
              <td>{JSON.stringify(order.order_status)}</td>
              <td>{order.phone}</td>
              <td>
                <button onClick={() => openModal(order)}>Details</button>
                <button onClick={() => deleteOrder(order.order_id)}>x</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
      <Dialog open={modalOpen} onClose={closeModal}>
        <DialogContent>
          {selectedItem && (
            <div>
              <Typography variant="h5">
                {selectedItem.first_name} {selectedItem.last_name}  <button onClick={() => editOrder(selectedItem.order_id)}>Complete Order</button>
              </Typography>
              {selectedDetails.map((detail, index) => (
                <Typography key={index} variant="body1">
                  Item: {detail.name}, Quantity: {detail.quantity}, Price: ${detail.price}, Notes: {detail.notes}
                </Typography>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Admin;