import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import Charts from "../components/Charts";
import SalesCharts from "../components/SalesChart";
import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "../services/dashboardApi";

const Dashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: ({ signal }) => getDashboardStats({ signal }),
  });

  if (error) {
    return <Layout><p>{error.message}</p></Layout>;
  }

  return (
    <Layout>
      <h1>Dashboard</h1>

      <div className="dashboard-cards">
        <StatCard title="Total Users" value={isLoading ? "—" : data.totalUsers} />
        <StatCard title="Total Orders" value={isLoading ? "—" : data.totalOrders} />
        <StatCard title="Revenue" value={isLoading ? "—" : `₹${data.revenue}`} />
        <StatCard title="Pending Orders" value={isLoading ? "—" : data.pendingOrders} />
      </div>

      <div className="reCharts">
        <Charts />
        <SalesCharts />
      </div>
    </Layout>
  );
};

export default Dashboard;
