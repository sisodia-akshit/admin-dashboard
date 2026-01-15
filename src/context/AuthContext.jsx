import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";
import { logoutUser } from "../services/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient()
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = (data) => {
    setUser(data.user)
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    localStorage.removeItem("user");
    queryClient.clear();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
