import { useAuth } from "../context/AuthContext";

const Topbar = ({ onMenuClick }) => {
  const { logout } = useAuth();

  return (
    <div className="topbar">
      <button className="menu-btn" onClick={onMenuClick}>
        ☰
      </button>
      <h3>Admin Dashboard</h3>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Topbar;
