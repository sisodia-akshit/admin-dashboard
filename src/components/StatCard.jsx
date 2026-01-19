import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

const StatCard = ({ title, value, path }) => {
  const navigate = useNavigate();
  const statClickedHandler = (e) => {
    navigate(path)
  }
  return (
    <div className="stat-card" onClick={statClickedHandler}>
      <p className="stat-title">{title}</p>
      <h2 className="stat-value">{value}</h2>
    </div>
  );
};

export default StatCard;
