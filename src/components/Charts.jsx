import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const userData = [
  { month: "Jan", users: 200 },
  { month: "Feb", users: 400 },
  { month: "Mar", users: 650 },
  { month: "Apr", users: 800 },
  { month: "May", users: 1000 },
  { month: "June", users: 1300 },
];

const Charts = () => {
  return (
    <div style={{ width:"100%"}}>
      <h3>Users Growth</h3>
      <ResponsiveContainer  width="90%" height="180" >
        <LineChart data={userData}>
          <CartesianGrid strokeDasharray="3 3" /> 
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="users" stroke="#4f46e5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;
