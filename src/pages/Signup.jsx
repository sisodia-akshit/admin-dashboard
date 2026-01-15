import { useMutation } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { createUser } from "../services/authApi";
import { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      navigate("/login");
    },
  });

  const handleSignup = (e) => {
    e.preventDefault();

    signupMutation.mutate({
      name,
      email,
      password,
      role: "seller",
    });
  };

  return (
    <div style={{ padding: "50px" }}>
      <form onSubmit={handleSignup}>
        <h2>Signup</h2>

        <input required placeholder="Name" onChange={e => setName(e.target.value)} />
        <br /><br />

        <input required type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <br /><br />

        <input required type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <br /><br />
        {/* <input  type="checkbox"  onChange={e => setIsSeller(e.target.checked)} />
        <label htmlFor="checkbox"> Do you want to sell books ?</label>
        <br /><br /> */}

        <button type="submit" disabled={signupMutation.isLoading}>
          {signupMutation.isLoading ? "Signing up..." : "Signup"}
        </button>

        {signupMutation.error && (
          <p style={{ color: "red" }}>{signupMutation.error.message}</p>
        )}

        <br /><br />
        <span>
          Already have an account? <NavLink to="/login">Login</NavLink>
        </span>
      </form>
    </div>
  );
};


export default Signup;
