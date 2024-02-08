import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { DateTime } from "luxon";
import { Dialog, DialogContent, Typography } from "@mui/material";

function Admin() {
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.orders);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalOpen(false);
  };

  const fetchOrders = () => {
    axios
      .get("/api/orders")
      .then((response) => {
        dispatch({ type: "SET_ORDERS", payload: response.data });
        console.log("Orders fetched:", response.data);
      })
      .catch((error) => {
        console.error(error);
        alert("Could not fetch orders! It is broken");
      });
  };

  console.log("Orders", orders);

  return (
    <div className="container">
      <h1>Admin</h1>
      <table>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}> {order.first_name} {order.last_name} {order.time} {JSON.stringify(order.order_status)} {order.phone}  <button onClick={() => openModal(order) }>Details</button></tr>
        ))}
        </tbody>
      </table>
     
      <Dialog open={modalOpen} onClose={closeModal}>
        <DialogContent>
          {selectedItem && (
            <div>
              <Typography variant="h5">{selectedItem.first_name}</Typography>
              <img
                style={{ maxWidth: "100%", height: 'auto' }}
                alt="image"
              />
            </div>
          )}
        </DialogContent>
        </Dialog>
    </div>
  );
}

export default Admin;
