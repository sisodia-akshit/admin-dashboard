import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Modal from "../components/Modal";
import { getAllOrders, getOrders } from "../services/ordersApi";
import DataTable from "../components/DataTable";
import Pagination from "../components/Pagination";
import Filter from "../components/Filter";
import useQueryParams from "../hooks/useQueryParams";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";

const Orders = () => {
  const { user } = useAuth();

  const { getParam, setParams } = useQueryParams();

  const page = Number(getParam("page") || 1);
  const status = getParam("status") || "All";
  const sort = getParam("sort") || "";
  const order = getParam("order") || "";

  const [selectedOrder, setSelectedOrder] = useState(null);
  const OrdersPerPage = 5

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "orders",
      page,
      status,
      sort,
      order,
    ],
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

  if (!user) if (!user) return <p className='container'>loading...</p>
  return (
    <Layout>
      <h1>Orders</h1>
      {error && <p style={{ color: "red" }}>{error.message}</p>}

      {user.role === "admin" && <Filter
        value={status}
        options={["All", "pending", "paid", "shipped", "delivered", "cancelled"]}
        onChange={onStatusChange}
      />}

      <div style={{ minHeight: "18px" }}>
        {isLoading && <small>Loading orders...</small>}
      </div>
      <DataTable
        columns={[
          { label: "ID", key: "id" },
          { label: "Customer", key: "customer" },
          { label: "Items", key: "items" },
          { label: "Amount", key: "amount" },
          { label: "Status", key: "status" },
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
            <td>{o._id}</td>
            <td>{`${o.user?.name}, (${o.user?.email})`}</td>
            <td>{o.items.map((item, i) => {
              return <span key={i}>{i + 1}. {item.title}, <br /></span>
            })}</td>
            <td>₹{o.totalAmount}</td>
            <td>{o.status}</td>
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
          <h3>Order Details</h3>
          <p>ID: {selectedOrder._id}</p>
          <p>Customer (name): {selectedOrder.user?.name}</p>
          <p>Customer (email): {selectedOrder.user?.email}</p>
          <p>Amount: ₹{selectedOrder.totalAmount}</p>
          <p>Status: {selectedOrder.status}</p>
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
