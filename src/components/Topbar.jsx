import { useAuth } from "../context/AuthContext";

const Topbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();

  return (
    <div className="topbar">
      <button className="menu-btn" onClick={onMenuClick}>
        ☰
      </button>
      {user.role === "admin" ? <h3>Admin Dashboard</h3> : <h3>Dashboard</h3>}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Topbar;
