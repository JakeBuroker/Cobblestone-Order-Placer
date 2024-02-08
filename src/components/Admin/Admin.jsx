import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { DateTime } from "luxon";

function Admin() {
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.orders);


  useEffect(() => {
    fetchOrders();
  }, []);

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
          <tr key={order.id}> {order.first_name} {order.last_name} {order.time} {JSON.stringify(order.order_status)} {order.phone}  <button onClick={() => handleDetails(order) }>Details</button></tr>
          
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
