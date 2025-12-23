import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { month: "Jan", sales: 0 },
  { month: "Feb", sales: 10 },
  { month: "Mar", sales: 50 },
  { month: "Apr", sales: 120 },
  { month: "May", sales: 100 },
  { month: "June", sales:90 },
];

const SalesCharts = () => {
  return (
    <div style={{ width:"100%"}}>
      <h3>Sales Growth</h3>
      <ResponsiveContainer width="90%" height="180">
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="sales" stroke="#4f46e5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesCharts;
