import { createContext, useContext } from "react";
import { logoutUser } from "../services/authApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getUser } from "../services/usersApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // getMe
  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: ({ signal }) => getUser({ signal }),
    retry: false,                 // STOP retrying on 401
    refetchOnWindowFocus: false,  // STOP refetch spam
    staleTime: Infinity,          // auth does not go stale
  });

  const user = data?.user ?? null;

  // login = refetch user
  const login = async () => {
    await queryClient.invalidateQueries(["user"]);
    navigate("/");
  };

  // logout = clear cookie + reset cache
  const logout = async () => {
    try {
      await logoutUser();
      queryClient.clear();
      navigate("/login");
    } catch (error) {
      console.log(error)
    }

  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
