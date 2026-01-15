import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import Charts from "../components/Charts";
import SalesCharts from "../components/SalesChart";
import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "../services/dashboardApi";
import { useAuth } from "../context/AuthContext";
import { getAdminStats } from "../services/adminApi";


const Dashboard = () => {
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: ({ signal }) => user.role === "admin" ? getAdminStats({ signal }) : getDashboardStats({ signal }),
  });

  if (error) {
    return <Layout><p>{error.message}</p></Layout>;
  }

  return (
    <Layout>
      {user.role === "admin" ? <h1>Admin Dashboard</h1> : <h1>Dashboard</h1>}

      <div className="dashboard-cards">
        {user.role === "admin" && <StatCard title="Total Books" value={isLoading ? "—" : data.totalBooks} />}
        <StatCard title="My Books" value={isLoading ? "—" : data.myTotalBooks} />
        {user.role === "admin" && <StatCard title="Total Users" value={isLoading ? "—" : data.totalUsers} />}
        {user.role === "admin" && <StatCard title="Total Orders" value={isLoading ? "—" : data.totalOrders} />}
        {user.role === "admin" && <StatCard title="Pending Orders" value={isLoading ? "—" : data.orders.pending} />}
        {user.role === "admin" && <StatCard title="Delivered Orders" value={isLoading ? "—" : data.orders.delivered} />}
        {user.role === "admin" && <StatCard title="Cancelled Orders" value={isLoading ? "—" : data.orders.cancelled} />}
        {/* {user.role === "admin" && <StatCard title="Revenue" value={isLoading ? "—" : `₹${data.revenue}`} />} */}
      </div>

      {user.role === "admin" && <div className="reCharts">
        <Charts />
        <SalesCharts />
      </div>}
    </Layout>
  );
};

export default Dashboard;
