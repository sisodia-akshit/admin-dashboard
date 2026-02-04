import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Modal from "../components/Modal";
import { getAllOrders, getOrders, updateOrderStatus } from "../services/ordersApi";
import DataTable from "../components/DataTable";
import Pagination from "../components/Pagination";
import Filter from "../components/Filter";
import useQueryParams from "../hooks/useQueryParams";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

const Orders = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { getParam, setParams } = useQueryParams();

  const page = Number(getParam("page") || 1);
  const status = getParam("status") || "All";
  const sort = getParam("sort") || "";
  const order = getParam("order") || "";

  const [selectedOrder, setSelectedOrder] = useState(null);
  const OrdersPerPage = 5

  const { data, isLoading, error } = useQuery({
    queryKey: ["orders", page, status, sort, order,],
    queryFn: ({ signal }) =>
      user.role === "admin" ? getAllOrders({
        page,
        limit: OrdersPerPage,
        status: status?.toLowerCase(),
        sort,
        order,
        signal,
      }) : getOrders({ signal }),
    keepPreviousData: true,
  });
  const orders = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / OrdersPerPage);

  const updateOrderStatusMutation = useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["orders"]);
    }
  })

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setParams({ page: 1 });
    }
  }, [page, totalPages, setParams]);

  const onStatusChange = (e) => {
    setParams({
      status: e.target.value,
      page: 1,
    });
  };

  const onPageChange = (p) => {
    setParams({ page: p });
  };

  const onSort = (config) => {
    setParams({
      sort: config?.key || "",
      order: config?.direction || "",
      page: 1,
    });
  };

  const updateOrderStatusHandler = ({ id, status }) => {
    updateOrderStatusMutation.mutate({
      id,
      status
    })
  }
  const cancelOrderHandler = ({ id, status }) => {
    alert("Do you wnat to cancel Order!!")
    updateOrderStatusMutation.mutate({
      id,
      status
    })
  }

  if (updateOrderStatusMutation.error) console.log(updateOrderStatusMutation.error)

  return (
    <Layout>
      <h1>Orders</h1>
      {error && <p style={{ color: "red" }}>{error.message}</p>}

      {user.role === "admin" && <Filter
        value={status}
        options={["All", "pending", "confirmed", "shipped", "delivered", "cancelled"]}
        onChange={onStatusChange}
      />}

      <div style={{ minHeight: "18px" }}>
        {isLoading && <small>Loading orders...</small>}
      </div>
      <DataTable
        columns={[
          // { label: "ID", key: "id" },
          { label: "Order Status", key: "orderStatus" },
          { label: "Customer", key: "customer" },
          { label: "Amount", key: "amount" },
          { label: "Payment", key: "payment" },
          { label: "CreatedAt", key: "createdAt" },
          { label: "Action", key: null },
        ]}
        data={orders}
        sortConfig={
          sort
            ? { key: sort, direction: order }
            : null
        }
        onSort={onSort}
        renderRow={(o) => (
          <tr key={o._id}>
            {/* <td>{o._id}</td> */}
            <td>{o.orderStatus}</td>
            <td>{o.user?.name}</td>
            <td>₹{o.totalAmount}</td>
            <td>{o.paymentStatus}</td>
            <td>{o.createdAt}</td>
            <td>
              <button onClick={() => setSelectedOrder(o)}>
                View
              </button>
            </td>
          </tr>
        )}
      />
      {selectedOrder && (
        <Modal onClose={() => setSelectedOrder(null)}>
          <div className="modelContent">

            <h2>Order Details</h2>
            {/* <p>ID: {selectedOrder._id}</p> */}
            {updateOrderStatusMutation.error && <p style={{ color: "red" }}>{updateOrderStatusMutation.error.response?.data?.message}</p>}
            <p>Order No: {selectedOrder.orderNumber}</p>
            <div className="orderCustomerItem">
              <p>Customer: {selectedOrder.user?.name}</p>
              <p>Email: {selectedOrder.user?.email}</p>
              <p>Status: {selectedOrder.orderStatus}</p>
              <p>Payment: {selectedOrder.paymentStatus}</p>
              <p>Payment Method: {selectedOrder.paymentMethod}</p>
              <p>Ordered On: {selectedOrder.createdAt}</p>
            </div>

            <h3>Shipping Address</h3>
            <div className="orderShipping">
              <p>{selectedOrder.shippingAddress?.name}</p>
              <p>+91 {selectedOrder.shippingAddress?.phone}</p>
              <p>{selectedOrder.shippingAddress?.line1}, {selectedOrder.shippingAddress.line2}</p>
              <p>{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress.pincode}</p>
              <p>{selectedOrder.shippingAddress?.state}, {selectedOrder.shippingAddress.country}</p>
            </div>
            <h3>Items({selectedOrder.items.length})</h3>
            <div className="orderCustomerItem">
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <b>S.No.</b>
                <b>Item Name</b>
                <b>Quantity</b>
                <b>Price</b>
                <b>Total</b>
              </div>
              {selectedOrder.items.map((i, index) => {
                return (
                  <div key={index} style={{ display: "flex", justifyContent: "space-around" }}>
                    <p>{index + 1}.</p>
                    <p>{i.title}</p>
                    <p>{i.quantity}</p>
                    <p>{i.price}</p>
                    <p>{i.lineTotal}</p>
                  </div>
                )
              })}
              <p>Items Total: ₹{selectedOrder.subtotal}</p>
            </div>
            <h3>Total Payable</h3>
            <div className="orderCustomerItem">
              <div className="customerItem" style={{ display: "flex", justifyContent: "space-around" }}>
                <b>S.No.</b>
                <b>Items</b>
                <b>Discount</b>
                <b>Tax</b>
                <b>Shipping</b>
                <b>Total</b>
              </div>
              <div className="customerItem" style={{ display: "flex", justifyContent: "space-around" }}>
                <p>1.</p>
                <p>{selectedOrder.subtotal}</p>
                <p>{selectedOrder.discount}</p>
                <p>{selectedOrder.tax}</p>
                <p>{selectedOrder.shippingFee}</p>
                <p>{selectedOrder.totalAmount}</p>
              </div>
              <p><b>Total Payable:</b> {selectedOrder.totalAmount} Rs.</p>
            </div>

            {selectedOrder.orderStatus === "pending" && <button className="orderConfirmButton" onClick={(e) => updateOrderStatusHandler({ id: selectedOrder._id, status: "confirmed" })}>{updateOrderStatusMutation.isPending ? "updating..." : "Confirm Order"}</button>}
            {selectedOrder.orderStatus === "pending" && <button className="orderConfirmButton" style={{ backgroundColor: "red" }} onClick={(e) => cancelOrderHandler({ id: selectedOrder._id, status: "cancelled" })}>{updateOrderStatusMutation.isPending ? "updating..." : "Cancel Order"}</button>}
            {selectedOrder.orderStatus === "confirmed" && <button className="orderConfirmButton" onClick={(e) => updateOrderStatusHandler({ id: selectedOrder._id, status: "shipped" })}>{updateOrderStatusMutation.isPending ? "updating..." : "Ship Order"}</button>}
          </div>
        </Modal>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </Layout>
  );
};

export default Orders;
