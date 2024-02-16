import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { DateTime } from "luxon";
import {
  Dialog,
  DialogContent,
  Typography,
  List,
  ListItem,
  IconButton,
  Paper,
  Box,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import HourglassEmpty from "@mui/icons-material/HourglassEmpty";
import ClearIcon from '@mui/icons-material/Clear';

function UserPage() {
  const dispatch = useDispatch();
  const userOrders = useSelector((state) => state.userOrders);
  const details = useSelector((state) => state.details);
  const user = useSelector((state) => state.user);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedDetails, setSelectedDetails] = useState([]);

  useEffect(() => {
    axios
      .get("/api/userOrders")
      .then((response) =>
        dispatch({ type: "SET_USER_ORDERS", payload: response.data })
      )
      .catch((error) => console.error("Could not fetch orders:", error));
    axios
      .get("/api/details")
      .then((response) =>
        dispatch({ type: "SET_DETAILS", payload: response.data })
      )
      .catch((error) => console.error("Could not fetch details:", error));
  }, [dispatch]);

  const openModal = (orderId) => {
    const orderDetails = details.filter(
      (detail) => detail.order_id === orderId
    );
    const selectedOrder = userOrders.find(
      (order) => order.order_id === orderId
    );
    setSelectedDetails(orderDetails);
    setSelectedItem(selectedOrder);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setSelectedDetails([]);
    setModalOpen(false);
  };

  const orderStatus = (orderStatus) =>
    orderStatus ? (
      <CheckCircleOutline color="success" />
    ) : (
      <HourglassEmpty color="action" />
    );

  return (
    <Box sx={{ padding: "25px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome, {user.username}!
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        Your ID is: {user.id}
      </Typography>

      <Typography paddingLeft="190px" variant="h5" gutterBottom>
        Order History
      </Typography>

      {/* Maps user orders */}
      <List sx={{ paddingLeft:"65px" , width: "30%" }}>
        {userOrders.map((order) => (
          <ListItem
            key={order.order_id}
            divider
            component={Paper}
            sx={{
              backgroundColor: "hsl(60, 73%, 94%)",
              marginBottom: 2,
              border: "1px solid #e0e0e0",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Rendering mapped user orders */}
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <Box sx={{ flex: "1 1 auto" }}>
                <Typography variant="body1">
                  Order ID: {order.order_id}, Total: ${order.total}
                </Typography>
                <Typography variant="body2">
                  Placed:{" "}
                  {DateTime.fromISO(order.time).toLocaleString(
                    DateTime.DATETIME_MED
                  )}
                </Typography>
              </Box>

              {/* displaying the order status and Icon button */}
              <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                {orderStatus(order.order_status)}
              </Box>
            </Box>

            {/* Icon button to open a modal with order details */}
            <IconButton edge="end" onClick={() => openModal(order.order_id)}>
              <InfoIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      {/* Details modal that opens based on 'modalOpen' state */}
      <Dialog open={modalOpen} onClose={closeModal}>
  <ClearIcon onClick={closeModal} style={{ cursor: 'pointer', position: 'absolute', left: '10px', top: '10px' }} />
  <DialogContent style={{ backgroundColor: "hsl(60, 73%, 93%)", height: 'auto', maxHeight: '80vh', width: '90%', overflow: 'auto', borderRadius: '10px' }}>
    {/* Checks if item is selected and displays its details */}
    {selectedItem && (
      <div>
        <Typography style={{ paddingLeft: "185px", paddingBottom: "10px", display: 'flex', alignItems: 'center', flexWrap: 'wrap' }} variant="h5">
          Order #{selectedItem.order_id}
        </Typography>
        {selectedDetails.map((detail, index) => (
          <Typography
            style={{
              paddingRight: "35px",
              overflow: "hidden",
              padding: "20px 50px",
              fontSize: "105%",
              borderRadius: "10px",
              border: "solid black 1px",
              margin: '10px 65px', // Added margin for better spacing
              display: 'block' // Ensure each detail is on its own line
            }}
            key={index}
            variant="body1"
          >
            {detail.name}, Quantity: {detail.quantity} ${detail.price}
          </Typography>
        ))}
      </div>
    )}
  </DialogContent>
</Dialog>
    </Box>
  );
}

export default UserPage;
