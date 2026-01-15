import { NavLink } from "react-router-dom";
import "../styles/layout.css";
import { useAuth } from "../context/AuthContext";


const Sidebar = ({ show, setShow }) => {
  const { user } = useAuth();

  return (
    <div className={`sidebar ${show ? "show" : ""}`}>
      <h2>Pages</h2>
      <nav>
        <NavLink to="/" onClick={() => setShow(false)}>Dashboard</NavLink>
        {user.role === "admin" && <NavLink to="/users" onClick={() => setShow(false)}>Users</NavLink>}
        {user.role === "admin" && <NavLink to="/orders" onClick={() => setShow(false)}>Orders</NavLink>}
        <NavLink to="/books" onClick={() => setShow(false)}>Books</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
