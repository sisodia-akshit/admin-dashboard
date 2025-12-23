import { NavLink } from "react-router-dom";
import "../styles/layout.css";

const Sidebar = ({ show, setShow }) => {
  return (
    <div className={`sidebar ${show ? "show" : ""}`}>
      <h2>Admin</h2>
      <nav>
        <NavLink to="/" onClick={() => setShow(false)}>Dashboard</NavLink>
        <NavLink to="/users" onClick={() => setShow(false)}>Users</NavLink>
        <NavLink to="/orders" onClick={() => setShow(false)}>Orders</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
