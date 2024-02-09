import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent, Typography } from "@mui/material";
import { DateTime } from "luxon";

function Admin() {
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.orders);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchOrders();
    {orders.map((order) => (
      console.log("ORDER:",order.id)
      
    ))}
  }, []);

  const fetchOrders = () => {
    axios.get("/api/orders")
      .then((response) => {
        dispatch({ type: "SET_ORDERS", payload: response.data });
      })
      .catch((error) => {
        console.error("Could not fetch orders:", error);
      });
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalOpen(false);
  };

 
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

  return (
    <div className="container">
      <h1>Admin</h1>
      <table>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              {order.first_name} {order.last_name} {order.time} {JSON.stringify(order.order_status)} {order.phone}
              <button onClick={() => deleteOrder(order.order_id)}>x</button>
              <button onClick={() => openModal(order)}>Mark Complete</button>
            </tr>
          ))}
        </tbody>
      </table>
     
      <Dialog open={modalOpen} onClose={closeModal}>
        <DialogContent>
          {selectedItem && (
            <div>
              <Typography variant="h5">{selectedItem.first_name} {selectedItem.last_name}</Typography>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Admin;