import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import Charts from "../components/Charts";
import SalesCharts from "../components/SalesChart";
import { useQuery } from "@tanstack/react-query";
import { getAdminStats, getDashboardStats } from "../services/dashboardApi";
import { useAuth } from "../context/AuthContext";


const Dashboard = () => {
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: ({ signal }) => user.role === "admin" ? getAdminStats({ signal }) : getDashboardStats({ signal }),
  });

  if (error) {
    return <Layout><p>{error.message}</p></Layout>;
  }
  if (!user) if (!user) return <p className='container'>loading...</p>

  return (
    <Layout>
      {user.role === "admin" ? <h1>Admin Dashboard</h1> : <h1>Dashboard</h1>}

      <h3 style={{ color: "#000" }}>{user.name}</h3>
      <p style={{ color: "#555" }}>{user.email}<span style={{ color: "#555" }}>&nbsp;({user.role})</span></p>

      <div className="dashboard-cards">
        {user.role === "admin" && <StatCard title="Total Books" value={isLoading ? "—" : data.totalBooks} path={"/books"} />}
        <StatCard title="My Books" value={isLoading ? "—" : data.myTotalBooks} path={"/books"} />
        {user.role === "admin" && <StatCard title="Total Users" value={isLoading ? "—" : data.totalUsers} path={"/users"} />}
        {user.role === "admin" && <StatCard title="Total Orders" value={isLoading ? "—" : data.totalOrders} path={"/Orders"} />}
        <StatCard title="Pending Orders" value={isLoading ? "—" : data.orders.pending} path={"/Orders?status=pending&page=1"} />
        <StatCard title="Paid Orders" value={isLoading ? "—" : data.orders.paid} path={"/Orders?status=paid&page=1"}/>
        <StatCard title="Shipped Orders" value={isLoading ? "—" : data.orders.shipped} path={"/Orders?status=shipped&page=1"}/>
        <StatCard title="Delivered Orders" value={isLoading ? "—" : data.orders.delivered} path={"/Orders?status=delivered&page=1"}/>
        <StatCard title="Cancelled Orders" value={isLoading ? "—" : data.orders.cancelled} path={"/Orders?status=cancelled&page=1"}/>
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
