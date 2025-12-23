import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/");
  };

  return (
    <div style={{ padding: "50px"}}>
      <h2>Admin Login</h2>
      <input placeholder="Email" />
      <br /><br />
      <input placeholder="Password" type="password" />
      <br /><br />
      <button onClick={handleLogin}>Login</button>
      <br />
      <br />
      or
      <br />
      <br />
      <button onClick={handleLogin}>Continue without login</button>
    </div>
  );
};

export default Login;
