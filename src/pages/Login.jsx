import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authApi";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login(data);
      navigate("/");
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();

    loginMutation.mutate({
      email,
      password,
    });
  };

  return (
    <div style={{ padding: "50px" }}>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input required type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <br /><br />

        <input required type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <br /><br />

        <button type="submit" disabled={loginMutation.isLoading}>
          {loginMutation.isLoading ? "Logging up..." : "Login"}
        </button>

        {loginMutation.error && (
          <p style={{ color: "red" }}>{loginMutation.error.message}</p>
        )}

        <br /><br />
        <span>
          Don't have an Account? <NavLink to={"/signup"}>Signup</NavLink>
        </span>
      </form>
    </div>
  );
};

export default Login;
