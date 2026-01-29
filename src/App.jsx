import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import Signup from "./pages/Signup";
import Books from "./pages/Books";
import "./styles/App.css"
import ForgetPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/forget-password" element={<ForgetPassword />} />
        <Route path="/login/reset-password/:token" element={<ResetPassword/>} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/books"
          element={
            <ProtectedRoute>
              <Books />
            </ProtectedRoute>
          }
        />
      </Routes>
  );
}

export default App;
