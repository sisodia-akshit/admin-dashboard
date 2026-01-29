import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import { loginUser } from "../services/authApi";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      login();
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
        <br /><NavLink to={"forget-password"} style={{ textDecoration: "none", fontSize: ".7rem" }}>Forget Password</NavLink>
        <br /><br />

        <button type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? "Logging up..." : "Login"}
        </button>

        {loginMutation.error && (
          <p style={{ color: "red" }}>{loginMutation.error.message}</p>
        )}

        <br /><br />
        <span>
          Don't have an Account? <NavLink to={"/signup"}>Signup</NavLink>
        </span>
      </form>
      <p style={{ margin: "0px auto", color: "#999" }}>---------- or ----------</p>
      <button
        className="googleBtn"
        onClick={() =>
          window.location.href =
          // "http://localhost:5000/api/auth/google?redirect=admin"
          "https://mern-bookstore-backend-o6qf.onrender.com/api/auth/google?redirect=admin"
        }
      >
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google"
          width="18"
        />
        Continue with Google
      </button>
    </div>
  );
};

export default Login;
