import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { DateTime } from "luxon";
import { Dialog, DialogContent, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { CheckCircleOutline, HourglassEmpty } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ClearIcon from "@mui/icons-material/Clear";


function Admin() {
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.orders);
  const details = useSelector((store) => store.details);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedDetails, setSelectedDetails] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [completeModalOpen, setCompleteModalOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
    fetchDetails();
  }, []);

  const fetchOrders = () => {
    axios
      .get("/api/orders")
      .then((response) => {
        dispatch({ type: "SET_ORDERS", payload: response.data });
      })
      .catch((error) => {
        console.error("Could not fetch orders:", error);
      });
  };

  const fetchDetails = () => {
    axios
      .get("/api/details")
      .then((response) => {
        dispatch({ type: "SET_DETAILS", payload: response.data });
      })
      .catch((error) => {
        console.error("Could not fetch details:", error);
      });
  };

  const deleteOrder = (orderId) => {
    axios
      .delete(`/api/orders/${orderId}`)
      .then(() => {
        fetchOrders();
        setDeleteModalOpen(false);
        Swal.fire({
          icon: "success",
          showConfirmButton: false,
          timer: 1200,
          confirmButtonColor: '#027662'
        });
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
        alert("Could not delete order!");
      });
  };

  const editOrder = (orderId) => {
    axios
      .put(`/api/orders/${orderId}`)
      .then(() => {
        setCompleteModalOpen(false);
        setDetailsModalOpen(false);
        fetchOrders();
        Swal.fire({
          icon: "success",
          showConfirmButton: false,
          timer: 1200,
          confirmButtonColor: '#027662'
        });
      })
      .catch((error) => {
        console.error("Error updating order:", error);
        alert("Could not update order!");
      });
  };

  const openModal = (order) => {
    const orderDetails = details.filter(
      (detail) => detail.order_id === order.id
    );
    setSelectedDetails(orderDetails);
    setSelectedItem(order);
    setDetailsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setSelectedDetails([]);
    setDetailsModalOpen(false);
  };

  const openDeleteConfirmModal = (order) => {
    setSelectedItem(order);
    setDeleteModalOpen(true);
  };

  // Defines columns for the DataGrid component to display order information
  const columns = [
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "time", headerName: "Time", width: 200 },
    // Column for displaying order status that renders different icons based on status
    {
      field: "orderStatus",
      headerName: "Order Status",
      width: 120,
      renderCell: (params) => {
        return params.value ? (
          <CheckCircleOutline color="success" />
        ) : (
          <HourglassEmpty color="action" />
        );
      },
    },
    { field: "phone", headerName: "Phone", width: 150 },
    // Renders action buttons for details modal and deleting orderer
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <div>
          <button
            onClick={() => openModal(params.row)}
            style={{
              cursor: "pointer",
              marginRight: "5px",
              backgroundColor: "hsl(60, 73%, 98%)",
            }}
          >
            <InfoIcon />
          </button>
          <button
            onClick={() => openDeleteConfirmModal(params.row)}
            style={{
              cursor: "pointer",
              marginRight: "5px",
              backgroundColor: "hsl(60, 73%, 98%)",
            }}
          >
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];

  const rows = orders.map((order) => ({
    id: order.order_id,
    firstName: order.first_name,
    lastName: order.last_name,
    time: DateTime.fromISO(order.time).toLocaleString(DateTime.DATETIME_MED),
    orderStatus: order.order_status,
    phone: order.phone,
  }));

  return (
    <div style={{ height: 400, width: "100%" }}>
      <h1>Admin</h1>

      {/* Renders the admin panel including the DataGrid and a Dialog for detailed order view. */}
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
        disableSelectionOnClick
      />

      {/* Details Modal */}
      <Dialog open={detailsModalOpen} onClose={closeModal}>
        <ClearIcon
          onClick={closeModal}
          style={{
            cursor: "pointer",
            position: "absolute",
            left: "10px",
            top: "10px",
          }}
        />
        <DialogContent
          style={{
            backgroundColor: "hsl(60, 73%, 93%)",
            height: "auto",
            maxHeight: "80vh",
            width: "90%",
            overflow: "auto",
            borderRadius: "10px",
          }}
        >
          {/* Checks if item is selected and displays its details */}
          {selectedItem && (
            <div>
              <Typography
                style={{
                  paddingLeft: "65px",
                  paddingBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
                variant="h5"
              >
                {selectedItem.firstName} {selectedItem.lastName}
                <span
                  onClick={() => setCompleteModalOpen(true)}
                  style={{
                    display: "flex",
                    height: "42px",
                    width: "150px",
                    border: "solid black 1px",
                    alignItems: "center",
                    marginLeft: "auto",
                    marginRight: "65px",
                    cursor: "pointer",
                    borderRadius: "15px",
                  }}
                >
                  <CheckCircleIcon style={{ fontSize: "120%" }} />
                  <span style={{ marginLeft: "10px" }}>Complete</span>
                </span>
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
                    margin: "10px 65px",
                    display: "block",
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

        {/* Delete modal */}
      </Dialog>
      <Dialog open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <DialogContent>
          <Typography>Are you sure you want to delete this item?</Typography>
          <button
            onClick={() => {
              deleteOrder(selectedItem.id);
              setDeleteModalOpen(false);
              
            }}
          >
            Yes
          </button>
          <button onClick={() => setDeleteModalOpen(false)}>No</button>
        </DialogContent>
      </Dialog>

      {/* Complete modal */}
      <Dialog
        open={completeModalOpen}
        onClose={() => setCompleteModalOpen(false)}
      >
        <DialogContent>
          <Typography>
            Are you sure you want to mark this item as complete?
          </Typography>
          <button onClick={() => editOrder(selectedItem.id)}>Yes</button>
          <button onClick={() => setCompleteModalOpen(false)}>No</button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Admin;
