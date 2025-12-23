import { useState } from "react";
import Layout from "../components/Layout";
import ordersData from "../data/orders";
import Modal from "../components/Modal";

const Orders = () => {
  const [status, setStatus] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders =
    status === "All"
      ? ordersData
      : ordersData.filter((o) => o.status === status);

  return (
    <Layout>
      <h1>Orders</h1>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>All</option>
        <option>Pending</option>
        <option>Delivered</option>
      </select>

      <div style={{ overflowX: "auto" }}>
        <table width="100%" border="1" cellPadding="8">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.customer}</td>
                <td>₹{o.amount}</td>
                <td>{o.status}</td>
                <td>
                  <button onClick={() => setSelectedOrder(o)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <Modal onClose={() => setSelectedOrder(null)}>
          <h3>Order Details</h3>
          <p>ID: {selectedOrder.id}</p>
          <p>Customer: {selectedOrder.customer}</p>
          <p>Amount: ₹{selectedOrder.amount}</p>
          <p>Status: {selectedOrder.status}</p>
        </Modal>
      )}
    </Layout>
  );
};

export default Orders;
