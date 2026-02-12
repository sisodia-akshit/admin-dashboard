import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Divider,
  Avatar,
  Toolbar,
  AppBar,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import { loginUser } from "../services/authApi";
import { useState } from "react";

import BookstoreLogo from "../assets/BookstoreLogo4.png";

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
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
        mt: "80px"
      }}
    >
      {/* topbar   */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - 0px)` },
          // ml: { md: `${280}px` },
          boxShadow: "none",
          bgcolor: "background.paper",
          color: "color.main",
          pt: .3
        }}
      >
        <Toolbar>
          <Avatar
            src={BookstoreLogo}
            alt="Logo"
            sx={{ width: 60, height: 60 }}
          />
        </Toolbar>
      </AppBar>

      {/* form   */}
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          width: "100%",
          maxWidth: "450px",
          p: {
            md: 4,
            xs: "32px 20px"
          },
          borderRadius: 2,
          backgroundColor: "background.paper",
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Toolbar sx={{
          margin: "auto"
        }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar
              src={BookstoreLogo}
              alt="Logo"
              sx={{ width: 100, height: 100 }}
            />
            <Typography variant="h6" align="center" fontWeight={600}>
              Welcome back!
            </Typography>
            <Typography variant="h7" sx={{
              textAlign: "center",
              fontSize: 13,
              color: "color.light"
            }}>
              Login to your account
            </Typography>
          </Box>
        </Toolbar>

        {/* Google  */}
        <Button
          variant="outlined"
          fullWidth
          onClick={() =>
          (window.location.href =
            "http://localhost:5000/api/auth/google?redirect=admin")
          }
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            justifyContent: "center",
            mt: 5,
            height: "50px"
          }}
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            width="18"
          />
          Continue with Google
        </Button>
        <Divider>or</Divider>

        {/* Formm  */}
        <TextField
          required
          type="email"
          label="Email Address"
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            width: "100%",
            backgroundColor: "background.default",
          }}
        />

        <TextField
          required
          type="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            width: "100%",
          }}
        />

        <Box sx={{
          textAlign: "right",
          width: "100%",
        }}>
          <Link
            component={NavLink}
            to="forget-password"
            underline="none"
            fontSize="0.8rem"
          >
            Recover Password
          </Link>
        </Box>

        {loginMutation.error && (
          <Typography color="error" fontSize="0.85rem">
            {loginMutation.error.message}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          disabled={loginMutation.isPending}
          sx={{
            maxWidth: "180px",
            width: "100%",
            fontSize: 18,
            py: 1.5,
            borderRadius: 3
          }}
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </Button>



        <Typography fontSize="0.85rem" textAlign="center">
          Don’t have an account?{" "}
          <Link component={NavLink} to="/signup">
            Signup
          </Link>
        </Typography>


      </Box>
    </Box>
  );
};

export default Login;
