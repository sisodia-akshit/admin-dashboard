import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute"
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Orders from "../pages/Orders";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Inventory from "../pages/Inventory";
import AddInventory from "../pages/AddInventory";
import ForgetPassword from "../components/ui/ForgetPassword";
import ResetPassword from "../components/ui/ResetPassword";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/forget-password" element={<ForgetPassword />} />
      <Route path="/login/reset-password/:token" element={<ResetPassword />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>} />
      <Route path="/users" element={
        <ProtectedRoute>
          <Users />
        </ProtectedRoute>} />
      <Route path="/orders" element={
        <ProtectedRoute>
          <Orders />
        </ProtectedRoute>} />
      <Route path="/inventory" element={
        <ProtectedRoute>
          <Inventory />
        </ProtectedRoute>} />
      <Route path="/inventory/add-inventory" element={
        <ProtectedRoute>
          <AddInventory />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default AppRoutes;
