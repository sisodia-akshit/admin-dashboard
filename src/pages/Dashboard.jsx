import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import Charts from "../components/Charts";
import SalesCharts from "../components/SalesChart";

const Dashboard = () => {
  return (
    <Layout>
      <h1>Dashboard</h1>

      <div className="dashboard-cards">
        <StatCard title="Total Users" value="1,250" />
        <StatCard title="Total Orders" value="320" />
        <StatCard title="Revenue" value="₹85,000" />
        <StatCard title="Pending Orders" value="12" />
      </div>

      <div className="reCharts">
        <Charts />
        <SalesCharts/>
      </div>
    </Layout>
  );
};

export default Dashboard;
